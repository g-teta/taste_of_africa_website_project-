# Tastes of Africa

A responsive static website celebrating African food, recipes, regional cuisines, and food stories.

## Project overview

This project showcases:
- authentic African recipes
- region-based cuisine exploration
- food stories and cultural context
- a saved-favorites feature for recipe cards
- a light/dark theme toggle
- newsletter signup and contact form validation

## Included pages

- `index.html` — home page
- `recipes.html` — recipe listing with search and region filters
- `recipe-jollof-rice.html` — Jollof rice recipe
- `recipe-egusi-soup.html` — Egusi soup recipe
- `recipe-lentils-injera.html` — Lentils and injera recipe
- `recipe-tagine.html` — Preserved lemon tagine recipe
- `recipe-pilau.html` — East African pilau recipe
- `recipe-cape-malay-curry.html` — Cape Malay curry recipe
- `regions-west-africa.html` — West Africa region page
- `regions-east-africa.html` — East Africa region page
- `regions-north-africa.html` — North Africa region page
- `stories.html` — food stories and essays
- `about.html` — project overview and cultural context
- `contact.html` — contact form page
- `favorites.html` — saved recipes page
- `styles.css` — site styling and responsive layout
- `script.js` — interactive behavior and form logic
- `images/` — local photography used across the site

## Run locally

Because this is a static website, you can open the HTML files directly in a browser.

For a simple local preview server, run:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Features

- multi-page layout with rich culinary storytelling
- region-based recipe filtering and search
- favorite recipe saving with browser `localStorage`
- ingredient scaling on recipe detail pages
- dark/light theme toggle with saved preference
- contact/newsletter form validation
- embedded YouTube tutorials for selected recipes

## Notes

- The website uses local image files stored in the `images/` folder.
- No backend or database is required.
- Favorite recipes and theme preference are stored in the browser.

## License

This project is intended for educational and personal use unless otherwise specified.
