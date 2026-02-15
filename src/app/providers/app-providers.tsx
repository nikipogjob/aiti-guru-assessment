import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { ReactNode } from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

type Props = {
    children: ReactNode;
}

const Router = import.meta.env.PROD ? HashRouter : BrowserRouter;

export function AppProviders({ children }: Props) {
    return (
        <QueryClientProvider client={queryClient}>
            <Router basename={import.meta.env.BASE_URL}>
                {children}
                <ToastContainer />
                <ReactQueryDevtools initialIsOpen={false} />
            </Router>

        </QueryClientProvider>
    );
}