export class Excel {
  constructor(options) {
    this.components = options.components || [];
  }

  render(selector) {
    const $excelDiv = document.createElement('div');
    $excelDiv.classList.add('excel');

    this.components.forEach((component) => {
      $excelDiv.innerHTML += component.toHtml();
    });

    const $rootElement = document.querySelector(selector);
    $rootElement.append($excelDiv);
  }
}
