const jwt = require("jsonwebtoken");
let { MAGIC_WORD } = process.env;

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.split(" ")[1]){
    return res.status(401).json({
        status: false,
        message: 'token not provided!',
        data: null
    })
  }

  let token = authorization.split(" ")[1];
  jwt.verify(token, MAGIC_WORD, (err, user) => {
    if (err) {
        return res.status(400).json({
            status: false,
            message: err.message,
            data: null
        })
    }
    delete user.iat;

    req.users = user;
    next();
  })
};