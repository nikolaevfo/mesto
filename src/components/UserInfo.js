export default class UserInfo {
  constructor() {
    // this._name = name;
    // this._job = job;
    this.name = document.querySelector('.profile__title');
    this.job = document.querySelector('.profile__subtitle');
    // this.avatar = document.querySelector('.profile__avatar');
  }
  /*
    douwnloadUserInfo() {
      const _profileAvatar = document.querySelector('.profile__avatar');
      fetch('https://mesto.nomoreparties.co/v1/cohort-19/users/me ', {
        headers: {
          authorization: '528df5a2-16f1-4f0e-9003-28f33571e107'
        }
      })
        .then(res => res.json())
        .then((result) => {
          this.setUserInfo(result.name, result.about);
          _profileAvatar.src = result.avatar;
        });
    }*/

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