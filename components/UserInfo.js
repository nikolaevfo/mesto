export default class UserInfo {
  constructor({ name, job }) {
    this._name = name;
    this._job = job;
  }

  getUserInfo() {
    const _userInfo = {};
    _userInfo.name = this._name;
    _userInfo.job = this._job;

    return _userInfo;
  }

  setUserInfo() {
    const name = document.querySelector('.profile__title');
    const job = document.querySelector('.profile__subtitle');

    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
  }

} 