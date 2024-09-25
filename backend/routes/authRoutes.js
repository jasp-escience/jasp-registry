const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

// Route to start GitHub login
router.get("/github", authController.githubLogin);

// GitHub callback route
router.get("/github/callback", authController.githubCallback);

// Logout route
router.get("/logout", authController.logout);

module.exports = router;
