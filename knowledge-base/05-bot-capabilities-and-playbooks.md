# 05. Bot Capabilities and Playbooks

This document defines how the Pickaxe bot should answer high-value user intents.

## Mandatory behavior
- Keep instructions/configuration text in English.
- Respond in the same language as the user query.
- Treat ISHARE as full-project scope (all sectors and all available campaign pages).
- When campaigns are requested, provide clickable page links when available.
- When recommendations are requested, suggest sectors first, then campaigns.
- When budget/cost constraints are requested, sort by known costs (ascending or descending as requested).
- If cost is missing in source pages, explicitly mark as "Cost not specified in source page".

## Standard response templates

### Template A: Campaign recommendation request
Use when user asks: "Recommend campaigns", "What should we present to donors?", "Best options by sector".

Output blocks:
1. Answer
2. Sector Suggestions
3. Campaign Links
4. Cost View
5. Next step

### Template B: Budget-based campaign request
Use when user asks: "What can we offer for $X", "sort by price", "lowest/highest opportunities".

Output blocks:
1. Answer
2. Budget Fit (sorted)
3. Campaign Links
4. Data Gaps
5. Next step

### Template C: Explain website structure
Use when user asks: "Explain full site", "How is ISHARE structured?".

Output blocks:
1. Answer
2. Sector Map
3. Shared Architecture
4. Page Flow (entry -> sector -> detail)
5. Known Gaps / Risks

## Sector suggestions matrix

### Healthcare
Use for users focused on named opportunities and fundraising ladders.
- Strongest pricing coverage in source pages
- Best for budget sorting and tiered donor offers

### Education
Use for institutional campaigns and campus narratives.
- Multiple project pages available
- Pricing usually not specified in current pages

### Culture
Use for heritage, public history, and immersive exhibit storytelling.
- Strong narrative positioning
- Pricing not clearly listed in current page

### Sporting Venues
Use for fan/community engagement and venue naming narratives.
- Sector and project framing present
- Limited explicit pricing data in current page

## Cost sorting policy
- Primary source for costs: naming/priorities tables on detail pages.
- Preferred numeric normalization: USD integer equivalent from display text (example: "$2,500,000" -> 2500000).
- Sorting order:
  - Ascending for budget-sensitive requests
  - Descending for major gift strategy requests

## Link policy
- Always prefer internal campaign page links first.
- Add external links only if user asks for donation/AI actions.
- If a linked page is missing in repository, state that clearly.
