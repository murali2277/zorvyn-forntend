# Finance Dashboard

A clean, modern, and modular finance dashboard built with React, Vite, and Tailwind CSS.
The design utilizes a minimalist dark theme with near-black backgrounds (`#0f0f0f`), dark gray cards (`#1a1a1a`), and a rich orange accent (`#ff7a00`).

## Features
- **Dashboard Overview**: Displays total balance, income, expenses via clean metric cards.
- **Data Visualizations**: Includes an Area Chart for balance trends and a Donut Pie Chart for category breakdowns using Recharts.
- **Transactions Management**: Includes filtering (by income/expense), searching by category/description, and deleting entries natively hooked up to global state.
- **Insights Engine**: Auto-calculates your savings rate and highlights top spending categories to generate dynamic recommendations.
- **Role-Based UI**: Switch between "Viewer" and "Admin" mode. Admins have access to deletion tools and "Add Transaction" stubs, while viewers get a purely read-only experience.

## Tech Stack
- React 18
- Vite
- Zustand (State Management)
- Tailwind CSS (Styling)
- Recharts (Data visualization)
- Lucide React (Icons)

## Setup Instructions

1. **Install Dependencies**
   Run the following command to install required packages:
   \`\`\`bash
   npm install
   \`\`\`

2. **Run Development Server**
   Start the Vite dev server:
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Build for Production**
   To create an optimized production build:
   \`\`\`bash
   npm run build
   \`\`\`

## Design Decisions
- **Modularity**: Code is structured into logically separated components (`SummaryCard`, `TransactionTable`, `Insights`, etc.)
- **State Management**: Chosen Zustand for a lightweight, simpler boilerplate compared to Redux, keeping the store highly readable and directly accessible across unconnected components.
- **Styling Method**: Employed Tailwind CSS to rapidly layout components using `grid` and `flex`. Added simple CSS configuration constraints to standardize theme tokens (`textPrimary`, `background`, `card`).
