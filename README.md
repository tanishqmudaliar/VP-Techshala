# VP Techshala

A frontend-only demo portal for student tech clubs. It showcases event listings, participant registration, profile management, and a media gallery with local demo authentication.

![React](https://img.shields.io/badge/React-17.0.2-61DAFB?logo=react&logoColor=white)
![CRA](https://img.shields.io/badge/CRA-5.0.0-09D3AC?logo=createreactapp&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-5.5.2-007FFF?logo=mui&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Quick Setup](#quick-setup)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Known Limitations](#known-limitations)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

VP Techshala is a hackathon demo portal built with React and Material UI. It provides a polished campus-club experience without a backend, using `localStorage` for demo users, sessions, and registrations.

The app is organized around a few core flows: demo login/signup, event browsing, gallery viewing, and participant management for the featured `ROBOWAR` event.

---

## Features

### Authentication

- Demo login and signup flow with role selection for **User** and **Admin**
- Local session persistence with seeded demo accounts
- Profile pages powered by a shared auth context

### Events

- Featured `ROBOWAR` event landing and detailed event page
- Local participant registration stored in the browser
- Admin-friendly participant view for reviewing submissions

### Media Gallery

- Separate image and video gallery routes
- Static showcase assets for the hackathon presentation

### Navigation & UI

- Drawer-based navigation with breadcrumbs
- Route-based screens for the full portal flow
- Contact, profile, and not-found pages for a complete demo experience

---

## Tech Stack

| Layer     | Technologies                       |
| --------- | ---------------------------------- |
| Framework | React 17, Create React App         |
| Routing   | React Router v6                    |
| UI        | Material UI 5, React Bootstrap     |
| Media     | react-player                       |
| State     | React hooks, context, localStorage |

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                        VP TECHSHALA                          │
├──────────────────────────────────────────────────────────────┤
│  Routes                                                      │
│  ├─ /login /signup                                           │
│  ├─ /home /profile/:id                                       │
│  ├─ /events /events/:id /events/create-edit-events           │
│  ├─ /gallery/images /gallery/videos                          │
│  └─ /contactus /404                                          │
│                                                              │
│  Shared UI                                                   │
│  ├─ Header + Drawer navigation                               │
│  ├─ Auth context                                             │
│  └─ MUI / Bootstrap components                               │
│                                                              │
│  Browser Data                                                │
│  ├─ vp_demo_users                                            │
│  ├─ vp_demo_session                                          │
│  └─ vp_demo_participants                                     │
└──────────────────────────────────────────────────────────────┘
```

---

## Getting Started

### Prerequisites

- Node.js 16 or newer
- npm

### Quick Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the app:

   ```bash
   npm start
   ```

3. Open `http://localhost:3000`

---

## Project Structure

```
VP-Techshala/
├── public/
│   ├── assets/
│   ├── favicon.ico
│   ├── index.html
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Login.js
│   │   ├── SignUp.js
│   │   ├── Events.js
│   │   ├── Profile.js
│   │   └── Videos.js
│   ├── context/
│   │   └── UserAuthContext.js
│   ├── helper/
│   │   └── localData.js
│   ├── styles/
│   ├── App.js
│   └── index.js
├── package.json
├── package-lock.json
├── LICENSE
└── README.md
```

---

## Configuration

No environment variables are required. The app uses browser storage and seeded demo credentials.

| Setting                | Purpose                  | Default                       |
| ---------------------- | ------------------------ | ----------------------------- |
| `vp_demo_users`        | Stored demo user records | Seeded automatically          |
| `vp_demo_session`      | Active signed-in user ID | Set on login/signup           |
| `vp_demo_participants` | Event registrations      | Stored per event              |
| Demo user              | Test login               | `user@demo.com` / `user123`   |
| Demo admin             | Admin login              | `admin@demo.com` / `admin123` |

---

## Deployment

Build the app for production with:

```bash
npm run build
```

You can host the generated static files on Netlify, Vercel, GitHub Pages, or any other static hosting service.

---

## Known Limitations

- Mobile layout is not implemented; the app shows a desktop-only placeholder on small screens.
- Authentication and registrations are demo-only and reset when browser storage is cleared.
- Event and gallery content is static, so changes must be made in the source files.

---

## Troubleshooting

### Demo login keeps failing

- Make sure you selected the matching demo role and credentials.
- Clear browser storage if stale local data is causing conflicts.

### The mobile view shows "Coming Soon"

- This is expected; the app is built for desktop presentation only.

### Participant data disappeared

- `localStorage` was cleared or the browser profile was reset.

---

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Open a pull request with a clear summary.

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ for VP Techshala demo showcase.
