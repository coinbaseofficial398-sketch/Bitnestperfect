# BitNest DeFi Platform

## Overview

BitNest is a decentralized finance (DeFi) platform built on blockchain technology that aims to establish a transparent, accessible distributed digital banking system. The platform provides multiple financial protocols including liquidity provision, savings services, and DAO governance. It features a mobile-first web interface with real-time liquidity tracking, protocol participation, and referral systems.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React + TypeScript**: Modern component-based architecture using functional components and hooks
- **Vite**: Fast build tool and development server with hot module replacement
- **Tailwind CSS**: Utility-first CSS framework with custom BitNest color scheme and dark theme
- **Shadcn/ui Components**: Pre-built accessible UI components with Radix UI primitives
- **Wouter**: Lightweight client-side routing library for navigation
- **TanStack Query**: Server state management with automatic caching and real-time updates

### Backend Architecture
- **Express.js**: RESTful API server with middleware for logging and error handling
- **TypeScript**: Type-safe server implementation with ES modules
- **In-Memory Storage**: Development storage implementation with interfaces for easy database migration
- **Session Management**: Prepared for PostgreSQL session storage with connect-pg-simple

### Database Design
- **Drizzle ORM**: Type-safe SQL ORM with PostgreSQL dialect
- **Schema Structure**:
  - Users table with wallet integration and referral system
  - Transactions table for protocol participation tracking
  - Liquidity stats table for real-time platform metrics
- **Zod Validation**: Runtime type checking for API requests and database operations

### State Management
- **TanStack Query**: Handles server state, caching, and real-time updates for liquidity data
- **React Hooks**: Local state management using useState and useContext
- **Toast Notifications**: User feedback system for actions and errors

### Mobile-First Design
- **Responsive Layout**: Mobile browser simulation with navigation controls
- **Touch-Optimized**: Large tap targets and mobile-friendly interactions
- **Progressive Web App Ready**: Structured for potential PWA conversion

### Protocol Integration
- **Multi-Protocol Support**: Loop, Saving Box, Savings, and DAO protocols
- **Wallet Integration**: Prepared for MetaMask, TokenPocket, and Coinbase wallet connections
- **Payment Processing**: Automatic payment handling for protocol participation

### Development Workflow
- **Hot Reload**: Vite development server with instant updates
- **Type Safety**: End-to-end TypeScript coverage from database to frontend
- **Component Testing**: Structured for testing with data-testid attributes
- **Build Process**: Production builds with optimized bundling and static asset generation

## External Dependencies

### Core Technologies
- **Neon Database**: Serverless PostgreSQL database for production deployment
- **Drizzle Kit**: Database migrations and schema management
- **React Query**: Server state synchronization and caching

### UI Framework
- **Radix UI**: Accessible component primitives for dialog, dropdown, toast systems
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Component variant management
- **Tailwind CSS**: Styling and responsive design system

### Development Tools
- **Vite**: Build tooling and development server
- **TypeScript**: Type checking and development experience
- **ESLint/Prettier**: Code formatting and linting (implied by project structure)

### Blockchain Integrations (Prepared)
- **Ethereum Virtual Machine (EVM)**: Smart contract compatibility
- **Binance Smart Chain**: Alternative blockchain network support
- **Web3 Wallets**: MetaMask, TokenPocket, Coinbase integration interfaces

### Production Services
- **Session Store**: PostgreSQL-based session management
- **Database Hosting**: Neon serverless PostgreSQL
- **Static Hosting**: Prepared for deployment with built assets