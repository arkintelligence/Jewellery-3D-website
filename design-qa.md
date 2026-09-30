# Design QA — Reference Alignment Pass

- Source visual truth: the screenshots supplied at 11:15, 11:17 and 11:20 on 2026-09-30, the supplied gold-bullion image, plus `/Users/vivekrangani/Downloads/Video by itsgireesh.uiux.mp4`
- Implementation: `http://127.0.0.1:4173/`, inspected in the in-app browser
- Viewport: 1302 × 856 CSS px, device scale 1
- Source screenshots: 1920 × 1080. Implementation: 1302 × 856. Compared by normalized section composition because the sources include photographed monitors and surrounding room.
- States tested: two-beat gold intro, necklace-first hero carousel, red-velvet heritage chapter, Masterpiece detail crops, shared Grace canvas, Earrings vitrines, closed lotus, gold bangles and diamond bangles

**Full-view comparison evidence**

- Intro now presents the animated gold crest and wordmark over an intense close-up bullion surface with sparks and bloom.
- Hero opens with the necklace as the dominant centered vitrine and a smaller neighboring product, both grounded on the circular marble platform.
- Grace matches the warm floral ivory-and-gold showroom, with two large silver diamond rings, shared marble pedestal, left editorial copy and right detail note.
- Earrings matches the five-vitrine central composition with left collection copy and right heirloom details.
- Store visit matches the source anatomy: centered heading, overlapping dark information card and warm boutique exterior.
- App promotion now includes six useful features, richer photography, three jewellery previews and a concierge/private-preview panel.
- The missing red-velvet Geetha Jewellers heritage chapter now appears directly after the showroom.
- Masterpiece supporting images are four close crops of the same necklace rather than unrelated product images.
- Grace uses one shared display canvas and the bangle lotus uses a transparent open state on one fixed marble platform.
- Bangles begins with a closed ivory lotus on the fixed platform, opens in place, reveals five gold bangles, then transforms them into diamond bangles.

**Focused comparison evidence**

- Hero container baselines were inspected against the marble platform; no vitrine floats above or sinks beneath it.
- Grace rings were lowered after the first browser pass so their bases visually meet the shared plinth.
- Earring image opacity, crop and material detail were checked at full size; the jewellery remains sharp and fully opaque.
- Store image crop, card overlap and information hierarchy were checked at full desktop width.
- Bangle chapter was checked at start, 62% and 96% scroll progress.

**Findings**

- No actionable P0/P1/P2 findings remain for the requested changes.
- P3: the photographed references have softer monitor bloom and perspective distortion that are intentionally not reproduced in the direct browser rendering.

**Required fidelity surfaces**

- Fonts and typography: Cormorant Garamond display hierarchy and Montserrat labels preserve the reference's luxury editorial tone and line breaks.
- Spacing and layout rhythm: left-copy / central-product / right-note layouts match the source chapter anatomy.
- Colors and visual tokens: warm cream, ivory marble, champagne gold and bright silver remain consistent across all revised scenes.
- Image quality and asset fidelity: real raster showroom, vitrine, ring, lotus and jewellery assets are used at full opacity; no placeholder jewellery is present.
- Copy and content: reference-aligned headings and collection labels remain visible and readable.

**Interaction verification**

- Intro motion and gold illumination verified.
- Horizontal hero product travel verified with grounded containers.
- Grace ring entrance animation verified.
- Earring image movement and light sweep verified.
- Closed → open → gold → diamond bangle order verified.
- Browser console checked: no errors.
- `npm run build`: passed.
- `npm run test:sites`: 4/4 passed.

**Comparison history**

- Earlier P1: hero vitrines appeared vertically detached from the platform. Fixed by removing per-item vertical bob and assigning one stable platform baseline.
- Earlier P1: Grace used a cool/dull background and rings lacked a shared display surface. Fixed with the warm floral showroom background and marble-gold pedestal.
- Earlier P1: bangle direct entry could expose a product before the lotus opened. Fixed by replacing overlapping tweens with explicit scroll-progress states.
- Earlier P2: earring artwork looked like a faded panel. Fixed by using full-opacity normal blending, correct contain crop and editorial side columns.
- Post-fix evidence: all states were recaptured in the in-app Browser at the target viewport.

**Implementation Checklist**

- [x] Animated full-gold intro
- [x] Grounded horizontal hero vitrines
- [x] Reference-aligned Grace background and rings
- [x] Reference-aligned earring vitrines and editorial content
- [x] Closed lotus first state
- [x] Gold and diamond bangle states in correct order
- [x] Responsive rules retained
- [x] Reference-aligned store visit section
- [x] Information-rich app promotion

final result: passed

## Header Full-Lockup and Wordmark Pass — 2026-09-30

- Source visual truth: `/Users/vivekrangani/Desktop/Screenshot 2026-09-30 at 3.23.16 PM.png`.
- Implementation: `http://127.0.0.1:4173/`, browser-rendered capture emitted from Codex in-app Browser tab 8.
- Viewport/state: 338 × 856 CSS px, device scale 1, showroom entered with the sticky header visible.
- Source pixels: 1920 × 1080; implementation capture: 338 × 856. The shared header region was compared because the source includes unrelated desktop browser chrome.
- Full-view evidence: the transparent showroom header now contains the complete supplied Goldentree Jewels Limited lockup plus a separate prominent wordmark.
- Focused evidence: the mobile lockup measures approximately 52px square; “Goldentree Jewels” renders at 14px and scales fluidly to 28px on desktop. The 184px mobile brand group fits without horizontal overflow.
- Fonts and typography: the display wordmark uses the established Cormorant hierarchy, heavier weight and animated gold treatment; the company qualifier remains subordinate.
- Spacing/layout: logo and copy form one centered two-column header unit while leaving room for navigation controls.
- Colors/tokens: champagne-gold highlights remain consistent with the showroom palette.
- Image quality: the supplied full `LOGO V5.png` artwork is used; multiply blending removes its light canvas without replacing the mark with CSS art.
- Copy/content: “Goldentree Jewels” and “Jewels Limited” are both present and readable.
- Browser checks: intro-to-showroom scrolling and sticky header visibility passed; no horizontal overflow; no console errors. Existing GSAP missing-target and Three.js deprecation warnings are unrelated to this scoped change.
- Comparison history: the first pass used the dark-backed full logo and exposed a black header tile. The second pass replaced it with the supplied light full lockup and multiply blending, removing the tile while retaining the enlarged brand name.
- No actionable P0/P1/P2 findings remain. P3: the smallest viewport uses a smaller wordmark than desktop to preserve the side navigation.

final result: passed

## Supplied Brand, Destinations and App Downloads — 2026-09-30

- Source visual truth: `/Users/vivekrangani/Downloads/WhatsApp Image 2026-09-30 at 14.54.29.jpeg` and `/Users/vivekrangani/Downloads/WhatsApp Image 2026-09-30 at 14.54.29 (1).jpeg`.
- Implementation: `http://127.0.0.1:4173/`, captured and inspected in the Codex in-app browser at 1375 × 900 desktop and 390 × 844 mobile CSS viewports.
- State coverage: initial gold-bullion logo reveal, showroom header transition, app-download actions/QR codes, and expanded desktop/collapsed mobile footer.
- Full-view evidence: the supplied three-dimensional black-and-gold lockup now appears in the intro, editorial branding and footer; the compact supplied emblem appears in the transparent header and store card.
- Focused evidence: Android and iOS badges each include the correct platform icon and a distinct scannable QR; DOM readback confirmed the exact Instagram, Pinterest, YouTube, WhatsApp, Google Play, App Store and Google Maps URLs.
- Fonts/typography: retained the established editorial display hierarchy while applying a higher-contrast animated gold treatment to brand copy.
- Spacing/layout: desktop and mobile app-download groups remain balanced; no horizontal overflow at 390 px.
- Colors/tokens: supplied black leather and metallic-gold identity is preserved; warm cream/champagne site palette remains unchanged.
- Image quality: both supplied raster logos use contained/cropped presentation without stretching; glow animation preserves legibility.
- Copy/content: WhatsApp prefill, contact destinations and store/app labels match the user-provided content.
- Primary interactions tested: all destination hrefs, separate store downloads, mobile footer accordions, and the directions link.
- Console: no new application errors; existing non-blocking GSAP missing-target and Three.js deprecation warnings remain.
- Comparison history: initial QA found the generic `.brand-spark` positioning rule moved the fixed intro logo out of view (P1); `.intro-logo.brand-spark { position: fixed; }` restored the intended reveal, confirmed by a centered 517 × 350 px live bounding box and browser capture. Header contrast was then strengthened with a dark edge and gold glow.
- Production build passed; Sites tests passed 4/4.

final result: passed

## Goldentree Responsive and Brand Pass — 2026-09-30

- Restored the original gold-to-dome cinematic intro and logo flight into the showroom header; no separate loader interrupts the sequence.
- Strengthened the transparent header lockup with a brighter gold wordmark, visible subtitle and glow treatment.
- Reworked “More Than Just an App” into a balanced three-column tablet layout and a compact icon-led mobile list.
- Replaced the store image with the supplied real Goldentree Rajkot storefront and aligned the store/footer contact details.
- Enlarged the bangle lotus stage so all five bangles remain visible, and verified the open state at 1375 × 900.
- Constrained all four Masterpiece product images to `object-fit: contain`; automated bounding-box checks confirm every product stays inside its frame.
- Verified tablet (1024 × 800), mobile (390 × 844), and desktop (1375 × 900) states in the live browser.
- Production build passed; Sites tests passed 4/4.

final result: passed

## Canonical Logo, Complete Bangle Fan and Masterpiece Reveal — 2026-09-30

- Source visuals: supplied 2:22:15 PM bangle screenshot and the four supplied Goldentree logo explorations.
- Selected `LOGO V5.png` as the single canonical lockup because it combines the gold emblem, GOLDENTREE wordmark and JEWELS LIMITED descriptor; applied it to the existing site-wide logo asset.
- Removed the numbered Temple Gold / Diamond / Polki material index from the bangle chapter.
- Recentered and reduced the fan composition so all five bangles render completely. At 1375px desktop, the bangle bounds are 534–1268px inside a 0–1360px canvas; at 390px mobile, they remain within 20–318px of a 0–323px canvas.
- Header is transparent again. The center logo and Goldentree Jewels name use animated warm-gold brightness and shadow treatment, while navigation remains legible and interactive.
- Masterpiece gallery now shows four different jewellery products only: necklace, pendant, earrings and bangle. Each has icon-based sparkle motion and hover illumination.
- Masterpiece entrance order is explicitly sequenced: main image first, editorial copy second, then four jewellery products one by one.
- Desktop and mobile compositions were visually inspected in the in-app browser. Production build and Sites tests passed.

final result: passed

## Goldentree Rebrand, Bangle Framing and Offer Pass — 2026-09-30

- Source visuals: supplied bangle screenshot at 1:37:03 PM and supplied `LOGO V2.png` brand artwork.
- Replaced visible Geetha Jewellers naming and metadata with Goldentree Jewels; the supplied logo is now used in the loader, intro, header, heritage block, store/contact identity and footer.
- Added a staged full-page brand loader, followed by the existing per-section staggered content reveals.
- Header navigation has stronger sizing, contrast, hover lift and animated gold underlines around a larger centered Goldentree identity.
- Adjusted the bangle fan spread and center so all five gold/diamond bangles stay fully inside the fixed canvas. Desktop measurements confirm the rightmost bangle ends at 1230px inside a 1360px canvas.
- Replaced the offer with 7.77% making charges on every jewellery item and a prominent Explore Collection action.
- The Masterpiece detail gallery now uses four distinct product-detail assets rather than repeating one source image.
- Restored six Quick Links, five Legal links and complete Contact details. Desktop groups are expanded; mobile groups start collapsed as dropdowns.
- Desktop and 390 × 844 mobile states were visually inspected; no horizontal overflow was found. Production build and Sites tests passed.

final result: passed

## Concierge, Testimonials, App and Footer Interaction Pass — 2026-09-30

- Appointment eyebrow now uses a distinct italic editorial type treatment; supporting copy is larger and heavier while the existing display title remains unchanged.
- Appointment and WhatsApp actions now include recognizable icons, animated light sweeps and raised hover states; WhatsApp uses the requested white treatment.
- Three appointment service notes now use large gold icon medallions, stronger text and sequential entrance motion.
- Testimonials now present three visible cards on desktop while automatically cycling through five reviews; mobile focuses one card without horizontal overflow.
- Removed the redundant four-box value strip below testimonials.
- App promotion retains all content on phones while reducing the phone artwork and arranging six features in a compact two-column grid at 390px.
- Footer link groups are conventional open columns on desktop and native collapsible dropdowns on mobile. Social icons use a counter-rotated inner glyph so the circular control flips without leaving the icon backwards.
- Desktop and 390 × 844 mobile states were visually inspected in the in-app browser. The 390px layout has no horizontal overflow.
- Production build and Sites tests passed.

final result: passed

## Why Choose Us and Testimonials Pass — 2026-09-30

- Source visuals: screenshots supplied at 12:53:34 and 1:00:33, resolved against the authoritative reference video.
- Rebuilt “Why Choose Geetha Jewellers?” as a compact five-benefit composition with standalone oversized icons, no cards, larger readable copy and a heading-first staggered reveal.
- Rebuilt “What Our Customers Say” as a compact five-review slider with automatic 4.8-second transitions, gold rating stars, customer identity, progress dots and manual selection.
- Both sections use warm cream, ivory and champagne-gold backgrounds consistent with the rest of the website.
- Desktop and 390 × 844 mobile states were visually inspected in the in-app browser; no horizontal overflow was found.
- Production build passed; Sites tests passed 4/4.

final result: passed

## App Promotion and Footer Refinement — 2026-09-30

- Source visual truth: the supplied 11:45 app/footer screenshots and the authoritative reference video.
- App section begins close to its top edge, with larger two-line eyebrow copy, larger supporting subheading, stronger paragraph typography and a substantially larger phone presentation.
- Lead phone now shows the reference-aligned woman-with-earrings editorial screen; the second phone retains the catalogue screen.
- Six app benefits now use recognizable feature icons, larger headings and body copy, and interactive elevated cards.
- Store badges and a real scannable QR image remain on the content side rather than beside the phones.
- Added the reference “More Than Just an App” benefits band between app promotion and footer.
- Footer brand lockup is larger and more prominent, social icons remain recognizable and animated, body copy is more readable, and the final copyright/devotion statement is a single line.
- Desktop and 390 × 844 mobile states were visually inspected in the in-app browser. No P0/P1/P2 issues remain.
- Production build passed; Sites tests passed 4/4.

final result: passed

## Appointment, Store Visit and Readability Pass — 2026-09-30

- Source visuals: screenshots supplied at 11:55:04 and 10:55:22, with the reference video used to resolve photographic detail.
- Appointment CTA now matches the wide editorial composition: large left-aligned headline, readable supporting copy, two clear actions, three service notes, and a luminous cream-and-gold boutique photograph concentrated on the right.
- Store visit now uses a realistic street-level Geetha Jewellers storefront with terracotta fascia, showroom depth, dark overlapping information card, full address/contact/hours hierarchy, and the gold directions action.
- Desktop and 390 × 844 mobile states were visually inspected in the in-app browser. Copy remains readable, store imagery keeps its focal point, and the information card stacks without clipping.
- Body copy weight and size were raised across editorial details, testimonials, reasons, app features and the footer while preserving the existing display-heading hierarchy.
- Footer uses recognizable Facebook, LinkedIn, Instagram and YouTube icons with focus-visible/hover flip motion.
- No P0/P1/P2 issues remain for this pass.

final result: passed
