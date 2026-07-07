# MyPortfolio

**Live at:** [fcampoverdeg.dev](https://fcampoverdeg.dev)

A fully custom-built portfolio showcasing my work across robotics, embedded systems, machine learning, and full-stack web development. Every component, animation, and design decision was built from scratch.

---

## Projects

| Project | Description | Tech |
|---------|-------------|------|
| **Daily's** | Founding engineer who built the full robotics software and learning stack for an autonomous kitchen cell. Bimanual OpenArm robot (14 DOF) with 500 Hz C++ control, VLA imitation learning, edge deployment on Jetson Thor. | ROS 2, C++, Python, PyTorch, Docker, Jetson |
| **CroQuest** | Custom ESP32 handheld game console with Bluetooth multiplayer, 8 classic games, and a modular game engine. Featured in VT NEWS. | C/C++, ESP32, PlatformIO, BLE |
| **Reinforcement Learning** | Comparative study of Q-Learning, SARSA, and Dyna-Q in a custom stochastic GridWorld. Includes embedded Jupyter notebooks. | Python, NumPy, Matplotlib, Jupyter |
| **Autonomous Car** | Autonomous vehicle for the National Robotics Challenge using ROS 2, SLAM, Nav2, and LiDAR-based navigation. | C++, ROS 2, Gazebo, Nav2 |
| **Concurrency Web Server** | Multi-threaded HTTP/1.0 server in C with thread pool, bounded buffer queue, and SFF scheduling. | C, POSIX Threads, TCP/IP |
| **Virtual Memory** | User-space and kernel-space page table walkers comparing vmalloc vs kmalloc allocation strategies. | C, Linux Kernel, Kernel Modules |

---

## Tech Stack

### Frontend
- **React** + React Router
- **Three.js** / React Three Fiber (3D model viewer)
- **Custom CSS** (Grid, Flexbox, animations)
- Custom scroll snapping (wheel-hijacking with easeInOutCubic)
- ROS computation graph background (Contact section)
- Typewriter effect, metallic button shine, cinematic galleries
- Embedded Jupyter notebook viewer (dark-themed HTML)

### Backend
- **Node.js** + Express
- **MongoDB** + Mongoose
- CORS, dotenv

### Deployment
- **Netlify** (HTTPS, SPA routing, CI/CD)
- **GitHub** (source control, continuous deployment)

---

## Features

- **Monochrome dark theme** - custom design system (#050505 base)
- **Scroll snapping** - custom wheel-hijacking between sections
- **ROS node graph** - animated computation graph with data pulses and carousel drift
- **3D model viewer** - interactive Three.js viewer with disassemble/reassemble
- **Jupyter notebooks** - 8 notebooks rendered as dark-themed HTML with tabbed navigation
- **Cinematic galleries** - auto-advancing slideshows with filmstrip thumbnails
- **Typewriter effect** - sequential character-by-character text reveal
- **Metallic button effects** - diagonal sweep + corner glow on borders
- **Animated stat counters** - numbers count up on scroll
- **Category filtering** - portfolio cards filterable by tech/domain

---

## Structure

```
frontend/src/
├── components/
│   ├── Home.js, About.js, Resume.js, Contact.js
│   ├── Portfolio.js, ProjectCard.js, Navbar.js, Footer.js
│   └── projects/
│       ├── Dailys/
│       ├── CroQuest/          (3D model, gallery, code)
│       ├── ReinforcementLearning/  (notebook viewer)
│       ├── ConcurrencyWebserver/
│       ├── VirtualMemory/
│       ├── AutonomousCar/
│       └── MyPortfolio/
├── App.js                     (routing, scroll snap)
└── App.css                    (global styles, fonts)

backend/
├── server.js
├── config/db.js
├── models/model.js
├── controllers/controller.js
└── routes/contact.js
```

---

## Setup

```bash
# Frontend
cd frontend
npm install
npm start

# Backend (optional, for contact form)
cd backend
npm install
node server.js
```

---

## License

[Creative Commons Attribution-NonCommercial 4.0 (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/)

---

## Author

**Felipe Campoverde**
- Portfolio: [fcampoverdeg.dev](https://fcampoverdeg.dev)
- LinkedIn: [linkedin.com/in/fcampoverdeg](https://www.linkedin.com/in/fcampoverdeg)
- Email: fcampoverdeg@gmail.com
