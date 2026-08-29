# Mechanical Festival 2025

Full-stack event and competition platform for Mechanical Festival 2025.

The app combines the public event site, competition flows, participant dashboards, authentication, and admin tools in one Next.js codebase.

## Features

- Public event pages, timeline, and FAQ
- Competition-specific flows
- Authentication and participant dashboard
- Admin interface
- Media uploads

## Stack

`Next.js 15` `React 19` `TypeScript` `Prisma` `Auth.js` `Cloudinary` `Zod` `Tailwind CSS`

## Structure

```text
src/app/
├── (general)      # Public pages
├── (auth)         # Authentication
├── (competition)  # Competition flows
├── (dashboard)    # Participant dashboard
├── admin/          # Admin tools
└── api/            # Server endpoints
```

## Development

Configure the required database, auth, and media environment variables, then run:

```bash
npm install
npm run dev
```

Built as an operational platform for Mechanical Festival 2025.
