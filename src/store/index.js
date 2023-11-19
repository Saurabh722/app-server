import { LocalStorage } from "node-localstorage";

if ( !global.localStorage ) {
    global.localStorage = new LocalStorage('./data/DB');
}

const store = {
    get: (key) => {
        return JSON.parse(localStorage.getItem(key));
    },
    set: (key, value) => {
        if (!store.get(key)) {
            localStorage.setItem(key, JSON.stringify(value));
        } else {
            return new Error(`Error: User with userId: ${key} already exists.`);
        }
        
        return store.get(key);
    },
    remove: (key) => {
        const item = JSON.parse(localStorage.removeItem(key));
        return item;
    },
    key: (key) => localStorage.key(key),
    clear: () => {
        localStorage.clear();
        return true;
    },
    count: () => localStorage.length
};

export default store;
