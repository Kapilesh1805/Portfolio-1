# Atelier Portfolio

React + Vite site, styled entirely with Tailwind CSS v4 (no custom `.css` file with hand-written rules — just Tailwind utility classes in each component, plus a small `@theme` block for the custom colors/fonts).

## Structure

```
src/
  main.jsx              entry point
  index.css             Tailwind import + @theme (colors, fonts) + tiny global resets
  App.jsx                composes all sections, holds shared state (menu, active section, scroll)
  data/
    content.js           projects + services data
  components/
    Navbar.jsx            top nav — NOT sticky, scrolls away with the hero as you asked
    Hero.jsx
    About.jsx
    Work.jsx               "Selected work" project grid
    Gallery.jsx             orbit image gallery
    Services.jsx
    Statement.jsx           big quote section
    Testimonials.jsx
    Contact.jsx
    Footer.jsx
```

## Useful commands

Run these from inside this project folder (`cd atelier-portfolio` first if needed):

| Command | What it does |
|---|---|
| `npm install` | installs all dependencies (do this first) |
| `npm run dev` | starts the local dev server with hot-reload, usually at `http://localhost:5173` |
| `npm run build` | builds the production-ready site into a `dist/` folder |
| `npm run preview` | serves the `dist/` build locally so you can check it before deploying |
| `rm -rf node_modules package-lock.json && npm install` | clean reinstall if something's broken |

## Notes

- Tailwind v4 is wired up via `@tailwindcss/vite` in `vite.config.js` — there's no `tailwind.config.js` or `postcss.config.js` needed for this setup; custom colors (`ivory`, `espresso`, `bronze`, etc.) and fonts (`font-sans`, `font-mono`, `font-serif`) are defined once in `src/index.css` under `@theme` and are then usable as normal Tailwind classes (`bg-espresso`, `text-bronze-light`, `font-serif`, ...) everywhere.
- The navbar was changed from `position: sticky` to normal flow, so it now scrolls down with the hero section instead of staying pinned at the top.
