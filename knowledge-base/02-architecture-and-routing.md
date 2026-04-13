# 02. Architecture and Routing

## Shared layout model
Most production pages include placeholders:
- `#site-header`
- `#site-footer`

Then load scripts:
- `js/shared-header.js`
- `js/shared-footer.js`
- `js/header.js`

### Why this matters
- Navigation and top utility links are centralized in shared scripts.
- Editing menu/footer content in shared JS propagates across pages that include placeholders.

## Relative path adaptation for nested pages
Healthcare detail pages under `healthcare/` are detected by regex in shared scripts and rewritten with `../` prefix for local links/assets.

Behavior summary:
- `shared-header.js` and `shared-footer.js` detect `/healthcare/<slug>.html`
- They rewrite relative `href` and `src` attributes in injected content
- This avoids broken links when reusing same shared HTML template in nested directory

## JS behavior layers
- Global navigation shell:
  - `js/shared-header.js` (inject header markup)
  - `js/shared-footer.js` (inject footer markup)
  - `js/header.js` (mobile drawer open/close, escape handling)
- Landing page enhancement:
  - `js/reviews.js` (drag-to-scroll reviews marquee)
- Healthcare detail interactions:
  - viewer selectors and active table row sync
  - reveal-on-scroll transitions via IntersectionObserver
  - campaign story panel update (cancer research page)
  - survey panel logic (Ken Sargent House page)

## Page route map (high level)
- Home: `index.html`
- Category pages: `healthcare.html`, `education.html`, `culture.html`, `sporting-venues.html`
- Other top-level project pages:
  - `harris-school-of-medicine.html`
  - `johnson-faculty-of-business.html`
  - `nbcc.html`
  - `state-university.html`
  - `stadium-project.html`
- Healthcare detail pages:
  - `healthcare/brightwellmedicalcenter.html`
  - `healthcare/campusofcare.html`
  - `healthcare/cancerresearch.html`
  - `healthcare/generalhospital.html`
  - `healthcare/kensargenthouse.html`
  - `healthcare/kensargenthouse-standalone.html`

## Routing caveats
The shared navigation includes links to:
- `international-aid.html`
- `social-services.html`
- `tourism.html`

These files are not present in current workspace snapshot.
