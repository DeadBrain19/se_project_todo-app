class Section {
  constructor({ items, renderer, containerSelector }) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._containerElement = document.querySelector(containerSelector);
  }

  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._containerElement.append(element);
  }
}

export default Section;
