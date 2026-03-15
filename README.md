<div align="center">
  <h1>🎫 Ticket Booking Platform (MERN)</h1>
  
  <p>
    <strong>Full-stack web application for booking flight and train tickets.</strong>
  </p>
  
  <p>
    <a href="[https://github.com/Kinaqu/Ticket-byuing-site/stargazers">
      <img src="https://img.shields.io/github/stars/Kinaqu/ticket-booking?style=for-the-badge&color=yellow" alt="Stars" />
    </a>
    <img src="https://img.shields.io/badge/Status-Learning_Project-orange?style=for-the-badge" alt="Learning Project" />
  </p>
</div>

<br />

This project demonstrates a complete MERN stack architecture including user authentication, an admin panel, ticket management, and a booking system. 

> **⚠️ Note:** This project was created primarily as a learning exercise to practice building full-stack applications using the MERN stack. It is **not** intended for production use without additional improvements.

## 📝 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Default Admin Account](#-default-admin-account)
- [API Overview](#-api-overview)
- [Future Improvements](#-future-improvements)
- [License](#-license)
- [Author](#-author)

---

## ✨ Features

### 👤 User Features
- User registration and login
- Search flight and train tickets
- Purchase tickets
- View purchased tickets in personal profile

### 🛡️ Admin Features
- Admin authentication
- Create, edit, and delete tickets
- Manage planes and trains
- Manage routes and schedules

---

## 🛠 Tech Stack

### Frontend
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Axios](https://img.shields.io/badge/axios-671ddf?style=for-the-badge&logo=axios&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Passport.js](https://img.shields.io/badge/Passport.js-34E27A?style=for-the-badge&logo=passport&logoColor=white)

### Database
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-800?style=for-the-badge&logo=mongoose&logoColor=white)

---

## 📂 Project Structure

This project is organized as a monorepo containing both the client and server codebases.

```text
ticket-booking/
├── packages/
│   ├── client/       # React frontend application
│   └── server/       # Express API + MongoDB backend
```

---

## 🚀 Getting Started

### 1. Install Dependencies

**Client:**
```bash
cd packages/client
npm install
```

**Server:**
```bash
cd packages/server
npm install
```

### 2. Start MongoDB

Make sure MongoDB is running locally on your machine.
The project uses the following default MongoDB connection string:

```text
mongodb://localhost:27017/project
```

### 3. Start the Server

```bash
cd packages/server
npm start
```
> The API server will run on `http://localhost:3001`

### 4. Start the Frontend

```bash
cd packages/client
npm start
```
> The React application will run on `http://localhost:3000`

---

## 🔐 Default Admin Account

An admin account is automatically created on the first run of the application. You can use these credentials to access the admin dashboard:

- **Login:** `admin123`
- **Password:** `12345678`

---

## 🔌 API Overview

Below are the key API routes available in the backend.

### Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/signup` | Register a new user |
| `POST` | `/api/login` | Login user |

### User Bookings
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/FlightTicketUser` | Get available flight tickets |
| `GET` | `/api/TrainTicketUser` | Get available train tickets |
| `POST` | `/api/TrainTicketUser/:id/purchase` | Purchase a specific train ticket |

### Admin Endpoints (Flight Tickets Example)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/admin/FlightTicket` | List all flight tickets |
| `POST` | `/api/admin/FlightTicket` | Create a new flight ticket |
| `PUT` | `/api/admin/FlightTicket/:id` | Update an existing flight ticket |
| `DELETE` | `/api/admin/FlightTicket/:id` | Delete a flight ticket |

---

## 🚧 Future Improvements (Production Setup)

Since this is a learning project, several improvements would be needed before exploring any production deployment:
- [ ] Implement environment variables (`.env`) for DB connection strings and secrets
- [ ] Improve authentication architecture and security
- [ ] Integrate a real payment processing system (e.g., Stripe)
- [ ] Enhance UI/UX design and layout responsiveness
- [ ] Add Docker configuration and setup deployment pipelines

---

## 📄 License

This project currently has no specified license.

---

## 👨‍💻 Author

**Kinaqu**  
*Full-stack developer focused on building web applications and backend services.*

[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Kinaqu)

<br />

<div align="center">
  <sub>Built for learning purposes by <a href="https://github.com/Kinaqu">Kinaqu</a></sub>
</div>
