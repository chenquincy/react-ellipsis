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
        const regex = /(\-([a-z]){1})/g;
        if (key == 'float') key = 'styleFloat';
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
    // Normal line heights is different from browser to browser.
    // Use 1.5 to compatible with.
    return parseInt(computeStyle(element, 'font-size')) * 1.5;
  }
  return parseInt(lineHeight);
}

/**
 * Compute the max height of an element by max line count.
 * @param {HTMLDivElement} element The element to compute max height.
 * @param {number} maxLine The max line count of element.
 * @returns {number}
 */
export function getMaxHeight(element: HTMLDivElement, maxLine: number) {
  return getLineHeight(element) * maxLine;
}
