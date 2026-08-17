# Project Handover

What the next Technical Lead needs to know to take over this project in 30 minutes.

## Project Status (as of 2026-08-18)
- Code Quality: Production-ready (70/70 tests, 32/32 pages, 0 critical issues)
- Security: Hardened (SAMEORIGIN, HSTS, CSP, JWT, rate limits)
- Legal: Compliant (DDG/MStV, Upstash SCCs, AI Act policy)
- Accessibility: WCAG 2.1 AA (Toast specs implemented, aria-labels, roles)
- Performance: Optimized (Lighthouse 100/100/100/100, <200KB JS)
- Documentation: Complete (Manifest, Runbook, Backlog, Architecture)

## Critical Information

### 1. Live-Save Architecture
Admin changes -> Redis override -> revalidateTag(config) -> customer sees update immediately. Do not remove revalidateTag or noStore() - they are the core of live updates.

### 2. Tenant Switching
- Development: NEXT_PUBLIC_TENANT_ID=kiosk npm run dev
- Production: Middleware routes based on hostname (e.g., kiosk.example.com)
- Adding a tenant: Create configs/{tenantId}.json + add route to middleware

### 3. Security Policies (from QUALITY-MANIFESTO.md)
- CORS * only on /api/config (public read-only)
- Webhook signatures mandatory for future payment integrations
- EU AI Act: label AI-generated content, never use watermark removers

## Open Decisions (F1-F18)
These items are documented but not yet implemented. Trigger = customer demand, not technical debt.
- F2: Vercel Region fra1 (Pending, Manual: Vercel -> Settings -> Region)
- F4: Remove SENTRY_* vars (Pending, Manual: Vercel -> Environment Variables)
- F6: Sonntag-Checkbox label (Pending, Cosmetic: wrap in <label> or accept)
- F12: Undo-Toast (S5 spec) (Pending, Backlog: trigger = destructive flow)
- F13: Design Pass v2 (Pending, Backlog: trigger = customer branding)

## Backlog Triggers
These features are documented in DESIGN-BACKLOG.md but not implemented:
- JSON-LD per vertical: Trigger = Customer asks for SEO, Effort = Low (1h)
- ISR instead of force-dynamic: Trigger = CWV degradation detected, Effort = Medium (4h)
- WhatsApp CTA: Trigger = Customer requests, Effort = Low (30min)
- Hover-Pause for Toasts: Trigger = Accessibility audit, Effort = Low (15min)

## Incident Response
See INCIDENT-RESPONSE.md for: Redis down, Vercel outage, Schema regression, Legal update required.

## Key Documents
- QUALITY-MANIFESTO.md: 63 rules, governance, security policies
- BETREIBER-RUNBOOK.md: 8 operator tasks (manual, weekly, monthly)
- DESIGN-BACKLOG.md: UX specs, design references, sales stack
- ARCHITECTURE.md: System diagram, data flow, security model
- AGENCY-HANDBOOK.md: How to pitch, sell, and onboard customers

## Contact Escalation
- Technical: GitHub Issues -> Principal Technical Lead
- Legal: Runbook Task 7 (AI Act) -> Legal counsel
- Customer: info@kiosk-lollipop.de -> Business owner

This project is institutionally protected: every decision is documented, tested, and reversible. The next Lead can take over in 30 minutes.
