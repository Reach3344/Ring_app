# Ring App

Full-stack ring shop and relationship registry app. The project is split into a Node.js/Express backend and a React/Vite frontend.

## Features

- User registration, login, Google-style account selection, password reset, and session restore.
- Admin and user dashboard screens.
- Ring catalog, couple shop, cart, purchase flow, and inventory management.
- Couple pairing, invitations, shared profiles, memories, and public profile pages.
- Notifications, settings, security policies, health checks, and Socket.IO support.

## Tech Stack

- Frontend: React 19, TypeScript, Vite, Tailwind CSS, React Router, Recharts, Socket.IO client.
- Backend: Node.js, Express, MySQL, Socket.IO, JWT, bcryptjs.
- Database: MySQL using the `ring_app` database by default.

## Project Structure

```text
Ring_app/
  backend/              Express API, MySQL config, routes, services, SQL scripts
  frontend/             React/Vite app
  backend-dev.log       Latest backend dev-server output
  frontend-dev.log      Latest frontend dev-server output
```

## Prerequisites

- Node.js 18 or newer
- npm
- MySQL server

## Backend Setup

```bash
cd backend
npm install
copy .env.example .env
```

Edit `backend/.env`:

```env
PORT=4001
FRONTEND_ORIGIN=http://localhost:5173
JWT_SECRET=change-this-secret
ACCESS_TOKEN_TTL=12h
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ring_app
DB_CONNECTION_LIMIT=10
```

Bootstrap the database:

```bash
mysql -u root -p < sql/app-bootstrap.sql
```

Start the backend:

```bash
npm run dev
```

Default backend URL: `http://localhost:4001`

Health check: `http://localhost:4001/api/health`

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Default frontend URL: `http://localhost:5173`

The Vite dev server proxies `/api` and `/uploads` to `http://127.0.0.1:4001` by default. To point it somewhere else, set `VITE_API_TARGET`.

## Running Both Apps

Open two terminals:

```bash
cd backend
npm run dev
```

```bash
cd frontend
npm run dev
```

Then open `http://localhost:5173`.

## Production Preview

```bash
cd frontend
npm run preview
```

This builds the frontend and serves `frontend/dist` with `frontend/server.mjs`.

## Useful API Routes

- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/rings`
- `GET /api/cart`
- `GET /api/dashboard`
- `GET /api/couple-shop`
- `GET /api/inventory`
- `GET /api/notifications/me`
- `GET /api/profile/me/current`
- `GET /api/public-profile/:handle`
- `GET /api/settings/system`

Some routes require authentication. Admin routes also require an admin role.

## Scripts

Backend:

```bash
npm run dev
npm start
```

Frontend:

```bash
npm run dev
npm run build
npm run preview
```

## Notes

- Backend configuration is loaded from `backend/.env`.
- The backend creates core tables on startup with `IF NOT EXISTS`, but `backend/sql/app-bootstrap.sql` is still the recommended first setup step.
- Uploaded files are served from `/uploads`.
- Socket.IO is initialized when the backend server starts.
