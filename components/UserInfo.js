export default class UserInfo {
  constructor({ name, job }) {
    this._name = name;
    this._job = job;
  }

  getUserInfo() {
    const _userInfo = {};
    _userInfo.name = document.querySelector('.profile__title').textContent;
    _userInfo.job = document.querySelector('.profile__subtitle').textContent;
    return _userInfo;
  }

  setUserInfo() {
    const name = document.querySelector('.profile__title');
    const job = document.querySelector('.profile__subtitle');
    const nameInput = document.querySelector('.popup-profile__text_type_name');
    const jobInput = document.querySelector('.popup-profile__text_type_profession');

    name.textContent = nameInput.value;
    job.textContent = jobInput.value;

  }

} 