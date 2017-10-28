const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  req.auth = {
    isAuthenticated: false
  };

  if (req.headers.authorization) {
    jwt.verify(req.headers.authorization, 'whoop', (err, decoded) => {
      if (err) {
        return res.status(401).send({error: 'Неверный токен.'});
      }

      User.findById(decoded.id)
        .then((user) => {
          if (!user) {
            return res.status(401).send({error: 'Неверный токен.'});
          }

          req.auth.user = user;
          req.auth.isAuthenticated = true;

          next();
        })
        .catch((error) => {
          return next(error);
        });
    });
  } else {
    next();
  }
};

exports.requireAnon = function (req, res, next) {
  if (!req.auth.isAuthenticated)
    return next();

  return res.status(403).send({error: 'Вы не должны быть авторизованы.'});
};

exports.requireSignIn = (req, res, next) => {
  if (req.auth.isAuthenticated)
    return next();

  return res.status(403).send({error: 'Вы должны авторизоваться.'});
};