window.dom = {
  //创建节点
  create(str) {
    //template可以容纳任何标签
    const container = document.createElement("template");
    container.innerHTML = str.trim();
    return container.content.firstChild;
  },
  //在后面插入节点
  after(node, node2) {
    node.parentNode.insertBefore(node2,node.nextSibling);
  },
  //在后面插入节点
  before(node, node2) {
    node.parentNode.insertBefore(node2,node);
  },
  append(parent, node) {
    parent.appendChild(node);
  },
  wrap(node, parent) {
    dom.before(node, parent);
    dom.append(parent,node);
  },
  remove(node) {
    node.parentNode.removeChild(node);
    return node;
  },
  empty(node) {
    // const childnodes = node.childNodes
    // const {childNodes} = node;
    const arr = [];
    let x = node.firstChild;
    while(x) {
      arr.push(dom.remove(node.firstChild))
      x = node.firstChild
    }
    return arr
  },
  attr(node, name, value) {
    if(arguments.length === 3) {
      node.setAttribute(name,value)
    } else if(arguments.length === 2) {
      return node.getAttribute(name);
    }
  },
  text(node, string) {
    if(arguments.length === 2) {
      if('innerText' in node) {
        node.innerText = string;
      } else {
        node.textContent = string
      }
    } else if(arguments.length === 1) {
      if('innerText' in node) {
        return node.innerText
      } else {
        return node.textContent
      }
    }
  },
  html(node, string){
    if(arguments.length === 2) {
      node.innerHTML = string;
    } else if(arguments.length === 1) {
      return node.innerHTML;
    }
  },
  style(node, name, value) {
    if(arguments.length === 3) {
      node.style[name] = value;
    } else if(arguments.length === 2) {
      if(typeof name === 'string') {
        return node.style[name];
      } else if(name instanceof Object) {
        for(let i in name) {
          node.style[i] = name[i];
        }
      }
    }
  },
  class: {
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className)
    },
    has() {
      return node.classList.contains(className);
    }
  },
  on(node,eventName,fn) {
    node.addActionListener(eventName,fn);
  },
  off(node,eventName,fn) {
    node.removeEventListener(eventName, fn);
  },
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  },
  parent(node) {
    return node.parentNode;
  },
  children(node) {
    return node.children
  },
  siblings(node) {
    return Array.from(node.parentNode.children).filter(n => n!=node);
  },
  next(node) {
    let x = node.nextSibling
    while(x.nodeType == 3) {
      x = x.nextSibling
    }
    return x;
  },
  previous(node) {
    let x = node.previousSiblings;
    while(x.nodeType == 3) {
      x = x.previousSiblings
    } 
    return x;
  },
  each(nodeList,fn) {
    for(let i = 0; i < nodeList.length; i++) {
      fn.call(null,nodeList[i]);
    }
  },
  index(node) {
    const list = dom.children(node.parentNode);
    for(let i = 0; i < list.length; i++) {
      if(list[i] === node) return i
    }
    return -1;
  }
  
};