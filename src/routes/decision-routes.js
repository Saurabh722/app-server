import fetchLoanDecision from "./../services/fetchLoanDecision.js";
import store from "./../store/index.js";

export default function decisionRoutes(app) {
    app.post('/get-decision', async (req, res) => {
        const { businessDetails } = req.body;
        console.log('userId', businessDetails.userId);

        if (!businessDetails.userId) {
            res.status(400).json({
                data: "Bad Request",
                type: 'error',
            });
        }

        let currentUser = store.get(businessDetails.userId);

        if (!currentUser) {
            res.status(400).json({
                data: "Bad Request",
                type: 'error',
            });
        }
        const response = await fetchLoanDecision(req.body);
        res.status(200).json({
            ...response,
            isAuth: true
        });
    });
}