import fetchBalanceSheet from "./../services/fetchBalanceSheet.js";
import store from "./../store/index.js";
import system from "./../services/systemLogs.js";

export default function balanceSheetRoutes(app) {
    app.post('/balance-sheet', async (req, res) => {
        const { userId } = req.body;

        if (!userId) {
            res.status(400).json({
                data: "Bad Request",
                type: 'error',
            });
        }

        let currentUser = store.get(userId);

        if (!currentUser) {
            res.status(400).json({
                data: "Bad Request",
                type: 'error',
            });
        }
        const response = await fetchBalanceSheet(req.body);
        res.status(200).json({
            data: response,
            isAuth: true,
            type: 'success',
        });
    });
};