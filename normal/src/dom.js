window.dom = {
  // 创建元素
  create(string) {
    // let container = document.createElement(string);

    // https://stackoverflow.com/questions/494143/

    // let container = document.createElement('div');
    // container.innerHTML = string;
    // return container.firstChild;

    //这种用法ie不支持，如果是ie只能用上面的那种了
    let container = document.createElement('template');
    container.innerHTML = string;
    return container.content.firstChild; // template要这样返回
  },

  // 在node前面插入node1
  before(node1,node) {
    node.insertBefore(node1,node);
  },

  // 在node后面插入node1
  after(node1,node) {
    node.parentNode.insertBefore(node1, node.nextSibling);
  },

  // 新增儿子
  append(parent,child) {
    parent.appendChild(child);
  },

  // 新增爸爸
  wrap(node, parent) {
    this.before(node,parent);
    this.append(parent,node);
  },

  // 删除节点
  remove(node) {
    node.parentNode.removeChild(node);
    return node;
  },

  // 清空节点中的儿子
  empty(node) {
    const arr = [];

    // let x = node.firstChild;
    // while(x) {
    //   arr.push(this.remove(x));
    //   x = node.firstChild;
    // }

    const {childNodes} = node;
    while(childNodes.length) {
      arr.push(this.remove(childNodes[0]));
    }

    return arr;
  },

  // 设置 | 查询元素属性
  attr(node,name,value) {
    if(arguments.length === 2) {
      return node.getAttribute(name);
    } else if(arguments.length === 3) {
      node.setAttribute(name,value);
    }
  },

  // 设置 | 查询文本内容
  text(node,string) {
    if(arguments.length === 1) {
      return node.innerText;
    } else {
      if(innerText in node) {
        node.innerText = string;  //ie
      } else {
        node.textContent = string;  // firefox/chrome
      }
    }
  },

  html(node,string) {
    if(arguments.length === 1) {
      return node.innerHTML;
    } else if(arguments === 2) {
      node.innerHTML = string;
    }
  },

  // 设置 | 查询元素的样式
  style(node,string,value) {
    if(arguments.length === 1) {  // 获取元素的全部属性，包括内部，外部，内联
      if(node.currentStyle) {
        return node.currentStyle;
      } else {
        return window.getComputedStyle(node,null)
      }
    } else if(arguments.length === 2) {  
      if(typeof string === 'string') {
        return window.getComputedStyle(node)[string];
      } else if(string instanceof Object) {
        for(let key in string) {
          node.style[key] = string[key];
        }
      }
    } else if(arguments.length ===3){
      node.style[string] = value;
    }
  },

  // 对元素的class进行添加，删除，判断是否存在
  class: {
    add(node,name) {
      node.classList.add(name);
    },
    remove(node,name) {
      node.classList.remove(name);
    },
    has(node,name) {
      // return node.con
    }
  },

  // 绑定事件
  on(node,eventName,fn) {
    node.addEventListener(eventName,fn);
  },

  // 解绑事件
  off(node,eventName,fn) {
    node.removeEventListener(eventName,fn);
  },

  // 查找元素
  find(selector,scope) {
    return (scope || document).querySelectorAll(selector);
  },

  // 查父节点
  parent(selector) {
    return selector.parentNode;
  },

  // 查孩子
  children(selector) {
    return selector.children;
  },

  // 查兄弟
  siblings(selector) {
    // let arr = [];
    // let {children} = selector.parentNode
    // for(let el of children) {
    //   if(el === selector)continue;
    //   arr.push(el);
    // }
    // return arr;
    return Array.from(selector.parentNode.children).filter(n => n!=selector);

  },

  // 查下一个兄弟
  next(selector) {
    let x = selector.nextSibling;
    while(x && x.nodeType === 3) {
      x = x.nextSibling;
    }
    return x;
  },

  // 查上一个兄弟
  previous(selector) {
    let x = selector.previousSibling;
    while(x && x.nodetype === 3) {
      x = x.previousSibling;
    } 
    return x;
  },

  // 遍历
  each(nodeList, fn) {
    for(let node of nodeList) {
      fn.call(null,node);
    }
  },

  // 判断索引
  index(node) {
    let {children} = node.parentNode;
    for(let i = 0; i < children.length; i++) {
      if(children[i] === node) return i;
    }
    return -1;
  }


}