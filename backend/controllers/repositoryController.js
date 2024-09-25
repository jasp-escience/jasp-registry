exports.displayRepositories = (req, res) => {
  if (!req.session.user || !req.session.repos) {
    return res.redirect("/");
  }

  res.json({
    user: req.session.user,
    repositories: req.session.repos,
  });
};
