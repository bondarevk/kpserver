const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const bcrypt = require('bcrypt');
const ValidationError = mongoose.Error.ValidationError;

const UserSchema = mongoose.Schema({
    username: {
      type: String,
      index: true,
      unique: 'Это имя пользователя уже используется.',
      sparse: true,
      match: [/^[\w]{3,16}$/, 'Имя пользователя не соответствует требованиям']
    },
    email: {
      type: String,
      index: true,
      unique: 'Эта почта уже используется.',
      required: true,
      match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Неверный email. Проверьте правильность указанного адреса.']
    },
    password: {
      type: String
    }
  },
  {
    timestamps: true
  });
UserSchema.plugin(beautifyUnique);

UserSchema.pre('save', function (next) {

  if (this.isModified('password')) {
    if (this.password !== null && !this.password.match(/^[\w@$!,.%*#?&]{6,32}$/)) {
      let error = new ValidationError();
      error.message = 'Пароль не соответствует требованиям.';
      this.invalidate('password', error.message);
      return next(error);
    }
  }

  mongoose.models['User'].findOne({$or:[ {email: this.email}, {username: this.username} ]}, null, {collation: {locale: 'en', strength: 2}})
    .then((user) => {
      if (user) {
        if (user.email.toLowerCase() === this.email.toLowerCase() && this.isModified('email')) {
          let error = new ValidationError();
          error.message = 'Эта почта уже используется.';
          this.invalidate('email', error.message);
          return next(error);
        }

        if (user.username.toLowerCase() === this.username.toLowerCase() && this.isModified('username')) {
          let error = new ValidationError();
          error.message = 'Это имя пользователя уже используется.';
          this.invalidate('username', error.message);
          return next(error);
        }
      }

      if (this.isModified('password')) {
        const saltRounds = 10;
        bcrypt.hash(this.password, saltRounds, (error, hash) => {
          if (error) return next(error);
          this.password = hash;
          next();
        });
      } else {
        next();
      }
    })
    .catch((error) => {
      next(error);
    });
});

UserSchema.methods.compareLocalPassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (error, result) => {
    if (error) {
      return cb(error);
    }
    cb(null, result);
  });
};

module.exports = mongoose.model('User', UserSchema);