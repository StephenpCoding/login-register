//拿到所有user后，判断是否和我们定义的user一样
import axios from 'axios';
import { usersDBPath } from './dataPath.js';

async function getUsers() {//验证user是否合法
  try {
    const users = await axios.get(usersDBPath).then(res => res.data)
    return users
  } catch (error) {
    console.log(error)
  }
}

async function findUserByName(name) {
  try {
    const users = await getUsers()
    const user = users.find(user => user.username === name);
    return user
  } catch (error) {
    console.log(error)
  }
}

export { getUsers, findUserByName }

