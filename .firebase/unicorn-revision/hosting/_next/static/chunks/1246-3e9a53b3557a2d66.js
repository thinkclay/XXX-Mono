(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1246],{75559:function(e,b,T){"use strict";T.d(b,{w_:function(){return GenIcon}});var I=T(55444),N={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},B=I.createContext&&I.createContext(N),__assign=function(){return(__assign=Object.assign||function(e){for(var b,T=1,I=arguments.length;T<I;T++)for(var N in b=arguments[T])Object.prototype.hasOwnProperty.call(b,N)&&(e[N]=b[N]);return e}).apply(this,arguments)},__rest=function(e,b){var T={};for(var I in e)Object.prototype.hasOwnProperty.call(e,I)&&0>b.indexOf(I)&&(T[I]=e[I]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var N=0,I=Object.getOwnPropertySymbols(e);N<I.length;N++)0>b.indexOf(I[N])&&Object.prototype.propertyIsEnumerable.call(e,I[N])&&(T[I[N]]=e[I[N]]);return T};function GenIcon(e){return function(b){return I.createElement(IconBase,__assign({attr:__assign({},e.attr)},b),function Tree2Element(e){return e&&e.map(function(e,b){return I.createElement(e.tag,__assign({key:b},e.attr),Tree2Element(e.child))})}(e.child))}}function IconBase(e){var elem=function(b){var T,N=e.attr,B=e.size,F=e.title,L=__rest(e,["attr","size","title"]),G=B||b.size||"1em";return b.className&&(T=b.className),e.className&&(T=(T?T+" ":"")+e.className),I.createElement("svg",__assign({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},b.attr,N,L,{className:T,style:__assign(__assign({color:e.color||b.color},b.style),e.style),height:G,width:G,xmlns:"http://www.w3.org/2000/svg"}),F&&I.createElement("title",null,F),e.children)};return void 0!==B?I.createElement(B.Consumer,null,function(e){return elem(e)}):elem(N)}},89230:function(e,b,T){var I,N;"undefined"!=typeof self&&self,e.exports=(I=T(55444),N=T(29832),function(){"use strict";var e,b,T,B,F,L,G,W,z={156:function(e){e.exports=I},111:function(e){e.exports=N},582:function(e,b,T){T.r(b),T.d(b,{__addDisposableResource:function(){return M},__assign:function(){return i},__asyncDelegator:function(){return O},__asyncGenerator:function(){return E},__asyncValues:function(){return x},__await:function(){return S},__awaiter:function(){return h},__classPrivateFieldGet:function(){return C},__classPrivateFieldIn:function(){return D},__classPrivateFieldSet:function(){return R},__createBinding:function(){return I},__decorate:function(){return c},__disposeResources:function(){return q},__esDecorate:function(){return u},__exportStar:function(){return v},__extends:function(){return o},__generator:function(){return y},__importDefault:function(){return k},__importStar:function(){return A},__makeTemplateObject:function(){return j},__metadata:function(){return p},__param:function(){return s},__propKey:function(){return f},__read:function(){return m},__rest:function(){return a},__runInitializers:function(){return l},__setFunctionName:function(){return d},__spread:function(){return _},__spreadArray:function(){return P},__spreadArrays:function(){return w},__values:function(){return g}});var n=function(e,b){return(n=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(e,b){e.__proto__=b}||function(e,b){for(var T in b)Object.prototype.hasOwnProperty.call(b,T)&&(e[T]=b[T])})(e,b)};function o(e,b){if("function"!=typeof b&&null!==b)throw TypeError("Class extends value "+String(b)+" is not a constructor or null");function r(){this.constructor=e}n(e,b),e.prototype=null===b?Object.create(b):(r.prototype=b.prototype,new r)}var i=function(){return(i=Object.assign||function(e){for(var b,T=1,I=arguments.length;T<I;T++)for(var N in b=arguments[T])Object.prototype.hasOwnProperty.call(b,N)&&(e[N]=b[N]);return e}).apply(this,arguments)};function a(e,b){var T={};for(var I in e)Object.prototype.hasOwnProperty.call(e,I)&&0>b.indexOf(I)&&(T[I]=e[I]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var N=0;for(I=Object.getOwnPropertySymbols(e);N<I.length;N++)0>b.indexOf(I[N])&&Object.prototype.propertyIsEnumerable.call(e,I[N])&&(T[I[N]]=e[I[N]])}return T}function c(e,b,T,I){var N,B=arguments.length,F=B<3?b:null===I?I=Object.getOwnPropertyDescriptor(b,T):I;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)F=Reflect.decorate(e,b,T,I);else for(var L=e.length-1;L>=0;L--)(N=e[L])&&(F=(B<3?N(F):B>3?N(b,T,F):N(b,T))||F);return B>3&&F&&Object.defineProperty(b,T,F),F}function s(e,b){return function(T,I){b(T,I,e)}}function u(e,b,T,I,N,B){function a(e){if(void 0!==e&&"function"!=typeof e)throw TypeError("Function expected");return e}for(var F,L=I.kind,G="getter"===L?"get":"setter"===L?"set":"value",W=!b&&e?I.static?e:e.prototype:null,z=b||(W?Object.getOwnPropertyDescriptor(W,I.name):{}),H=!1,V=T.length-1;V>=0;V--){var $={};for(var Y in I)$[Y]="access"===Y?{}:I[Y];for(var Y in I.access)$.access[Y]=I.access[Y];$.addInitializer=function(e){if(H)throw TypeError("Cannot add initializers after decoration has completed");B.push(a(e||null))};var U=(0,T[V])("accessor"===L?{get:z.get,set:z.set}:z[G],$);if("accessor"===L){if(void 0===U)continue;if(null===U||"object"!=typeof U)throw TypeError("Object expected");(F=a(U.get))&&(z.get=F),(F=a(U.set))&&(z.set=F),(F=a(U.init))&&N.unshift(F)}else(F=a(U))&&("field"===L?N.unshift(F):z[G]=F)}W&&Object.defineProperty(W,I.name,z),H=!0}function l(e,b,T){for(var I=arguments.length>2,N=0;N<b.length;N++)T=I?b[N].call(e,T):b[N].call(e);return I?T:void 0}function f(e){return"symbol"==typeof e?e:"".concat(e)}function d(e,b,T){return"symbol"==typeof b&&(b=b.description?"[".concat(b.description,"]"):""),Object.defineProperty(e,"name",{configurable:!0,value:T?"".concat(T," ",b):b})}function p(e,b){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,b)}function h(e,b,T,I){return new(T||(T=Promise))(function(N,B){function a(e){try{s(I.next(e))}catch(e){B(e)}}function c(e){try{s(I.throw(e))}catch(e){B(e)}}function s(e){var b;e.done?N(e.value):((b=e.value)instanceof T?b:new T(function(e){e(b)})).then(a,c)}s((I=I.apply(e,b||[])).next())})}function y(e,b){var T,I,N,B,F={label:0,sent:function(){if(1&N[0])throw N[1];return N[1]},trys:[],ops:[]};return B={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(B[Symbol.iterator]=function(){return this}),B;function c(L){return function(G){return function(L){if(T)throw TypeError("Generator is already executing.");for(;B&&(B=0,L[0]&&(F=0)),F;)try{if(T=1,I&&(N=2&L[0]?I.return:L[0]?I.throw||((N=I.return)&&N.call(I),0):I.next)&&!(N=N.call(I,L[1])).done)return N;switch(I=0,N&&(L=[2&L[0],N.value]),L[0]){case 0:case 1:N=L;break;case 4:return F.label++,{value:L[1],done:!1};case 5:F.label++,I=L[1],L=[0];continue;case 7:L=F.ops.pop(),F.trys.pop();continue;default:if(!((N=(N=F.trys).length>0&&N[N.length-1])||6!==L[0]&&2!==L[0])){F=0;continue}if(3===L[0]&&(!N||L[1]>N[0]&&L[1]<N[3])){F.label=L[1];break}if(6===L[0]&&F.label<N[1]){F.label=N[1],N=L;break}if(N&&F.label<N[2]){F.label=N[2],F.ops.push(L);break}N[2]&&F.ops.pop(),F.trys.pop();continue}L=b.call(e,F)}catch(e){L=[6,e],I=0}finally{T=N=0}if(5&L[0])throw L[1];return{value:L[0]?L[1]:void 0,done:!0}}([L,G])}}}var I=Object.create?function(e,b,T,I){void 0===I&&(I=T);var N=Object.getOwnPropertyDescriptor(b,T);N&&!("get"in N?!b.__esModule:N.writable||N.configurable)||(N={enumerable:!0,get:function(){return b[T]}}),Object.defineProperty(e,I,N)}:function(e,b,T,I){void 0===I&&(I=T),e[I]=b[T]};function v(e,b){for(var T in e)"default"===T||Object.prototype.hasOwnProperty.call(b,T)||I(b,e,T)}function g(e){var b="function"==typeof Symbol&&Symbol.iterator,T=b&&e[b],I=0;if(T)return T.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&I>=e.length&&(e=void 0),{value:e&&e[I++],done:!e}}};throw TypeError(b?"Object is not iterable.":"Symbol.iterator is not defined.")}function m(e,b){var T="function"==typeof Symbol&&e[Symbol.iterator];if(!T)return e;var I,N,B=T.call(e),F=[];try{for(;(void 0===b||b-- >0)&&!(I=B.next()).done;)F.push(I.value)}catch(e){N={error:e}}finally{try{I&&!I.done&&(T=B.return)&&T.call(B)}finally{if(N)throw N.error}}return F}function _(){for(var e=[],b=0;b<arguments.length;b++)e=e.concat(m(arguments[b]));return e}function w(){for(var e=0,b=0,T=arguments.length;b<T;b++)e+=arguments[b].length;var I=Array(e),N=0;for(b=0;b<T;b++)for(var B=arguments[b],F=0,L=B.length;F<L;F++,N++)I[N]=B[F];return I}function P(e,b,T){if(T||2==arguments.length)for(var I,N=0,B=b.length;N<B;N++)!I&&N in b||(I||(I=Array.prototype.slice.call(b,0,N)),I[N]=b[N]);return e.concat(I||Array.prototype.slice.call(b))}function S(e){return this instanceof S?(this.v=e,this):new S(e)}function E(e,b,T){if(!Symbol.asyncIterator)throw TypeError("Symbol.asyncIterator is not defined.");var I,N=T.apply(e,b||[]),B=[];return I={},a("next"),a("throw"),a("return"),I[Symbol.asyncIterator]=function(){return this},I;function a(e){N[e]&&(I[e]=function(b){return new Promise(function(T,I){B.push([e,b,T,I])>1||c(e,b)})})}function c(e,b){var T;try{(T=N[e](b)).value instanceof S?Promise.resolve(T.value.v).then(s,u):l(B[0][2],T)}catch(e){l(B[0][3],e)}}function s(e){c("next",e)}function u(e){c("throw",e)}function l(e,b){e(b),B.shift(),B.length&&c(B[0][0],B[0][1])}}function O(e){var b,T;return b={},n("next"),n("throw",function(e){throw e}),n("return"),b[Symbol.iterator]=function(){return this},b;function n(I,N){b[I]=e[I]?function(b){return(T=!T)?{value:S(e[I](b)),done:!1}:N?N(b):b}:N}}function x(e){if(!Symbol.asyncIterator)throw TypeError("Symbol.asyncIterator is not defined.");var b,T=e[Symbol.asyncIterator];return T?T.call(e):(e=g(e),b={},n("next"),n("throw"),n("return"),b[Symbol.asyncIterator]=function(){return this},b);function n(T){b[T]=e[T]&&function(b){return new Promise(function(I,N){!function(e,b,T,I){Promise.resolve(I).then(function(b){e({value:b,done:T})},b)}(I,N,(b=e[T](b)).done,b.value)})}}}function j(e,b){return Object.defineProperty?Object.defineProperty(e,"raw",{value:b}):e.raw=b,e}var N=Object.create?function(e,b){Object.defineProperty(e,"default",{enumerable:!0,value:b})}:function(e,b){e.default=b};function A(e){if(e&&e.__esModule)return e;var b={};if(null!=e)for(var T in e)"default"!==T&&Object.prototype.hasOwnProperty.call(e,T)&&I(b,e,T);return N(b,e),b}function k(e){return e&&e.__esModule?e:{default:e}}function C(e,b,T,I){if("a"===T&&!I)throw TypeError("Private accessor was defined without a getter");if("function"==typeof b?e!==b||!I:!b.has(e))throw TypeError("Cannot read private member from an object whose class did not declare it");return"m"===T?I:"a"===T?I.call(e):I?I.value:b.get(e)}function R(e,b,T,I,N){if("m"===I)throw TypeError("Private method is not writable");if("a"===I&&!N)throw TypeError("Private accessor was defined without a setter");if("function"==typeof b?e!==b||!N:!b.has(e))throw TypeError("Cannot write private member to an object whose class did not declare it");return"a"===I?N.call(e,T):N?N.value=T:b.set(e,T),T}function D(e,b){if(null===b||"object"!=typeof b&&"function"!=typeof b)throw TypeError("Cannot use 'in' operator on non-object");return"function"==typeof e?b===e:e.has(b)}function M(e,b,T){if(null!=b){var I;if("object"!=typeof b&&"function"!=typeof b)throw TypeError("Object expected.");if(T){if(!Symbol.asyncDispose)throw TypeError("Symbol.asyncDispose is not defined.");I=b[Symbol.asyncDispose]}if(void 0===I){if(!Symbol.dispose)throw TypeError("Symbol.dispose is not defined.");I=b[Symbol.dispose]}if("function"!=typeof I)throw TypeError("Object not disposable.");e.stack.push({value:b,dispose:I,async:T})}else T&&e.stack.push({async:!0});return b}var B="function"==typeof SuppressedError?SuppressedError:function(e,b,T){var I=Error(T);return I.name="SuppressedError",I.error=e,I.suppressed=b,I};function q(e){function t(b){e.error=e.hasError?new B(b,e.error,"An error was suppressed during disposal."):b,e.hasError=!0}return function r(){for(;e.stack.length;){var b=e.stack.pop();try{var T=b.dispose&&b.dispose.call(b.value);if(b.async)return Promise.resolve(T).then(r,function(e){return t(e),r()})}catch(e){t(e)}}if(e.hasError)throw e.error}()}b.default={__extends:o,__assign:i,__rest:a,__decorate:c,__param:s,__metadata:p,__awaiter:h,__generator:y,__createBinding:I,__exportStar:v,__values:g,__read:m,__spread:_,__spreadArrays:w,__spreadArray:P,__await:S,__asyncGenerator:E,__asyncDelegator:O,__asyncValues:x,__makeTemplateObject:j,__importStar:A,__importDefault:k,__classPrivateFieldGet:C,__classPrivateFieldSet:R,__classPrivateFieldIn:D,__addDisposableResource:M,__disposeResources:q}}},H={};function o(e){var b=H[e];if(void 0!==b)return b.exports;var T=H[e]={exports:{}};return z[e](T,T.exports,o),T.exports}o.d=function(e,b){for(var T in b)o.o(b,T)&&!o.o(e,T)&&Object.defineProperty(e,T,{enumerable:!0,get:b[T]})},o.o=function(e,b){return Object.prototype.hasOwnProperty.call(e,b)},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var V={};return Object.defineProperty(V,"__esModule",{value:!0}),V.useReactToPrint=V.PrintContextConsumer=void 0,e=o(582),b=o(156),T=o(111),B=Object.prototype.hasOwnProperty.call(b,"createContext"),F=Object.prototype.hasOwnProperty.call(b,"useMemo")&&Object.prototype.hasOwnProperty.call(b,"useCallback"),L=B?b.createContext({}):null,V.PrintContextConsumer=L?L.Consumer:function(){return null},G={copyStyles:!0,pageStyle:"\n        @page {\n            /* Remove browser default header (title) and footer (url) */\n            margin: 0;\n        }\n        @media print {\n            body {\n                /* Tell browsers to print background colors */\n                -webkit-print-color-adjust: exact; /* Chrome/Safari/Edge/Opera */\n                color-adjust: exact; /* Firefox */\n            }\n        }\n    ",removeAfterPrint:!1,suppressErrors:!1},W=function(I){function o(){var b=null!==I&&I.apply(this,arguments)||this;return b.startPrint=function(e){var T=b.props,I=T.onAfterPrint,N=T.onPrintError,B=T.print,F=T.documentTitle;setTimeout(function(){var T,L;if(e.contentWindow){if(e.contentWindow.focus(),B)B(e).then(function(){return null==I?void 0:I()}).then(function(){return b.handleRemoveIframe()}).catch(function(e){N?N("print",e):b.logMessages(["An error was thrown by the specified `print` function"])});else{if(e.contentWindow.print){var G=null!==(L=null===(T=e.contentDocument)||void 0===T?void 0:T.title)&&void 0!==L?L:"",W=e.ownerDocument.title;F&&(e.ownerDocument.title=F,e.contentDocument&&(e.contentDocument.title=F)),e.contentWindow.print(),F&&(e.ownerDocument.title=W,e.contentDocument&&(e.contentDocument.title=G))}else b.logMessages(["Printing for this browser is not currently possible: the browser does not have a `print` method available for iframes."]);null==I||I(),b.handleRemoveIframe()}}else b.logMessages(["Printing failed because the `contentWindow` of the print iframe did not load. This is possibly an error with `react-to-print`. Please file an issue: https://github.com/gregnb/react-to-print/issues/"])},500)},b.triggerPrint=function(e){var T=b.props,I=T.onBeforePrint,N=T.onPrintError;if(I){var B=I();B&&"function"==typeof B.then?B.then(function(){b.startPrint(e)}).catch(function(e){N&&N("onBeforePrint",e)}):b.startPrint(e)}else b.startPrint(e)},b.handleClick=function(){var e=b.props,T=e.onBeforeGetContent,I=e.onPrintError;if(T){var N=T();N&&"function"==typeof N.then?N.then(b.handlePrint).catch(function(e){I&&I("onBeforeGetContent",e)}):b.handlePrint()}else b.handlePrint()},b.handlePrint=function(){var I=b.props,N=I.bodyClass,B=I.content,F=I.copyStyles,L=I.fonts,G=I.pageStyle,W=I.nonce,z=B();if(void 0!==z){if(null!==z){var H=document.createElement("iframe");H.width="".concat(document.documentElement.clientWidth,"px"),H.height="".concat(document.documentElement.clientHeight,"px"),H.style.position="absolute",H.style.top="-".concat(document.documentElement.clientHeight+100,"px"),H.style.left="-".concat(document.documentElement.clientWidth+100,"px"),H.id="printWindow",H.srcdoc="<!DOCTYPE html>";var V=(0,T.findDOMNode)(z);if(V){var $=V.cloneNode(!0),Y=$ instanceof Text,U=document.querySelectorAll("link[rel~='stylesheet'], link[as='style']"),J=Y?[]:$.querySelectorAll("img"),K=Y?[]:$.querySelectorAll("video"),Q=L?L.length:0;b.numResourcesToLoad=U.length+J.length+K.length+Q,b.resourcesLoaded=[],b.resourcesErrored=[];var m=function(T,I){b.resourcesLoaded.includes(T)?b.logMessages(["Tried to mark a resource that has already been handled",T],"debug"):(I?(b.logMessages(e.__spreadArray(['"react-to-print" was unable to load a resource but will continue attempting to print the page'],e.__read(I),!1)),b.resourcesErrored.push(T)):b.resourcesLoaded.push(T),b.resourcesLoaded.length+b.resourcesErrored.length===b.numResourcesToLoad&&b.triggerPrint(H))};H.onload=function(){H.onload=null;var T,I,B,z,U=H.contentDocument||(null===(I=H.contentWindow)||void 0===I?void 0:I.document);if(U){U.body.appendChild($),L&&((null===(B=H.contentDocument)||void 0===B?void 0:B.fonts)&&(null===(z=H.contentWindow)||void 0===z?void 0:z.FontFace)?L.forEach(function(e){var b=new FontFace(e.family,e.source,{weight:e.weight,style:e.style});H.contentDocument.fonts.add(b),b.loaded.then(function(){m(b)}).catch(function(e){m(b,["Failed loading the font:",b,"Load error:",e])})}):(L.forEach(function(e){return m(e)}),b.logMessages(['"react-to-print" is not able to load custom fonts because the browser does not support the FontFace API but will continue attempting to print the page'])));var Q="function"==typeof G?G():G;if("string"!=typeof Q)b.logMessages(['"react-to-print" expected a "string" from `pageStyle` but received "'.concat(typeof Q,'". Styles from `pageStyle` will not be applied.')]);else{var X=U.createElement("style");W&&(X.setAttribute("nonce",W),U.head.setAttribute("nonce",W)),X.appendChild(U.createTextNode(Q)),U.head.appendChild(X)}if(N&&(T=U.body.classList).add.apply(T,e.__spreadArray([],e.__read(N.split(" ")),!1)),!Y){for(var Z=Y?[]:V.querySelectorAll("canvas"),ee=U.querySelectorAll("canvas"),et=0;et<Z.length;++et){var en=Z[et],er=ee[et].getContext("2d");er&&er.drawImage(en,0,0)}for(et=0;et<J.length;et++)(function(e){var b=J[e],T=b.getAttribute("src");if(T){var I=new Image;I.onload=function(){return m(b)},I.onerror=function(e,T,I,N,B){return m(b,["Error loading <img>",b,"Error",B])},I.src=T}else m(b,['Found an <img> tag with an empty "src" attribute. This prevents pre-loading it. The <img> is:',b])})(et);for(et=0;et<K.length;et++)(function(e){var b=K[e];b.preload="auto";var T=b.getAttribute("poster");if(T){var I=new Image;I.onload=function(){return m(b)},I.onerror=function(e,I,N,B,F){return m(b,["Error loading video poster",T,"for video",b,"Error:",F])},I.src=T}else b.readyState>=2?m(b):(b.onloadeddata=function(){return m(b)},b.onerror=function(e,T,I,N,B){return m(b,["Error loading video",b,"Error",B])},b.onstalled=function(){return m(b,["Loading video stalled, skipping",b])})})(et);var eo="input",ei=V.querySelectorAll(eo),ea=U.querySelectorAll(eo);for(et=0;et<ei.length;et++)ea[et].value=ei[et].value;var es="input[type=checkbox],input[type=radio]",ec=V.querySelectorAll(es),el=U.querySelectorAll(es);for(et=0;et<ec.length;et++)el[et].checked=ec[et].checked;var eu="select",ef=V.querySelectorAll(eu),ed=U.querySelectorAll(eu);for(et=0;et<ef.length;et++)ed[et].value=ef[et].value}if(F)for(var ep=document.querySelectorAll("style, link[rel~='stylesheet'], link[as='style']"),eh=(et=0,ep.length);et<eh;++et)(function(e,T){var I=ep[e];if("style"===I.tagName.toLowerCase()){var N=U.createElement(I.tagName),B=I.sheet;if(B){var F="";try{for(var L=B.cssRules.length,G=0;G<L;++G)"string"==typeof B.cssRules[G].cssText&&(F+="".concat(B.cssRules[G].cssText,"\r\n"))}catch(e){b.logMessages(["A stylesheet could not be accessed. This is likely due to the stylesheet having cross-origin imports, and many browsers block script access to cross-origin stylesheets. See https://github.com/gregnb/react-to-print/issues/429 for details. You may be able to load the sheet by both marking the stylesheet with the cross `crossorigin` attribute, and setting the `Access-Control-Allow-Origin` header on the server serving the stylesheet. Alternatively, host the stylesheet on your domain to avoid this issue entirely.",I],"warning")}N.setAttribute("id","react-to-print-".concat(e)),W&&N.setAttribute("nonce",W),N.appendChild(U.createTextNode(F)),U.head.appendChild(N)}}else if(I.getAttribute("href")){if(I.hasAttribute("disabled"))b.logMessages(["`react-to-print` encountered a <link> tag with a `disabled` attribute and will ignore it. Note that the `disabled` attribute is deprecated, and some browsers ignore it. You should stop using it. https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link#attr-disabled. The <link> is:",I],"warning"),m(I);else{for(var z=U.createElement(I.tagName),H=(G=0,I.attributes.length);G<H;++G){var V=I.attributes[G];V&&z.setAttribute(V.nodeName,V.nodeValue||"")}z.onload=function(){return m(z)},z.onerror=function(e,b,T,I,N){return m(z,["Failed to load",z,"Error:",N])},W&&z.setAttribute("nonce",W),U.head.appendChild(z)}}else b.logMessages(["`react-to-print` encountered a <link> tag with an empty `href` attribute. In addition to being invalid HTML, this can cause problems in many browsers, and so the <link> was not loaded. The <link> is:",I],"warning"),m(I)})(et)}0!==b.numResourcesToLoad&&F||b.triggerPrint(H)},b.handleRemoveIframe(!0),document.body.appendChild(H)}else b.logMessages(['"react-to-print" could not locate the DOM node corresponding with the `content` prop'])}else b.logMessages(['There is nothing to print because the "content" prop returned "null". Please ensure "content" is renderable before allowing "react-to-print" to be called.'])}else b.logMessages(["To print a functional component ensure it is wrapped with `React.forwardRef`, and ensure the forwarded ref is used. See the README for an example: https://github.com/gregnb/react-to-print#examples"])},b.handleRemoveIframe=function(e){var T=b.props.removeAfterPrint;if(e||T){var I=document.getElementById("printWindow");I&&document.body.removeChild(I)}},b.logMessages=function(e,T){void 0===T&&(T="error"),b.props.suppressErrors||("error"===T?console.error(e):"warning"===T?console.warn(e):"debug"===T&&console.debug(e))},b}return e.__extends(o,I),o.prototype.render=function(){var e=this.props,T=e.children,I=e.trigger;if(I)return b.cloneElement(I(),{onClick:this.handleClick});if(!L)return this.logMessages(['"react-to-print" requires React ^16.3.0 to be able to use "PrintContext"']),null;var N={handlePrint:this.handleClick};return b.createElement(L.Provider,{value:N},T)},o.defaultProps=G,o}(b.Component),V.default=W,V.useReactToPrint=function(T){if(!F)return T.suppressErrors||console.error('"react-to-print" requires React ^16.8.0 to be able to use "useReactToPrint"'),function(){throw Error('"react-to-print" requires React ^16.8.0 to be able to use "useReactToPrint"')};var I=b.useMemo(function(){return new W(e.__assign(e.__assign({},G),T))},[T]);return b.useCallback(function(){return I.handleClick()},[I])},V}())},98255:function(e,b,T){"use strict";T.d(b,{z:function(){return Y}});var I=T(55444),[N,B]=(0,T(99577).k)({strict:!1,name:"ButtonGroupContext"}),F=T(91262),L=T(81431),G=T(18708);function ButtonIcon(e){let{children:b,className:T,...N}=e,B=(0,I.isValidElement)(b)?(0,I.cloneElement)(b,{"aria-hidden":!0,focusable:!1}):b,W=(0,L.cx)("chakra-button__icon",T);return(0,G.jsx)(F.m.span,{display:"inline-flex",alignSelf:"center",flexShrink:0,...N,className:W,children:B})}ButtonIcon.displayName="ButtonIcon";var W=T(26537);function ButtonSpinner(e){let{label:b,placement:T,spacing:N="0.5rem",children:B=(0,G.jsx)(W.$,{color:"currentColor",width:"1em",height:"1em"}),className:z,__css:H,...V}=e,$=(0,L.cx)("chakra-button__spinner",z),Y="start"===T?"marginEnd":"marginStart",U=(0,I.useMemo)(()=>({display:"flex",alignItems:"center",position:b?"relative":"absolute",[Y]:b?N:0,fontSize:"1em",lineHeight:"normal",...H}),[H,b,Y,N]);return(0,G.jsx)(F.m.div,{className:$,...V,__css:U,children:B})}ButtonSpinner.displayName="ButtonSpinner";var z=T(47809),H=T(64879),V=T(64803),$=T(8973),Y=(0,H.G)((e,b)=>{let T=B(),N=(0,V.mq)("Button",{...T,...e}),{isDisabled:W=null==T?void 0:T.isDisabled,isLoading:H,isActive:Y,children:U,leftIcon:J,rightIcon:K,loadingText:Q,iconSpacing:X="0.5rem",type:Z,spinner:ee,spinnerPlacement:et="start",className:en,as:er,...eo}=(0,$.Lr)(e),ei=(0,I.useMemo)(()=>{let e={...null==N?void 0:N._focus,zIndex:1};return{display:"inline-flex",appearance:"none",alignItems:"center",justifyContent:"center",userSelect:"none",position:"relative",whiteSpace:"nowrap",verticalAlign:"middle",outline:"none",...N,...!!T&&{_focus:e}}},[N,T]),{ref:ea,type:es}=function(e){let[b,T]=(0,I.useState)(!e),N=(0,I.useCallback)(e=>{e&&T("BUTTON"===e.tagName)},[]);return{ref:N,type:b?"button":void 0}}(er),ec={rightIcon:K,leftIcon:J,iconSpacing:X,children:U};return(0,G.jsxs)(F.m.button,{ref:(0,z.qq)(b,ea),as:er,type:null!=Z?Z:es,"data-active":(0,L.PB)(Y),"data-loading":(0,L.PB)(H),__css:ei,className:(0,L.cx)("chakra-button",en),...eo,disabled:W||H,children:[H&&"start"===et&&(0,G.jsx)(ButtonSpinner,{className:"chakra-button__spinner--start",label:Q,placement:"start",spacing:X,children:ee}),H?Q||(0,G.jsx)(F.m.span,{opacity:0,children:(0,G.jsx)(ButtonContent,{...ec})}):(0,G.jsx)(ButtonContent,{...ec}),H&&"end"===et&&(0,G.jsx)(ButtonSpinner,{className:"chakra-button__spinner--end",label:Q,placement:"end",spacing:X,children:ee})]})});function ButtonContent(e){let{leftIcon:b,rightIcon:T,children:I,iconSpacing:N}=e;return(0,G.jsxs)(G.Fragment,{children:[b&&(0,G.jsx)(ButtonIcon,{marginEnd:N,children:b}),I,T&&(0,G.jsx)(ButtonIcon,{marginStart:N,children:T})]})}Y.displayName="Button"},28991:function(e,b,T){"use strict";T.d(b,{J:function(){return W}});var I=T(64879),N=T(64803),B=T(91262),F=T(81431),L=T(18708),G={path:(0,L.jsxs)("g",{stroke:"currentColor",strokeWidth:"1.5",children:[(0,L.jsx)("path",{strokeLinecap:"round",fill:"none",d:"M9,9a3,3,0,1,1,4,2.829,1.5,1.5,0,0,0-1,1.415V14.25"}),(0,L.jsx)("path",{fill:"currentColor",strokeLinecap:"round",d:"M12,17.25a.375.375,0,1,0,.375.375A.375.375,0,0,0,12,17.25h0"}),(0,L.jsx)("circle",{fill:"none",strokeMiterlimit:"10",cx:"12",cy:"12",r:"11.25"})]}),viewBox:"0 0 24 24"},W=(0,I.G)((e,b)=>{let{as:T,viewBox:I,color:W="currentColor",focusable:z=!1,children:H,className:V,__css:$,...Y}=e,U=(0,F.cx)("chakra-icon",V),J=(0,N.mq)("Icon",e),K={w:"1em",h:"1em",display:"inline-block",lineHeight:"1em",flexShrink:0,color:W,...$,...J},Q={ref:b,focusable:z,className:U,__css:K},X=null!=I?I:G.viewBox;if(T&&"string"!=typeof T)return(0,L.jsx)(B.m.svg,{as:T,...Q,...Y});let Z=null!=H?H:G.path;return(0,L.jsx)(B.m.svg,{verticalAlign:"middle",viewBox:X,...Q,...Y,children:Z})});W.displayName="Icon"},16391:function(e,b,T){"use strict";T.d(b,{r:function(){return F}});var I=T(64879),N=T(91262),B=T(18708),F=(0,I.G)(function(e,b){let{templateAreas:T,gap:I,rowGap:F,columnGap:L,column:G,row:W,autoFlow:z,autoRows:H,templateRows:V,autoColumns:$,templateColumns:Y,...U}=e;return(0,B.jsx)(N.m.div,{ref:b,__css:{display:"grid",gridTemplateAreas:T,gridGap:I,gridRowGap:F,gridColumnGap:L,gridAutoColumns:$,gridColumn:G,gridRow:W,gridAutoFlow:z,gridAutoRows:H,gridTemplateRows:V,gridTemplateColumns:Y},...U})});F.displayName="Grid"},26537:function(e,b,T){"use strict";T.d(b,{$:function(){return H}});var I=T(2659),N=T(64879),B=T(64803),F=T(8973),L=T(91262),G=T(81431),W=T(18708),z=(0,I.F4)({"0%":{transform:"rotate(0deg)"},"100%":{transform:"rotate(360deg)"}}),H=(0,N.G)((e,b)=>{let T=(0,B.mq)("Spinner",e),{label:I="Loading...",thickness:N="2px",speed:H="0.45s",emptyColor:V="transparent",className:$,...Y}=(0,F.Lr)(e),U=(0,G.cx)("chakra-spinner",$),J={display:"inline-block",borderColor:"currentColor",borderStyle:"solid",borderRadius:"99999px",borderWidth:N,borderBottomColor:V,borderLeftColor:V,animation:`${z} ${H} linear infinite`,...T};return(0,W.jsx)(L.m.div,{ref:b,__css:J,className:U,...Y,children:I&&(0,W.jsx)(L.m.span,{srOnly:!0,children:I})})});H.displayName="Spinner"}}]);