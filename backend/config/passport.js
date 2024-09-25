const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;

// Configure the GitHub strategy for use by Passport
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      // Here you can choose to store the user profile into a database
      // For now, we’ll just pass the profile along
      console.log("Access Token:", accessToken); // Logs the access token
      console.log("Refresh Token:", refreshToken); // Logs the refresh token (if available)
      // console.log("Profile:", JSON.stringify(profile)); // Logs the user profile data

      // You can also log specific parts of the profile object
      console.log("Username:", profile.username);
      console.log("ID:", profile.id);
      console.log("Emails:", profile.emails);

      profile.accessToken = accessToken;
      return done(null, profile);
    },
  ),
);

// Serialize user to store in session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from session
passport.deserializeUser((obj, done) => {
  done(null, obj);
});
