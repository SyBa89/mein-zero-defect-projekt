# System Architecture

## Overview
This platform is a **multi-tenant white-label SaaS** built on Next.js 15.5 (App Router) with a Redis-backed config override system for real-time admin updates.

## System Diagram
- Tenant Pages (/, /arzt, /friseur) 
- Admin Cockpit (/admin/*)
- API Routes (/api/admin/*)
- Config Resolution (Host -> Tenant)
- Static JSON (defaults) + Redis KV (overrides) + In-Memory (session)

## Data Flow
1. Tenant Resolution: Middleware inspects Host header, maps domain -> tenantId
2. Config Loading: Read static JSON, fetch Redis override, deep merge
3. Live Updates: Admin saves -> Redis SET -> revalidateTag -> customer sees update

## Security Model
- Auth: Session JWT (HTTP-only, Secure, SameSite=Strict)
- CSRF: SameSite cookie + Origin check
- Rate Limiting: Upstash Ratelimit (10 req/10s per IP)
- Input Validation: Zod schemas on all API routes
- CORS: * only on /api/config (public read-only)
- Audit: All admin actions logged to Redis (PII-stripped)

## Multi-Tenant Isolation
- Code: Shared components, conditional rendering based on config.tenantId
- Data: Redis keys namespaced by tenant (config:{tenantId}, contacts:{tenantId})
- Static: Each tenant has its own JSON config (configs/{tenantId}.json)
- Domains: Middleware routes traffic based on hostname

## Performance Optimizations
- SSR: All tenant pages server-rendered (SEO + fast first paint)
- Code Splitting: Dynamic imports for admin-only components
- Image Optimization: next/image with WebP, lazy loading
- Bundle Size: <200KB initial JS (Lighthouse verified)
- Redis Caching: Config overrides cached 60s (revalidateTag invalidates)

## Deployment
- Platform: Vercel (recommended)
- Region: fra1 (Frankfurt) for DE customers
- CI/CD: GitHub Actions -> Vercel auto-deploy on main
- Environment: .env.local for secrets, Vercel dashboard for production
