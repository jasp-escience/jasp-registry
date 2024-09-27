const jwt = require("jsonwebtoken");

// Middleware to verify JWT from HttpOnly cookie
function authenticateToken(req, res, next) {
  // Depends where the token is stored. In Session it is stored on the server side.
  // In cookie it is stored on the client side.
  // In this case, we are storing the token in the session.
  const token = req.session.token;
  // const token = req.cookies.token;
  console.log("Token:", token);

  if (!token) {
    // If no token, return a 401 Unauthorized response
    return res.sendStatus(401);
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // If token is invalid, return a 403 Forbidden response
      return res.sendStatus(403);
    }

    // If valid, attach the user information to the request
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  });
}

module.exports = authenticateToken;
