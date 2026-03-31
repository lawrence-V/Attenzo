# Attenzo


# 🚀 QR Attendance System (Full-Stack)

A full-stack QR-based attendance tracking system built with **NestJS, React, React Native, and PostgreSQL**.

This project demonstrates real-world implementation of **authentication, role-based access control (RBAC), mobile QR scanning, and RESTful APIs**.

---

## 📌 Features

### 🔐 Authentication & Authorization

* JWT-based authentication
* Role-Based Access Control (Admin & User)
* Protected API routes using NestJS Guards

### 👨‍💻 Admin Dashboard (React)

* Admin login
* Create and manage users
* Generate unique QR codes for each user
* View attendance logs

### 📱 Mobile App (React Native)

* Scan QR codes using device camera
* Send scan data to backend API
* Instant success/error feedback

### 🧠 Backend API (NestJS)

* RESTful API architecture
* Secure endpoints with JWT
* Role-protected routes
* Attendance logging system

### 🗄️ Database (PostgreSQL)

* Relational database design
* Users and attendance tracking
* Efficient querying and storage

---

## 🧩 Tech Stack

| Layer    | Technology          |
| -------- | ------------------- |
| Backend  | NestJS              |
| Frontend | React               |
| Mobile   | React Native (Expo) |
| Database | PostgreSQL          |
| Auth     | JWT                 |
| ORM      | Prisma / TypeORM    |

---

## ⚙️ System Architecture

```
React Native (QR Scanner)
↓
NestJS API (Auth + Scan Endpoint)
↓
PostgreSQL (Store Attendance Logs)
↓
React Admin Dashboard (View Data)
```

---

## 📂 Project Structure

```
qr-attendance-system/
├── backend/        # NestJS API
├── web/            # React Admin Dashboard
├── mobile/         # React Native App
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/qr-attendance-system.git
cd qr-attendance-system
```

---

### 2. Backend Setup (NestJS)

```bash
cd backend
npm install
```

Create a `.env` file:
```
DATABASE_URL=your_postgresql_url
JWT_SECRET=your_secret_key
```

Run the server:
```bash
npm run start:dev
```

---

### 3. Frontend Setup (React)

```bash
cd web
npm install
npm run dev
```

---

### 4. Mobile App (React Native)

```bash
cd mobile
npm install
npx expo start
```

---

## 🔐 API Endpoints (Sample)

| Method | Endpoint    | Description        | Access    |
| ------ | ----------- | ------------------ | --------- |
| POST   | /auth/login | User login         | Public    |
| POST   | /users      | Create user        | Admin     |
| GET    | /attendance | Get all logs       | Admin     |
| POST   | /scan       | Scan QR attendance | Protected |

---

## 🧠 RBAC Implementation

This project uses a simple RBAC system:

* **Admin**

  * Manage users
  * View attendance logs

* **User**

  * Has a unique QR code
  * Can be scanned for attendance

Implemented using:

* Custom `@Roles()` decorator
* `RolesGuard` in NestJS

---

## 📸 Screenshots (Optional)

*Add screenshots of your dashboard and mobile app here*

---

## 🎥 Demo (Recommended)

*Add a short demo video link (Google Drive / YouTube)*

---

## 🌐 Deployment

| Service  | Platform              |
| -------- | --------------------- |
| Backend  | Railway / Render      |
| Database | Supabase (PostgreSQL) |
| Web App  | Vercel                |
| Mobile   | Expo APK              |

---

## 💡 Future Improvements

* Export attendance to CSV
* Time-in / Time-out tracking
* Geolocation validation
* Real-time updates (WebSocket)

---

## 👤 Author

**Lawrence Valdez**

---

## 📄 License

This project is for portfolio and educational purposes.


Demo video (VERY important)
GitHub repo (clean README)
Screenshots
API documentation (Swagger in NestJS)
