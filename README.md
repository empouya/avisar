# Mirror

> **Mirror** is a modern, content-driven web platform built for a local NGO focused on **Environment** and **Water Resource Management**.  
> It serves as a digital headquarters to showcase impact, share news and events, and build credibility with international funders and partners.

---

## ✨ Project Goals

- Present **Major Works** and projects in a clear, credible way
- Share news and events without friction
- Capture stakeholder interest via newsletter subscriptions and contact forms
- Provide a **secure, minimal admin interface** for non-technical staff
- Maintain a clean, scalable, and production-grade architecture

---

## 🧱 Tech Stack (High Level)

| Area | Technology |
|----|----|
| Framework | Next.js (App Router) |
| Runtime | Node.js (Serverless via Vercel) |
| Database | PostgreSQL (Supabase) |
| ORM | Prisma |
| Authentication | Supabase Auth (Admin only) |
| Validation | Zod |
| Styling | Tailwind CSS |
| CI/CD | GitHub Actions + Vercel |
| Deployment | Vercel |

---

## 📁 Project Structure (Overview)

```text
mirror/
├── src/
│   ├── app/            # Routing layer (public pages, admin UI, API routes)
│   ├── components/     # Reusable UI components (presentation only)
│   ├── domain/         # Business logic (framework-agnostic)
│   ├── repositories/  # Data access layer (Prisma)
│   ├── validators/    # Input & request validation schemas
│   ├── lib/            # Infrastructure utilities (Supabase, Prisma, auth, mailer)
│   └── config/         # Application & environment configuration
│
├── prisma/             # Database schema & migrations
├── .github/workflows/  # CI/CD pipelines
├── .env.example        # Environment variable template
└── README.md
```

### Architectural Principles

- **No business logic in API routes**
- **No database access outside repositories**
- **No backend logic in UI components**
- Clear separation between public and admin surfaces

This structure ensures the backend is predictable, testable, and easy to extend.

---

## 🔐 Authentication Model

- Public users: no authentication required
- Admin users: authenticated via **Supabase Auth**
- Admin routes and APIs are fully protected
- Admin UI is hidden from public navigation

---

## 🌱 Themes & Design System

The UI supports two visual themes aligned with the NGO mission:

- **Water Theme** – clarity, fluidity, trust
- **Greenery Theme** – growth, sustainability, environment

Theme selection is controlled centrally via backend configuration.

---

## ⚙️ Environment Variables

All required variables are documented in `.env.example`.

- Local development uses `.env`
- Production variables are configured in **Vercel**
- Sensitive values are never committed to the repository

---

## 🚀 Deployment (Vercel)

### When Does Deployment Happen?

Deployment typically occurs **after core development is complete**, but can also be done earlier for preview or staging purposes.

A common lifecycle is:

1. Local development
2. Feature completion
3. Stabilization & testing
4. Initial deployment to Vercel
5. Iterative updates via CI/CD

You do **not** need to deploy at the start of development.

---

### How Deployment Works (High Level)

1. Create a Vercel account
2. Connect the GitHub repository
3. Vercel auto-detects Next.js
4. Configure environment variables in Vercel
5. Push to the `main` branch
6. Vercel builds and deploys automatically

Once connected:

- Every push to `main` triggers a new deployment
- GitHub Actions validates the build
- Vercel hosts the application using serverless infrastructure

No server management is required.

---

## 🧪 Development Status

Current focus:

- Architecture validation
- Backend and frontend scaffolding
- Contract and schema finalization

Implementation proceeds **only after all artifacts are confirmed and frozen**.

---

## 📌 License & Ownership

This project is private and maintained for a specific NGO use case.  
All rights reserved unless stated otherwise.
