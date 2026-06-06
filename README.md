# LUX Fragrances

A full-stack luxury fragrance store built with Next.js, Tailwind CSS, PostgreSQL, UploadThing, and Better Auth. Inspired by premium perfume retailers like Lattafa USA.

## Features

- **Storefront** — Hero banner, category collections, product grid, product detail pages
- **Shopping cart** — Persistent cart with localStorage
- **WhatsApp checkout** — Order details formatted and sent via WhatsApp chat
- **Customer accounts** — Email/password auth via Better Auth
- **Admin panel** (`/admin`) — Password-protected product management with UploadThing image uploads

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router)
- [Tailwind CSS 4](https://tailwindcss.com)
- [PostgreSQL](https://postgresql.org) + [Drizzle ORM](https://orm.drizzle.team)
- [Better Auth](https://better-auth.com)
- [UploadThing](https://uploadthing.com)

## Getting Started

### 1. Environment variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `BETTER_AUTH_SECRET` | 32+ char secret (`openssl rand -base64 32`) |
| `BETTER_AUTH_URL` | App URL (e.g. `http://localhost:3000`) |
| `NEXT_PUBLIC_APP_URL` | Same as above, for client auth |
| `ADMIN_PASSWORD` | Password for `/admin` access |
| `UPLOADTHING_TOKEN` | From [uploadthing.com](https://uploadthing.com) dashboard |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Business WhatsApp number (country code, no `+`) |

### 2. Database setup

```bash
npm run db:push    # Create tables
npm run db:seed    # Seed sample products & categories
```

### 3. Run dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Route | Description |
|---|---|
| `/` | Homepage with featured products |
| `/shop` | Product catalog with search & filters |
| `/products/[slug]` | Product detail page |
| `/cart` | Shopping bag |
| `/checkout` | Checkout form → WhatsApp |
| `/account` | Customer sign in / sign up |
| `/admin` | Admin dashboard (password protected) |
| `/admin/products` | Manage products |

## Admin

1. Set `ADMIN_PASSWORD` in `.env.local`
2. Visit `/admin/login`
3. Add products with image uploads via UploadThing

## Checkout Flow

Customers fill in shipping details at `/checkout`. On submit, the order is formatted into a WhatsApp message and opens a chat with your business number (`NEXT_PUBLIC_WHATSAPP_NUMBER`).
