export default class UserInfo {
  constructor() {
    this.name = document.querySelector(".profile__title");
    this.job = document.querySelector(".profile__subtitle");
  }

  getUserInfo() {
    const _userInfo = {};
    _userInfo.name = this.name.textContent;
    _userInfo.job = this.job.textContent;
    return _userInfo;
  }

  setUserInfo(name, job) {
    this.name.textContent = name;
    this.job.textContent = job;
  }
}
