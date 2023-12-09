export function readLocalStorage(key) {
    
    if (typeof window !== "undefined" && window.localStorage) {
        return localStorage.getItem(key);
    }   
    return;
};

export function saveLocalStorage(key, value) {
    
    if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem(key, value);
    }   
};

export function clearLocalStorage() {
    
    if (typeof window !== "undefined" && window.localStorage) {
        localStorage.clear();
    }   
};
