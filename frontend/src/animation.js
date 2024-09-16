import { gsap } from 'gsap';

class Animation {
  constructor(target) {
    this.target = target;
  }

  in(timeline) {//新的页面加载
    timeline = timeline || gsap.timeline();
    timeline.to(this.target, { duration: 0, display: 'none', opacity: 0, x: 0, y: 40 })
    //这一行代码会立即将 this.target 元素隐藏（display: 'none'）并将它的位置设置在原始位置向下 40 像素处，透明度变为 0。
    timeline.to(this.target, { duration: 0.5, display: 'flex', opacity: 1, x: 0, y: 0 })
    //这一行代码会在 0.5 秒内将 this.target 元素从向下 40 像素处移动回原始位置，同时改变透明度从 0（不可见）变为 1（完全可见），并将其显示设置为 flex。
  }

  out(timeline) {//以前的页面离开
    timeline = timeline || gsap.timeline();//如果没有时间轴，创建一个新的时间轴
    timeline.to(this.target, { duration: 0, display: 'flex', opacity: 1, x: 0, y: 0 })//在原始位置可见
    timeline.to(this.target, { duration: 0.5, display: 'none', opacity: 0, x: 0, y: -40 })//0。5秒内，向上移出不可见
  }
}

function AtoB(a, b, delay = 0) {
  const timeline = gsap.timeline({ delay: delay });
  a.out(timeline);
  b.in(timeline);
}

const animation = {
  login: new Animation('.login'),//登录html节点的class名称
  register: new Animation('.register'),
  welcome: new Animation('.welcome'),
}

function LoginToRegister() {
  AtoB(animation.login, animation.register);
}

function RegisterToLogin() {
  AtoB(animation.register, animation.login);
}

function LoginTOWelcome() {
  AtoB(animation.login, animation.welcome);
}

function WelcomeToLogin() {
  AtoB(animation.welcome, animation.login);
}

function backgroundColorFlash(color) {
  const timeline = gsap.timeline();
  timeline.to('body', { duration: 0, background: "#fff" })
  timeline.to('body', { duration: 1, background: color, ease: "power2.inout" })
  timeline.to('body', { duration: 1, background: "#fff", ease: "power2.inout" })

}

function showError() {
  backgroundColorFlash("#ff7875");
}


function showCorrect() {
  backgroundColorFlash("#52c41a");
}

function showUnkonw() {
  backgroundColorFlash("#ffa940");
}

export { LoginToRegister, RegisterToLogin, LoginTOWelcome, WelcomeToLogin, showCorrect, showError, showUnkonw };