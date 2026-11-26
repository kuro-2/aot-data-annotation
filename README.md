# AOT Data Annotation & Labeling: marketing site

Static, dependency-free landing page (HTML + CSS + vanilla JS) for Agents Only Technologies.

```
index.html      page markup and content
styles.css      brand tokens, layout, animations, custom scrollbar
script.js       scroll effects, animated diagrams, solutions carousel
assets/         logo-mark.png (icon / favicon), logo-full.png (wordmark)
vercel.json     clean URLs, caching and security headers
```

## Preview locally

Any static server works, for example:

```
npx serve .
```

Then open http://localhost:3000.

## Deploy to Vercel

**Option A: Vercel CLI**

```
npm i -g vercel
cd D:\aot-dal-website
vercel          # preview deployment
vercel --prod   # production deployment
```

When prompted, accept the defaults. Framework preset: **Other**, no build command, output directory `.`.

**Option B: Git + Vercel dashboard**

1. Push this folder to a GitHub, GitLab or Bitbucket repository.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Set Framework Preset to **Other**, leave Build Command empty, and leave Output Directory as the project root.
4. Click **Deploy**.

**Option C: Drag and drop.** Drag the folder onto https://vercel.com/new.

## Editing content

All copy lives in `index.html`. The seven "Custom solutions" entries are in the `SOLUTIONS` array in `script.js`.
Brand colours are CSS variables at the top of `styles.css`.
