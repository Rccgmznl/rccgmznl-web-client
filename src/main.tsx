import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { ENV } from './config/env';

import './styles/index.css';
import { RouterProvider } from 'react-router';
import router from '@router';

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error(
        'Root element missing. Cannot initialize React application.'
    );
}

createRoot(rootElement).render(
    ENV.ENABLE_STRICT_MODE ? (
        <StrictMode>
            <RouterProvider router={router} />
        </StrictMode>
    ) : (
        <RouterProvider router={router} />
    )
);
