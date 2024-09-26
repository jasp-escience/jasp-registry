const express = require("express");
const passport = require("passport");
const authenticateToken = require("../middleware/authenticateToken");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Route to start GitHub login
router.get("/check", authenticateToken, (req, res) => {
  res.status(200).json({ username: req.user.username });
});

// GitHub login route
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
);

// GitHub callback route
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    const user = req.user; // User object from GitHub profile

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, accessToken: user.accessToken },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    // Set JWT in HttpOnly cookie
    res.cookie("token", token, { httpOnly: true, secure: false }); // Use secure: true in production with HTTPS
    res.redirect("/dashboard"); // Redirect to frontend after login
  },
);

// Logout route
// router.get("/logout", authController.logout);

module.exports = router;
