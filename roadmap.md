# Roadmap

## Completed
- [x] Rewrite site content for Nigerian audience
- [x] Add WhatsApp enquiry links with prefilled service message (+234 number)
- [x] Add a restrained shader gradient to the homepage hero after approval
- [x] Build the instant quote estimator (/quote) with WhatsApp hand-off
- [x] Dedicated page for each service (/services/<slug>) with FAQs, process, structured data and share images
- [x] Assistant upgrade: guided mode that works with no setup, plus AI mode via /api/chat when ANTHROPIC_API_KEY is set

## Open
- [ ] AI property brief: client describes the space, model recommends services and drafts a tailored enquiry (Lovable AI Gateway)
- [ ] Suggest premium social and marketing features; answer the user's question
- [ ] Confirm the published homepage serves the corrected copy; live is currently behind the preview — awaiting the user's Publish → Update
- [ ] Consider R3F, liquid glass, scroll world and liquid logo only if a later visual pass needs them
- [ ] Replace the placeholder rate card in src/lib/quote.ts with the company's real rates

## Assistant setup (AI mode)
The chat assistant works out of the box in guided mode (rule-based, no cost). To switch on AI mode:
1. Create an Anthropic API key and add it as a secret named `ANTHROPIC_API_KEY` on the deployed Cloudflare Worker (Workers & Pages > the worker > Settings > Variables and Secrets), or with `wrangler secret put ANTHROPIC_API_KEY`.
2. Optional: set `ASSISTANT_MODEL` (default `claude-haiku-4-5-20251001`).
3. Add a Cloudflare rate-limiting rule for `/api/chat` so the key cannot be abused. The endpoint also checks the request origin and keeps a small per-IP throttle, but that only protects a single worker instance.
Without the key, `/api/chat` answers 503 and the widget silently stays in guided mode.
