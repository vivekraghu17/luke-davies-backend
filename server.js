const express = require("express");
require("./utils/connectDB");
const app = express();
const bodyParser = require("body-parser");
const logger = require("morgan");
const swaggerDocs = require("./utils/swagger");
const houseRoutes = require("./routes/houseRoutes");
const bedroomRoutes = require("./routes/bedroomRoutes");
const userRoutes = require("./routes/userRoutes");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use("/api/user", userRoutes);
app.use("/api/house", houseRoutes);
app.use("/api/bedroom", bedroomRoutes);
app.get("/api/ping", (req, res) => {
  res.send("I am backend working fine 🙂");
});

app.listen(8000, function (err) {
  if (err) console.log(err);
  console.log(`App started at 8000`);
  swaggerDocs(app, 8000);
});
