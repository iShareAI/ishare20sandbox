# 01. Project Overview

## Project identity
- Brand: ISHARE / iShare
- Domain focus: immersive campaign storytelling for fundraising and donor engagement
- Primary sectors represented in pages: Healthcare, Education, Culture, Sporting Venues
- Typical page intent: present project case, show 360/immersive visual context, communicate naming opportunities, drive donor action

## Repository shape
- Root-level HTML pages for landing, category pages, and several project pages
- Detailed healthcare project pages inside `healthcare/`
- CSS split into:
  - `css/base` (variables, reset, typography, layout)
  - `css/components` (buttons, header, nav, mobile menu, utility bar, etc.)
  - `css/sections` (hero, spacer, sec2, sec3, pricing, footer)
  - `css/pages` (page-specific styles)
- JavaScript in `js/` for shared UI and page-specific behaviors
- Media assets in `img/`

## Technical profile
- Architecture style: static multi-page site (no frontend framework)
- Rendering: server/file static HTML + progressive behavior via vanilla JS
- Shared layout injection:
  - Header HTML injected into `#site-header` by `js/shared-header.js`
  - Footer HTML injected into `#site-footer` by `js/shared-footer.js`
- Mobile menu behavior controlled by `js/header.js`

## UX and content motifs
- Hero sections with video or static image backgrounds
- Campaign/project card grids
- Detailed fundraising pages with:
  - donor opportunity tables
  - panorama viewer controls (`select` -> `iframe`)
  - visual reveal animations on scroll
  - CTA buttons to donation and AI endpoints
- Use of social proof and ecosystem references (FUNDING matters, GIFTABULATOR, PhilanthropyLab, BuilderBillAI)

## Important operational fact
The codebase currently appears frontend-only. Any API expectations (example: survey submission to `/api/survey`) require an external service/backend not present in this repository.
