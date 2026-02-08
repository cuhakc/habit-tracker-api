# Habit Tracker API

REST API for a Habit Tracker application built with **Node.js + Express** and **MongoDB (Atlas)**.  
Includes **JWT authentication**, **password hashing**, **protected routes**, and **server-side validation** (so requests can’t be bypassed via Postman).

## Live Deployment (Render)
Base URL:  
- **https://habit-tracker-api-4m53.onrender.com**

> Note: Render free tier can “sleep”. The first request after inactivity may take ~30–60 seconds.

---

## Project Overview
This backend provides:
- User registration and login
- JWT-based authorization for private endpoints
- User profile access (protected)
- Habits CRUD (create/read/update/delete) (protected)
- External quote/advice endpoint (public) for demo purposes

### Tech Stack
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (JSON Web Token)
- bcrypt (password hashing)
- Joi (request validation)

---

## Setup & Installation

### 1) Requirements
- Node.js (LTS recommended)
- MongoDB Atlas account (or local MongoDB for local-only testing)

### 2) Clone repository
```bash
git clone https://github.com/cuhakc/habit-tracker-api.git
cd habit-tracker-api
npm install
```

### 3) Environment variables
Create a `.env` file in the project root:

```env
PORT=3000
MONGO_URI=mongodb+srv://<USER>:<PASSWORD>@cluster0.xxxxx.mongodb.net/habit_tracker?retryWrites=true&w=majority
JWT_SECRET=change_this_to_a_long_random_secret
JWT_EXPIRES_IN=7d
```

**Important:**
- Do **not** commit `.env` to GitHub.
- `node_modules/` must be ignored (already covered by `.gitignore`).

### 4) Run the server
Development:
```bash
npm run dev
```

Production:
```bash
npm start
```

Server (local) will run at:
- `http://localhost:3000`

---

## Authentication
Private routes require this header:

- `Authorization: Bearer <JWT_TOKEN>`

You get `<JWT_TOKEN>` from:
- `POST /api/auth/register` or
- `POST /api/auth/login`

---

## API Documentation

### Auth (Public)
| Method | Route | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Create a new user, return JWT |
| POST | `/api/auth/login` | Public | Login user, return JWT |

#### Register
**POST** `/api/auth/register`
```json
{
  "username": "rendertest",
  "email": "rendertest@example.com",
  "password": "12345678"
}
```

#### Login
**POST** `/api/auth/login`
```json
{
  "email": "rendertest@example.com",
  "password": "12345678"
}
```

---

### Users (Private)
| Method | Route | Access | Description |
|---|---|---|---|
| GET | `/api/users/profile` | Private | Get current logged-in user profile |
| PUT | `/api/users/profile` | Private | Update current user profile (if implemented) |

#### Get profile (with token)
**GET** `/api/users/profile`

Header:
- `Authorization: Bearer <JWT_TOKEN>`

---

### Habits (Private)
| Method | Route | Access | Description |
|---|---|---|---|
| POST | `/api/habits` | Private | Create a habit |
| GET | `/api/habits` | Private | List user habits |
| GET | `/api/habits/:id` | Private | Get habit by id |
| PUT | `/api/habits/:id` | Private | Update habit by id |
| DELETE | `/api/habits/:id` | Private | Delete habit by id |

#### Create habit (example)
**POST** `/api/habits`

Header:
- `Authorization: Bearer <JWT_TOKEN>`

Body:
```json
{
  "name": "Drink Water",
  "description": "At least 2 liters a day",
  "weeklyStatus": {
    "mon": true,
    "tue": false,
    "wed": false,
    "thu": false,
    "fri": false,
    "sat": false,
    "sun": false
  }
}
```

---

### External (Public)
| Method | Route | Access | Description |
|---|---|---|---|
| GET | `/api/external/quote` | Public | Fetch a random advice/quote from external API |

Example:
- **GET** `/api/external/quote`

---

## Testing the deployed API (quick checklist)
Using the deployed base URL:

1) Public route:
- `GET https://habit-tracker-api-4m53.onrender.com/api/external/quote`

2) Register / login:
- `POST https://habit-tracker-api-4m53.onrender.com/api/auth/register`
- `POST https://habit-tracker-api-4m53.onrender.com/api/auth/login`

3) Private route (token required):
- `GET https://habit-tracker-api-4m53.onrender.com/api/users/profile`
  - Header: `Authorization: Bearer <token>`

---

## Deployment Notes (Render)
Environment variables configured on Render:
- `MONGO_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`

Sensitive information is stored only in Render/Atlas environment settings and is not committed to GitHub.

---

## License
This project is for educational purposes.
