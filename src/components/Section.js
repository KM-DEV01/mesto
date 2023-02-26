export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._container = document.querySelector(containerSelector);

    this._renderer = renderer;
  }
  addItem(element, insertType = 'append') {
    if(insertType === 'append') {
      this._container.append(element);
      return;
    }
    this._container.prepend(element);
  }

  renderItems() {
    return this._items.forEach(item => {
      this._renderer(item);
    });
  }
}
