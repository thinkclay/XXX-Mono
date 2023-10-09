(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5731],{94047:function(){},53654:function(t,e,r){"use strict";r.d(e,{Wo:function(){return CircularProgressbarWithChildren},y3:function(){return buildStyles}});var n=r(55444),extendStatics=function(t,e){return(extendStatics=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)},__assign=function(){return(__assign=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var a in e=arguments[r])Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t}).apply(this,arguments)};function Path(t){var e,r,a,o,i,s,l,c=t.className,u=t.counterClockwise,d=t.dashRatio,h=t.pathRadius,p=t.strokeWidth,f=t.style;return(0,n.createElement)("path",{className:c,style:Object.assign({},f,(r=(e={pathRadius:h,dashRatio:d,counterClockwise:u}).counterClockwise,o=(1-e.dashRatio)*(a=2*Math.PI*e.pathRadius),{strokeDasharray:a+"px "+a+"px",strokeDashoffset:(r?-o:o)+"px"})),d:"\n      M 50,50\n      m 0,-"+(s=(i={pathRadius:h,counterClockwise:u}).pathRadius)+"\n      a "+s+","+s+" "+(l=i.counterClockwise?1:0)+" 1 1 0,"+2*s+"\n      a "+s+","+s+" "+l+" 1 1 0,-"+2*s+"\n    ",strokeWidth:p,fillOpacity:0})}var a=function(t){function CircularProgressbar(){return null!==t&&t.apply(this,arguments)||this}return!function(t,e){function __(){this.constructor=t}extendStatics(t,e),t.prototype=null===e?Object.create(e):(__.prototype=e.prototype,new __)}(CircularProgressbar,t),CircularProgressbar.prototype.getBackgroundPadding=function(){return this.props.background?this.props.backgroundPadding:0},CircularProgressbar.prototype.getPathRadius=function(){return 50-this.props.strokeWidth/2-this.getBackgroundPadding()},CircularProgressbar.prototype.getPathRatio=function(){var t=this.props,e=t.value,r=t.minValue,n=t.maxValue;return(Math.min(Math.max(e,r),n)-r)/(n-r)},CircularProgressbar.prototype.render=function(){var t=this.props,e=t.circleRatio,r=t.className,a=t.classes,o=t.counterClockwise,i=t.styles,s=t.strokeWidth,l=t.text,c=this.getPathRadius(),u=this.getPathRatio();return(0,n.createElement)("svg",{className:a.root+" "+r,style:i.root,viewBox:"0 0 100 100","data-test-id":"CircularProgressbar"},this.props.background?(0,n.createElement)("circle",{className:a.background,style:i.background,cx:50,cy:50,r:50}):null,(0,n.createElement)(Path,{className:a.trail,counterClockwise:o,dashRatio:e,pathRadius:c,strokeWidth:s,style:i.trail}),(0,n.createElement)(Path,{className:a.path,counterClockwise:o,dashRatio:u*e,pathRadius:c,strokeWidth:s,style:i.path}),l?(0,n.createElement)("text",{className:a.text,style:i.text,x:50,y:50},l):null)},CircularProgressbar.defaultProps={background:!1,backgroundPadding:0,circleRatio:1,classes:{root:"CircularProgressbar",trail:"CircularProgressbar-trail",path:"CircularProgressbar-path",text:"CircularProgressbar-text",background:"CircularProgressbar-background"},counterClockwise:!1,className:"",maxValue:100,minValue:0,strokeWidth:8,styles:{root:{},trail:{},path:{},text:{},background:{}},text:""},CircularProgressbar}(n.Component);function CircularProgressbarWithChildren(t){t.children;var e=function(t,e){var r={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&0>e.indexOf(n)&&(r[n]=t[n]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols)for(var a=0,n=Object.getOwnPropertySymbols(t);a<n.length;a++)0>e.indexOf(n[a])&&(r[n[a]]=t[n[a]]);return r}(t,["children"]);return(0,n.createElement)("div",{"data-test-id":"CircularProgressbarWithChildren"},(0,n.createElement)("div",{style:{position:"relative",width:"100%",height:"100%"}},(0,n.createElement)(a,__assign({},e)),t.children?(0,n.createElement)("div",{"data-test-id":"CircularProgressbarWithChildren__children",style:{position:"absolute",width:"100%",height:"100%",marginTop:"-100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}},t.children):null))}function buildStyles(t){var e=t.rotation,r=t.strokeLinecap,n=t.textColor,a=t.textSize,o=t.pathColor,i=t.pathTransition,s=t.pathTransitionDuration,l=t.trailColor,c=t.backgroundColor,u=null==e?void 0:"rotate("+e+"turn)",d=null==e?void 0:"center center";return{root:{},path:removeUndefinedValues({stroke:o,strokeLinecap:r,transform:u,transformOrigin:d,transition:i,transitionDuration:null==s?void 0:s+"s"}),trail:removeUndefinedValues({stroke:l,strokeLinecap:r,transform:u,transformOrigin:d}),text:removeUndefinedValues({fill:n,fontSize:a}),background:removeUndefinedValues({fill:c})}}function removeUndefinedValues(t){return Object.keys(t).forEach(function(e){null==t[e]&&delete t[e]}),t}},75559:function(t,e,r){"use strict";r.d(e,{w_:function(){return GenIcon}});var n=r(55444),a={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},o=n.createContext&&n.createContext(a),__assign=function(){return(__assign=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var a in e=arguments[r])Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t}).apply(this,arguments)},__rest=function(t,e){var r={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&0>e.indexOf(n)&&(r[n]=t[n]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols)for(var a=0,n=Object.getOwnPropertySymbols(t);a<n.length;a++)0>e.indexOf(n[a])&&Object.prototype.propertyIsEnumerable.call(t,n[a])&&(r[n[a]]=t[n[a]]);return r};function GenIcon(t){return function(e){return n.createElement(IconBase,__assign({attr:__assign({},t.attr)},e),function Tree2Element(t){return t&&t.map(function(t,e){return n.createElement(t.tag,__assign({key:e},t.attr),Tree2Element(t.child))})}(t.child))}}function IconBase(t){var elem=function(e){var r,a=t.attr,o=t.size,i=t.title,s=__rest(t,["attr","size","title"]),l=o||e.size||"1em";return e.className&&(r=e.className),t.className&&(r=(r?r+" ":"")+t.className),n.createElement("svg",__assign({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},e.attr,a,s,{className:r,style:__assign(__assign({color:t.color||e.color},e.style),t.style),height:l,width:l,xmlns:"http://www.w3.org/2000/svg"}),i&&n.createElement("title",null,i),t.children)};return void 0!==o?n.createElement(o.Consumer,null,function(t){return elem(t)}):elem(a)}},28991:function(t,e,r){"use strict";r.d(e,{J:function(){return c}});var n=r(64879),a=r(64803),o=r(91262),i=r(81431),s=r(18708),l={path:(0,s.jsxs)("g",{stroke:"currentColor",strokeWidth:"1.5",children:[(0,s.jsx)("path",{strokeLinecap:"round",fill:"none",d:"M9,9a3,3,0,1,1,4,2.829,1.5,1.5,0,0,0-1,1.415V14.25"}),(0,s.jsx)("path",{fill:"currentColor",strokeLinecap:"round",d:"M12,17.25a.375.375,0,1,0,.375.375A.375.375,0,0,0,12,17.25h0"}),(0,s.jsx)("circle",{fill:"none",strokeMiterlimit:"10",cx:"12",cy:"12",r:"11.25"})]}),viewBox:"0 0 24 24"},c=(0,n.G)((t,e)=>{let{as:r,viewBox:n,color:c="currentColor",focusable:u=!1,children:d,className:h,__css:p,...f}=t,g=(0,i.cx)("chakra-icon",h),m=(0,a.mq)("Icon",t),y={w:"1em",h:"1em",display:"inline-block",lineHeight:"1em",flexShrink:0,color:c,...p,...m},b={ref:e,focusable:u,className:g,__css:y},k=null!=n?n:l.viewBox;if(r&&"string"!=typeof r)return(0,s.jsx)(o.m.svg,{as:r,...b,...f});let v=null!=d?d:l.path;return(0,s.jsx)(o.m.svg,{verticalAlign:"middle",viewBox:k,...b,...f,children:v})});c.displayName="Icon"},93918:function(t,e,r){"use strict";r.d(e,{W:function(){return getValidChildren}});var n=r(55444);function getValidChildren(t){return n.Children.toArray(t).filter(t=>(0,n.isValidElement)(t))}}}]);