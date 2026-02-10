import { useEffect } from 'react';
import { useAuthStore } from '../../features/auth/model/auth-store';

export function AuthBootstrap() {
    const initFromStorage = useAuthStore((store) => store.initFromStorage);

    useEffect(() => {
        initFromStorage();
    }, [initFromStorage]);

    return null;
}