[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-^5.0-purple?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![i18next](https://img.shields.io/badge/i18next-23-blue.svg)](https://www.i18next.com/)

# Social Support Application Wizard

A modern, responsive, and accessible 3-step wizard for a social support application. This project showcases a seamless user experience with features like internationalization, AI-powered writing assistance, and smooth UI transitions.

**[➡️ Live Demo (Placeholder)](#)**

---

<!-- Placeholder for a GIF of the application in action -->
![Application Demo GIF](https://via.placeholder.com/800x450.png/000000/FFFFFF?text=App+Demo+GIF)

## Overview

This project is a frontend implementation of a 3-step wizard designed to guide users through a social support application process. It is built with a modern tech stack and focuses on providing a high-quality user experience.

## ✨ Features

-   **Responsive 3-Step Wizard**: A clean and intuitive multi-step form that works beautifully on all screen sizes.
-   **Internationalization (i18n)**: Full support for English (LTR) and Arabic (RTL) with a smooth, animated language toggle.
-   **AI Writing Assistance**: Integrates with the OpenAI API (`gpt-3.5-turbo`) in Step 3 to help users draft their personal statements.
-   **Robust Form Handling**: Built with `react-hook-form` for efficient and scalable form state management and validation.
-   **Smooth Transitions**: Custom circular reveal animation for language switching and fluid step transitions.
-   **Loading & Error States**: Includes a loading screen for initial language setup and a robust Error Boundary to gracefully handle runtime errors.
-   **Accessibility Focused**: Implemented with ARIA roles, keyboard-focusable controls, and proper content directionality (`dir`) for a more inclusive experience.

## 🛠️ Tech Stack

-   **Framework**: React
-   **Build Tool**: Vite
-   **Styling**: Tailwind CSS
-   **Internationalization**: i18next / react-i18next
-   **Form Management**: React Hook Form
-   **Animations**: Custom hooks for UI transitions.
-   **API**: OpenAI Chat Completions API

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Node.js (v18.x or later recommended)
-   npm or yarn

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/salmanhadli/social-support-frontend.git
    cd social-support-frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    -   Copy the example `.env.example` file to a new `.env` file in the root of the project.
        ```bash
        cp .env.example .env
        ```
    -   Open the `.env` file and add your OpenAI API key.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or the next available port).

## 🔑 Environment Variables

To use the AI writing assistance feature, you need to provide an OpenAI API key.

-   `VITE_OPENAI_API_KEY`: Your secret API key from OpenAI.

You can obtain a key from the OpenAI Platform. The application reads this key from `import.meta.env.VITE_OPENAI_API_KEY` and uses it to make requests to the Chat Completions endpoint with the `gpt-3.5-turbo` model.

## 📈 Future Improvements

-   **Testing**: Add a comprehensive test suite using Jest and React Testing Library to cover component rendering, form logic, and API interactions.
-   **State Management**: For more complex scenarios, integrate a dedicated state management library like Zustand or Redux Toolkit.
-   **Backend Integration**: Implement a proper backend service to handle form submissions securely.
-   **Enhanced Validation**: Add more robust, schema-based validation (e.g., with Zod).
-   **File Uploads**: Add functionality for users to upload supporting documents.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

