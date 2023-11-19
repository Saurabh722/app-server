async function fetchBalanceSheet(data) {
    try {
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
            console.log("Some thing went wrong.");
        }
    } catch (e) {
        console.log(e);
    }
}

export default fetchBalanceSheet;