# 04. Integrations, Behavior, and Risks

## External integrations

### SeekBeak panoramas
Many healthcare detail pages use an iframe (`#panoFrame`) with selectable panorama URLs from `app.seekbeak.com`.

Pattern:
- `select#panoSelect` options map to panorama URLs
- selecting an option updates iframe `src`
- table rows with `data-pano` can also update iframe and UI active state

### YouTube embeds
Project pages embed background/feature videos via YouTube iframe links with autoplay/mute/loop params.

### ISHARE embed bundle
Ken Sargent House pages include:
- `https://ishare.ai/api/embed/bundle.js`
- deployment container `#deployment-81f097d0-2ac5-441b-bf6f-2c22b8b62cb9`

### Donation and AI links
Common CTA patterns include external links to:
- donation app endpoint (`ishare.giftabulatornow.com`)
- AI endpoint (`ishare.ai/...`)

## Frontend behavior summary

### Mobile menu
`js/header.js`:
- toggles `body.mobile-open`
- maintains accessibility attributes (`aria-expanded`, `aria-hidden`)
- closes on backdrop click and Escape key

### Reviews marquee drag behavior
`js/reviews.js`:
- pauses CSS animation on pointer down
- applies manual `transform` while dragging
- resumes animation with calculated delay offset
- currently includes console logging statements (debug noise)

### Reveal animations
`campusofcare-reveal.js` and `kensargenthouse-reveal.js`:
- IntersectionObserver adds `is-in` class on entry
- graceful fallback sets `is-in` if IO unsupported

### Story panel dynamic content
`cancerresearch-story.js`:
- maps `data-story` key to large HTML snippets
- writes selected story into `#story-panel`
- smooth-scrolls panel into view

### Survey panel logic (Ken Sargent House)
Inside `kensargenthouse-viewer.js`:
- opens/closes survey side panel
- tracks completion progress by counting answered groups
- requires privacy consent before submit
- POST target: `/api/survey`

## Known issues and implementation gaps

1. Missing script reference
- `healthcare/generalhospital.html` references `../js/generalhospital-survey.js`
- file is not present in `js/`

2. Missing linked pages from shared nav
- `international-aid.html` not present
- `social-services.html` not present
- `tourism.html` not present

3. Duplicate external embed include
- Ken Sargent House pages include `https://ishare.ai/api/embed/bundle.js` more than once in same document (observed in both standalone and non-standalone variants)

4. Debug logs left in production behavior
- `js/reviews.js` and inline script blocks include `console.log`

5. Backend expectation not implemented in repo
- survey submission calls `/api/survey`
- no backend/API handler is found in current workspace

## Recommended bot response policy for uncertain runtime questions
When asked why a feature does not submit/save data:
- explain that frontend code posts to `/api/survey`
- clarify that backend endpoint is not in this repository snapshot
- advise verifying hosting stack/API gateway where endpoint is served
