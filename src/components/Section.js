export class Section {
  constructor({ renderer }, containerSelector) {
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

  renderItems(items) {
    return items.forEach(item => {
      this._renderer(item);
    });
  }
}
