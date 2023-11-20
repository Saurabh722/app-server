const system = {
    log: async function(log) {
        try {
            const response = await fetch('http://localhost:5004/log', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ log })
            });
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', 'Warning: System log server is not working.');
        }
    },

    getLogs: async function () {
        try {
            const response = await fetch('http://localhost:5004/get-logs', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            const resJson = await response.json();
    
            if (resJson) {
                return resJson;
            } else {
                console.log("Some thing went wrong on fetching data from system-logs");
            }
        } catch (e) {
            console.log(e);
        }
    }
};

export default system;