# Incident Response Runbook

What to do when things break. Each scenario: symptoms -> root cause -> fix -> prevent.

## Scenario 1: Redis Down

Symptoms:
- Admin saves config -> error toast
- Customer sees stale data (no live updates)
- /api/redis-health returns 503

Root Cause:
- Upstash outage or network partition
- Redis credentials expired/revoked

Fix (Immediate):
1. Check Upstash status: https://status.upstash.io
2. If Upstash is down: wait (platform falls back to static JSON configs)
3. If credentials expired: regenerate in Upstash dashboard -> update Vercel env vars -> redeploy

Prevent:
- Monitor /api/redis-health weekly (Runbook Task 8)
- Set up Upstash alerting (email on downtime)

## Scenario 2: Vercel Outage

Symptoms:
- All tenant pages return 502/504
- Admin cockpit inaccessible

Root Cause:
- Vercel platform outage

Fix (Immediate):
1. Check Vercel status: https://www.vercel-status.com
2. If Vercel is down: wait (no workaround)
3. If prolonged (>2h): activate fallback static hosting (Netlify/Cloudflare Pages)

Prevent:
- Set up Vercel status alerts (email/Twitter)
- Document fallback deployment in EMERGENCY-FAILOVER.md (create if needed)

## Scenario 3: Schema Regression

Symptoms:
- Admin form submit -> 422 Unprocessable Entity
- Toast: Validierung fehlgeschlagen

Root Cause:
- Zod schema changed without updating admin form
- Contract test failed but was ignored

Fix (Immediate):
1. Check tests/unit/override-schema.contract.test.ts output
2. Revert schema change OR update admin form to match
3. Redeploy

Prevent:
- Never merge PR with failing contract tests
- Run npm run test:run before every commit

## Scenario 4: Legal Update Required

Symptoms:
- New regulation (e.g., AI Act amendment)
- Customer complaint about compliance

Root Cause:
- External legal change

Fix (Immediate):
1. Consult BETREIBER-RUNBOOK.md Task 7 (AI Act)
2. Update affected pages (e.g., add AI content labels)
3. Deploy + notify affected tenants

Prevent:
- Subscribe to EU AI Act updates (newsletter)
- Quarterly legal review (Runbook Task 9)

## Scenario 5: Toast Spec Violation

Symptoms:
- Toast appears in wrong position (e.g., blocked by ActionBar)
- Toast does not auto-dismiss
- Stacking exceeds 3 toasts

Root Cause:
- ToastContainer.tsx or ToastContext.tsx modified without audit

Fix (Immediate):
1. Run F1 audit: compare current code against R1-R5 spec
2. Revert to last known-good commit OR apply surgical fix

Prevent:
- Never modify Toast files without running full F1 audit
- Add regression test: tests/unit/toast-spec.test.ts (create if needed)

## Escalation Matrix
- Critical (all tenants down): 15 min response, Principal Technical Lead
- High (one tenant broken): 1 hour response, Senior Developer
- Medium (cosmetic issue): 1 day response, Developer
- Low (backlog item): 1 week response, Product Owner

## Post-Incident
After every incident:
1. Write post-mortem in docs/postmortems/YYYY-MM-DD-{scenario}.md
2. Update this runbook with lessons learned
3. Add regression test if applicable

Every incident is an opportunity to make the system more resilient. Document everything.
