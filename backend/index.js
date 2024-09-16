import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import ip from 'ip'
import "dotenv/config"
import { login } from './src/api/login.js'
import { register } from './src/api/register.js'

const app = express();
app.use(cors({ origin: '*' }));
const jsonParser = bodyParser.json();

const port = process.env.PORT || 18700;


app.post("/api/login", jsonParser, login)
app.post("/api/register", jsonParser, register)


app.listen(port, () => {
  console.log(`http://localhost:${port}`)
  console.log(`Server is running on http://${ip.address()}:${port}`);
})








