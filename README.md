# AJ Construction Inc. — website

Static website for AJ Construction Inc. (Hudson, MA). Three pages, no build step:

| File | Page |
| --- | --- |
| `index.html` | Home |
| `services.html` | Services (one service open at a time; `services.html#decks` opens Decks) |
| `contact.html` | Contact and estimate form |

Scripts are in `js/`, images in `assets/`. Fonts load from Google Fonts (Archivo and Big Shoulders).

## Publish with GitHub Pages

Settings → Pages → Source: **Deploy from a branch** → Branch: `main`, folder `/ (root)`.

## Before launch

- **Photos.** Every image except the hero and logo is an empty placeholder (dashed box). Replace them with real job photos: the About photo, the six service cards on the Home page, four photos per service on the Services page, and the before/after pairs.
- **Before and after.** Project names and towns are set in `index.html` (`window.BA_PROJECTS`); towns are `[Town], MA` placeholders.
- **Reviews.** The three reviews are placeholders in `[brackets]`. Use real client reviews only, and set the "Read all reviews on Google" link (`href="#"`).
- **Hours.** `[Monday to Friday, 8:00 a.m. to 5:00 p.m.]` on the Contact page needs confirming.
- **Instagram.** The footer links to `instagram.com/ajconstrutioninc` — check the handle spelling.
- **Estimate form.** The form opens the visitor's email app with the request addressed to ajconstruction23inc@gmail.com; photos must be attached by hand. To receive submissions (and photo uploads) directly, connect the form to a form service and update `js/contact.js`.
