# App Routing & Feature Routes

This module manages routing across the application using **React Router**. 

To keep the codebase modular, routes are **decentralized**: each feature or domain exports its own route configuration, which is then imported and merged into the root router.

---

## Quick Setup

### 1. Install
```bash
npm install react-router react-router-dom

```

---

## Architecture & Concept

Instead of declaring every route in one giant file, features define their own sub-routes and export them as standard React Router route objects or arrays.

```text
src/
├── features/
│   ├── auth/
│   │   └── routes.jsx        <-- Auth exports its own routes
│   └── dashboard/
│       └── routes.jsx        <-- Dashboard exports its own routes
└── router/
    ├── index.jsx             <-- Root router (merges feature routes)
    └── README.md

```

---

## How It Works

### Step 1: Feature Exposes Its Routes (`features/auth/routes.jsx`)

Each feature defines its own route objects:

```jsx
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

export const authRoutes = [
  {
    path: '/login',
    element: <LoginPage/>,
  },
  {
    path: '/register',
    element: <RegisterPage/>,
  },
];

```

### Step 2: Root Router Combines Them (`router/index.jsx`)

Import all feature routes, combine them into a single tree, and create the router instance:

```jsx
import { createBrowserRouter } from 'react-router-dom';
import { authRoutes } from '../features/auth/routes';
import { dashboardRoutes } from '../features/dashboard/routes';

export const router = createBrowserRouter([
  ...authRoutes,
  ...dashboardRoutes,
  // Fallback / Catch-all route
  {
    path: '*',
    element: <div>Page Not Found</div>,
  },
]);

```

### Step 3: Provide to the App (`main.jsx` / `App.jsx`)

Pass the exported `router` instance to `RouterProvider`:

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router="{router}"/>
  </React.StrictMode>
);

```

---

## Adding a New Feature Route

1. Create a `routes.jsx` file inside your feature folder.
2. Export an array of route objects (or a single parent route object with `children`).
3. Import and spread it into `router/index.jsx`.
