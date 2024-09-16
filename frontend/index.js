import './index.scss'
import * as dom from "./src/dom.js"
import * as animation from "./src/animation.js"
import axios from 'axios'
import { clearDomValue, isInputHasContext } from './src/utils.js'



const RegisterToLoginBtnFunc = (event) => {
  event.preventDefault();
  animation.RegisterToLogin();
}

const LoginToRegisterBtnFunc = (event) => {
  event.preventDefault();
  animation.LoginToRegister();
}

dom.toLoginBtn.addEventListener("click", RegisterToLoginBtnFunc);
dom.toRegisterBtn.addEventListener("click", LoginToRegisterBtnFunc);

dom.loginBtn.addEventListener("click", login);
dom.registerBtn.addEventListener("click", register);
dom.signOutBtn.addEventListener("click", signOut)

const backendPath = import.meta.env.VITE_BACKEND_PATH
const login_token = import.meta.env.VITE_LOGIN_TOKEN

console.log(backendPath)

async function login(event) {
  event.preventDefault();
  if (isInputHasContext([dom.username, dom.password]) === 1) {
    animation.showError()
    return;
  }

  try {
    const response = await axios.post(
      `${backendPath}/api/login`, {
      username: dom.username.value,
      password: dom.password.value
    }).then(res => res.data)

    if (response.code === '0') {
      dom.welcomeUsername.textContent = response.username//拿到服务器返回的name
      clearDomValue([dom.username, dom.password])
      animation.showCorrect()
      animation.LoginTOWelcome()//跳转到welcome界面

      //登录时设置一个token存储到浏览器的localStorage中
      response.token && localStorage.setItem(login_token, response.token)
      console.log(response)
    }

  } catch (error) {//如果是错误的代码404,401,500会返回到error里面，只有正确的代码才会返回到上面的code
    console.log(error)
    const code = error?.response?.data?.code
    switch (code) {
      case "1":
      case "2":
        animation.showError()
        break;
      default:
        animation.showUnkonw()
        break;
    }
  }
}

async function register(event) {
  event.preventDefault();

  const code = isInputHasContext([//先检查输入是否合法
    dom.new_username,
    dom.password_one,
    dom.password_two
  ]);

  if (
    code === 1 ||
    code === -1 ||
    dom.password_one.value !== dom.password_two.value
  ) {
    animation.showError()
    return
  }

  try {//开始请求注册
    const response = await axios.post(
      `${backendPath}/api/register`, {
      username: dom.new_username.value,
      password: dom.password_one.value
    }).then(res => res.data)

    if (response.code === "0") {
      clearDomValue([dom.username, dom.password])
      animation.showCorrect()
      animation.RegisterToLogin()
    }
  } catch (error) {
    console.log(error)
    const code = error?.response?.data?.code
    switch (code) {
      case "1":
      case "2":
        animation.showError()
        break;
      default:
        animation.showUnkonw()
        break;
    }
  }
}

async function signOut(event) {
  event.preventDefault();
  clearDomValue([
    dom.username,
    dom.password,
    dom.new_username,
    dom.password_one,
    dom.password_two,
    dom.welcomeUsername
  ])
  animation.WelcomeToLogin()
  //清楚浏览器中的token
  localStorage.removeItem(login_token)
}

async function checkToken() {//判断token是否存在
  const token = localStorage.getItem(login_token)
  if (!token) return

  const configuration = {//配置http头的认证信息
    headers: {
      Authentication: `Bearer ${token}`
    }
  }

  //token 存在，继续验证
  try {
    const response = await axios.post(
      `${backendPath}/api/login`, {
      message: "token"
    },
      configuration
    ).then(res => res.data)

    if (response.code == "0") {
      dom.welcomeUsername.textContent = response.username
      animation.LoginTOWelcome()
      response.token && localStorage.setItem(login_token, response.token)
    } 
  } catch (error) {
    localStorage.removeItem(login_token)
  }

}

//每次都检查token是否存在
checkToken()
