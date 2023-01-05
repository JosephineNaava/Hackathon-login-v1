if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const http = require("http");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");

const initializePassport = require("./passport-config");
initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);
const users = [];

app.use(express.json());
// app.use(express.urlencoded({ extended: true })); //middleware to show info is coming from an html file
// app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

// AUTHENTICATION;
app.get(
  "http://127.0.0.1:5501/login_page/index.html",
  checkAuthenticated,
  (req, res) => {
    res.render("index.ejs", { name: req.user.name });
  }
);
app.get(
  "http://127.0.0.1:5501/login_page/index.html",
  checkNotAuthenticated,
  (req, res) => {
    res.render("login.ejs");
  }
);
app.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);
app.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register.ejs");
});

// DEFAULT ROUTES
app.get("/register", checkAuthenticated, async (req, res) => {
  try {
    const hashedpassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    res.redirect("/login");
  } catch {
    res.redirect("/register");
  }
  console.log(res);
  res.send("hey hacthon winners");
});

app.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

app.listen(3000);

// // post route
app.post("/", function (req, res) {
  console.log(req.body);
  const user = {
    name: req.body.name,
    age: req.body.age,
  };
});

//   res.status(200).json({
//     status: "success",
//     message: "user created successfully",
//     data: {
//       user,
//     },
//   });
// });

const server = http.createServer(app);

// server
const port = 3000;
server.listen(port, () => {
  console.log(`App listening/running at http://localhost:${port}`);
});
