const express = require("express");
const exphbs = require("express-handlebars");
const _handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

const bodyparser = require("body-parser");
const path = require("path");

const db = require("./config/database");
db.authenticate()
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Error: " + err));

const app = express();

//Handelbars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(_handlebars),
  })
);
app.set("view engine", "handlebars");

//set static folder
app.use(express.static(path.join(__dirname, "public")));

// Body Parser
app.use(bodyparser.urlencoded({ extended: false }));

app.use("/gigs", require("./routes/gigs"));

app.get("/", (req, res) => res.render("index", { layout: "landing" }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is started at ${PORT}`));
