// let div = dom.create('<div>hello</div>')

// console.log(div);
// dom.after(div,jiejie)

// console.log(123);
console.log(dom.style(sp,'font-size'));

const fn = ()=>{
  console.log(123456);
}

dom.on(sp,'click',fn);

dom.off(sp,'click', fn)

console.log(dom.siblings(dom.find('#e2')[0]));

dom.each(ep.children,(n) => dom.style(n,'color','red'));