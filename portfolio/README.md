# Akash K - Serverless Personal Portfolio Website

A state-of-the-art, purely serverless personal portfolio website designed and developed for **Akash K**, a final-year Computer Science Engineering student at National Engineering College, Kovilpatti.

---

## 🌟 Visual & Dynamic Features

- **Constellation Particle Canvas**: Clean and high-performance interactive backdrop adapting dynamically to theme preferences.
- **Glassmorphic Responsive Panels**: Sophisticated styling with curated color cards and smooth scrolling transitions.
- **Zero-Server Dynamic Persistence**: Powered by an advanced client-side database layer utilizing `localStorage`. This allows Akash's dynamic portfolio to perform full CRUD operations (add, edit, delete projects) and receive visitor messages—persisting all edits permanently across reloads with **no backend servers or API configuration required!**
- **Guarded Admin Control Center**: A secure login interface featuring metrics widgets, visitor message inbox views, and simple project manager forms.
- **Validations & Custom Loaders**: Beautiful typewriters, progress tracking scroll indicators, complete form validation, and clean entry loading screens.

---

## 🚀 Quick Setup & Startup

The entire portfolio operates out of a single lightweight React folder.

1. Open your terminal and navigate to the client folder:
   ```bash
   cd portfolio/client
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Boot up the Vite development server:
   ```bash
   npm run dev
   ```
4. Open the browser and visit: `http://localhost:5173`

---

## 🔐 Administrative Access Gate

- **Admin Portal**: Click on **Portal** in the header navigation or visit `/login` directly.
- **Default Username**: `admin`
- **Default Password**: `admin123`

Log in to view visitor email messages, manage project cards, and explore the database metrics!

---

## ☁️ Zero-Cost Static Deployment

Because this portfolio is 100% serverless, you can deploy it for free in seconds!
1. Build production assets:
   ```bash
   npm run build
   ```
2. Deploy the compiled `portfolio/client/dist/` output folder straight to static hosting providers:
   - **Vercel** (Connect your GitHub repo or drag-and-drop the `dist` folder).
   - **Netlify**.
   - **GitHub Pages**.
