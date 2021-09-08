export class Excel {
  constructor(options) {
    this.components = options.components || [];
  }

  render(selector) {
    const $mainContainer = document.querySelector(selector);

    this.components.forEach((component) => {
      $mainContainer.append(component.getRootElement());
      component.init();
    });
  }
}
