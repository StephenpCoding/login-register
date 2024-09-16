import jwt from "jsonwebtoken"
import "dotenv/config"

function genToken(info, expries_time) {
  const newInfo = { ...info, date: new Date() }
  const token = jwt.sign(newInfo, process.env.ACCESS_TOKEN_SECRET, { expriesIn: expries_time })
  return token
}

export { genToken }

