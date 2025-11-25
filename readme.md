# 🎬 BookMyShow Clone – Full Stack Web Application

**Frontend:** React (Vite)  
**Backend:** Node.js + Express  
**Database:** MongoDB Atlas  

A full-stack ticket booking platform inspired by BookMyShow. Users can explore movies and events, check showtimes, select seats, book tickets, and manage their profile.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, React Router, Axios, Bootstrap |
| Backend | Node.js, Express, JWT Authentication |
| Database | MongoDB Atlas |

## 🔧 Backend Setup (Node + Express)

### 1️⃣ Install dependencies
cd backend
npm install

## Create .env
PORT=5000
MONGO_URI=<your-mongodb-atlas-uri>
JWT_SECRET=<your-secret>

## Start backend
Paste mongoURL into backend .env as MONGO_URI
npm run dev
http://localhost:5000

## Frontend Setup (React Vite)
Install dependencies
cd frontend
npm install
npm run dev


## Modules
👤 User Module

Register / Login / Logout

Update profile

View booking history

🎬 Movies

Browse movies by city

Movie details

Showtimes and venue selection

Seat selection & booking (payments mocked)

🎭 Events

Browse events

Event info & booking (no seat layout)

👨‍💼 Admin (optional)

Add / edit / delete movies and events

View all bookings

Offers & analytics (extendable)