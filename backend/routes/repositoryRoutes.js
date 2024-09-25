const express = require("express");
const repositoryController = require("../controllers/repositoryController");
const router = express.Router();

// Route to display user's repositories
router.get("/list", repositoryController.displayRepositories);

module.exports = router;
