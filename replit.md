# Word Galaxy: Space Explorer Reading Game

## Overview

Word Galaxy is a kid-friendly educational web application designed to help 5-year-old children learn sight words through interactive space-themed mini-games. The application features a React frontend with TypeScript, Express.js backend, and PostgreSQL database using Drizzle ORM. The game includes three planets with different difficulty levels, each containing sight word learning exercises.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React hooks with custom game state management
- **UI Components**: Radix UI primitives with shadcn/ui components
- **Styling**: Tailwind CSS with custom space-themed animations and colors
- **Data Fetching**: TanStack React Query for server state management

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured via Neon serverless)
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **Development**: Hot reload with Vite middleware integration

### Key Design Decisions
1. **Monorepo Structure**: Single repository with shared types and utilities
2. **Type Safety**: Full TypeScript implementation across frontend and backend
3. **Component-Based UI**: Modular React components with reusable UI primitives
4. **Progressive Enhancement**: Works without JavaScript for basic functionality
5. **Mobile-First**: Responsive design optimized for touch interactions

## Key Components

### Game Logic Components
- **GameState Hook**: Manages current word, progress, and completion status
- **WordStar**: Interactive word selection buttons with visual feedback
- **CompletionModal**: Celebration screen when planets are completed
- **StarField**: Animated background with twinkling stars

### Core Pages
- **Home**: Welcome screen with game introduction
- **PlanetMap**: Planet selection interface showing progress
- **Game**: Main gameplay screen with sight word exercises
- **NotFound**: 404 error handling

### Data Models
- **Planet**: Represents game levels with associated sight words
- **User**: Basic user authentication schema (prepared for future use)
- **GameProgress**: Tracks user progress through localStorage

## Data Flow

### Game State Management
1. Game progress stored in browser localStorage for persistence
2. Planet data managed through static configuration
3. Word shuffling and selection handled client-side
4. Speech synthesis for word pronunciation using Web Speech API

### User Interaction Flow
1. **Home Screen**: Welcome and game introduction
2. **Planet Selection**: Choose difficulty level (Zoom, Pop, or Zing)
3. **Word Game**: Present sight words with multiple choice options
4. **Feedback**: Visual and audio feedback for correct/incorrect answers
5. **Progress Tracking**: Stars awarded for correct answers
6. **Completion**: Celebration modal when planet is completed

### Component Communication
- Props drilling for simple state passing
- Custom hooks for complex state logic
- Context API for theme and UI state (via Radix UI)
- Event handlers for user interactions

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight routing
- **@radix-ui/***: Accessible UI primitives

### UI and Styling
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant handling
- **clsx**: Conditional class name utility
- **lucide-react**: Icon library

### Development Tools
- **vite**: Build tool and development server
- **typescript**: Static type checking
- **esbuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds React app to `dist/public`
2. **Backend**: ESBuild bundles Express server to `dist/index.js`
3. **Database**: Drizzle migrations applied via `drizzle-kit push`

### Environment Configuration
- **Development**: Hot reload with Vite middleware
- **Production**: Static file serving with Express
- **Database**: PostgreSQL connection via `DATABASE_URL` environment variable

### Deployment Commands
- `npm run dev`: Development server with hot reload
- `npm run build`: Production build for both frontend and backend
- `npm run start`: Production server
- `npm run db:push`: Apply database schema changes

## Changelog

```
Changelog:
- July 02, 2025: Initial setup with basic 3-planet word game
- July 02, 2025: Enhanced progressive difficulty system with 4 planets
  - Planet Zoom: Basic sight words (Level 1)
  - Planet Pop: Action and size words (Level 2) 
  - Planet Zing: Sentence reading (Level 3)
  - Planet Nova: Advanced sentence reading (Level 4)
- Added sentence-based gameplay for higher levels
- Implemented dual game modes: word selection and sentence reading
- Enhanced UI with planet descriptions and proper progress tracking
- July 02, 2025: Major speech synthesis improvements for pronunciation
  - Added phonetic pronunciation dictionary for sight words
  - Implemented child-friendly voice selection (prefers clear female voices)
  - Added multiple speech modes: Normal, Slow, Phonetic, and Repeat
  - Enhanced speech timing with natural pauses in sentences
  - Slower pronunciation rates optimized for 5-year-old comprehension
  - Added pronunciation tips and guidance for parents
- July 02, 2025: Speech system refinement and spell-out feature
  - Removed ineffective letter sound mode based on user feedback
  - Slowed down normal speech rate from 0.8 to 0.6 for better comprehension
  - Added spell-out feature that pronounces each letter clearly (A... B... C...)
  - Optimized speech modes to: Normal (0.6 speed), Syllables (0.4 speed), Spell Out, Learn Mode
- July 02, 2025: Major restructure to progressive learning system
  - Added 3 new letter recognition planets as foundational levels
  - Planet Alpha: Letters A-J (first letter recognition)
  - Planet Beta: Letters K-T (continued alphabet learning)  
  - Planet Gamma: Letters U-Z (complete alphabet mastery)
  - Existing word and sentence planets moved to levels 4-7
  - Added letter pronunciation using proper letter names (bee, see, dee, etc.)
  - Created separate game logic for letters vs words vs sentences
```

## User Preferences

Preferred communication style: Simple, everyday language.
Progressive difficulty goal: Teach children to eventually read full sentences through incremental learning stages.