"""Fotók a fesztivál bordó-karmazsin duotónjába.

A háttérkép (hatter_filmpiknik.jpg) már ebben a színvilágban van; ez a script a
többi képet (pl. kivágott portrék) hozza ugyanoda: a fényerőt egy háromlépcsős
színátmenetre képezi, az alfát megtartja.

Használat:
    python scripts/duotone.py assets-src/photos/Torocsik.png public/assets/portraits/torocsik.webp --height 1200
    python scripts/duotone.py assets-src/photos/hatter_filmpiknik.jpg public/assets/hero-bg.jpg --width 1600 --no-tint
"""

import argparse
from pathlib import Path

from PIL import Image

# A háttérképből mintázva: árnyék → középtónus → fény.
STOPS = [(0.0, (58, 10, 24)), (0.55, (196, 30, 76)), (1.0, (240, 163, 184))]


def ramp() -> list[tuple[int, int, int]]:
    out = []
    for i in range(256):
        t = i / 255
        for (t0, c0), (t1, c1) in zip(STOPS, STOPS[1:]):
            if t0 <= t <= t1:
                k = (t - t0) / (t1 - t0) if t1 > t0 else 0
                out.append(tuple(round(c0[j] + (c1[j] - c0[j]) * k) for j in range(3)))
                break
    return out


def tint(im: Image.Image) -> Image.Image:
    im = im.convert("RGBA")
    alpha = im.getchannel("A")
    lum = im.convert("L")
    table = ramp()
    r = lum.point([c[0] for c in table])
    g = lum.point([c[1] for c in table])
    b = lum.point([c[2] for c in table])
    out = Image.merge("RGBA", (r, g, b, alpha))
    bbox = alpha.getbbox()
    return out.crop(bbox) if bbox else out


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("src", type=Path)
    ap.add_argument("dst", type=Path)
    ap.add_argument("--width", type=int)
    ap.add_argument("--height", type=int)
    ap.add_argument("--no-tint", action="store_true", help="csak átméretez és tömörít")
    ap.add_argument("--quality", type=int, default=80)
    a = ap.parse_args()

    im = Image.open(a.src)
    im = im if a.no_tint else tint(im)
    if a.width and im.width > a.width:
        im = im.resize((a.width, round(im.height * a.width / im.width)), Image.LANCZOS)
    if a.height and im.height > a.height:
        im = im.resize((round(im.width * a.height / im.height), a.height), Image.LANCZOS)
    a.dst.parent.mkdir(parents=True, exist_ok=True)
    if a.dst.suffix.lower() in (".jpg", ".jpeg"):
        im.convert("RGB").save(a.dst, quality=a.quality, optimize=True, progressive=True)
    elif a.dst.suffix.lower() == ".webp":
        im.save(a.dst, quality=a.quality, method=6)
    else:
        im.save(a.dst, optimize=True)
    print(f"{a.dst}: {im.width}x{im.height}, {a.dst.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
