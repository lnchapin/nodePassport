require('dotenv').config()
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const flash = require('connect-flash');
const session = require('express-session')
const passport = require('passport')
require('./config/passport')(passport)
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(session({
  secret:process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use((req, res, next) => {
  res.locals.success_message = req.flash('success_message');
  res.locals.error_message = req.flash('error_message');
  res.locals.error = req.flash('error');
  next();
})


app.use('/', require("./routes/htmlRoutes"))
app.use('/api', require("./routes/apiRoutes"))

app.listen(PORT, console.log(`listening on ${PORT}`));
