const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');
const Users = db.User;
const Posts = db.Posts;
const bcrypt = require('bcryptjs');

module.exports = function(passport){
  passport.use(
    new LocalStrategy({usernameField: 'email'}, (email, password, done)=>{
      Users.findOne({
        where: {
          email: email
        }
      }).then(function(user) {
        // console.log('in passport.js: ',user);
        if(!user){
          return done(null, false, {message: 'Email or password incorrect'});
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if(err) throw err;
          if(isMatch){
            return done(null, user)
          } else {
            return done(null, false, { message: 'Email or password incorrect' })
          }
        })

      }).catch(err => console.log(err))
    })
  )

  passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
      Users.findByPk(id).then(function (user) {
          if (user) {
              done(null, user.get());
          }
          else {
              done(user.errors, null);
          }
      });
  });
}
