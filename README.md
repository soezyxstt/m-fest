# Mechanical Festival 2025

Full-stack event and competition platform for **Mechanical Festival 2025** — *Innovate Ideas. Create Impact*.

The application combines the public event website with authenticated participant flows, competition pages, dashboards, and administrative tooling in a single Next.js codebase.

## Product areas

- Public event landing page
- Event timeline and FAQ
- Competition-specific routes
- Authentication
- Participant dashboard
- Administrative interface
- Media upload workflows

## Engineering highlights

- Route-group architecture separating public, auth, competition, and dashboard experiences
- Database-backed workflows using Prisma
- Authentication integrated into the application
- Admin and participant-facing surfaces in one full-stack application
- Cloudinary-based media handling
- Form validation and server actions
- Motion-rich responsive event UI

## Stack

- **Next.js 15**
- **React 19 + TypeScript**
- **Prisma**
- **NextAuth / Auth.js**
- **Cloudinary**
- **React Hook Form + Zod**
- **Tailwind CSS**
- **Motion / Lenis / tsparticles**

## High-level structure

```text
src/app/
├── (general)      # Public event experience
├── (auth)         # Authentication
├── (competition)  # Competition flows
├── (dashboard)    # Participant dashboard
├── admin/          # Administrative tooling
└── api/            # Server endpoints
```

## Local development

Configure the database, authentication, and media environment variables, then run:

```bash
npm install
npm run dev
```

## Context

Built for Mechanical Festival 2025 as an operational event platform rather than a standalone landing-page demo.
