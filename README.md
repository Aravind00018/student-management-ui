# Student Management & Blog Platform UI

React frontend with authentication, connected to Spring Boot REST API.

## Tech Stack
- React 18 (Vite)
- React Router DOM
- Axios (with auth interceptor)
- Context API (global auth state)
- Tailwind CSS

## Features
- **Student Management**: View, add, delete students
- **Authentication**: Register and login pages with JWT
- **Persistent Login**: Token stored in localStorage, survives refresh
- **Blog Platform**: View all posts, create/edit/delete own posts
- **Auth-Aware UI**: Navbar and buttons adapt based on login state
- **Protected Routes**: Create/Edit post redirects to login if not authenticated
- **Author-Only Controls**: Edit/Delete only visible to the post's author

## How to Run
1. Make sure the Spring Boot API is running on port 8081
2. Clone this repo
3. Run: `npm install`
4. Create a `.env` file: `VITE_API_URL=http://localhost:8081`
5. Run: `npm run dev`
6. Open `http://localhost:5173`

## Backend Repo
https://github.com/Aravind00018/student-management-api

# Student Management System - Frontend

A modern, responsive web application built with React and Vite for managing student records and blog posts with JWT-based authentication.

## 🌐 Live Demo & Deployment

- **Live Application:** [https://student-management-hxb0v79wn-hustler17.vercel.app](https://student-management-hxb0v79wn-hustler17.vercel.app)
- **Deployment Platform:** Vercel

## 🛠️ Tech Stack
- React.js (Vite)
- JavaScript (ES6+)
- Axios (API Integration)
- HTML5 & CSS3
- JWT Session Storage