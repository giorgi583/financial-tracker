# 💰 Financial Tracker

A modern full-stack personal finance management application that helps users monitor their income, expenses, savings, budgets, and financial goals through an intuitive dashboard with interactive analytics and detailed reports.

Built with **React**, **Vite**, **Tailwind CSS**, **Node.js**, **Express**, **PostgreSQL**, and **Sequelize**.

---

## ✨ Features

### 🔐 Authentication & Security

- Secure user registration and login
- Cookie-based authentication using JWT
- Password hashing with bcrypt
- Protected backend routes
- Persistent user sessions
- reset password with email

---

### 💳 Transaction Management

Users can manage their finances by creating transactions with:

- Amount
- Transaction type (Income / Expense)
- Category
- Description
- Date

Additional capabilities:

- View complete transaction history
- Edit and delete transactions
- Filter transactions
- Sort transactions
- Search transactions
- View categorized financial data

---

### 📊 Interactive Dashboard

The dashboard provides a complete overview of the user's finances, including:

- Current balance
- Total income
- Total expenses
- Net income
- Spending by category (Pie Chart)
- Expense trends over time
- Top spending categories
- Recent transactions
- Largest expense for selected period

Supported dashboard periods:

- This Month
- Last Month
- Last 3 Months
- This Year
- Last Year
- All Time

Interactive charts are built using **Recharts**.

---

### 💵 Budgets & Spending Limits

Users can create spending limits for different categories.

Features include:

- Overall budget
- Category budgets
- Progress tracking
- Remaining budget calculations
- Budget utilization indicators

---

### 🎯 Financial Goals

Create, edit, delete and monitor financial goals such as:

- Long-term savings
- Monthly savings
- Spending reduction goals
- Monthly income goals

Each goal includes:

- Progress tracking
- Completion percentage
- Remaining amount
- Status updates

---

### 🚨 Smart Alerts

Automatically generated notifications provide information about:

- Budget nearing limit
- Budget exceeded
- Goal progress
- Goal failures
- Financial insights
- General information and warnings

---

### 📈 Reports

Generate financial reports using predefined periods or custom date ranges.

Supported report periods:

- Week
- Month
- Year
- Custom From–To dates

Reports include:

- Income analysis
- Expense analysis
- Savings trends
- Category breakdowns
- Top spending days
- Cash flow analysis
- Financial summaries

---

### ⚙️ User Preferences

Users can personalize their experience by changing:

#### Theme

- Light Mode
- Dark Mode

#### Accent Color

- Blue
- Purple
- Orange
- Green

#### Currency

- USD
- EUR
- GEL

#### Language

- English
- Georgian

Additional settings:

- Change username
- Change password
- Set initial balance

---

### ❓ Help Center

Built-in help page providing guidance and assistance for application features.

---

# 🛠️ Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Redux Toolkit
- React Router DOM
- Motion
- Recharts
- React Hot Toast
- React Icons
- Lucide React
- date-fns
- react-i18next

---

## Backend

- Node.js
- Express
- PostgreSQL
- Sequelize ORM

---

## Authentication

- JWT
- Cookie-based Authentication
- bcrypt

---

## Validation

- Zod

---

## Additional Libraries

- Nodemailer
- dotenv
- cors
- cookie-parser
- pg-hstore
- nodemon

---

# 📁 Project Structure

```
Financial-Tracker/
│
├── client/
│   ├── src/
│   ├── public/
│   └── ...
│
├── server/
│   ├── services/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── ...
│
└── README.md
```

---

# 🗄️ Database Schema

The application uses PostgreSQL with Sequelize.

Tables:

- Users
- UserPreferences
- Transactions
- Budgets
- Goals

---

# 🚀 API Routes

The backend is organized into dedicated route modules.

### User

- `usersRoute`

Handles:

- Authentication
- Registration
- Login
- Logout
- User management

---

### Transactions

- `transactionsRoute`

Handles:

- Create transaction
- Update transaction
- Delete transaction
- Get transaction history
- Filtering
- Sorting

---

### Dashboard

- `dashboardRoute`

Provides dashboard statistics and summaries.

---

### Analytics

- `analyticsRoute`

Provides charts, reports, financial analytics, and statistical calculations.

---

### Budget

- `budgetRoute`

Handles:

- Budgets
- Spending limits
- Progress calculations

---

### Goals

- `goalRoute`

Handles:

- Goal creation
- Goal updates
- Goal progress

---

### User Preferences

- `userPreferencesRoute`

Handles:

- Theme
- Accent color
- Currency
- Language
- Initial balance
- User settings

---

# 📦 Installation

## Clone the repository

```bash
git clone https://github.com/giorgi583/financial-tracker.git
```

## Install frontend dependencies

```bash
cd client
npm install
```

## Install backend dependencies

```bash
cd ../server
npm install
```

---

# ▶️ Running the Application

### Frontend

```bash
npm run dev
```

### Backend

```bash
npm run dev
```

---

# 🔒 Environment Variables

Create a `.env` file inside the server directory.

Example:

```env
PORT=5000

DB_NAME=your_database
DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432

JWT_SECRET=your_secret

EMAIL_USER=your_email
EMAIL_PASS=your_email_app_password
```

---

# 📈 Key Highlights

- Full-stack architecture
- Secure cookie-based authentication
- PostgreSQL relational database
- Interactive financial dashboard
- Responsive modern UI
- Data visualization with Recharts
- Budget and goal management
- Smart financial alerts
- Detailed reporting system
- Internationalization (English & Georgian)
- Theme customization
- Currency customization
- Mobile-friendly design

---

# 📄 License

This project is not licensed

---

## 👨‍💻 Author

Developed as a full-stack personal finance management application using React, Express, PostgreSQL, and Sequelize.