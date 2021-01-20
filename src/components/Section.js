export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  renderItems(array) {
    array.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    document.querySelector(this._containerSelector).prepend(element);
  }
}
