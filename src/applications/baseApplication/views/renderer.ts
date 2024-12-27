export function renderer(dom, vDom) {
  const domTree = vDom;
  const node: HTMLElement = document.createElement(vDom.label);
  //css
  node.style.width = domTree.width;
  node.style.height = domTree.height;
  node.style.backgroundColor = domTree['background-color'];
  //
  dom.appendChild(node);
  if (!domTree.children) {
    return;
  }
  for (let i = 0; i < domTree.children.length; i++) {
    renderer(node, domTree.children[i]);
  }
}

export function loader(dom, domTree) {
  for (let i = 0; i < domTree.length; i++) {
    renderer(dom, domTree);
  }
}
