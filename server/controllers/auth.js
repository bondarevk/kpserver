const User = require('../models/user');
const jwt = require('jsonwebtoken');

function tokenForUser(user) {
  return jwt.sign({ id: user.id }, 'whoop');
}


exports.signIn = function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({username}, null, {collation: {locale: 'en', strength: 2}})
    .then((user) => {
      if (!user) {
        return res.status(422).send({error: 'Неверный логин.'});
      }
      user.compareLocalPassword(password, (error, result) => {
        if (error) {
          return next(error);
        }
        if (!result) {
          return res.status(422).send({error: 'Неверный пароль.'});
        }

        return res.send({token: tokenForUser(user), username: user.username});
      });
    })
    .catch((error) => {
      return next(error);
    });
};

exports.signUp = function(req, res, next) {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const user = new User({ username, email, password });
  user.save()
    .then((user) => {
      res.status(422).send({error: `${user.id}`});
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        if (Object.values(error.errors).length > 0) {
          return res.status(422).send({ error: Object.values(error.errors)[0].message });
        }
        return res.status(422).send({ error: error.message });
      }
      return next(error);
    })
};