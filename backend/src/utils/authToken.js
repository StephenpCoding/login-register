import jwt from "jsonwebtoken"
import "dotenv/config"

function authToken(req, res, next) {
  const headers = req.header
  const token = headers?.authorization?.split(" ")[1]

  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      err ? res.status(403).json({ message: "Unauthorized", code: 2 }) : null
      req.body.username = decoded.username;
      req.body.password = decoded.password;
    }) //验证token是否合法
  }
  next()
}

export { authToken }

