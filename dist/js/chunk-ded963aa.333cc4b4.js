(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ded963aa"],{"00ab":function(t,e,n){"use strict";var a=n("d87e"),r=n.n(a);r.a},"10f0":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:{ceiling:t.ceiling},attrs:{id:"nav"}},[n("el-row",[n("el-col",{attrs:{xs:0,sm:3,md:3,lg:3,xl:3}},[n("div",{staticClass:"Non-existent"},[n("p",[t._v("占位符")])])]),n("el-col",{attrs:{xs:24,sm:18,md:18,lg:18,xl:18}},[n("div",{attrs:{id:"app_nav"}},[n("ul",{attrs:{id:"app_nav_ul"}},[t.isLoginStatus?n("li",{staticClass:"app_nav_li"},[n("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.loginOut()}}},[t._v("退  出")])]):n("li",{staticClass:"app_nav_li"},[n("router-link",{attrs:{to:"/login"}},[t._v("登  录")])],1),n("li",{staticClass:"app_nav_li active"},[n("router-link",{attrs:{to:"/MyHome"}},[t._v("主  页")])],1),n("li",{staticClass:"app_nav_li"},[n("router-link",{attrs:{to:"/class"}},[t._v("分  类")])],1),n("li",{staticClass:"app_nav_li"},[n("router-link",{attrs:{to:"/issue"}},[t._v("问  答")])],1),t.isLoginStatus?n("li",{staticClass:"app_nav_li"},[n("router-link",{attrs:{to:"/me"}},[t._v("我  的")])],1):t._e(),n("li",{staticClass:"app_nav_li"},[n("router-link",{attrs:{to:"/about"}},[t._v("关  于")])],1),n("li",{staticClass:"app_nav_li"},[n("router-link",{attrs:{to:"/reward"}},[t._v("打  赏")])],1)])])]),n("el-col",{attrs:{xs:0,sm:3,md:3,lg:3,xl:3}},[n("div",{staticClass:"Non-existent"},[n("p",[t._v("占位符")])])])],1)],1)},r=[],i={props:["ceiling"],data:function(){return{isLoginStatus:!1}},methods:{isLogin:function(){var t=localStorage.getItem("access_token");null!==t&&(this.isLoginStatus=!0)},loginOut:function(){localStorage.removeItem("access_token");var t=localStorage.getItem("access_token");null===t&&(this.isLoginStatus=!1)}},created:function(){this.isLogin()}},s=i,o=(n("7a2a"),n("2877")),c=Object(o["a"])(s,a,r,!1,null,"0b97db96",null);e["a"]=c.exports},1406:function(t,e,n){},"1af6":function(t,e,n){var a=n("63b6");a(a.S,"Array",{isArray:n("9003")})},"1b10":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"loading",rawName:"v-loading",value:!t.first&&t.loading,expression:"!first && loading"}],staticClass:"Issue"},[n("myNav",{attrs:{ceiling:t.ceiling}}),t._m(0),n("main",[n("div",{staticClass:"to-question"},[n("h2",[t._v("问题列表 "),n("router-link",{attrs:{to:"/sendQuestion"}},[n("i",{staticClass:"el-icon-question"}),t._v("去提问？")])],1)]),t._l(t.issueData,(function(e){return n("article",{key:e["id"]},[n("router-link",{attrs:{to:"/question/"+e["id"]}},[n("h5",[1==e.status?n("span",[n("i",{staticClass:"el-icon-warning"})]):2==e.status?n("span",[n("i",{staticClass:"el-icon-error"})]):3==e.status?n("span",[n("i",{staticClass:"el-icon-success"})]):t._e(),t._v("\n                    "+t._s(e["question"])+"\n                ")])]),n("br"),n("div",[n("span",{staticClass:"name"},[t._v(t._s(e["nickname"]))]),t._v("\n                |\n                "),n("span",{staticClass:"time"},[t._v(t._s(t.handleFormatDateMinuteSec(e["created_at"])))])])],1)})),t.isNoQuestionData?n("div",{staticClass:"no-postData"},[n("h2",[t._v("抱歉，暂时没有属于这个分类的文章")]),n("br"),n("h2",[t._v("抱歉，暫時沒有屬於這個分類的文章")]),n("br"),n("h2",[t._v("Sorry, there are no articles belonging to this category at this time.")]),n("br"),n("h2",[t._v("申し訳ありませんが、現在このカテゴリに属する記事はありません。")]),n("br"),n("h2",[t._v("죄송합니다. 현재이 카테고리에 속하는 기사가 없습니다.")]),n("br")]):t._e()],2),n("myPage",{attrs:{currentPage:t.currentPage,maxPage:t.maxPage},on:{pageTurning:t.pageTurning}}),n("myFooter")],1)},r=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"issue-wrapper"},[a("img",{staticClass:"bg",attrs:{src:n("eb44"),alt:""}})])}],i=n("75fc"),s=n("10f0"),o=n("9fe9"),c=n("3e51"),u=n("eeb9"),l={name:"Issue",components:{myNav:s["a"],myFooter:o["a"],myPage:c["a"]},data:function(){return{ceiling:!1,issueData:[],first:!1,loading:!0,currentPage:"",maxPage:"",isNoQuestionData:""}},created:function(){this.listenScroll(),this.getIssueData(1)},methods:{pageTurning:function(t){switch(t){case"prevPage":return void this.getIssueData(this.currentPage-1);case"nextPage":return void this.getIssueData(this.currentPage+1);default:return}},listenScroll:function(){var t=this;window.onscroll=function(){document.documentElement.scrollTop>0?t.ceiling=!0:t.ceiling=!1}},getIssueData:function(t){var e=this;u["a"].get("/v1/issues?perPage=10&page="+t).then((function(t){var n=t.data;e.issueData=Object(i["a"])(n["items"]),e.isNoQuestionData=!1,0===e.issueData.length&&(e.isNoQuestionData=!0),e.currentPage=n["_meta"]["currentPage"],e.maxPage=n["_meta"]["pageCount"],e.content=n["content"],e.loading=!1}),(function(){e.loading=!1}))},handleFormatDateMinuteSec:function(t){var e=new Date(1e3*t);return void 0===t?"":"".concat(e.getFullYear(),"-").concat(e.getMonth()+1>=10?e.getMonth()+1:"0"+(e.getMonth()+1),"-").concat(e.getDate()>=10?e.getDate():"0"+e.getDate()," ").concat(e.getHours()>=10?e.getHours():"0"+e.getHours(),":").concat(e.getMinutes()>=10?e.getMinutes():"0"+e.getMinutes(),":").concat(e.getSeconds()>=10?e.getSeconds():"0"+e.getSeconds())},scrollTo800:function(){window.scrollTo(0,800)}}},f=l,g=(n("6b35"),n("2877")),v=Object(g["a"])(f,a,r,!1,null,"4e3bc738",null);e["default"]=v.exports},"20fd":function(t,e,n){"use strict";var a=n("d9f6"),r=n("aebd");t.exports=function(t,e,n){e in t?a.f(t,e,r(0,n)):t[e]=n}},3702:function(t,e,n){var a=n("481b"),r=n("5168")("iterator"),i=Array.prototype;t.exports=function(t){return void 0!==t&&(a.Array===t||i[r]===t)}},"3e51":function(t,e,n){"use strict";var a=function(){var t=this,e=this,n=e.$createElement,a=e._self._c||n;return a("div",{staticClass:"page"},[a("span",{class:{"page-button":!0,hide:1===e.currentPage},on:{click:function(){t.$emit("pageTurning","prevPage")}}},[e._v("← 上一页 ")]),a("span",[e._v(" Page "+e._s(e.currentPage)+" of "+e._s(e.maxPage)+" ")]),a("span",{class:{"page-button":!0,hide:e.maxPage===e.currentPage},on:{click:function(){t.$emit("pageTurning","nextPage")}}},[e._v("下一页 →")])])},r=[],i={name:"page",props:["currentPage","maxPage"]},s=i,o=(n("cf33"),n("2877")),c=Object(o["a"])(s,a,r,!1,null,"4c6b9cfd",null);e["a"]=c.exports},"40c3":function(t,e,n){var a=n("6b4c"),r=n("5168")("toStringTag"),i="Arguments"==a(function(){return arguments}()),s=function(t,e){try{return t[e]}catch(n){}};t.exports=function(t){var e,n,o;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=s(e=Object(t),r))?n:i?a(e):"Object"==(o=a(e))&&"function"==typeof e.callee?"Arguments":o}},"4ee1":function(t,e,n){var a=n("5168")("iterator"),r=!1;try{var i=[7][a]();i["return"]=function(){r=!0},Array.from(i,(function(){throw 2}))}catch(s){}t.exports=function(t,e){if(!e&&!r)return!1;var n=!1;try{var i=[7],o=i[a]();o.next=function(){return{done:n=!0}},i[a]=function(){return o},t(i)}catch(s){}return n}},"549b":function(t,e,n){"use strict";var a=n("d864"),r=n("63b6"),i=n("241e"),s=n("b0dc"),o=n("3702"),c=n("b447"),u=n("20fd"),l=n("7cd6");r(r.S+r.F*!n("4ee1")((function(t){Array.from(t)})),"Array",{from:function(t){var e,n,r,f,g=i(t),v="function"==typeof this?this:Array,d=arguments.length,p=d>1?arguments[1]:void 0,_=void 0!==p,m=0,h=l(g);if(_&&(p=a(p,d>2?arguments[2]:void 0,2)),void 0==h||v==Array&&o(h))for(e=c(g.length),n=new v(e);e>m;m++)u(n,m,_?p(g[m],m):g[m]);else for(f=h.call(g),n=new v;!(r=f.next()).done;m++)u(n,m,_?s(f,p,[r.value,m],!0):r.value);return n.length=m,n}})},"54a1":function(t,e,n){n("6c1c"),n("1654"),t.exports=n("95d5")},"6b35":function(t,e,n){"use strict";var a=n("87c2"),r=n.n(a);r.a},"75fc":function(t,e,n){"use strict";n.d(e,"a",(function(){return g}));var a=n("a745"),r=n.n(a);function i(t){if(r()(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}var s=n("774e"),o=n.n(s),c=n("c8bb"),u=n.n(c);function l(t){if(u()(Object(t))||"[object Arguments]"===Object.prototype.toString.call(t))return o()(t)}function f(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function g(t){return i(t)||l(t)||f()}},"774e":function(t,e,n){t.exports=n("d2d5")},"7a2a":function(t,e,n){"use strict";var a=n("1406"),r=n.n(a);r.a},"7cd6":function(t,e,n){var a=n("40c3"),r=n("5168")("iterator"),i=n("481b");t.exports=n("584a").getIteratorMethod=function(t){if(void 0!=t)return t[r]||t["@@iterator"]||i[a(t)]}},"7d54":function(t,e,n){},"87c2":function(t,e,n){},"95d5":function(t,e,n){var a=n("40c3"),r=n("5168")("iterator"),i=n("481b");t.exports=n("584a").isIterable=function(t){var e=Object(t);return void 0!==e[r]||"@@iterator"in e||i.hasOwnProperty(a(e))}},"9fe9":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},r=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("footer",[n("span",{staticClass:"footer-left"},[n("a",{attrs:{href:"javascript:;"}},[t._v("Mhd97.top")]),n("a",{attrs:{href:"https://beian.miit.gov.cn"}},[t._v("   © 2020 mhd97.top 版权所有 桂ICP备18009232号-1")])]),n("span",{staticClass:"footer-right"},[t._v("\n        Proudly Made By\n        "),n("a",{attrs:{href:"javascript:;"}},[t._v("Mohuidong")])])])}],i={name:"myFooter",data:function(){return{footerData:[]}}},s=i,o=(n("00ab"),n("2877")),c=Object(o["a"])(s,a,r,!1,null,"22e8897b",null);e["a"]=c.exports},a745:function(t,e,n){t.exports=n("f410")},b0dc:function(t,e,n){var a=n("e4ae");t.exports=function(t,e,n,r){try{return r?e(a(n)[0],n[1]):e(n)}catch(s){var i=t["return"];throw void 0!==i&&a(i.call(t)),s}}},c8bb:function(t,e,n){t.exports=n("54a1")},cf33:function(t,e,n){"use strict";var a=n("7d54"),r=n.n(a);r.a},d2d5:function(t,e,n){n("1654"),n("549b"),t.exports=n("584a").Array.from},d87e:function(t,e,n){},eb44:function(t,e,n){t.exports=n.p+"img/issue.72ac5534.jpg"},f410:function(t,e,n){n("1af6"),t.exports=n("584a").Array.isArray}}]);
//# sourceMappingURL=chunk-ded963aa.333cc4b4.js.map