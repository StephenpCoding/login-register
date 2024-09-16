
import axios from 'axios';
import bcrypt from "bcrypt"
import { findSaltById } from '../utils/getSalts.js';
import { findUserByName } from '../utils/getUsers.js';
import { postUser } from "../utils/postUser.js"


async function register(req, res) {
  const { username, password } = req.body;
  try {
    const user = await findUserByName(username);
    console.log(user)
    if (user) {
      res.status(409).json({//用户存在
        message: "user already exist",
        code: "1",
        username: username
      });
      return;
    } else if (!password) {//没输入密码
      res.status(409).json({
        message: "Password is required",
        code: "2",
        username: username
      });
    } else {//用户不存在，加密密码，创建用户
      const saltRounds = await findSaltById('1');
      const hashedPassword = await bcrypt.hash(password, saltRounds);//把盐值和密码加密
      const userInfo = {
        username: username,
        password: hashedPassword
      }
      await postUser(userInfo);
      res.status(201).json({
        message: "user created",
        code: "0",
        username: username
      })
    }
  } catch (error) {
    console.log(error)
  }
}

export { register }