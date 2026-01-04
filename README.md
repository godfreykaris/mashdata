# Mashdata Website

React + TypeScript + Vite conversion of the Mashdata WordPress export. The site preserves the original HTML and styles while removing WordPress dependencies and serving all assets locally where possible.

## Tech Stack
- React 19 + TypeScript
- Vite
- Tailwind CSS (utilities available; preflight disabled)

## Local Setup
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Routes
- `/` (Home)
- `/about-us/`
- `/our-work/`
- `/blog/`
- `/contact-us-2/`

## Project Structure
- `src/pages/html/` original HTML exports
- `src/pages/WpPage.tsx` renders HTML with body attributes
- `src/data/blogPosts.ts` blog index content (add new posts here)
- `src/styles/` custom styles and extracted inline CSS
- `public/` local vendor assets and uploads

## SEO
- Update `public/robots.txt` and `public/sitemap.xml` with your production domain.
- Page metadata and structured data are managed in `src/pages/WpPage.tsx`.

## Scripts
- `npm run dev` start dev server
- `npm run build` production build
- `npm run preview` preview build
