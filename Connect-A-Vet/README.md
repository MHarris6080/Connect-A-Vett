# 🐾 VetConnect

**VetConnect** is a full-stack web-based appointment and pet record management system designed for small veterinary clinics. It empowers pet owners and clinic staff to book appointments, manage pet health records, and streamline clinic operations — all from one modern platform.

---

## 🚀 Features

- 🔐 **Secure Authentication** (JWT-based login & register)
- 🐶 **Pet Record Management**
  - Add, view, edit, and delete pet records
  - Structured like a veterinary clinical chart
  - Admin access to view all pet records
- 📅 **Appointment Booking**
  - Schedule appointments per pet
  - Dashboard displays upcoming bookings
- 👥 **Role-based Access**
  - Pet owners vs. Admin users
- 🛠️ **Fully Integrated Frontend + Backend**
  - Vue.js + Tailwind CSS (frontend)
  - Node.js + Express + MongoDB (backend)

---

## 🗂️ Project Structure

```bash
VetConnect/
├── frontend/         # Vue.js client (Vite + Tailwind)
│   ├── views/        # Page components (Login, Register, Dashboard, Records, etc.)
│   ├── services/     # API communication (Axios)
│   ├── router/       # Frontend routes
│   └── assets/       # Custom styles
│
├── backend/          # Express.js server
│   ├── routes/       # API routes (auth, pets, appointments)
│   ├── models/       # Mongoose schemas
│   ├── middleware/   # Auth middleware
│   └── utils/        # Email sending utility (for password reset)
│
├── .env.example      # Sample environment variables
└── README.md


## Getting Started
git clone https://github.com/D-McNabb/VetConnect.git
cd VetConnect

## 2. Backend Setup

cd backend
npm install
cp .env.example .env   # Fill in your MongoDB URI and JWT secret
npm run dev

```bash
cd frontend
npm install
npm run dev


cd backend
npm install
npm run dev

env Setup (backend)
Create a .env file with:

MONGO_URI=your-mongo-uri
JWT_SECRET=your-secret


Open your browser to: http://localhost:5173



