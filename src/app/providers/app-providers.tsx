import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthBootstrap } from './auth-bootstrap';

const queryClient = new QueryClient();

type Props = {
    children: ReactNode;
}

export function AppProviders({ children }: Props) {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AuthBootstrap />
                {children}
                <ToastContainer />
            </BrowserRouter>
        </QueryClientProvider>
    );
}