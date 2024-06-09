export function readLocalStorage(key) {
    
    if (typeof window !== "undefined" && window.localStorage) {
        if(key == 'token') return sessionStorage.getItem(key);
        return localStorage.getItem(key);
    }   
    return;
};

export function saveLocalStorage(key, value) {
    
    if (typeof window !== "undefined" && window.localStorage) {
        if(key == 'token') return sessionStorage.setItem(key, value);
        localStorage.setItem(key, value);
    }   
};

export function clearLocalStorage() {
    
    if (typeof window !== "undefined" && window.localStorage) {
        sessionStorage.clear();
        localStorage.clear();
    }   
};
