# Zorvyn Finance Dashboard 

A sleek, hyper-modern finance dashboard built with a custom **Glassmorphism** design aesthetic. This project was engineered to provide an intuitive, responsive, and beautifully animated interface for tracking transactions, analyzing balance trends, and managing expenditures.

##  Key Features

- **Pioneering Aesthetic**: A fully custom Glassmorphism UI featuring frosted panels, physical light refraction simulations, and vibrant dynamic mesh gradients. 
- **Theming & Accessibility**: Seamless toggle between Light and Dark modes. Both modes physically recalculate the underlying UI shadows and light diffusion automatically.
- **Role-Based Access Control (RBAC)**: Switch instantly between `Viewer` (read-only) and `Admin` (full CRUD access to transactions) safely using the global store.
- **Dynamic Charts**: Integrated **Recharts** for real-time `Balance Trend` area charts and `Expenses by Category` donut charts that react natively to your financial data.
- **Advanced State Management**: Powered by **Zustand** for lighting-fast global state interactions, entirely avoiding messy prop-drilling.
- **Transaction Engine**: Search, filter by Income/Expense, seamlessly add, or safely delete transactions natively.
- **Export Capabilities**: Instantly export your filtered transaction datasets securely as `CSV` or `JSON` formats directly from the client.

##  Tech Stack

- **Core**: [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/) for blazingly fast HMR and optimized builds.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) extended with deep custom CSS variables for our multi-theme frosted glass behavior and animations.
- **State**: [Zustand](https://github.com/pmndrs/zustand)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Visualizations**: [Recharts](https://recharts.org/)

##  Local Quick Start

To spin this up locally and experience the UI yourself:

```bash
# 1. Clone the repository
git clone https://github.com/murali2277/zorvyn-forntend.git
cd zorvyn-frontend

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Visit the displayed local host port (usually `http://localhost:5173`) in your browser!

##  Deployment Guide

Since this is a statically generated Vite application, it drops seamlessly into any modern hosting provider. 

**(Note: If you don't have the CLIs installed on your system globally, we recommend using `npx` so you don't run into "command not found" errors!)**

### Deploy to Vercel (Easiest)
Deploy safely straight from your terminal by bypassing global installs:
```bash
npx vercel
```

### Deploy to Netlify
Alternatively, push it seamlessly to Netlify:
```bash
npx netlify-cli deploy
```

> Or simply connect your GitHub repository directly to Vercel/Netlify's web dashboard for automatic CI/CD deployments!

##  Design Philosophy
We purposefully stripped away rigid, boring flat layouts. Instead, this application relies on physically accurate `backdrop-filter` rendering, intelligent `rgba()` translucency, and radial mesh gradients to ensure the user interface ultimately feels alive, tactile, and deeply layered. 

---
*Developed with precision, human-written design logic, and clean code.*
