# Smart Expense Tracker 💰 (MERN Stack — India Edition)

A full-stack personal finance management application for tracking expenses, categorizing transactions, and visualizing spending patterns — built for Indian users with ₹ (INR) currency formatting and UPI as a payment method.

## ✨ Features

- **JWT Authentication** — secure register/login with hashed passwords (bcrypt)
- **Transaction Management** — full CRUD for income & expenses
- **India-specific categories & payment methods** — UPI, Cash, Debit/Credit Card, Net Banking, plus categories like Groceries, Rent, Utilities
- **Analytics Dashboard** — total income/expense/balance cards, category-wise pie chart, and monthly income vs. expense bar chart (Recharts)
- **Responsive UI** — built with React + Material UI
- **RESTful API** — Node.js + Express + MongoDB (Mongoose)

## 🛠️ Tech Stack

| Layer      | Technology                                   |
|------------|-----------------------------------------------|
| Frontend   | React (Vite), Material UI, Recharts, Axios, React Router |
| Backend    | Node.js, Express.js                          |
| Database   | MongoDB (Mongoose ODM)                       |
| Auth       | JWT (jsonwebtoken) + bcryptjs                |

## 📁 Project Structure

```
smart-expense-tracker/
├── backend/
│   ├── config/db.js
│   ├── middleware/auth.js
│   ├── models/User.js
│   ├── models/Transaction.js
│   ├── routes/auth.js
│   ├── routes/transactions.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── components/     # Navbar, TransactionForm, TransactionList, charts, etc.
    │   ├── pages/           # Login, Register, Dashboard, Transactions
    │   ├── context/         # AuthContext (JWT-based auth state)
    │   ├── services/api.js  # Axios instance with auth interceptor
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── package.json
    └── .env.example
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB running locally, or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd smart-expense-tracker
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and set your values:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/smart-expense-tracker
JWT_SECRET=replace_this_with_a_long_random_secret_key
```

Run the backend:

```bash
npm run dev      # development (nodemon, auto-restart)
# or
npm start         # production
```

The API will run at `http://localhost:5000`.

### 3. Frontend Setup

In a new terminal:

```bash
cd frontend
npm install
cp .env.example .env
```

Edit `.env` if your backend runs on a different URL:

```
VITE_API_URL=http://localhost:5000/api
```

Run the frontend:

```bash
npm run dev
```

The app will run at `http://localhost:3000`.

### 4. Use the app

1. Open `http://localhost:3000`
2. Register a new account
3. Add income/expense transactions with category, amount (₹), and payment method (UPI, Cash, etc.)
4. View your Dashboard for spending analytics

## 🔌 API Endpoints

| Method | Endpoint                              | Description                     | Auth |
|--------|----------------------------------------|----------------------------------|------|
| POST   | `/api/auth/register`                  | Register a new user             | No   |
| POST   | `/api/auth/login`                     | Login and get JWT token         | No   |
| GET    | `/api/auth/me`                        | Get logged-in user profile      | Yes  |
| GET    | `/api/transactions`                   | Get all transactions (filters: `month`, `year`, `category`, `type`) | Yes  |
| GET    | `/api/transactions/categories`        | Get list of allowed categories  | Yes  |
| GET    | `/api/transactions/analytics/summary` | Get yearly totals & breakdowns  | Yes  |
| GET    | `/api/transactions/:id`               | Get a single transaction        | Yes  |
| POST   | `/api/transactions`                   | Create a new transaction        | Yes  |
| PUT    | `/api/transactions/:id`               | Update a transaction            | Yes  |
| DELETE | `/api/transactions/:id`               | Delete a transaction            | Yes  |

All protected routes require an `Authorization: Bearer <token>` header.

## 🌱 Deployment Notes

- **Backend**: deploy to Render, Railway, or an EC2/VPS. Set `MONGO_URI` and `JWT_SECRET` as environment variables.
- **Frontend**: deploy to Vercel or Netlify. Set `VITE_API_URL` to your deployed backend URL.
- **Database**: use MongoDB Atlas for a free cloud-hosted cluster.

## 📄 License

MIT — free to use for learning, portfolio, or resume projects.
