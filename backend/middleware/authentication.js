const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  // Log the token
  console.log("Token:", token);
  console.log("JWT_SECRET:", process.env.JWT_SECRET);

  // Check if no token is provided
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    // Handle invalid token
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = authentication;
