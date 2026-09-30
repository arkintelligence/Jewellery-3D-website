# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Durable visual direction

- Treat `/Users/vivekrangani/Downloads/Video by itsgireesh.uiux.mp4` as the authoritative visual source.
- Maintain a warm cream/off-white, ivory marble, and champagne-gold palette throughout every section.
- The showroom uses narrow tall rounded glass vitrines, gold rear frames, labeled white plinths, and a horizontally traveling product row; do not substitute large capsule domes or conventional cards.
- Preserve the full video sequence: intro, product showroom, signature necklace, diamond ring, earrings collection, bangles collection, appointment CTA, and app promotion.
- Use the supplied full Goldentree Jewels Limited lockup in every brand placement. Keep its dark backing for content/footer visibility; in the header, visually blend away the dark tile so only the luminous gold lockup reads over the showroom.
- The transparent header pairs the complete lockup with a prominent, readable “Goldentree Jewels” wordmark and smaller “Jewels Limited” line; do not reduce it to an emblem-only mark.
- In the header brand stack, keep the full logo on a compact black tile and place the Goldentree Jewels wordmark on the next line beneath it; the surrounding header itself stays transparent.
- In the bangles scene, the lotus, pedestal, and five-bangle fan must share one horizontal anchor: the tallest middle bangle sits on the lotus centerline, with two bangles balanced on each side.
- The appointment CTA uses a spacious cream-and-gold boutique background with large, readable concierge copy and prominent appointment/WhatsApp actions.
- The store-visit section uses a realistic street-level Geetha Jewellers storefront photograph paired with a dark charcoal information card; body copy throughout the site must remain comfortably readable, not decorative microtype.
- Footer social links use recognizable brand icons with a 3D flip hover treatment, and footer body text remains readable on desktop and mobile.
- The app promotion begins near the top of its section, uses a large editorial lead phone featuring a woman wearing earrings plus a catalogue phone, keeps features/download badges/QR on the copy side, and is followed by a “More Than Just an App” benefits band.
- The footer uses a prominent horizontal crest-and-wordmark lockup and one single-line copyright/devotion statement at the bottom.
- “Why Choose Geetha Jewellers?” is a compact five-benefit row with large standalone icons rather than cards; reveal the heading first, then stagger each benefit.
- “What Our Customers Say” is a compact five-review autoplay slider with warm cream/gold imagery, manual dots, and animated transitions.
- Show three testimonial cards at once on desktop while cycling through five total reviews; collapse to one focused card on phones.
- The appointment section uses an italic editorial eyebrow, icon-led sparkling appointment/WhatsApp actions, three icon-led service notes and a staged content reveal.
- On mobile, footer link groups collapse into dropdown accordions and the app promotion keeps all content while using a shorter phone composition and denser feature grid.
- Use the supplied `LOGO V2.png` identity throughout and name the brand “Goldentree Jewels” in all visible copy and metadata.
- The promotional chapter advertises 7.77% making charges on every jewellery item, with a prominent “Explore Collection” action.
- Keep all five bangles fully inside the fixed canvas at every state; none may clip against the viewport edge.
- Use `LOGO V5.png` as the single canonical Goldentree Jewels Limited mark assembled from the supplied logo explorations; keep the header transparent and give the mark and brand name a warm animated gold glow.
- Remove the numbered material index from the bangles chapter so the full five-bangle fan owns the canvas.
- The Masterpiece gallery contains four different jewellery products—necklace, pendant, earrings and bangle—with sparkles and a staged reveal: hero image, editorial copy, then four products one by one.
- Preserve the original cinematic intro sequence without a separate full-screen loader: Goldentree mark on gold, then the illuminated dome/showroom, then the mark settles into the header.
- Footer contact details use Goldentree Jewels Limited, Rajkot, Gujarat, India, +91 7575835916 and jewelsgoldentree@gmail.com with location, phone and email icons; social icons link outward and use Pinterest instead of LinkedIn.
- The store visit chapter uses the supplied real Goldentree storefront photograph.
- At tablet widths, “More Than Just an App” presents a centered introduction followed by three aligned benefit columns; on phones it becomes a compact icon-led vertical list.
- Product thumbnails must show each complete jewellery silhouette inside its frame with breathing room—never crop a product edge.
- Open with an intense close-up gold-bullion film frame; the animated crest and “Geetha Jewellers” wordmark sit directly on the gold and then travel into the centered header.
- The first showroom frame centers a dominant necklace vitrine on the circular platform, with smaller neighboring vitrines only partially visible as the row travels horizontally.
- Include a “Visit Our Store / We’d Love to See You” section with a dark contact-information card beside a warm, realistic boutique exterior photograph.
- Keep the app-promotion section information-rich, using product imagery and a private-preview panel rather than an empty decorative composition.
- Preserve the intro as two continuous beats: a close gold-bullion logo reveal followed by the earlier glowing golden hall before entering the showroom.
- Insert the red-velvet Geetha Jewellers heritage story immediately after the showroom and before “A Masterpiece in Gold.”
- “A Masterpiece in Gold” uses close-up crops of the same hero necklace, not unrelated jewellery products.
- Bangles and Grace each read as one shared fixed display canvas; never give each product or lotus state its own visible rectangular image background.
- Frame the initial bullion image against visible black negative space; it must not crop edge-to-edge. The following showroom background, by contrast, must overfill the viewport with no exposed black bands.
- The focused hero vitrine must visually touch the circular marble platform; compensate for transparent padding inside product PNGs and keep the focused necklace larger than its neighbors.
- The final app-download chapter follows the reference anatomy: editorial download copy at left, two upright phones at right, a six-benefit grid below, store badges and a download mark.
- The footer is a bright ivory/white four-column editorial footer with brand story, Quick Links, Legal, Contact Us, social links and a thin copyright row; it must collapse cleanly for tablets, phones and narrow folded screens.
- Keep the bangles chapter as one pinned, fixed showroom canvas: the background, platform, lotus, copy, and product positions do not travel. Scroll only opens the lotus, reveals five gold bangles, then changes those bangles to diamond before releasing to the next section.
- Keep every hero vitrine fully seated on the showroom platform; the complete product container travels horizontally but never floats above or sinks below the platform.
- Match the Grace chapter to the warm floral ivory-and-gold reference with two large labeled silver diamond rings on one shared pedestal.
- Match the Earrings chapter to the illuminated five-vitrine reference with editorial copy at left, a large central display, and heirloom details at right.
- Use the supplied black-and-gold Goldentree lockup and emblem as the current site-wide brand assets, with animated gold shimmer and sparkle accents.
- Official customer destinations are Instagram `https://www.instagram.com/goldentree_jewels`, Pinterest `https://pin.it/1uMubXe9c`, YouTube `https://www.youtube.com/@goldentreejewels`, WhatsApp `+91 7575835916`, Android app package `com.ark.goldentree`, and iOS app id `6785775980`.
- WhatsApp entry points prefill: “Hi, I want to know more about Goldentree Jewels.” The app chapter shows separate Android and iOS QR codes.
