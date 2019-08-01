const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use('/', require("./routes/htmlRoutes"))
app.use('/api', require("./routes/apiRoutes"))

app.listen(PORT, console.log(`listening on ${PORT}`));
