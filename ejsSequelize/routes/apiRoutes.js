const express = require('express');
const router = express.Router();
const db = require('../models');
const Users = db.User;
const Posts = db.Posts;
const bcrypt = require('bcrypt')

router.post('/signup', function(req, res) {
  const { name, email, password, password2 } = req.body;
  let errors =[]
  if (!name || !email || !password || !password2 ) {
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
      name,
      email,
      password,
      password2
    })
  } else{
    Users.findOne({
      where: {
        email: email
      }
    }).then(function(dbUsers) {
      if (dbUsers) {
        errors.push({ message: 'Email already exists please log in'})
        res.render('login', {
          errors,
          email
        })
      } else {
        res.send('new peep')
      }
    });
  }
})

module.exports = router;
