# Ruturaj Jena — portfolio

A hover-reveal, scroll-driven WebGL portfolio. Two pixel-aligned portraits (designer / engineer) share one hero; the
pointer carves a liquid window between them, a click floods the whole scene into the other world, and scrolling
dissolves the portrait into a particle system that re-forms as a different 3D shape for every section.

**Stack** — Vite · Three.js (raw shaders, one renderer) · GSAP + ScrollTrigger + SplitText · Lenis. No framework.

## Run it

```bash
npm install
npm run dev
```

```bash
npm run build      # static site in dist/, relative base, so it works from any sub-path
npm run preview
```

## How it is put together

- `index.html` — all static copy and structure.
- `src/content.js` — copy rendered from JS: the two hero modes, the three craft chapters, the logo ring, the stack lists.
- `src/main.js` — boot, loader, smooth scroll, every DOM animation, and `buildKeyframes()`, which maps scroll ranges
  to what the particles are doing (shape, position, colour, backdrop glow).
- `src/gl/stage.js` — the single WebGL stage. Three passes a frame: pointer trail → hero/backdrop → particles.
- `src/gl/shaders.js` — GLSL for those passes.
- `src/gl/shapes.js` — particle targets: spiral, interface panels, agent, pipeline, bust, globe.

Add `?debug` to the URL to get `window.__stage` and `window.__ScrollTrigger` in the console.

## Assets

Generated with Higgsfield, then processed locally:

| File | Source |
|---|---|
| `public/assets/img/hero-human*.webp`, `hero-machine*.webp` | Nano Banana Pro portrait + a pixel-aligned edit, background removed |
| `public/assets/img/role-*.webp` | Nano Banana Pro, one per discipline |
| `public/assets/video/agents-loop.mp4` | Seedance 2.0 Mini, 5s, played forward then reversed so it loops |
| `public/assets/geo/android.bin` | Tripo text-to-3D mesh, sampled to 42k points |
| `public/assets/geo/bust.bin` | Tripo image-to-3D mesh of the hero portrait, sampled to 44k points |

The meshes themselves (43 MB each) are not shipped. To regenerate the derived files:

```bash
node scripts/process-images.mjs <folder-with-raw-pngs>
node scripts/sample-glb.mjs <model.glb> public/assets/geo/<name>.bin 44000 --preview check.png
```

`scripts/shoot.mjs <outDir> [--mobile]` drives a running preview in headless Chrome and saves a screenshot per
section, reporting console errors and failed requests.

Macrova screenshots and the AWS / tool logos are carried over from the previous portfolio.

## Behaviour worth knowing

- **Reduced motion** — no smooth scroll, autopilot, particle turbulence, tilt or magnetic effects; reveals are instant.
- **No WebGL** — the hero falls back to a still gradient and portrait; everything else is ordinary DOM.
- **Touch** — an autopilot pointer wanders over the portrait so the reveal is visible without hovering; the
  Designer / Engineer switch does the full swap.
