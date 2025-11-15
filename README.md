# Task Manager – React + Vite + Tailwind

A simple, modern **Task Manager (Todo app)** built with **React**, **Vite**, **Tailwind CSS**, and **Axios**.  
It connects to a backend API to create, read, update, and delete tasks.

---

## Features

- ✅ Add new tasks
- ✏️ Edit existing tasks (inline editing)
- ☑️ Mark tasks as completed / incomplete
- 🗑️ Delete tasks
- 📋 Empty-state message when there are no tasks
- 🎨 Clean, responsive UI built with Tailwind CSS
- 🌐 API integration via Axios
- 🔧 Environment-based API URL via Vite (`VITE_API_URL`)

---

## Tech Stack

- **Frontend Framework:** React (with Vite)
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Icons:** `react-icons`
- **Build Tool:** Vite

---

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd <your-project-folder>
```

### 2. Install dependencies

```bash
npm install
# or
yarn
# or
pnpm install
```

### 3. Configure environment variables

Create a `.env` file in the project root (same level as `vite.config.*`):

```bash
VITE_API_URL=http://localhost:5000
```

Adjust the URL to point to your backend server.  
The frontend expects the following endpoints to exist:

- `GET  {VITE_API_URL}/api/todos` – Get all todos
- `POST {VITE_API_URL}/api/todos` – Create a new todo  
  Request body: `{ "text": "Task text" }`
- `PATCH {VITE_API_URL}/api/todos/:id` – Update a todo  
  Request body (examples):  
  - `{ "text": "Updated text" }`  
  - `{ "completed": true }`
- `DELETE {VITE_API_URL}/api/todos/:id` – Delete a todo

Each todo item is expected to have at least:

```ts
{
  _id: string;
  text: string;
  completed: boolean;
}
```

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Vite will show a local URL, usually:

```bash
http://localhost:5173
```

Open that in your browser.

---

## Project Structure (Frontend)

Key files in this frontend:

```text
src/
├─ App.jsx        # Main Task Manager component (UI + logic)
├─ main.jsx       # React entry point (StrictMode + App)
├─ index.css      # Tailwind CSS import + global styles
└─ ...
```

### `App.jsx`

- Manages the following React state:
  - `newTodo` – text for the new task
  - `todos` – array of task objects from the API
  - `editingTodo` – currently edited task `_id`
  - `editedText` – text being edited
- Uses `useEffect` to load tasks on initial render (`fetchTodos()`).
- Uses Axios to call the backend:
  - `addTodo` – `POST /api/todos`
  - `fetchTodos` – `GET /api/todos`
  - `saveEdit` – `PATCH /api/todos/:id` (update text)
  - `toggleTodo` – `PATCH /api/todos/:id` (toggle `completed`)
  - `deleteTodo` – `DELETE /api/todos/:id`
- Uses icons from `react-icons` for a better UX.

### `index.css`

```css
@import "tailwindcss";
```

Tailwind is imported globally. Make sure Tailwind is configured (see below).

### `main.jsx`

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

---

## Tailwind CSS Setup (if not already configured)

If Tailwind is not yet set up, follow these steps inside your Vite + React project:

1. Install Tailwind and its peers:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

2. In `tailwind.config.js`, set the content paths:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

3. Ensure `index.css` imports Tailwind correctly (you are using the new import style):

```css
@import "tailwindcss";
```

If you use the classic directives instead, it would be:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## Available Scripts

In `package.json`, you’ll typically have:

```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build locally
npm run lint      # Run ESLint (if configured)
```

---

## Customization Ideas

- Add **filters**: All / Active / Completed
- Add **due dates** or **priorities**
- Add **pagination** or **search**
- Connect to **authentication** to support multiple users
- Add **notifications** when operations fail (instead of `console.log`)

---

## License

You can use, modify, and extend this Task Manager frontend as needed for your own projects.
