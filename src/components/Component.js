export class Component {
  constructor(rootTag, rootClass) {
    this.$root = document.createElement(rootTag);
    this.$root.classList.add(rootClass);
    this.$root.innerHTML = this.content();
  }

  content() {
    throw new Error('You have to override this method!');
  }

  toHtml() {
    return this.$root.outerHTML;
  }

  getRoot() {
    return this.$root;
  }
}
