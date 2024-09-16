import axios from 'axios';
import { bcryptDBPath } from "./dataPath.js"

async function getSalts() {
  try {
    const salts = await axios.get(bcryptDBPath).then(res => res.data)
    return salts
  } catch (error) {
    console.log(error)
  }
}

async function findSaltById(id = '1') {
  try {
    const salts = await getSalts()
    const salt = salts.find(salt => salt.id === id)
    if (salt) {
      return salt.saltRounds
    } else {
      return null
    }
  } catch (error) {
    console.log(error)
  }
}

export { getSalts, findSaltById }