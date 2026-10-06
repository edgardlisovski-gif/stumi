# BOBCAT LT

Moderni vieno puslapio Lietuvos technikos paslaugų svetainė, sukurta naudojant React, TypeScript ir Vite.

## Paleidimas

Reikalinga Node.js 20 arba naujesnė versija.

```bash
npm install
npm run dev
```

Produkcinė versija sukuriama komanda `npm run build` ir patalpinama į `dist/` katalogą.

## Prieš publikuojant

- `src/main.tsx` viršuje pakeiskite `PHONE` ir `PHONE_LINK` reikšmes.
- Pakeiskite `info@example.lt` į tikrą el. pašto adresą.
- `public/robots.txt` ir `public/sitemap.xml` pakeiskite `https://example.lt` į savo domeną.
- Projektą talpinkite Vercel platformoje. Kontaktų forma naudoja `api/contact.js` ir Resend, kad užklausos būtų siunčiamos tiesiai į `info@stumi.lt`.
- Resend paskyroje patvirtinkite siuntėjo domeną ir Vercel projekto nustatymuose pridėkite aplinkos kintamuosius `RESEND_API_KEY` bei `RESEND_FROM_EMAIL` (pvz., `STUMI.lt <uzklausos@stumi.lt>`). Nustatę kintamuosius, iš naujo publikuokite svetainę.

Nuotraukos pateikiamos per Unsplash CDN; prieš galutinį publikavimą rekomenduojama jas pakeisti savo darbų ir technikos fotografijomis.
