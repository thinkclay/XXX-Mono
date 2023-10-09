(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2118],{63081:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{requestIdleCallback:function(){return n},cancelIdleCallback:function(){return r}});let n="undefined"!=typeof self&&self.requestIdleCallback&&self.requestIdleCallback.bind(window)||function(e){let t=Date.now();return self.setTimeout(function(){e({didTimeout:!1,timeRemaining:function(){return Math.max(0,50-(Date.now()-t))}})},1)},r="undefined"!=typeof self&&self.cancelIdleCallback&&self.cancelIdleCallback.bind(window)||function(e){return clearTimeout(e)};("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},37552:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"useIntersection",{enumerable:!0,get:function(){return useIntersection}});let r=n(55444),i=n(63081),o="function"==typeof IntersectionObserver,l=new Map,a=[];function useIntersection(e){let{rootRef:t,rootMargin:n,disabled:s}=e,u=s||!o,[c,f]=(0,r.useState)(!1),d=(0,r.useRef)(null),m=(0,r.useCallback)(e=>{d.current=e},[]);(0,r.useEffect)(()=>{if(o){if(u||c)return;let e=d.current;if(e&&e.tagName){let r=function(e,t,n){let{id:r,observer:i,elements:o}=function(e){let t;let n={root:e.root||null,margin:e.rootMargin||""},r=a.find(e=>e.root===n.root&&e.margin===n.margin);if(r&&(t=l.get(r)))return t;let i=new Map,o=new IntersectionObserver(e=>{e.forEach(e=>{let t=i.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)})},e);return t={id:n,observer:o,elements:i},a.push(n),l.set(n,t),t}(n);return o.set(e,t),i.observe(e),function(){if(o.delete(e),i.unobserve(e),0===o.size){i.disconnect(),l.delete(r);let e=a.findIndex(e=>e.root===r.root&&e.margin===r.margin);e>-1&&a.splice(e,1)}}}(e,e=>e&&f(e),{root:null==t?void 0:t.current,rootMargin:n});return r}}else if(!c){let e=(0,i.requestIdleCallback)(()=>f(!0));return()=>(0,i.cancelIdleCallback)(e)}},[u,n,t,c,d.current]);let p=(0,r.useCallback)(()=>{f(!1)},[]);return[m,c,p]}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},32859:function(e,t,n){e.exports=n(97892)},68571:function(e){var t,n,r,i=e.exports={};function defaultSetTimout(){throw Error("setTimeout has not been defined")}function defaultClearTimeout(){throw Error("clearTimeout has not been defined")}function runTimeout(e){if(t===setTimeout)return setTimeout(e,0);if((t===defaultSetTimout||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(n){try{return t.call(null,e,0)}catch(n){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:defaultSetTimout}catch(e){t=defaultSetTimout}try{n="function"==typeof clearTimeout?clearTimeout:defaultClearTimeout}catch(e){n=defaultClearTimeout}}();var o=[],l=!1,a=-1;function cleanUpNextTick(){l&&r&&(l=!1,r.length?o=r.concat(o):a=-1,o.length&&drainQueue())}function drainQueue(){if(!l){var e=runTimeout(cleanUpNextTick);l=!0;for(var t=o.length;t;){for(r=o,o=[];++a<t;)r&&r[a].run();a=-1,t=o.length}r=null,l=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===defaultClearTimeout||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}(e)}}function Item(e,t){this.fun=e,this.array=t}function noop(){}i.nextTick=function(e){var t=Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];o.push(new Item(e,t)),1!==o.length||l||runTimeout(drainQueue)},Item.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=noop,i.addListener=noop,i.once=noop,i.off=noop,i.removeListener=noop,i.removeAllListeners=noop,i.emit=noop,i.prependListener=noop,i.prependOnceListener=noop,i.listeners=function(e){return[]},i.binding=function(e){throw Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(e){throw Error("process.chdir is not supported")},i.umask=function(){return 0}},75559:function(e,t,n){"use strict";n.d(t,{w_:function(){return GenIcon}});var r=n(55444),i={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},o=r.createContext&&r.createContext(i),__assign=function(){return(__assign=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)},__rest=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&0>t.indexOf(r)&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)0>t.indexOf(r[i])&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]]);return n};function GenIcon(e){return function(t){return r.createElement(IconBase,__assign({attr:__assign({},e.attr)},t),function Tree2Element(e){return e&&e.map(function(e,t){return r.createElement(e.tag,__assign({key:t},e.attr),Tree2Element(e.child))})}(e.child))}}function IconBase(e){var elem=function(t){var n,i=e.attr,o=e.size,l=e.title,a=__rest(e,["attr","size","title"]),s=o||t.size||"1em";return t.className&&(n=t.className),e.className&&(n=(n?n+" ":"")+e.className),r.createElement("svg",__assign({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,i,a,{className:n,style:__assign(__assign({color:e.color||t.color},t.style),e.style),height:s,width:s,xmlns:"http://www.w3.org/2000/svg"}),l&&r.createElement("title",null,l),e.children)};return void 0!==o?r.createElement(o.Consumer,null,function(e){return elem(e)}):elem(i)}},98255:function(e,t,n){"use strict";n.d(t,{z:function(){return p}});var r=n(55444),[i,o]=(0,n(99577).k)({strict:!1,name:"ButtonGroupContext"}),l=n(91262),a=n(81431),s=n(18708);function ButtonIcon(e){let{children:t,className:n,...i}=e,o=(0,r.isValidElement)(t)?(0,r.cloneElement)(t,{"aria-hidden":!0,focusable:!1}):t,u=(0,a.cx)("chakra-button__icon",n);return(0,s.jsx)(l.m.span,{display:"inline-flex",alignSelf:"center",flexShrink:0,...i,className:u,children:o})}ButtonIcon.displayName="ButtonIcon";var u=n(26537);function ButtonSpinner(e){let{label:t,placement:n,spacing:i="0.5rem",children:o=(0,s.jsx)(u.$,{color:"currentColor",width:"1em",height:"1em"}),className:c,__css:f,...d}=e,m=(0,a.cx)("chakra-button__spinner",c),p="start"===n?"marginEnd":"marginStart",h=(0,r.useMemo)(()=>({display:"flex",alignItems:"center",position:t?"relative":"absolute",[p]:t?i:0,fontSize:"1em",lineHeight:"normal",...f}),[f,t,p,i]);return(0,s.jsx)(l.m.div,{className:m,...d,__css:h,children:o})}ButtonSpinner.displayName="ButtonSpinner";var c=n(47809),f=n(64879),d=n(64803),m=n(8973),p=(0,f.G)((e,t)=>{let n=o(),i=(0,d.mq)("Button",{...n,...e}),{isDisabled:u=null==n?void 0:n.isDisabled,isLoading:f,isActive:p,children:h,leftIcon:x,rightIcon:v,loadingText:y,iconSpacing:g="0.5rem",type:b,spinner:_,spinnerPlacement:C="start",className:k,as:j,...I}=(0,m.Lr)(e),S=(0,r.useMemo)(()=>{let e={...null==i?void 0:i._focus,zIndex:1};return{display:"inline-flex",appearance:"none",alignItems:"center",justifyContent:"center",userSelect:"none",position:"relative",whiteSpace:"nowrap",verticalAlign:"middle",outline:"none",...i,...!!n&&{_focus:e}}},[i,n]),{ref:N,type:w}=function(e){let[t,n]=(0,r.useState)(!e),i=(0,r.useCallback)(e=>{e&&n("BUTTON"===e.tagName)},[]);return{ref:i,type:t?"button":void 0}}(j),E={rightIcon:v,leftIcon:x,iconSpacing:g,children:h};return(0,s.jsxs)(l.m.button,{ref:(0,c.qq)(t,N),as:j,type:null!=b?b:w,"data-active":(0,a.PB)(p),"data-loading":(0,a.PB)(f),__css:S,className:(0,a.cx)("chakra-button",k),...I,disabled:u||f,children:[f&&"start"===C&&(0,s.jsx)(ButtonSpinner,{className:"chakra-button__spinner--start",label:y,placement:"start",spacing:g,children:_}),f?y||(0,s.jsx)(l.m.span,{opacity:0,children:(0,s.jsx)(ButtonContent,{...E})}):(0,s.jsx)(ButtonContent,{...E}),f&&"end"===C&&(0,s.jsx)(ButtonSpinner,{className:"chakra-button__spinner--end",label:y,placement:"end",spacing:g,children:_})]})});function ButtonContent(e){let{leftIcon:t,rightIcon:n,children:r,iconSpacing:i}=e;return(0,s.jsxs)(s.Fragment,{children:[t&&(0,s.jsx)(ButtonIcon,{marginEnd:i,children:t}),r,n&&(0,s.jsx)(ButtonIcon,{marginStart:i,children:n})]})}p.displayName="Button"},4106:function(e,t,n){"use strict";n.d(t,{Z:function(){return f}});var[r,i]=(0,n(91449).eC)("Card"),o=n(81431),l=n(64879),a=n(8973),s=n(64803),u=n(91262),c=n(18708),f=(0,l.G)(function(e,t){let{className:n,children:i,direction:l="column",justify:f,align:d,...m}=(0,a.Lr)(e),p=(0,s.jC)("Card",e);return(0,c.jsx)(u.m.div,{ref:t,className:(0,o.cx)("chakra-card",n),__css:{display:"flex",flexDirection:l,justifyContent:f,alignItems:d,position:"relative",minWidth:0,wordWrap:"break-word",...p.container},...m,children:(0,c.jsx)(r,{value:p,children:i})})})},59784:function(e,t,n){"use strict";n.d(t,{X:function(){return g}});var r=n(55444),[i,o]=(0,n(99577).k)({name:"CheckboxGroupContext",strict:!1}),l=n(91262),a=n(18708);function CheckIcon(e){return(0,a.jsx)(l.m.svg,{width:"1.2em",viewBox:"0 0 12 10",style:{fill:"none",strokeWidth:2,stroke:"currentColor",strokeDasharray:16},...e,children:(0,a.jsx)("polyline",{points:"1.5 6 4.5 9 10.5 1"})})}function IndeterminateIcon(e){return(0,a.jsx)(l.m.svg,{width:"1.2em",viewBox:"0 0 24 24",style:{stroke:"currentColor",strokeWidth:4},...e,children:(0,a.jsx)("line",{x1:"21",x2:"3",y1:"12",y2:"12"})})}function CheckboxIcon(e){let{isIndeterminate:t,isChecked:n,...r}=e,i=t?IndeterminateIcon:CheckIcon;return n||t?(0,a.jsx)(l.m.div,{style:{display:"flex",alignItems:"center",justifyContent:"center",height:"100%"},children:(0,a.jsx)(i,{...r})}):null}var s=n(14091),u=n(81431),c=n(2659),f=n(64879),d=n(64803),m=n(8973),p={display:"inline-flex",alignItems:"center",justifyContent:"center",verticalAlign:"top",userSelect:"none",flexShrink:0},h={cursor:"pointer",display:"inline-flex",alignItems:"center",verticalAlign:"top",position:"relative"},x=(0,c.F4)({from:{opacity:0,strokeDashoffset:16,transform:"scale(0.95)"},to:{opacity:1,strokeDashoffset:0,transform:"scale(1)"}}),v=(0,c.F4)({from:{opacity:0},to:{opacity:1}}),y=(0,c.F4)({from:{transform:"scaleX(0.65)"},to:{transform:"scaleX(1)"}}),g=(0,f.G)(function(e,t){let n=o(),i={...n,...e},c=(0,d.jC)("Checkbox",i),f=(0,m.Lr)(e),{spacing:g="0.5rem",className:b,children:_,iconColor:C,iconSize:k,icon:j=(0,a.jsx)(CheckboxIcon,{}),isChecked:I,isDisabled:S=null==n?void 0:n.isDisabled,onChange:N,inputProps:w,...E}=f,T=I;(null==n?void 0:n.value)&&f.value&&(T=n.value.includes(f.value));let B=N;(null==n?void 0:n.onChange)&&f.value&&(B=(0,u.PP)(n.onChange,N));let{state:G,getInputProps:O,getCheckboxProps:L,getLabelProps:R,getRootProps:P}=(0,s.O)({...E,isDisabled:S,isChecked:T,onChange:B}),M=function(e){let[t,n]=(0,r.useState)(e),[i,o]=(0,r.useState)(!1);return e!==t&&(o(!0),n(e)),i}(G.isChecked),q=(0,r.useMemo)(()=>({animation:M?G.isIndeterminate?`${v} 20ms linear, ${y} 200ms linear`:`${x} 200ms linear`:void 0,fontSize:k,color:C,...c.icon}),[C,k,M,G.isIndeterminate,c.icon]),z=(0,r.cloneElement)(j,{__css:q,isIndeterminate:G.isIndeterminate,isChecked:G.isChecked});return(0,a.jsxs)(l.m.label,{__css:{...h,...c.container},className:(0,u.cx)("chakra-checkbox",b),...P(),children:[(0,a.jsx)("input",{className:"chakra-checkbox__input",...O(w,t)}),(0,a.jsx)(l.m.span,{__css:{...p,...c.control},className:"chakra-checkbox__control",...L(),children:z}),_&&(0,a.jsx)(l.m.span,{className:"chakra-checkbox__label",...R(),__css:{marginStart:g,...c.label},children:_})]})});g.displayName="Checkbox"},16622:function(e,t,n){"use strict";n.d(t,{l:function(){return c}});var r=n(13610),i=n(64879),o=n(64803),l=n(8973),a=n(91262),s=n(81431),u=n(18708),c=(0,i.G)(function(e,t){var n;let i=(0,o.mq)("FormLabel",e),c=(0,l.Lr)(e),{className:d,children:m,requiredIndicator:p=(0,u.jsx)(f,{}),optionalIndicator:h=null,...x}=c,v=(0,r.NJ)(),y=null!=(n=null==v?void 0:v.getLabelProps(x,t))?n:{ref:t,...x};return(0,u.jsxs)(a.m.label,{...y,className:(0,s.cx)("chakra-form__label",c.className),__css:{display:"block",textAlign:"start",...i},children:[m,(null==v?void 0:v.isRequired)?p:h]})});c.displayName="FormLabel";var f=(0,i.G)(function(e,t){let n=(0,r.NJ)(),i=(0,r.e)();if(!(null==n?void 0:n.isRequired))return null;let o=(0,s.cx)("chakra-form__required-indicator",e.className);return(0,u.jsx)(a.m.span,{...null==n?void 0:n.getRequiredIndicatorProps(e,t),__css:i.requiredIndicator,className:o})});f.displayName="RequiredIndicator"},28991:function(e,t,n){"use strict";n.d(t,{J:function(){return u}});var r=n(64879),i=n(64803),o=n(91262),l=n(81431),a=n(18708),s={path:(0,a.jsxs)("g",{stroke:"currentColor",strokeWidth:"1.5",children:[(0,a.jsx)("path",{strokeLinecap:"round",fill:"none",d:"M9,9a3,3,0,1,1,4,2.829,1.5,1.5,0,0,0-1,1.415V14.25"}),(0,a.jsx)("path",{fill:"currentColor",strokeLinecap:"round",d:"M12,17.25a.375.375,0,1,0,.375.375A.375.375,0,0,0,12,17.25h0"}),(0,a.jsx)("circle",{fill:"none",strokeMiterlimit:"10",cx:"12",cy:"12",r:"11.25"})]}),viewBox:"0 0 24 24"},u=(0,r.G)((e,t)=>{let{as:n,viewBox:r,color:u="currentColor",focusable:c=!1,children:f,className:d,__css:m,...p}=e,h=(0,l.cx)("chakra-icon",d),x=(0,i.mq)("Icon",e),v={w:"1em",h:"1em",display:"inline-block",lineHeight:"1em",flexShrink:0,color:u,...m,...x},y={ref:t,focusable:c,className:h,__css:v},g=null!=r?r:s.viewBox;if(n&&"string"!=typeof n)return(0,a.jsx)(o.m.svg,{as:n,...y,...p});let b=null!=f?f:s.path;return(0,a.jsx)(o.m.svg,{verticalAlign:"middle",viewBox:g,...y,...p,children:b})});u.displayName="Icon"},83135:function(e,t,n){"use strict";n.d(t,{Z:function(){return c},x:function(){return f}});var r=n(62576),i=n(91262),o=n(64879),l=n(81431),a=n(18708),s=(0,i.m)("div",{baseStyle:{display:"flex",alignItems:"center",justifyContent:"center",position:"absolute",top:"0",zIndex:2}}),u=(0,o.G)(function(e,t){var n,i;let{placement:o="left",...l}=e,u=(0,r.m)(),c=u.field,f={["left"===o?"insetStart":"insetEnd"]:"0",width:null!=(n=null==c?void 0:c.height)?n:null==c?void 0:c.h,height:null!=(i=null==c?void 0:c.height)?i:null==c?void 0:c.h,fontSize:null==c?void 0:c.fontSize,...u.element};return(0,a.jsx)(s,{ref:t,__css:f,...l})});u.id="InputElement",u.displayName="InputElement";var c=(0,o.G)(function(e,t){let{className:n,...r}=e,i=(0,l.cx)("chakra-input__left-element",n);return(0,a.jsx)(u,{ref:t,placement:"left",className:i,...r})});c.id="InputLeftElement",c.displayName="InputLeftElement";var f=(0,o.G)(function(e,t){let{className:n,...r}=e,i=(0,l.cx)("chakra-input__right-element",n);return(0,a.jsx)(u,{ref:t,placement:"right",className:i,...r})});f.id="InputRightElement",f.displayName="InputRightElement"},51192:function(e,t,n){"use strict";n.d(t,{I:function(){return c}});var r=n(87043),i=n(64879),o=n(64803),l=n(8973),a=n(91262),s=n(81431),u=n(18708),c=(0,i.G)(function(e,t){let{htmlSize:n,...i}=e,c=(0,o.jC)("Input",i),f=(0,l.Lr)(i),d=(0,r.Y)(f),m=(0,s.cx)("chakra-input",e.className);return(0,u.jsx)(a.m.input,{size:n,...d,__css:c.field,ref:t,className:m})});c.displayName="Input",c.id="Input"},62576:function(e,t,n){"use strict";n.d(t,{B:function(){return h},m:function(){return p}});var r=n(99577),i=n(93918),o=n(64879),l=n(64803),a=n(8973),s=n(91262),u=n(81431),c=n(9365),f=n(55444),d=n(18708),[m,p]=(0,r.k)({name:"InputGroupStylesContext",errorMessage:"useInputGroupStyles returned is 'undefined'. Seems you forgot to wrap the components in \"<InputGroup />\" "}),h=(0,o.G)(function(e,t){let n=(0,l.jC)("Input",e),{children:r,className:o,...p}=(0,a.Lr)(e),h=(0,u.cx)("chakra-input__group",o),x={},v=(0,i.W)(r),y=n.field;v.forEach(e=>{var t,r;n&&(y&&"InputLeftElement"===e.type.id&&(x.paddingStart=null!=(t=y.height)?t:y.h),y&&"InputRightElement"===e.type.id&&(x.paddingEnd=null!=(r=y.height)?r:y.h),"InputRightAddon"===e.type.id&&(x.borderEndRadius=0),"InputLeftAddon"===e.type.id&&(x.borderStartRadius=0))});let g=v.map(t=>{var n,r;let i=(0,c.o)({size:(null==(n=t.props)?void 0:n.size)||e.size,variant:(null==(r=t.props)?void 0:r.variant)||e.variant});return"Input"!==t.type.id?(0,f.cloneElement)(t,i):(0,f.cloneElement)(t,Object.assign(i,x,t.props))});return(0,d.jsx)(s.m.div,{className:h,ref:t,__css:{width:"100%",display:"flex",position:"relative",isolation:"isolate",...n.group},"data-group":!0,...p,children:(0,d.jsx)(m,{value:n,children:g})})});h.displayName="InputGroup"},24842:function(e,t,n){"use strict";n.d(t,{x:function(){return c}});var r=n(64879),i=n(64803),o=n(8973),l=n(91262),a=n(81431),s=n(9365),u=n(18708),c=(0,r.G)(function(e,t){let n=(0,i.mq)("Text",e),{className:r,align:c,decoration:f,casing:d,...m}=(0,o.Lr)(e),p=(0,s.o)({textAlign:e.align,textDecoration:e.decoration,textTransform:e.casing});return(0,u.jsx)(l.m.p,{ref:t,className:(0,a.cx)("chakra-text",e.className),...p,...m,__css:n})});c.displayName="Text"},11853:function(e,t,n){"use strict";n.d(t,{X:function(){return u}});var r=n(64879),i=n(64803),o=n(8973),l=n(91262),a=n(81431),s=n(18708),u=(0,r.G)(function(e,t){let n=(0,i.mq)("Heading",e),{className:r,...u}=(0,o.Lr)(e);return(0,s.jsx)(l.m.h2,{ref:t,className:(0,a.cx)("chakra-heading",e.className),...u,__css:n})});u.displayName="Heading"},35085:function(e,t,n){"use strict";n.d(t,{k:function(){return l}});var r=n(64879),i=n(91262),o=n(18708),l=(0,r.G)(function(e,t){let{direction:n,align:r,justify:l,wrap:a,basis:s,grow:u,shrink:c,...f}=e;return(0,o.jsx)(i.m.div,{ref:t,__css:{display:"flex",flexDirection:n,alignItems:r,justifyContent:l,flexWrap:a,flexBasis:s,flexGrow:u,flexShrink:c},...f})});l.displayName="Flex"},53504:function(e,t,n){"use strict";n.d(t,{xu:function(){return l}});var r=n(91262),i=n(64879),o=n(18708),l=(0,r.m)("div");l.displayName="Box";var a=(0,i.G)(function(e,t){let{size:n,centerContent:r=!0,...i}=e;return(0,o.jsx)(l,{ref:t,boxSize:n,__css:{...r?{display:"flex",alignItems:"center",justifyContent:"center"}:{},flexShrink:0,flexGrow:0},...i})});a.displayName="Square",(0,i.G)(function(e,t){let{size:n,...r}=e;return(0,o.jsx)(a,{size:n,ref:t,borderRadius:"9999px",...r})}).displayName="Circle"},9365:function(e,t,n){"use strict";function compact(e){let t=Object.assign({},e);for(let e in t)void 0===t[e]&&delete t[e];return t}n.d(t,{o:function(){return compact}})},93918:function(e,t,n){"use strict";n.d(t,{W:function(){return getValidChildren}});var r=n(55444);function getValidChildren(e){return r.Children.toArray(e).filter(e=>(0,r.isValidElement)(e))}},99577:function(e,t,n){"use strict";n.d(t,{k:function(){return createContext}});var r=n(55444);function createContext(e={}){let{name:t,strict:n=!0,hookName:i="useContext",providerName:o="Provider",errorMessage:l,defaultValue:a}=e,s=(0,r.createContext)(a);return s.displayName=t,[s.Provider,function useContext(){var e;let t=(0,r.useContext)(s);if(!t&&n){let t=Error(null!=l?l:`${i} returned \`undefined\`. Seems you forgot to wrap component within ${o}`);throw t.name="ContextError",null==(e=Error.captureStackTrace)||e.call(Error,t,useContext),t}return t},s]}},84780:function(e,t,n){"use strict";n.d(t,{W:function(){return useCallbackRef}});var r=n(55444);function useCallbackRef(e,t=[]){let n=(0,r.useRef)(e);return(0,r.useEffect)(()=>{n.current=e}),(0,r.useCallback)((...e)=>{var t;return null==(t=n.current)?void 0:t.call(n,...e)},t)}},47809:function(e,t,n){"use strict";n.d(t,{lq:function(){return mergeRefs},qq:function(){return useMergeRefs}});var r=n(55444);function mergeRefs(...e){return t=>{e.forEach(e=>{!function(e,t){if(null!=e){if("function"==typeof e){e(t);return}try{e.current=t}catch(n){throw Error(`Cannot assign value '${t}' to ref '${e}'`)}}}(e,t)})}}function useMergeRefs(...e){return(0,r.useMemo)(()=>mergeRefs(...e),e)}},62322:function(e,t,n){"use strict";n.d(t,{r:function(){return useUpdateEffect}});var r=n(55444);function useUpdateEffect(e,t){let n=(0,r.useRef)(!1),i=(0,r.useRef)(!1);(0,r.useEffect)(()=>{let t=n.current,r=t&&i.current;if(r)return e();i.current=!0},t),(0,r.useEffect)(()=>(n.current=!0,()=>{n.current=!1}),[])}},26537:function(e,t,n){"use strict";n.d(t,{$:function(){return f}});var r=n(2659),i=n(64879),o=n(64803),l=n(8973),a=n(91262),s=n(81431),u=n(18708),c=(0,r.F4)({"0%":{transform:"rotate(0deg)"},"100%":{transform:"rotate(360deg)"}}),f=(0,i.G)((e,t)=>{let n=(0,o.mq)("Spinner",e),{label:r="Loading...",thickness:i="2px",speed:f="0.45s",emptyColor:d="transparent",className:m,...p}=(0,l.Lr)(e),h=(0,s.cx)("chakra-spinner",m),x={display:"inline-block",borderColor:"currentColor",borderStyle:"solid",borderRadius:"99999px",borderWidth:i,borderBottomColor:d,borderLeftColor:d,animation:`${c} ${f} linear infinite`,...n};return(0,u.jsx)(a.m.div,{ref:t,__css:x,className:h,...p,children:r&&(0,u.jsx)(a.m.span,{srOnly:!0,children:r})})});f.displayName="Spinner"},91449:function(e,t,n){"use strict";n.d(t,{ZL:function(){return GlobalStyle},f6:function(){return ThemeProvider},eC:function(){return createStylesContext}});var r=n(34681),i=n(55444);function createContext(e={}){let{strict:t=!0,errorMessage:n="useContext: `context` is undefined. Seems you forgot to wrap component within the Provider",name:r}=e,o=(0,i.createContext)(void 0);return o.displayName=r,[o.Provider,function useContext(){var e;let r=(0,i.useContext)(o);if(!r&&t){let t=Error(n);throw t.name="ContextError",null==(e=Error.captureStackTrace)||e.call(Error,t,useContext),t}return r},o]}var o=n(8973),l=n(39987),a=n(78311),s=n(25118),u=n(2659),c=n(18708);function ThemeProvider(e){let{cssVarsRoot:t,theme:n,children:r}=e,l=(0,i.useMemo)(()=>(0,o.c0)(n),[n]);return(0,c.jsxs)(s.a,{theme:l,children:[(0,c.jsx)(CSSVars,{root:t}),r]})}function CSSVars({root:e=":host, :root"}){let t=[e,"[data-theme]"].join(",");return(0,c.jsx)(u.xB,{styles:e=>({[t]:e.__cssVars})})}var[f,d]=createContext({name:"StylesContext",errorMessage:"useStyles: `styles` is undefined. Seems you forgot to wrap the components in `<StylesProvider />` "});function createStylesContext(e){return createContext({name:`${e}StylesContext`,errorMessage:`useStyles: "styles" is undefined. Seems you forgot to wrap the components in "<${e} />" `})}function GlobalStyle(){let{colorMode:e}=(0,r.If)();return(0,c.jsx)(u.xB,{styles:t=>{let n=(0,l.Wf)(t,"styles.global"),r=(0,a.Pu)(n,{theme:t,colorMode:e});if(!r)return;let i=(0,o.iv)(r)(t);return i}})}}}]);