import store from './../store/index.js';

const system = {
    key: 'demyst-app-server-log',
    getLogs: () => {
        return store.get(system.key) || '';
    },
    log: (value) => {
        const date = new Date();
        const dateString = date.toISOString();
        const prevLogs = system.getLogs();
        const updateLogs = `${prevLogs}\n${dateString} : ${value}`;

        store.set(system.key, JSON.stringify(updateLogs));
        
        return system.getLogs();
    },
    clear: () => {
        store.set(system.key, '');
        return true;
    }
};

export default system;
