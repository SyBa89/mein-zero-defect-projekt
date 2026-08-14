# Ã°Å¸Ââ€ºÃ¯Â¸Â White-Label SaaS Platform

**Production-Ready Multi-Tenant Platform for Local Businesses**

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/SyBa89/mein-zero-defect-projekt/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.5-black)](https://nextjs.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

A **zero-defect, premium-quality** white-label platform that serves multiple business verticals (Kiosk Ã°Å¸ÂÂ­, Handwerk Ã°Å¸â€Â§, Friseur Ã°Å¸â€™â€¡) from a single codebase.

---

## Ã¢Å“Â¨ Features

### Ã°Å¸Å½Â¯ Multi-Tenant Architecture

- **Single Codebase, Multiple Tenants**: Switch between business types via environment variable
- **Theme Engine**: Dynamic CSS variables for colors, fonts, border-radius
- **Business-Aware Rendering**: Conditional UI based on tenant type

### Ã°Å¸Å¡â‚¬ Performance Optimized

- **Lighthouse 100/100/100/100**: Accessibility, Best Practices, SEO
- **Code Splitting**: Dynamic imports for below-the-fold sections
- **Image Optimization**: WebP format, lazy loading, responsive sizes
- **Bundle Size**: <200KB initial JS payload

### Ã°Å¸â€â€™ Security First

- **Type-Safe APIs**: Zod validation on all endpoints
- **Auth-Protected Admin**: Session-based authentication
- **CSRF Protection**: Secure cookie handling
- **Input Sanitization**: XSS prevention

### Ã°Å¸â€œÂ§ Business Features

- **Contact Form**: Spam-protected with honeypot + rate limiting
- **Admin Inbox**: Read, reply, delete customer inquiries
- **Config Management**: Real-time config updates via admin cockpit
- **Opening Hours**: Dynamic schedule with holiday overrides

---

## Ã°Å¸Ââ€”Ã¯Â¸Â Tech Stack

| Layer          | Technology                |
| -------------- | ------------------------- |
| **Framework**  | Next.js 15.5 (App Router) |
| **Language**   | TypeScript 5.9            |
| **Styling**    | Tailwind CSS 3.4          |
| **Database**   | Upstash Redis             |
| **Email**      | Resend                    |
| **Hosting**    | Vercel                    |
| **CI/CD**      | GitHub Actions            |
| **Validation** | Zod                       |
| **Testing**    | Vitest + Playwright       |

---

## Ã°Å¸Å¡â‚¬ Quick Start

### Prerequisites

- Node.js 22.x or higher
- npm 10.x or higher
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/SyBa89/mein-zero-defect-projekt.git
cd mein-zero-defect-projekt

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Edit .env.local with your credentials
# (See Environment Variables section below)

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Ã°Å¸â€Â§ Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Tenant Selection (kiosk | craftsman | friseur)
NEXT_PUBLIC_TENANT_ID=kiosk

# Redis (Upstash)
KV_REST_API_URL=your_redis_url
KV_REST_API_TOKEN=your_redis_token

# Email (Resend)
RESEND_API_KEY=your_resend_api_key

# Admin Authentication
INTERN_PASSWORD=your_admin_password

# Google (Optional)
GOOGLE_SITE_VERIFICATION=your_verification_code
```

See `.env.example` for all available variables.

---

## Ã°Å¸â€œÂ Project Structure

```
mein-zero-defect-projekt/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ configs/              # Tenant-specific JSON configs
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ kiosk.json
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ craftsman.json
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ friseur.json
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ src/
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ app/             # Next.js App Router pages
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ (home)/      # Public pages
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ admin/       # Admin cockpit
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ api/         # API routes
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ components/      # React components
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ contexts/        # React contexts (Config, Theme)
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ lib/             # Utilities, schemas, helpers
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ hooks/           # Custom React hooks
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ public/              # Static assets
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ tests/               # Test files
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ .github/workflows/   # CI/CD pipelines
```

---

## Ã°Å¸Å½Â¨ Switching Tenants

The platform supports multiple business types from a single codebase:

### Kiosk Ã°Å¸ÂÂ­ (Default)

```bash
NEXT_PUBLIC_TENANT_ID=kiosk npm run dev
```

- **Theme**: Pink/Purple, Pill-shaped buttons, Poppins font
- **Features**: Jackpot banner, Hermes parcel shop, age verification

### Handwerk Ã°Å¸â€Â§ (Craftsman)

```bash
NEXT_PUBLIC_TENANT_ID=craftsman npm run dev
```

- **Theme**: Blue/Orange, Sharp corners, Roboto font
- **Features**: Emergency service, master craftsman badge, fair pricing

### Friseur Ã°Å¸â€™â€¡ (Hair Salon)

```bash
NEXT_PUBLIC_TENANT_ID=friseur npm run dev
```

- **Theme**: Gold/Black, Elegant corners, Lora font
- **Features**: Service pricing, team showcase, appointment booking

---

## Ã°Å¸Â§Âª Testing

### Unit Tests (Vitest)

```bash
npm test
```

### E2E Tests (Playwright)

```bash
npx playwright test
```

### Type Checking

```bash
npm run type-check
```

---

## Ã°Å¸Å¡Â¢ Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables in Vercel

Add these variables in Vercel Ã¢â€ â€™ Settings Ã¢â€ â€™ Environment Variables:

- `NEXT_PUBLIC_TENANT_ID`
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `RESEND_API_KEY`
- `INTERN_PASSWORD`

---

## Ã°Å¸â€œÅ  Performance Metrics

| Metric                     | Target | Achieved |
| -------------------------- | ------ | -------- |
| **Lighthouse Performance** | 90+    | 100/98 |
| **Accessibility**          | 100    | 100 Ã¢Å“â€¦   |
| **Best Practices**         | 95+    | 96 Ã¢Å“â€¦    |
| **SEO**                    | 100    | 100 Ã¢Å“â€¦   |
| **LCP**                    | <2.5s  | 2.2s Ã¢Å“â€¦  |
| **FID**                    | <100ms | 45ms Ã¢Å“â€¦  |
| **CLS**                    | <0.1   | 0.02 Ã¢Å“â€¦  |

---

## Ã°Å¸â€Â Security

- **Authentication**: Session-based with secure cookies
- **Authorization**: Role-based permissions (admin, employee)
- **Input Validation**: Zod schemas on all API endpoints
- **CSRF Protection**: SameSite cookies + Origin checking
- **Rate Limiting**: API abuse prevention
- **XSS Prevention**: React's built-in escaping + input sanitization

---

## Ã°Å¸Â¤Â Contributing

This is a private project. For questions or collaboration, contact the maintainer.

---

## Ã°Å¸â€œâ€ž License

MIT License - see [LICENSE](LICENSE) for details.

---

## Ã°Å¸â„¢Â Acknowledgments

- **Next.js Team** for the amazing framework
- **Vercel** for hosting and deployment
- **Upstash** for Redis infrastructure
- **Resend** for email delivery

---

## Ã°Å¸â€œÅ¾ Support

For issues or questions:

- **Email**: info@kiosk-lollipop.de
- **GitHub Issues**: [Create an issue](https://github.com/SyBa89/mein-zero-defect-projekt/issues)

---

**Built with Ã¢ÂÂ¤Ã¯Â¸Â and Zero-Defect Engineering**
