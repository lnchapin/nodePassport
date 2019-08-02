require('dotenv').config()
const express = require('express');
const router = express.Router();
const db = require('../models');
const Users = db.User;
const Posts = db.Posts;
const bcrypt = require('bcryptjs');
const passport = require('passport')

router.post('/signup', (req, res) => {
  let { fName, lName, email, password, password2 } = req.body;

  console.log(req.body);

  let errors =[]
  if (!fName || !lName || !email || !password || !password2 ) {
    errors.push({ message: 'Please fill in all fields'})
  }
  if (password !== password2){
    errors.push({ message: 'Passwords do not match'})
  }
  if (password.length < 6){
    errors.push({ message: 'Password needs to be at least 6 characters long '})
  }
  if (errors.length > 0) {
    res.render('signup', {
      errors,
      fName,
      lName,
      email,
      password,
      password2
    })
  } else{
    Users.findOne({
      where: {
        email: email
      }
    }).then((dbUsers) => {
      if (dbUsers) {
        errors.push({ message: 'Email already exists please log in'})
        res.render('login', {
          errors,
          email
        })
      } else {
        console.log(typeof process.env.SALT_VAL);
        bcrypt.genSalt(parseInt(process.env.SALT_VAL), function(err, salt) {
          bcrypt.hash(password, salt, function(err, hash){
            if(err) throw err;
            password = hash
            console.log("password", password);
            Users.create({
                firstName: req.body.fName,
                lastName: req.body.lName,
                email: req.body.email,
                password: password
              })
                // pass the result of our call
                .then(function(dbUser) {
                    // log the result to our terminal/bash window
                    console.log(dbUser);
                    // redirect
                    req.flash('success_message', 'You are now signed up and can log in')
                    res.redirect("/login");
                  })
                  .catch(err => console.log(err));
          })
        })
      }
    });
  }
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_message', 'You are logged out');
  res.redirect('/login');
});

module.exports = router;
