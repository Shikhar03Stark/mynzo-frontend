
export const setInLocalStorage = (action, setHook, value) => {
    const str = JSON.stringify(value);
    localStorage.setItem(action, str);
    setHook(value);
}

export const getFromLocalStorage = (action, defaultValue) => {
    const value = localStorage.getItem(action);
    if(value){
        return JSON.parse(value);
    }
    return defaultValue;
}

export const existInLocalStorage = (action) => {
    const value = localStorage.getItem(action);
    if(value) return true;
    return false;
}