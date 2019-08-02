module.exports ={
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next
    }
    req.flash('error_message', 'Please log in to access this page')
    res.redirect('/login')
  }
}
