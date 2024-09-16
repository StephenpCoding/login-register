import axios from "axios"
import { usersDBPath } from "./dataPath.js"


async function postUser(user) {
  try {
    const response = await axios.post(usersDBPath, user).then(res => res.data);
    return response
  } catch (error) {
    console.log(error)
  }
}

export { postUser }
