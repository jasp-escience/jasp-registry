const passport = require("passport");
const axios = require("axios");

// Initiates GitHub OAuth login
// exports.githubLogin = passport.authenticate("github", {
//   scope: ["user:email"],
// });
exports.githubLogin = (req, res, next) => {
  passport.authenticate("github", async (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/");
    }
  })(req, res, next);
};

// Handles the callback after GitHub has authenticated the user
// exports.githubCallback = passport.authenticate("github", {
//   failureRedirect: "/login", // Redirect to login page if authentication fails
//   successRedirect: "/repositories", // Redirect to profile page on success
// });

// Handles the callback after GitHub has authenticated the user
exports.githubCallback = (req, res, next) => {
  passport.authenticate("github", async (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/");
    }

    // Fetch repositories from GitHub using the accessToken
    try {
      const repos = await axios.get("https://api.github.com/user/repos", {
        headers: {
          Authorization: `token ${user.accessToken}`,
        },
      });

      // Store user and repositories in session
      req.session.user = user;
      // req.session.repos = repos.data.map((repo) => repo.name);
      req.session.repos = repos.data;

      // Redirect to the repositories page to display repos
      // const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
      return res.redirect(`/repositories`);
    } catch (error) {
      console.error("Error fetching repositories:", error);
      return res.redirect(`/`);
    }
  })(req, res, next);
};

// Log out the user
exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
