import store from "./../store/index.js";

export default function authenticationRoutes(app) {
  app.post('/register', (req, res) => {
    const { user } = req.body;

    if (!user?.userId) {
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
    if (!user?.userId) {
      res.status(400).json({
        data: 'Either username or password is incorrect',
        type: 'error',
      });
    }

    let currentUser = store.get(user.userId);

    if (!currentUser) {
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
    } else {
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
  });
}