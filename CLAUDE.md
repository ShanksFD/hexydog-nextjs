# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.4.6 application for HEXYDOG, a crypto presale platform with blockchain integration. The project uses React 19, Material-UI, Redux Toolkit, and Web3 technologies for cryptocurrency token presale functionality.

## Development Commands

```bash
# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Architecture Overview

### Core Technology Stack
- **Frontend**: Next.js 15.4.6 with App Router, React 19, Material-UI v7
- **State Management**: Redux Toolkit with auth and blog slices
- **Web3**: Wagmi v2, Viem, Reown AppKit for wallet connections
- **Styling**: Tailwind CSS v4, MUI custom theme with dark mode
- **Internationalization**: i18next with 8 language support (ar, de, en, es, fr, it, ry, tr)
- **Backend Services**: Firebase (Auth, Storage)
- **Rich Text**: TipTap editor for blog functionality

### Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes (robots, sitemap)
│   ├── blog/              # Blog pages with dynamic routing
│   ├── blog-admin/        # Admin dashboard for blog management
│   └── login/             # Authentication pages
├── components/            # Reusable UI components
│   ├── PresalePaymentBox/ # Core presale functionality
│   ├── Header/            # Navigation components
│   └── Footer/            # Footer components
├── pages/                 # Page components (not App Router pages)
│   ├── Home/              # Homepage components
│   ├── Blog/              # Blog-related components
│   └── Login/             # Auth components
├── sections/              # Homepage sections (Hero, About, Features, etc.)
├── redux/                 # State management
├── services/              # External service integrations
├── lib/                   # Configuration (theme, i18n)
├── constants/             # App constants and blockchain configs
└── utils/                 # Utility functions
```

### Key Components Architecture

**Providers Component** (`src/components/Providers.jsx`):
- Wraps entire app with Redux, Wagmi, React Query, MUI Theme, and i18n providers
- Configures Web3 wallet connections for Ethereum, BSC, and Solana networks
- Handles loading states for i18n initialization

**Presale System** (`src/components/PresalePaymentBox/`):
- Main presale interface with multi-chain support (Ethereum, BSC)
- Token calculator with real-time price calculations
- Progress tracking for presale metrics
- Wallet connection and transaction handling

**Blog System**:
- Full CMS with TipTap rich text editor
- Firebase-based storage and authentication
- Admin dashboard for content management
- Dynamic routing for blog posts

### Blockchain Integration

**Supported Networks**:
- Mainnet: Ethereum, BSC, Solana
- Testnets: Sepolia, BSC Testnet (dev mode only)

**Smart Contracts**:
- Ethereum Presale: Handles ETH, USDC, USDT purchases
- BSC Presale: Handles BNB, USDT purchases
- Environment-specific contract addresses in `src/constants/wagmiConstants.js`

**Dev/Prod Configuration**:
- `isDev` flag controls network availability and contract addresses
- All blockchain constants centralized in wagmiConstants.js

### Internationalization
- 8 language support with fallback to English
- JSON translation files in `public/locales/`
- Browser language detection with localStorage persistence
- HttpBackend for dynamic translation loading

### State Management
- **Auth Slice**: User authentication state with Firebase integration
- **Blog Slice**: Blog post management and CRUD operations
- Configured with serialization checks for Firebase objects

### Styling System
- Custom MUI dark theme with HEXYDOG branding
- Color palette with primary blue (#51A9FD) and secondary orange (#FDA551)
- Consistent border radius and component styling
- Tailwind CSS for utility classes

## Important Files

- `src/constants/wagmiConstants.js`: Blockchain configurations and ABIs
- `src/components/Providers.jsx`: App-wide provider setup
- `src/lib/theme.js`: MUI theme configuration
- `src/lib/i18n.js`: Internationalization setup
- `src/firebase.js`: Firebase configuration
- `next.config.mjs`: Next.js configuration with Web3 optimizations

## Environment Variables Required

```
NEXT_PUBLIC_REOWN_PROJECT_ID
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
```

## Development Notes

- Uses Turbopack for faster development builds
- Web3 packages require transpilation (configured in next.config.mjs)
- Firebase objects need special serialization handling in Redux
- Image optimization configured for hexydog.com and Firebase Storage domains
- Security headers configured for XSS protection and content type sniffing