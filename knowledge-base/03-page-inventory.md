# 03. Page Inventory

## Sector map (full ISHARE scope)
- Healthcare: `healthcare.html` -> `healthcare/*` campaign detail pages
- Education: `education.html` -> top-level campaign pages (`johnson-faculty-of-business.html`, `harris-school-of-medicine.html`, `state-university.html`, `nbcc.html`)
- Culture: `culture.html` (currently implemented as project/detail-style page)
- Sporting Venues: `sporting-venues.html` -> `stadium-project.html`
- Planned links present in shared nav but not yet implemented as files: `international-aid.html`, `social-services.html`, `tourism.html`

## Core landing and category pages

### index.html
- Main landing page for ISHARE platform
- Includes hero video, ecosystem explanation, partner marquee, reviews marquee
- Loads shared header/footer and `js/reviews.js`

### healthcare.html
- Healthcare category landing
- Includes healthcare positioning copy and featured project cards
- Links to detailed healthcare project pages

### education.html
- Education category page (campaign listing and narrative layout)

### culture.html
- Culture category/detail-style page

### sporting-venues.html
- Sporting venues category page

## Top-level project pages

### harris-school-of-medicine.html
- Education/healthcare-adjacent project detail style
- Uses shared header/footer shell

### johnson-faculty-of-business.html
- Education/business project detail style
- Uses shared header/footer shell

### nbcc.html
- Project detail style page
- Uses shared header/footer shell

### state-university.html
- Project detail style page
- Uses shared header/footer shell

### stadium-project.html
- Sporting project detail style page
- Uses shared header/footer shell

## Healthcare detail pages

### healthcare/brightwellmedicalcenter.html
- Contains viewer and naming table interactions
- JS: `brightwellmedicalcenter.js`

### healthcare/campusofcare.html
- Viewer and table interactions + reveal blocks
- JS: `campusofcare-viewer.js`, `campusofcare-reveal.js`

### healthcare/cancerresearch.html
- Viewer select logic + story panel updates from selected rows
- JS: `cancerresearch-viewer.js`, `cancerresearch-story.js`

### healthcare/generalhospital.html
- Viewer interactions + extensive media/story layout
- References `generalhospital-viewer.js`
- Also references `generalhospital-survey.js` (file not found in workspace)

### healthcare/kensargenthouse.html
- Full campaign page with:
  - panorama selector
  - naming opportunities table with active row highlighting
  - reveal sections
  - survey panel and progress logic
- JS: `kensargenthouse-viewer.js`, `kensargenthouse-reveal.js`
- Includes external embed script from `https://ishare.ai/api/embed/bundle.js`

### healthcare/kensargenthouse-standalone.html
- Standalone variant of Ken Sargent House page
- Similar fundraising and viewer structure
- Loads the same viewer and reveal scripts
- Includes external embed script from `https://ishare.ai/api/embed/bundle.js`

## Support/demo pages
- `typography-preview.html`
- `color-palette-strip.html`

These are style reference/demo artifacts, not primary campaign funnels.
