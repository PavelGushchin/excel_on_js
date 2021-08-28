export class Excel {
  constructor(options) {
    this.components = options.components || [];
  }

  render(selector) {
    const $mainDiv = document.createElement('div');
    $mainDiv.classList.add('excel');

    this.components.forEach((component) => {
      const $componentDiv = document.createElement('div');
      $componentDiv.classList.add(component.className);
      $componentDiv.innerHTML = component.toHtml();

      $mainDiv.append($componentDiv);
    });

    const $rootElement = document.querySelector(selector);
    $rootElement.append($mainDiv);
  }
}
