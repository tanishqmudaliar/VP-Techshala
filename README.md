# VP Techshala (Demo Portal)

A modern demo portal built for a hackathon showcase—highlighting campus events, a media gallery, and participant management with local demo authentication.

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
  - [Installation](#installation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Development Notes](#development-notes)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

VP Techshala is a resume‑ready demo portal that showcases campus events, a media gallery, and participant management. It uses a local demo auth system (no backend required) and stores data in `localStorage` for easy presentation.

---

## Features

### Authentication (Demo)

- **Demo Login**: Select User/Admin roles from a dropdown
- **Local Accounts**: Signups and logins stored in `localStorage`
- **Role‑Based UI**: Admin sees participants; user can register

### Events

- **Single Showcase Event**: Hardcoded “ROBOWAR” event
- **Local Registration**: Participants stored locally
- **Admin Participants View**: Review local participant list

### Media

- **Image Gallery**: Responsive, static gallery
- **Video Gallery**: Embedded YouTube demos

### UI/UX

- **Modern Auth UI**: Polished login/signup pages
- **Responsive Layouts**: Improved CSS for key sections

---

## Tech Stack

| Layer         | Technologies               |
| ------------- | -------------------------- |
| **Framework** | React 17 (CRA)             |
| **Routing**   | React Router v6            |
| **UI**        | MUI 5                      |
| **Styling**   | CSS modules by page        |
| **State**     | React hooks + localStorage |

---

## Architecture

```
┌───────────────────────────────────────────────────────────┐
│                  VP TECHSHALA DEMO PORTAL                 │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  ┌─────────────────────────────┐  ┌─────────────────────┐ │
│  │         Auth Views          │  │     Event Views     │ │
│  │  • Login / Signup           │  │  • ROBOWAR event    │ │
│  │  • Demo dropdown            │  │  • Local register   │ │
│  └──────────────┬──────────────┘  └──────────┬──────────┘ │
│                 │                            │            │
│  ┌──────────────▼──────────────┐  ┌──────────▼──────────┐ │
│  │     localStorage Layer      │  │   Media Galleries   │ │
│  │  • Users + session          │  │  • Images + Videos  │ │
│  │  • Participants             │  │  • Static assets    │ │
│  └─────────────────────────────┘  └─────────────────────┘ │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

---

## Getting Started

### Prerequisites

- Node.js 16+
- npm

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start development server**

   ```bash
   npm start
   ```

3. **Open browser**

   Navigate to `http://localhost:3000`

---

## Project Structure

```
vp-hackathon/
├── public/
│   ├── assets/               # Static images
│   ├── index.html            # App shell metadata
│   └── manifest.json         # PWA metadata
├── src/
│   ├── components/           # UI components
│   ├── context/              # Local auth context
│   ├── helper/               # Local data helpers
│   ├── styles/               # Page-level CSS
│   ├── App.js                # Routes
│   └── index.js              # App entry
├── package.json
└── README.md
```

---

## Configuration

No backend setup required. Demo data is stored locally using `localStorage`:

- `vp_demo_users`
- `vp_demo_session`
- `vp_demo_participants`

Demo credentials:

- **User**: user@demo.com / user123
- **Admin**: admin@demo.com / admin123

---

## Deployment

You can deploy with any static host:

- Vercel
- Netlify
- GitHub Pages

Build command:

```bash
npm run build
```

---

## Development Notes

- Firebase and EmailJS were removed in favor of local demo mode.
- The event catalog is intentionally limited to a single showcase event.
- Assets are served from `public/assets` for simplicity.

---

## Troubleshooting

### Login fails with valid credentials

- Clear browser storage and retry:
  - `localStorage.clear()`

### Styles look misaligned

- Confirm you’re not zoomed in/out in the browser
- Refresh after pulling updated CSS

---

## Contributing

Contributions are welcome. Open a PR with a short description and screenshots.

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ for VP Techshala demo showcase.
