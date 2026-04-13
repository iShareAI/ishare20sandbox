# ISHARE Knowledge Base for Pickaxe

This folder contains a retrieval-ready knowledge base for the ISHARE website project.

Language policy for this KB: documentation and instructions are in English; bot reply language should match the user's language.

## Purpose
Use these files as source material for a Pickaxe bot that answers questions about:
- full-site structure and page routing across all sectors
- frontend architecture (HTML/CSS/JS)
- campaign content, links, sector suggestions, and donor flows
- campaign cost ranges and cost-based sorting guidance
- integrations, known issues, and practical operations

## Suggested ingestion order (Pickaxe)
1. `01-project-overview.md`
2. `02-architecture-and-routing.md`
3. `03-page-inventory.md`
4. `04-integrations-behavior-and-risks.md`
5. `05-bot-capabilities-and-playbooks.md`
6. `06-pickaxe-role.md`
7. `campaign-catalog.json`
8. `pickaxe-corpus.jsonl` (high-value chunked facts)

## Notes
- This project is static frontend (no backend code found in workspace).
- Shared header/footer are injected via JS (`js/shared-header.js`, `js/shared-footer.js`).
- Healthcare detail pages in `healthcare/` use relative path rewriting from shared scripts.
- Some menu links target pages that are not currently present in the repository.
- Campaign pricing data is complete only where pricing tables exist in source pages.

## Update protocol
When adding or changing pages/scripts/styles:
1. Update relevant sections in markdown files.
2. Add or update facts in `pickaxe-corpus.jsonl`.
3. Keep IDs stable where possible for retrieval consistency.
