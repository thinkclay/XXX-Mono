(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7983],{54105:function(e,t){"use strict";t.Z=function(e,t){if(e&&t){var r=Array.isArray(t)?t:t.split(","),n=e.name||"",o=(e.type||"").toLowerCase(),i=o.replace(/\/.*$/,"");return r.some(function(e){var t=e.trim().toLowerCase();return"."===t.charAt(0)?n.toLowerCase().endsWith(t):t.endsWith("/*")?i===t.replace(/\/.*$/,""):o===t})}return!0}},35599:function(e,t,r){"use strict";var n=r(14823);function emptyFunction(){}function emptyFunctionWithReset(){}emptyFunctionWithReset.resetWarningCache=emptyFunction,e.exports=function(){function shim(e,t,r,o,i,a){if(a!==n){var c=Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}function getShim(){return shim}shim.isRequired=shim;var e={array:shim,bigint:shim,bool:shim,func:shim,number:shim,object:shim,string:shim,symbol:shim,any:shim,arrayOf:getShim,element:shim,elementType:shim,instanceOf:getShim,node:shim,objectOf:getShim,oneOf:getShim,oneOfType:getShim,shape:getShim,exact:getShim,checkPropTypes:emptyFunctionWithReset,resetWarningCache:emptyFunction};return e.PropTypes=e,e}},3436:function(e,t,r){e.exports=r(35599)()},14823:function(e){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},14277:function(e,t,r){"use strict";r.d(t,{uI:function(){return useDropzone}});var n=r(55444),o=r(3436),i=r.n(o),a=r(44192),c=new Map([["aac","audio/aac"],["abw","application/x-abiword"],["arc","application/x-freearc"],["avif","image/avif"],["avi","video/x-msvideo"],["azw","application/vnd.amazon.ebook"],["bin","application/octet-stream"],["bmp","image/bmp"],["bz","application/x-bzip"],["bz2","application/x-bzip2"],["cda","application/x-cdf"],["csh","application/x-csh"],["css","text/css"],["csv","text/csv"],["doc","application/msword"],["docx","application/vnd.openxmlformats-officedocument.wordprocessingml.document"],["eot","application/vnd.ms-fontobject"],["epub","application/epub+zip"],["gz","application/gzip"],["gif","image/gif"],["heic","image/heic"],["heif","image/heif"],["htm","text/html"],["html","text/html"],["ico","image/vnd.microsoft.icon"],["ics","text/calendar"],["jar","application/java-archive"],["jpeg","image/jpeg"],["jpg","image/jpeg"],["js","text/javascript"],["json","application/json"],["jsonld","application/ld+json"],["mid","audio/midi"],["midi","audio/midi"],["mjs","text/javascript"],["mp3","audio/mpeg"],["mp4","video/mp4"],["mpeg","video/mpeg"],["mpkg","application/vnd.apple.installer+xml"],["odp","application/vnd.oasis.opendocument.presentation"],["ods","application/vnd.oasis.opendocument.spreadsheet"],["odt","application/vnd.oasis.opendocument.text"],["oga","audio/ogg"],["ogv","video/ogg"],["ogx","application/ogg"],["opus","audio/opus"],["otf","font/otf"],["png","image/png"],["pdf","application/pdf"],["php","application/x-httpd-php"],["ppt","application/vnd.ms-powerpoint"],["pptx","application/vnd.openxmlformats-officedocument.presentationml.presentation"],["rar","application/vnd.rar"],["rtf","application/rtf"],["sh","application/x-sh"],["svg","image/svg+xml"],["swf","application/x-shockwave-flash"],["tar","application/x-tar"],["tif","image/tiff"],["tiff","image/tiff"],["ts","video/mp2t"],["ttf","font/ttf"],["txt","text/plain"],["vsd","application/vnd.visio"],["wav","audio/wav"],["weba","audio/webm"],["webm","video/webm"],["webp","image/webp"],["woff","font/woff"],["woff2","font/woff2"],["xhtml","application/xhtml+xml"],["xls","application/vnd.ms-excel"],["xlsx","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],["xml","application/xml"],["xul","application/vnd.mozilla.xul+xml"],["zip","application/zip"],["7z","application/x-7z-compressed"],["mkv","video/x-matroska"],["mov","video/quicktime"],["msg","application/vnd.ms-outlook"]]);function toFileWithPath(e,t){var r=function(e){var t=e.name;if(t&&-1!==t.lastIndexOf(".")&&!e.type){var r=t.split(".").pop().toLowerCase(),n=c.get(r);n&&Object.defineProperty(e,"type",{value:n,writable:!1,configurable:!1,enumerable:!0})}return e}(e);if("string"!=typeof r.path){var n=e.webkitRelativePath;Object.defineProperty(r,"path",{value:"string"==typeof t?t:"string"==typeof n&&n.length>0?n:e.name,writable:!1,configurable:!1,enumerable:!0})}return r}var s=[".DS_Store","Thumbs.db"];function isObject(e){return"object"==typeof e&&null!==e}function noIgnoredFiles(e){return e.filter(function(e){return -1===s.indexOf(e.name)})}function fromList(e){if(null===e)return[];for(var t=[],r=0;r<e.length;r++){var n=e[r];t.push(n)}return t}function toFilePromises(e){if("function"!=typeof e.webkitGetAsEntry)return fromDataTransferItem(e);var t=e.webkitGetAsEntry();return t&&t.isDirectory?fromDirEntry(t):fromDataTransferItem(e)}function fromDataTransferItem(e){var t=e.getAsFile();return t?Promise.resolve(toFileWithPath(t)):Promise.reject("".concat(e," is not a File"))}function fromEntry(e){return(0,a.mG)(this,void 0,void 0,function(){return(0,a.Jh)(this,function(t){return[2,e.isDirectory?fromDirEntry(e):function(e){return(0,a.mG)(this,void 0,void 0,function(){return(0,a.Jh)(this,function(t){return[2,new Promise(function(t,r){e.file(function(r){t(toFileWithPath(r,e.fullPath))},function(e){r(e)})})]})})}(e)]})})}function fromDirEntry(e){var t=e.createReader();return new Promise(function(e,r){var n=[];!function readEntries(){var o=this;t.readEntries(function(t){return(0,a.mG)(o,void 0,void 0,function(){var o;return(0,a.Jh)(this,function(i){switch(i.label){case 0:if(t.length)return[3,5];i.label=1;case 1:return i.trys.push([1,3,,4]),[4,Promise.all(n)];case 2:return e(i.sent()),[3,4];case 3:return r(i.sent()),[3,4];case 4:return[3,6];case 5:o=Promise.all(t.map(fromEntry)),n.push(o),readEntries(),i.label=6;case 6:return[2]}})})},function(e){r(e)})}()})}var u=r(54105);function _toConsumableArray(e){return function(e){if(Array.isArray(e))return _arrayLikeToArray(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||_unsupportedIterableToArray(e)||function(){throw TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function ownKeys(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(r),!0).forEach(function(t){_defineProperty(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ownKeys(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function _slicedToArray(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r,n,o=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=o){var i=[],a=!0,c=!1;try{for(o=o.call(e);!(a=(r=o.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(e){c=!0,n=e}finally{try{a||null==o.return||o.return()}finally{if(c)throw n}}return i}}(e,t)||_unsupportedIterableToArray(e,t)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);if("Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return _arrayLikeToArray(e,t)}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}var getInvalidTypeRejectionErr=function(e){var t=Array.isArray(e=Array.isArray(e)&&1===e.length?e[0]:e)?"one of ".concat(e.join(", ")):e;return{code:"file-invalid-type",message:"File type must be ".concat(t)}},getTooLargeRejectionErr=function(e){return{code:"file-too-large",message:"File is larger than ".concat(e," ").concat(1===e?"byte":"bytes")}},getTooSmallRejectionErr=function(e){return{code:"file-too-small",message:"File is smaller than ".concat(e," ").concat(1===e?"byte":"bytes")}},l={code:"too-many-files",message:"Too many files"};function fileAccepted(e,t){var r="application/x-moz-file"===e.type||(0,u.Z)(e,t);return[r,r?null:getInvalidTypeRejectionErr(t)]}function fileMatchSize(e,t,r){if(isDefined(e.size)){if(isDefined(t)&&isDefined(r)){if(e.size>r)return[!1,getTooLargeRejectionErr(r)];if(e.size<t)return[!1,getTooSmallRejectionErr(t)]}else if(isDefined(t)&&e.size<t)return[!1,getTooSmallRejectionErr(t)];else if(isDefined(r)&&e.size>r)return[!1,getTooLargeRejectionErr(r)]}return[!0,null]}function isDefined(e){return null!=e}function isPropagationStopped(e){return"function"==typeof e.isPropagationStopped?e.isPropagationStopped():void 0!==e.cancelBubble&&e.cancelBubble}function isEvtWithFiles(e){return e.dataTransfer?Array.prototype.some.call(e.dataTransfer.types,function(e){return"Files"===e||"application/x-moz-file"===e}):!!e.target&&!!e.target.files}function onDocumentDragOver(e){e.preventDefault()}function composeEventHandlers(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return function(e){for(var r=arguments.length,n=Array(r>1?r-1:0),o=1;o<r;o++)n[o-1]=arguments[o];return t.some(function(t){return!isPropagationStopped(e)&&t&&t.apply(void 0,[e].concat(n)),isPropagationStopped(e)})}}function isMIMEType(e){return"audio/*"===e||"video/*"===e||"image/*"===e||"text/*"===e||/\w+\/[-+.\w]+/g.test(e)}function isExt(e){return/^.*\.[\w]+$/.test(e)}var p=["children"],f=["open"],d=["refKey","role","onKeyDown","onFocus","onBlur","onClick","onDragEnter","onDragOver","onDragLeave","onDrop"],m=["refKey","onChange","onClick"];function es_slicedToArray(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r,n,o=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=o){var i=[],a=!0,c=!1;try{for(o=o.call(e);!(a=(r=o.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(e){c=!0,n=e}finally{try{a||null==o.return||o.return()}finally{if(c)throw n}}return i}}(e,t)||es_unsupportedIterableToArray(e,t)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function es_unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return es_arrayLikeToArray(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);if("Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return es_arrayLikeToArray(e,t)}}function es_arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}function es_ownKeys(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function es_objectSpread(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?es_ownKeys(Object(r),!0).forEach(function(t){es_defineProperty(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):es_ownKeys(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function es_defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function _objectWithoutProperties(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var y=(0,n.forwardRef)(function(e,t){var r=e.children,o=useDropzone(_objectWithoutProperties(e,p)),i=o.open,a=_objectWithoutProperties(o,f);return(0,n.useImperativeHandle)(t,function(){return{open:i}},[i]),n.createElement(n.Fragment,null,r(es_objectSpread(es_objectSpread({},a),{},{open:i})))});y.displayName="Dropzone";var v={disabled:!1,getFilesFromEvent:function(e){return(0,a.mG)(this,void 0,void 0,function(){return(0,a.Jh)(this,function(t){return isObject(e)&&isObject(e.dataTransfer)?[2,function(e,t){return(0,a.mG)(this,void 0,void 0,function(){var r;return(0,a.Jh)(this,function(n){switch(n.label){case 0:if(!e.items)return[3,2];if(r=fromList(e.items).filter(function(e){return"file"===e.kind}),"drop"!==t)return[2,r];return[4,Promise.all(r.map(toFilePromises))];case 1:return[2,noIgnoredFiles(function flatten(e){return e.reduce(function(e,t){return(0,a.ev)((0,a.ev)([],(0,a.CR)(e),!1),(0,a.CR)(Array.isArray(t)?flatten(t):[t]),!1)},[])}(n.sent()))];case 2:return[2,noIgnoredFiles(fromList(e.files).map(function(e){return toFileWithPath(e)}))]}})})}(e.dataTransfer,e.type)]:isObject(e)&&isObject(e.target)?[2,fromList(e.target.files).map(function(e){return toFileWithPath(e)})]:Array.isArray(e)&&e.every(function(e){return"getFile"in e&&"function"==typeof e.getFile})?[2,function(e){return(0,a.mG)(this,void 0,void 0,function(){return(0,a.Jh)(this,function(t){switch(t.label){case 0:return[4,Promise.all(e.map(function(e){return e.getFile()}))];case 1:return[2,t.sent().map(function(e){return toFileWithPath(e)})]}})})}(e)]:[2,[]]})})},maxSize:1/0,minSize:0,multiple:!0,maxFiles:0,preventDropOnDocument:!0,noClick:!1,noKeyboard:!1,noDrag:!1,noDragEventsBubbling:!1,validator:null,useFsAccessApi:!0,autoFocus:!1};y.defaultProps=v,y.propTypes={children:i().func,accept:i().objectOf(i().arrayOf(i().string)),multiple:i().bool,preventDropOnDocument:i().bool,noClick:i().bool,noKeyboard:i().bool,noDrag:i().bool,noDragEventsBubbling:i().bool,minSize:i().number,maxSize:i().number,maxFiles:i().number,disabled:i().bool,getFilesFromEvent:i().func,onFileDialogCancel:i().func,onFileDialogOpen:i().func,useFsAccessApi:i().bool,autoFocus:i().bool,onDragEnter:i().func,onDragLeave:i().func,onDragOver:i().func,onDrop:i().func,onDropAccepted:i().func,onDropRejected:i().func,onError:i().func,validator:i().func};var b={isFocused:!1,isFileDialogActive:!1,isDragActive:!1,isDragAccept:!1,isDragReject:!1,acceptedFiles:[],fileRejections:[]};function useDropzone(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=es_objectSpread(es_objectSpread({},v),e),r=t.accept,o=t.disabled,i=t.getFilesFromEvent,a=t.maxSize,c=t.minSize,s=t.multiple,u=t.maxFiles,p=t.onDragEnter,f=t.onDragLeave,y=t.onDragOver,g=t.onDrop,h=t.onDropAccepted,j=t.onDropRejected,D=t.onFileDialogCancel,_=t.onFileDialogOpen,w=t.useFsAccessApi,O=t.autoFocus,S=t.preventDropOnDocument,A=t.noClick,E=t.noKeyboard,x=t.noDrag,P=t.noDragEventsBubbling,F=t.onError,T=t.validator,k=(0,n.useMemo)(function(){return function(e){if(isDefined(e))return Object.entries(e).reduce(function(e,t){var r=_slicedToArray(t,2),n=r[0],o=r[1];return[].concat(_toConsumableArray(e),[n],_toConsumableArray(o))},[]).filter(function(e){return isMIMEType(e)||isExt(e)}).join(",")}(r)},[r]),C=(0,n.useMemo)(function(){return isDefined(r)?[{description:"Files",accept:Object.entries(r).filter(function(e){var t=_slicedToArray(e,2),r=t[0],n=t[1],o=!0;return isMIMEType(r)||(console.warn('Skipped "'.concat(r,'" because it is not a valid MIME type. Check https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types for a list of valid MIME types.')),o=!1),Array.isArray(n)&&n.every(isExt)||(console.warn('Skipped "'.concat(r,'" because an invalid file extension was provided.')),o=!1),o}).reduce(function(e,t){var r=_slicedToArray(t,2),n=r[0],o=r[1];return _objectSpread(_objectSpread({},e),{},_defineProperty({},n,o))},{})}]:r},[r]),R=(0,n.useMemo)(function(){return"function"==typeof _?_:noop},[_]),I=(0,n.useMemo)(function(){return"function"==typeof D?D:noop},[D]),z=(0,n.useRef)(null),L=(0,n.useRef)(null),H=es_slicedToArray((0,n.useReducer)(reducer,b),2),W=H[0],M=H[1],K=W.isFocused,G=W.isFileDialogActive,N=(0,n.useRef)("undefined"!=typeof window&&window.isSecureContext&&w&&"showOpenFilePicker"in window),onWindowFocus=function(){!N.current&&G&&setTimeout(function(){L.current&&!L.current.files.length&&(M({type:"closeDialog"}),I())},300)};(0,n.useEffect)(function(){return window.addEventListener("focus",onWindowFocus,!1),function(){window.removeEventListener("focus",onWindowFocus,!1)}},[L,G,I,N]);var B=(0,n.useRef)([]),onDocumentDrop=function(e){z.current&&z.current.contains(e.target)||(e.preventDefault(),B.current=[])};(0,n.useEffect)(function(){return S&&(document.addEventListener("dragover",onDocumentDragOver,!1),document.addEventListener("drop",onDocumentDrop,!1)),function(){S&&(document.removeEventListener("dragover",onDocumentDragOver),document.removeEventListener("drop",onDocumentDrop))}},[z,S]),(0,n.useEffect)(function(){return!o&&O&&z.current&&z.current.focus(),function(){}},[z,O,o]);var q=(0,n.useCallback)(function(e){F?F(e):console.error(e)},[F]),J=(0,n.useCallback)(function(e){var t;e.preventDefault(),e.persist(),stopPropagation(e),B.current=[].concat(function(e){if(Array.isArray(e))return es_arrayLikeToArray(e)}(t=B.current)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(t)||es_unsupportedIterableToArray(t)||function(){throw TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),[e.target]),isEvtWithFiles(e)&&Promise.resolve(i(e)).then(function(t){if(!isPropagationStopped(e)||P){var r,n,o,i,l,f,d,m,y=t.length,v=y>0&&(n=(r={files:t,accept:k,minSize:c,maxSize:a,multiple:s,maxFiles:u,validator:T}).files,o=r.accept,i=r.minSize,l=r.maxSize,f=r.multiple,d=r.maxFiles,m=r.validator,(!!f||!(n.length>1))&&(!f||!(d>=1)||!(n.length>d))&&n.every(function(e){var t=_slicedToArray(fileAccepted(e,o),1)[0],r=_slicedToArray(fileMatchSize(e,i,l),1)[0],n=m?m(e):null;return t&&r&&!n}));M({isDragAccept:v,isDragReject:y>0&&!v,isDragActive:!0,type:"setDraggedFiles"}),p&&p(e)}}).catch(function(e){return q(e)})},[i,p,q,P,k,c,a,s,u,T]),U=(0,n.useCallback)(function(e){e.preventDefault(),e.persist(),stopPropagation(e);var t=isEvtWithFiles(e);if(t&&e.dataTransfer)try{e.dataTransfer.dropEffect="copy"}catch(e){}return t&&y&&y(e),!1},[y,P]),$=(0,n.useCallback)(function(e){e.preventDefault(),e.persist(),stopPropagation(e);var t=B.current.filter(function(e){return z.current&&z.current.contains(e)}),r=t.indexOf(e.target);-1!==r&&t.splice(r,1),B.current=t,!(t.length>0)&&(M({type:"setDraggedFiles",isDragActive:!1,isDragAccept:!1,isDragReject:!1}),isEvtWithFiles(e)&&f&&f(e))},[z,f,P]),Y=(0,n.useCallback)(function(e,t){var r=[],n=[];e.forEach(function(e){var t=es_slicedToArray(fileAccepted(e,k),2),o=t[0],i=t[1],s=es_slicedToArray(fileMatchSize(e,c,a),2),u=s[0],l=s[1],p=T?T(e):null;if(o&&u&&!p)r.push(e);else{var f=[i,l];p&&(f=f.concat(p)),n.push({file:e,errors:f.filter(function(e){return e})})}}),(!s&&r.length>1||s&&u>=1&&r.length>u)&&(r.forEach(function(e){n.push({file:e,errors:[l]})}),r.splice(0)),M({acceptedFiles:r,fileRejections:n,type:"setFiles"}),g&&g(r,n,t),n.length>0&&j&&j(n,t),r.length>0&&h&&h(r,t)},[M,s,k,c,a,u,g,h,j,T]),Z=(0,n.useCallback)(function(e){e.preventDefault(),e.persist(),stopPropagation(e),B.current=[],isEvtWithFiles(e)&&Promise.resolve(i(e)).then(function(t){(!isPropagationStopped(e)||P)&&Y(t,e)}).catch(function(e){return q(e)}),M({type:"reset"})},[i,Y,q,P]),V=(0,n.useCallback)(function(){if(N.current){M({type:"openDialog"}),R(),window.showOpenFilePicker({multiple:s,types:C}).then(function(e){return i(e)}).then(function(e){Y(e,null),M({type:"closeDialog"})}).catch(function(e){e instanceof DOMException&&("AbortError"===e.name||e.code===e.ABORT_ERR)?(I(e),M({type:"closeDialog"})):e instanceof DOMException&&("SecurityError"===e.name||e.code===e.SECURITY_ERR)?(N.current=!1,L.current?(L.current.value=null,L.current.click()):q(Error("Cannot open the file picker because the https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API is not supported and no <input> was provided."))):q(e)});return}L.current&&(M({type:"openDialog"}),R(),L.current.value=null,L.current.click())},[M,R,I,w,Y,q,C,s]),Q=(0,n.useCallback)(function(e){z.current&&z.current.isEqualNode(e.target)&&(" "===e.key||"Enter"===e.key||32===e.keyCode||13===e.keyCode)&&(e.preventDefault(),V())},[z,V]),X=(0,n.useCallback)(function(){M({type:"focus"})},[]),ee=(0,n.useCallback)(function(){M({type:"blur"})},[]),et=(0,n.useCallback)(function(){A||(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window.navigator.userAgent;return -1!==e.indexOf("MSIE")||-1!==e.indexOf("Trident/")||-1!==e.indexOf("Edge/")}()?setTimeout(V,0):V())},[A,V]),composeHandler=function(e){return o?null:e},composeKeyboardHandler=function(e){return E?null:composeHandler(e)},composeDragHandler=function(e){return x?null:composeHandler(e)},stopPropagation=function(e){P&&e.stopPropagation()},er=(0,n.useMemo)(function(){return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.refKey,r=void 0===t?"ref":t,n=e.role,i=e.onKeyDown,a=e.onFocus,c=e.onBlur,s=e.onClick,u=e.onDragEnter,l=e.onDragOver,p=e.onDragLeave,f=e.onDrop,m=_objectWithoutProperties(e,d);return es_objectSpread(es_objectSpread(es_defineProperty({onKeyDown:composeKeyboardHandler(composeEventHandlers(i,Q)),onFocus:composeKeyboardHandler(composeEventHandlers(a,X)),onBlur:composeKeyboardHandler(composeEventHandlers(c,ee)),onClick:composeHandler(composeEventHandlers(s,et)),onDragEnter:composeDragHandler(composeEventHandlers(u,J)),onDragOver:composeDragHandler(composeEventHandlers(l,U)),onDragLeave:composeDragHandler(composeEventHandlers(p,$)),onDrop:composeDragHandler(composeEventHandlers(f,Z)),role:"string"==typeof n&&""!==n?n:"presentation"},r,z),o||E?{}:{tabIndex:0}),m)}},[z,Q,X,ee,et,J,U,$,Z,E,x,o]),en=(0,n.useCallback)(function(e){e.stopPropagation()},[]),eo=(0,n.useMemo)(function(){return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.refKey,r=void 0===t?"ref":t,n=e.onChange,o=e.onClick,i=_objectWithoutProperties(e,m);return es_objectSpread(es_objectSpread({},es_defineProperty({accept:k,multiple:s,type:"file",style:{display:"none"},onChange:composeHandler(composeEventHandlers(n,Z)),onClick:composeHandler(composeEventHandlers(o,en)),tabIndex:-1},r,L)),i)}},[L,r,s,Z,o]);return es_objectSpread(es_objectSpread({},W),{},{isFocused:K&&!o,getRootProps:er,getInputProps:eo,rootRef:z,inputRef:L,open:composeHandler(V)})}function reducer(e,t){switch(t.type){case"focus":return es_objectSpread(es_objectSpread({},e),{},{isFocused:!0});case"blur":return es_objectSpread(es_objectSpread({},e),{},{isFocused:!1});case"openDialog":return es_objectSpread(es_objectSpread({},b),{},{isFileDialogActive:!0});case"closeDialog":return es_objectSpread(es_objectSpread({},e),{},{isFileDialogActive:!1});case"setDraggedFiles":return es_objectSpread(es_objectSpread({},e),{},{isDragActive:t.isDragActive,isDragAccept:t.isDragAccept,isDragReject:t.isDragReject});case"setFiles":return es_objectSpread(es_objectSpread({},e),{},{acceptedFiles:t.acceptedFiles,fileRejections:t.fileRejections});case"reset":return es_objectSpread({},b);default:return e}}function noop(){}},16622:function(e,t,r){"use strict";r.d(t,{l:function(){return l}});var n=r(13610),o=r(64879),i=r(64803),a=r(8973),c=r(91262),s=r(81431),u=r(18708),l=(0,o.G)(function(e,t){var r;let o=(0,i.mq)("FormLabel",e),l=(0,a.Lr)(e),{className:f,children:d,requiredIndicator:m=(0,u.jsx)(p,{}),optionalIndicator:y=null,...v}=l,b=(0,n.NJ)(),g=null!=(r=null==b?void 0:b.getLabelProps(v,t))?r:{ref:t,...v};return(0,u.jsxs)(c.m.label,{...g,className:(0,s.cx)("chakra-form__label",l.className),__css:{display:"block",textAlign:"start",...o},children:[d,(null==b?void 0:b.isRequired)?m:y]})});l.displayName="FormLabel";var p=(0,o.G)(function(e,t){let r=(0,n.NJ)(),o=(0,n.e)();if(!(null==r?void 0:r.isRequired))return null;let i=(0,s.cx)("chakra-form__required-indicator",e.className);return(0,u.jsx)(c.m.span,{...null==r?void 0:r.getRequiredIndicatorProps(e,t),__css:o.requiredIndicator,className:i})});p.displayName="RequiredIndicator"},44192:function(e,t,r){"use strict";r.d(t,{CR:function(){return __read},Jh:function(){return __generator},_T:function(){return __rest},ev:function(){return __spreadArray},mG:function(){return __awaiter},pi:function(){return __assign}});var __assign=function(){return(__assign=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};function __rest(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&0>t.indexOf(n)&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var o=0,n=Object.getOwnPropertySymbols(e);o<n.length;o++)0>t.indexOf(n[o])&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]]);return r}function __awaiter(e,t,r,n){return new(r||(r=Promise))(function(o,i){function fulfilled(e){try{step(n.next(e))}catch(e){i(e)}}function rejected(e){try{step(n.throw(e))}catch(e){i(e)}}function step(e){var t;e.done?o(e.value):((t=e.value)instanceof r?t:new r(function(e){e(t)})).then(fulfilled,rejected)}step((n=n.apply(e,t||[])).next())})}function __generator(e,t){var r,n,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:verb(0),throw:verb(1),return:verb(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function verb(c){return function(s){return function(c){if(r)throw TypeError("Generator is already executing.");for(;i&&(i=0,c[0]&&(a=0)),a;)try{if(r=1,n&&(o=2&c[0]?n.return:c[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,c[1])).done)return o;switch(n=0,o&&(c=[2&c[0],o.value]),c[0]){case 0:case 1:o=c;break;case 4:return a.label++,{value:c[1],done:!1};case 5:a.label++,n=c[1],c=[0];continue;case 7:c=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===c[0]||2===c[0])){a=0;continue}if(3===c[0]&&(!o||c[1]>o[0]&&c[1]<o[3])){a.label=c[1];break}if(6===c[0]&&a.label<o[1]){a.label=o[1],o=c;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(c);break}o[2]&&a.ops.pop(),a.trys.pop();continue}c=t.call(e,a)}catch(e){c=[6,e],n=0}finally{r=o=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,s])}}}function __read(e,t){var r="function"==typeof Symbol&&e[Symbol.iterator];if(!r)return e;var n,o,i=r.call(e),a=[];try{for(;(void 0===t||t-- >0)&&!(n=i.next()).done;)a.push(n.value)}catch(e){o={error:e}}finally{try{n&&!n.done&&(r=i.return)&&r.call(i)}finally{if(o)throw o.error}}return a}function __spreadArray(e,t,r){if(r||2==arguments.length)for(var n,o=0,i=t.length;o<i;o++)!n&&o in t||(n||(n=Array.prototype.slice.call(t,0,o)),n[o]=t[o]);return e.concat(n||Array.prototype.slice.call(t))}"function"==typeof SuppressedError&&SuppressedError}}]);