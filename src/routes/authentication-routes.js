import store from "./../store/index.js";
import system from "./../services/systemLogs.js";

export default function authenticationRoutes(app) {
  app.post('/register', (req, res) => {
    const { user } = req.body;

    if (!user?.userId) {
      system.log('Error: userId not available');
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
      system.log(`Success: ${user.userId} registered`);
    } else {
      system.log(`Error: Username ${user.userId} already exists.`);
      res.status(400).json({
        data: `Error: Username ${user.userId} already exists.`,
        type: 'error',
      });
    }
  });

  app.post('/login', (req, res) => {
    const { user } = req.body;
    console.log(user);
    if (!user?.userId) {
      system.log('Error: userId not available');
      res.status(400).json({
        data: 'Either username or password is incorrect',
        type: 'error',
      });
    }

    let currentUser = store.get(user.userId);
    console.log(currentUser);

    if (!currentUser) {
      system.log(`Error: ${user.userId} not available`);
      res.status(400).json({
        data: 'Either username or password is incorrect',
        type: 'error',
      });
    }

    currentUser = JSON.parse(currentUser);

    if (currentUser.password === user.password) {
      req.session.isAuth = true;
      res.status(200).json({
        data: currentUser,
        isAuth: true,
        type: 'success',
      });
      system.log(`Success: ${user.userId} logged In.`);
    } else {
      system.log(`Error: ${user.userId} password is incorrect.`);
      req.session.isAuth = false;
      res.status(200).json({
        data: 'Either username or password is incorrect',
        isAuth: false,
        type: 'error',
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
    system.log(`Success: user logged out.`);
  });
}