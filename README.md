# Assignment Portal — Professor Dashboard (React)

A React-based dashboard for professors to manage student assignments. Part of the **Student Assignment Portal**, a full-stack web application built with the MERN/MEAN stack.

🔗 **Live Demo:** [assignment-portal-react.vercel.app](https://assignment-portal-react.vercel.app/)

---

## 🗂️ Related Repositories

| Part | Repo | Live |
|------|------|------|
| Professor Dashboard (React) | [assignment-portal-react](https://github.com/shivG1zmo/assignment-portal-react) | [Live](https://assignment-portal-react.vercel.app/) |
| Student Portal (Angular) | [assignment-portal-angular](https://github.com/shivG1zmo/assignment-portal-angular) | [Live](https://assignment-portal-angular.vercel.app/login) |
| Backend (Node.js/Express) | [assignment-portal-backend](https://github.com/shivG1zmo/assignment-portal-backend) | [Live](https://assignment-portal-backend-zyn8.onrender.com) |

---

## ✨ Features

- View all students and their submitted assignments
- Track submission status across the class
- Download submitted assignment files
- Real-time data fetched from REST API backend

---

## 🛠️ Tech Stack

- **React** — UI library
- **JavaScript (ES6+)** — core logic
- **Fetch API** — HTTP requests to backend (no axios)
- **Vercel** — deployment

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- Backend server running (see [assignment-portal-backend](https://github.com/shivG1zmo/assignment-portal-backend))

### Installation

```bash
git clone https://github.com/shivG1zmo/assignment-portal-react.git
cd assignment-portal-react
npm install
npm start
```

The app runs at `http://localhost:3000` by default.

> **Note:** Make sure the backend is running and the API URL in the code points to your local backend or the deployed Render URL.

---

## 🌐 Deployment

Deployed on **Vercel**. To deploy your own:

```bash
npm install -g vercel
vercel
```

---

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/            # Main page views
├── App.js            # Root component and routing
└── index.js          # Entry point
```

---

## 👤 Author

**Shivram C** — [github.com/shivG1zmo](https://github.com/shivG1zmo)
