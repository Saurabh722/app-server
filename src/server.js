import express from 'express';
import session from 'express-session';
import cors from 'cors';

import store from "./store/index.js";

import fetchBalanceSheet from "./services/fetchBalanceSheet.js";
import fetchLoanDecision from "./services/fetchLoanDecision.js";

let corsOptions = { 
  origin : ['http://localhost:3000']
}

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors(corsOptions));

const KEY = 'adfwegqriqwr2r4514413455rsafda';
app.use(session({
  secret: KEY,
  resave: true,
  saveUninitialized: false,
  cookie: {
    expires: 600000
  }
}));

app.use( express.json() );

app.post('/register', (req, res) => {
  const { user } = req.body;
  console.log(user);
  if ( !user?.userId ) {
    res.status(400).json({
      data: "Bad Request",
      type: 'error',
    });
  }

  if (!store.get(user.userId)) {
    req.session.isAuth = true;
    store.set(user.userId, JSON.stringify(user));
    res.status(200).json({
      data: JSON.parse(store.get(user.userId)),
      isAuth: true,
      type: 'success',
    });
  } else {
    res.status(400).json({
      data: `Error: Username ${user.userId} already exists.`,
      type: 'error',
    });
  }
});

app.post('/login', (req, res) => {
  const { user } = req.body;
  console.log(user);
  if ( !user?.userId) {
    res.status(400).json({
      data: "Bad Request",
      type: 'error',
    });
  }

  let currentUser = store.get(user.userId);

  if (!currentUser) {
    res.status(400).json({
      data: "Bad Request",
      type: 'error',
    });
  }

  currentUser = JSON.parse(currentUser);
console.log('currentUser', currentUser);
  if ( currentUser.password === user.password ) {
    req.session.isAuth = true;
    res.status(200).json({
      data: currentUser,
      isAuth: true,
      type: 'success',
    });
  }
});
  
app.get('/logout', (req, res) => {
  req.session.isAuth = false;
  res.status(200).json({
    data: req.session,
    isAuth: false,
    type: 'success',
  });
});

app.post('/balance-sheet', async (req, res) => {
  const { userId } = req.body;

  if ( !userId) {
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

app.post('/get-decision', async (req, res) => {
  const { businessDetails } = req.body;
  console.log('userId', businessDetails.userId);

  if ( !businessDetails.userId) {
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});