# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Terun Domain Engine is a stateless engine for resolving domain economics, relations, and conflicts. It's designed for a fantasy game setting with hex-based maps, supporting multilingual content (Czech and English).

## Commands

```bash
# Development
pnpm start:dev          # Start with watch mode
pnpm start:debug        # Start with debugger

# Build
pnpm build              # Build for production
pnpm start:prod         # Run production build

# Testing
pnpm test               # Run unit tests
pnpm test:watch         # Run tests in watch mode
pnpm test -- <pattern>  # Run specific test file (e.g., pnpm test -- app.controller)
pnpm test:e2e           # Run e2e tests
pnpm test:cov           # Run tests with coverage

# Code Quality
pnpm lint               # ESLint with auto-fix
pnpm format             # Prettier formatting
```

## Architecture

This is a NestJS application using TypeScript. The codebase is in early development with the main logic currently in static game settings.

### Key Directories

- `src/` - Application source code
- `src/common/settings/` - Game configuration data (types and static data)
- `test/` - E2E tests

### Game Domain Model

The engine models a fantasy domain management system with these core concepts:

**Settings Layer** (`src/common/settings/`):
- **Terrains** - Hex map terrain types with colonization ratios
- **Domains** - Player/AI controlled territories with attributes (stewardship, diplomacy, trade, military, spying, magic, faith)
- **Domain Actions** - Actions categorized by domain attributes (tax collection, trade, diplomacy, military actions, spying, magic, faith)
- **Resources** - Complex economic system with raw resources, production constraints, demand profiles, and market dynamics
- **Hamlets** - Population centers from wilderness to gargantuan cities with growth mechanics and resource I/O

**Economic System**:
- Resources have production constraints (workers, terrain, risk)
- Demand profiles with population/wealth elasticity and seasonal modifiers
- Market dynamics with volatility levels, price floors/ceilings
- `EconomicEngine` class for price calculations based on supply/demand

### Localization Pattern

All game entities support Czech (`cz`) and English (`en`) localization via `LocalizedItem` type:
```typescript
type LocalizedItem = { name: string }
```
