const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
const axios = require("axios");
const router = express.Router();

// Route to display user's repositories
router.get("/list", authenticateToken, async (req, res) => {
  const user = req.user;
  try {
    const repos = await axios.get(
      "https://api.github.com/user/repos?per_page=100",
      {
        headers: {
          Authorization: `token ${user.accessToken}`,
        },
      },
    );

    res.status(200).json({
      user: user,
      repositories: repos.data,
    });
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return res.sendStatus(500);
  }
});

module.exports = router;
