import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { ENV } from './config/env';
import Root from './root';

import './styles/index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error(
        'Root element missing. Cannot initialize React application.'
    );
}

createRoot(rootElement).render(
    ENV.ENABLE_STRICT_MODE ? (
        <StrictMode>
            <Root />
        </StrictMode>
    ) : (
        <Root />
    )
);
