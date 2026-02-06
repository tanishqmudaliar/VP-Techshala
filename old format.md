# Pure Calisthenics

A modern, animated website built with Next.js for a calisthenics gym—helping potential customers learn about the gym, explore facilities, and connect with the owner.

![Next.js](https://img.shields.io/badge/Next.js-15.1.4-000000?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)
![Mux Video](https://img.shields.io/badge/Video-Mux-FF5733.svg)

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

Pure Calisthenics is a professional website designed to showcase a physical calisthenics gym. The site provides comprehensive information about the gym's facilities, offerings, and ways for potential customers to connect with the owner through multiple contact channels.

The website features a visually stunning landing page with autoplay video streaming via Mux, smooth animations powered by GSAP, Framer Motion, and AOS, and a blog section that dynamically pulls content from the owner's Wix RSS feed. Built with Next.js for optimal performance and SEO.

---

## Features

### Landing Page
- **Hero Video**: Autoplay muted video using Mux for optimized streaming
- **Multi-Section Layout**: Seven distinct sections showcasing gym services and benefits
- **Animated Sections**: GSAP, Framer Motion, and AOS animations
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Floating Action Button**: Quick access to WhatsApp contact

### Contact Integration
- **Direct Call Button**: Click-to-call functionality
- **WhatsApp Button**: Instant messaging integration via floating button
- **Inquiry Form**: Lead generation for potential clients

### Blog Section
- **RSS Feed Integration**: Displays posts from owner's Wix blog
- **Masonry Layout**: Beautiful grid layout for blog posts
- **Dynamic Content**: Automatically updated from RSS feed

### User Experience
- **Touch Slider**: Swiper for mobile-friendly image galleries
- **Scroll Animations**: AOS (Animate On Scroll) effects
- **Professional Animations**: GSAP-powered complex animations
- **Material Design**: MUI components for consistent UI

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Framework** | Next.js 15.1.4 (App Router) |
| **Frontend** | React 19.0.0 |
| **Styling** | Tailwind CSS 3.4.1 |
| **UI Components** | Material UI 6.4.2 |
| **Animation** | GSAP 3.12.7, Framer Motion 11.18.2, AOS 2.3.4 |
| **Video Streaming** | Mux (next-video 2.2.0) |
| **Slider** | Swiper 11.2.1 |
| **Layout** | react-masonry-css 1.0.16 |
| **Content** | rss-parser 3.13.0 |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                   PURE CALISTHENICS - WEBSITE ARCHITECTURE                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                          NEXT.JS APPLICATION                         │   │
│  │                                                                      │   │
│  │   ┌─────────────────────────────┐  ┌─────────────────────────────┐   │   │
│  │   │        Landing Page         │  │         Blog Page           │   │   │
│  │   │                             │  │                             │   │   │
│  │   │  • Hero video (Mux)         │  │  • RSS feed from Wix        │   │   │
│  │   │  • 7 content sections       │  │  • Masonry grid layout      │   │   │
│  │   │  • Services showcase        │  │  • Dynamic content          │   │   │
│  │   │  • Benefits & testimonials  │  │  • Image optimization       │   │   │
│  │   └──────────────┬──────────────┘  └──────────────┬──────────────┘   │   │
│  │                  │                                │                  │   │
│  │   ┌──────────────▼────────────────────────────────▼──────────────┐   │   │
│  │   │                        Animation Layer                       │   │   │
│  │   │                                                              │   │   │
│  │   │       GSAP        │   Framer Motion    │        AOS          │   │   │
│  │   │   Complex anims   │   Page transitions │   Scroll effects    │   │   │
│  │   └──────────────────────────────────────────────────────────────┘   │   │
│  │                                                                      │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                         EXTERNAL SERVICES                            │   │
│  │                                                                      │   │
│  │             ┌─────────────────┐    ┌─────────────────┐               │   │
│  │             │   Mux Video     │    │   Wix RSS Feed  │               │   │
│  │             │  • Streaming    │    │  • Blog content │               │   │
│  │             │  • Optimization │    │  • Auto-sync    │               │   │
│  │             └─────────────────┘    └─────────────────┘               │   │
│  │                                                                      │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│            Video streaming + Dynamic blog = Engaging experience             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Content Flow

1. Next.js renders pages with server-side optimization
2. Hero video streams from Mux with automatic quality adaptation
3. Blog content fetches from Wix RSS feed on page load
4. Animations trigger based on scroll position and user interaction
5. Contact actions open phone dialer or WhatsApp directly

---

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tanishqmudaliar/Pure-Calisthenics.git
   cd Pure-Calisthenics
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**

   Navigate to `http://localhost:3000`

### Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint
```

---

## Project Structure

```
purecalisthenics/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── api/                  # API routes
│   │   │   ├── blogs/            # Blog API endpoint
│   │   │   └── form/             # Form submission API
│   │   ├── blogs/                # Blog page (/blogs)
│   │   │   └── page.js
│   │   ├── globals.css           # Global styles
│   │   ├── layout.js             # Root layout
│   │   └── page.js               # Landing page (/)
│   │
│   ├── components/               # Reusable React components
│   │   ├── navBar.jsx            # Navigation bar
│   │   ├── footer.jsx            # Footer component
│   │   ├── floatingButton.jsx    # WhatsApp floating button
│   │   ├── services.jsx          # Services showcase
│   │   ├── benefits.jsx          # Benefits section
│   │   ├── blogPage.jsx          # Blog page layout
│   │   ├── swipeCards.jsx        # Swiper card gallery
│   │   ├── curve.jsx             # Page transition curves
│   │   └── anim.js               # Animation utilities
│   │
│   ├── pages/                    # Page section components
│   │   ├── SectionOne.jsx        # Hero section with video
│   │   ├── SectionTwo.jsx        # About section
│   │   ├── SectionThreePartOne.jsx
│   │   ├── SectionThreePartTwo.jsx
│   │   ├── SectionFour.jsx
│   │   ├── SectionFive.jsx       # Testimonials/gallery
│   │   ├── SectionSix.jsx
│   │   └── SectionSeven.jsx      # Contact/inquiry form
│   │
│   └── fonts/                    # Custom fonts
│
├── public/                       # Static assets
│   ├── images/                   # Image assets
│   ├── logo/                     # Logo files
│   └── favicon.ico
│
├── videos/                       # Video assets for Mux
│   └── landing.mp4               # Hero video
│
├── next.config.mjs               # Next.js configuration
├── tailwind.config.mjs           # Tailwind CSS configuration
├── postcss.config.mjs            # PostCSS configuration
├── eslint.config.mjs             # ESLint configuration
├── jsconfig.json                 # JavaScript configuration
├── package.json                  # Dependencies
└── README.md                     # Project documentation
```

---

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

| Variable | Description | Required |
|----------|-------------|----------|
| `MUX_TOKEN_ID` | Mux API token ID | For video streaming |
| `MUX_TOKEN_SECRET` | Mux API secret | For video streaming |

### Video Setup

The landing page features an autoplay muted video using Mux video streaming via `next-video`:

1. Videos are stored in the `videos/` directory
2. Mux automatically optimizes for different devices and bandwidths
3. Configuration is managed in `next.config.mjs`

### RSS Feed Integration

Blog content is fetched from the owner's Wix site using `rss-parser`:

```javascript
import Parser from 'rss-parser';
const parser = new Parser();
const feed = await parser.parseURL('https://your-wix-blog-url/feed.xml');
```

---

## Deployment

### Vercel (Recommended)

1. Push your code to a GitHub repository
2. Import the project in [Vercel](https://vercel.com/)
3. Configure environment variables
4. Deploy

```bash
npm i -g vercel
vercel
```

### Other Platforms

This Next.js application can also be deployed on:
- [Netlify](https://www.netlify.com/)
- Any hosting platform that supports Node.js applications

---

## Development Notes

### Video Streaming

The landing page features an autoplay muted video using Mux video streaming, implemented with the `next-video` package. This provides:

- Efficient video delivery
- Automatic optimization for different devices
- Adaptive bitrate streaming
- Fast loading times

### Animations

The site uses multiple animation libraries for an engaging experience:

| Library | Use Case |
|---------|----------|
| **GSAP** | Complex timeline animations, scroll triggers |
| **Framer Motion** | Component transitions, hover effects |
| **AOS** | Scroll-based reveal animations |

### Contact Functionality

| Feature | Implementation |
|---------|---------------|
| Click-to-call | `tel:` link for phone numbers |
| WhatsApp | Floating button with `https://wa.me/` deep link |
| Inquiry Form | Form submission via API route |

---

## Troubleshooting

### "Video not playing"
- Ensure Mux credentials are configured in `.env`
- Check browser autoplay policies (video is muted by default)
- Verify video file is in the `videos/` directory

### "Blog posts not loading"
- Verify RSS feed URL is correct
- Check if the Wix blog is public
- Look for CORS issues in browser console

### "Animations not working"
- Ensure JavaScript is enabled
- Check browser console for errors
- Verify AOS is initialized in the component

### "Styling issues"
- Run `npm run build` to check for Tailwind CSS issues
- Clear `.next` cache and rebuild
- Check for conflicting CSS

### "Build fails"
- Ensure all dependencies are installed
- Check Node.js version (18+)
- Review error logs for missing modules

---

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ for Pure Calisthenics

**Stop scrolling, start training. Discover the gym, explore the moves, transform your body! 💪**
