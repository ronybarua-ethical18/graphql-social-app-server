const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config.js");
const { AuthenticationError } = require("apollo-server");

module.exports = (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid/Expired token", {error: "Invalid/Expired token"});
      }
    }
    throw new AuthenticationError(
      "Authentication token must be 'Bearer [token]", {error: "Authentication token must be 'Bearer [token]"}
    );
  }
  throw new AuthenticationError("Authorization Header must be provided", {error: "Authorization Header must be provided"});
};
