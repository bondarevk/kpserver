const authController = require('./controllers/auth');

const authService = require('./services/auth');
const validationService = require('./services/validation');

module.exports = function(app) {
  app.use(authService.auth);

  app.post('/getemail', authService.requireSignIn, (req, res) => {
    res.send({ email: req.auth.user.email });
  });

  app.post('/signin',
    validationService.params(['username', 'password']),
    authController.signIn);
  app.post('/signup',
    validationService.params(['username', 'email', 'password']),
    authService.requireAnon,
    authController.signUp);

};