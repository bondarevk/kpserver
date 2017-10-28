
exports.params = (params) => (req, res, next) => {
  if (params.every((el) => {
      if (!req.body[el]) {
        res.status(422).send({error: 'Отсутствуют обязательные параметры.'});
        return false;
      }
      return true;
    })) {
    next();
  }

};