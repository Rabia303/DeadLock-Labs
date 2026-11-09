# Deadlock Labs — studio website

Client-facing site for Deadlock Labs (Rabia Imtiaz & Tayyaba Rehan).

## Run it

```bash
npm install
npm run dev      # local preview
npm run build    # production build (dist/)
```

## Edit content

Everything you'd want to change is in **`src/config.js`**: tagline, services, work, team bios, FAQ, and links.

- **Upwork:** paste your profile URL into `PLATFORMS` → `upwork.url`. Until then the card shows "Profile coming soon".
- **WhatsApp:** set `SITE.whatsapp` (e.g. `923001234567`) to show a WhatsApp button.
- **Studio email:** change `SITE.email` once you have a domain email. The contact form opens the visitor's email app pre-filled and sends to this address.
- **Tayyaba:** update your `bio`, `skills` and `github` in `TEAM`.
- **Project screenshots:** drop them into `src/assets/screenshots/`, named after each project (see the README.txt in that folder). They replace the placeholders automatically.

## After deploying

Add the full site address in `index.html` (`og:url` and `og:image`, currently commented out) so link previews work on LinkedIn and WhatsApp.

## Demo sites

Three concept websites live in `public/demos/` (`restaurant`, `clinic`, `clothing`).
Each is a single self-contained `index.html`. Once deployed they open at
`/demos/restaurant/` etc. and appear in the Work section and the hero.
Their names and reviews are fictional and labelled as demos.

## Founding offer & reviews

Edit `FOUNDING_OFFER` in `src/config.js` (set `enabled: false` to hide it).
Add client reviews to `TESTIMONIALS`; the reviews section appears automatically.

## Logo

`src/components/Logo.jsx` and `public/favicon.svg`: the D mark built from cycle arrows
(magenta stem arrow, purple and blue loop arrows).
`public/og-image.png` is the link-preview image.

## Pricing

Packages, bigger-project prices and "included" items are in `src/config.js`
(`PACKAGES`, `CUSTOM_PRICING`, `INCLUDED`). Visitors in Pakistan see Rs by
default and everyone else sees $; the toggle lets anyone switch.

## Forms (contact + free audit)

1. Go to https://web3forms.com, enter the inbox that should receive enquiries, and copy the access key they email you.
2. Paste it into `FORMS.web3formsKey` in `src/config.js`.

Without a key, forms fall back to opening the visitor's email app.

## Site address

The live URL is set to `https://deadlocklabs.vercel.app`. If you deploy elsewhere or buy a domain, update it in:
`index.html` (canonical, og tags, structured data), `public/robots.txt`, `public/sitemap.xml` and `SITE.url` in `src/config.js`.

## Leftover files

`src/assets/work/{hotel,laptop1,movie,ngo1,text}.webp` are unused and excluded from the build; safe to delete.
