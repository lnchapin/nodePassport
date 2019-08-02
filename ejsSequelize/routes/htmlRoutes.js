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

router.get('/dashboard', ensureAuthenticated, function(req, res){
  res.render('dashboard')
})



module.exports = router;
