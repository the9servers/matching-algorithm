const express = require("express");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");

const app = express();

//Middleware
app.use(morgan('dev'));
app.use(authRoutes);
app.use(express.json());

const port = 3000 || 8080;

//Server connection
app.listen(port, () => {
  console.log("App listening on port 3000");
})