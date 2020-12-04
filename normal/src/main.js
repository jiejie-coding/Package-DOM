const div = dom.create("<div>new</div>");
const div2 = dom.create("<div>later</div>");
dom.after(jiejie,div)
dom.before(div,div2)

dom.append(div2 , dom.create("<span> hi</span>"))

dom.wrap(div2, dom.create("<a href='baidu.com'></a>"));

dom.remove(div)

// console.log(dom.empty(ep));

dom.attr(opop,'data-jie',"jie")

dom.text(opop,'hihi')
dom.html(opop,"<a href='baidu.com'>百度一下</a>")

dom.style(opop,{border:"1px solid #000","color":"red"})
dom.class.add(opop,"hov");

