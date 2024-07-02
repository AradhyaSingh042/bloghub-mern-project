const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

// middlewares
app.use(express.json());
app.use(
  cors({ credentials: true, origin: "https://bloghub-frontend.vercel.app/" })
);
app.use(cookieParser());
app.use(express.static(__dirname + "/uploads"));

// importing the routes
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blog");

// environment configuration
require("dotenv").config();
const PORT = process.env.PORT || 8000;

// mounting routes
app.use("/api/v1", authRoutes);
app.use("/api/v1", blogRoutes);

// connecting to database
const dbConnect = require("./config/database");
dbConnect();

// default route
app.get("/", (req, res) => {
  res.send("<h2>Default Endpoint</h2>");
});

// activating the server
app.listen(PORT, () => {
  console.log(`Server Initiated Successfully at port ${PORT}`);
});
