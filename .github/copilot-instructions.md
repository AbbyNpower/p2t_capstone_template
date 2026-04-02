# Copilot instructions for Path2Tech Capstone

This repository is a two-part full-stack e-commerce starter: a Node/Express + MongoDB API (under `capstone-backend`) and a Vite + React frontend (under `capstone-frontend`). The goal of the agent is to be immediately productive making small-to-medium feature changes, bug fixes, and tests.

Key facts (quick):
- Backend: `capstone-backend` — Express server in `index.js`, Mongoose models in `models/`.
- Frontend: `capstone-frontend` — React + Vite app in `src/`.
- Top-level `install.js` creates `capstone-backend/.env` placeholder. Environment variables are required (see below).
- Default runtime ports: backend 3500 (see `capstone-backend/index.js`), frontend 5173 (Vite).

Important files to inspect for context and examples:
- `capstone-backend/index.js` — server boot, route mounts, DB connect.
- `capstone-backend/controllers/*` — business logic (auth, products, orders, payment). Use these for API behavior.
- `capstone-backend/models/*` — data shapes: `User`, `Product`, `Order`.
- `capstone-backend/middleware/authMiddleware.js` — JWT handling and admin check. Agents should add auth by setting `Authorization: Bearer <token>` header.
- `capstone-backend/config/cloudinary.js` and `capstone-backend/middleware/upload.js` — image upload pipeline (multer memory storage -> Cloudinary via streamifier).
- `capstone-frontend/src/services/*` — how the frontend calls the API (example: `PaymentService.checkoutCart` expects `Authorization` header with `Bearer <token>` stored in `localStorage`).

Environment variables (must exist and are referenced across code):
- `DB_URL` — MongoDB connection string (created by `install.js` placeholder)
- `JWT_SECRET` — used for signing/validating JWTs (`authController`, `authMiddleware`)
- `STRIPE_SECRET_KEY` and `FRONTEND_URL` — used by Stripe integration (`paymentController`, `orderController`)
- `CLOUDINARY_*` (cloud name, api key, api secret) — used by `config/cloudinary.js`

Run / debug commands (examples):
- Quick full dev (top-level): `npm start` — this runs installs in both subfolders then starts backend (`npm run dev`) and frontend (`npm run dev`) concurrently (see `package.json` top-level `start` script).
- Backend only: `cd capstone-backend && npm install && npm run dev` (runs `nodemon index.js`)
- Frontend only: `cd capstone-frontend && npm install && npm run dev` (runs Vite on :5173)
- Initialize `.env`: `node install.js` (creates `capstone-backend/.env` with DB_URL placeholder).

API conventions & notable patterns:
- Auth: JWT token returned by `POST /api/auth/login` and stored by the frontend in `localStorage` as `token`. Backend middleware reads `Authorization` header (supports raw token or `Bearer <token>`). Admin role is a string on the user `role` field (`"admin"`).
- Product creation: multipart/form-data with field name `image` for file uploads; route is `POST /api/products` and protected by `protect, admin` middleware. File is uploaded to Cloudinary via a memory stream (`streamifier`). See `productController.createProduct`.
- Order creation from client: After Stripe checkout the frontend calls `GET /api/orders/from-stripe?sessionId=<id>` (server-side uses Stripe session retrieval to materialize an `Order`). The payment flow uses Stripe Checkout (see `paymentController.createCheckoutSession`).
- Data shapes — refer to models for exact fields (examples):
  - `User`: `{ name, email (unique), password, role }`
  - `Product`: `{ name, description, price, category, image, stock }`
  - `Order`: `{ orderItems: [{name, price, quantity}], totalPrice, isPaid, paidAt, stripeSessionId }`

Developer conventions (what to follow when editing):
- Keep controllers thin: controllers in `capstone-backend/controllers` hold request handling and small business logic. For larger refactors, add services under `controllers/` or `services/` with tests.
- Use existing middleware patterns: auth via `authMiddleware.protect` and `authMiddleware.admin`. Protect product creation and admin-only endpoints accordingly.
- Follow existing error responses: controllers return JSON with `{ message: <string> }` on failures. Preserve HTTP status codes used in the repo (401, 403, 409, 500, etc.).
- Frontend integration: the frontend expects API at `http://localhost:3500/api/` — update `ProductService` and `PaymentService` if you change endpoints or ports.

Testing & linting:
- There are no automated tests in the repo. Frontend has a lint script: `cd capstone-frontend && npm run lint`.
- When adding tests, prefer small unit tests around controllers or services. Note: no test framework is included; add `jest`/`vitest` if adding tests and update `package.json`.

When you change environment variables or startup behavior, update `README.md` files and `install.js` if necessary.

If anything here is unclear or you want the agent to include tests or CI wiring, tell me which area (backend auth, product image flow, Stripe flow, or frontend routing) and I'll iterate the instruction file with examples and automated checks.
