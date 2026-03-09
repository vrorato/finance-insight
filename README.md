# NeonGrid Finance Agent

![NeonGrid Dashboard Mockup](https://raw.githubusercontent.com/vrorato/finance-insight/main/src/assets/preview.png)

NeonGrid is a premium, AI-powered financial analysis dashboard designed to categorize and visualize your bank transactions with a state-of-the-art aesthetic. Built with React, Vite, and Tailwind CSS.

## ✨ Features

-   **Premium UI/UX**: A stunning "NeonGrid" aesthetic with glassmorphism, smooth animations, and a high-end feel.
-   **Theme Support**: Seamlessly toggle between a vibrant Light Mode and the signature Neon Dark Mode.
-   **AI categorization**: Upload your bank CSV files and let our integrated n8n workflow process and categorize transactions automatically.
-   **Real-time Analytics**: High-level summary of Transactions, Debits, Credits, and Final Balance.
-   **Categorized Spending**: Visual breakdown of expenses across different categories.
-   **Transaction History**: A clean, searchable table of your recent financial activity.

## 🛠️ Tech Stack

-   **Framework**: [React](https://reactjs.org/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Animations**: Built-in CSS transitions & Tailwind animations
-   **Automation**: [n8n](https://n8n.io/) (via Webhook integration)

## 🚀 Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone git@github.com:vrorato/finance-insight.git
    cd finance-agent
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Build for production:
    ```bash
    npm run build
    ```

## 📁 Project Structure

-   `src/components`: Reusable UI components (Layout, ThemeToggle, etc.)
-   `src/pages`: Main application views (Auth, Upload, Dashboard)
-   `src/lib`: Utility functions and helpers
-   `src/assets`: Static assets and styling tokens
-   `index.css`: Global styles and theme variable definitions

## 🤖 n8n Integration

The project communicates with an n8n webhook to process financial data. Ensure your environment is configured to point to the correct endpoint in `src/pages/upload.tsx`.

## 📄 License

This project is private. All rights reserved.
