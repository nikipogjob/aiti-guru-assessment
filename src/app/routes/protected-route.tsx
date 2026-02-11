import type { ReactNode } from 'react';
import { useAuthStore } from '../../features/auth/model/auth-store';
import { Navigate } from 'react-router-dom';

type Props = {
    children: ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
    const token = useAuthStore((state) => state.token);

    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return children;
}