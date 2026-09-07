"""Partnerlogó átszínezése a lábléchez.

Egy egyszínű (fekete, átlátszó hátterű) PNG-t krémszínűre (--cream-100, #FFF8EA)
színez az alfa megtartásával, és max. 800px szélesre kicsinyít. A fekete logó a
borszínű láblécen láthatatlan lenne, ezért kell ez a negatív változat.

Használat:
    python scripts/tint-logo.py assets-src/logos/nka_2024ff.png public/assets/logos/nka.png
"""

import sys
from pathlib import Path

from PIL import Image

CREAM = (0xFF, 0xF8, 0xEA)
MAX_WIDTH = 800


def tint(src: Path, dst: Path) -> None:
    im = Image.open(src).convert("RGBA")
    alpha = im.getchannel("A")
    out = Image.new("RGBA", im.size, CREAM + (0,))
    out.putalpha(alpha)
    bbox = alpha.getbbox()
    if bbox:
        out = out.crop(bbox)
    if out.width > MAX_WIDTH:
        ratio = MAX_WIDTH / out.width
        out = out.resize((MAX_WIDTH, round(out.height * ratio)), Image.LANCZOS)
    dst.parent.mkdir(parents=True, exist_ok=True)
    out.save(dst, optimize=True)
    print(f"{dst}: {out.width}x{out.height}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    tint(Path(sys.argv[1]), Path(sys.argv[2]))
