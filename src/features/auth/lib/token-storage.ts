const LS_KEY = 'auth_token';

export type StorageMode = 'persist' | 'session';

function getStorage(mode: StorageMode) {
    return mode === 'persist' ? localStorage : sessionStorage;
}

export function readToken(): string | null {
    return localStorage.getItem(LS_KEY) ?? sessionStorage.getItem(LS_KEY);
}

export function saveToken(token: string, mode: StorageMode) {
    getStorage(mode).setItem(LS_KEY, token);

    getStorage(mode === 'persist' ? 'session' : 'persist').removeItem(LS_KEY);

}

export function clearToken() {
    localStorage.removeItem(LS_KEY);
    sessionStorage.removeItem(LS_KEY);
}
