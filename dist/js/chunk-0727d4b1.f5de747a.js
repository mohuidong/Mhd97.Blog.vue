(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0727d4b1"],{"00ab":function(t,n,e){"use strict";var a=e("d87e"),r=e.n(a);r.a},"10f0":function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{class:{ceiling:t.ceiling},attrs:{id:"nav"}},[e("el-row",[e("el-col",{attrs:{xs:0,sm:3,md:3,lg:3,xl:3}},[e("div",{staticClass:"Non-existent"},[e("p",[t._v("占位符")])])]),e("el-col",{attrs:{xs:24,sm:18,md:18,lg:18,xl:18}},[e("div",{attrs:{id:"app_nav"}},[e("ul",{attrs:{id:"app_nav_ul"}},[t.isLoginStatus?e("li",{staticClass:"app_nav_li"},[e("a",{attrs:{href:"javascript:;"},on:{click:function(n){return t.loginOut()}}},[t._v("退  出")])]):e("li",{staticClass:"app_nav_li"},[e("router-link",{attrs:{to:"/login"}},[t._v("登  录")])],1),e("li",{staticClass:"app_nav_li active"},[e("router-link",{attrs:{to:"/MyHome"}},[t._v("主  页")])],1),e("li",{staticClass:"app_nav_li"},[e("router-link",{attrs:{to:"/class"}},[t._v("分  类")])],1),e("li",{staticClass:"app_nav_li"},[e("router-link",{attrs:{to:"/issue"}},[t._v("问  答")])],1),t.isLoginStatus?e("li",{staticClass:"app_nav_li"},[e("router-link",{attrs:{to:"/me"}},[t._v("我  的")])],1):t._e(),e("li",{staticClass:"app_nav_li"},[e("router-link",{attrs:{to:"/about"}},[t._v("关  于")])],1),e("li",{staticClass:"app_nav_li"},[e("router-link",{attrs:{to:"/reward"}},[t._v("打  赏")])],1)])])]),e("el-col",{attrs:{xs:0,sm:3,md:3,lg:3,xl:3}},[e("div",{staticClass:"Non-existent"},[e("p",[t._v("占位符")])])])],1)],1)},r=[],i={props:["ceiling"],data:function(){return{isLoginStatus:!1}},methods:{isLogin:function(){var t=localStorage.getItem("access_token");null!==t&&(this.isLoginStatus=!0)},loginOut:function(){localStorage.removeItem("access_token");var t=localStorage.getItem("access_token");null===t&&(this.isLoginStatus=!1)}},created:function(){this.isLogin()}},o=i,s=(e("7a2a"),e("2877")),c=Object(s["a"])(o,a,r,!1,null,"0b97db96",null);n["a"]=c.exports},1406:function(t,n,e){},"1af6":function(t,n,e){var a=e("63b6");a(a.S,"Array",{isArray:e("9003")})},"20fd":function(t,n,e){"use strict";var a=e("d9f6"),r=e("aebd");t.exports=function(t,n,e){n in t?a.f(t,n,r(0,e)):t[n]=e}},3625:function(t,n,e){t.exports=e.p+"img/bg.bc333340.jpg"},3702:function(t,n,e){var a=e("481b"),r=e("5168")("iterator"),i=Array.prototype;t.exports=function(t){return void 0!==t&&(a.Array===t||i[r]===t)}},"3e51":function(t,n,e){"use strict";var a=function(){var t=this,n=this,e=n.$createElement,a=n._self._c||e;return a("div",{staticClass:"page"},[a("span",{class:{"page-button":!0,hide:1===n.currentPage},on:{click:function(){t.$emit("pageTurning","prevPage")}}},[n._v("← 上一页 ")]),a("span",[n._v(" Page "+n._s(n.currentPage)+" of "+n._s(n.maxPage)+" ")]),a("span",{class:{"page-button":!0,hide:n.maxPage===n.currentPage},on:{click:function(){t.$emit("pageTurning","nextPage")}}},[n._v("下一页 →")])])},r=[],i={name:"page",props:["currentPage","maxPage"]},o=i,s=(e("cf33"),e("2877")),c=Object(s["a"])(o,a,r,!1,null,"4c6b9cfd",null);n["a"]=c.exports},"40c3":function(t,n,e){var a=e("6b4c"),r=e("5168")("toStringTag"),i="Arguments"==a(function(){return arguments}()),o=function(t,n){try{return t[n]}catch(e){}};t.exports=function(t){var n,e,s;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(e=o(n=Object(t),r))?e:i?a(n):"Object"==(s=a(n))&&"function"==typeof n.callee?"Arguments":s}},"49c0":function(t,n,e){"use strict";var a=e("af77"),r=e.n(a);r.a},"4ee1":function(t,n,e){var a=e("5168")("iterator"),r=!1;try{var i=[7][a]();i["return"]=function(){r=!0},Array.from(i,(function(){throw 2}))}catch(o){}t.exports=function(t,n){if(!n&&!r)return!1;var e=!1;try{var i=[7],s=i[a]();s.next=function(){return{done:e=!0}},i[a]=function(){return s},t(i)}catch(o){}return e}},"549b":function(t,n,e){"use strict";var a=e("d864"),r=e("63b6"),i=e("241e"),o=e("b0dc"),s=e("3702"),c=e("b447"),u=e("20fd"),l=e("7cd6");r(r.S+r.F*!e("4ee1")((function(t){Array.from(t)})),"Array",{from:function(t){var n,e,r,f,g=i(t),v="function"==typeof this?this:Array,d=arguments.length,p=d>1?arguments[1]:void 0,_=void 0!==p,m=0,h=l(g);if(_&&(p=a(p,d>2?arguments[2]:void 0,2)),void 0==h||v==Array&&s(h))for(n=c(g.length),e=new v(n);n>m;m++)u(e,m,_?p(g[m],m):g[m]);else for(f=h.call(g),e=new v;!(r=f.next()).done;m++)u(e,m,_?o(f,p,[r.value,m],!0):r.value);return e.length=m,e}})},"54a1":function(t,n,e){e("6c1c"),e("1654"),t.exports=e("95d5")},"75fc":function(t,n,e){"use strict";e.d(n,"a",(function(){return g}));var a=e("a745"),r=e.n(a);function i(t){if(r()(t)){for(var n=0,e=new Array(t.length);n<t.length;n++)e[n]=t[n];return e}}var o=e("774e"),s=e.n(o),c=e("c8bb"),u=e.n(c);function l(t){if(u()(Object(t))||"[object Arguments]"===Object.prototype.toString.call(t))return s()(t)}function f(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function g(t){return i(t)||l(t)||f()}},"774e":function(t,n,e){t.exports=e("d2d5")},"7a2a":function(t,n,e){"use strict";var a=e("1406"),r=e.n(a);r.a},"7cd6":function(t,n,e){var a=e("40c3"),r=e("5168")("iterator"),i=e("481b");t.exports=e("584a").getIteratorMethod=function(t){if(void 0!=t)return t[r]||t["@@iterator"]||i[a(t)]}},"7d54":function(t,n,e){},"95d5":function(t,n,e){var a=e("40c3"),r=e("5168")("iterator"),i=e("481b");t.exports=e("584a").isIterable=function(t){var n=Object(t);return void 0!==n[r]||"@@iterator"in n||i.hasOwnProperty(a(n))}},"9fe9":function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement;t._self._c;return t._m(0)},r=[function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("footer",[e("span",{staticClass:"footer-left"},[e("a",{attrs:{href:"javascript:;"}},[t._v("Mhd97.top")]),e("a",{attrs:{href:"https://beian.miit.gov.cn"}},[t._v("   © 2020 mhd97.top 版权所有 桂ICP备18009232号-1")])]),e("span",{staticClass:"footer-right"},[t._v("\n        Proudly Made By\n        "),e("a",{attrs:{href:"javascript:;"}},[t._v("Mohuidong")])])])}],i={name:"myFooter",data:function(){return{footerData:[]}}},o=i,s=(e("00ab"),e("2877")),c=Object(s["a"])(o,a,r,!1,null,"22e8897b",null);n["a"]=c.exports},a745:function(t,n,e){t.exports=e("f410")},af77:function(t,n,e){},b0dc:function(t,n,e){var a=e("e4ae");t.exports=function(t,n,e,r){try{return r?n(a(e)[0],e[1]):n(e)}catch(o){var i=t["return"];throw void 0!==i&&a(i.call(t)),o}}},c8bb:function(t,n,e){t.exports=e("54a1")},cf33:function(t,n,e){"use strict";var a=e("7d54"),r=e.n(a);r.a},d2d5:function(t,n,e){e("1654"),e("549b"),t.exports=e("584a").Array.from},d87e:function(t,n,e){},e76d:function(t,n,e){"use strict";e.r(n);var a=function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("div",[a("myNav",{attrs:{ceiling:t.ceiling}}),a("div",{staticClass:"bg-wrapper"},[a("img",{staticClass:"bg",attrs:{src:e("3625"),alt:""}}),a("div",{staticClass:"slogan"},[a("transition",[a("p",{class:t.H1_class,attrs:{id:"H1_id"}},[t._v(t._s(t.titleData.home_signature_title)),a("br"),t._v(t._s(t.titleData.home_signature_content))])])],1),a("div",{staticClass:"down",on:{click:t.scrollTo800}},[a("transition",[a("i",{class:t.homeArrowDown})])],1)]),a("main",{directives:[{name:"loading",rawName:"v-loading",value:!t.first&&t.loading,expression:"!first && loading"}]},t._l(t.posts,(function(n){return a("article",{key:n["id"]},[a("router-link",{attrs:{to:"/article/"+n["id"]}},[a("h5",[t._v(t._s(n["title"]))])]),a("p",[t._v(t._s(n["summary"]))]),a("div",[a("span",{staticClass:"name"},[t._v(t._s(n["user_name"]))]),t._v("\n                |\n                "),a("span",{staticClass:"time"},[t._v(t._s(t.handleFormatDateMinuteSec(n["created_at"])))])])],1)})),0),a("myPage",{attrs:{currentPage:t.currentPage,maxPage:t.maxPage},on:{pageTurning:t.pageTurning}}),a("myFooter")],1)},r=[],i=e("75fc"),o=e("10f0"),s=e("9fe9"),c=e("3e51"),u=e("eeb9"),l={name:"NewHome",components:{myNav:o["a"],myFooter:s["a"],myPage:c["a"]},data:function(){return{H1_class:"H1_class",homeArrowDown:"el-icon-arrow-down",activeIndex2:"1",currentPage:1,maxPage:1,loading:!1,ceiling:!1,titleData:[],posts:[],first:!0}},methods:{pageTurning:function(t){switch(t){case"prevPage":return void this.getData(this.currentPage-1);case"nextPage":return void this.getData(this.currentPage+1);default:return}},getData:function(t){var n=this;this.loading||(this.loading=!0,u["a"].get("/v1/posts?perPage=5&page="+t).then((function(t){var e=t.data;n.posts=Object(i["a"])(e["items"]),n.currentPage=e["_meta"]["currentPage"],n.maxPage=e["_meta"]["pageCount"],n.loading=!1,n.first=!1}),(function(){n.loading=!1,n.first=!1})))},getTitleData:function(){var t=this;u["a"].get("/v1/system-settings?").then((function(n){t.titleData=n.data,t.loading=!1,t.first=!1}),(function(){t.loading=!1,t.first=!1}))},handleFormatDateMinuteSec:function(t){var n=new Date(1e3*t);return void 0===t?"":"".concat(n.getFullYear(),"-").concat(n.getMonth()+1>=10?n.getMonth()+1:"0"+(n.getMonth()+1),"-").concat(n.getDate()>=10?n.getDate():"0"+n.getDate()," ").concat(n.getHours()>=10?n.getHours():"0"+n.getHours(),":").concat(n.getMinutes()>=10?n.getMinutes():"0"+n.getMinutes(),":").concat(n.getSeconds()>=10?n.getSeconds():"0"+n.getSeconds())},scrollTo800:function(){window.scrollTo(0,800)},listenScroll:function(){var t=this;window.onscroll=function(){document.documentElement.scrollTop>0?t.ceiling=!0:t.ceiling=!1}}},created:function(){this.homeArrowDown="el-icon-arrow-down animated wobble",this.H1_class="H1_class animated lightSpeedIn",this.listenScroll(),this.getData(1),this.getTitleData()}},f=l,g=(e("49c0"),e("2877")),v=Object(g["a"])(f,a,r,!1,null,"43a82337",null);n["default"]=v.exports},f410:function(t,n,e){e("1af6"),t.exports=e("584a").Array.isArray}}]);
//# sourceMappingURL=chunk-0727d4b1.f5de747a.js.map