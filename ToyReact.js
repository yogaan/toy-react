

class ElementWrapper {
  constructor (type) {
    this.root = document.createElement(type);
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value)
  }
  appendChild (vchild) {
    vchild.mountTo(this.root)
  }
  mountTo (parent) {
    parent.appendChild(this.root)
  }
}

class TextWrapper {
  constructor (content) {
    this.root = document.createTextNode(content);
  }
  mountTo (parent) {
    parent.appendChild(this.root)
  }
}

export class Component {
  constructor () {
    this.children = [];
  }
  setAttribute (name, value) {
    this[name] = value;
  }
  mountTo(parent) {
    const vdom = this.render()
    vdom.mountTo(parent);
  }
  appendChild (vchild) {
    this.children.push(vchild)
  }
}

export const ToyReact = {
  createElement(type, attributes, ...children){
    let element;
    if (typeof type === 'string') {
      element = new ElementWrapper(type);
    } else {
      element = new type
    }
    for (let attr in attributes) {
      element.setAttribute(attr, attributes[attr])
    }

    const loopChildren = (childArr)  => {
      for (let child of childArr) {
        if (Array.isArray(child)) {
          loopChildren(child)
        } else {
          if (!(child instanceof Component) && !(child instanceof ElementWrapper) && !(child instanceof TextWrapper)) {
            child = String(child).toString();
          }
          if (typeof child === 'string') {
            child = new TextWrapper(child)
          }
          element.appendChild(child)
        }
      }
    }
    loopChildren(children)
    return element;
  },
  render(vchild, root) {
    vchild.mountTo(root);
  }
}