const jwt = require("jsonwebtoken");
const JWT_SECRET = "#arslaan#";

const fetchuser = (req, res, next) => {
  // next function will run i.e getUser
  // Get user from the jwt token, then add ID to req object
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status("401")
      .send({ error: "Please authenticate using valid token!" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res
      .status("401")
      .send({ error: "Please authenticate using valid token!" });
  }
};

module.exports = fetchuser;
