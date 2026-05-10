# Traveloop Database Layer

## Setup

1. Install dependencies:
   ```bash
   cd database
   npm install
   ```

2. Configure environment:
   Copy `.env.example` to `.env` and update the `DATABASE_URL`

3. Run migrations and generate client:
   ```bash
   npm run db:migrate
   npm run db:generate
   ```

4. Seed the database:
   ```bash
   npm run db:seed
   ```
