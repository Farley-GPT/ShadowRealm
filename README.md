# Shadow Realm

Living forms that cross into the world through Grok.

## Structure

```
ShadowRealm/
├── index.html              # Landing page
├── css/main.css            # Shared styles
├── js/app.js               # Shared logic (loads persona JSON)
├── personas/               # One JSON per lifeform
│   ├── seal-woman.json
│   └── teresa-tree-woman.json
├── images/                 # Upload character images here
│   ├── SealWoman.jpg
│   └── TeresaTreeWoman.jpg
├── seal-woman/index.html
└── teresa/index.html
```

## Adding a new lifeform

1. Create `personas/your-character.json` (copy an existing one and edit).
2. Create folder `your-character/index.html` (copy an existing page and change `data-persona`).
3. Upload the image to `images/` and update the path in the JSON.
4. Add a card to the root `index.html`.

## Live URLs (after enabling GitHub Pages)

- Landing: https://farley-gpt.github.io/ShadowRealm/
- Seal Woman: https://farley-gpt.github.io/ShadowRealm/seal-woman/
- Teresa: https://farley-gpt.github.io/ShadowRealm/teresa/

## Notes

- Images must be uploaded manually.
- Each character has Normal + NSFW system prompts in its JSON.
- Theme colors are controlled per-character in the JSON.
