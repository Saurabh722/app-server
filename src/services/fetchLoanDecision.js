async function fetchLoanDecision(data) {
    try {
        const response = await fetch('http://localhost:5003/get-decision', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const resJson = await response.json();

        console.log(resJson);

        if (resJson) {
            return resJson;
        } else {
            console.log("Some thing went wrong.");
        }
    } catch (e) {
        console.log(e);
    }
}

export default fetchLoanDecision;
