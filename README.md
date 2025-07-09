# MyPortfolio – Personal Developer Website

**Live at:** [fcampoverdeg.dev](https://fcampoverdeg.dev)

This is the source code for my personal portfolio – a fully custom-built React + Node.js application that showcases my work across embedded systems, web development, robotics, and interactive UI/UX design.

The website reflects who I am not only as a developer, but as a designer, engineer, and creator.

---

## Overview

This portfolio is:

- A modern **single-page application (SPA)** using React
- **Fully responsive**, built mobile-first
- Designed with **clean visuals**, subtle animations, and clear structure
- A representation of my **design principles** and technical skills

Each project page includes rich interactions, including 3D models, image galleries, and scroll-triggered animations.

---

## Goals

- **Professional Presence** – Represent myself online
- **Visual Showcase** – Highlight projects with elegance
- **Mobile-First** – Ensure excellent UX on any screen
- **Modular Architecture** – Scalable React components
- **Modern Deployment** – Hosted on Netlify with CI/CD

---

## Tech Stack

### Frontend

- **React** – Core framework
- **React Router** – SPA navigation
- **Zustand** – Global state management
- **Three.js + Vanta.js** – 3D rendering and animated backgrounds
- **IntersectionObserver** – Scroll-based reveals
- **Custom CSS (Grid + Flexbox)** – Responsive layout
- **FontAwesome** – Icons and social links
- **Blender** – 3D asset modeling
- **Framer Motion** – Smooth UI animations

### Backend

- **Node.js + Express** – REST API for dynamic data
- **MongoDB + Mongoose** – Data storage and schemas
- **dotenv + CORS** – Environment variables and secure access

### Deployment

- **Netlify** – HTTPS, SPA routing, continuous deployment
- **GitHub** – Source control and CI integration

---

## File Structure

### Frontend

```bash
frontend/
├── src/
│   ├── components/       # React components and pages
│   │   ├── projects/     # Project folders (CroQuest, MyPortfolio, etc.)
│   ├── images/           # Static assets
│   ├── App.js            # Main router
│   └── index.js          # React entry point
```

### Backend

```bash
backend/
├── server.js             # Entry point
├── config/db.js          # MongoDB connection
├── models/model.js       # Mongoose schema
├── controllers/          # Logic for API requests
└── routes/data.js        # API routes
```

---

## Development Insights

- SPA navigation with **React Router**
- Scroll-triggered animations via **IntersectionObserver**
- Fully responsive using **CSS Grid** and **Flexbox**
- Smooth hash-based navigation and scroll restoration
- Modular component structure
- `_redirects` file used for SPA routing in Netlify

---

## Sample Code Snippet

```jsx
<Routes>
  <Route path="/portfolio" element={<Portfolio />} />
  <Route path="/projects/croquest" element={<CroQuestPage />} />
  <Route path="/projects/myportfolio" element={<MyPortfolioPage />} />
  <Route path="/projects/autonomouscar" element={<AutonomousCarPage />} />
</Routes>
```

---

## Setup & Installation

### Frontend

```bash
git clone https://github.com/fcampoverdeg/portfolio.git
cd portfolio/frontend
npm install
npm start
```

### Backend (optional)

```bash
cd ../backend
npm install
node server.js
```

---

## License

This project is licensed under the [Creative Commons Attribution-NonCommercial 4.0 (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/).

> You may use, remix, and build upon this work **for non-commercial purposes only**, with proper credit.

---

## Credits

- **Felipe Campoverde** – Developer, Designer, and Maintainer
- Special thanks to open-source contributors and tooling communities
- Iconography by [FontAwesome](https://fontawesome.com)
- Background effects by [Vanta.js](https://www.vantajs.com)

---

## 📬 Contact

Have questions or want to collaborate?  
📫 Visit: [fcampoverdeg.dev](https://fcampoverdeg.dev)  
💼 [LinkedIn Profile](https://www.linkedin.com/in/fcampoverdeg)
