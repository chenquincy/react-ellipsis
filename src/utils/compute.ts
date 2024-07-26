/**
 * Return the current style of an element.
 * @param {HTMLElement} element The element to compute.
 * @param {string} prop The style property.
 * @returns {number}
 */
function computeStyle(element: HTMLElement, prop: string) {
  if (!window.getComputedStyle) {
    (window as any).getComputedStyle = function(el: any) {
      this.getPropertyValue = function(key: string) {
        const regex = /(-([a-z]){1})/g;
        if (key === 'float') key = 'styleFloat';
        if (regex.test(key)) {
          key = key.replace(regex, function() {
            return arguments[2].toUpperCase();
          });
        }
        return el.currentStyle && el.currentStyle[key] ? el.currentStyle[key] : null;
      };
      return this;
    };
  }
  return window.getComputedStyle(element, null).getPropertyValue(prop);
}

/**
 * Return the line-height of an element.
 * @param {HTMLElement} element The element to get line-height.
 * @returns {number}
 */
export function getLineHeight(element: HTMLElement) {
  let lineHeight = computeStyle(element, 'line-height');
  if (lineHeight === 'normal') {
    // Create a temp element to get line-height
    const dom = document.createElement('span');
    dom.style.width = '300px';
    dom.style.position = 'absolute';
    dom.style.visibility = 'hidden';
    dom.innerText = 'test';
    element.appendChild(dom);
    const height = dom.clientHeight;
    element.removeChild(dom);
    // Compatible some browser
    return height * 1.1;
  }
  return parseFloat(lineHeight);
}
