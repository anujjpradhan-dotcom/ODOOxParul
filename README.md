# Traveloop ✈️

Traveloop is a premium, production-grade personalized travel planning platform. It empowers users to create, manage, and share complex multi-stop itineraries with integrated budget tracking, activity discovery, and packing management.

## 🚀 Key Features

- **Smart Itinerary Builder**: Create multi-destination trips with nested activities and chronological timeline management.
- **Dynamic Exploration**: Discover cities with popularity scores, cost levels, and curated activity suggestions.
- **Budget Tracking**: Granular expense management for every trip stop with category-based breakdown.
- **Secure Authentication**: JWT-based auth system with persistent sessions and secure refresh tokens.
- **Public Trip Sharing**: Share your curated itineraries with a public link while keeping your drafts private.
- **Responsive Dashboard**: Beautiful, glassmorphism-inspired UI with a dark mode aesthetic and intuitive navigation.
- **Packing & Notes**: Integrated utility features to ensure you never forget an item or a detail.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) + Lucide Icons
- **Data Visualization**: [Recharts](https://recharts.org/)

### Backend
- **Environment**: [Node.js](https://nodejs.org/)
- **Framework**: [Express](https://expressjs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Security**: [Helmet](https://helmetjs.github.io/), [CORS](https://github.com/expressjs/cors), [JWT](https://jwt.io/)

---

## 📁 Project Structure

```text
.
├── backend/            # Express.js Server
│   ├── prisma/         # Database schema & migrations
│   ├── src/            # Source code (MVC-like architecture)
│   │   ├── controllers/# Route handlers
│   │   ├── services/   # Business logic
│   │   ├── middleware/ # Auth, Validation, Error handling
│   │   ├── routes/     # API endpoint definitions
│   │   └── utils/      # Helpers & Constants
│   └── scripts/        # Utility scripts
├── frontend/           # Next.js Application
│   ├── src/
│   │   ├── app/        # Pages & Routing
│   │   ├── components/ # Reusable UI components
│   │   ├── hooks/      # Custom React hooks
│   │   ├── lib/        # API client & Utilities
│   │   ├── stores/     # Zustand state stores
│   │   └── types/      # TypeScript definitions
└── database/           # Shared database scripts & seeds
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v20+ recommended)
- PostgreSQL database
- npm or yarn

### 1. Database Setup
Ensure your PostgreSQL server is running and create a database named `traveloop`.

### 2. Backend Configuration
```bash
cd backend
npm install
cp .env.example .env
```
Fill in the following in `.env`:
- `DATABASE_URL`: `postgresql://USER:PASSWORD@HOST:PORT/traveloop`
- `JWT_SECRET`: A long secure string
- `JWT_REFRESH_SECRET`: Another secure string
- `FRONTEND_URL`: `http://localhost:3000`

Initialize the database:
```bash
npx prisma generate
npx prisma migrate dev --name init
npm run seed  # Optional: Seed initial city data
```

### 3. Frontend Configuration
```bash
cd ../frontend
npm install
```
Create a `.env.local` file:
- `NEXT_PUBLIC_API_URL`: `http://localhost:5000/api`

### 4. Running the Application
**Start Backend:**
```bash
# In /backend
npm run dev
```

**Start Frontend:**
```bash
# In /frontend
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📖 API Overview
The API is available at `/api/v1` (or `/api`). All protected endpoints require a Bearer token.

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/auth/signup` | POST | Register new account |
| `/trips` | GET/POST | List/Create trips |
| `/trips/:id/stops` | POST | Add destination to trip |
| `/cities` | GET | Search travel destinations |
| `/admin/stats` | GET | System-wide analytics |

Full documentation can be found in `backend/API.md`.

## 📄 License
This project is licensed under the MIT License.
