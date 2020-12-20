export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  renderItems() {
    this._initialArray.forEach(item => this._renderer(item))
  }

  addItem(element) {
    document.querySelector(this._containerSelector).prepend(element);
  }
} 