# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Backend (Node.js/Express)
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (currently not configured)

### Frontend (React)
- `cd client && npm start` - Start React development server on port 3000
- `cd client && npm run build` - Build React app for production
- `cd client && npm test` - Run React tests

### Full Stack Development
- `npm run dev-full` - Run both backend and frontend in development mode concurrently
- `npm run build` - Build the React client (runs `cd client && npm install && npm run build`)
- `npm run install-all` - Install dependencies for both backend and client

## Architecture Overview

This is a full-stack tournament management system with JWT authentication:

### Backend Structure (`/app`)
- **Models** (`/app/models/`): Sequelize ORM models for database entities
  - User authentication and roles (user.model.js, role.model.js)
  - Tournament system (listetournois.model.js, matches.model.js)
  - Game rankings (listejeu.model.js, listerank.model.js, jeu_rank.model.js, user_rank.model.js)
  - Tournament roles (tournoiRoles.model.js)
- **Routes** (`/app/routes/`): Express API endpoints
  - auth.routes.js - Authentication (login, register)
  - user.routes.js - User management
  - jeu.routes.js - Game management with image uploads
  - tournoi.routes.js - Tournament operations
  - bracket.routes.js - Tournament brackets
- **Controllers** (`/app/controllers/`): Business logic handlers
- **Middleware** (`/app/middleware/`): Auth middleware (checkUser, requireAuth)
- **Config** (`/app/config/`): Database configuration

### Frontend Structure (`/client/src`)
- **Pages** (`/src/pages/`): Main application pages
  - home.js - Dashboard
  - jeu.js, jeuCreate.js - Game management
  - homeListeJeux.js - Game listings
- **Components** (`/src/components/`): Reusable React components
  - Authentication components (log/)
  - Navigation (Navbar.js, LeftNav.js)
  - Game listings (listejeux/)
  - Tournament components (listetournois/, brackets/)
  - UI components (ButtonPrimary/, FieldError/, SearchBar/)
- **Store** (`/src/store/`): Redux state management
- **Services** (`/src/services/`): API communication layer
- **Actions** (`/src/actions/`): Redux actions

### Key Technical Details

**Database**: Uses Sequelize ORM with support for multiple databases (configured via environment variables)

**Authentication**: JWT-based authentication with cookies
- Middleware automatically checks user authentication on all routes
- Role-based access control (user, admin)

**File Uploads**: Cloudinary integration for game images via multer

**State Management**: Redux with Redux Toolkit for React state management

**CORS Configuration**: Configured for multiple deployment environments:
- Production: Vercel and Railway deployments
- Development: localhost:3000 and localhost:3001

**Database Relations**:
- Many-to-many relationships between users and roles
- Games have associated ranks
- Tournaments link to games and have matches
- Users can have ranks in different games

### Deployment
- **Docker**: Multi-stage build with Node.js 18 Alpine
- **Vercel**: Frontend deployment with SPA routing configuration
- **Production**: Serves React build from Express server

### Environment Variables
Backend requires database configuration via environment variables (see .env file).