const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const app = express();

//DB config
const db = require("./config/keys").MongoURI;

//Connect to mongo

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));
// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

//Bodyparser
app.use(express.urlencoded({ extended: false }));

//Express Sassion middleware
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
    // cookie: { secure: true }
  })
);

//connect flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
  res.locals.success_msg  = req.flash("success_msg ");
  res.locals.err_msg = req.flash("err_msg");
  next();
});

// Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
// app.use("/", require("./routes/index"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
