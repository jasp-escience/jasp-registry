const express = require("express");
const session = require("express-session");
// const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const path = require("path");
const passport = require("passport");
const authRoutes = require("./routes/authRoutes");
const repositoryRoutes = require("./routes/repositoryRoutes");
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from a .env file
require("./config/passport"); // Import the Passport configuration

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public/dist")));

// // Enable CORS with credentials. needed for session handling in development mode.
// app.use(
//   cors({
//     origin: "http://localhost:5173", // Allow requests from Vite's dev server
//     credentials: true, // Allow cookies and credentials to be sent
//   }),
// );

// Session configuration
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Set to true if you're using HTTPS in production
      sameSite: "strict", // Ensures cookies are sent on cross-origin requests
    },
  }),
);

// Initialize Passport and session handling
app.use(passport.initialize());
app.use(passport.session());

// API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/repositories", repositoryRoutes);

// Catch-all route to serve the Vue app's index.html file
// This allows Vue Router to handle any client-side routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/dist/index.html"));
});

// Serve Vue frontend or other routes here

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
