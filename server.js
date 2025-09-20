const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
// require("dotenv").config({ path: "./app/config/.env" });
require("dotenv").config();
const { checkUser, requireAuth } = require("./app/middleware/authmiddleware");
const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);
// parse requests of content-type - application/json
app.use(express.json());
app.use(cookieParser());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React app build directory
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send("" + res.locals.user.id);
});

app.get("*", checkUser);

const db = require("./app/models");
const Role = db.role;

// app.get("/", (req, res) => {
//   res.json({ message: "Welcome " });
// });
db.sequelize.sync();
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/jeu.routes")(app);
require("./app/routes/tournoi.routes")(app);
require("./app/routes/bracket.routes")(app);

// Handle React routing, return all requests to React app
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
