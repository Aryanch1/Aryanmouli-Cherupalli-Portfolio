# Source pack — ruturaj-augmented-portfolio

Complete source for this build, exactly as it was developed.

## Requirements

- **Node.js 20+** — download the LTS build from https://nodejs.org/
  (Windows/Mac: the installer handles everything. Mac + Homebrew:
  `brew install node`)

Check it worked: `node --version` should print a version number.

Built with **Vite 8**.

## Run it

Open a terminal **inside this folder**, then:

```bash
npm install
npm run dev
```

Then open **http://localhost:5173** in your browser.

The install step is one-time and takes ~30-60 seconds.

## Or let an AI agent do it

If you use Claude Code, Antigravity, Cursor or Windsurf, open this folder as a
project and ask:

> Install the dependencies and run this project, then give me the URL

It will read this file, run the right commands and sort out anything that
trips. You still need Node.js installed; everything after that it can handle.

Leave the terminal open while you use the site. Press Ctrl+C to stop it.

To build for production: `npm run build`

Full step-by-step instructions, including how to open a terminal and what to do
if something goes wrong:
https://brand-motion-studios.vercel.app/store/ruturaj-augmented-portfolio

## About the media assets

Everything is here, so the build runs exactly as shown: the two hero
portraits, the three role images, the looping video and the two sampled point
clouds (the 40 MB meshes they were sampled from are not needed and not
included).

The portraits and the point-cloud bust are pictures of the site's author, and
the name, links and project details are his. They are in the pack as working
demo content, not as stock: replace them with your own before you publish. The
prompt pack ends with the prompts each asset was generated from (look for the
"=== ASSET GENERATION PROMPTS ===" section), and scripts/process-images.mjs
and scripts/sample-glb.mjs turn your versions into the files the site loads.

## Licence

Commercial use permitted for your own and client projects. Reselling or
redistributing the source or prompt itself is not permitted.

— Brand Motion Studios · brandmotion.in
