"use strict";(self.webpackChunkpostalmap=self.webpackChunkpostalmap||[]).push([[52],{8052:function(e,t,s){s.r(t),s.d(t,{default:function(){return Y}});var a=s(1413),n=s(3433),i=s(2791),r=s(9439),c=s(9616),l=(s(8089),s(3441)),o=s(184);var d=function(e){var t=e.i,s=e.el,n=e.section,d=e.setVisibleSection,u=(e.slow3,e.scrollContainer,e.scroll,e.data,(0,i.useState)(!1)),f=(0,r.Z)(u,2),h=f[0],x=f[1],m=(0,i.useState)(!1),p=(0,r.Z)(m,2);p[0],p[1],(0,i.useEffect)((function(){h&&d(t)}),[h]);var v=(0,i.useRef)(),j=(0,c.q_)({opacity:h?1:0,transform:h?"translateY(0)":"translateY(20px)",delay:100,config:{duration:250}}),y=(0,c.q_)({opacity:h?1:0,transform:h?"translateY(0)":"translateY(20px)",delay:200,config:{duration:250}}),g=((0,c.q_)({opacity:h?1:0,transform:h?"translateY(0)":"translateY(20px)",delay:300,config:{duration:250}}),(0,c.bY)(s.text.length,s.text.map((function(e,t){return h?{from:{opacity:0,transform:"translateY(+20px)"},to:{opacity:1,transform:"translateY(0)"},delay:100*t+300,config:{}}:{from:{opacity:1,transform:"translateY(0px)"},to:{opacity:0,transform:"translateY(+20px)"},delay:100*t+300,config:{}}})))),N=(0,i.useState)(),b=(0,r.Z)(N,2),S=b[0],Z=b[1];(0,i.useEffect)((function(){"light"===s.lightMode&&Z(!0),"dark"===s.lightMode&&Z(!1)}),[]);var w={id:"text",ref:n,style:S?{background:"#f4f4f4"}:{background:"#050505"},onChange:function(e){return!e&&x(!1)}};return(0,o.jsx)(l.df,(0,a.Z)((0,a.Z)({},w),{},{children:(0,o.jsx)(l.df,{onChange:function(e){return e&&x(!0)},threshold:.6,children:(0,o.jsx)("div",{className:"section-wrap",children:(0,o.jsx)("div",{className:"row",children:(0,o.jsx)("div",{className:"col-3",children:S?(0,o.jsxs)("div",{className:"text-c",ref:v,style:S?{color:"#050505"}:{color:"#ffffff"},children:[null!==s.subtitle&&(0,o.jsx)("h6",{className:"subtitle",children:s.subtitle}),null!==s.title&&(0,o.jsx)("h2",{className:"title",children:s.title}),s.text.map((function(e,t){return(0,o.jsx)("p",{className:"text",children:s.text[t]},t)})),s.button&&(0,o.jsxs)("div",{className:"button-c",children:[(0,o.jsx)("a",{href:s.button.link,children:(0,o.jsx)("h6",{className:"button-text",children:s.button.text})}),(0,o.jsx)("div",{className:"button-visual"})]})]}):(0,o.jsxs)("div",{className:"text-c",ref:v,style:S?{color:"#050505"}:{color:"#ffffff"},children:[null!==s.subtitle&&(0,o.jsx)(c.a.h6,{className:"subtitle",style:j,children:s.subtitle}),null!==s.title&&(0,o.jsx)(c.a.h2,{className:"title",style:y,children:s.title}),null!==s.text&&s.text.map((function(e,t){return(0,o.jsx)(c.a.p,{className:"text",style:g[t],children:s.text[t]},t)}))]})})})})})}))},u=s(7960),f=(s(5817),s(7689));var h=function(e){var t=e.i,s=e.el,a=e.section,n=e.current,i=e.setCurrent,r=(e.visibleSection,e.setVisibleSection),c=(e.sectionSize,e.scroll,e.basename,(0,f.s0)()),d=(0,f.TH)().pathname.split("/");return(0,o.jsx)(l.df,{id:"view",ref:a,children:(0,o.jsx)(l.df,{className:"inView",onChange:function(e,s){return function(e,s){e&&r(t)}(e)},threshold:.6,children:(0,o.jsx)("div",{className:"section-wrap",children:(0,o.jsxs)("div",{className:"row",children:[(0,o.jsx)("div",{className:"col-2",children:(0,o.jsxs)("div",{className:"text-c",children:[(0,o.jsxs)("h6",{className:"subtitle",children:["/ ",s.number," ",s.subtitle]}),(0,o.jsx)("h2",{className:"title",children:s.title}),(0,o.jsx)("div",{className:"order-btns row",children:(0,o.jsxs)("div",{className:"order-btns",children:[(0,o.jsx)("a",{className:"order-btn prev",onTouchEnd:function(e){return n<=0&&(c("../".concat(d[1],"/").concat(u.a[u.a.length-1].id),{replace:!0}),i(u.a.length-1)),void(n>0&&(c("../".concat(d[1],"/").concat(u.a[n-1].id),{replace:!0}),i(n-1)))},children:(0,o.jsx)("p",{children:"Prev"})}),(0,o.jsx)("div",{className:"order-btn",children:(0,o.jsx)("p",{children:"/"})}),(0,o.jsx)("a",{className:"order-btn next",onTouchEnd:function(e){return n>=u.a.length-1&&(c("../".concat(d[1],"/").concat(u.a[0].id),{replace:!0}),i(0)),void(n<u.a.length-1&&(c("../".concat(d[1],"/").concat(u.a[n+1].id),{replace:!0}),i(n+1)))},children:(0,o.jsx)("p",{children:"Next"})})]})})]})}),(0,o.jsx)("div",{className:"col-1"})]})})})})};var x=function(e){var t=e.i,s=e.el,a=e.section,n=e.setVisibleSection,d=(0,i.useState)(),u=(0,r.Z)(d,2),f=u[0],h=u[1],x=(0,i.useState)(),m=(0,r.Z)(x,2),p=m[0],v=m[1];(0,i.useEffect)((function(){f&&n(t)}),[f]);var j=(0,c.q_)({opacity:p?0:.6}),y=(0,c.q_)({opacity:p?0:1});return(0,c.q_)({opacity:f?1:0,config:{duration:250}}),(0,o.jsx)(l.df,{id:"video",ref:a,onChange:h,threshold:.6,children:(0,o.jsxs)(c.a.div,{className:"video-c",onClick:function(){return v(!p)},children:[(0,o.jsxs)("div",{className:"video-overlay-c",children:[(0,o.jsx)(c.a.h6,{className:"subtitle",style:y,children:"Tap to Listen"}),(0,o.jsx)(c.a.div,{className:"video-overlay",style:j})]}),(0,o.jsx)("video",{className:"video",src:s.src,type:"video",autoPlay:!0,loop:!0,playsInline:!0,"webkit-playsinline":"true",muted:!p,height:"100%"})]})})};var m=function(e){var t=e.i,s=e.el,a=e.section,n=e.setVisibleSection,d=(0,i.useState)(),u=(0,r.Z)(d,2),f=u[0],h=u[1];return(0,i.useEffect)((function(){f&&n(t)}),[f]),(0,c.q_)({opacity:f?1:0,config:{duration:250}}),(0,o.jsxs)(l.df,{id:"image",ref:a,onChange:h,threshold:1,children:[(0,o.jsxs)("div",{className:"image-c",children:[(0,o.jsx)("div",{className:"image-overlay-c",children:(0,o.jsx)("div",{className:"image-overlay"})}),(0,o.jsx)("img",{className:"image",src:s.src,type:"image"})]}),(0,o.jsx)("div",{className:"parallax-back"})]})},p=s(7760),v=s(8537),j=s(5892),y=s(4637),g=s(4315);var N=function(e){e.loading;var t=e.setLoading,s=(e.handleStart,(0,i.useState)(0)),a=(0,r.Z)(s,2),l=a[0],d=a[1],u=(0,i.useState)(!1),f=(0,r.Z)(u,2),h=f[0],x=f[1],m=(0,i.useState)(!1),p=(0,r.Z)(m,2),v=p[0],j=p[1],y=(0,i.useState)([]),g=(0,r.Z)(y,2),N=g[0],b=g[1],S=(0,c.q_)(v&&{from:{opacity:1,pointerEvents:"all"},to:{opacity:0,pointerEvents:"none"},config:{duration:400},onRest:function(){return t(!1)}});(0,i.useEffect)((function(){h||(Number.isInteger(l/5)&&b((function(e){return[].concat((0,n.Z)(e),[l])})),99===l&&b((function(e){return[].concat((0,n.Z)(e),[100])})),setTimeout((function(){return d(l+1)}),30)),l>=99&&x(!0)}),[l]);var Z=30,w=l,Y=56*Math.PI,k=Y-w/100*Y,C=(0,i.useState)([]),E=(0,r.Z)(C,2),q=E[0],V=E[1];(0,i.useEffect)((function(){V((function(e){return Array(3).fill().map((function(t,s){return e[s]||[s]}))}))}),[]);var _=(0,c.bY)(q.length,q.map((function(e,t){return h?{from:{transform:"translateY(0) scale(".concat(0===t?4:1===t?1.2:1,")"),opacity:1},to:{transform:"translateY(0) scale(".concat(0===t?30:1===t?1.8:1,")"),opacity:0},delay:1===t?220*t:260,config:{mass:3,tension:280,friction:60}}:{from:{opacity:0,transform:"translateY(+20px) scale(".concat(0===t?3:1,")")},to:{opacity:1,transform:"translateY(0) scale(".concat(0===t?4:1.2,")")},delay:220*t,config:{mass:1,tension:120,friction:40}}}))),z=["c","a","n","i","s"],R=(0,c.ZI)(),I=(0,c.bY)(z.length,z.map((function(e,t){return h&&{from:{opacity:0,transform:"translateY(+20px)"},to:{opacity:1,transform:"translateY(0)"},delay:900+180*t,config:{},lettersRef:R,onRest:function(){}}}))),M=(0,i.useState)(!1),L=(0,r.Z)(M,2),T=L[0],B=L[1],D=(0,c.q_)({reset:!0,reverse:T,from:{opacity:0},to:{opacity:1},config:{duration:800},onRest:function(){return B(!T)}}),P=(0,c.q_)({opacity:h?1:0,delay:1800});return(0,o.jsxs)(c.a.div,{id:"loader",style:S,onClick:function(){h&&j(!0)},children:[(0,o.jsxs)(c.a.div,{className:"svg-c",style:_[0],children:[(0,o.jsx)("svg",{className:"svg-path",height:60,width:60,children:(0,o.jsx)("circle",{stroke:"#f4f4f4",fill:"transparent",strokeWidth:1,strokeDasharray:Y+" "+Y,style:{strokeDashoffset:k},r:28,cx:Z,cy:Z})}),(0,o.jsx)("svg",{className:"svg-back",height:60,width:60,children:(0,o.jsx)("circle",{stroke:"#202020",fill:"transparent",strokeWidth:1,style:{strokeDashoffset:k},r:28,cx:Z,cy:Z})})]}),(0,o.jsx)(c.a.div,{className:"loader-inner-c",style:_[1],children:(0,o.jsxs)("h1",{className:"loader-num",children:[N.slice(-1),"%"]})}),(0,o.jsxs)("div",{className:"header-c",children:[(0,o.jsx)("div",{className:"letters-c",children:I.map((function(e,t){return(0,o.jsx)(c.a.h1,{className:"letter",style:I[t],children:z[t]},t)}))}),(0,o.jsx)(c.a.h4,{className:"subtitle",style:P,children:"a ual group project"})]}),h?(0,o.jsx)(c.a.div,{className:"loader-text-c",children:(0,o.jsx)(c.a.p,{className:"loader-text",style:D,children:"Tap anywhere to continue."})}):(0,o.jsx)(c.a.div,{className:"loader-text-c",style:_[2],children:(0,o.jsx)(c.a.p,{className:"loader-text",style:D,children:"Loading..."})})]})};var b=function(e){var t=e.i,s=e.el,n=e.section,d=(e.sectionSize,e.setVisibleSection),u=(e.scrollContainer,e.scroll),f=e.data,h=(0,i.useRef)(),x=(0,i.useState)(!1),m=(0,r.Z)(x,2),b=m[0],S=m[1],Z=(0,i.useState)(!1),w=(0,r.Z)(Z,2),Y=w[0],k=w[1];(0,i.useEffect)((function(){Y&&d(t)}),[Y]);var C=(0,c.q_)({opacity:Y?1:0,config:{duration:250}});function E(e){e.orbit;var t=e.scroll,n=(0,i.useRef)(),r=(0,g.L)(s.object),c=r.nodes,l=r.materials;(0,i.useEffect)((function(){void 0!==l.main&&(l.main.map=null,l.main.color=new p.Color(4210752),l.main.transparent=!0),void 0!==l[""]&&(l[""].map=null,l[""].color=new p.Color(4210752),l[""].transparent=!0)}),[]),(0,v.A)((function(){b&&void 0!==n.current&&(n.current.rotation.y=t/800)})),(0,i.useEffect)((function(){if(void 0!==n.current){if(s.id&&(n.current.position.y=-1),"pierpay"===s.id){n.current.scale.x=3.2,n.current.scale.y=3.2,n.current.scale.z=3.2,n.current.position.x=1.2,n.current.position.y=-.4}if("cannon"===s.id&&(n.current.position.y=-1),"platform"===s.id){n.current.scale.x=1.8,n.current.scale.y=1.8,n.current.scale.z=1.8,n.current.position.y=-1}if("embstation"===s.id){n.current.scale.x=.5,n.current.scale.y=.5,n.current.scale.z=.5,n.current.position.y=-2}}}),[]);var d={ref:n,material:l.main,geometry:c.mesh.geometry};return(0,o.jsx)(i.Suspense,{fallback:(0,o.jsx)(N,{}),children:(0,o.jsx)("mesh",(0,a.Z)({},d))})}return(0,o.jsx)(l.df,{id:"detail",ref:n,onChange:S,children:(0,o.jsxs)(l.df,{onChange:k,threshold:.6,children:[(0,o.jsxs)("div",{className:"section-wrap",children:[(0,o.jsx)("div",{className:"col-3",children:(0,o.jsxs)(c.a.div,{className:"text-c",style:C,children:[(0,o.jsx)("h6",{className:"subtitle",children:s.subtitle}),(0,o.jsx)("h2",{className:"title",children:s.title}),(0,o.jsx)("p",{className:"text",children:s.text})]})}),(0,o.jsx)("div",{className:"col-2"})]}),(0,o.jsx)("div",{className:"canvas-wrap",style:"slider"===f[t+1].type||"light"===f[t+1].lightMode?{paddingBottom:"80px"}:{paddingBottom:"0px"},children:(0,o.jsxs)(j.Xz,{camera:{position:[0,1.5,7],fov:50},gl:{antialias:!0,pixelRatio:window.devicePixelRatio},shadows:!0,children:[(0,o.jsx)("pointLight",{position:[4,5,4],intensity:1.2}),(0,o.jsx)("pointLight",{position:[0,-30,-10],intensity:.8}),(0,o.jsx)(y.z,(0,a.Z)({ref:h},{maxDistance:6,minDistance:2})),b&&(0,o.jsx)(E,{orbit:h,scroll:u})]})})]})})};s(5255);var S=function(e){var t=e.i,s=e.el,n=e.section,d=e.setVisibleSection,f=(e.slowFixed,e.scroll,(0,i.useState)()),h=(0,r.Z)(f,2),x=h[0],m=h[1];(0,i.useEffect)((function(){x&&d(t)}),[x]);var p=(0,i.useState)(),v=(0,r.Z)(p,2),j=v[0],y=v[1];(0,i.useEffect)((function(){"light"===s.lightMode&&y(!0),"dark"===s.lightMode&&y(!1)}),[]);var g=(0,c.bY)(s.images.length,s.images.map((function(e,t){return x?{from:{opacity:0,transform:"translateY(+20px)"},to:{opacity:1,transform:"translateY(0px)"},delay:220*t,config:{mass:1,tension:120,friction:40}}:{from:{opacity:1,transform:"translateY(0px)"},to:{opacity:0,transform:"translateY(-20px)"},delay:220*t,config:{mass:1,tension:120,friction:40}}}))),N=(0,c.q_)({opacity:x?1:0,config:{duration:250}}),b={id:"slider",ref:n,onChange:m,threshold:.6};return(0,o.jsxs)(l.df,(0,a.Z)((0,a.Z)({style:j?{background:"#f4f4f4"}:{background:"#050505"}},b),{},{children:[void 0!==u.a[t+1]&&"text"!==u.a[t-1].type&&(0,o.jsx)("div",{className:"top-spacer"}),(0,o.jsx)("div",{className:"content-wrap",children:(0,o.jsx)(c.a.h6,{className:"subtitle",style:N,children:s.subtitle})}),(0,o.jsx)("div",{className:"slider",children:(0,o.jsx)("ul",{className:"card-row",children:s.images.map((function(e,t){return(0,o.jsxs)(c.a.li,{className:"card",style:g[t],children:[(0,o.jsx)("div",{className:"thumbnail",children:(0,o.jsx)("img",{src:e.src})}),(0,o.jsxs)("div",{className:"text-c",style:j?{color:"#050505"}:{color:"#fff"},children:[(0,o.jsx)("h6",{className:"subtitle",style:j?{color:"#707070"}:{color:"#959595"},children:e.subtitle}),(0,o.jsx)("h4",{className:"title",children:e.title})]})]},t)}))})}),void 0!==u.a[t+1]&&"slider"!==u.a[t+1].type&&(0,o.jsx)("div",{className:"bottom-spacer"})]}))};var Z=function(e){var t=e.i,s=e.el,n=e.section,d=e.setVisibleSection,u=(e.slow3,e.scrollContainer,e.scroll,(0,i.useState)(!1)),f=(0,r.Z)(u,2),h=f[0],x=f[1];(0,i.useEffect)((function(){h&&d(t)}),[h]);var m=(0,c.q_)({opacity:h?1:0,transform:h?"translateY(0)":"translateY(20px)",delay:100,config:{duration:250}}),p=(0,c.q_)({opacity:h?1:0,transform:h?"translateY(0)":"translateY(20px)",delay:200,config:{duration:250}}),v=(0,c.q_)({opacity:h?1:0,transform:h?"translateY(0)":"translateY(20px)",delay:300,config:{duration:250}}),j=(0,i.useState)(),y=(0,r.Z)(j,2),g=y[0],N=y[1];(0,i.useEffect)((function(){"light"===s.lightMode&&N(!0),"dark"===s.lightMode&&N(!1)}),[]);var b={id:"title",ref:n,style:g?{background:"#f4f4f4",paddingBottom:0}:{background:"#050505",paddingBottom:"60px"},onChange:x,threshold:.6};return(0,o.jsx)(l.df,(0,a.Z)((0,a.Z)({},b),{},{children:(0,o.jsxs)("div",{className:"section-wrap",children:[(0,o.jsx)("div",{className:"line"}),(0,o.jsx)("div",{className:"row",children:(0,o.jsx)("div",{className:"col-3",children:g?(0,o.jsxs)("div",{className:"text-c",style:g?{color:"#050505"}:{color:"#ffffff"},children:[(0,o.jsx)("h6",{className:"subtitle",children:s.subtitle}),(0,o.jsx)("h2",{className:"title",children:s.title}),(0,o.jsx)("p",{className:"text",children:s.text}),s.button&&(0,o.jsxs)("div",{className:"button-c",children:[(0,o.jsx)("a",{href:s.button.link,children:(0,o.jsx)("h6",{className:"button-text",children:s.button.text})}),(0,o.jsx)("div",{className:"button-visual"})]})]}):(0,o.jsxs)("div",{className:"text-c",style:g?{color:"#050505"}:{color:"#ffffff"},children:[(0,o.jsx)(c.a.h6,{className:"subtitle",style:m,children:s.subtitle}),(0,o.jsx)(c.a.h2,{className:"title",style:p,children:s.title}),(0,o.jsx)(c.a.p,{className:"text",style:v,children:s.text})]})})})]})}))},w=s(4728);var Y=function(e){var t=e.current,s=e.setCurrent,r=e.scroll,c=e.onScroll,l=e.setScroll,f=e.scrollContainer,p=e.setIsInView,v=e.visibleSection,j=e.setVisibleSection,y=e.sections,g=e.setSection,N=e.sectionSize,Y=e.setSectionSize,k=e.setProjectHeight;(0,i.useEffect)((function(){g((function(e){return Array(u.a[t].sections.length).fill().map((function(t,s){return e[s]||(0,i.createRef)()}))}))}),[]),(0,i.useEffect)((function(){if(y.length===u.a.length){var e=0;y.map((function(t,s){var a=t.current.node.getBoundingClientRect().height;Y((function(e){return[].concat((0,n.Z)(e),[a])})),e+=a.height,k(e)}))}}),[y]),(0,i.useEffect)((function(){u.a.map((function(e,t){e.index=t}))}),[]);var C={scroll:r,setScroll:l,scrollContainer:f,current:t,setCurrent:s,visibleSection:v,setIsInView:p,setVisibleSection:j,sectionSize:N},E={scroll:r,scrollContainer:f,setVisibleSection:j,data:u.a[t].sections},q={scroll:r,scrollContainer:f,setVisibleSection:j,sectionSize:N,data:u.a[t].sections},V={scroll:r,scrollContainer:f,setVisibleSection:j};return(0,o.jsx)("div",{id:"scroller",ref:f,onScroll:c,children:u.a[t].sections.map((function(e,t){switch(e.type){default:return(0,o.jsx)("div",{className:"space"},t);case"title":return(0,o.jsx)(Z,(0,a.Z)({i:t,el:e,section:y[t]},E),t);case"text":return(0,o.jsx)(d,(0,a.Z)({i:t,el:e,section:y[t]},E),t);case"view":return(0,o.jsx)(h,(0,a.Z)({i:t,el:e,section:y[t]},C),t);case"video":return(0,o.jsx)(x,(0,a.Z)({i:t,el:e,section:y[t]},V),t);case"image":return(0,o.jsx)(m,(0,a.Z)({i:t,el:e,section:y[t]},V),t);case"detail":return(0,o.jsx)(b,(0,a.Z)({i:t,el:e,section:y[t]},q),t);case"slider":return(0,o.jsx)(S,(0,a.Z)({i:t,el:e,section:y[t]},q),t);case"button":return(0,o.jsx)(w.Z,(0,a.Z)({i:t,el:e,section:y[t]},C),t)}}))})}}}]);
//# sourceMappingURL=52.6f3de10a.chunk.js.map