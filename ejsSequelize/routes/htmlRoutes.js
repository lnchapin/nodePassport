const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')

router.get('/', function(req, res){
  res.render('index')
})

router.get('/login', function(req, res){
  res.render('login')
})

router.get('/signup', function(req, res){
  res.render('signup')
})

router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);


router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_message', 'You are logged out');
  res.redirect('/login');
});



module.exports = router;
