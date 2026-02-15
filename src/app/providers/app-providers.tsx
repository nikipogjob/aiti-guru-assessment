import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { ReactNode } from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

type Props = { children: ReactNode };

export function AppProviders({ children }: Props) {
    const isProd = import.meta.env.PROD;

    const content = (
        <>
            {children}
            <ToastContainer />
            <ReactQueryDevtools initialIsOpen={false} />
        </>
    );

    return (
        <QueryClientProvider client={queryClient}>
            {isProd ? (
                <HashRouter>
                    {content}
                </HashRouter>
            ) : (
                <BrowserRouter basename={import.meta.env.BASE_URL}>
                    {content}
                </BrowserRouter>
            )}
        </QueryClientProvider>
    );
}
