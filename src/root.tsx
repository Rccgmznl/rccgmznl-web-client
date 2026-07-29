import { Outlet } from 'react-router';
import AuthProvider from '@features/auth';
import ModalProvider from '@features/modal/providers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function Root() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <ModalProvider>
                    <Outlet />
                </ModalProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
}
