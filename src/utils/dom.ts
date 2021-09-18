import { isBrowser } from './is';

function createSpan(text: string) {
  const span = document.createElement('span');
  span.className = '__react-ellipsis-js-content-text';
  span.textContent = text;
  return span;
}
export function wrapTextChildNodesWithSpan(node: Node) {
  if (!isBrowser) {
    return;
  }
  if (node.nodeType === Node.TEXT_NODE) {
    if (node.textContent) {
      node.parentNode?.replaceChild(createSpan(node.textContent), node);
    }
  } else {
    node.childNodes.forEach(item => {
      wrapTextChildNodesWithSpan(item);
    });
  }
}

export function getElementHeight(element: HTMLElement) {
  return element.getBoundingClientRect().height;
}
