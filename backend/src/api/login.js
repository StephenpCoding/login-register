import axios from 'axios';
import bcrypt from "bcrypt"
import { findSaltById } from '../utils/getSalts.js';
import { findUserByName } from '../utils/getUsers.js';
import { genToken } from '../utils/getToken.js';

async function login(req, res) {
  const { username, password } = req.body;
  try {
    const user = await findUserByName(username)
    if (!user) {
      res.status(500).json({
        message: "User not found",
        code: "1",
        username: username
      })
      return;
    } else {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        res.status(401).json({
          message: "password is not correct",
          code: "2",
          username: username
        });
        return;
      } else {

        const userTokenInfo = {
          username,
          password
        }
        const token = genToken(userTokenInfo, '1h')

        res.status(201).json({
          message: "login successful",
          code: "0",
          username: username,
          token
        })
        return;
      }
    }
  } catch (error) {
    console.log(error)
  }
}
export { login }