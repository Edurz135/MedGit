const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization || req.headers.Authorization;
    if (token == null) return res.sendStatus(401);

    jwt.verify(token.split(" ")[1], process.env.TOKEN_SECRET, (err, user) => {
      console.log(err);

      if (err) return res.sendStatus(403);

      req.user = user;

      next();
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

module.exports = { authenticateToken };
