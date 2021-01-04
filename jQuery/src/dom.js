window.jQuery = function(selectorOrArrayOrTemplate) {
  // debugger
  let elements;
  if(selectorOrArrayOrTemplate instanceof Array) {
    elements = selectorOrArrayOrTemplate;
  } else if(typeof selectorOrArrayOrTemplate == 'string') {
    if(selectorOrArrayOrTemplate[0] === '<') {
      elements = [create(selectorOrArrayOrTemplate)]
    } else {
      elements = document.querySelectorAll(selectorOrArrayOrTemplate);
    }
  }

  function create(string) {
    let template = document.createElement('template');
    template.innerHTML = string;
    return template.content.firstChild;
  }

  return {
    // 闭包
    // 查找元素
    find(selector) {
      let arr = [];
      for(let i = 0; i < elements.length; i++) {
        arr = arr.concat(Array.from(elements[i].querySelectorAll(selector)));
      }
      arr.oldApi = this;
      return jQuery(arr);
    },
    appen() {

    },
    each(fn) {
      for(let i = 0; i < elements.length; i++) {
        fn.call(null,elements[i],i);
      }
      return this;
    },

    parent() {
      let arr = [];
      this.each((node) => {
        if(arr.indexOf(node.parentNode) === -1) {
          arr.push(node.parentNode);
        }
      })
      arr.oldApi = this;
      return jQuery(arr);
    },

    children() {
      let arr = [];
      for(let i = 0; i < elements.length; i++) {
        arr.push(...elements.children);
        arr = arr.concat(elements[i].children);
      }
      arr.oldApi = this;
      return jQuery(arr);
    },

    print() {
      console.log(elements);
    },

    oldApi: selectorOrArrayOrTemplate.oldApi,
    // 链式操作返回上一层
    end() {
      return elements.oldApi;
    },
    // 添加类
    addClass(string) {
      for(let i = 0; i < elements.length; i++) {
        elements[i].classList.add(string);
      }
      return this;
    },

    

  }
}