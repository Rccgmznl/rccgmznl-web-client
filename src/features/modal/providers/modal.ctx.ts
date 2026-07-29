import { createContext, useContext } from 'react';
import type { ModalContextInterface } from '../types';

/**
 * Provides global modal controls to the application.
 *
 * The default value is intentionally undefined so that using the
 * context outside of ModalProvider produces a clear runtime error.
 */
export const ModalContext = createContext<ModalContextInterface | undefined>(
    undefined
);

/**
 * Returns the global modal controls.
 *
 * @throws {Error} When used outside of ModalProvider.
 */
export function useModalContext(): ModalContextInterface {
    const context = useContext(ModalContext);

    if (context === undefined) {
        throw new Error('useModalContext must be used within a ModalProvider.');
    }

    return context;
}
