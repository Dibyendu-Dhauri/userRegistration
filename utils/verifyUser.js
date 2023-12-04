const jwt = require("jsonwebtoken");
const { createError } = require("./error");
const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  const user = jwt.verify(token, process.env.JWT);
  if (!user) {
    return next(createError(403, "Token is not valid!"));
  }
  res.locals.user = user;
  console.log("user verified");
  next();
};

module.exports = verifyUser;
