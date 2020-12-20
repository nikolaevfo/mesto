export default class UserInfo {
  constructor({ name, job }) {
    this._name = name;
    this._job = job;
    this.name = document.querySelector('.profile__title');
    this.job = document.querySelector('.profile__subtitle');
  }

  getUserInfo() {
    const _userInfo = {};
    _userInfo.name = this.name.textContent;
    _userInfo.job = this.job.textContent;
    return _userInfo;
  }

  setUserInfo() {
    const nameInput = document.querySelector('.popup-profile__text_type_name');
    const jobInput = document.querySelector('.popup-profile__text_type_profession');
    this.name.textContent = nameInput.value;
    this.job.textContent = jobInput.value;
  }
} 