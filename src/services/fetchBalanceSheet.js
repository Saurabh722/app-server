import system from "../system/index.js";

async function fetchBalanceSheet(data) {
    try {
        system.log(`balance-sheet Request: ${data}`);

        const response = await fetch('http://localhost:5002/balance-sheet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const resJson = await response.json();

        if (resJson) {
            return resJson;
        } else {
            system.log("Some thing went wrong on fetching data from balance-sheet");
        }
    } catch (e) {
        system.log(e);
    }
}

export default fetchBalanceSheet;