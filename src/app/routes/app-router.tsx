import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from '../../pages/login/login-page';
import ProductsPage from '../../pages/products/products-page';
import ProtectedRoute from './protected-route';
import { useAuthStore } from '../../features/auth/model/auth-store';

function IndexRedirect() {
    const token = useAuthStore((s) => s.token);
    return <Navigate to={token ? '/products' : '/login'} replace />;
}

export function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<IndexRedirect />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
                path="/products"
                element={
                    <ProtectedRoute>
                        <ProductsPage />
                    </ProtectedRoute>
                } />
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}