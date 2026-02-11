import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

type Props = {
    children: ReactNode;
}

export function AppProviders({ children }: Props) {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>

                {children}
                <ToastContainer />
            </BrowserRouter>
        </QueryClientProvider>
    );
}