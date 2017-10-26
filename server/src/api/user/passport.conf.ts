var LocalStrategy = require('passport-local').Strategy;

import UsersModel from './user.model';

function local(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        UsersModel.findById(id, function (err, user) {
          done(err, user);
        });
      });

    console.log(passport)

    passport.use(new LocalStrategy({
        usernameField: 'userName'
    }, (username, password, done) => {
        UsersModel.findOne({ userName: username }, (err, user: any) => {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, { message: '用户不存在' });
            }

            if (!user.validPassword(password)) {
                return done(null, false, { message: '密码错误!' });
            }

            return done(null, user);
        })
    }))
}


module.exports = local;
