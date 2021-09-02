export function capitalizeFirstLetter(word) {
  if (typeof word !== 'string') {
    return '';
  }

  return word.charAt(0).toUpperCase() + word.slice(1);
}


export function css($element, styles) {
  Object.keys(styles)
      .forEach((key) => {
        $element.style[key] = styles[key];
      });
}
