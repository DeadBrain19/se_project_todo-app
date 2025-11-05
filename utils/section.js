class Section {
  constructor({ items, renderer, containerSelector }) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      item = this._renderer(item);
      this._container.append(item);
    });
  }

  addItem(element) {
    // add element contaner
  }
}
export default Section;
