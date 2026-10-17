"""Cleans and smooths the hero portraits (hair halo, jacket noise) and re-exports them.

  python3 scripts/smooth-hero.py [src-dir=public/assets/img]

Both layers get the same geometry (2x Lanczos upscale), so they stay pixel-aligned.
Needs: pip install opencv-python-headless numpy pillow
"""
import sys, cv2, numpy as np
from pathlib import Path
from PIL import Image

d = Path(sys.argv[1] if len(sys.argv) > 1 else 'public/assets/img')

def smooth(name, human):
    im = np.array(Image.open(d / f'{name}.webp').convert('RGBA'))
    rgb, a = im[..., :3].astype(np.float32), im[..., 3].astype(np.float32) / 255
    H, W = a.shape
    inside = (a > 0.5).astype(np.uint8)

    if human:
        # 1. strip the grey/white cut-out specks that survive around the hair
        near_edge = cv2.dilate(1 - inside, np.ones((3, 3), np.uint8), iterations=16).astype(bool)
        hsv = cv2.cvtColor(im[..., :3], cv2.COLOR_RGB2HSV).astype(np.float32)
        sat, val = hsv[..., 1] / 255, hsv[..., 2]
        far = cv2.dilate(1 - inside, np.ones((3, 3), np.uint8), iterations=30).astype(bool)
        far[int(H * 0.17):] = False                                                  # only above the glasses
        speck = (near_edge | far) & (sat < 0.30) & (val > 105)
        a[speck] = 0
        # drop tiny disconnected islands
        n, lab, st, _ = cv2.connectedComponentsWithStats((a > 0.5).astype(np.uint8), connectivity=8)
        keep = np.isin(lab, [i for i in range(1, n) if st[i, cv2.CC_STAT_AREA] > 400])
        a[~keep] = 0

    # 2. de-fringe: bleed interior colour outwards so soft edges never carry background colour
    solid = (a > 0.92).astype(np.float32)[..., None]
    num, den = rgb * solid, solid.copy()
    for k in (3, 9, 25):
        num_b, den_b = cv2.GaussianBlur(num, (0, 0), k), cv2.GaussianBlur(den, (0, 0), k)
        fill = num_b / np.maximum(den_b[..., None] if den_b.ndim == 2 else den_b, 1e-4)
        fill = fill.reshape(rgb.shape)
        use = (solid < 0.5)
        rgb = np.where(use, np.where(den_b.reshape(H, W, 1) > 0.02, fill, rgb), rgb)
    rgb = np.clip(rgb, 0, 255)

    # 3. 2x upscale (Lanczos), then smooth the dark, noisy areas
    big = cv2.resize(rgb.astype(np.uint8), (W * 2, H * 2), interpolation=cv2.INTER_LANCZOS4)
    ab = cv2.resize(a, (W * 2, H * 2), interpolation=cv2.INTER_CUBIC)
    ab = cv2.GaussianBlur(ab, (0, 0), 1.1 if human else 0.8)
    ab = np.clip((ab - 0.08) / 0.84, 0, 1)                      # tighten blurred alpha back to a clean soft edge

    den = cv2.fastNlMeansDenoisingColored(big, None, 7, 7, 5, 15)
    den = cv2.bilateralFilter(den, 9, 28, 7)
    lum = cv2.cvtColor(big, cv2.COLOR_RGB2GRAY).astype(np.float32) / 255
    dark = np.clip((0.42 - lum) / 0.30, 0, 1)                     # more smoothing the darker it is (jacket, hair)
    dark = cv2.GaussianBlur(dark, (0, 0), 4)[..., None]
    w = 0.25 + 0.7 * dark
    out = (big * (1 - w) + den * w).astype(np.uint8)

    # a whisper of grain-free sharpening on the final so the face stays crisp
    soft = cv2.GaussianBlur(out, (0, 0), 1.4)
    out = np.clip(out.astype(np.float32) + (out.astype(np.float32) - soft) * 0.35 * (1 - dark), 0, 255).astype(np.uint8)

    rgba = np.dstack([out, (ab * 255).astype(np.uint8)])
    img = Image.fromarray(rgba, 'RGBA')
    img.save(d / f'{name}.webp', quality=90, alpha_quality=95, method=6)
    sm = img.resize((1240, int(1240 * img.height / img.width)), Image.LANCZOS)
    sm.save(d / f'{name}-sm.webp', quality=88, alpha_quality=92, method=6)
    print(name, img.size, (d / f'{name}.webp').stat().st_size // 1024, 'KB')

smooth('hero-human', True)
smooth('hero-machine', False)
