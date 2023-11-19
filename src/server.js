import express from 'express';
import session from 'express-session';
import cors from 'cors';

import config from "./config.js";
import balanceSheetRoutes from "./routes/balance-sheet-routes.js";
import decisionRoutes from './routes/decision-routes.js';
import authenticationRoutes from './routes/authentication-routes.js';

const app = express();

app.use(cors(config.corsOptions));

app.use(session({
  secret: config.KEY,
  resave: true,
  saveUninitialized: false,
  cookie: {
    expires: 600000
  }
}));

app.use(express.json());

authenticationRoutes(app);

balanceSheetRoutes(app);

decisionRoutes(app);

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});