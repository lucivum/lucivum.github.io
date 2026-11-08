#!/usr/bin/env python3
"""Copy each app's store listing and images from its own folder into the site.

The app folders are the source of truth: their `store-text-android.md` is what Google
Play shows, and their screenshots are what the listing uses. This writes

    src/content/apps/<lang>/<app>.md          name, short and long description
    src/assets/apps/<app>/icon.png            store icon
    src/assets/apps/<app>/feature/<lang>.png  feature graphic, or feature.<ext> when shared
    src/assets/apps/<app>/screenshots/<lang>/ phone screenshots, or screenshots/all/

and replaces what was there, so run it after a listing or its screenshots change:

    python3 scripts/sync-apps.py               # every app
    python3 scripts/sync-apps.py dhess rect    # some of them

Paths below are relative to the folder holding this repo and the app folders side by
side; pass --apps-root to point elsewhere. Screenshots are written as JPEG, at most
1920px on the long side: Astro serves them as resized WebP, so a larger source only
weighs on the repo.
"""

import argparse
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

SITE = Path(__file__).resolve().parent.parent

# Where each app keeps what the site needs. A screenshot or feature value is either one
# path for every language, or a pattern with `{lang}` in it.
APPS = {
    'dhess': {
        'listing': 'dhess/store/design/store-text-android.md',
        'icon': 'dhess/store/design/playstore-icon.png',
        'feature': 'dhess/store/ads/{lang}/feature-1024x500.png',
        # Built by store-screenshots/make-screenshots.py --size play-phone
        'screenshots': 'dhess/store/out/{lang}/play-phone',
    },
    'filler': {
        'listing': 'filler/store/store-text-android.md',
        'icon': 'filler/store/design/icon-store-512.png',
        'feature': 'filler/store/ads/{lang}/feature-1024x500.png',
        'screenshots': 'filler/store/out/{lang}/play-phone',
    },
    'rect': {
        'listing': 'rect/store/design/store-text-android.md',
        'icon': 'rect/store/design/rect_logo_512.png',
        'feature': 'rect/store/design/1024_500.png',
        # No raw captures to build from; downloaded from the live Google Play listing.
        'screenshots': 'rect/store/play-screenshots/{lang}',
    },
    'vizallas': {
        'listing': 'vizallas/design/store-text-android.md',
        'icon': 'vizallas/design/playstore-icon.png',
        'feature': 'vizallas/design/featured_graphic.jpeg',
        # The same in English and Hungarian; downloaded from the live Google Play listing.
        'screenshots': 'vizallas/design/play-screenshots/phone',
    },
}

# BCP-47 tags, matching the ones the privacy policies use.
LANGUAGE_TAGS = {
    'en': 'en-US', 'zh': 'zh-CN', 'hi': 'hi-IN', 'es': 'es-ES', 'fr': 'fr-FR', 'hu': 'hu-HU',
}

MAX_SIDE = 1920
JPEG_QUALITY = 85
IMAGE_SUFFIXES = {'.png', '.jpg', '.jpeg'}
LIST_ITEM = re.compile(r'^\s*(?:[-•·*]|\d+[.)])\s+')


def parse_listing(path: Path) -> dict[str, dict[str, str]]:
    """`## <lang> — …` sections, each with `### name`, `### short` and `### long`."""
    languages: dict[str, dict[str, list[str]]] = {}
    language = field = None
    for line in path.read_text(encoding='utf-8').splitlines():
        if match := re.match(r'^## (\w+)\b', line):
            language, field = match.group(1), None
            languages[language] = {}
        elif (match := re.match(r'^### (\w+)', line)) and language:
            field = match.group(1)
            languages[language][field] = []
        elif language and field:
            languages[language][field].append(line)
    return {
        language: {name: '\n'.join(lines).strip() for name, lines in fields.items()}
        for language, fields in languages.items()
    }


def to_markdown(text: str) -> str:
    """Store text marks structure with line breaks; turn it into headings, lists and paragraphs.

    A block whose short first line is followed by more lines opens with a section label
    ("HOW IT PLAYS:"), which becomes an `###` heading. Bulleted lines become a tight list;
    the remaining lines of a block join into one paragraph.
    """
    parts: list[tuple[str, str]] = []
    for block in re.split(r'\n\s*\n', text.strip()):
        lines = [line.strip() for line in block.splitlines() if line.strip()]
        if len(lines) > 1 and not LIST_ITEM.match(lines[0]) and len(lines[0]) <= 60:
            parts.append(('heading', '### ' + re.sub(r'\s*[:：]\s*$', '', lines[0])))
            lines = lines[1:]
        paragraph: list[str] = []
        for line in lines:
            if LIST_ITEM.match(line):
                if paragraph:
                    parts.append(('paragraph', ' '.join(paragraph)))
                    paragraph = []
                parts.append(('item', '- ' + LIST_ITEM.sub('', line)))
            else:
                paragraph.append(line)
        if paragraph:
            parts.append(('paragraph', ' '.join(paragraph)))

    markdown = ''
    for index, (kind, value) in enumerate(parts):
        if index:
            markdown += '\n' if kind == 'item' and parts[index - 1][0] == 'item' else '\n\n'
        markdown += value
    return markdown + '\n'


def write_page(app: str, language: str, fields: dict[str, str]) -> None:
    for required in ('name', 'short', 'long'):
        if not fields.get(required):
            sys.exit(f'{app}: the {language} listing has no {required}; fill it in first.')
    if language not in LANGUAGE_TAGS:
        sys.exit(f'{app}: {language} is not a language the site offers.')

    quote = lambda value: json.dumps(value, ensure_ascii=False)
    page = SITE / 'src/content/apps' / language / f'{app}.md'
    page.parent.mkdir(parents=True, exist_ok=True)
    page.write_text(
        '---\n'
        f'title: {quote(fields["name"])}\n'
        f'description: {quote(fields["short"])}\n'
        f'language: {quote(LANGUAGE_TAGS[language])}\n'
        '---\n\n' + to_markdown(fields['long']),
        encoding='utf-8',
    )


def save_jpeg(source: Path, target: Path) -> None:
    """Shrink to MAX_SIDE and save as JPEG, with Pillow when installed and macOS `sips` otherwise."""
    try:
        from PIL import Image
    except ImportError:
        subprocess.run(
            ['sips', '-Z', str(MAX_SIDE), '-s', 'format', 'jpeg',
             '-s', 'formatOptions', str(JPEG_QUALITY), str(source), '--out', str(target)],
            check=True, stdout=subprocess.DEVNULL,
        )
        return
    with Image.open(source) as image:
        image = image.convert('RGB')
        image.thumbnail((MAX_SIDE, MAX_SIDE))
        image.save(target, 'JPEG', quality=JPEG_QUALITY, optimize=True)


def images_in(folder: Path) -> list[Path]:
    return sorted(path for path in folder.iterdir() if path.suffix.lower() in IMAGE_SUFFIXES)


def sync(app: str, config: dict[str, str], root: Path) -> None:
    listing = parse_listing(root / config['listing'])
    languages = list(listing)

    stale = SITE / 'src/content/apps'
    for page in stale.glob(f'*/{app}.md'):
        page.unlink()
    for language, fields in listing.items():
        write_page(app, language, fields)

    assets = SITE / 'src/assets/apps' / app
    assets.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(root / config['icon'], assets / 'icon.png')

    shutil.rmtree(assets / 'feature', ignore_errors=True)
    for old in assets.glob('feature.*'):
        old.unlink()
    if '{lang}' in config['feature']:
        (assets / 'feature').mkdir()
        for language in languages:
            source = root / config['feature'].format(lang=language)
            shutil.copyfile(source, assets / 'feature' / f'{language}{source.suffix}')
    else:
        source = root / config['feature']
        shutil.copyfile(source, assets / f'feature{source.suffix}')

    screenshots = assets / 'screenshots'
    shutil.rmtree(screenshots, ignore_errors=True)
    folders = (
        {language: config['screenshots'].format(lang=language) for language in languages}
        if '{lang}' in config['screenshots']
        else {'all': config['screenshots']}
    )
    count = 0
    for name, folder in folders.items():
        sources = images_in(root / folder)
        if not sources:
            sys.exit(f'{app}: no screenshots in {folder}.')
        (screenshots / name).mkdir(parents=True)
        for source in sources:
            save_jpeg(source, screenshots / name / f'{source.stem}.jpeg')
            count += 1

    print(f'{app}: {", ".join(languages)} — {count} screenshots')


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__.split('\n\n')[0])
    parser.add_argument('apps', nargs='*', metavar='app',
                        help=f'apps to sync, of {", ".join(APPS)} (default: all)')
    parser.add_argument('--apps-root', type=Path, default=SITE.parent,
                        help='folder holding the app folders (default: the one holding this repo)')
    args = parser.parse_args()

    if unknown := [app for app in args.apps if app not in APPS]:
        parser.error(f'unknown app {", ".join(unknown)}; known: {", ".join(APPS)}')
    for app in args.apps or APPS:
        sync(app, APPS[app], args.apps_root)


if __name__ == '__main__':
    main()
