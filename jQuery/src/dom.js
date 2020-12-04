window.jQuery = function(selector) {
  let elements;
  if(typeof selector === 'string') {
    elements = document.querySelectorAll(selector);
  } else if(selector instanceof Array) {
    elements = selector;
  }
  return {
    oldApi: selector.oldApi,
    addClass(name) {
      for(let i = 0; i < elements.length; i++) {
        elements[i].classList.add(name);
      }
      return this;
    },
    find(selector) {
      let arr = [];
      for(let i = 0; i < elements.length; i++) {
        arr = arr.concat(Array.from(elements[i].querySelectorAll(selector)));
      }
      arr.oldApi = this;
      return new jQuery(arr);
    },
    end() {
      return this.oldApi;
    },
    each(fn) {
      for(let i = 0; i < elements.length; i++) {
        fn.call(null,elements[i],i)
      }
    },
    parent() {
      let arr = []
      this.each(node => {
        if(arr.indexOf(node.parentNode) === -1) {
          arr.push(node.parentNode);
        }
      });
      return jQuery(arr);
    },
    print() {
      this.each(node => console.log(node)) 
    },
    children() {
      const arr = [];
      this.each(node => {
        arr.push(...node.children)
      })
      return jQuery(arr);
    }
  }
}