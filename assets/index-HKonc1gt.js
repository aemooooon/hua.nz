(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const u of l)if(u.type==="childList")for(const h of u.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&r(h)}).observe(document,{childList:!0,subtree:!0});function i(l){const u={};return l.integrity&&(u.integrity=l.integrity),l.referrerPolicy&&(u.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?u.credentials="include":l.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function r(l){if(l.ep)return;l.ep=!0;const u=i(l);fetch(l.href,u)}})();function Mx(o){return o&&o.__esModule&&Object.prototype.hasOwnProperty.call(o,"default")?o.default:o}var bf={exports:{}},yo={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Cg;function Ex(){if(Cg)return yo;Cg=1;var o=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function i(r,l,u){var h=null;if(u!==void 0&&(h=""+u),l.key!==void 0&&(h=""+l.key),"key"in l){u={};for(var d in l)d!=="key"&&(u[d]=l[d])}else u=l;return l=u.ref,{$$typeof:o,type:r,key:h,ref:l!==void 0?l:null,props:u}}return yo.Fragment=t,yo.jsx=i,yo.jsxs=i,yo}var Dg;function Tx(){return Dg||(Dg=1,bf.exports=Ex()),bf.exports}var Pt=Tx(),Af={exports:{}},oe={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ug;function bx(){if(Ug)return oe;Ug=1;var o=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),u=Symbol.for("react.consumer"),h=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),v=Symbol.iterator;function x(L){return L===null||typeof L!="object"?null:(L=v&&L[v]||L["@@iterator"],typeof L=="function"?L:null)}var M={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},T=Object.assign,C={};function y(L,nt,Et){this.props=L,this.context=nt,this.refs=C,this.updater=Et||M}y.prototype.isReactComponent={},y.prototype.setState=function(L,nt){if(typeof L!="object"&&typeof L!="function"&&L!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,L,nt,"setState")},y.prototype.forceUpdate=function(L){this.updater.enqueueForceUpdate(this,L,"forceUpdate")};function _(){}_.prototype=y.prototype;function P(L,nt,Et){this.props=L,this.context=nt,this.refs=C,this.updater=Et||M}var O=P.prototype=new _;O.constructor=P,T(O,y.prototype),O.isPureReactComponent=!0;var D=Array.isArray,H={H:null,A:null,T:null,S:null},F=Object.prototype.hasOwnProperty;function z(L,nt,Et,At,q,dt){return Et=dt.ref,{$$typeof:o,type:L,key:nt,ref:Et!==void 0?Et:null,props:dt}}function K(L,nt){return z(L.type,nt,void 0,void 0,void 0,L.props)}function w(L){return typeof L=="object"&&L!==null&&L.$$typeof===o}function R(L){var nt={"=":"=0",":":"=2"};return"$"+L.replace(/[=:]/g,function(Et){return nt[Et]})}var I=/\/+/g;function ct(L,nt){return typeof L=="object"&&L!==null&&L.key!=null?R(""+L.key):nt.toString(36)}function it(){}function mt(L){switch(L.status){case"fulfilled":return L.value;case"rejected":throw L.reason;default:switch(typeof L.status=="string"?L.then(it,it):(L.status="pending",L.then(function(nt){L.status==="pending"&&(L.status="fulfilled",L.value=nt)},function(nt){L.status==="pending"&&(L.status="rejected",L.reason=nt)})),L.status){case"fulfilled":return L.value;case"rejected":throw L.reason}}throw L}function ht(L,nt,Et,At,q){var dt=typeof L;(dt==="undefined"||dt==="boolean")&&(L=null);var xt=!1;if(L===null)xt=!0;else switch(dt){case"bigint":case"string":case"number":xt=!0;break;case"object":switch(L.$$typeof){case o:case t:xt=!0;break;case g:return xt=L._init,ht(xt(L._payload),nt,Et,At,q)}}if(xt)return q=q(L),xt=At===""?"."+ct(L,0):At,D(q)?(Et="",xt!=null&&(Et=xt.replace(I,"$&/")+"/"),ht(q,nt,Et,"",function(Ft){return Ft})):q!=null&&(w(q)&&(q=K(q,Et+(q.key==null||L&&L.key===q.key?"":(""+q.key).replace(I,"$&/")+"/")+xt)),nt.push(q)),1;xt=0;var Tt=At===""?".":At+":";if(D(L))for(var Rt=0;Rt<L.length;Rt++)At=L[Rt],dt=Tt+ct(At,Rt),xt+=ht(At,nt,Et,dt,q);else if(Rt=x(L),typeof Rt=="function")for(L=Rt.call(L),Rt=0;!(At=L.next()).done;)At=At.value,dt=Tt+ct(At,Rt++),xt+=ht(At,nt,Et,dt,q);else if(dt==="object"){if(typeof L.then=="function")return ht(mt(L),nt,Et,At,q);throw nt=String(L),Error("Objects are not valid as a React child (found: "+(nt==="[object Object]"?"object with keys {"+Object.keys(L).join(", ")+"}":nt)+"). If you meant to render a collection of children, use an array instead.")}return xt}function W(L,nt,Et){if(L==null)return L;var At=[],q=0;return ht(L,At,"","",function(dt){return nt.call(Et,dt,q++)}),At}function at(L){if(L._status===-1){var nt=L._result;nt=nt(),nt.then(function(Et){(L._status===0||L._status===-1)&&(L._status=1,L._result=Et)},function(Et){(L._status===0||L._status===-1)&&(L._status=2,L._result=Et)}),L._status===-1&&(L._status=0,L._result=nt)}if(L._status===1)return L._result.default;throw L._result}var j=typeof reportError=="function"?reportError:function(L){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var nt=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof L=="object"&&L!==null&&typeof L.message=="string"?String(L.message):String(L),error:L});if(!window.dispatchEvent(nt))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",L);return}console.error(L)};function St(){}return oe.Children={map:W,forEach:function(L,nt,Et){W(L,function(){nt.apply(this,arguments)},Et)},count:function(L){var nt=0;return W(L,function(){nt++}),nt},toArray:function(L){return W(L,function(nt){return nt})||[]},only:function(L){if(!w(L))throw Error("React.Children.only expected to receive a single React element child.");return L}},oe.Component=y,oe.Fragment=i,oe.Profiler=l,oe.PureComponent=P,oe.StrictMode=r,oe.Suspense=m,oe.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=H,oe.act=function(){throw Error("act(...) is not supported in production builds of React.")},oe.cache=function(L){return function(){return L.apply(null,arguments)}},oe.cloneElement=function(L,nt,Et){if(L==null)throw Error("The argument must be a React element, but you passed "+L+".");var At=T({},L.props),q=L.key,dt=void 0;if(nt!=null)for(xt in nt.ref!==void 0&&(dt=void 0),nt.key!==void 0&&(q=""+nt.key),nt)!F.call(nt,xt)||xt==="key"||xt==="__self"||xt==="__source"||xt==="ref"&&nt.ref===void 0||(At[xt]=nt[xt]);var xt=arguments.length-2;if(xt===1)At.children=Et;else if(1<xt){for(var Tt=Array(xt),Rt=0;Rt<xt;Rt++)Tt[Rt]=arguments[Rt+2];At.children=Tt}return z(L.type,q,void 0,void 0,dt,At)},oe.createContext=function(L){return L={$$typeof:h,_currentValue:L,_currentValue2:L,_threadCount:0,Provider:null,Consumer:null},L.Provider=L,L.Consumer={$$typeof:u,_context:L},L},oe.createElement=function(L,nt,Et){var At,q={},dt=null;if(nt!=null)for(At in nt.key!==void 0&&(dt=""+nt.key),nt)F.call(nt,At)&&At!=="key"&&At!=="__self"&&At!=="__source"&&(q[At]=nt[At]);var xt=arguments.length-2;if(xt===1)q.children=Et;else if(1<xt){for(var Tt=Array(xt),Rt=0;Rt<xt;Rt++)Tt[Rt]=arguments[Rt+2];q.children=Tt}if(L&&L.defaultProps)for(At in xt=L.defaultProps,xt)q[At]===void 0&&(q[At]=xt[At]);return z(L,dt,void 0,void 0,null,q)},oe.createRef=function(){return{current:null}},oe.forwardRef=function(L){return{$$typeof:d,render:L}},oe.isValidElement=w,oe.lazy=function(L){return{$$typeof:g,_payload:{_status:-1,_result:L},_init:at}},oe.memo=function(L,nt){return{$$typeof:p,type:L,compare:nt===void 0?null:nt}},oe.startTransition=function(L){var nt=H.T,Et={};H.T=Et;try{var At=L(),q=H.S;q!==null&&q(Et,At),typeof At=="object"&&At!==null&&typeof At.then=="function"&&At.then(St,j)}catch(dt){j(dt)}finally{H.T=nt}},oe.unstable_useCacheRefresh=function(){return H.H.useCacheRefresh()},oe.use=function(L){return H.H.use(L)},oe.useActionState=function(L,nt,Et){return H.H.useActionState(L,nt,Et)},oe.useCallback=function(L,nt){return H.H.useCallback(L,nt)},oe.useContext=function(L){return H.H.useContext(L)},oe.useDebugValue=function(){},oe.useDeferredValue=function(L,nt){return H.H.useDeferredValue(L,nt)},oe.useEffect=function(L,nt){return H.H.useEffect(L,nt)},oe.useId=function(){return H.H.useId()},oe.useImperativeHandle=function(L,nt,Et){return H.H.useImperativeHandle(L,nt,Et)},oe.useInsertionEffect=function(L,nt){return H.H.useInsertionEffect(L,nt)},oe.useLayoutEffect=function(L,nt){return H.H.useLayoutEffect(L,nt)},oe.useMemo=function(L,nt){return H.H.useMemo(L,nt)},oe.useOptimistic=function(L,nt){return H.H.useOptimistic(L,nt)},oe.useReducer=function(L,nt,Et){return H.H.useReducer(L,nt,Et)},oe.useRef=function(L){return H.H.useRef(L)},oe.useState=function(L){return H.H.useState(L)},oe.useSyncExternalStore=function(L,nt,Et){return H.H.useSyncExternalStore(L,nt,Et)},oe.useTransition=function(){return H.H.useTransition()},oe.version="19.0.0",oe}var Lg;function Jh(){return Lg||(Lg=1,Af.exports=bx()),Af.exports}var hr=Jh(),Rf={exports:{}},Mo={},wf={exports:{}},Cf={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ng;function Ax(){return Ng||(Ng=1,function(o){function t(W,at){var j=W.length;W.push(at);t:for(;0<j;){var St=j-1>>>1,L=W[St];if(0<l(L,at))W[St]=at,W[j]=L,j=St;else break t}}function i(W){return W.length===0?null:W[0]}function r(W){if(W.length===0)return null;var at=W[0],j=W.pop();if(j!==at){W[0]=j;t:for(var St=0,L=W.length,nt=L>>>1;St<nt;){var Et=2*(St+1)-1,At=W[Et],q=Et+1,dt=W[q];if(0>l(At,j))q<L&&0>l(dt,At)?(W[St]=dt,W[q]=j,St=q):(W[St]=At,W[Et]=j,St=Et);else if(q<L&&0>l(dt,j))W[St]=dt,W[q]=j,St=q;else break t}}return at}function l(W,at){var j=W.sortIndex-at.sortIndex;return j!==0?j:W.id-at.id}if(o.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var u=performance;o.unstable_now=function(){return u.now()}}else{var h=Date,d=h.now();o.unstable_now=function(){return h.now()-d}}var m=[],p=[],g=1,v=null,x=3,M=!1,T=!1,C=!1,y=typeof setTimeout=="function"?setTimeout:null,_=typeof clearTimeout=="function"?clearTimeout:null,P=typeof setImmediate<"u"?setImmediate:null;function O(W){for(var at=i(p);at!==null;){if(at.callback===null)r(p);else if(at.startTime<=W)r(p),at.sortIndex=at.expirationTime,t(m,at);else break;at=i(p)}}function D(W){if(C=!1,O(W),!T)if(i(m)!==null)T=!0,mt();else{var at=i(p);at!==null&&ht(D,at.startTime-W)}}var H=!1,F=-1,z=5,K=-1;function w(){return!(o.unstable_now()-K<z)}function R(){if(H){var W=o.unstable_now();K=W;var at=!0;try{t:{T=!1,C&&(C=!1,_(F),F=-1),M=!0;var j=x;try{e:{for(O(W),v=i(m);v!==null&&!(v.expirationTime>W&&w());){var St=v.callback;if(typeof St=="function"){v.callback=null,x=v.priorityLevel;var L=St(v.expirationTime<=W);if(W=o.unstable_now(),typeof L=="function"){v.callback=L,O(W),at=!0;break e}v===i(m)&&r(m),O(W)}else r(m);v=i(m)}if(v!==null)at=!0;else{var nt=i(p);nt!==null&&ht(D,nt.startTime-W),at=!1}}break t}finally{v=null,x=j,M=!1}at=void 0}}finally{at?I():H=!1}}}var I;if(typeof P=="function")I=function(){P(R)};else if(typeof MessageChannel<"u"){var ct=new MessageChannel,it=ct.port2;ct.port1.onmessage=R,I=function(){it.postMessage(null)}}else I=function(){y(R,0)};function mt(){H||(H=!0,I())}function ht(W,at){F=y(function(){W(o.unstable_now())},at)}o.unstable_IdlePriority=5,o.unstable_ImmediatePriority=1,o.unstable_LowPriority=4,o.unstable_NormalPriority=3,o.unstable_Profiling=null,o.unstable_UserBlockingPriority=2,o.unstable_cancelCallback=function(W){W.callback=null},o.unstable_continueExecution=function(){T||M||(T=!0,mt())},o.unstable_forceFrameRate=function(W){0>W||125<W?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):z=0<W?Math.floor(1e3/W):5},o.unstable_getCurrentPriorityLevel=function(){return x},o.unstable_getFirstCallbackNode=function(){return i(m)},o.unstable_next=function(W){switch(x){case 1:case 2:case 3:var at=3;break;default:at=x}var j=x;x=at;try{return W()}finally{x=j}},o.unstable_pauseExecution=function(){},o.unstable_requestPaint=function(){},o.unstable_runWithPriority=function(W,at){switch(W){case 1:case 2:case 3:case 4:case 5:break;default:W=3}var j=x;x=W;try{return at()}finally{x=j}},o.unstable_scheduleCallback=function(W,at,j){var St=o.unstable_now();switch(typeof j=="object"&&j!==null?(j=j.delay,j=typeof j=="number"&&0<j?St+j:St):j=St,W){case 1:var L=-1;break;case 2:L=250;break;case 5:L=1073741823;break;case 4:L=1e4;break;default:L=5e3}return L=j+L,W={id:g++,callback:at,priorityLevel:W,startTime:j,expirationTime:L,sortIndex:-1},j>St?(W.sortIndex=j,t(p,W),i(m)===null&&W===i(p)&&(C?(_(F),F=-1):C=!0,ht(D,j-St))):(W.sortIndex=L,t(m,W),T||M||(T=!0,mt())),W},o.unstable_shouldYield=w,o.unstable_wrapCallback=function(W){var at=x;return function(){var j=x;x=at;try{return W.apply(this,arguments)}finally{x=j}}}}(Cf)),Cf}var Og;function Rx(){return Og||(Og=1,wf.exports=Ax()),wf.exports}var Df={exports:{}},yn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Pg;function wx(){if(Pg)return yn;Pg=1;var o=Jh();function t(m){var p="https://react.dev/errors/"+m;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var g=2;g<arguments.length;g++)p+="&args[]="+encodeURIComponent(arguments[g])}return"Minified React error #"+m+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var r={d:{f:i,r:function(){throw Error(t(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");function u(m,p,g){var v=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:v==null?null:""+v,children:m,containerInfo:p,implementation:g}}var h=o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function d(m,p){if(m==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return yn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=r,yn.createPortal=function(m,p){var g=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(t(299));return u(m,p,null,g)},yn.flushSync=function(m){var p=h.T,g=r.p;try{if(h.T=null,r.p=2,m)return m()}finally{h.T=p,r.p=g,r.d.f()}},yn.preconnect=function(m,p){typeof m=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,r.d.C(m,p))},yn.prefetchDNS=function(m){typeof m=="string"&&r.d.D(m)},yn.preinit=function(m,p){if(typeof m=="string"&&p&&typeof p.as=="string"){var g=p.as,v=d(g,p.crossOrigin),x=typeof p.integrity=="string"?p.integrity:void 0,M=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;g==="style"?r.d.S(m,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:v,integrity:x,fetchPriority:M}):g==="script"&&r.d.X(m,{crossOrigin:v,integrity:x,fetchPriority:M,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},yn.preinitModule=function(m,p){if(typeof m=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var g=d(p.as,p.crossOrigin);r.d.M(m,{crossOrigin:g,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&r.d.M(m)},yn.preload=function(m,p){if(typeof m=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var g=p.as,v=d(g,p.crossOrigin);r.d.L(m,g,{crossOrigin:v,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},yn.preloadModule=function(m,p){if(typeof m=="string")if(p){var g=d(p.as,p.crossOrigin);r.d.m(m,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:g,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else r.d.m(m)},yn.requestFormReset=function(m){r.d.r(m)},yn.unstable_batchedUpdates=function(m,p){return m(p)},yn.useFormState=function(m,p,g){return h.H.useFormState(m,p,g)},yn.useFormStatus=function(){return h.H.useHostTransitionStatus()},yn.version="19.0.0",yn}var zg;function Cx(){if(zg)return Df.exports;zg=1;function o(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)}catch(t){console.error(t)}}return o(),Df.exports=wx(),Df.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Fg;function Dx(){if(Fg)return Mo;Fg=1;var o=Rx(),t=Jh(),i=Cx();function r(e){var n="https://react.dev/errors/"+e;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}var u=Symbol.for("react.element"),h=Symbol.for("react.transitional.element"),d=Symbol.for("react.portal"),m=Symbol.for("react.fragment"),p=Symbol.for("react.strict_mode"),g=Symbol.for("react.profiler"),v=Symbol.for("react.provider"),x=Symbol.for("react.consumer"),M=Symbol.for("react.context"),T=Symbol.for("react.forward_ref"),C=Symbol.for("react.suspense"),y=Symbol.for("react.suspense_list"),_=Symbol.for("react.memo"),P=Symbol.for("react.lazy"),O=Symbol.for("react.offscreen"),D=Symbol.for("react.memo_cache_sentinel"),H=Symbol.iterator;function F(e){return e===null||typeof e!="object"?null:(e=H&&e[H]||e["@@iterator"],typeof e=="function"?e:null)}var z=Symbol.for("react.client.reference");function K(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===z?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case m:return"Fragment";case d:return"Portal";case g:return"Profiler";case p:return"StrictMode";case C:return"Suspense";case y:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case M:return(e.displayName||"Context")+".Provider";case x:return(e._context.displayName||"Context")+".Consumer";case T:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case _:return n=e.displayName||null,n!==null?n:K(e.type)||"Memo";case P:n=e._payload,e=e._init;try{return K(e(n))}catch{}}return null}var w=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,R=Object.assign,I,ct;function it(e){if(I===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);I=n&&n[1]||"",ct=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+I+e+ct}var mt=!1;function ht(e,n){if(!e||mt)return"";mt=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var s={DetermineComponentFrameRoot:function(){try{if(n){var _t=function(){throw Error()};if(Object.defineProperty(_t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(_t,[])}catch(ot){var et=ot}Reflect.construct(e,[],_t)}else{try{_t.call()}catch(ot){et=ot}e.call(_t.prototype)}}else{try{throw Error()}catch(ot){et=ot}(_t=e())&&typeof _t.catch=="function"&&_t.catch(function(){})}}catch(ot){if(ot&&et&&typeof ot.stack=="string")return[ot.stack,et.stack]}return[null,null]}};s.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var c=Object.getOwnPropertyDescriptor(s.DetermineComponentFrameRoot,"name");c&&c.configurable&&Object.defineProperty(s.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var f=s.DetermineComponentFrameRoot(),S=f[0],b=f[1];if(S&&b){var N=S.split(`
`),V=b.split(`
`);for(c=s=0;s<N.length&&!N[s].includes("DetermineComponentFrameRoot");)s++;for(;c<V.length&&!V[c].includes("DetermineComponentFrameRoot");)c++;if(s===N.length||c===V.length)for(s=N.length-1,c=V.length-1;1<=s&&0<=c&&N[s]!==V[c];)c--;for(;1<=s&&0<=c;s--,c--)if(N[s]!==V[c]){if(s!==1||c!==1)do if(s--,c--,0>c||N[s]!==V[c]){var lt=`
`+N[s].replace(" at new "," at ");return e.displayName&&lt.includes("<anonymous>")&&(lt=lt.replace("<anonymous>",e.displayName)),lt}while(1<=s&&0<=c);break}}}finally{mt=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?it(a):""}function W(e){switch(e.tag){case 26:case 27:case 5:return it(e.type);case 16:return it("Lazy");case 13:return it("Suspense");case 19:return it("SuspenseList");case 0:case 15:return e=ht(e.type,!1),e;case 11:return e=ht(e.type.render,!1),e;case 1:return e=ht(e.type,!0),e;default:return""}}function at(e){try{var n="";do n+=W(e),e=e.return;while(e);return n}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}function j(e){var n=e,a=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,n.flags&4098&&(a=n.return),e=n.return;while(e)}return n.tag===3?a:null}function St(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function L(e){if(j(e)!==e)throw Error(r(188))}function nt(e){var n=e.alternate;if(!n){if(n=j(e),n===null)throw Error(r(188));return n!==e?null:e}for(var a=e,s=n;;){var c=a.return;if(c===null)break;var f=c.alternate;if(f===null){if(s=c.return,s!==null){a=s;continue}break}if(c.child===f.child){for(f=c.child;f;){if(f===a)return L(c),e;if(f===s)return L(c),n;f=f.sibling}throw Error(r(188))}if(a.return!==s.return)a=c,s=f;else{for(var S=!1,b=c.child;b;){if(b===a){S=!0,a=c,s=f;break}if(b===s){S=!0,s=c,a=f;break}b=b.sibling}if(!S){for(b=f.child;b;){if(b===a){S=!0,a=f,s=c;break}if(b===s){S=!0,s=f,a=c;break}b=b.sibling}if(!S)throw Error(r(189))}}if(a.alternate!==s)throw Error(r(190))}if(a.tag!==3)throw Error(r(188));return a.stateNode.current===a?e:n}function Et(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e;for(e=e.child;e!==null;){if(n=Et(e),n!==null)return n;e=e.sibling}return null}var At=Array.isArray,q=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,dt={pending:!1,data:null,method:null,action:null},xt=[],Tt=-1;function Rt(e){return{current:e}}function Ft(e){0>Tt||(e.current=xt[Tt],xt[Tt]=null,Tt--)}function Gt(e,n){Tt++,xt[Tt]=e.current,e.current=n}var ye=Rt(null),ue=Rt(null),we=Rt(null),B=Rt(null);function pn(e,n){switch(Gt(we,n),Gt(ue,e),Gt(ye,null),e=n.nodeType,e){case 9:case 11:n=(n=n.documentElement)&&(n=n.namespaceURI)?ag(n):0;break;default:if(e=e===8?n.parentNode:n,n=e.tagName,e=e.namespaceURI)e=ag(e),n=rg(e,n);else switch(n){case"svg":n=1;break;case"math":n=2;break;default:n=0}}Ft(ye),Gt(ye,n)}function se(){Ft(ye),Ft(ue),Ft(we)}function he(e){e.memoizedState!==null&&Gt(B,e);var n=ye.current,a=rg(n,e.type);n!==a&&(Gt(ue,e),Gt(ye,a))}function Wt(e){ue.current===e&&(Ft(ye),Ft(ue)),B.current===e&&(Ft(B),go._currentValue=dt)}var De=Object.prototype.hasOwnProperty,qt=o.unstable_scheduleCallback,U=o.unstable_cancelCallback,E=o.unstable_shouldYield,tt=o.unstable_requestPaint,ut=o.unstable_now,vt=o.unstable_getCurrentPriorityLevel,ft=o.unstable_ImmediatePriority,Vt=o.unstable_UserBlockingPriority,Ct=o.unstable_NormalPriority,zt=o.unstable_LowPriority,me=o.unstable_IdlePriority,Mt=o.log,Bt=o.unstable_setDisableYieldValue,jt=null,kt=null;function It(e){if(kt&&typeof kt.onCommitFiberRoot=="function")try{kt.onCommitFiberRoot(jt,e,void 0,(e.current.flags&128)===128)}catch{}}function re(e){if(typeof Mt=="function"&&Bt(e),kt&&typeof kt.setStrictMode=="function")try{kt.setStrictMode(jt,e)}catch{}}var Kt=Math.clz32?Math.clz32:Lt,Ue=Math.log,k=Math.LN2;function Lt(e){return e>>>=0,e===0?32:31-(Ue(e)/k|0)|0}var st=128,gt=4194304;function wt(e){var n=e&42;if(n!==0)return n;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194176;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Dt(e,n){var a=e.pendingLanes;if(a===0)return 0;var s=0,c=e.suspendedLanes,f=e.pingedLanes,S=e.warmLanes;e=e.finishedLanes!==0;var b=a&134217727;return b!==0?(a=b&~c,a!==0?s=wt(a):(f&=b,f!==0?s=wt(f):e||(S=b&~S,S!==0&&(s=wt(S))))):(b=a&~c,b!==0?s=wt(b):f!==0?s=wt(f):e||(S=a&~S,S!==0&&(s=wt(S)))),s===0?0:n!==0&&n!==s&&!(n&c)&&(c=s&-s,S=n&-n,c>=S||c===32&&(S&4194176)!==0)?n:s}function $t(e,n){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&n)===0}function He(e,n){switch(e){case 1:case 2:case 4:case 8:return n+250;case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function tn(){var e=st;return st<<=1,!(st&4194176)&&(st=128),e}function Ee(){var e=gt;return gt<<=1,!(gt&62914560)&&(gt=4194304),e}function Tn(e){for(var n=[],a=0;31>a;a++)n.push(e);return n}function bn(e,n){e.pendingLanes|=n,n!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Fo(e,n,a,s,c,f){var S=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var b=e.entanglements,N=e.expirationTimes,V=e.hiddenUpdates;for(a=S&~a;0<a;){var lt=31-Kt(a),_t=1<<lt;b[lt]=0,N[lt]=-1;var et=V[lt];if(et!==null)for(V[lt]=null,lt=0;lt<et.length;lt++){var ot=et[lt];ot!==null&&(ot.lane&=-536870913)}a&=~_t}s!==0&&As(e,s,0),f!==0&&c===0&&e.tag!==0&&(e.suspendedLanes|=f&~(S&~n))}function As(e,n,a){e.pendingLanes|=n,e.suspendedLanes&=~n;var s=31-Kt(n);e.entangledLanes|=n,e.entanglements[s]=e.entanglements[s]|1073741824|a&4194218}function xi(e,n){var a=e.entangledLanes|=n;for(e=e.entanglements;a;){var s=31-Kt(a),c=1<<s;c&n|e[s]&n&&(e[s]|=n),a&=~c}}function _r(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function Rs(){var e=q.p;return e!==0?e:(e=window.event,e===void 0?32:Eg(e.type))}function Bo(e,n){var a=q.p;try{return q.p=e,n()}finally{q.p=a}}var In=Math.random().toString(36).slice(2),en="__reactFiber$"+In,nn="__reactProps$"+In,Di="__reactContainer$"+In,vr="__reactEvents$"+In,Mc="__reactListeners$"+In,Ec="__reactHandles$"+In,Io="__reactResources$"+In,za="__reactMarker$"+In;function ws(e){delete e[en],delete e[nn],delete e[vr],delete e[Mc],delete e[Ec]}function Ui(e){var n=e[en];if(n)return n;for(var a=e.parentNode;a;){if(n=a[Di]||a[en]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(e=lg(e);e!==null;){if(a=e[en])return a;e=lg(e)}return n}e=a,a=e.parentNode}return null}function A(e){if(e=e[en]||e[Di]){var n=e.tag;if(n===5||n===6||n===13||n===26||n===27||n===3)return e}return null}function X(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e.stateNode;throw Error(r(33))}function $(e){var n=e[Io];return n||(n=e[Io]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function Q(e){e[za]=!0}var Y=new Set,yt={};function bt(e,n){Ot(e,n),Ot(e+"Capture",n)}function Ot(e,n){for(yt[e]=n,e=0;e<n.length;e++)Y.add(n[e])}var Nt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),te=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),ee={},Zt={};function ge(e){return De.call(Zt,e)?!0:De.call(ee,e)?!1:te.test(e)?Zt[e]=!0:(ee[e]=!0,!1)}function _e(e,n,a){if(ge(n))if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(n);return;case"boolean":var s=n.toLowerCase().slice(0,5);if(s!=="data-"&&s!=="aria-"){e.removeAttribute(n);return}}e.setAttribute(n,""+a)}}function Ie(e,n,a){if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttribute(n,""+a)}}function Te(e,n,a,s){if(s===null)e.removeAttribute(a);else{switch(typeof s){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(n,a,""+s)}}function ne(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Qt(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function an(e){var n=Qt(e)?"checked":"value",a=Object.getOwnPropertyDescriptor(e.constructor.prototype,n),s=""+e[n];if(!e.hasOwnProperty(n)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var c=a.get,f=a.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return c.call(this)},set:function(S){s=""+S,f.call(this,S)}}),Object.defineProperty(e,n,{enumerable:a.enumerable}),{getValue:function(){return s},setValue:function(S){s=""+S},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function ve(e){e._valueTracker||(e._valueTracker=an(e))}function Nn(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var a=n.getValue(),s="";return e&&(s=Qt(e)?e.checked?"true":"false":e.value),e=s,e!==a?(n.setValue(e),!0):!1}function oi(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var An=/[\n"\\]/g;function cn(e){return e.replace(An,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function Le(e,n,a,s,c,f,S,b){e.name="",S!=null&&typeof S!="function"&&typeof S!="symbol"&&typeof S!="boolean"?e.type=S:e.removeAttribute("type"),n!=null?S==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+ne(n)):e.value!==""+ne(n)&&(e.value=""+ne(n)):S!=="submit"&&S!=="reset"||e.removeAttribute("value"),n!=null?xn(e,S,ne(n)):a!=null?xn(e,S,ne(a)):s!=null&&e.removeAttribute("value"),c==null&&f!=null&&(e.defaultChecked=!!f),c!=null&&(e.checked=c&&typeof c!="function"&&typeof c!="symbol"),b!=null&&typeof b!="function"&&typeof b!="symbol"&&typeof b!="boolean"?e.name=""+ne(b):e.removeAttribute("name")}function Rn(e,n,a,s,c,f,S,b){if(f!=null&&typeof f!="function"&&typeof f!="symbol"&&typeof f!="boolean"&&(e.type=f),n!=null||a!=null){if(!(f!=="submit"&&f!=="reset"||n!=null))return;a=a!=null?""+ne(a):"",n=n!=null?""+ne(n):a,b||n===e.value||(e.value=n),e.defaultValue=n}s=s??c,s=typeof s!="function"&&typeof s!="symbol"&&!!s,e.checked=b?e.checked:!!s,e.defaultChecked=!!s,S!=null&&typeof S!="function"&&typeof S!="symbol"&&typeof S!="boolean"&&(e.name=S)}function xn(e,n,a){n==="number"&&oi(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function ke(e,n,a,s){if(e=e.options,n){n={};for(var c=0;c<a.length;c++)n["$"+a[c]]=!0;for(a=0;a<e.length;a++)c=n.hasOwnProperty("$"+e[a].value),e[a].selected!==c&&(e[a].selected=c),c&&s&&(e[a].defaultSelected=!0)}else{for(a=""+ne(a),n=null,c=0;c<e.length;c++){if(e[c].value===a){e[c].selected=!0,s&&(e[c].defaultSelected=!0);return}n!==null||e[c].disabled||(n=e[c])}n!==null&&(n.selected=!0)}}function mn(e,n,a){if(n!=null&&(n=""+ne(n),n!==e.value&&(e.value=n),a==null)){e.defaultValue!==n&&(e.defaultValue=n);return}e.defaultValue=a!=null?""+ne(a):""}function xr(e,n,a,s){if(n==null){if(s!=null){if(a!=null)throw Error(r(92));if(At(s)){if(1<s.length)throw Error(r(93));s=s[0]}a=s}a==null&&(a=""),n=a}a=ne(n),e.defaultValue=a,s=e.textContent,s===a&&s!==""&&s!==null&&(e.value=s)}function On(e,n){if(n){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=n;return}}e.textContent=n}var x0=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function hd(e,n,a){var s=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?s?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="":s?e.setProperty(n,a):typeof a!="number"||a===0||x0.has(n)?n==="float"?e.cssFloat=a:e[n]=(""+a).trim():e[n]=a+"px"}function dd(e,n,a){if(n!=null&&typeof n!="object")throw Error(r(62));if(e=e.style,a!=null){for(var s in a)!a.hasOwnProperty(s)||n!=null&&n.hasOwnProperty(s)||(s.indexOf("--")===0?e.setProperty(s,""):s==="float"?e.cssFloat="":e[s]="");for(var c in n)s=n[c],n.hasOwnProperty(c)&&a[c]!==s&&hd(e,c,s)}else for(var f in n)n.hasOwnProperty(f)&&hd(e,f,n[f])}function Tc(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var S0=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),y0=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Ho(e){return y0.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}var bc=null;function Ac(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Sr=null,yr=null;function pd(e){var n=A(e);if(n&&(e=n.stateNode)){var a=e[nn]||null;t:switch(e=n.stateNode,n.type){case"input":if(Le(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+cn(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var s=a[n];if(s!==e&&s.form===e.form){var c=s[nn]||null;if(!c)throw Error(r(90));Le(s,c.value,c.defaultValue,c.defaultValue,c.checked,c.defaultChecked,c.type,c.name)}}for(n=0;n<a.length;n++)s=a[n],s.form===e.form&&Nn(s)}break t;case"textarea":mn(e,a.value,a.defaultValue);break t;case"select":n=a.value,n!=null&&ke(e,!!a.multiple,n,!1)}}}var Rc=!1;function md(e,n,a){if(Rc)return e(n,a);Rc=!0;try{var s=e(n);return s}finally{if(Rc=!1,(Sr!==null||yr!==null)&&(El(),Sr&&(n=Sr,e=yr,yr=Sr=null,pd(n),e)))for(n=0;n<e.length;n++)pd(e[n])}}function Cs(e,n){var a=e.stateNode;if(a===null)return null;var s=a[nn]||null;if(s===null)return null;a=s[n];t:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(s=!s.disabled)||(e=e.type,s=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!s;break t;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(r(231,n,typeof a));return a}var wc=!1;if(Nt)try{var Ds={};Object.defineProperty(Ds,"passive",{get:function(){wc=!0}}),window.addEventListener("test",Ds,Ds),window.removeEventListener("test",Ds,Ds)}catch{wc=!1}var aa=null,Cc=null,Go=null;function gd(){if(Go)return Go;var e,n=Cc,a=n.length,s,c="value"in aa?aa.value:aa.textContent,f=c.length;for(e=0;e<a&&n[e]===c[e];e++);var S=a-e;for(s=1;s<=S&&n[a-s]===c[f-s];s++);return Go=c.slice(e,1<s?1-s:void 0)}function Vo(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function ko(){return!0}function _d(){return!1}function Pn(e){function n(a,s,c,f,S){this._reactName=a,this._targetInst=c,this.type=s,this.nativeEvent=f,this.target=S,this.currentTarget=null;for(var b in e)e.hasOwnProperty(b)&&(a=e[b],this[b]=a?a(f):f[b]);return this.isDefaultPrevented=(f.defaultPrevented!=null?f.defaultPrevented:f.returnValue===!1)?ko:_d,this.isPropagationStopped=_d,this}return R(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=ko)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=ko)},persist:function(){},isPersistent:ko}),n}var Fa={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Xo=Pn(Fa),Us=R({},Fa,{view:0,detail:0}),M0=Pn(Us),Dc,Uc,Ls,Wo=R({},Us,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Nc,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Ls&&(Ls&&e.type==="mousemove"?(Dc=e.screenX-Ls.screenX,Uc=e.screenY-Ls.screenY):Uc=Dc=0,Ls=e),Dc)},movementY:function(e){return"movementY"in e?e.movementY:Uc}}),vd=Pn(Wo),E0=R({},Wo,{dataTransfer:0}),T0=Pn(E0),b0=R({},Us,{relatedTarget:0}),Lc=Pn(b0),A0=R({},Fa,{animationName:0,elapsedTime:0,pseudoElement:0}),R0=Pn(A0),w0=R({},Fa,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),C0=Pn(w0),D0=R({},Fa,{data:0}),xd=Pn(D0),U0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},L0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},N0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function O0(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=N0[e])?!!n[e]:!1}function Nc(){return O0}var P0=R({},Us,{key:function(e){if(e.key){var n=U0[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=Vo(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?L0[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Nc,charCode:function(e){return e.type==="keypress"?Vo(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Vo(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),z0=Pn(P0),F0=R({},Wo,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Sd=Pn(F0),B0=R({},Us,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Nc}),I0=Pn(B0),H0=R({},Fa,{propertyName:0,elapsedTime:0,pseudoElement:0}),G0=Pn(H0),V0=R({},Wo,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),k0=Pn(V0),X0=R({},Fa,{newState:0,oldState:0}),W0=Pn(X0),q0=[9,13,27,32],Oc=Nt&&"CompositionEvent"in window,Ns=null;Nt&&"documentMode"in document&&(Ns=document.documentMode);var Y0=Nt&&"TextEvent"in window&&!Ns,yd=Nt&&(!Oc||Ns&&8<Ns&&11>=Ns),Md=" ",Ed=!1;function Td(e,n){switch(e){case"keyup":return q0.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function bd(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Mr=!1;function j0(e,n){switch(e){case"compositionend":return bd(n);case"keypress":return n.which!==32?null:(Ed=!0,Md);case"textInput":return e=n.data,e===Md&&Ed?null:e;default:return null}}function Z0(e,n){if(Mr)return e==="compositionend"||!Oc&&Td(e,n)?(e=gd(),Go=Cc=aa=null,Mr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return yd&&n.locale!=="ko"?null:n.data;default:return null}}var K0={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ad(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!K0[e.type]:n==="textarea"}function Rd(e,n,a,s){Sr?yr?yr.push(s):yr=[s]:Sr=s,n=wl(n,"onChange"),0<n.length&&(a=new Xo("onChange","change",null,a,s),e.push({event:a,listeners:n}))}var Os=null,Ps=null;function Q0(e){$m(e,0)}function qo(e){var n=X(e);if(Nn(n))return e}function wd(e,n){if(e==="change")return n}var Cd=!1;if(Nt){var Pc;if(Nt){var zc="oninput"in document;if(!zc){var Dd=document.createElement("div");Dd.setAttribute("oninput","return;"),zc=typeof Dd.oninput=="function"}Pc=zc}else Pc=!1;Cd=Pc&&(!document.documentMode||9<document.documentMode)}function Ud(){Os&&(Os.detachEvent("onpropertychange",Ld),Ps=Os=null)}function Ld(e){if(e.propertyName==="value"&&qo(Ps)){var n=[];Rd(n,Ps,e,Ac(e)),md(Q0,n)}}function J0(e,n,a){e==="focusin"?(Ud(),Os=n,Ps=a,Os.attachEvent("onpropertychange",Ld)):e==="focusout"&&Ud()}function $0(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return qo(Ps)}function tv(e,n){if(e==="click")return qo(n)}function ev(e,n){if(e==="input"||e==="change")return qo(n)}function nv(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var Hn=typeof Object.is=="function"?Object.is:nv;function zs(e,n){if(Hn(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var a=Object.keys(e),s=Object.keys(n);if(a.length!==s.length)return!1;for(s=0;s<a.length;s++){var c=a[s];if(!De.call(n,c)||!Hn(e[c],n[c]))return!1}return!0}function Nd(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Od(e,n){var a=Nd(e);e=0;for(var s;a;){if(a.nodeType===3){if(s=e+a.textContent.length,e<=n&&s>=n)return{node:a,offset:n-e};e=s}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=Nd(a)}}function Pd(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?Pd(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function zd(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var n=oi(e.document);n instanceof e.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)e=n.contentWindow;else break;n=oi(e.document)}return n}function Fc(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}function iv(e,n){var a=zd(n);n=e.focusedElem;var s=e.selectionRange;if(a!==n&&n&&n.ownerDocument&&Pd(n.ownerDocument.documentElement,n)){if(s!==null&&Fc(n)){if(e=s.start,a=s.end,a===void 0&&(a=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(a,n.value.length);else if(a=(e=n.ownerDocument||document)&&e.defaultView||window,a.getSelection){a=a.getSelection();var c=n.textContent.length,f=Math.min(s.start,c);s=s.end===void 0?f:Math.min(s.end,c),!a.extend&&f>s&&(c=s,s=f,f=c),c=Od(n,f);var S=Od(n,s);c&&S&&(a.rangeCount!==1||a.anchorNode!==c.node||a.anchorOffset!==c.offset||a.focusNode!==S.node||a.focusOffset!==S.offset)&&(e=e.createRange(),e.setStart(c.node,c.offset),a.removeAllRanges(),f>s?(a.addRange(e),a.extend(S.node,S.offset)):(e.setEnd(S.node,S.offset),a.addRange(e)))}}for(e=[],a=n;a=a.parentNode;)a.nodeType===1&&e.push({element:a,left:a.scrollLeft,top:a.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)a=e[n],a.element.scrollLeft=a.left,a.element.scrollTop=a.top}}var av=Nt&&"documentMode"in document&&11>=document.documentMode,Er=null,Bc=null,Fs=null,Ic=!1;function Fd(e,n,a){var s=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Ic||Er==null||Er!==oi(s)||(s=Er,"selectionStart"in s&&Fc(s)?s={start:s.selectionStart,end:s.selectionEnd}:(s=(s.ownerDocument&&s.ownerDocument.defaultView||window).getSelection(),s={anchorNode:s.anchorNode,anchorOffset:s.anchorOffset,focusNode:s.focusNode,focusOffset:s.focusOffset}),Fs&&zs(Fs,s)||(Fs=s,s=wl(Bc,"onSelect"),0<s.length&&(n=new Xo("onSelect","select",null,n,a),e.push({event:n,listeners:s}),n.target=Er)))}function Ba(e,n){var a={};return a[e.toLowerCase()]=n.toLowerCase(),a["Webkit"+e]="webkit"+n,a["Moz"+e]="moz"+n,a}var Tr={animationend:Ba("Animation","AnimationEnd"),animationiteration:Ba("Animation","AnimationIteration"),animationstart:Ba("Animation","AnimationStart"),transitionrun:Ba("Transition","TransitionRun"),transitionstart:Ba("Transition","TransitionStart"),transitioncancel:Ba("Transition","TransitionCancel"),transitionend:Ba("Transition","TransitionEnd")},Hc={},Bd={};Nt&&(Bd=document.createElement("div").style,"AnimationEvent"in window||(delete Tr.animationend.animation,delete Tr.animationiteration.animation,delete Tr.animationstart.animation),"TransitionEvent"in window||delete Tr.transitionend.transition);function Ia(e){if(Hc[e])return Hc[e];if(!Tr[e])return e;var n=Tr[e],a;for(a in n)if(n.hasOwnProperty(a)&&a in Bd)return Hc[e]=n[a];return e}var Id=Ia("animationend"),Hd=Ia("animationiteration"),Gd=Ia("animationstart"),rv=Ia("transitionrun"),sv=Ia("transitionstart"),ov=Ia("transitioncancel"),Vd=Ia("transitionend"),kd=new Map,Xd="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll scrollEnd toggle touchMove waiting wheel".split(" ");function li(e,n){kd.set(e,n),bt(n,[e])}var Zn=[],br=0,Gc=0;function Yo(){for(var e=br,n=Gc=br=0;n<e;){var a=Zn[n];Zn[n++]=null;var s=Zn[n];Zn[n++]=null;var c=Zn[n];Zn[n++]=null;var f=Zn[n];if(Zn[n++]=null,s!==null&&c!==null){var S=s.pending;S===null?c.next=c:(c.next=S.next,S.next=c),s.pending=c}f!==0&&Wd(a,c,f)}}function jo(e,n,a,s){Zn[br++]=e,Zn[br++]=n,Zn[br++]=a,Zn[br++]=s,Gc|=s,e.lanes|=s,e=e.alternate,e!==null&&(e.lanes|=s)}function Vc(e,n,a,s){return jo(e,n,a,s),Zo(e)}function ra(e,n){return jo(e,null,null,n),Zo(e)}function Wd(e,n,a){e.lanes|=a;var s=e.alternate;s!==null&&(s.lanes|=a);for(var c=!1,f=e.return;f!==null;)f.childLanes|=a,s=f.alternate,s!==null&&(s.childLanes|=a),f.tag===22&&(e=f.stateNode,e===null||e._visibility&1||(c=!0)),e=f,f=f.return;c&&n!==null&&e.tag===3&&(f=e.stateNode,c=31-Kt(a),f=f.hiddenUpdates,e=f[c],e===null?f[c]=[n]:e.push(n),n.lane=a|536870912)}function Zo(e){if(50<lo)throw lo=0,ju=null,Error(r(185));for(var n=e.return;n!==null;)e=n,n=e.return;return e.tag===3?e.stateNode:null}var Ar={},qd=new WeakMap;function Kn(e,n){if(typeof e=="object"&&e!==null){var a=qd.get(e);return a!==void 0?a:(n={value:e,source:n,stack:at(n)},qd.set(e,n),n)}return{value:e,source:n,stack:at(n)}}var Rr=[],wr=0,Ko=null,Qo=0,Qn=[],Jn=0,Ha=null,Li=1,Ni="";function Ga(e,n){Rr[wr++]=Qo,Rr[wr++]=Ko,Ko=e,Qo=n}function Yd(e,n,a){Qn[Jn++]=Li,Qn[Jn++]=Ni,Qn[Jn++]=Ha,Ha=e;var s=Li;e=Ni;var c=32-Kt(s)-1;s&=~(1<<c),a+=1;var f=32-Kt(n)+c;if(30<f){var S=c-c%5;f=(s&(1<<S)-1).toString(32),s>>=S,c-=S,Li=1<<32-Kt(n)+c|a<<c|s,Ni=f+e}else Li=1<<f|a<<c|s,Ni=e}function kc(e){e.return!==null&&(Ga(e,1),Yd(e,1,0))}function Xc(e){for(;e===Ko;)Ko=Rr[--wr],Rr[wr]=null,Qo=Rr[--wr],Rr[wr]=null;for(;e===Ha;)Ha=Qn[--Jn],Qn[Jn]=null,Ni=Qn[--Jn],Qn[Jn]=null,Li=Qn[--Jn],Qn[Jn]=null}var wn=null,gn=null,be=!1,ci=null,Si=!1,Wc=Error(r(519));function Va(e){var n=Error(r(418,""));throw Hs(Kn(n,e)),Wc}function jd(e){var n=e.stateNode,a=e.type,s=e.memoizedProps;switch(n[en]=e,n[nn]=s,a){case"dialog":xe("cancel",n),xe("close",n);break;case"iframe":case"object":case"embed":xe("load",n);break;case"video":case"audio":for(a=0;a<uo.length;a++)xe(uo[a],n);break;case"source":xe("error",n);break;case"img":case"image":case"link":xe("error",n),xe("load",n);break;case"details":xe("toggle",n);break;case"input":xe("invalid",n),Rn(n,s.value,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name,!0),ve(n);break;case"select":xe("invalid",n);break;case"textarea":xe("invalid",n),xr(n,s.value,s.defaultValue,s.children),ve(n)}a=s.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||s.suppressHydrationWarning===!0||ig(n.textContent,a)?(s.popover!=null&&(xe("beforetoggle",n),xe("toggle",n)),s.onScroll!=null&&xe("scroll",n),s.onScrollEnd!=null&&xe("scrollend",n),s.onClick!=null&&(n.onclick=Cl),n=!0):n=!1,n||Va(e)}function Zd(e){for(wn=e.return;wn;)switch(wn.tag){case 3:case 27:Si=!0;return;case 5:case 13:Si=!1;return;default:wn=wn.return}}function Bs(e){if(e!==wn)return!1;if(!be)return Zd(e),be=!0,!1;var n=!1,a;if((a=e.tag!==3&&e.tag!==27)&&((a=e.tag===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||hf(e.type,e.memoizedProps)),a=!a),a&&(n=!0),n&&gn&&Va(e),Zd(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(r(317));t:{for(e=e.nextSibling,n=0;e;){if(e.nodeType===8)if(a=e.data,a==="/$"){if(n===0){gn=fi(e.nextSibling);break t}n--}else a!=="$"&&a!=="$!"&&a!=="$?"||n++;e=e.nextSibling}gn=null}}else gn=wn?fi(e.stateNode.nextSibling):null;return!0}function Is(){gn=wn=null,be=!1}function Hs(e){ci===null?ci=[e]:ci.push(e)}var Gs=Error(r(460)),Kd=Error(r(474)),qc={then:function(){}};function Qd(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Jo(){}function Jd(e,n,a){switch(a=e[a],a===void 0?e.push(n):a!==n&&(n.then(Jo,Jo),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,e===Gs?Error(r(483)):e;default:if(typeof n.status=="string")n.then(Jo,Jo);else{if(e=Fe,e!==null&&100<e.shellSuspendCounter)throw Error(r(482));e=n,e.status="pending",e.then(function(s){if(n.status==="pending"){var c=n;c.status="fulfilled",c.value=s}},function(s){if(n.status==="pending"){var c=n;c.status="rejected",c.reason=s}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,e===Gs?Error(r(483)):e}throw Vs=n,Gs}}var Vs=null;function $d(){if(Vs===null)throw Error(r(459));var e=Vs;return Vs=null,e}var Cr=null,ks=0;function $o(e){var n=ks;return ks+=1,Cr===null&&(Cr=[]),Jd(Cr,e,n)}function Xs(e,n){n=n.props.ref,e.ref=n!==void 0?n:null}function tl(e,n){throw n.$$typeof===u?Error(r(525)):(e=Object.prototype.toString.call(n),Error(r(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)))}function tp(e){var n=e._init;return n(e._payload)}function ep(e){function n(Z,G){if(e){var J=Z.deletions;J===null?(Z.deletions=[G],Z.flags|=16):J.push(G)}}function a(Z,G){if(!e)return null;for(;G!==null;)n(Z,G),G=G.sibling;return null}function s(Z){for(var G=new Map;Z!==null;)Z.key!==null?G.set(Z.key,Z):G.set(Z.index,Z),Z=Z.sibling;return G}function c(Z,G){return Z=_a(Z,G),Z.index=0,Z.sibling=null,Z}function f(Z,G,J){return Z.index=J,e?(J=Z.alternate,J!==null?(J=J.index,J<G?(Z.flags|=33554434,G):J):(Z.flags|=33554434,G)):(Z.flags|=1048576,G)}function S(Z){return e&&Z.alternate===null&&(Z.flags|=33554434),Z}function b(Z,G,J,pt){return G===null||G.tag!==6?(G=Hu(J,Z.mode,pt),G.return=Z,G):(G=c(G,J),G.return=Z,G)}function N(Z,G,J,pt){var Ht=J.type;return Ht===m?lt(Z,G,J.props.children,pt,J.key):G!==null&&(G.elementType===Ht||typeof Ht=="object"&&Ht!==null&&Ht.$$typeof===P&&tp(Ht)===G.type)?(G=c(G,J.props),Xs(G,J),G.return=Z,G):(G=vl(J.type,J.key,J.props,null,Z.mode,pt),Xs(G,J),G.return=Z,G)}function V(Z,G,J,pt){return G===null||G.tag!==4||G.stateNode.containerInfo!==J.containerInfo||G.stateNode.implementation!==J.implementation?(G=Gu(J,Z.mode,pt),G.return=Z,G):(G=c(G,J.children||[]),G.return=Z,G)}function lt(Z,G,J,pt,Ht){return G===null||G.tag!==7?(G=Ja(J,Z.mode,pt,Ht),G.return=Z,G):(G=c(G,J),G.return=Z,G)}function _t(Z,G,J){if(typeof G=="string"&&G!==""||typeof G=="number"||typeof G=="bigint")return G=Hu(""+G,Z.mode,J),G.return=Z,G;if(typeof G=="object"&&G!==null){switch(G.$$typeof){case h:return J=vl(G.type,G.key,G.props,null,Z.mode,J),Xs(J,G),J.return=Z,J;case d:return G=Gu(G,Z.mode,J),G.return=Z,G;case P:var pt=G._init;return G=pt(G._payload),_t(Z,G,J)}if(At(G)||F(G))return G=Ja(G,Z.mode,J,null),G.return=Z,G;if(typeof G.then=="function")return _t(Z,$o(G),J);if(G.$$typeof===M)return _t(Z,ml(Z,G),J);tl(Z,G)}return null}function et(Z,G,J,pt){var Ht=G!==null?G.key:null;if(typeof J=="string"&&J!==""||typeof J=="number"||typeof J=="bigint")return Ht!==null?null:b(Z,G,""+J,pt);if(typeof J=="object"&&J!==null){switch(J.$$typeof){case h:return J.key===Ht?N(Z,G,J,pt):null;case d:return J.key===Ht?V(Z,G,J,pt):null;case P:return Ht=J._init,J=Ht(J._payload),et(Z,G,J,pt)}if(At(J)||F(J))return Ht!==null?null:lt(Z,G,J,pt,null);if(typeof J.then=="function")return et(Z,G,$o(J),pt);if(J.$$typeof===M)return et(Z,G,ml(Z,J),pt);tl(Z,J)}return null}function ot(Z,G,J,pt,Ht){if(typeof pt=="string"&&pt!==""||typeof pt=="number"||typeof pt=="bigint")return Z=Z.get(J)||null,b(G,Z,""+pt,Ht);if(typeof pt=="object"&&pt!==null){switch(pt.$$typeof){case h:return Z=Z.get(pt.key===null?J:pt.key)||null,N(G,Z,pt,Ht);case d:return Z=Z.get(pt.key===null?J:pt.key)||null,V(G,Z,pt,Ht);case P:var de=pt._init;return pt=de(pt._payload),ot(Z,G,J,pt,Ht)}if(At(pt)||F(pt))return Z=Z.get(J)||null,lt(G,Z,pt,Ht,null);if(typeof pt.then=="function")return ot(Z,G,J,$o(pt),Ht);if(pt.$$typeof===M)return ot(Z,G,J,ml(G,pt),Ht);tl(G,pt)}return null}function Xt(Z,G,J,pt){for(var Ht=null,de=null,Yt=G,Jt=G=0,hn=null;Yt!==null&&Jt<J.length;Jt++){Yt.index>Jt?(hn=Yt,Yt=null):hn=Yt.sibling;var Ae=et(Z,Yt,J[Jt],pt);if(Ae===null){Yt===null&&(Yt=hn);break}e&&Yt&&Ae.alternate===null&&n(Z,Yt),G=f(Ae,G,Jt),de===null?Ht=Ae:de.sibling=Ae,de=Ae,Yt=hn}if(Jt===J.length)return a(Z,Yt),be&&Ga(Z,Jt),Ht;if(Yt===null){for(;Jt<J.length;Jt++)Yt=_t(Z,J[Jt],pt),Yt!==null&&(G=f(Yt,G,Jt),de===null?Ht=Yt:de.sibling=Yt,de=Yt);return be&&Ga(Z,Jt),Ht}for(Yt=s(Yt);Jt<J.length;Jt++)hn=ot(Yt,Z,Jt,J[Jt],pt),hn!==null&&(e&&hn.alternate!==null&&Yt.delete(hn.key===null?Jt:hn.key),G=f(hn,G,Jt),de===null?Ht=hn:de.sibling=hn,de=hn);return e&&Yt.forEach(function(Ta){return n(Z,Ta)}),be&&Ga(Z,Jt),Ht}function ae(Z,G,J,pt){if(J==null)throw Error(r(151));for(var Ht=null,de=null,Yt=G,Jt=G=0,hn=null,Ae=J.next();Yt!==null&&!Ae.done;Jt++,Ae=J.next()){Yt.index>Jt?(hn=Yt,Yt=null):hn=Yt.sibling;var Ta=et(Z,Yt,Ae.value,pt);if(Ta===null){Yt===null&&(Yt=hn);break}e&&Yt&&Ta.alternate===null&&n(Z,Yt),G=f(Ta,G,Jt),de===null?Ht=Ta:de.sibling=Ta,de=Ta,Yt=hn}if(Ae.done)return a(Z,Yt),be&&Ga(Z,Jt),Ht;if(Yt===null){for(;!Ae.done;Jt++,Ae=J.next())Ae=_t(Z,Ae.value,pt),Ae!==null&&(G=f(Ae,G,Jt),de===null?Ht=Ae:de.sibling=Ae,de=Ae);return be&&Ga(Z,Jt),Ht}for(Yt=s(Yt);!Ae.done;Jt++,Ae=J.next())Ae=ot(Yt,Z,Jt,Ae.value,pt),Ae!==null&&(e&&Ae.alternate!==null&&Yt.delete(Ae.key===null?Jt:Ae.key),G=f(Ae,G,Jt),de===null?Ht=Ae:de.sibling=Ae,de=Ae);return e&&Yt.forEach(function(yx){return n(Z,yx)}),be&&Ga(Z,Jt),Ht}function qe(Z,G,J,pt){if(typeof J=="object"&&J!==null&&J.type===m&&J.key===null&&(J=J.props.children),typeof J=="object"&&J!==null){switch(J.$$typeof){case h:t:{for(var Ht=J.key;G!==null;){if(G.key===Ht){if(Ht=J.type,Ht===m){if(G.tag===7){a(Z,G.sibling),pt=c(G,J.props.children),pt.return=Z,Z=pt;break t}}else if(G.elementType===Ht||typeof Ht=="object"&&Ht!==null&&Ht.$$typeof===P&&tp(Ht)===G.type){a(Z,G.sibling),pt=c(G,J.props),Xs(pt,J),pt.return=Z,Z=pt;break t}a(Z,G);break}else n(Z,G);G=G.sibling}J.type===m?(pt=Ja(J.props.children,Z.mode,pt,J.key),pt.return=Z,Z=pt):(pt=vl(J.type,J.key,J.props,null,Z.mode,pt),Xs(pt,J),pt.return=Z,Z=pt)}return S(Z);case d:t:{for(Ht=J.key;G!==null;){if(G.key===Ht)if(G.tag===4&&G.stateNode.containerInfo===J.containerInfo&&G.stateNode.implementation===J.implementation){a(Z,G.sibling),pt=c(G,J.children||[]),pt.return=Z,Z=pt;break t}else{a(Z,G);break}else n(Z,G);G=G.sibling}pt=Gu(J,Z.mode,pt),pt.return=Z,Z=pt}return S(Z);case P:return Ht=J._init,J=Ht(J._payload),qe(Z,G,J,pt)}if(At(J))return Xt(Z,G,J,pt);if(F(J)){if(Ht=F(J),typeof Ht!="function")throw Error(r(150));return J=Ht.call(J),ae(Z,G,J,pt)}if(typeof J.then=="function")return qe(Z,G,$o(J),pt);if(J.$$typeof===M)return qe(Z,G,ml(Z,J),pt);tl(Z,J)}return typeof J=="string"&&J!==""||typeof J=="number"||typeof J=="bigint"?(J=""+J,G!==null&&G.tag===6?(a(Z,G.sibling),pt=c(G,J),pt.return=Z,Z=pt):(a(Z,G),pt=Hu(J,Z.mode,pt),pt.return=Z,Z=pt),S(Z)):a(Z,G)}return function(Z,G,J,pt){try{ks=0;var Ht=qe(Z,G,J,pt);return Cr=null,Ht}catch(Yt){if(Yt===Gs)throw Yt;var de=ni(29,Yt,null,Z.mode);return de.lanes=pt,de.return=Z,de}finally{}}}var ka=ep(!0),np=ep(!1),Dr=Rt(null),el=Rt(0);function ip(e,n){e=Xi,Gt(el,e),Gt(Dr,n),Xi=e|n.baseLanes}function Yc(){Gt(el,Xi),Gt(Dr,Dr.current)}function jc(){Xi=el.current,Ft(Dr),Ft(el)}var $n=Rt(null),yi=null;function sa(e){var n=e.alternate;Gt(rn,rn.current&1),Gt($n,e),yi===null&&(n===null||Dr.current!==null||n.memoizedState!==null)&&(yi=e)}function ap(e){if(e.tag===22){if(Gt(rn,rn.current),Gt($n,e),yi===null){var n=e.alternate;n!==null&&n.memoizedState!==null&&(yi=e)}}else oa()}function oa(){Gt(rn,rn.current),Gt($n,$n.current)}function Oi(e){Ft($n),yi===e&&(yi=null),Ft(rn)}var rn=Rt(0);function nl(e){for(var n=e;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||a.data==="$?"||a.data==="$!"))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!==void 0){if(n.flags&128)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var lv=typeof AbortController<"u"?AbortController:function(){var e=[],n=this.signal={aborted:!1,addEventListener:function(a,s){e.push(s)}};this.abort=function(){n.aborted=!0,e.forEach(function(a){return a()})}},cv=o.unstable_scheduleCallback,uv=o.unstable_NormalPriority,sn={$$typeof:M,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Zc(){return{controller:new lv,data:new Map,refCount:0}}function Ws(e){e.refCount--,e.refCount===0&&cv(uv,function(){e.controller.abort()})}var qs=null,Kc=0,Ur=0,Lr=null;function fv(e,n){if(qs===null){var a=qs=[];Kc=0,Ur=nf(),Lr={status:"pending",value:void 0,then:function(s){a.push(s)}}}return Kc++,n.then(rp,rp),n}function rp(){if(--Kc===0&&qs!==null){Lr!==null&&(Lr.status="fulfilled");var e=qs;qs=null,Ur=0,Lr=null;for(var n=0;n<e.length;n++)(0,e[n])()}}function hv(e,n){var a=[],s={status:"pending",value:null,reason:null,then:function(c){a.push(c)}};return e.then(function(){s.status="fulfilled",s.value=n;for(var c=0;c<a.length;c++)(0,a[c])(n)},function(c){for(s.status="rejected",s.reason=c,c=0;c<a.length;c++)(0,a[c])(void 0)}),s}var sp=w.S;w.S=function(e,n){typeof n=="object"&&n!==null&&typeof n.then=="function"&&fv(e,n),sp!==null&&sp(e,n)};var Xa=Rt(null);function Qc(){var e=Xa.current;return e!==null?e:Fe.pooledCache}function il(e,n){n===null?Gt(Xa,Xa.current):Gt(Xa,n.pool)}function op(){var e=Qc();return e===null?null:{parent:sn._currentValue,pool:e}}var la=0,fe=null,Ne=null,Ze=null,al=!1,Nr=!1,Wa=!1,rl=0,Ys=0,Or=null,dv=0;function Ye(){throw Error(r(321))}function Jc(e,n){if(n===null)return!1;for(var a=0;a<n.length&&a<e.length;a++)if(!Hn(e[a],n[a]))return!1;return!0}function $c(e,n,a,s,c,f){return la=f,fe=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,w.H=e===null||e.memoizedState===null?qa:ca,Wa=!1,f=a(s,c),Wa=!1,Nr&&(f=cp(n,a,s,c)),lp(e),f}function lp(e){w.H=Mi;var n=Ne!==null&&Ne.next!==null;if(la=0,Ze=Ne=fe=null,al=!1,Ys=0,Or=null,n)throw Error(r(300));e===null||un||(e=e.dependencies,e!==null&&pl(e)&&(un=!0))}function cp(e,n,a,s){fe=e;var c=0;do{if(Nr&&(Or=null),Ys=0,Nr=!1,25<=c)throw Error(r(301));if(c+=1,Ze=Ne=null,e.updateQueue!=null){var f=e.updateQueue;f.lastEffect=null,f.events=null,f.stores=null,f.memoCache!=null&&(f.memoCache.index=0)}w.H=Ya,f=n(a,s)}while(Nr);return f}function pv(){var e=w.H,n=e.useState()[0];return n=typeof n.then=="function"?js(n):n,e=e.useState()[0],(Ne!==null?Ne.memoizedState:null)!==e&&(fe.flags|=1024),n}function tu(){var e=rl!==0;return rl=0,e}function eu(e,n,a){n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~a}function nu(e){if(al){for(e=e.memoizedState;e!==null;){var n=e.queue;n!==null&&(n.pending=null),e=e.next}al=!1}la=0,Ze=Ne=fe=null,Nr=!1,Ys=rl=0,Or=null}function zn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ze===null?fe.memoizedState=Ze=e:Ze=Ze.next=e,Ze}function Ke(){if(Ne===null){var e=fe.alternate;e=e!==null?e.memoizedState:null}else e=Ne.next;var n=Ze===null?fe.memoizedState:Ze.next;if(n!==null)Ze=n,Ne=e;else{if(e===null)throw fe.alternate===null?Error(r(467)):Error(r(310));Ne=e,e={memoizedState:Ne.memoizedState,baseState:Ne.baseState,baseQueue:Ne.baseQueue,queue:Ne.queue,next:null},Ze===null?fe.memoizedState=Ze=e:Ze=Ze.next=e}return Ze}var sl;sl=function(){return{lastEffect:null,events:null,stores:null,memoCache:null}};function js(e){var n=Ys;return Ys+=1,Or===null&&(Or=[]),e=Jd(Or,e,n),n=fe,(Ze===null?n.memoizedState:Ze.next)===null&&(n=n.alternate,w.H=n===null||n.memoizedState===null?qa:ca),e}function ol(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return js(e);if(e.$$typeof===M)return Sn(e)}throw Error(r(438,String(e)))}function iu(e){var n=null,a=fe.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var s=fe.alternate;s!==null&&(s=s.updateQueue,s!==null&&(s=s.memoCache,s!=null&&(n={data:s.data.map(function(c){return c.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=sl(),fe.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(e),s=0;s<e;s++)a[s]=D;return n.index++,a}function Pi(e,n){return typeof n=="function"?n(e):n}function ll(e){var n=Ke();return au(n,Ne,e)}function au(e,n,a){var s=e.queue;if(s===null)throw Error(r(311));s.lastRenderedReducer=a;var c=e.baseQueue,f=s.pending;if(f!==null){if(c!==null){var S=c.next;c.next=f.next,f.next=S}n.baseQueue=c=f,s.pending=null}if(f=e.baseState,c===null)e.memoizedState=f;else{n=c.next;var b=S=null,N=null,V=n,lt=!1;do{var _t=V.lane&-536870913;if(_t!==V.lane?(Me&_t)===_t:(la&_t)===_t){var et=V.revertLane;if(et===0)N!==null&&(N=N.next={lane:0,revertLane:0,action:V.action,hasEagerState:V.hasEagerState,eagerState:V.eagerState,next:null}),_t===Ur&&(lt=!0);else if((la&et)===et){V=V.next,et===Ur&&(lt=!0);continue}else _t={lane:0,revertLane:V.revertLane,action:V.action,hasEagerState:V.hasEagerState,eagerState:V.eagerState,next:null},N===null?(b=N=_t,S=f):N=N.next=_t,fe.lanes|=et,va|=et;_t=V.action,Wa&&a(f,_t),f=V.hasEagerState?V.eagerState:a(f,_t)}else et={lane:_t,revertLane:V.revertLane,action:V.action,hasEagerState:V.hasEagerState,eagerState:V.eagerState,next:null},N===null?(b=N=et,S=f):N=N.next=et,fe.lanes|=_t,va|=_t;V=V.next}while(V!==null&&V!==n);if(N===null?S=f:N.next=b,!Hn(f,e.memoizedState)&&(un=!0,lt&&(a=Lr,a!==null)))throw a;e.memoizedState=f,e.baseState=S,e.baseQueue=N,s.lastRenderedState=f}return c===null&&(s.lanes=0),[e.memoizedState,s.dispatch]}function ru(e){var n=Ke(),a=n.queue;if(a===null)throw Error(r(311));a.lastRenderedReducer=e;var s=a.dispatch,c=a.pending,f=n.memoizedState;if(c!==null){a.pending=null;var S=c=c.next;do f=e(f,S.action),S=S.next;while(S!==c);Hn(f,n.memoizedState)||(un=!0),n.memoizedState=f,n.baseQueue===null&&(n.baseState=f),a.lastRenderedState=f}return[f,s]}function up(e,n,a){var s=fe,c=Ke(),f=be;if(f){if(a===void 0)throw Error(r(407));a=a()}else a=n();var S=!Hn((Ne||c).memoizedState,a);if(S&&(c.memoizedState=a,un=!0),c=c.queue,lu(dp.bind(null,s,c,e),[e]),c.getSnapshot!==n||S||Ze!==null&&Ze.memoizedState.tag&1){if(s.flags|=2048,Pr(9,hp.bind(null,s,c,a,n),{destroy:void 0},null),Fe===null)throw Error(r(349));f||la&60||fp(s,n,a)}return a}function fp(e,n,a){e.flags|=16384,e={getSnapshot:n,value:a},n=fe.updateQueue,n===null?(n=sl(),fe.updateQueue=n,n.stores=[e]):(a=n.stores,a===null?n.stores=[e]:a.push(e))}function hp(e,n,a,s){n.value=a,n.getSnapshot=s,pp(n)&&mp(e)}function dp(e,n,a){return a(function(){pp(n)&&mp(e)})}function pp(e){var n=e.getSnapshot;e=e.value;try{var a=n();return!Hn(e,a)}catch{return!0}}function mp(e){var n=ra(e,2);n!==null&&Cn(n,e,2)}function su(e){var n=zn();if(typeof e=="function"){var a=e;if(e=a(),Wa){re(!0);try{a()}finally{re(!1)}}}return n.memoizedState=n.baseState=e,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Pi,lastRenderedState:e},n}function gp(e,n,a,s){return e.baseState=a,au(e,Ne,typeof s=="function"?s:Pi)}function mv(e,n,a,s,c){if(fl(e))throw Error(r(485));if(e=n.action,e!==null){var f={payload:c,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(S){f.listeners.push(S)}};w.T!==null?a(!0):f.isTransition=!1,s(f),a=n.pending,a===null?(f.next=n.pending=f,_p(n,f)):(f.next=a.next,n.pending=a.next=f)}}function _p(e,n){var a=n.action,s=n.payload,c=e.state;if(n.isTransition){var f=w.T,S={};w.T=S;try{var b=a(c,s),N=w.S;N!==null&&N(S,b),vp(e,n,b)}catch(V){ou(e,n,V)}finally{w.T=f}}else try{f=a(c,s),vp(e,n,f)}catch(V){ou(e,n,V)}}function vp(e,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(s){xp(e,n,s)},function(s){return ou(e,n,s)}):xp(e,n,a)}function xp(e,n,a){n.status="fulfilled",n.value=a,Sp(n),e.state=a,n=e.pending,n!==null&&(a=n.next,a===n?e.pending=null:(a=a.next,n.next=a,_p(e,a)))}function ou(e,n,a){var s=e.pending;if(e.pending=null,s!==null){s=s.next;do n.status="rejected",n.reason=a,Sp(n),n=n.next;while(n!==s)}e.action=null}function Sp(e){e=e.listeners;for(var n=0;n<e.length;n++)(0,e[n])()}function yp(e,n){return n}function Mp(e,n){if(be){var a=Fe.formState;if(a!==null){t:{var s=fe;if(be){if(gn){e:{for(var c=gn,f=Si;c.nodeType!==8;){if(!f){c=null;break e}if(c=fi(c.nextSibling),c===null){c=null;break e}}f=c.data,c=f==="F!"||f==="F"?c:null}if(c){gn=fi(c.nextSibling),s=c.data==="F!";break t}}Va(s)}s=!1}s&&(n=a[0])}}return a=zn(),a.memoizedState=a.baseState=n,s={pending:null,lanes:0,dispatch:null,lastRenderedReducer:yp,lastRenderedState:n},a.queue=s,a=Hp.bind(null,fe,s),s.dispatch=a,s=su(!1),f=du.bind(null,fe,!1,s.queue),s=zn(),c={state:n,dispatch:null,action:e,pending:null},s.queue=c,a=mv.bind(null,fe,c,f,a),c.dispatch=a,s.memoizedState=e,[n,a,!1]}function Ep(e){var n=Ke();return Tp(n,Ne,e)}function Tp(e,n,a){n=au(e,n,yp)[0],e=ll(Pi)[0],n=typeof n=="object"&&n!==null&&typeof n.then=="function"?js(n):n;var s=Ke(),c=s.queue,f=c.dispatch;return a!==s.memoizedState&&(fe.flags|=2048,Pr(9,gv.bind(null,c,a),{destroy:void 0},null)),[n,f,e]}function gv(e,n){e.action=n}function bp(e){var n=Ke(),a=Ne;if(a!==null)return Tp(n,a,e);Ke(),n=n.memoizedState,a=Ke();var s=a.queue.dispatch;return a.memoizedState=e,[n,s,!1]}function Pr(e,n,a,s){return e={tag:e,create:n,inst:a,deps:s,next:null},n=fe.updateQueue,n===null&&(n=sl(),fe.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=e.next=e:(s=a.next,a.next=e,e.next=s,n.lastEffect=e),e}function Ap(){return Ke().memoizedState}function cl(e,n,a,s){var c=zn();fe.flags|=e,c.memoizedState=Pr(1|n,a,{destroy:void 0},s===void 0?null:s)}function ul(e,n,a,s){var c=Ke();s=s===void 0?null:s;var f=c.memoizedState.inst;Ne!==null&&s!==null&&Jc(s,Ne.memoizedState.deps)?c.memoizedState=Pr(n,a,f,s):(fe.flags|=e,c.memoizedState=Pr(1|n,a,f,s))}function Rp(e,n){cl(8390656,8,e,n)}function lu(e,n){ul(2048,8,e,n)}function wp(e,n){return ul(4,2,e,n)}function Cp(e,n){return ul(4,4,e,n)}function Dp(e,n){if(typeof n=="function"){e=e();var a=n(e);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function Up(e,n,a){a=a!=null?a.concat([e]):null,ul(4,4,Dp.bind(null,n,e),a)}function cu(){}function Lp(e,n){var a=Ke();n=n===void 0?null:n;var s=a.memoizedState;return n!==null&&Jc(n,s[1])?s[0]:(a.memoizedState=[e,n],e)}function Np(e,n){var a=Ke();n=n===void 0?null:n;var s=a.memoizedState;if(n!==null&&Jc(n,s[1]))return s[0];if(s=e(),Wa){re(!0);try{e()}finally{re(!1)}}return a.memoizedState=[s,n],s}function uu(e,n,a){return a===void 0||la&1073741824?e.memoizedState=n:(e.memoizedState=a,e=Pm(),fe.lanes|=e,va|=e,a)}function Op(e,n,a,s){return Hn(a,n)?a:Dr.current!==null?(e=uu(e,a,s),Hn(e,n)||(un=!0),e):la&42?(e=Pm(),fe.lanes|=e,va|=e,n):(un=!0,e.memoizedState=a)}function Pp(e,n,a,s,c){var f=q.p;q.p=f!==0&&8>f?f:8;var S=w.T,b={};w.T=b,du(e,!1,n,a);try{var N=c(),V=w.S;if(V!==null&&V(b,N),N!==null&&typeof N=="object"&&typeof N.then=="function"){var lt=hv(N,s);Zs(e,n,lt,Xn(e))}else Zs(e,n,s,Xn(e))}catch(_t){Zs(e,n,{then:function(){},status:"rejected",reason:_t},Xn())}finally{q.p=f,w.T=S}}function _v(){}function fu(e,n,a,s){if(e.tag!==5)throw Error(r(476));var c=zp(e).queue;Pp(e,c,n,dt,a===null?_v:function(){return Fp(e),a(s)})}function zp(e){var n=e.memoizedState;if(n!==null)return n;n={memoizedState:dt,baseState:dt,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Pi,lastRenderedState:dt},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Pi,lastRenderedState:a},next:null},e.memoizedState=n,e=e.alternate,e!==null&&(e.memoizedState=n),n}function Fp(e){var n=zp(e).next.queue;Zs(e,n,{},Xn())}function hu(){return Sn(go)}function Bp(){return Ke().memoizedState}function Ip(){return Ke().memoizedState}function vv(e){for(var n=e.return;n!==null;){switch(n.tag){case 24:case 3:var a=Xn();e=ha(a);var s=da(n,e,a);s!==null&&(Cn(s,n,a),Js(s,n,a)),n={cache:Zc()},e.payload=n;return}n=n.return}}function xv(e,n,a){var s=Xn();a={lane:s,revertLane:0,action:a,hasEagerState:!1,eagerState:null,next:null},fl(e)?Gp(n,a):(a=Vc(e,n,a,s),a!==null&&(Cn(a,e,s),Vp(a,n,s)))}function Hp(e,n,a){var s=Xn();Zs(e,n,a,s)}function Zs(e,n,a,s){var c={lane:s,revertLane:0,action:a,hasEagerState:!1,eagerState:null,next:null};if(fl(e))Gp(n,c);else{var f=e.alternate;if(e.lanes===0&&(f===null||f.lanes===0)&&(f=n.lastRenderedReducer,f!==null))try{var S=n.lastRenderedState,b=f(S,a);if(c.hasEagerState=!0,c.eagerState=b,Hn(b,S))return jo(e,n,c,0),Fe===null&&Yo(),!1}catch{}finally{}if(a=Vc(e,n,c,s),a!==null)return Cn(a,e,s),Vp(a,n,s),!0}return!1}function du(e,n,a,s){if(s={lane:2,revertLane:nf(),action:s,hasEagerState:!1,eagerState:null,next:null},fl(e)){if(n)throw Error(r(479))}else n=Vc(e,a,s,2),n!==null&&Cn(n,e,2)}function fl(e){var n=e.alternate;return e===fe||n!==null&&n===fe}function Gp(e,n){Nr=al=!0;var a=e.pending;a===null?n.next=n:(n.next=a.next,a.next=n),e.pending=n}function Vp(e,n,a){if(a&4194176){var s=n.lanes;s&=e.pendingLanes,a|=s,n.lanes=a,xi(e,a)}}var Mi={readContext:Sn,use:ol,useCallback:Ye,useContext:Ye,useEffect:Ye,useImperativeHandle:Ye,useLayoutEffect:Ye,useInsertionEffect:Ye,useMemo:Ye,useReducer:Ye,useRef:Ye,useState:Ye,useDebugValue:Ye,useDeferredValue:Ye,useTransition:Ye,useSyncExternalStore:Ye,useId:Ye};Mi.useCacheRefresh=Ye,Mi.useMemoCache=Ye,Mi.useHostTransitionStatus=Ye,Mi.useFormState=Ye,Mi.useActionState=Ye,Mi.useOptimistic=Ye;var qa={readContext:Sn,use:ol,useCallback:function(e,n){return zn().memoizedState=[e,n===void 0?null:n],e},useContext:Sn,useEffect:Rp,useImperativeHandle:function(e,n,a){a=a!=null?a.concat([e]):null,cl(4194308,4,Dp.bind(null,n,e),a)},useLayoutEffect:function(e,n){return cl(4194308,4,e,n)},useInsertionEffect:function(e,n){cl(4,2,e,n)},useMemo:function(e,n){var a=zn();n=n===void 0?null:n;var s=e();if(Wa){re(!0);try{e()}finally{re(!1)}}return a.memoizedState=[s,n],s},useReducer:function(e,n,a){var s=zn();if(a!==void 0){var c=a(n);if(Wa){re(!0);try{a(n)}finally{re(!1)}}}else c=n;return s.memoizedState=s.baseState=c,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:c},s.queue=e,e=e.dispatch=xv.bind(null,fe,e),[s.memoizedState,e]},useRef:function(e){var n=zn();return e={current:e},n.memoizedState=e},useState:function(e){e=su(e);var n=e.queue,a=Hp.bind(null,fe,n);return n.dispatch=a,[e.memoizedState,a]},useDebugValue:cu,useDeferredValue:function(e,n){var a=zn();return uu(a,e,n)},useTransition:function(){var e=su(!1);return e=Pp.bind(null,fe,e.queue,!0,!1),zn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,n,a){var s=fe,c=zn();if(be){if(a===void 0)throw Error(r(407));a=a()}else{if(a=n(),Fe===null)throw Error(r(349));Me&60||fp(s,n,a)}c.memoizedState=a;var f={value:a,getSnapshot:n};return c.queue=f,Rp(dp.bind(null,s,f,e),[e]),s.flags|=2048,Pr(9,hp.bind(null,s,f,a,n),{destroy:void 0},null),a},useId:function(){var e=zn(),n=Fe.identifierPrefix;if(be){var a=Ni,s=Li;a=(s&~(1<<32-Kt(s)-1)).toString(32)+a,n=":"+n+"R"+a,a=rl++,0<a&&(n+="H"+a.toString(32)),n+=":"}else a=dv++,n=":"+n+"r"+a.toString(32)+":";return e.memoizedState=n},useCacheRefresh:function(){return zn().memoizedState=vv.bind(null,fe)}};qa.useMemoCache=iu,qa.useHostTransitionStatus=hu,qa.useFormState=Mp,qa.useActionState=Mp,qa.useOptimistic=function(e){var n=zn();n.memoizedState=n.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=du.bind(null,fe,!0,a),a.dispatch=n,[e,n]};var ca={readContext:Sn,use:ol,useCallback:Lp,useContext:Sn,useEffect:lu,useImperativeHandle:Up,useInsertionEffect:wp,useLayoutEffect:Cp,useMemo:Np,useReducer:ll,useRef:Ap,useState:function(){return ll(Pi)},useDebugValue:cu,useDeferredValue:function(e,n){var a=Ke();return Op(a,Ne.memoizedState,e,n)},useTransition:function(){var e=ll(Pi)[0],n=Ke().memoizedState;return[typeof e=="boolean"?e:js(e),n]},useSyncExternalStore:up,useId:Bp};ca.useCacheRefresh=Ip,ca.useMemoCache=iu,ca.useHostTransitionStatus=hu,ca.useFormState=Ep,ca.useActionState=Ep,ca.useOptimistic=function(e,n){var a=Ke();return gp(a,Ne,e,n)};var Ya={readContext:Sn,use:ol,useCallback:Lp,useContext:Sn,useEffect:lu,useImperativeHandle:Up,useInsertionEffect:wp,useLayoutEffect:Cp,useMemo:Np,useReducer:ru,useRef:Ap,useState:function(){return ru(Pi)},useDebugValue:cu,useDeferredValue:function(e,n){var a=Ke();return Ne===null?uu(a,e,n):Op(a,Ne.memoizedState,e,n)},useTransition:function(){var e=ru(Pi)[0],n=Ke().memoizedState;return[typeof e=="boolean"?e:js(e),n]},useSyncExternalStore:up,useId:Bp};Ya.useCacheRefresh=Ip,Ya.useMemoCache=iu,Ya.useHostTransitionStatus=hu,Ya.useFormState=bp,Ya.useActionState=bp,Ya.useOptimistic=function(e,n){var a=Ke();return Ne!==null?gp(a,Ne,e,n):(a.baseState=e,[e,a.queue.dispatch])};function pu(e,n,a,s){n=e.memoizedState,a=a(s,n),a=a==null?n:R({},n,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var mu={isMounted:function(e){return(e=e._reactInternals)?j(e)===e:!1},enqueueSetState:function(e,n,a){e=e._reactInternals;var s=Xn(),c=ha(s);c.payload=n,a!=null&&(c.callback=a),n=da(e,c,s),n!==null&&(Cn(n,e,s),Js(n,e,s))},enqueueReplaceState:function(e,n,a){e=e._reactInternals;var s=Xn(),c=ha(s);c.tag=1,c.payload=n,a!=null&&(c.callback=a),n=da(e,c,s),n!==null&&(Cn(n,e,s),Js(n,e,s))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var a=Xn(),s=ha(a);s.tag=2,n!=null&&(s.callback=n),n=da(e,s,a),n!==null&&(Cn(n,e,a),Js(n,e,a))}};function kp(e,n,a,s,c,f,S){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(s,f,S):n.prototype&&n.prototype.isPureReactComponent?!zs(a,s)||!zs(c,f):!0}function Xp(e,n,a,s){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,s),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,s),n.state!==e&&mu.enqueueReplaceState(n,n.state,null)}function ja(e,n){var a=n;if("ref"in n){a={};for(var s in n)s!=="ref"&&(a[s]=n[s])}if(e=e.defaultProps){a===n&&(a=R({},a));for(var c in e)a[c]===void 0&&(a[c]=e[c])}return a}var hl=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)};function Wp(e){hl(e)}function qp(e){console.error(e)}function Yp(e){hl(e)}function dl(e,n){try{var a=e.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(s){setTimeout(function(){throw s})}}function jp(e,n,a){try{var s=e.onCaughtError;s(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(c){setTimeout(function(){throw c})}}function gu(e,n,a){return a=ha(a),a.tag=3,a.payload={element:null},a.callback=function(){dl(e,n)},a}function Zp(e){return e=ha(e),e.tag=3,e}function Kp(e,n,a,s){var c=a.type.getDerivedStateFromError;if(typeof c=="function"){var f=s.value;e.payload=function(){return c(f)},e.callback=function(){jp(n,a,s)}}var S=a.stateNode;S!==null&&typeof S.componentDidCatch=="function"&&(e.callback=function(){jp(n,a,s),typeof c!="function"&&(xa===null?xa=new Set([this]):xa.add(this));var b=s.stack;this.componentDidCatch(s.value,{componentStack:b!==null?b:""})})}function Sv(e,n,a,s,c){if(a.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){if(n=a.alternate,n!==null&&Qs(n,a,c,!0),a=$n.current,a!==null){switch(a.tag){case 13:return yi===null?Qu():a.alternate===null&&We===0&&(We=3),a.flags&=-257,a.flags|=65536,a.lanes=c,s===qc?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([s]):n.add(s),$u(e,s,c)),!1;case 22:return a.flags|=65536,s===qc?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([s])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([s]):a.add(s)),$u(e,s,c)),!1}throw Error(r(435,a.tag))}return $u(e,s,c),Qu(),!1}if(be)return n=$n.current,n!==null?(!(n.flags&65536)&&(n.flags|=256),n.flags|=65536,n.lanes=c,s!==Wc&&(e=Error(r(422),{cause:s}),Hs(Kn(e,a)))):(s!==Wc&&(n=Error(r(423),{cause:s}),Hs(Kn(n,a))),e=e.current.alternate,e.flags|=65536,c&=-c,e.lanes|=c,s=Kn(s,a),c=gu(e.stateNode,s,c),Uu(e,c),We!==4&&(We=2)),!1;var f=Error(r(520),{cause:s});if(f=Kn(f,a),so===null?so=[f]:so.push(f),We!==4&&(We=2),n===null)return!0;s=Kn(s,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,e=c&-c,a.lanes|=e,e=gu(a.stateNode,s,e),Uu(a,e),!1;case 1:if(n=a.type,f=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(xa===null||!xa.has(f))))return a.flags|=65536,c&=-c,a.lanes|=c,c=Zp(c),Kp(c,e,a,s),Uu(a,c),!1}a=a.return}while(a!==null);return!1}var Qp=Error(r(461)),un=!1;function _n(e,n,a,s){n.child=e===null?np(n,null,a,s):ka(n,e.child,a,s)}function Jp(e,n,a,s,c){a=a.render;var f=n.ref;if("ref"in s){var S={};for(var b in s)b!=="ref"&&(S[b]=s[b])}else S=s;return Ka(n),s=$c(e,n,a,S,f,c),b=tu(),e!==null&&!un?(eu(e,n,c),zi(e,n,c)):(be&&b&&kc(n),n.flags|=1,_n(e,n,s,c),n.child)}function $p(e,n,a,s,c){if(e===null){var f=a.type;return typeof f=="function"&&!Iu(f)&&f.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=f,tm(e,n,f,s,c)):(e=vl(a.type,null,s,n,n.mode,c),e.ref=n.ref,e.return=n,n.child=e)}if(f=e.child,!bu(e,c)){var S=f.memoizedProps;if(a=a.compare,a=a!==null?a:zs,a(S,s)&&e.ref===n.ref)return zi(e,n,c)}return n.flags|=1,e=_a(f,s),e.ref=n.ref,e.return=n,n.child=e}function tm(e,n,a,s,c){if(e!==null){var f=e.memoizedProps;if(zs(f,s)&&e.ref===n.ref)if(un=!1,n.pendingProps=s=f,bu(e,c))e.flags&131072&&(un=!0);else return n.lanes=e.lanes,zi(e,n,c)}return _u(e,n,a,s,c)}function em(e,n,a){var s=n.pendingProps,c=s.children,f=(n.stateNode._pendingVisibility&2)!==0,S=e!==null?e.memoizedState:null;if(Ks(e,n),s.mode==="hidden"||f){if(n.flags&128){if(s=S!==null?S.baseLanes|a:a,e!==null){for(c=n.child=e.child,f=0;c!==null;)f=f|c.lanes|c.childLanes,c=c.sibling;n.childLanes=f&~s}else n.childLanes=0,n.child=null;return nm(e,n,s,a)}if(a&536870912)n.memoizedState={baseLanes:0,cachePool:null},e!==null&&il(n,S!==null?S.cachePool:null),S!==null?ip(n,S):Yc(),ap(n);else return n.lanes=n.childLanes=536870912,nm(e,n,S!==null?S.baseLanes|a:a,a)}else S!==null?(il(n,S.cachePool),ip(n,S),oa(),n.memoizedState=null):(e!==null&&il(n,null),Yc(),oa());return _n(e,n,c,a),n.child}function nm(e,n,a,s){var c=Qc();return c=c===null?null:{parent:sn._currentValue,pool:c},n.memoizedState={baseLanes:a,cachePool:c},e!==null&&il(n,null),Yc(),ap(n),e!==null&&Qs(e,n,s,!0),null}function Ks(e,n){var a=n.ref;if(a===null)e!==null&&e.ref!==null&&(n.flags|=2097664);else{if(typeof a!="function"&&typeof a!="object")throw Error(r(284));(e===null||e.ref!==a)&&(n.flags|=2097664)}}function _u(e,n,a,s,c){return Ka(n),a=$c(e,n,a,s,void 0,c),s=tu(),e!==null&&!un?(eu(e,n,c),zi(e,n,c)):(be&&s&&kc(n),n.flags|=1,_n(e,n,a,c),n.child)}function im(e,n,a,s,c,f){return Ka(n),n.updateQueue=null,a=cp(n,s,a,c),lp(e),s=tu(),e!==null&&!un?(eu(e,n,f),zi(e,n,f)):(be&&s&&kc(n),n.flags|=1,_n(e,n,a,f),n.child)}function am(e,n,a,s,c){if(Ka(n),n.stateNode===null){var f=Ar,S=a.contextType;typeof S=="object"&&S!==null&&(f=Sn(S)),f=new a(s,f),n.memoizedState=f.state!==null&&f.state!==void 0?f.state:null,f.updater=mu,n.stateNode=f,f._reactInternals=n,f=n.stateNode,f.props=s,f.state=n.memoizedState,f.refs={},Cu(n),S=a.contextType,f.context=typeof S=="object"&&S!==null?Sn(S):Ar,f.state=n.memoizedState,S=a.getDerivedStateFromProps,typeof S=="function"&&(pu(n,a,S,s),f.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof f.getSnapshotBeforeUpdate=="function"||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(S=f.state,typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount(),S!==f.state&&mu.enqueueReplaceState(f,f.state,null),to(n,s,f,c),$s(),f.state=n.memoizedState),typeof f.componentDidMount=="function"&&(n.flags|=4194308),s=!0}else if(e===null){f=n.stateNode;var b=n.memoizedProps,N=ja(a,b);f.props=N;var V=f.context,lt=a.contextType;S=Ar,typeof lt=="object"&&lt!==null&&(S=Sn(lt));var _t=a.getDerivedStateFromProps;lt=typeof _t=="function"||typeof f.getSnapshotBeforeUpdate=="function",b=n.pendingProps!==b,lt||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(b||V!==S)&&Xp(n,f,s,S),fa=!1;var et=n.memoizedState;f.state=et,to(n,s,f,c),$s(),V=n.memoizedState,b||et!==V||fa?(typeof _t=="function"&&(pu(n,a,_t,s),V=n.memoizedState),(N=fa||kp(n,a,N,s,et,V,S))?(lt||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount()),typeof f.componentDidMount=="function"&&(n.flags|=4194308)):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=s,n.memoizedState=V),f.props=s,f.state=V,f.context=S,s=N):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),s=!1)}else{f=n.stateNode,Du(e,n),S=n.memoizedProps,lt=ja(a,S),f.props=lt,_t=n.pendingProps,et=f.context,V=a.contextType,N=Ar,typeof V=="object"&&V!==null&&(N=Sn(V)),b=a.getDerivedStateFromProps,(V=typeof b=="function"||typeof f.getSnapshotBeforeUpdate=="function")||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(S!==_t||et!==N)&&Xp(n,f,s,N),fa=!1,et=n.memoizedState,f.state=et,to(n,s,f,c),$s();var ot=n.memoizedState;S!==_t||et!==ot||fa||e!==null&&e.dependencies!==null&&pl(e.dependencies)?(typeof b=="function"&&(pu(n,a,b,s),ot=n.memoizedState),(lt=fa||kp(n,a,lt,s,et,ot,N)||e!==null&&e.dependencies!==null&&pl(e.dependencies))?(V||typeof f.UNSAFE_componentWillUpdate!="function"&&typeof f.componentWillUpdate!="function"||(typeof f.componentWillUpdate=="function"&&f.componentWillUpdate(s,ot,N),typeof f.UNSAFE_componentWillUpdate=="function"&&f.UNSAFE_componentWillUpdate(s,ot,N)),typeof f.componentDidUpdate=="function"&&(n.flags|=4),typeof f.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof f.componentDidUpdate!="function"||S===e.memoizedProps&&et===e.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||S===e.memoizedProps&&et===e.memoizedState||(n.flags|=1024),n.memoizedProps=s,n.memoizedState=ot),f.props=s,f.state=ot,f.context=N,s=lt):(typeof f.componentDidUpdate!="function"||S===e.memoizedProps&&et===e.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||S===e.memoizedProps&&et===e.memoizedState||(n.flags|=1024),s=!1)}return f=s,Ks(e,n),s=(n.flags&128)!==0,f||s?(f=n.stateNode,a=s&&typeof a.getDerivedStateFromError!="function"?null:f.render(),n.flags|=1,e!==null&&s?(n.child=ka(n,e.child,null,c),n.child=ka(n,null,a,c)):_n(e,n,a,c),n.memoizedState=f.state,e=n.child):e=zi(e,n,c),e}function rm(e,n,a,s){return Is(),n.flags|=256,_n(e,n,a,s),n.child}var vu={dehydrated:null,treeContext:null,retryLane:0};function xu(e){return{baseLanes:e,cachePool:op()}}function Su(e,n,a){return e=e!==null?e.childLanes&~a:0,n&&(e|=ii),e}function sm(e,n,a){var s=n.pendingProps,c=!1,f=(n.flags&128)!==0,S;if((S=f)||(S=e!==null&&e.memoizedState===null?!1:(rn.current&2)!==0),S&&(c=!0,n.flags&=-129),S=(n.flags&32)!==0,n.flags&=-33,e===null){if(be){if(c?sa(n):oa(),be){var b=gn,N;if(N=b){t:{for(N=b,b=Si;N.nodeType!==8;){if(!b){b=null;break t}if(N=fi(N.nextSibling),N===null){b=null;break t}}b=N}b!==null?(n.memoizedState={dehydrated:b,treeContext:Ha!==null?{id:Li,overflow:Ni}:null,retryLane:536870912},N=ni(18,null,null,0),N.stateNode=b,N.return=n,n.child=N,wn=n,gn=null,N=!0):N=!1}N||Va(n)}if(b=n.memoizedState,b!==null&&(b=b.dehydrated,b!==null))return b.data==="$!"?n.lanes=16:n.lanes=536870912,null;Oi(n)}return b=s.children,s=s.fallback,c?(oa(),c=n.mode,b=Mu({mode:"hidden",children:b},c),s=Ja(s,c,a,null),b.return=n,s.return=n,b.sibling=s,n.child=b,c=n.child,c.memoizedState=xu(a),c.childLanes=Su(e,S,a),n.memoizedState=vu,s):(sa(n),yu(n,b))}if(N=e.memoizedState,N!==null&&(b=N.dehydrated,b!==null)){if(f)n.flags&256?(sa(n),n.flags&=-257,n=Eu(e,n,a)):n.memoizedState!==null?(oa(),n.child=e.child,n.flags|=128,n=null):(oa(),c=s.fallback,b=n.mode,s=Mu({mode:"visible",children:s.children},b),c=Ja(c,b,a,null),c.flags|=2,s.return=n,c.return=n,s.sibling=c,n.child=s,ka(n,e.child,null,a),s=n.child,s.memoizedState=xu(a),s.childLanes=Su(e,S,a),n.memoizedState=vu,n=c);else if(sa(n),b.data==="$!"){if(S=b.nextSibling&&b.nextSibling.dataset,S)var V=S.dgst;S=V,s=Error(r(419)),s.stack="",s.digest=S,Hs({value:s,source:null,stack:null}),n=Eu(e,n,a)}else if(un||Qs(e,n,a,!1),S=(a&e.childLanes)!==0,un||S){if(S=Fe,S!==null){if(s=a&-a,s&42)s=1;else switch(s){case 2:s=1;break;case 8:s=4;break;case 32:s=16;break;case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:s=64;break;case 268435456:s=134217728;break;default:s=0}if(s=s&(S.suspendedLanes|a)?0:s,s!==0&&s!==N.retryLane)throw N.retryLane=s,ra(e,s),Cn(S,e,s),Qp}b.data==="$?"||Qu(),n=Eu(e,n,a)}else b.data==="$?"?(n.flags|=128,n.child=e.child,n=Pv.bind(null,e),b._reactRetry=n,n=null):(e=N.treeContext,gn=fi(b.nextSibling),wn=n,be=!0,ci=null,Si=!1,e!==null&&(Qn[Jn++]=Li,Qn[Jn++]=Ni,Qn[Jn++]=Ha,Li=e.id,Ni=e.overflow,Ha=n),n=yu(n,s.children),n.flags|=4096);return n}return c?(oa(),c=s.fallback,b=n.mode,N=e.child,V=N.sibling,s=_a(N,{mode:"hidden",children:s.children}),s.subtreeFlags=N.subtreeFlags&31457280,V!==null?c=_a(V,c):(c=Ja(c,b,a,null),c.flags|=2),c.return=n,s.return=n,s.sibling=c,n.child=s,s=c,c=n.child,b=e.child.memoizedState,b===null?b=xu(a):(N=b.cachePool,N!==null?(V=sn._currentValue,N=N.parent!==V?{parent:V,pool:V}:N):N=op(),b={baseLanes:b.baseLanes|a,cachePool:N}),c.memoizedState=b,c.childLanes=Su(e,S,a),n.memoizedState=vu,s):(sa(n),a=e.child,e=a.sibling,a=_a(a,{mode:"visible",children:s.children}),a.return=n,a.sibling=null,e!==null&&(S=n.deletions,S===null?(n.deletions=[e],n.flags|=16):S.push(e)),n.child=a,n.memoizedState=null,a)}function yu(e,n){return n=Mu({mode:"visible",children:n},e.mode),n.return=e,e.child=n}function Mu(e,n){return Lm(e,n,0,null)}function Eu(e,n,a){return ka(n,e.child,null,a),e=yu(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function om(e,n,a){e.lanes|=n;var s=e.alternate;s!==null&&(s.lanes|=n),Ru(e.return,n,a)}function Tu(e,n,a,s,c){var f=e.memoizedState;f===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:s,tail:a,tailMode:c}:(f.isBackwards=n,f.rendering=null,f.renderingStartTime=0,f.last=s,f.tail=a,f.tailMode=c)}function lm(e,n,a){var s=n.pendingProps,c=s.revealOrder,f=s.tail;if(_n(e,n,s.children,a),s=rn.current,s&2)s=s&1|2,n.flags|=128;else{if(e!==null&&e.flags&128)t:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&om(e,a,n);else if(e.tag===19)om(e,a,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break t;for(;e.sibling===null;){if(e.return===null||e.return===n)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}s&=1}switch(Gt(rn,s),c){case"forwards":for(a=n.child,c=null;a!==null;)e=a.alternate,e!==null&&nl(e)===null&&(c=a),a=a.sibling;a=c,a===null?(c=n.child,n.child=null):(c=a.sibling,a.sibling=null),Tu(n,!1,c,a,f);break;case"backwards":for(a=null,c=n.child,n.child=null;c!==null;){if(e=c.alternate,e!==null&&nl(e)===null){n.child=c;break}e=c.sibling,c.sibling=a,a=c,c=e}Tu(n,!0,a,null,f);break;case"together":Tu(n,!1,null,null,void 0);break;default:n.memoizedState=null}return n.child}function zi(e,n,a){if(e!==null&&(n.dependencies=e.dependencies),va|=n.lanes,!(a&n.childLanes))if(e!==null){if(Qs(e,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(e!==null&&n.child!==e.child)throw Error(r(153));if(n.child!==null){for(e=n.child,a=_a(e,e.pendingProps),n.child=a,a.return=n;e.sibling!==null;)e=e.sibling,a=a.sibling=_a(e,e.pendingProps),a.return=n;a.sibling=null}return n.child}function bu(e,n){return e.lanes&n?!0:(e=e.dependencies,!!(e!==null&&pl(e)))}function yv(e,n,a){switch(n.tag){case 3:pn(n,n.stateNode.containerInfo),ua(n,sn,e.memoizedState.cache),Is();break;case 27:case 5:he(n);break;case 4:pn(n,n.stateNode.containerInfo);break;case 10:ua(n,n.type,n.memoizedProps.value);break;case 13:var s=n.memoizedState;if(s!==null)return s.dehydrated!==null?(sa(n),n.flags|=128,null):a&n.child.childLanes?sm(e,n,a):(sa(n),e=zi(e,n,a),e!==null?e.sibling:null);sa(n);break;case 19:var c=(e.flags&128)!==0;if(s=(a&n.childLanes)!==0,s||(Qs(e,n,a,!1),s=(a&n.childLanes)!==0),c){if(s)return lm(e,n,a);n.flags|=128}if(c=n.memoizedState,c!==null&&(c.rendering=null,c.tail=null,c.lastEffect=null),Gt(rn,rn.current),s)break;return null;case 22:case 23:return n.lanes=0,em(e,n,a);case 24:ua(n,sn,e.memoizedState.cache)}return zi(e,n,a)}function cm(e,n,a){if(e!==null)if(e.memoizedProps!==n.pendingProps)un=!0;else{if(!bu(e,a)&&!(n.flags&128))return un=!1,yv(e,n,a);un=!!(e.flags&131072)}else un=!1,be&&n.flags&1048576&&Yd(n,Qo,n.index);switch(n.lanes=0,n.tag){case 16:t:{e=n.pendingProps;var s=n.elementType,c=s._init;if(s=c(s._payload),n.type=s,typeof s=="function")Iu(s)?(e=ja(s,e),n.tag=1,n=am(null,n,s,e,a)):(n.tag=0,n=_u(null,n,s,e,a));else{if(s!=null){if(c=s.$$typeof,c===T){n.tag=11,n=Jp(null,n,s,e,a);break t}else if(c===_){n.tag=14,n=$p(null,n,s,e,a);break t}}throw n=K(s)||s,Error(r(306,n,""))}}return n;case 0:return _u(e,n,n.type,n.pendingProps,a);case 1:return s=n.type,c=ja(s,n.pendingProps),am(e,n,s,c,a);case 3:t:{if(pn(n,n.stateNode.containerInfo),e===null)throw Error(r(387));var f=n.pendingProps;c=n.memoizedState,s=c.element,Du(e,n),to(n,f,null,a);var S=n.memoizedState;if(f=S.cache,ua(n,sn,f),f!==c.cache&&wu(n,[sn],a,!0),$s(),f=S.element,c.isDehydrated)if(c={element:f,isDehydrated:!1,cache:S.cache},n.updateQueue.baseState=c,n.memoizedState=c,n.flags&256){n=rm(e,n,f,a);break t}else if(f!==s){s=Kn(Error(r(424)),n),Hs(s),n=rm(e,n,f,a);break t}else for(gn=fi(n.stateNode.containerInfo.firstChild),wn=n,be=!0,ci=null,Si=!0,a=np(n,null,f,a),n.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(Is(),f===s){n=zi(e,n,a);break t}_n(e,n,f,a)}n=n.child}return n;case 26:return Ks(e,n),e===null?(a=hg(n.type,null,n.pendingProps,null))?n.memoizedState=a:be||(a=n.type,e=n.pendingProps,s=Dl(we.current).createElement(a),s[en]=n,s[nn]=e,vn(s,a,e),Q(s),n.stateNode=s):n.memoizedState=hg(n.type,e.memoizedProps,n.pendingProps,e.memoizedState),null;case 27:return he(n),e===null&&be&&(s=n.stateNode=cg(n.type,n.pendingProps,we.current),wn=n,Si=!0,gn=fi(s.firstChild)),s=n.pendingProps.children,e!==null||be?_n(e,n,s,a):n.child=ka(n,null,s,a),Ks(e,n),n.child;case 5:return e===null&&be&&((c=s=gn)&&(s=Qv(s,n.type,n.pendingProps,Si),s!==null?(n.stateNode=s,wn=n,gn=fi(s.firstChild),Si=!1,c=!0):c=!1),c||Va(n)),he(n),c=n.type,f=n.pendingProps,S=e!==null?e.memoizedProps:null,s=f.children,hf(c,f)?s=null:S!==null&&hf(c,S)&&(n.flags|=32),n.memoizedState!==null&&(c=$c(e,n,pv,null,null,a),go._currentValue=c),Ks(e,n),_n(e,n,s,a),n.child;case 6:return e===null&&be&&((e=a=gn)&&(a=Jv(a,n.pendingProps,Si),a!==null?(n.stateNode=a,wn=n,gn=null,e=!0):e=!1),e||Va(n)),null;case 13:return sm(e,n,a);case 4:return pn(n,n.stateNode.containerInfo),s=n.pendingProps,e===null?n.child=ka(n,null,s,a):_n(e,n,s,a),n.child;case 11:return Jp(e,n,n.type,n.pendingProps,a);case 7:return _n(e,n,n.pendingProps,a),n.child;case 8:return _n(e,n,n.pendingProps.children,a),n.child;case 12:return _n(e,n,n.pendingProps.children,a),n.child;case 10:return s=n.pendingProps,ua(n,n.type,s.value),_n(e,n,s.children,a),n.child;case 9:return c=n.type._context,s=n.pendingProps.children,Ka(n),c=Sn(c),s=s(c),n.flags|=1,_n(e,n,s,a),n.child;case 14:return $p(e,n,n.type,n.pendingProps,a);case 15:return tm(e,n,n.type,n.pendingProps,a);case 19:return lm(e,n,a);case 22:return em(e,n,a);case 24:return Ka(n),s=Sn(sn),e===null?(c=Qc(),c===null&&(c=Fe,f=Zc(),c.pooledCache=f,f.refCount++,f!==null&&(c.pooledCacheLanes|=a),c=f),n.memoizedState={parent:s,cache:c},Cu(n),ua(n,sn,c)):(e.lanes&a&&(Du(e,n),to(n,null,null,a),$s()),c=e.memoizedState,f=n.memoizedState,c.parent!==s?(c={parent:s,cache:s},n.memoizedState=c,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=c),ua(n,sn,s)):(s=f.cache,ua(n,sn,s),s!==c.cache&&wu(n,[sn],a,!0))),_n(e,n,n.pendingProps.children,a),n.child;case 29:throw n.pendingProps}throw Error(r(156,n.tag))}var Au=Rt(null),Za=null,Fi=null;function ua(e,n,a){Gt(Au,n._currentValue),n._currentValue=a}function Bi(e){e._currentValue=Au.current,Ft(Au)}function Ru(e,n,a){for(;e!==null;){var s=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,s!==null&&(s.childLanes|=n)):s!==null&&(s.childLanes&n)!==n&&(s.childLanes|=n),e===a)break;e=e.return}}function wu(e,n,a,s){var c=e.child;for(c!==null&&(c.return=e);c!==null;){var f=c.dependencies;if(f!==null){var S=c.child;f=f.firstContext;t:for(;f!==null;){var b=f;f=c;for(var N=0;N<n.length;N++)if(b.context===n[N]){f.lanes|=a,b=f.alternate,b!==null&&(b.lanes|=a),Ru(f.return,a,e),s||(S=null);break t}f=b.next}}else if(c.tag===18){if(S=c.return,S===null)throw Error(r(341));S.lanes|=a,f=S.alternate,f!==null&&(f.lanes|=a),Ru(S,a,e),S=null}else S=c.child;if(S!==null)S.return=c;else for(S=c;S!==null;){if(S===e){S=null;break}if(c=S.sibling,c!==null){c.return=S.return,S=c;break}S=S.return}c=S}}function Qs(e,n,a,s){e=null;for(var c=n,f=!1;c!==null;){if(!f){if(c.flags&524288)f=!0;else if(c.flags&262144)break}if(c.tag===10){var S=c.alternate;if(S===null)throw Error(r(387));if(S=S.memoizedProps,S!==null){var b=c.type;Hn(c.pendingProps.value,S.value)||(e!==null?e.push(b):e=[b])}}else if(c===B.current){if(S=c.alternate,S===null)throw Error(r(387));S.memoizedState.memoizedState!==c.memoizedState.memoizedState&&(e!==null?e.push(go):e=[go])}c=c.return}e!==null&&wu(n,e,a,s),n.flags|=262144}function pl(e){for(e=e.firstContext;e!==null;){if(!Hn(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Ka(e){Za=e,Fi=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Sn(e){return um(Za,e)}function ml(e,n){return Za===null&&Ka(e),um(e,n)}function um(e,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},Fi===null){if(e===null)throw Error(r(308));Fi=n,e.dependencies={lanes:0,firstContext:n},e.flags|=524288}else Fi=Fi.next=n;return a}var fa=!1;function Cu(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Du(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function ha(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function da(e,n,a){var s=e.updateQueue;if(s===null)return null;if(s=s.shared,Ve&2){var c=s.pending;return c===null?n.next=n:(n.next=c.next,c.next=n),s.pending=n,n=Zo(e),Wd(e,null,a),n}return jo(e,s,n,a),Zo(e)}function Js(e,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194176)!==0)){var s=n.lanes;s&=e.pendingLanes,a|=s,n.lanes=a,xi(e,a)}}function Uu(e,n){var a=e.updateQueue,s=e.alternate;if(s!==null&&(s=s.updateQueue,a===s)){var c=null,f=null;if(a=a.firstBaseUpdate,a!==null){do{var S={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};f===null?c=f=S:f=f.next=S,a=a.next}while(a!==null);f===null?c=f=n:f=f.next=n}else c=f=n;a={baseState:s.baseState,firstBaseUpdate:c,lastBaseUpdate:f,shared:s.shared,callbacks:s.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=n:e.next=n,a.lastBaseUpdate=n}var Lu=!1;function $s(){if(Lu){var e=Lr;if(e!==null)throw e}}function to(e,n,a,s){Lu=!1;var c=e.updateQueue;fa=!1;var f=c.firstBaseUpdate,S=c.lastBaseUpdate,b=c.shared.pending;if(b!==null){c.shared.pending=null;var N=b,V=N.next;N.next=null,S===null?f=V:S.next=V,S=N;var lt=e.alternate;lt!==null&&(lt=lt.updateQueue,b=lt.lastBaseUpdate,b!==S&&(b===null?lt.firstBaseUpdate=V:b.next=V,lt.lastBaseUpdate=N))}if(f!==null){var _t=c.baseState;S=0,lt=V=N=null,b=f;do{var et=b.lane&-536870913,ot=et!==b.lane;if(ot?(Me&et)===et:(s&et)===et){et!==0&&et===Ur&&(Lu=!0),lt!==null&&(lt=lt.next={lane:0,tag:b.tag,payload:b.payload,callback:null,next:null});t:{var Xt=e,ae=b;et=n;var qe=a;switch(ae.tag){case 1:if(Xt=ae.payload,typeof Xt=="function"){_t=Xt.call(qe,_t,et);break t}_t=Xt;break t;case 3:Xt.flags=Xt.flags&-65537|128;case 0:if(Xt=ae.payload,et=typeof Xt=="function"?Xt.call(qe,_t,et):Xt,et==null)break t;_t=R({},_t,et);break t;case 2:fa=!0}}et=b.callback,et!==null&&(e.flags|=64,ot&&(e.flags|=8192),ot=c.callbacks,ot===null?c.callbacks=[et]:ot.push(et))}else ot={lane:et,tag:b.tag,payload:b.payload,callback:b.callback,next:null},lt===null?(V=lt=ot,N=_t):lt=lt.next=ot,S|=et;if(b=b.next,b===null){if(b=c.shared.pending,b===null)break;ot=b,b=ot.next,ot.next=null,c.lastBaseUpdate=ot,c.shared.pending=null}}while(!0);lt===null&&(N=_t),c.baseState=N,c.firstBaseUpdate=V,c.lastBaseUpdate=lt,f===null&&(c.shared.lanes=0),va|=S,e.lanes=S,e.memoizedState=_t}}function fm(e,n){if(typeof e!="function")throw Error(r(191,e));e.call(n)}function hm(e,n){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)fm(a[e],n)}function eo(e,n){try{var a=n.updateQueue,s=a!==null?a.lastEffect:null;if(s!==null){var c=s.next;a=c;do{if((a.tag&e)===e){s=void 0;var f=a.create,S=a.inst;s=f(),S.destroy=s}a=a.next}while(a!==c)}}catch(b){ze(n,n.return,b)}}function pa(e,n,a){try{var s=n.updateQueue,c=s!==null?s.lastEffect:null;if(c!==null){var f=c.next;s=f;do{if((s.tag&e)===e){var S=s.inst,b=S.destroy;if(b!==void 0){S.destroy=void 0,c=n;var N=a;try{b()}catch(V){ze(c,N,V)}}}s=s.next}while(s!==f)}}catch(V){ze(n,n.return,V)}}function dm(e){var n=e.updateQueue;if(n!==null){var a=e.stateNode;try{hm(n,a)}catch(s){ze(e,e.return,s)}}}function pm(e,n,a){a.props=ja(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(s){ze(e,n,s)}}function Qa(e,n){try{var a=e.ref;if(a!==null){var s=e.stateNode;switch(e.tag){case 26:case 27:case 5:var c=s;break;default:c=s}typeof a=="function"?e.refCleanup=a(c):a.current=c}}catch(f){ze(e,n,f)}}function Gn(e,n){var a=e.ref,s=e.refCleanup;if(a!==null)if(typeof s=="function")try{s()}catch(c){ze(e,n,c)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(c){ze(e,n,c)}else a.current=null}function mm(e){var n=e.type,a=e.memoizedProps,s=e.stateNode;try{t:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&s.focus();break t;case"img":a.src?s.src=a.src:a.srcSet&&(s.srcset=a.srcSet)}}catch(c){ze(e,e.return,c)}}function gm(e,n,a){try{var s=e.stateNode;qv(s,e.type,a,n),s[nn]=n}catch(c){ze(e,e.return,c)}}function _m(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27||e.tag===4}function Nu(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||_m(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==27&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ou(e,n,a){var s=e.tag;if(s===5||s===6)e=e.stateNode,n?a.nodeType===8?a.parentNode.insertBefore(e,n):a.insertBefore(e,n):(a.nodeType===8?(n=a.parentNode,n.insertBefore(e,a)):(n=a,n.appendChild(e)),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=Cl));else if(s!==4&&s!==27&&(e=e.child,e!==null))for(Ou(e,n,a),e=e.sibling;e!==null;)Ou(e,n,a),e=e.sibling}function gl(e,n,a){var s=e.tag;if(s===5||s===6)e=e.stateNode,n?a.insertBefore(e,n):a.appendChild(e);else if(s!==4&&s!==27&&(e=e.child,e!==null))for(gl(e,n,a),e=e.sibling;e!==null;)gl(e,n,a),e=e.sibling}var Ii=!1,Xe=!1,Pu=!1,vm=typeof WeakSet=="function"?WeakSet:Set,fn=null,xm=!1;function Mv(e,n){if(e=e.containerInfo,uf=zl,e=zd(e),Fc(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else t:{a=(a=e.ownerDocument)&&a.defaultView||window;var s=a.getSelection&&a.getSelection();if(s&&s.rangeCount!==0){a=s.anchorNode;var c=s.anchorOffset,f=s.focusNode;s=s.focusOffset;try{a.nodeType,f.nodeType}catch{a=null;break t}var S=0,b=-1,N=-1,V=0,lt=0,_t=e,et=null;e:for(;;){for(var ot;_t!==a||c!==0&&_t.nodeType!==3||(b=S+c),_t!==f||s!==0&&_t.nodeType!==3||(N=S+s),_t.nodeType===3&&(S+=_t.nodeValue.length),(ot=_t.firstChild)!==null;)et=_t,_t=ot;for(;;){if(_t===e)break e;if(et===a&&++V===c&&(b=S),et===f&&++lt===s&&(N=S),(ot=_t.nextSibling)!==null)break;_t=et,et=_t.parentNode}_t=ot}a=b===-1||N===-1?null:{start:b,end:N}}else a=null}a=a||{start:0,end:0}}else a=null;for(ff={focusedElem:e,selectionRange:a},zl=!1,fn=n;fn!==null;)if(n=fn,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,fn=e;else for(;fn!==null;){switch(n=fn,f=n.alternate,e=n.flags,n.tag){case 0:break;case 11:case 15:break;case 1:if(e&1024&&f!==null){e=void 0,a=n,c=f.memoizedProps,f=f.memoizedState,s=a.stateNode;try{var Xt=ja(a.type,c,a.elementType===a.type);e=s.getSnapshotBeforeUpdate(Xt,f),s.__reactInternalSnapshotBeforeUpdate=e}catch(ae){ze(a,a.return,ae)}}break;case 3:if(e&1024){if(e=n.stateNode.containerInfo,a=e.nodeType,a===9)mf(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":mf(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(r(163))}if(e=n.sibling,e!==null){e.return=n.return,fn=e;break}fn=n.return}return Xt=xm,xm=!1,Xt}function Sm(e,n,a){var s=a.flags;switch(a.tag){case 0:case 11:case 15:Gi(e,a),s&4&&eo(5,a);break;case 1:if(Gi(e,a),s&4)if(e=a.stateNode,n===null)try{e.componentDidMount()}catch(b){ze(a,a.return,b)}else{var c=ja(a.type,n.memoizedProps);n=n.memoizedState;try{e.componentDidUpdate(c,n,e.__reactInternalSnapshotBeforeUpdate)}catch(b){ze(a,a.return,b)}}s&64&&dm(a),s&512&&Qa(a,a.return);break;case 3:if(Gi(e,a),s&64&&(s=a.updateQueue,s!==null)){if(e=null,a.child!==null)switch(a.child.tag){case 27:case 5:e=a.child.stateNode;break;case 1:e=a.child.stateNode}try{hm(s,e)}catch(b){ze(a,a.return,b)}}break;case 26:Gi(e,a),s&512&&Qa(a,a.return);break;case 27:case 5:Gi(e,a),n===null&&s&4&&mm(a),s&512&&Qa(a,a.return);break;case 12:Gi(e,a);break;case 13:Gi(e,a),s&4&&Em(e,a);break;case 22:if(c=a.memoizedState!==null||Ii,!c){n=n!==null&&n.memoizedState!==null||Xe;var f=Ii,S=Xe;Ii=c,(Xe=n)&&!S?ma(e,a,(a.subtreeFlags&8772)!==0):Gi(e,a),Ii=f,Xe=S}s&512&&(a.memoizedProps.mode==="manual"?Qa(a,a.return):Gn(a,a.return));break;default:Gi(e,a)}}function ym(e){var n=e.alternate;n!==null&&(e.alternate=null,ym(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&ws(n)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Qe=null,Vn=!1;function Hi(e,n,a){for(a=a.child;a!==null;)Mm(e,n,a),a=a.sibling}function Mm(e,n,a){if(kt&&typeof kt.onCommitFiberUnmount=="function")try{kt.onCommitFiberUnmount(jt,a)}catch{}switch(a.tag){case 26:Xe||Gn(a,n),Hi(e,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:Xe||Gn(a,n);var s=Qe,c=Vn;for(Qe=a.stateNode,Hi(e,n,a),a=a.stateNode,n=a.attributes;n.length;)a.removeAttributeNode(n[0]);ws(a),Qe=s,Vn=c;break;case 5:Xe||Gn(a,n);case 6:c=Qe;var f=Vn;if(Qe=null,Hi(e,n,a),Qe=c,Vn=f,Qe!==null)if(Vn)try{e=Qe,s=a.stateNode,e.nodeType===8?e.parentNode.removeChild(s):e.removeChild(s)}catch(S){ze(a,n,S)}else try{Qe.removeChild(a.stateNode)}catch(S){ze(a,n,S)}break;case 18:Qe!==null&&(Vn?(n=Qe,a=a.stateNode,n.nodeType===8?pf(n.parentNode,a):n.nodeType===1&&pf(n,a),So(n)):pf(Qe,a.stateNode));break;case 4:s=Qe,c=Vn,Qe=a.stateNode.containerInfo,Vn=!0,Hi(e,n,a),Qe=s,Vn=c;break;case 0:case 11:case 14:case 15:Xe||pa(2,a,n),Xe||pa(4,a,n),Hi(e,n,a);break;case 1:Xe||(Gn(a,n),s=a.stateNode,typeof s.componentWillUnmount=="function"&&pm(a,n,s)),Hi(e,n,a);break;case 21:Hi(e,n,a);break;case 22:Xe||Gn(a,n),Xe=(s=Xe)||a.memoizedState!==null,Hi(e,n,a),Xe=s;break;default:Hi(e,n,a)}}function Em(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{So(e)}catch(a){ze(n,n.return,a)}}function Ev(e){switch(e.tag){case 13:case 19:var n=e.stateNode;return n===null&&(n=e.stateNode=new vm),n;case 22:return e=e.stateNode,n=e._retryCache,n===null&&(n=e._retryCache=new vm),n;default:throw Error(r(435,e.tag))}}function zu(e,n){var a=Ev(e);n.forEach(function(s){var c=zv.bind(null,e,s);a.has(s)||(a.add(s),s.then(c,c))})}function ti(e,n){var a=n.deletions;if(a!==null)for(var s=0;s<a.length;s++){var c=a[s],f=e,S=n,b=S;t:for(;b!==null;){switch(b.tag){case 27:case 5:Qe=b.stateNode,Vn=!1;break t;case 3:Qe=b.stateNode.containerInfo,Vn=!0;break t;case 4:Qe=b.stateNode.containerInfo,Vn=!0;break t}b=b.return}if(Qe===null)throw Error(r(160));Mm(f,S,c),Qe=null,Vn=!1,f=c.alternate,f!==null&&(f.return=null),c.return=null}if(n.subtreeFlags&13878)for(n=n.child;n!==null;)Tm(n,e),n=n.sibling}var ui=null;function Tm(e,n){var a=e.alternate,s=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:ti(n,e),ei(e),s&4&&(pa(3,e,e.return),eo(3,e),pa(5,e,e.return));break;case 1:ti(n,e),ei(e),s&512&&(Xe||a===null||Gn(a,a.return)),s&64&&Ii&&(e=e.updateQueue,e!==null&&(s=e.callbacks,s!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?s:a.concat(s))));break;case 26:var c=ui;if(ti(n,e),ei(e),s&512&&(Xe||a===null||Gn(a,a.return)),s&4){var f=a!==null?a.memoizedState:null;if(s=e.memoizedState,a===null)if(s===null)if(e.stateNode===null){t:{s=e.type,a=e.memoizedProps,c=c.ownerDocument||c;e:switch(s){case"title":f=c.getElementsByTagName("title")[0],(!f||f[za]||f[en]||f.namespaceURI==="http://www.w3.org/2000/svg"||f.hasAttribute("itemprop"))&&(f=c.createElement(s),c.head.insertBefore(f,c.querySelector("head > title"))),vn(f,s,a),f[en]=e,Q(f),s=f;break t;case"link":var S=mg("link","href",c).get(s+(a.href||""));if(S){for(var b=0;b<S.length;b++)if(f=S[b],f.getAttribute("href")===(a.href==null?null:a.href)&&f.getAttribute("rel")===(a.rel==null?null:a.rel)&&f.getAttribute("title")===(a.title==null?null:a.title)&&f.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){S.splice(b,1);break e}}f=c.createElement(s),vn(f,s,a),c.head.appendChild(f);break;case"meta":if(S=mg("meta","content",c).get(s+(a.content||""))){for(b=0;b<S.length;b++)if(f=S[b],f.getAttribute("content")===(a.content==null?null:""+a.content)&&f.getAttribute("name")===(a.name==null?null:a.name)&&f.getAttribute("property")===(a.property==null?null:a.property)&&f.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&f.getAttribute("charset")===(a.charSet==null?null:a.charSet)){S.splice(b,1);break e}}f=c.createElement(s),vn(f,s,a),c.head.appendChild(f);break;default:throw Error(r(468,s))}f[en]=e,Q(f),s=f}e.stateNode=s}else gg(c,e.type,e.stateNode);else e.stateNode=pg(c,s,e.memoizedProps);else f!==s?(f===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):f.count--,s===null?gg(c,e.type,e.stateNode):pg(c,s,e.memoizedProps)):s===null&&e.stateNode!==null&&gm(e,e.memoizedProps,a.memoizedProps)}break;case 27:if(s&4&&e.alternate===null){c=e.stateNode,f=e.memoizedProps;try{for(var N=c.firstChild;N;){var V=N.nextSibling,lt=N.nodeName;N[za]||lt==="HEAD"||lt==="BODY"||lt==="SCRIPT"||lt==="STYLE"||lt==="LINK"&&N.rel.toLowerCase()==="stylesheet"||c.removeChild(N),N=V}for(var _t=e.type,et=c.attributes;et.length;)c.removeAttributeNode(et[0]);vn(c,_t,f),c[en]=e,c[nn]=f}catch(Xt){ze(e,e.return,Xt)}}case 5:if(ti(n,e),ei(e),s&512&&(Xe||a===null||Gn(a,a.return)),e.flags&32){c=e.stateNode;try{On(c,"")}catch(Xt){ze(e,e.return,Xt)}}s&4&&e.stateNode!=null&&(c=e.memoizedProps,gm(e,c,a!==null?a.memoizedProps:c)),s&1024&&(Pu=!0);break;case 6:if(ti(n,e),ei(e),s&4){if(e.stateNode===null)throw Error(r(162));s=e.memoizedProps,a=e.stateNode;try{a.nodeValue=s}catch(Xt){ze(e,e.return,Xt)}}break;case 3:if(Nl=null,c=ui,ui=Ul(n.containerInfo),ti(n,e),ui=c,ei(e),s&4&&a!==null&&a.memoizedState.isDehydrated)try{So(n.containerInfo)}catch(Xt){ze(e,e.return,Xt)}Pu&&(Pu=!1,bm(e));break;case 4:s=ui,ui=Ul(e.stateNode.containerInfo),ti(n,e),ei(e),ui=s;break;case 12:ti(n,e),ei(e);break;case 13:ti(n,e),ei(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(Wu=ut()),s&4&&(s=e.updateQueue,s!==null&&(e.updateQueue=null,zu(e,s)));break;case 22:if(s&512&&(Xe||a===null||Gn(a,a.return)),N=e.memoizedState!==null,V=a!==null&&a.memoizedState!==null,lt=Ii,_t=Xe,Ii=lt||N,Xe=_t||V,ti(n,e),Xe=_t,Ii=lt,ei(e),n=e.stateNode,n._current=e,n._visibility&=-3,n._visibility|=n._pendingVisibility&2,s&8192&&(n._visibility=N?n._visibility&-2:n._visibility|1,N&&(n=Ii||Xe,a===null||V||n||zr(e)),e.memoizedProps===null||e.memoizedProps.mode!=="manual"))t:for(a=null,n=e;;){if(n.tag===5||n.tag===26||n.tag===27){if(a===null){V=a=n;try{if(c=V.stateNode,N)f=c.style,typeof f.setProperty=="function"?f.setProperty("display","none","important"):f.display="none";else{S=V.stateNode,b=V.memoizedProps.style;var ot=b!=null&&b.hasOwnProperty("display")?b.display:null;S.style.display=ot==null||typeof ot=="boolean"?"":(""+ot).trim()}}catch(Xt){ze(V,V.return,Xt)}}}else if(n.tag===6){if(a===null){V=n;try{V.stateNode.nodeValue=N?"":V.memoizedProps}catch(Xt){ze(V,V.return,Xt)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===e)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break t;for(;n.sibling===null;){if(n.return===null||n.return===e)break t;a===n&&(a=null),n=n.return}a===n&&(a=null),n.sibling.return=n.return,n=n.sibling}s&4&&(s=e.updateQueue,s!==null&&(a=s.retryQueue,a!==null&&(s.retryQueue=null,zu(e,a))));break;case 19:ti(n,e),ei(e),s&4&&(s=e.updateQueue,s!==null&&(e.updateQueue=null,zu(e,s)));break;case 21:break;default:ti(n,e),ei(e)}}function ei(e){var n=e.flags;if(n&2){try{if(e.tag!==27){t:{for(var a=e.return;a!==null;){if(_m(a)){var s=a;break t}a=a.return}throw Error(r(160))}switch(s.tag){case 27:var c=s.stateNode,f=Nu(e);gl(e,f,c);break;case 5:var S=s.stateNode;s.flags&32&&(On(S,""),s.flags&=-33);var b=Nu(e);gl(e,b,S);break;case 3:case 4:var N=s.stateNode.containerInfo,V=Nu(e);Ou(e,V,N);break;default:throw Error(r(161))}}}catch(lt){ze(e,e.return,lt)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function bm(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var n=e;bm(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),e=e.sibling}}function Gi(e,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)Sm(e,n.alternate,n),n=n.sibling}function zr(e){for(e=e.child;e!==null;){var n=e;switch(n.tag){case 0:case 11:case 14:case 15:pa(4,n,n.return),zr(n);break;case 1:Gn(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&pm(n,n.return,a),zr(n);break;case 26:case 27:case 5:Gn(n,n.return),zr(n);break;case 22:Gn(n,n.return),n.memoizedState===null&&zr(n);break;default:zr(n)}e=e.sibling}}function ma(e,n,a){for(a=a&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var s=n.alternate,c=e,f=n,S=f.flags;switch(f.tag){case 0:case 11:case 15:ma(c,f,a),eo(4,f);break;case 1:if(ma(c,f,a),s=f,c=s.stateNode,typeof c.componentDidMount=="function")try{c.componentDidMount()}catch(V){ze(s,s.return,V)}if(s=f,c=s.updateQueue,c!==null){var b=s.stateNode;try{var N=c.shared.hiddenCallbacks;if(N!==null)for(c.shared.hiddenCallbacks=null,c=0;c<N.length;c++)fm(N[c],b)}catch(V){ze(s,s.return,V)}}a&&S&64&&dm(f),Qa(f,f.return);break;case 26:case 27:case 5:ma(c,f,a),a&&s===null&&S&4&&mm(f),Qa(f,f.return);break;case 12:ma(c,f,a);break;case 13:ma(c,f,a),a&&S&4&&Em(c,f);break;case 22:f.memoizedState===null&&ma(c,f,a),Qa(f,f.return);break;default:ma(c,f,a)}n=n.sibling}}function Fu(e,n){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(e=n.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&Ws(a))}function Bu(e,n){e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&Ws(e))}function ga(e,n,a,s){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)Am(e,n,a,s),n=n.sibling}function Am(e,n,a,s){var c=n.flags;switch(n.tag){case 0:case 11:case 15:ga(e,n,a,s),c&2048&&eo(9,n);break;case 3:ga(e,n,a,s),c&2048&&(e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&Ws(e)));break;case 12:if(c&2048){ga(e,n,a,s),e=n.stateNode;try{var f=n.memoizedProps,S=f.id,b=f.onPostCommit;typeof b=="function"&&b(S,n.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(N){ze(n,n.return,N)}}else ga(e,n,a,s);break;case 23:break;case 22:f=n.stateNode,n.memoizedState!==null?f._visibility&4?ga(e,n,a,s):no(e,n):f._visibility&4?ga(e,n,a,s):(f._visibility|=4,Fr(e,n,a,s,(n.subtreeFlags&10256)!==0)),c&2048&&Fu(n.alternate,n);break;case 24:ga(e,n,a,s),c&2048&&Bu(n.alternate,n);break;default:ga(e,n,a,s)}}function Fr(e,n,a,s,c){for(c=c&&(n.subtreeFlags&10256)!==0,n=n.child;n!==null;){var f=e,S=n,b=a,N=s,V=S.flags;switch(S.tag){case 0:case 11:case 15:Fr(f,S,b,N,c),eo(8,S);break;case 23:break;case 22:var lt=S.stateNode;S.memoizedState!==null?lt._visibility&4?Fr(f,S,b,N,c):no(f,S):(lt._visibility|=4,Fr(f,S,b,N,c)),c&&V&2048&&Fu(S.alternate,S);break;case 24:Fr(f,S,b,N,c),c&&V&2048&&Bu(S.alternate,S);break;default:Fr(f,S,b,N,c)}n=n.sibling}}function no(e,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=e,s=n,c=s.flags;switch(s.tag){case 22:no(a,s),c&2048&&Fu(s.alternate,s);break;case 24:no(a,s),c&2048&&Bu(s.alternate,s);break;default:no(a,s)}n=n.sibling}}var io=8192;function Br(e){if(e.subtreeFlags&io)for(e=e.child;e!==null;)Rm(e),e=e.sibling}function Rm(e){switch(e.tag){case 26:Br(e),e.flags&io&&e.memoizedState!==null&&fx(ui,e.memoizedState,e.memoizedProps);break;case 5:Br(e);break;case 3:case 4:var n=ui;ui=Ul(e.stateNode.containerInfo),Br(e),ui=n;break;case 22:e.memoizedState===null&&(n=e.alternate,n!==null&&n.memoizedState!==null?(n=io,io=16777216,Br(e),io=n):Br(e));break;default:Br(e)}}function wm(e){var n=e.alternate;if(n!==null&&(e=n.child,e!==null)){n.child=null;do n=e.sibling,e.sibling=null,e=n;while(e!==null)}}function ao(e){var n=e.deletions;if(e.flags&16){if(n!==null)for(var a=0;a<n.length;a++){var s=n[a];fn=s,Dm(s,e)}wm(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Cm(e),e=e.sibling}function Cm(e){switch(e.tag){case 0:case 11:case 15:ao(e),e.flags&2048&&pa(9,e,e.return);break;case 3:ao(e);break;case 12:ao(e);break;case 22:var n=e.stateNode;e.memoizedState!==null&&n._visibility&4&&(e.return===null||e.return.tag!==13)?(n._visibility&=-5,_l(e)):ao(e);break;default:ao(e)}}function _l(e){var n=e.deletions;if(e.flags&16){if(n!==null)for(var a=0;a<n.length;a++){var s=n[a];fn=s,Dm(s,e)}wm(e)}for(e=e.child;e!==null;){switch(n=e,n.tag){case 0:case 11:case 15:pa(8,n,n.return),_l(n);break;case 22:a=n.stateNode,a._visibility&4&&(a._visibility&=-5,_l(n));break;default:_l(n)}e=e.sibling}}function Dm(e,n){for(;fn!==null;){var a=fn;switch(a.tag){case 0:case 11:case 15:pa(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var s=a.memoizedState.cachePool.pool;s!=null&&s.refCount++}break;case 24:Ws(a.memoizedState.cache)}if(s=a.child,s!==null)s.return=a,fn=s;else t:for(a=e;fn!==null;){s=fn;var c=s.sibling,f=s.return;if(ym(s),s===a){fn=null;break t}if(c!==null){c.return=f,fn=c;break t}fn=f}}}function Tv(e,n,a,s){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=s,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ni(e,n,a,s){return new Tv(e,n,a,s)}function Iu(e){return e=e.prototype,!(!e||!e.isReactComponent)}function _a(e,n){var a=e.alternate;return a===null?(a=ni(e.tag,n,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=n,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&31457280,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,n=e.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function Um(e,n){e.flags&=31457282;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=n,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,n=a.dependencies,e.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),e}function vl(e,n,a,s,c,f){var S=0;if(s=e,typeof e=="function")Iu(e)&&(S=1);else if(typeof e=="string")S=cx(e,a,ye.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case m:return Ja(a.children,c,f,n);case p:S=8,c|=24;break;case g:return e=ni(12,a,n,c|2),e.elementType=g,e.lanes=f,e;case C:return e=ni(13,a,n,c),e.elementType=C,e.lanes=f,e;case y:return e=ni(19,a,n,c),e.elementType=y,e.lanes=f,e;case O:return Lm(a,c,f,n);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case v:case M:S=10;break t;case x:S=9;break t;case T:S=11;break t;case _:S=14;break t;case P:S=16,s=null;break t}S=29,a=Error(r(130,e===null?"null":typeof e,"")),s=null}return n=ni(S,a,n,c),n.elementType=e,n.type=s,n.lanes=f,n}function Ja(e,n,a,s){return e=ni(7,e,s,n),e.lanes=a,e}function Lm(e,n,a,s){e=ni(22,e,s,n),e.elementType=O,e.lanes=a;var c={_visibility:1,_pendingVisibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null,_current:null,detach:function(){var f=c._current;if(f===null)throw Error(r(456));if(!(c._pendingVisibility&2)){var S=ra(f,2);S!==null&&(c._pendingVisibility|=2,Cn(S,f,2))}},attach:function(){var f=c._current;if(f===null)throw Error(r(456));if(c._pendingVisibility&2){var S=ra(f,2);S!==null&&(c._pendingVisibility&=-3,Cn(S,f,2))}}};return e.stateNode=c,e}function Hu(e,n,a){return e=ni(6,e,null,n),e.lanes=a,e}function Gu(e,n,a){return n=ni(4,e.children!==null?e.children:[],e.key,n),n.lanes=a,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}function Vi(e){e.flags|=4}function Nm(e,n){if(n.type!=="stylesheet"||n.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!_g(n)){if(n=$n.current,n!==null&&((Me&4194176)===Me?yi!==null:(Me&62914560)!==Me&&!(Me&536870912)||n!==yi))throw Vs=qc,Kd;e.flags|=8192}}function xl(e,n){n!==null&&(e.flags|=4),e.flags&16384&&(n=e.tag!==22?Ee():536870912,e.lanes|=n,Hr|=n)}function ro(e,n){if(!be)switch(e.tailMode){case"hidden":n=e.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var s=null;a!==null;)a.alternate!==null&&(s=a),a=a.sibling;s===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:s.sibling=null}}function Ge(e){var n=e.alternate!==null&&e.alternate.child===e.child,a=0,s=0;if(n)for(var c=e.child;c!==null;)a|=c.lanes|c.childLanes,s|=c.subtreeFlags&31457280,s|=c.flags&31457280,c.return=e,c=c.sibling;else for(c=e.child;c!==null;)a|=c.lanes|c.childLanes,s|=c.subtreeFlags,s|=c.flags,c.return=e,c=c.sibling;return e.subtreeFlags|=s,e.childLanes=a,n}function bv(e,n,a){var s=n.pendingProps;switch(Xc(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ge(n),null;case 1:return Ge(n),null;case 3:return a=n.stateNode,s=null,e!==null&&(s=e.memoizedState.cache),n.memoizedState.cache!==s&&(n.flags|=2048),Bi(sn),se(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(Bs(n)?Vi(n):e===null||e.memoizedState.isDehydrated&&!(n.flags&256)||(n.flags|=1024,ci!==null&&(Zu(ci),ci=null))),Ge(n),null;case 26:return a=n.memoizedState,e===null?(Vi(n),a!==null?(Ge(n),Nm(n,a)):(Ge(n),n.flags&=-16777217)):a?a!==e.memoizedState?(Vi(n),Ge(n),Nm(n,a)):(Ge(n),n.flags&=-16777217):(e.memoizedProps!==s&&Vi(n),Ge(n),n.flags&=-16777217),null;case 27:Wt(n),a=we.current;var c=n.type;if(e!==null&&n.stateNode!=null)e.memoizedProps!==s&&Vi(n);else{if(!s){if(n.stateNode===null)throw Error(r(166));return Ge(n),null}e=ye.current,Bs(n)?jd(n):(e=cg(c,s,a),n.stateNode=e,Vi(n))}return Ge(n),null;case 5:if(Wt(n),a=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==s&&Vi(n);else{if(!s){if(n.stateNode===null)throw Error(r(166));return Ge(n),null}if(e=ye.current,Bs(n))jd(n);else{switch(c=Dl(we.current),e){case 1:e=c.createElementNS("http://www.w3.org/2000/svg",a);break;case 2:e=c.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;default:switch(a){case"svg":e=c.createElementNS("http://www.w3.org/2000/svg",a);break;case"math":e=c.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;case"script":e=c.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild);break;case"select":e=typeof s.is=="string"?c.createElement("select",{is:s.is}):c.createElement("select"),s.multiple?e.multiple=!0:s.size&&(e.size=s.size);break;default:e=typeof s.is=="string"?c.createElement(a,{is:s.is}):c.createElement(a)}}e[en]=n,e[nn]=s;t:for(c=n.child;c!==null;){if(c.tag===5||c.tag===6)e.appendChild(c.stateNode);else if(c.tag!==4&&c.tag!==27&&c.child!==null){c.child.return=c,c=c.child;continue}if(c===n)break t;for(;c.sibling===null;){if(c.return===null||c.return===n)break t;c=c.return}c.sibling.return=c.return,c=c.sibling}n.stateNode=e;t:switch(vn(e,a,s),a){case"button":case"input":case"select":case"textarea":e=!!s.autoFocus;break t;case"img":e=!0;break t;default:e=!1}e&&Vi(n)}}return Ge(n),n.flags&=-16777217,null;case 6:if(e&&n.stateNode!=null)e.memoizedProps!==s&&Vi(n);else{if(typeof s!="string"&&n.stateNode===null)throw Error(r(166));if(e=we.current,Bs(n)){if(e=n.stateNode,a=n.memoizedProps,s=null,c=wn,c!==null)switch(c.tag){case 27:case 5:s=c.memoizedProps}e[en]=n,e=!!(e.nodeValue===a||s!==null&&s.suppressHydrationWarning===!0||ig(e.nodeValue,a)),e||Va(n)}else e=Dl(e).createTextNode(s),e[en]=n,n.stateNode=e}return Ge(n),null;case 13:if(s=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(c=Bs(n),s!==null&&s.dehydrated!==null){if(e===null){if(!c)throw Error(r(318));if(c=n.memoizedState,c=c!==null?c.dehydrated:null,!c)throw Error(r(317));c[en]=n}else Is(),!(n.flags&128)&&(n.memoizedState=null),n.flags|=4;Ge(n),c=!1}else ci!==null&&(Zu(ci),ci=null),c=!0;if(!c)return n.flags&256?(Oi(n),n):(Oi(n),null)}if(Oi(n),n.flags&128)return n.lanes=a,n;if(a=s!==null,e=e!==null&&e.memoizedState!==null,a){s=n.child,c=null,s.alternate!==null&&s.alternate.memoizedState!==null&&s.alternate.memoizedState.cachePool!==null&&(c=s.alternate.memoizedState.cachePool.pool);var f=null;s.memoizedState!==null&&s.memoizedState.cachePool!==null&&(f=s.memoizedState.cachePool.pool),f!==c&&(s.flags|=2048)}return a!==e&&a&&(n.child.flags|=8192),xl(n,n.updateQueue),Ge(n),null;case 4:return se(),e===null&&of(n.stateNode.containerInfo),Ge(n),null;case 10:return Bi(n.type),Ge(n),null;case 19:if(Ft(rn),c=n.memoizedState,c===null)return Ge(n),null;if(s=(n.flags&128)!==0,f=c.rendering,f===null)if(s)ro(c,!1);else{if(We!==0||e!==null&&e.flags&128)for(e=n.child;e!==null;){if(f=nl(e),f!==null){for(n.flags|=128,ro(c,!1),e=f.updateQueue,n.updateQueue=e,xl(n,e),n.subtreeFlags=0,e=a,a=n.child;a!==null;)Um(a,e),a=a.sibling;return Gt(rn,rn.current&1|2),n.child}e=e.sibling}c.tail!==null&&ut()>Sl&&(n.flags|=128,s=!0,ro(c,!1),n.lanes=4194304)}else{if(!s)if(e=nl(f),e!==null){if(n.flags|=128,s=!0,e=e.updateQueue,n.updateQueue=e,xl(n,e),ro(c,!0),c.tail===null&&c.tailMode==="hidden"&&!f.alternate&&!be)return Ge(n),null}else 2*ut()-c.renderingStartTime>Sl&&a!==536870912&&(n.flags|=128,s=!0,ro(c,!1),n.lanes=4194304);c.isBackwards?(f.sibling=n.child,n.child=f):(e=c.last,e!==null?e.sibling=f:n.child=f,c.last=f)}return c.tail!==null?(n=c.tail,c.rendering=n,c.tail=n.sibling,c.renderingStartTime=ut(),n.sibling=null,e=rn.current,Gt(rn,s?e&1|2:e&1),n):(Ge(n),null);case 22:case 23:return Oi(n),jc(),s=n.memoizedState!==null,e!==null?e.memoizedState!==null!==s&&(n.flags|=8192):s&&(n.flags|=8192),s?a&536870912&&!(n.flags&128)&&(Ge(n),n.subtreeFlags&6&&(n.flags|=8192)):Ge(n),a=n.updateQueue,a!==null&&xl(n,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),s=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(s=n.memoizedState.cachePool.pool),s!==a&&(n.flags|=2048),e!==null&&Ft(Xa),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),Bi(sn),Ge(n),null;case 25:return null}throw Error(r(156,n.tag))}function Av(e,n){switch(Xc(n),n.tag){case 1:return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return Bi(sn),se(),e=n.flags,e&65536&&!(e&128)?(n.flags=e&-65537|128,n):null;case 26:case 27:case 5:return Wt(n),null;case 13:if(Oi(n),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(r(340));Is()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return Ft(rn),null;case 4:return se(),null;case 10:return Bi(n.type),null;case 22:case 23:return Oi(n),jc(),e!==null&&Ft(Xa),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 24:return Bi(sn),null;case 25:return null;default:return null}}function Om(e,n){switch(Xc(n),n.tag){case 3:Bi(sn),se();break;case 26:case 27:case 5:Wt(n);break;case 4:se();break;case 13:Oi(n);break;case 19:Ft(rn);break;case 10:Bi(n.type);break;case 22:case 23:Oi(n),jc(),e!==null&&Ft(Xa);break;case 24:Bi(sn)}}var Rv={getCacheForType:function(e){var n=Sn(sn),a=n.data.get(e);return a===void 0&&(a=e(),n.data.set(e,a)),a}},wv=typeof WeakMap=="function"?WeakMap:Map,Ve=0,Fe=null,pe=null,Me=0,Be=0,kn=null,ki=!1,Ir=!1,Vu=!1,Xi=0,We=0,va=0,$a=0,ku=0,ii=0,Hr=0,so=null,Ei=null,Xu=!1,Wu=0,Sl=1/0,yl=null,xa=null,Ml=!1,tr=null,oo=0,qu=0,Yu=null,lo=0,ju=null;function Xn(){if(Ve&2&&Me!==0)return Me&-Me;if(w.T!==null){var e=Ur;return e!==0?e:nf()}return Rs()}function Pm(){ii===0&&(ii=!(Me&536870912)||be?tn():536870912);var e=$n.current;return e!==null&&(e.flags|=32),ii}function Cn(e,n,a){(e===Fe&&Be===2||e.cancelPendingCommit!==null)&&(Gr(e,0),Wi(e,Me,ii,!1)),bn(e,a),(!(Ve&2)||e!==Fe)&&(e===Fe&&(!(Ve&2)&&($a|=a),We===4&&Wi(e,Me,ii,!1)),Ti(e))}function zm(e,n,a){if(Ve&6)throw Error(r(327));var s=!a&&(n&60)===0&&(n&e.expiredLanes)===0||$t(e,n),c=s?Uv(e,n):Ju(e,n,!0),f=s;do{if(c===0){Ir&&!s&&Wi(e,n,0,!1);break}else if(c===6)Wi(e,n,0,!ki);else{if(a=e.current.alternate,f&&!Cv(a)){c=Ju(e,n,!1),f=!1;continue}if(c===2){if(f=n,e.errorRecoveryDisabledLanes&f)var S=0;else S=e.pendingLanes&-536870913,S=S!==0?S:S&536870912?536870912:0;if(S!==0){n=S;t:{var b=e;c=so;var N=b.current.memoizedState.isDehydrated;if(N&&(Gr(b,S).flags|=256),S=Ju(b,S,!1),S!==2){if(Vu&&!N){b.errorRecoveryDisabledLanes|=f,$a|=f,c=4;break t}f=Ei,Ei=c,f!==null&&Zu(f)}c=S}if(f=!1,c!==2)continue}}if(c===1){Gr(e,0),Wi(e,n,0,!0);break}t:{switch(s=e,c){case 0:case 1:throw Error(r(345));case 4:if((n&4194176)===n){Wi(s,n,ii,!ki);break t}break;case 2:Ei=null;break;case 3:case 5:break;default:throw Error(r(329))}if(s.finishedWork=a,s.finishedLanes=n,(n&62914560)===n&&(f=Wu+300-ut(),10<f)){if(Wi(s,n,ii,!ki),Dt(s,0)!==0)break t;s.timeoutHandle=sg(Fm.bind(null,s,a,Ei,yl,Xu,n,ii,$a,Hr,ki,2,-0,0),f);break t}Fm(s,a,Ei,yl,Xu,n,ii,$a,Hr,ki,0,-0,0)}}break}while(!0);Ti(e)}function Zu(e){Ei===null?Ei=e:Ei.push.apply(Ei,e)}function Fm(e,n,a,s,c,f,S,b,N,V,lt,_t,et){var ot=n.subtreeFlags;if((ot&8192||(ot&16785408)===16785408)&&(mo={stylesheets:null,count:0,unsuspend:ux},Rm(n),n=hx(),n!==null)){e.cancelPendingCommit=n(Xm.bind(null,e,a,s,c,S,b,N,1,_t,et)),Wi(e,f,S,!V);return}Xm(e,a,s,c,S,b,N,lt,_t,et)}function Cv(e){for(var n=e;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var s=0;s<a.length;s++){var c=a[s],f=c.getSnapshot;c=c.value;try{if(!Hn(f(),c))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function Wi(e,n,a,s){n&=~ku,n&=~$a,e.suspendedLanes|=n,e.pingedLanes&=~n,s&&(e.warmLanes|=n),s=e.expirationTimes;for(var c=n;0<c;){var f=31-Kt(c),S=1<<f;s[f]=-1,c&=~S}a!==0&&As(e,a,n)}function El(){return Ve&6?!0:(co(0),!1)}function Ku(){if(pe!==null){if(Be===0)var e=pe.return;else e=pe,Fi=Za=null,nu(e),Cr=null,ks=0,e=pe;for(;e!==null;)Om(e.alternate,e),e=e.return;pe=null}}function Gr(e,n){e.finishedWork=null,e.finishedLanes=0;var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,jv(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),Ku(),Fe=e,pe=a=_a(e.current,null),Me=n,Be=0,kn=null,ki=!1,Ir=$t(e,n),Vu=!1,Hr=ii=ku=$a=va=We=0,Ei=so=null,Xu=!1,n&8&&(n|=n&32);var s=e.entangledLanes;if(s!==0)for(e=e.entanglements,s&=n;0<s;){var c=31-Kt(s),f=1<<c;n|=e[c],s&=~f}return Xi=n,Yo(),a}function Bm(e,n){fe=null,w.H=Mi,n===Gs?(n=$d(),Be=3):n===Kd?(n=$d(),Be=4):Be=n===Qp?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,kn=n,pe===null&&(We=1,dl(e,Kn(n,e.current)))}function Im(){var e=w.H;return w.H=Mi,e===null?Mi:e}function Hm(){var e=w.A;return w.A=Rv,e}function Qu(){We=4,ki||(Me&4194176)!==Me&&$n.current!==null||(Ir=!0),!(va&134217727)&&!($a&134217727)||Fe===null||Wi(Fe,Me,ii,!1)}function Ju(e,n,a){var s=Ve;Ve|=2;var c=Im(),f=Hm();(Fe!==e||Me!==n)&&(yl=null,Gr(e,n)),n=!1;var S=We;t:do try{if(Be!==0&&pe!==null){var b=pe,N=kn;switch(Be){case 8:Ku(),S=6;break t;case 3:case 2:case 6:$n.current===null&&(n=!0);var V=Be;if(Be=0,kn=null,Vr(e,b,N,V),a&&Ir){S=0;break t}break;default:V=Be,Be=0,kn=null,Vr(e,b,N,V)}}Dv(),S=We;break}catch(lt){Bm(e,lt)}while(!0);return n&&e.shellSuspendCounter++,Fi=Za=null,Ve=s,w.H=c,w.A=f,pe===null&&(Fe=null,Me=0,Yo()),S}function Dv(){for(;pe!==null;)Gm(pe)}function Uv(e,n){var a=Ve;Ve|=2;var s=Im(),c=Hm();Fe!==e||Me!==n?(yl=null,Sl=ut()+500,Gr(e,n)):Ir=$t(e,n);t:do try{if(Be!==0&&pe!==null){n=pe;var f=kn;e:switch(Be){case 1:Be=0,kn=null,Vr(e,n,f,1);break;case 2:if(Qd(f)){Be=0,kn=null,Vm(n);break}n=function(){Be===2&&Fe===e&&(Be=7),Ti(e)},f.then(n,n);break t;case 3:Be=7;break t;case 4:Be=5;break t;case 7:Qd(f)?(Be=0,kn=null,Vm(n)):(Be=0,kn=null,Vr(e,n,f,7));break;case 5:var S=null;switch(pe.tag){case 26:S=pe.memoizedState;case 5:case 27:var b=pe;if(!S||_g(S)){Be=0,kn=null;var N=b.sibling;if(N!==null)pe=N;else{var V=b.return;V!==null?(pe=V,Tl(V)):pe=null}break e}}Be=0,kn=null,Vr(e,n,f,5);break;case 6:Be=0,kn=null,Vr(e,n,f,6);break;case 8:Ku(),We=6;break t;default:throw Error(r(462))}}Lv();break}catch(lt){Bm(e,lt)}while(!0);return Fi=Za=null,w.H=s,w.A=c,Ve=a,pe!==null?0:(Fe=null,Me=0,Yo(),We)}function Lv(){for(;pe!==null&&!E();)Gm(pe)}function Gm(e){var n=cm(e.alternate,e,Xi);e.memoizedProps=e.pendingProps,n===null?Tl(e):pe=n}function Vm(e){var n=e,a=n.alternate;switch(n.tag){case 15:case 0:n=im(a,n,n.pendingProps,n.type,void 0,Me);break;case 11:n=im(a,n,n.pendingProps,n.type.render,n.ref,Me);break;case 5:nu(n);default:Om(a,n),n=pe=Um(n,Xi),n=cm(a,n,Xi)}e.memoizedProps=e.pendingProps,n===null?Tl(e):pe=n}function Vr(e,n,a,s){Fi=Za=null,nu(n),Cr=null,ks=0;var c=n.return;try{if(Sv(e,c,n,a,Me)){We=1,dl(e,Kn(a,e.current)),pe=null;return}}catch(f){if(c!==null)throw pe=c,f;We=1,dl(e,Kn(a,e.current)),pe=null;return}n.flags&32768?(be||s===1?e=!0:Ir||Me&536870912?e=!1:(ki=e=!0,(s===2||s===3||s===6)&&(s=$n.current,s!==null&&s.tag===13&&(s.flags|=16384))),km(n,e)):Tl(n)}function Tl(e){var n=e;do{if(n.flags&32768){km(n,ki);return}e=n.return;var a=bv(n.alternate,n,Xi);if(a!==null){pe=a;return}if(n=n.sibling,n!==null){pe=n;return}pe=n=e}while(n!==null);We===0&&(We=5)}function km(e,n){do{var a=Av(e.alternate,e);if(a!==null){a.flags&=32767,pe=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(e=e.sibling,e!==null)){pe=e;return}pe=e=a}while(e!==null);We=6,pe=null}function Xm(e,n,a,s,c,f,S,b,N,V){var lt=w.T,_t=q.p;try{q.p=2,w.T=null,Nv(e,n,a,s,_t,c,f,S,b,N,V)}finally{w.T=lt,q.p=_t}}function Nv(e,n,a,s,c,f,S,b){do kr();while(tr!==null);if(Ve&6)throw Error(r(327));var N=e.finishedWork;if(s=e.finishedLanes,N===null)return null;if(e.finishedWork=null,e.finishedLanes=0,N===e.current)throw Error(r(177));e.callbackNode=null,e.callbackPriority=0,e.cancelPendingCommit=null;var V=N.lanes|N.childLanes;if(V|=Gc,Fo(e,s,V,f,S,b),e===Fe&&(pe=Fe=null,Me=0),!(N.subtreeFlags&10256)&&!(N.flags&10256)||Ml||(Ml=!0,qu=V,Yu=a,Fv(Ct,function(){return kr(),null})),a=(N.flags&15990)!==0,N.subtreeFlags&15990||a?(a=w.T,w.T=null,f=q.p,q.p=2,S=Ve,Ve|=4,Mv(e,N),Tm(N,e),iv(ff,e.containerInfo),zl=!!uf,ff=uf=null,e.current=N,Sm(e,N.alternate,N),tt(),Ve=S,q.p=f,w.T=a):e.current=N,Ml?(Ml=!1,tr=e,oo=s):Wm(e,V),V=e.pendingLanes,V===0&&(xa=null),It(N.stateNode),Ti(e),n!==null)for(c=e.onRecoverableError,N=0;N<n.length;N++)V=n[N],c(V.value,{componentStack:V.stack});return oo&3&&kr(),V=e.pendingLanes,s&4194218&&V&42?e===ju?lo++:(lo=0,ju=e):lo=0,co(0),null}function Wm(e,n){(e.pooledCacheLanes&=n)===0&&(n=e.pooledCache,n!=null&&(e.pooledCache=null,Ws(n)))}function kr(){if(tr!==null){var e=tr,n=qu;qu=0;var a=_r(oo),s=w.T,c=q.p;try{if(q.p=32>a?32:a,w.T=null,tr===null)var f=!1;else{a=Yu,Yu=null;var S=tr,b=oo;if(tr=null,oo=0,Ve&6)throw Error(r(331));var N=Ve;if(Ve|=4,Cm(S.current),Am(S,S.current,b,a),Ve=N,co(0,!1),kt&&typeof kt.onPostCommitFiberRoot=="function")try{kt.onPostCommitFiberRoot(jt,S)}catch{}f=!0}return f}finally{q.p=c,w.T=s,Wm(e,n)}}return!1}function qm(e,n,a){n=Kn(a,n),n=gu(e.stateNode,n,2),e=da(e,n,2),e!==null&&(bn(e,2),Ti(e))}function ze(e,n,a){if(e.tag===3)qm(e,e,a);else for(;n!==null;){if(n.tag===3){qm(n,e,a);break}else if(n.tag===1){var s=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof s.componentDidCatch=="function"&&(xa===null||!xa.has(s))){e=Kn(a,e),a=Zp(2),s=da(n,a,2),s!==null&&(Kp(a,s,n,e),bn(s,2),Ti(s));break}}n=n.return}}function $u(e,n,a){var s=e.pingCache;if(s===null){s=e.pingCache=new wv;var c=new Set;s.set(n,c)}else c=s.get(n),c===void 0&&(c=new Set,s.set(n,c));c.has(a)||(Vu=!0,c.add(a),e=Ov.bind(null,e,n,a),n.then(e,e))}function Ov(e,n,a){var s=e.pingCache;s!==null&&s.delete(n),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,Fe===e&&(Me&a)===a&&(We===4||We===3&&(Me&62914560)===Me&&300>ut()-Wu?!(Ve&2)&&Gr(e,0):ku|=a,Hr===Me&&(Hr=0)),Ti(e)}function Ym(e,n){n===0&&(n=Ee()),e=ra(e,n),e!==null&&(bn(e,n),Ti(e))}function Pv(e){var n=e.memoizedState,a=0;n!==null&&(a=n.retryLane),Ym(e,a)}function zv(e,n){var a=0;switch(e.tag){case 13:var s=e.stateNode,c=e.memoizedState;c!==null&&(a=c.retryLane);break;case 19:s=e.stateNode;break;case 22:s=e.stateNode._retryCache;break;default:throw Error(r(314))}s!==null&&s.delete(n),Ym(e,a)}function Fv(e,n){return qt(e,n)}var bl=null,Xr=null,tf=!1,Al=!1,ef=!1,er=0;function Ti(e){e!==Xr&&e.next===null&&(Xr===null?bl=Xr=e:Xr=Xr.next=e),Al=!0,tf||(tf=!0,Iv(Bv))}function co(e,n){if(!ef&&Al){ef=!0;do for(var a=!1,s=bl;s!==null;){if(e!==0){var c=s.pendingLanes;if(c===0)var f=0;else{var S=s.suspendedLanes,b=s.pingedLanes;f=(1<<31-Kt(42|e)+1)-1,f&=c&~(S&~b),f=f&201326677?f&201326677|1:f?f|2:0}f!==0&&(a=!0,Km(s,f))}else f=Me,f=Dt(s,s===Fe?f:0),!(f&3)||$t(s,f)||(a=!0,Km(s,f));s=s.next}while(a);ef=!1}}function Bv(){Al=tf=!1;var e=0;er!==0&&(Yv()&&(e=er),er=0);for(var n=ut(),a=null,s=bl;s!==null;){var c=s.next,f=jm(s,n);f===0?(s.next=null,a===null?bl=c:a.next=c,c===null&&(Xr=a)):(a=s,(e!==0||f&3)&&(Al=!0)),s=c}co(e)}function jm(e,n){for(var a=e.suspendedLanes,s=e.pingedLanes,c=e.expirationTimes,f=e.pendingLanes&-62914561;0<f;){var S=31-Kt(f),b=1<<S,N=c[S];N===-1?(!(b&a)||b&s)&&(c[S]=He(b,n)):N<=n&&(e.expiredLanes|=b),f&=~b}if(n=Fe,a=Me,a=Dt(e,e===n?a:0),s=e.callbackNode,a===0||e===n&&Be===2||e.cancelPendingCommit!==null)return s!==null&&s!==null&&U(s),e.callbackNode=null,e.callbackPriority=0;if(!(a&3)||$t(e,a)){if(n=a&-a,n===e.callbackPriority)return n;switch(s!==null&&U(s),_r(a)){case 2:case 8:a=Vt;break;case 32:a=Ct;break;case 268435456:a=me;break;default:a=Ct}return s=Zm.bind(null,e),a=qt(a,s),e.callbackPriority=n,e.callbackNode=a,n}return s!==null&&s!==null&&U(s),e.callbackPriority=2,e.callbackNode=null,2}function Zm(e,n){var a=e.callbackNode;if(kr()&&e.callbackNode!==a)return null;var s=Me;return s=Dt(e,e===Fe?s:0),s===0?null:(zm(e,s,n),jm(e,ut()),e.callbackNode!=null&&e.callbackNode===a?Zm.bind(null,e):null)}function Km(e,n){if(kr())return null;zm(e,n,!0)}function Iv(e){Zv(function(){Ve&6?qt(ft,e):e()})}function nf(){return er===0&&(er=tn()),er}function Qm(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Ho(""+e)}function Jm(e,n){var a=n.ownerDocument.createElement("input");return a.name=n.name,a.value=n.value,e.id&&a.setAttribute("form",e.id),n.parentNode.insertBefore(a,n),e=new FormData(e),a.parentNode.removeChild(a),e}function Hv(e,n,a,s,c){if(n==="submit"&&a&&a.stateNode===c){var f=Qm((c[nn]||null).action),S=s.submitter;S&&(n=(n=S[nn]||null)?Qm(n.formAction):S.getAttribute("formAction"),n!==null&&(f=n,S=null));var b=new Xo("action","action",null,s,c);e.push({event:b,listeners:[{instance:null,listener:function(){if(s.defaultPrevented){if(er!==0){var N=S?Jm(c,S):new FormData(c);fu(a,{pending:!0,data:N,method:c.method,action:f},null,N)}}else typeof f=="function"&&(b.preventDefault(),N=S?Jm(c,S):new FormData(c),fu(a,{pending:!0,data:N,method:c.method,action:f},f,N))},currentTarget:c}]})}}for(var af=0;af<Xd.length;af++){var rf=Xd[af],Gv=rf.toLowerCase(),Vv=rf[0].toUpperCase()+rf.slice(1);li(Gv,"on"+Vv)}li(Id,"onAnimationEnd"),li(Hd,"onAnimationIteration"),li(Gd,"onAnimationStart"),li("dblclick","onDoubleClick"),li("focusin","onFocus"),li("focusout","onBlur"),li(rv,"onTransitionRun"),li(sv,"onTransitionStart"),li(ov,"onTransitionCancel"),li(Vd,"onTransitionEnd"),Ot("onMouseEnter",["mouseout","mouseover"]),Ot("onMouseLeave",["mouseout","mouseover"]),Ot("onPointerEnter",["pointerout","pointerover"]),Ot("onPointerLeave",["pointerout","pointerover"]),bt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),bt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),bt("onBeforeInput",["compositionend","keypress","textInput","paste"]),bt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),bt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),bt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var uo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),kv=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(uo));function $m(e,n){n=(n&4)!==0;for(var a=0;a<e.length;a++){var s=e[a],c=s.event;s=s.listeners;t:{var f=void 0;if(n)for(var S=s.length-1;0<=S;S--){var b=s[S],N=b.instance,V=b.currentTarget;if(b=b.listener,N!==f&&c.isPropagationStopped())break t;f=b,c.currentTarget=V;try{f(c)}catch(lt){hl(lt)}c.currentTarget=null,f=N}else for(S=0;S<s.length;S++){if(b=s[S],N=b.instance,V=b.currentTarget,b=b.listener,N!==f&&c.isPropagationStopped())break t;f=b,c.currentTarget=V;try{f(c)}catch(lt){hl(lt)}c.currentTarget=null,f=N}}}}function xe(e,n){var a=n[vr];a===void 0&&(a=n[vr]=new Set);var s=e+"__bubble";a.has(s)||(tg(n,e,2,!1),a.add(s))}function sf(e,n,a){var s=0;n&&(s|=4),tg(a,e,s,n)}var Rl="_reactListening"+Math.random().toString(36).slice(2);function of(e){if(!e[Rl]){e[Rl]=!0,Y.forEach(function(a){a!=="selectionchange"&&(kv.has(a)||sf(a,!1,e),sf(a,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[Rl]||(n[Rl]=!0,sf("selectionchange",!1,n))}}function tg(e,n,a,s){switch(Eg(n)){case 2:var c=mx;break;case 8:c=gx;break;default:c=Sf}a=c.bind(null,n,a,e),c=void 0,!wc||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(c=!0),s?c!==void 0?e.addEventListener(n,a,{capture:!0,passive:c}):e.addEventListener(n,a,!0):c!==void 0?e.addEventListener(n,a,{passive:c}):e.addEventListener(n,a,!1)}function lf(e,n,a,s,c){var f=s;if(!(n&1)&&!(n&2)&&s!==null)t:for(;;){if(s===null)return;var S=s.tag;if(S===3||S===4){var b=s.stateNode.containerInfo;if(b===c||b.nodeType===8&&b.parentNode===c)break;if(S===4)for(S=s.return;S!==null;){var N=S.tag;if((N===3||N===4)&&(N=S.stateNode.containerInfo,N===c||N.nodeType===8&&N.parentNode===c))return;S=S.return}for(;b!==null;){if(S=Ui(b),S===null)return;if(N=S.tag,N===5||N===6||N===26||N===27){s=f=S;continue t}b=b.parentNode}}s=s.return}md(function(){var V=f,lt=Ac(a),_t=[];t:{var et=kd.get(e);if(et!==void 0){var ot=Xo,Xt=e;switch(e){case"keypress":if(Vo(a)===0)break t;case"keydown":case"keyup":ot=z0;break;case"focusin":Xt="focus",ot=Lc;break;case"focusout":Xt="blur",ot=Lc;break;case"beforeblur":case"afterblur":ot=Lc;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ot=vd;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ot=T0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ot=I0;break;case Id:case Hd:case Gd:ot=R0;break;case Vd:ot=G0;break;case"scroll":case"scrollend":ot=M0;break;case"wheel":ot=k0;break;case"copy":case"cut":case"paste":ot=C0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ot=Sd;break;case"toggle":case"beforetoggle":ot=W0}var ae=(n&4)!==0,qe=!ae&&(e==="scroll"||e==="scrollend"),Z=ae?et!==null?et+"Capture":null:et;ae=[];for(var G=V,J;G!==null;){var pt=G;if(J=pt.stateNode,pt=pt.tag,pt!==5&&pt!==26&&pt!==27||J===null||Z===null||(pt=Cs(G,Z),pt!=null&&ae.push(fo(G,pt,J))),qe)break;G=G.return}0<ae.length&&(et=new ot(et,Xt,null,a,lt),_t.push({event:et,listeners:ae}))}}if(!(n&7)){t:{if(et=e==="mouseover"||e==="pointerover",ot=e==="mouseout"||e==="pointerout",et&&a!==bc&&(Xt=a.relatedTarget||a.fromElement)&&(Ui(Xt)||Xt[Di]))break t;if((ot||et)&&(et=lt.window===lt?lt:(et=lt.ownerDocument)?et.defaultView||et.parentWindow:window,ot?(Xt=a.relatedTarget||a.toElement,ot=V,Xt=Xt?Ui(Xt):null,Xt!==null&&(qe=j(Xt),ae=Xt.tag,Xt!==qe||ae!==5&&ae!==27&&ae!==6)&&(Xt=null)):(ot=null,Xt=V),ot!==Xt)){if(ae=vd,pt="onMouseLeave",Z="onMouseEnter",G="mouse",(e==="pointerout"||e==="pointerover")&&(ae=Sd,pt="onPointerLeave",Z="onPointerEnter",G="pointer"),qe=ot==null?et:X(ot),J=Xt==null?et:X(Xt),et=new ae(pt,G+"leave",ot,a,lt),et.target=qe,et.relatedTarget=J,pt=null,Ui(lt)===V&&(ae=new ae(Z,G+"enter",Xt,a,lt),ae.target=J,ae.relatedTarget=qe,pt=ae),qe=pt,ot&&Xt)e:{for(ae=ot,Z=Xt,G=0,J=ae;J;J=Wr(J))G++;for(J=0,pt=Z;pt;pt=Wr(pt))J++;for(;0<G-J;)ae=Wr(ae),G--;for(;0<J-G;)Z=Wr(Z),J--;for(;G--;){if(ae===Z||Z!==null&&ae===Z.alternate)break e;ae=Wr(ae),Z=Wr(Z)}ae=null}else ae=null;ot!==null&&eg(_t,et,ot,ae,!1),Xt!==null&&qe!==null&&eg(_t,qe,Xt,ae,!0)}}t:{if(et=V?X(V):window,ot=et.nodeName&&et.nodeName.toLowerCase(),ot==="select"||ot==="input"&&et.type==="file")var Ht=wd;else if(Ad(et))if(Cd)Ht=ev;else{Ht=$0;var de=J0}else ot=et.nodeName,!ot||ot.toLowerCase()!=="input"||et.type!=="checkbox"&&et.type!=="radio"?V&&Tc(V.elementType)&&(Ht=wd):Ht=tv;if(Ht&&(Ht=Ht(e,V))){Rd(_t,Ht,a,lt);break t}de&&de(e,et,V),e==="focusout"&&V&&et.type==="number"&&V.memoizedProps.value!=null&&xn(et,"number",et.value)}switch(de=V?X(V):window,e){case"focusin":(Ad(de)||de.contentEditable==="true")&&(Er=de,Bc=V,Fs=null);break;case"focusout":Fs=Bc=Er=null;break;case"mousedown":Ic=!0;break;case"contextmenu":case"mouseup":case"dragend":Ic=!1,Fd(_t,a,lt);break;case"selectionchange":if(av)break;case"keydown":case"keyup":Fd(_t,a,lt)}var Yt;if(Oc)t:{switch(e){case"compositionstart":var Jt="onCompositionStart";break t;case"compositionend":Jt="onCompositionEnd";break t;case"compositionupdate":Jt="onCompositionUpdate";break t}Jt=void 0}else Mr?Td(e,a)&&(Jt="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(Jt="onCompositionStart");Jt&&(yd&&a.locale!=="ko"&&(Mr||Jt!=="onCompositionStart"?Jt==="onCompositionEnd"&&Mr&&(Yt=gd()):(aa=lt,Cc="value"in aa?aa.value:aa.textContent,Mr=!0)),de=wl(V,Jt),0<de.length&&(Jt=new xd(Jt,e,null,a,lt),_t.push({event:Jt,listeners:de}),Yt?Jt.data=Yt:(Yt=bd(a),Yt!==null&&(Jt.data=Yt)))),(Yt=Y0?j0(e,a):Z0(e,a))&&(Jt=wl(V,"onBeforeInput"),0<Jt.length&&(de=new xd("onBeforeInput","beforeinput",null,a,lt),_t.push({event:de,listeners:Jt}),de.data=Yt)),Hv(_t,e,V,a,lt)}$m(_t,n)})}function fo(e,n,a){return{instance:e,listener:n,currentTarget:a}}function wl(e,n){for(var a=n+"Capture",s=[];e!==null;){var c=e,f=c.stateNode;c=c.tag,c!==5&&c!==26&&c!==27||f===null||(c=Cs(e,a),c!=null&&s.unshift(fo(e,c,f)),c=Cs(e,n),c!=null&&s.push(fo(e,c,f))),e=e.return}return s}function Wr(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function eg(e,n,a,s,c){for(var f=n._reactName,S=[];a!==null&&a!==s;){var b=a,N=b.alternate,V=b.stateNode;if(b=b.tag,N!==null&&N===s)break;b!==5&&b!==26&&b!==27||V===null||(N=V,c?(V=Cs(a,f),V!=null&&S.unshift(fo(a,V,N))):c||(V=Cs(a,f),V!=null&&S.push(fo(a,V,N)))),a=a.return}S.length!==0&&e.push({event:n,listeners:S})}var Xv=/\r\n?/g,Wv=/\u0000|\uFFFD/g;function ng(e){return(typeof e=="string"?e:""+e).replace(Xv,`
`).replace(Wv,"")}function ig(e,n){return n=ng(n),ng(e)===n}function Cl(){}function Oe(e,n,a,s,c,f){switch(a){case"children":typeof s=="string"?n==="body"||n==="textarea"&&s===""||On(e,s):(typeof s=="number"||typeof s=="bigint")&&n!=="body"&&On(e,""+s);break;case"className":Ie(e,"class",s);break;case"tabIndex":Ie(e,"tabindex",s);break;case"dir":case"role":case"viewBox":case"width":case"height":Ie(e,a,s);break;case"style":dd(e,s,f);break;case"data":if(n!=="object"){Ie(e,"data",s);break}case"src":case"href":if(s===""&&(n!=="a"||a!=="href")){e.removeAttribute(a);break}if(s==null||typeof s=="function"||typeof s=="symbol"||typeof s=="boolean"){e.removeAttribute(a);break}s=Ho(""+s),e.setAttribute(a,s);break;case"action":case"formAction":if(typeof s=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof f=="function"&&(a==="formAction"?(n!=="input"&&Oe(e,n,"name",c.name,c,null),Oe(e,n,"formEncType",c.formEncType,c,null),Oe(e,n,"formMethod",c.formMethod,c,null),Oe(e,n,"formTarget",c.formTarget,c,null)):(Oe(e,n,"encType",c.encType,c,null),Oe(e,n,"method",c.method,c,null),Oe(e,n,"target",c.target,c,null)));if(s==null||typeof s=="symbol"||typeof s=="boolean"){e.removeAttribute(a);break}s=Ho(""+s),e.setAttribute(a,s);break;case"onClick":s!=null&&(e.onclick=Cl);break;case"onScroll":s!=null&&xe("scroll",e);break;case"onScrollEnd":s!=null&&xe("scrollend",e);break;case"dangerouslySetInnerHTML":if(s!=null){if(typeof s!="object"||!("__html"in s))throw Error(r(61));if(a=s.__html,a!=null){if(c.children!=null)throw Error(r(60));e.innerHTML=a}}break;case"multiple":e.multiple=s&&typeof s!="function"&&typeof s!="symbol";break;case"muted":e.muted=s&&typeof s!="function"&&typeof s!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(s==null||typeof s=="function"||typeof s=="boolean"||typeof s=="symbol"){e.removeAttribute("xlink:href");break}a=Ho(""+s),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":s!=null&&typeof s!="function"&&typeof s!="symbol"?e.setAttribute(a,""+s):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":s&&typeof s!="function"&&typeof s!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":s===!0?e.setAttribute(a,""):s!==!1&&s!=null&&typeof s!="function"&&typeof s!="symbol"?e.setAttribute(a,s):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":s!=null&&typeof s!="function"&&typeof s!="symbol"&&!isNaN(s)&&1<=s?e.setAttribute(a,s):e.removeAttribute(a);break;case"rowSpan":case"start":s==null||typeof s=="function"||typeof s=="symbol"||isNaN(s)?e.removeAttribute(a):e.setAttribute(a,s);break;case"popover":xe("beforetoggle",e),xe("toggle",e),_e(e,"popover",s);break;case"xlinkActuate":Te(e,"http://www.w3.org/1999/xlink","xlink:actuate",s);break;case"xlinkArcrole":Te(e,"http://www.w3.org/1999/xlink","xlink:arcrole",s);break;case"xlinkRole":Te(e,"http://www.w3.org/1999/xlink","xlink:role",s);break;case"xlinkShow":Te(e,"http://www.w3.org/1999/xlink","xlink:show",s);break;case"xlinkTitle":Te(e,"http://www.w3.org/1999/xlink","xlink:title",s);break;case"xlinkType":Te(e,"http://www.w3.org/1999/xlink","xlink:type",s);break;case"xmlBase":Te(e,"http://www.w3.org/XML/1998/namespace","xml:base",s);break;case"xmlLang":Te(e,"http://www.w3.org/XML/1998/namespace","xml:lang",s);break;case"xmlSpace":Te(e,"http://www.w3.org/XML/1998/namespace","xml:space",s);break;case"is":_e(e,"is",s);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=S0.get(a)||a,_e(e,a,s))}}function cf(e,n,a,s,c,f){switch(a){case"style":dd(e,s,f);break;case"dangerouslySetInnerHTML":if(s!=null){if(typeof s!="object"||!("__html"in s))throw Error(r(61));if(a=s.__html,a!=null){if(c.children!=null)throw Error(r(60));e.innerHTML=a}}break;case"children":typeof s=="string"?On(e,s):(typeof s=="number"||typeof s=="bigint")&&On(e,""+s);break;case"onScroll":s!=null&&xe("scroll",e);break;case"onScrollEnd":s!=null&&xe("scrollend",e);break;case"onClick":s!=null&&(e.onclick=Cl);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!yt.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(c=a.endsWith("Capture"),n=a.slice(2,c?a.length-7:void 0),f=e[nn]||null,f=f!=null?f[a]:null,typeof f=="function"&&e.removeEventListener(n,f,c),typeof s=="function")){typeof f!="function"&&f!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(n,s,c);break t}a in e?e[a]=s:s===!0?e.setAttribute(a,""):_e(e,a,s)}}}function vn(e,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":xe("error",e),xe("load",e);var s=!1,c=!1,f;for(f in a)if(a.hasOwnProperty(f)){var S=a[f];if(S!=null)switch(f){case"src":s=!0;break;case"srcSet":c=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(r(137,n));default:Oe(e,n,f,S,a,null)}}c&&Oe(e,n,"srcSet",a.srcSet,a,null),s&&Oe(e,n,"src",a.src,a,null);return;case"input":xe("invalid",e);var b=f=S=c=null,N=null,V=null;for(s in a)if(a.hasOwnProperty(s)){var lt=a[s];if(lt!=null)switch(s){case"name":c=lt;break;case"type":S=lt;break;case"checked":N=lt;break;case"defaultChecked":V=lt;break;case"value":f=lt;break;case"defaultValue":b=lt;break;case"children":case"dangerouslySetInnerHTML":if(lt!=null)throw Error(r(137,n));break;default:Oe(e,n,s,lt,a,null)}}Rn(e,f,b,N,V,S,c,!1),ve(e);return;case"select":xe("invalid",e),s=S=f=null;for(c in a)if(a.hasOwnProperty(c)&&(b=a[c],b!=null))switch(c){case"value":f=b;break;case"defaultValue":S=b;break;case"multiple":s=b;default:Oe(e,n,c,b,a,null)}n=f,a=S,e.multiple=!!s,n!=null?ke(e,!!s,n,!1):a!=null&&ke(e,!!s,a,!0);return;case"textarea":xe("invalid",e),f=c=s=null;for(S in a)if(a.hasOwnProperty(S)&&(b=a[S],b!=null))switch(S){case"value":s=b;break;case"defaultValue":c=b;break;case"children":f=b;break;case"dangerouslySetInnerHTML":if(b!=null)throw Error(r(91));break;default:Oe(e,n,S,b,a,null)}xr(e,s,c,f),ve(e);return;case"option":for(N in a)if(a.hasOwnProperty(N)&&(s=a[N],s!=null))switch(N){case"selected":e.selected=s&&typeof s!="function"&&typeof s!="symbol";break;default:Oe(e,n,N,s,a,null)}return;case"dialog":xe("cancel",e),xe("close",e);break;case"iframe":case"object":xe("load",e);break;case"video":case"audio":for(s=0;s<uo.length;s++)xe(uo[s],e);break;case"image":xe("error",e),xe("load",e);break;case"details":xe("toggle",e);break;case"embed":case"source":case"link":xe("error",e),xe("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(V in a)if(a.hasOwnProperty(V)&&(s=a[V],s!=null))switch(V){case"children":case"dangerouslySetInnerHTML":throw Error(r(137,n));default:Oe(e,n,V,s,a,null)}return;default:if(Tc(n)){for(lt in a)a.hasOwnProperty(lt)&&(s=a[lt],s!==void 0&&cf(e,n,lt,s,a,void 0));return}}for(b in a)a.hasOwnProperty(b)&&(s=a[b],s!=null&&Oe(e,n,b,s,a,null))}function qv(e,n,a,s){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var c=null,f=null,S=null,b=null,N=null,V=null,lt=null;for(ot in a){var _t=a[ot];if(a.hasOwnProperty(ot)&&_t!=null)switch(ot){case"checked":break;case"value":break;case"defaultValue":N=_t;default:s.hasOwnProperty(ot)||Oe(e,n,ot,null,s,_t)}}for(var et in s){var ot=s[et];if(_t=a[et],s.hasOwnProperty(et)&&(ot!=null||_t!=null))switch(et){case"type":f=ot;break;case"name":c=ot;break;case"checked":V=ot;break;case"defaultChecked":lt=ot;break;case"value":S=ot;break;case"defaultValue":b=ot;break;case"children":case"dangerouslySetInnerHTML":if(ot!=null)throw Error(r(137,n));break;default:ot!==_t&&Oe(e,n,et,ot,s,_t)}}Le(e,S,b,N,V,lt,f,c);return;case"select":ot=S=b=et=null;for(f in a)if(N=a[f],a.hasOwnProperty(f)&&N!=null)switch(f){case"value":break;case"multiple":ot=N;default:s.hasOwnProperty(f)||Oe(e,n,f,null,s,N)}for(c in s)if(f=s[c],N=a[c],s.hasOwnProperty(c)&&(f!=null||N!=null))switch(c){case"value":et=f;break;case"defaultValue":b=f;break;case"multiple":S=f;default:f!==N&&Oe(e,n,c,f,s,N)}n=b,a=S,s=ot,et!=null?ke(e,!!a,et,!1):!!s!=!!a&&(n!=null?ke(e,!!a,n,!0):ke(e,!!a,a?[]:"",!1));return;case"textarea":ot=et=null;for(b in a)if(c=a[b],a.hasOwnProperty(b)&&c!=null&&!s.hasOwnProperty(b))switch(b){case"value":break;case"children":break;default:Oe(e,n,b,null,s,c)}for(S in s)if(c=s[S],f=a[S],s.hasOwnProperty(S)&&(c!=null||f!=null))switch(S){case"value":et=c;break;case"defaultValue":ot=c;break;case"children":break;case"dangerouslySetInnerHTML":if(c!=null)throw Error(r(91));break;default:c!==f&&Oe(e,n,S,c,s,f)}mn(e,et,ot);return;case"option":for(var Xt in a)if(et=a[Xt],a.hasOwnProperty(Xt)&&et!=null&&!s.hasOwnProperty(Xt))switch(Xt){case"selected":e.selected=!1;break;default:Oe(e,n,Xt,null,s,et)}for(N in s)if(et=s[N],ot=a[N],s.hasOwnProperty(N)&&et!==ot&&(et!=null||ot!=null))switch(N){case"selected":e.selected=et&&typeof et!="function"&&typeof et!="symbol";break;default:Oe(e,n,N,et,s,ot)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var ae in a)et=a[ae],a.hasOwnProperty(ae)&&et!=null&&!s.hasOwnProperty(ae)&&Oe(e,n,ae,null,s,et);for(V in s)if(et=s[V],ot=a[V],s.hasOwnProperty(V)&&et!==ot&&(et!=null||ot!=null))switch(V){case"children":case"dangerouslySetInnerHTML":if(et!=null)throw Error(r(137,n));break;default:Oe(e,n,V,et,s,ot)}return;default:if(Tc(n)){for(var qe in a)et=a[qe],a.hasOwnProperty(qe)&&et!==void 0&&!s.hasOwnProperty(qe)&&cf(e,n,qe,void 0,s,et);for(lt in s)et=s[lt],ot=a[lt],!s.hasOwnProperty(lt)||et===ot||et===void 0&&ot===void 0||cf(e,n,lt,et,s,ot);return}}for(var Z in a)et=a[Z],a.hasOwnProperty(Z)&&et!=null&&!s.hasOwnProperty(Z)&&Oe(e,n,Z,null,s,et);for(_t in s)et=s[_t],ot=a[_t],!s.hasOwnProperty(_t)||et===ot||et==null&&ot==null||Oe(e,n,_t,et,s,ot)}var uf=null,ff=null;function Dl(e){return e.nodeType===9?e:e.ownerDocument}function ag(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function rg(e,n){if(e===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&n==="foreignObject"?0:e}function hf(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var df=null;function Yv(){var e=window.event;return e&&e.type==="popstate"?e===df?!1:(df=e,!0):(df=null,!1)}var sg=typeof setTimeout=="function"?setTimeout:void 0,jv=typeof clearTimeout=="function"?clearTimeout:void 0,og=typeof Promise=="function"?Promise:void 0,Zv=typeof queueMicrotask=="function"?queueMicrotask:typeof og<"u"?function(e){return og.resolve(null).then(e).catch(Kv)}:sg;function Kv(e){setTimeout(function(){throw e})}function pf(e,n){var a=n,s=0;do{var c=a.nextSibling;if(e.removeChild(a),c&&c.nodeType===8)if(a=c.data,a==="/$"){if(s===0){e.removeChild(c),So(n);return}s--}else a!=="$"&&a!=="$?"&&a!=="$!"||s++;a=c}while(a);So(n)}function mf(e){var n=e.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":mf(a),ws(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function Qv(e,n,a,s){for(;e.nodeType===1;){var c=a;if(e.nodeName.toLowerCase()!==n.toLowerCase()){if(!s&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(s){if(!e[za])switch(n){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(f=e.getAttribute("rel"),f==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(f!==c.rel||e.getAttribute("href")!==(c.href==null?null:c.href)||e.getAttribute("crossorigin")!==(c.crossOrigin==null?null:c.crossOrigin)||e.getAttribute("title")!==(c.title==null?null:c.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(f=e.getAttribute("src"),(f!==(c.src==null?null:c.src)||e.getAttribute("type")!==(c.type==null?null:c.type)||e.getAttribute("crossorigin")!==(c.crossOrigin==null?null:c.crossOrigin))&&f&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(n==="input"&&e.type==="hidden"){var f=c.name==null?null:""+c.name;if(c.type==="hidden"&&e.getAttribute("name")===f)return e}else return e;if(e=fi(e.nextSibling),e===null)break}return null}function Jv(e,n,a){if(n==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=fi(e.nextSibling),e===null))return null;return e}function fi(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?"||n==="F!"||n==="F")break;if(n==="/$")return null}}return e}function lg(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"){if(n===0)return e;n--}else a==="/$"&&n++}e=e.previousSibling}return null}function cg(e,n,a){switch(n=Dl(a),e){case"html":if(e=n.documentElement,!e)throw Error(r(452));return e;case"head":if(e=n.head,!e)throw Error(r(453));return e;case"body":if(e=n.body,!e)throw Error(r(454));return e;default:throw Error(r(451))}}var ai=new Map,ug=new Set;function Ul(e){return typeof e.getRootNode=="function"?e.getRootNode():e.ownerDocument}var qi=q.d;q.d={f:$v,r:tx,D:ex,C:nx,L:ix,m:ax,X:sx,S:rx,M:ox};function $v(){var e=qi.f(),n=El();return e||n}function tx(e){var n=A(e);n!==null&&n.tag===5&&n.type==="form"?Fp(n):qi.r(e)}var qr=typeof document>"u"?null:document;function fg(e,n,a){var s=qr;if(s&&typeof n=="string"&&n){var c=cn(n);c='link[rel="'+e+'"][href="'+c+'"]',typeof a=="string"&&(c+='[crossorigin="'+a+'"]'),ug.has(c)||(ug.add(c),e={rel:e,crossOrigin:a,href:n},s.querySelector(c)===null&&(n=s.createElement("link"),vn(n,"link",e),Q(n),s.head.appendChild(n)))}}function ex(e){qi.D(e),fg("dns-prefetch",e,null)}function nx(e,n){qi.C(e,n),fg("preconnect",e,n)}function ix(e,n,a){qi.L(e,n,a);var s=qr;if(s&&e&&n){var c='link[rel="preload"][as="'+cn(n)+'"]';n==="image"&&a&&a.imageSrcSet?(c+='[imagesrcset="'+cn(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(c+='[imagesizes="'+cn(a.imageSizes)+'"]')):c+='[href="'+cn(e)+'"]';var f=c;switch(n){case"style":f=Yr(e);break;case"script":f=jr(e)}ai.has(f)||(e=R({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:e,as:n},a),ai.set(f,e),s.querySelector(c)!==null||n==="style"&&s.querySelector(ho(f))||n==="script"&&s.querySelector(po(f))||(n=s.createElement("link"),vn(n,"link",e),Q(n),s.head.appendChild(n)))}}function ax(e,n){qi.m(e,n);var a=qr;if(a&&e){var s=n&&typeof n.as=="string"?n.as:"script",c='link[rel="modulepreload"][as="'+cn(s)+'"][href="'+cn(e)+'"]',f=c;switch(s){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":f=jr(e)}if(!ai.has(f)&&(e=R({rel:"modulepreload",href:e},n),ai.set(f,e),a.querySelector(c)===null)){switch(s){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(po(f)))return}s=a.createElement("link"),vn(s,"link",e),Q(s),a.head.appendChild(s)}}}function rx(e,n,a){qi.S(e,n,a);var s=qr;if(s&&e){var c=$(s).hoistableStyles,f=Yr(e);n=n||"default";var S=c.get(f);if(!S){var b={loading:0,preload:null};if(S=s.querySelector(ho(f)))b.loading=5;else{e=R({rel:"stylesheet",href:e,"data-precedence":n},a),(a=ai.get(f))&&gf(e,a);var N=S=s.createElement("link");Q(N),vn(N,"link",e),N._p=new Promise(function(V,lt){N.onload=V,N.onerror=lt}),N.addEventListener("load",function(){b.loading|=1}),N.addEventListener("error",function(){b.loading|=2}),b.loading|=4,Ll(S,n,s)}S={type:"stylesheet",instance:S,count:1,state:b},c.set(f,S)}}}function sx(e,n){qi.X(e,n);var a=qr;if(a&&e){var s=$(a).hoistableScripts,c=jr(e),f=s.get(c);f||(f=a.querySelector(po(c)),f||(e=R({src:e,async:!0},n),(n=ai.get(c))&&_f(e,n),f=a.createElement("script"),Q(f),vn(f,"link",e),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},s.set(c,f))}}function ox(e,n){qi.M(e,n);var a=qr;if(a&&e){var s=$(a).hoistableScripts,c=jr(e),f=s.get(c);f||(f=a.querySelector(po(c)),f||(e=R({src:e,async:!0,type:"module"},n),(n=ai.get(c))&&_f(e,n),f=a.createElement("script"),Q(f),vn(f,"link",e),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},s.set(c,f))}}function hg(e,n,a,s){var c=(c=we.current)?Ul(c):null;if(!c)throw Error(r(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(n=Yr(a.href),a=$(c).hoistableStyles,s=a.get(n),s||(s={type:"style",instance:null,count:0,state:null},a.set(n,s)),s):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=Yr(a.href);var f=$(c).hoistableStyles,S=f.get(e);if(S||(c=c.ownerDocument||c,S={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},f.set(e,S),(f=c.querySelector(ho(e)))&&!f._p&&(S.instance=f,S.state.loading=5),ai.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},ai.set(e,a),f||lx(c,e,a,S.state))),n&&s===null)throw Error(r(528,""));return S}if(n&&s!==null)throw Error(r(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=jr(a),a=$(c).hoistableScripts,s=a.get(n),s||(s={type:"script",instance:null,count:0,state:null},a.set(n,s)),s):{type:"void",instance:null,count:0,state:null};default:throw Error(r(444,e))}}function Yr(e){return'href="'+cn(e)+'"'}function ho(e){return'link[rel="stylesheet"]['+e+"]"}function dg(e){return R({},e,{"data-precedence":e.precedence,precedence:null})}function lx(e,n,a,s){e.querySelector('link[rel="preload"][as="style"]['+n+"]")?s.loading=1:(n=e.createElement("link"),s.preload=n,n.addEventListener("load",function(){return s.loading|=1}),n.addEventListener("error",function(){return s.loading|=2}),vn(n,"link",a),Q(n),e.head.appendChild(n))}function jr(e){return'[src="'+cn(e)+'"]'}function po(e){return"script[async]"+e}function pg(e,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var s=e.querySelector('style[data-href~="'+cn(a.href)+'"]');if(s)return n.instance=s,Q(s),s;var c=R({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return s=(e.ownerDocument||e).createElement("style"),Q(s),vn(s,"style",c),Ll(s,a.precedence,e),n.instance=s;case"stylesheet":c=Yr(a.href);var f=e.querySelector(ho(c));if(f)return n.state.loading|=4,n.instance=f,Q(f),f;s=dg(a),(c=ai.get(c))&&gf(s,c),f=(e.ownerDocument||e).createElement("link"),Q(f);var S=f;return S._p=new Promise(function(b,N){S.onload=b,S.onerror=N}),vn(f,"link",s),n.state.loading|=4,Ll(f,a.precedence,e),n.instance=f;case"script":return f=jr(a.src),(c=e.querySelector(po(f)))?(n.instance=c,Q(c),c):(s=a,(c=ai.get(f))&&(s=R({},a),_f(s,c)),e=e.ownerDocument||e,c=e.createElement("script"),Q(c),vn(c,"link",s),e.head.appendChild(c),n.instance=c);case"void":return null;default:throw Error(r(443,n.type))}else n.type==="stylesheet"&&!(n.state.loading&4)&&(s=n.instance,n.state.loading|=4,Ll(s,a.precedence,e));return n.instance}function Ll(e,n,a){for(var s=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),c=s.length?s[s.length-1]:null,f=c,S=0;S<s.length;S++){var b=s[S];if(b.dataset.precedence===n)f=b;else if(f!==c)break}f?f.parentNode.insertBefore(e,f.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(e,n.firstChild))}function gf(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.title==null&&(e.title=n.title)}function _f(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.integrity==null&&(e.integrity=n.integrity)}var Nl=null;function mg(e,n,a){if(Nl===null){var s=new Map,c=Nl=new Map;c.set(a,s)}else c=Nl,s=c.get(a),s||(s=new Map,c.set(a,s));if(s.has(e))return s;for(s.set(e,null),a=a.getElementsByTagName(e),c=0;c<a.length;c++){var f=a[c];if(!(f[za]||f[en]||e==="link"&&f.getAttribute("rel")==="stylesheet")&&f.namespaceURI!=="http://www.w3.org/2000/svg"){var S=f.getAttribute(n)||"";S=e+S;var b=s.get(S);b?b.push(f):s.set(S,[f])}}return s}function gg(e,n,a){e=e.ownerDocument||e,e.head.insertBefore(a,n==="title"?e.querySelector("head > title"):null)}function cx(e,n,a){if(a===1||n.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;switch(n.rel){case"stylesheet":return e=n.disabled,typeof n.precedence=="string"&&e==null;default:return!0}case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function _g(e){return!(e.type==="stylesheet"&&!(e.state.loading&3))}var mo=null;function ux(){}function fx(e,n,a){if(mo===null)throw Error(r(475));var s=mo;if(n.type==="stylesheet"&&(typeof a.media!="string"||matchMedia(a.media).matches!==!1)&&!(n.state.loading&4)){if(n.instance===null){var c=Yr(a.href),f=e.querySelector(ho(c));if(f){e=f._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(s.count++,s=Ol.bind(s),e.then(s,s)),n.state.loading|=4,n.instance=f,Q(f);return}f=e.ownerDocument||e,a=dg(a),(c=ai.get(c))&&gf(a,c),f=f.createElement("link"),Q(f);var S=f;S._p=new Promise(function(b,N){S.onload=b,S.onerror=N}),vn(f,"link",a),n.instance=f}s.stylesheets===null&&(s.stylesheets=new Map),s.stylesheets.set(n,e),(e=n.state.preload)&&!(n.state.loading&3)&&(s.count++,n=Ol.bind(s),e.addEventListener("load",n),e.addEventListener("error",n))}}function hx(){if(mo===null)throw Error(r(475));var e=mo;return e.stylesheets&&e.count===0&&vf(e,e.stylesheets),0<e.count?function(n){var a=setTimeout(function(){if(e.stylesheets&&vf(e,e.stylesheets),e.unsuspend){var s=e.unsuspend;e.unsuspend=null,s()}},6e4);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(a)}}:null}function Ol(){if(this.count--,this.count===0){if(this.stylesheets)vf(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Pl=null;function vf(e,n){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Pl=new Map,n.forEach(dx,e),Pl=null,Ol.call(e))}function dx(e,n){if(!(n.state.loading&4)){var a=Pl.get(e);if(a)var s=a.get(null);else{a=new Map,Pl.set(e,a);for(var c=e.querySelectorAll("link[data-precedence],style[data-precedence]"),f=0;f<c.length;f++){var S=c[f];(S.nodeName==="LINK"||S.getAttribute("media")!=="not all")&&(a.set(S.dataset.precedence,S),s=S)}s&&a.set(null,s)}c=n.instance,S=c.getAttribute("data-precedence"),f=a.get(S)||s,f===s&&a.set(null,c),a.set(S,c),this.count++,s=Ol.bind(this),c.addEventListener("load",s),c.addEventListener("error",s),f?f.parentNode.insertBefore(c,f.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(c,e.firstChild)),n.state.loading|=4}}var go={$$typeof:M,Provider:null,Consumer:null,_currentValue:dt,_currentValue2:dt,_threadCount:0};function px(e,n,a,s,c,f,S,b){this.tag=1,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Tn(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.finishedLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Tn(0),this.hiddenUpdates=Tn(null),this.identifierPrefix=s,this.onUncaughtError=c,this.onCaughtError=f,this.onRecoverableError=S,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=b,this.incompleteTransitions=new Map}function vg(e,n,a,s,c,f,S,b,N,V,lt,_t){return e=new px(e,n,a,S,b,N,V,_t),n=1,f===!0&&(n|=24),f=ni(3,null,null,n),e.current=f,f.stateNode=e,n=Zc(),n.refCount++,e.pooledCache=n,n.refCount++,f.memoizedState={element:s,isDehydrated:a,cache:n},Cu(f),e}function xg(e){return e?(e=Ar,e):Ar}function Sg(e,n,a,s,c,f){c=xg(c),s.context===null?s.context=c:s.pendingContext=c,s=ha(n),s.payload={element:a},f=f===void 0?null:f,f!==null&&(s.callback=f),a=da(e,s,n),a!==null&&(Cn(a,e,n),Js(a,e,n))}function yg(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<n?a:n}}function xf(e,n){yg(e,n),(e=e.alternate)&&yg(e,n)}function Mg(e){if(e.tag===13){var n=ra(e,67108864);n!==null&&Cn(n,e,67108864),xf(e,67108864)}}var zl=!0;function mx(e,n,a,s){var c=w.T;w.T=null;var f=q.p;try{q.p=2,Sf(e,n,a,s)}finally{q.p=f,w.T=c}}function gx(e,n,a,s){var c=w.T;w.T=null;var f=q.p;try{q.p=8,Sf(e,n,a,s)}finally{q.p=f,w.T=c}}function Sf(e,n,a,s){if(zl){var c=yf(s);if(c===null)lf(e,n,s,Fl,a),Tg(e,s);else if(vx(c,e,n,a,s))s.stopPropagation();else if(Tg(e,s),n&4&&-1<_x.indexOf(e)){for(;c!==null;){var f=A(c);if(f!==null)switch(f.tag){case 3:if(f=f.stateNode,f.current.memoizedState.isDehydrated){var S=wt(f.pendingLanes);if(S!==0){var b=f;for(b.pendingLanes|=2,b.entangledLanes|=2;S;){var N=1<<31-Kt(S);b.entanglements[1]|=N,S&=~N}Ti(f),!(Ve&6)&&(Sl=ut()+500,co(0))}}break;case 13:b=ra(f,2),b!==null&&Cn(b,f,2),El(),xf(f,2)}if(f=yf(s),f===null&&lf(e,n,s,Fl,a),f===c)break;c=f}c!==null&&s.stopPropagation()}else lf(e,n,s,null,a)}}function yf(e){return e=Ac(e),Mf(e)}var Fl=null;function Mf(e){if(Fl=null,e=Ui(e),e!==null){var n=j(e);if(n===null)e=null;else{var a=n.tag;if(a===13){if(e=St(n),e!==null)return e;e=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null)}}return Fl=e,null}function Eg(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(vt()){case ft:return 2;case Vt:return 8;case Ct:case zt:return 32;case me:return 268435456;default:return 32}default:return 32}}var Ef=!1,Sa=null,ya=null,Ma=null,_o=new Map,vo=new Map,Ea=[],_x="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Tg(e,n){switch(e){case"focusin":case"focusout":Sa=null;break;case"dragenter":case"dragleave":ya=null;break;case"mouseover":case"mouseout":Ma=null;break;case"pointerover":case"pointerout":_o.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":vo.delete(n.pointerId)}}function xo(e,n,a,s,c,f){return e===null||e.nativeEvent!==f?(e={blockedOn:n,domEventName:a,eventSystemFlags:s,nativeEvent:f,targetContainers:[c]},n!==null&&(n=A(n),n!==null&&Mg(n)),e):(e.eventSystemFlags|=s,n=e.targetContainers,c!==null&&n.indexOf(c)===-1&&n.push(c),e)}function vx(e,n,a,s,c){switch(n){case"focusin":return Sa=xo(Sa,e,n,a,s,c),!0;case"dragenter":return ya=xo(ya,e,n,a,s,c),!0;case"mouseover":return Ma=xo(Ma,e,n,a,s,c),!0;case"pointerover":var f=c.pointerId;return _o.set(f,xo(_o.get(f)||null,e,n,a,s,c)),!0;case"gotpointercapture":return f=c.pointerId,vo.set(f,xo(vo.get(f)||null,e,n,a,s,c)),!0}return!1}function bg(e){var n=Ui(e.target);if(n!==null){var a=j(n);if(a!==null){if(n=a.tag,n===13){if(n=St(a),n!==null){e.blockedOn=n,Bo(e.priority,function(){if(a.tag===13){var s=Xn(),c=ra(a,s);c!==null&&Cn(c,a,s),xf(a,s)}});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Bl(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var a=yf(e.nativeEvent);if(a===null){a=e.nativeEvent;var s=new a.constructor(a.type,a);bc=s,a.target.dispatchEvent(s),bc=null}else return n=A(a),n!==null&&Mg(n),e.blockedOn=a,!1;n.shift()}return!0}function Ag(e,n,a){Bl(e)&&a.delete(n)}function xx(){Ef=!1,Sa!==null&&Bl(Sa)&&(Sa=null),ya!==null&&Bl(ya)&&(ya=null),Ma!==null&&Bl(Ma)&&(Ma=null),_o.forEach(Ag),vo.forEach(Ag)}function Il(e,n){e.blockedOn===n&&(e.blockedOn=null,Ef||(Ef=!0,o.unstable_scheduleCallback(o.unstable_NormalPriority,xx)))}var Hl=null;function Rg(e){Hl!==e&&(Hl=e,o.unstable_scheduleCallback(o.unstable_NormalPriority,function(){Hl===e&&(Hl=null);for(var n=0;n<e.length;n+=3){var a=e[n],s=e[n+1],c=e[n+2];if(typeof s!="function"){if(Mf(s||a)===null)continue;break}var f=A(a);f!==null&&(e.splice(n,3),n-=3,fu(f,{pending:!0,data:c,method:a.method,action:s},s,c))}}))}function So(e){function n(N){return Il(N,e)}Sa!==null&&Il(Sa,e),ya!==null&&Il(ya,e),Ma!==null&&Il(Ma,e),_o.forEach(n),vo.forEach(n);for(var a=0;a<Ea.length;a++){var s=Ea[a];s.blockedOn===e&&(s.blockedOn=null)}for(;0<Ea.length&&(a=Ea[0],a.blockedOn===null);)bg(a),a.blockedOn===null&&Ea.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(s=0;s<a.length;s+=3){var c=a[s],f=a[s+1],S=c[nn]||null;if(typeof f=="function")S||Rg(a);else if(S){var b=null;if(f&&f.hasAttribute("formAction")){if(c=f,S=f[nn]||null)b=S.formAction;else if(Mf(c)!==null)continue}else b=S.action;typeof b=="function"?a[s+1]=b:(a.splice(s,3),s-=3),Rg(a)}}}function Tf(e){this._internalRoot=e}Gl.prototype.render=Tf.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(r(409));var a=n.current,s=Xn();Sg(a,s,e,n,null,null)},Gl.prototype.unmount=Tf.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;e.tag===0&&kr(),Sg(e.current,2,null,e,null,null),El(),n[Di]=null}};function Gl(e){this._internalRoot=e}Gl.prototype.unstable_scheduleHydration=function(e){if(e){var n=Rs();e={blockedOn:null,target:e,priority:n};for(var a=0;a<Ea.length&&n!==0&&n<Ea[a].priority;a++);Ea.splice(a,0,e),a===0&&bg(e)}};var wg=t.version;if(wg!=="19.0.0")throw Error(r(527,wg,"19.0.0"));q.findDOMNode=function(e){var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(r(188)):(e=Object.keys(e).join(","),Error(r(268,e)));return e=nt(n),e=e!==null?Et(e):null,e=e===null?null:e.stateNode,e};var Sx={bundleType:0,version:"19.0.0",rendererPackageName:"react-dom",currentDispatcherRef:w,findFiberByHostInstance:Ui,reconcilerVersion:"19.0.0"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Vl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Vl.isDisabled&&Vl.supportsFiber)try{jt=Vl.inject(Sx),kt=Vl}catch{}}return Mo.createRoot=function(e,n){if(!l(e))throw Error(r(299));var a=!1,s="",c=Wp,f=qp,S=Yp,b=null;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onUncaughtError!==void 0&&(c=n.onUncaughtError),n.onCaughtError!==void 0&&(f=n.onCaughtError),n.onRecoverableError!==void 0&&(S=n.onRecoverableError),n.unstable_transitionCallbacks!==void 0&&(b=n.unstable_transitionCallbacks)),n=vg(e,1,!1,null,null,a,s,c,f,S,b,null),e[Di]=n.current,of(e.nodeType===8?e.parentNode:e),new Tf(n)},Mo.hydrateRoot=function(e,n,a){if(!l(e))throw Error(r(299));var s=!1,c="",f=Wp,S=qp,b=Yp,N=null,V=null;return a!=null&&(a.unstable_strictMode===!0&&(s=!0),a.identifierPrefix!==void 0&&(c=a.identifierPrefix),a.onUncaughtError!==void 0&&(f=a.onUncaughtError),a.onCaughtError!==void 0&&(S=a.onCaughtError),a.onRecoverableError!==void 0&&(b=a.onRecoverableError),a.unstable_transitionCallbacks!==void 0&&(N=a.unstable_transitionCallbacks),a.formState!==void 0&&(V=a.formState)),n=vg(e,1,!0,n,a??null,s,c,f,S,b,N,V),n.context=xg(null),a=n.current,s=Xn(),c=ha(s),c.callback=null,da(a,c,s),n.current.lanes=s,bn(n,s),Ti(n),e[Di]=n.current,of(e),new Gl(n)},Mo.version="19.0.0",Mo}var Bg;function Ux(){if(Bg)return Rf.exports;Bg=1;function o(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)}catch(t){console.error(t)}}return o(),Rf.exports=Dx(),Rf.exports}var Lx=Ux();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const $h="172",Nx=0,Ig=1,Ox=2,B_=1,Px=2,Ji=3,Oa=0,Un=1,$i=2,La=0,hs=1,uh=2,Hg=3,Gg=4,zx=5,ur=100,Fx=101,Bx=102,Ix=103,Hx=104,Gx=200,Vx=201,kx=202,Xx=203,fh=204,hh=205,Wx=206,qx=207,Yx=208,jx=209,Zx=210,Kx=211,Qx=212,Jx=213,$x=214,dh=0,ph=1,mh=2,gs=3,gh=4,_h=5,vh=6,xh=7,td=0,tS=1,eS=2,Na=0,nS=1,iS=2,aS=3,rS=4,sS=5,oS=6,lS=7,I_=300,_s=301,vs=302,Sh=303,yh=304,Sc=306,Mh=1e3,dr=1001,Eh=1002,_i=1003,cS=1004,kl=1005,Ai=1006,Uf=1007,pr=1008,ia=1009,H_=1010,G_=1011,Co=1012,ed=1013,mr=1014,ta=1015,Uo=1016,nd=1017,id=1018,xs=1020,V_=35902,k_=1021,X_=1022,gi=1023,W_=1024,q_=1025,ds=1026,Ss=1027,Y_=1028,ad=1029,j_=1030,rd=1031,sd=1033,fc=33776,hc=33777,dc=33778,pc=33779,Th=35840,bh=35841,Ah=35842,Rh=35843,wh=36196,Ch=37492,Dh=37496,Uh=37808,Lh=37809,Nh=37810,Oh=37811,Ph=37812,zh=37813,Fh=37814,Bh=37815,Ih=37816,Hh=37817,Gh=37818,Vh=37819,kh=37820,Xh=37821,mc=36492,Wh=36494,qh=36495,Z_=36283,Yh=36284,jh=36285,Zh=36286,uS=3200,fS=3201,K_=0,hS=1,Ua="",si="srgb",ys="srgb-linear",_c="linear",Pe="srgb",Zr=7680,Vg=519,dS=512,pS=513,mS=514,Q_=515,gS=516,_S=517,vS=518,xS=519,kg=35044,Xg="300 es",ea=2e3,vc=2001;class Es{addEventListener(t,i){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[t]===void 0&&(r[t]=[]),r[t].indexOf(i)===-1&&r[t].push(i)}hasEventListener(t,i){if(this._listeners===void 0)return!1;const r=this._listeners;return r[t]!==void 0&&r[t].indexOf(i)!==-1}removeEventListener(t,i){if(this._listeners===void 0)return;const l=this._listeners[t];if(l!==void 0){const u=l.indexOf(i);u!==-1&&l.splice(u,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const r=this._listeners[t.type];if(r!==void 0){t.target=this;const l=r.slice(0);for(let u=0,h=l.length;u<h;u++)l[u].call(this,t);t.target=null}}}const Mn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Lf=Math.PI/180,Kh=180/Math.PI;function Lo(){const o=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Mn[o&255]+Mn[o>>8&255]+Mn[o>>16&255]+Mn[o>>24&255]+"-"+Mn[t&255]+Mn[t>>8&255]+"-"+Mn[t>>16&15|64]+Mn[t>>24&255]+"-"+Mn[i&63|128]+Mn[i>>8&255]+"-"+Mn[i>>16&255]+Mn[i>>24&255]+Mn[r&255]+Mn[r>>8&255]+Mn[r>>16&255]+Mn[r>>24&255]).toLowerCase()}function Se(o,t,i){return Math.max(t,Math.min(i,o))}function SS(o,t){return(o%t+t)%t}function Nf(o,t,i){return(1-i)*o+i*t}function Eo(o,t){switch(t.constructor){case Float32Array:return o;case Uint32Array:return o/4294967295;case Uint16Array:return o/65535;case Uint8Array:return o/255;case Int32Array:return Math.max(o/2147483647,-1);case Int16Array:return Math.max(o/32767,-1);case Int8Array:return Math.max(o/127,-1);default:throw new Error("Invalid component type.")}}function Fn(o,t){switch(t.constructor){case Float32Array:return o;case Uint32Array:return Math.round(o*4294967295);case Uint16Array:return Math.round(o*65535);case Uint8Array:return Math.round(o*255);case Int32Array:return Math.round(o*2147483647);case Int16Array:return Math.round(o*32767);case Int8Array:return Math.round(o*127);default:throw new Error("Invalid component type.")}}class Ce{constructor(t=0,i=0){Ce.prototype.isVector2=!0,this.x=t,this.y=i}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,i){return this.x=t,this.y=i,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const i=this.x,r=this.y,l=t.elements;return this.x=l[0]*i+l[3]*r+l[6],this.y=l[1]*i+l[4]*r+l[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,i){return this.x=Se(this.x,t.x,i.x),this.y=Se(this.y,t.y,i.y),this}clampScalar(t,i){return this.x=Se(this.x,t,i),this.y=Se(this.y,t,i),this}clampLength(t,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Se(r,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const r=this.dot(t)/i;return Math.acos(Se(r,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,r=this.y-t.y;return i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this}lerpVectors(t,i,r){return this.x=t.x+(i.x-t.x)*r,this.y=t.y+(i.y-t.y)*r,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this}rotateAround(t,i){const r=Math.cos(i),l=Math.sin(i),u=this.x-t.x,h=this.y-t.y;return this.x=u*r-h*l+t.x,this.y=u*l+h*r+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class le{constructor(t,i,r,l,u,h,d,m,p){le.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,i,r,l,u,h,d,m,p)}set(t,i,r,l,u,h,d,m,p){const g=this.elements;return g[0]=t,g[1]=l,g[2]=d,g[3]=i,g[4]=u,g[5]=m,g[6]=r,g[7]=h,g[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const i=this.elements,r=t.elements;return i[0]=r[0],i[1]=r[1],i[2]=r[2],i[3]=r[3],i[4]=r[4],i[5]=r[5],i[6]=r[6],i[7]=r[7],i[8]=r[8],this}extractBasis(t,i,r){return t.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const i=t.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const r=t.elements,l=i.elements,u=this.elements,h=r[0],d=r[3],m=r[6],p=r[1],g=r[4],v=r[7],x=r[2],M=r[5],T=r[8],C=l[0],y=l[3],_=l[6],P=l[1],O=l[4],D=l[7],H=l[2],F=l[5],z=l[8];return u[0]=h*C+d*P+m*H,u[3]=h*y+d*O+m*F,u[6]=h*_+d*D+m*z,u[1]=p*C+g*P+v*H,u[4]=p*y+g*O+v*F,u[7]=p*_+g*D+v*z,u[2]=x*C+M*P+T*H,u[5]=x*y+M*O+T*F,u[8]=x*_+M*D+T*z,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[3]*=t,i[6]*=t,i[1]*=t,i[4]*=t,i[7]*=t,i[2]*=t,i[5]*=t,i[8]*=t,this}determinant(){const t=this.elements,i=t[0],r=t[1],l=t[2],u=t[3],h=t[4],d=t[5],m=t[6],p=t[7],g=t[8];return i*h*g-i*d*p-r*u*g+r*d*m+l*u*p-l*h*m}invert(){const t=this.elements,i=t[0],r=t[1],l=t[2],u=t[3],h=t[4],d=t[5],m=t[6],p=t[7],g=t[8],v=g*h-d*p,x=d*m-g*u,M=p*u-h*m,T=i*v+r*x+l*M;if(T===0)return this.set(0,0,0,0,0,0,0,0,0);const C=1/T;return t[0]=v*C,t[1]=(l*p-g*r)*C,t[2]=(d*r-l*h)*C,t[3]=x*C,t[4]=(g*i-l*m)*C,t[5]=(l*u-d*i)*C,t[6]=M*C,t[7]=(r*m-p*i)*C,t[8]=(h*i-r*u)*C,this}transpose(){let t;const i=this.elements;return t=i[1],i[1]=i[3],i[3]=t,t=i[2],i[2]=i[6],i[6]=t,t=i[5],i[5]=i[7],i[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const i=this.elements;return t[0]=i[0],t[1]=i[3],t[2]=i[6],t[3]=i[1],t[4]=i[4],t[5]=i[7],t[6]=i[2],t[7]=i[5],t[8]=i[8],this}setUvTransform(t,i,r,l,u,h,d){const m=Math.cos(u),p=Math.sin(u);return this.set(r*m,r*p,-r*(m*h+p*d)+h+t,-l*p,l*m,-l*(-p*h+m*d)+d+i,0,0,1),this}scale(t,i){return this.premultiply(Of.makeScale(t,i)),this}rotate(t){return this.premultiply(Of.makeRotation(-t)),this}translate(t,i){return this.premultiply(Of.makeTranslation(t,i)),this}makeTranslation(t,i){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,i,0,0,1),this}makeRotation(t){const i=Math.cos(t),r=Math.sin(t);return this.set(i,-r,0,r,i,0,0,0,1),this}makeScale(t,i){return this.set(t,0,0,0,i,0,0,0,1),this}equals(t){const i=this.elements,r=t.elements;for(let l=0;l<9;l++)if(i[l]!==r[l])return!1;return!0}fromArray(t,i=0){for(let r=0;r<9;r++)this.elements[r]=t[r+i];return this}toArray(t=[],i=0){const r=this.elements;return t[i]=r[0],t[i+1]=r[1],t[i+2]=r[2],t[i+3]=r[3],t[i+4]=r[4],t[i+5]=r[5],t[i+6]=r[6],t[i+7]=r[7],t[i+8]=r[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Of=new le;function J_(o){for(let t=o.length-1;t>=0;--t)if(o[t]>=65535)return!0;return!1}function Do(o){return document.createElementNS("http://www.w3.org/1999/xhtml",o)}function yS(){const o=Do("canvas");return o.style.display="block",o}const Wg={};function cs(o){o in Wg||(Wg[o]=!0,console.warn(o))}function MS(o,t,i){return new Promise(function(r,l){function u(){switch(o.clientWaitSync(t,o.SYNC_FLUSH_COMMANDS_BIT,0)){case o.WAIT_FAILED:l();break;case o.TIMEOUT_EXPIRED:setTimeout(u,i);break;default:r()}}setTimeout(u,i)})}function ES(o){const t=o.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function TS(o){const t=o.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const qg=new le().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Yg=new le().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function bS(){const o={enabled:!0,workingColorSpace:ys,spaces:{},convert:function(l,u,h){return this.enabled===!1||u===h||!u||!h||(this.spaces[u].transfer===Pe&&(l.r=na(l.r),l.g=na(l.g),l.b=na(l.b)),this.spaces[u].primaries!==this.spaces[h].primaries&&(l.applyMatrix3(this.spaces[u].toXYZ),l.applyMatrix3(this.spaces[h].fromXYZ)),this.spaces[h].transfer===Pe&&(l.r=ps(l.r),l.g=ps(l.g),l.b=ps(l.b))),l},fromWorkingColorSpace:function(l,u){return this.convert(l,this.workingColorSpace,u)},toWorkingColorSpace:function(l,u){return this.convert(l,u,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===Ua?_c:this.spaces[l].transfer},getLuminanceCoefficients:function(l,u=this.workingColorSpace){return l.fromArray(this.spaces[u].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,u,h){return l.copy(this.spaces[u].toXYZ).multiply(this.spaces[h].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],r=[.3127,.329];return o.define({[ys]:{primaries:t,whitePoint:r,transfer:_c,toXYZ:qg,fromXYZ:Yg,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:si},outputColorSpaceConfig:{drawingBufferColorSpace:si}},[si]:{primaries:t,whitePoint:r,transfer:Pe,toXYZ:qg,fromXYZ:Yg,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:si}}}),o}const Re=bS();function na(o){return o<.04045?o*.0773993808:Math.pow(o*.9478672986+.0521327014,2.4)}function ps(o){return o<.0031308?o*12.92:1.055*Math.pow(o,.41666)-.055}let Kr;class AS{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Kr===void 0&&(Kr=Do("canvas")),Kr.width=t.width,Kr.height=t.height;const r=Kr.getContext("2d");t instanceof ImageData?r.putImageData(t,0,0):r.drawImage(t,0,0,t.width,t.height),i=Kr}return i.width>2048||i.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),i.toDataURL("image/jpeg",.6)):i.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const i=Do("canvas");i.width=t.width,i.height=t.height;const r=i.getContext("2d");r.drawImage(t,0,0,t.width,t.height);const l=r.getImageData(0,0,t.width,t.height),u=l.data;for(let h=0;h<u.length;h++)u[h]=na(u[h]/255)*255;return r.putImageData(l,0,0),i}else if(t.data){const i=t.data.slice(0);for(let r=0;r<i.length;r++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[r]=Math.floor(na(i[r]/255)*255):i[r]=na(i[r]);return{data:i,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let RS=0;class $_{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:RS++}),this.uuid=Lo(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const r={uuid:this.uuid,url:""},l=this.data;if(l!==null){let u;if(Array.isArray(l)){u=[];for(let h=0,d=l.length;h<d;h++)l[h].isDataTexture?u.push(Pf(l[h].image)):u.push(Pf(l[h]))}else u=Pf(l);r.url=u}return i||(t.images[this.uuid]=r),r}}function Pf(o){return typeof HTMLImageElement<"u"&&o instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&o instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&o instanceof ImageBitmap?AS.getDataURL(o):o.data?{data:Array.from(o.data),width:o.width,height:o.height,type:o.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let wS=0;class Ln extends Es{constructor(t=Ln.DEFAULT_IMAGE,i=Ln.DEFAULT_MAPPING,r=dr,l=dr,u=Ai,h=pr,d=gi,m=ia,p=Ln.DEFAULT_ANISOTROPY,g=Ua){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:wS++}),this.uuid=Lo(),this.name="",this.source=new $_(t),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=r,this.wrapT=l,this.magFilter=u,this.minFilter=h,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=m,this.offset=new Ce(0,0),this.repeat=new Ce(1,1),this.center=new Ce(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new le,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=g,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const r={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),i||(t.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==I_)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Mh:t.x=t.x-Math.floor(t.x);break;case dr:t.x=t.x<0?0:1;break;case Eh:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Mh:t.y=t.y-Math.floor(t.y);break;case dr:t.y=t.y<0?0:1;break;case Eh:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ln.DEFAULT_IMAGE=null;Ln.DEFAULT_MAPPING=I_;Ln.DEFAULT_ANISOTROPY=1;class je{constructor(t=0,i=0,r=0,l=1){je.prototype.isVector4=!0,this.x=t,this.y=i,this.z=r,this.w=l}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,i,r,l){return this.x=t,this.y=i,this.z=r,this.w=l,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this.w=t.w+i.w,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this.w+=t.w*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this.w=t.w-i.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const i=this.x,r=this.y,l=this.z,u=this.w,h=t.elements;return this.x=h[0]*i+h[4]*r+h[8]*l+h[12]*u,this.y=h[1]*i+h[5]*r+h[9]*l+h[13]*u,this.z=h[2]*i+h[6]*r+h[10]*l+h[14]*u,this.w=h[3]*i+h[7]*r+h[11]*l+h[15]*u,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const i=Math.sqrt(1-t.w*t.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/i,this.y=t.y/i,this.z=t.z/i),this}setAxisAngleFromRotationMatrix(t){let i,r,l,u;const m=t.elements,p=m[0],g=m[4],v=m[8],x=m[1],M=m[5],T=m[9],C=m[2],y=m[6],_=m[10];if(Math.abs(g-x)<.01&&Math.abs(v-C)<.01&&Math.abs(T-y)<.01){if(Math.abs(g+x)<.1&&Math.abs(v+C)<.1&&Math.abs(T+y)<.1&&Math.abs(p+M+_-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const O=(p+1)/2,D=(M+1)/2,H=(_+1)/2,F=(g+x)/4,z=(v+C)/4,K=(T+y)/4;return O>D&&O>H?O<.01?(r=0,l=.707106781,u=.707106781):(r=Math.sqrt(O),l=F/r,u=z/r):D>H?D<.01?(r=.707106781,l=0,u=.707106781):(l=Math.sqrt(D),r=F/l,u=K/l):H<.01?(r=.707106781,l=.707106781,u=0):(u=Math.sqrt(H),r=z/u,l=K/u),this.set(r,l,u,i),this}let P=Math.sqrt((y-T)*(y-T)+(v-C)*(v-C)+(x-g)*(x-g));return Math.abs(P)<.001&&(P=1),this.x=(y-T)/P,this.y=(v-C)/P,this.z=(x-g)/P,this.w=Math.acos((p+M+_-1)/2),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,i){return this.x=Se(this.x,t.x,i.x),this.y=Se(this.y,t.y,i.y),this.z=Se(this.z,t.z,i.z),this.w=Se(this.w,t.w,i.w),this}clampScalar(t,i){return this.x=Se(this.x,t,i),this.y=Se(this.y,t,i),this.z=Se(this.z,t,i),this.w=Se(this.w,t,i),this}clampLength(t,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Se(r,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this.w+=(t.w-this.w)*i,this}lerpVectors(t,i,r){return this.x=t.x+(i.x-t.x)*r,this.y=t.y+(i.y-t.y)*r,this.z=t.z+(i.z-t.z)*r,this.w=t.w+(i.w-t.w)*r,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this.w=t[i+3],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t[i+3]=this.w,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this.w=t.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class CS extends Es{constructor(t=1,i=1,r={}){super(),this.isRenderTarget=!0,this.width=t,this.height=i,this.depth=1,this.scissor=new je(0,0,t,i),this.scissorTest=!1,this.viewport=new je(0,0,t,i);const l={width:t,height:i,depth:1};r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ai,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},r);const u=new Ln(l,r.mapping,r.wrapS,r.wrapT,r.magFilter,r.minFilter,r.format,r.type,r.anisotropy,r.colorSpace);u.flipY=!1,u.generateMipmaps=r.generateMipmaps,u.internalFormat=r.internalFormat,this.textures=[];const h=r.count;for(let d=0;d<h;d++)this.textures[d]=u.clone(),this.textures[d].isRenderTargetTexture=!0,this.textures[d].renderTarget=this;this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=r.depthTexture,this.samples=r.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,i,r=1){if(this.width!==t||this.height!==i||this.depth!==r){this.width=t,this.height=i,this.depth=r;for(let l=0,u=this.textures.length;l<u;l++)this.textures[l].image.width=t,this.textures[l].image.height=i,this.textures[l].image.depth=r;this.dispose()}this.viewport.set(0,0,t,i),this.scissor.set(0,0,t,i)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let r=0,l=t.textures.length;r<l;r++)this.textures[r]=t.textures[r].clone(),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;const i=Object.assign({},t.texture.image);return this.texture.source=new $_(i),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class gr extends CS{constructor(t=1,i=1,r={}){super(t,i,r),this.isWebGLRenderTarget=!0}}class t0 extends Ln{constructor(t=null,i=1,r=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:i,height:r,depth:l},this.magFilter=_i,this.minFilter=_i,this.wrapR=dr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class DS extends Ln{constructor(t=null,i=1,r=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:i,height:r,depth:l},this.magFilter=_i,this.minFilter=_i,this.wrapR=dr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class No{constructor(t=0,i=0,r=0,l=1){this.isQuaternion=!0,this._x=t,this._y=i,this._z=r,this._w=l}static slerpFlat(t,i,r,l,u,h,d){let m=r[l+0],p=r[l+1],g=r[l+2],v=r[l+3];const x=u[h+0],M=u[h+1],T=u[h+2],C=u[h+3];if(d===0){t[i+0]=m,t[i+1]=p,t[i+2]=g,t[i+3]=v;return}if(d===1){t[i+0]=x,t[i+1]=M,t[i+2]=T,t[i+3]=C;return}if(v!==C||m!==x||p!==M||g!==T){let y=1-d;const _=m*x+p*M+g*T+v*C,P=_>=0?1:-1,O=1-_*_;if(O>Number.EPSILON){const H=Math.sqrt(O),F=Math.atan2(H,_*P);y=Math.sin(y*F)/H,d=Math.sin(d*F)/H}const D=d*P;if(m=m*y+x*D,p=p*y+M*D,g=g*y+T*D,v=v*y+C*D,y===1-d){const H=1/Math.sqrt(m*m+p*p+g*g+v*v);m*=H,p*=H,g*=H,v*=H}}t[i]=m,t[i+1]=p,t[i+2]=g,t[i+3]=v}static multiplyQuaternionsFlat(t,i,r,l,u,h){const d=r[l],m=r[l+1],p=r[l+2],g=r[l+3],v=u[h],x=u[h+1],M=u[h+2],T=u[h+3];return t[i]=d*T+g*v+m*M-p*x,t[i+1]=m*T+g*x+p*v-d*M,t[i+2]=p*T+g*M+d*x-m*v,t[i+3]=g*T-d*v-m*x-p*M,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,i,r,l){return this._x=t,this._y=i,this._z=r,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,i=!0){const r=t._x,l=t._y,u=t._z,h=t._order,d=Math.cos,m=Math.sin,p=d(r/2),g=d(l/2),v=d(u/2),x=m(r/2),M=m(l/2),T=m(u/2);switch(h){case"XYZ":this._x=x*g*v+p*M*T,this._y=p*M*v-x*g*T,this._z=p*g*T+x*M*v,this._w=p*g*v-x*M*T;break;case"YXZ":this._x=x*g*v+p*M*T,this._y=p*M*v-x*g*T,this._z=p*g*T-x*M*v,this._w=p*g*v+x*M*T;break;case"ZXY":this._x=x*g*v-p*M*T,this._y=p*M*v+x*g*T,this._z=p*g*T+x*M*v,this._w=p*g*v-x*M*T;break;case"ZYX":this._x=x*g*v-p*M*T,this._y=p*M*v+x*g*T,this._z=p*g*T-x*M*v,this._w=p*g*v+x*M*T;break;case"YZX":this._x=x*g*v+p*M*T,this._y=p*M*v+x*g*T,this._z=p*g*T-x*M*v,this._w=p*g*v-x*M*T;break;case"XZY":this._x=x*g*v-p*M*T,this._y=p*M*v-x*g*T,this._z=p*g*T+x*M*v,this._w=p*g*v+x*M*T;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+h)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,i){const r=i/2,l=Math.sin(r);return this._x=t.x*l,this._y=t.y*l,this._z=t.z*l,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(t){const i=t.elements,r=i[0],l=i[4],u=i[8],h=i[1],d=i[5],m=i[9],p=i[2],g=i[6],v=i[10],x=r+d+v;if(x>0){const M=.5/Math.sqrt(x+1);this._w=.25/M,this._x=(g-m)*M,this._y=(u-p)*M,this._z=(h-l)*M}else if(r>d&&r>v){const M=2*Math.sqrt(1+r-d-v);this._w=(g-m)/M,this._x=.25*M,this._y=(l+h)/M,this._z=(u+p)/M}else if(d>v){const M=2*Math.sqrt(1+d-r-v);this._w=(u-p)/M,this._x=(l+h)/M,this._y=.25*M,this._z=(m+g)/M}else{const M=2*Math.sqrt(1+v-r-d);this._w=(h-l)/M,this._x=(u+p)/M,this._y=(m+g)/M,this._z=.25*M}return this._onChangeCallback(),this}setFromUnitVectors(t,i){let r=t.dot(i)+1;return r<Number.EPSILON?(r=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=r):(this._x=0,this._y=-t.z,this._z=t.y,this._w=r)):(this._x=t.y*i.z-t.z*i.y,this._y=t.z*i.x-t.x*i.z,this._z=t.x*i.y-t.y*i.x,this._w=r),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Se(this.dot(t),-1,1)))}rotateTowards(t,i){const r=this.angleTo(t);if(r===0)return this;const l=Math.min(1,i/r);return this.slerp(t,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,i){const r=t._x,l=t._y,u=t._z,h=t._w,d=i._x,m=i._y,p=i._z,g=i._w;return this._x=r*g+h*d+l*p-u*m,this._y=l*g+h*m+u*d-r*p,this._z=u*g+h*p+r*m-l*d,this._w=h*g-r*d-l*m-u*p,this._onChangeCallback(),this}slerp(t,i){if(i===0)return this;if(i===1)return this.copy(t);const r=this._x,l=this._y,u=this._z,h=this._w;let d=h*t._w+r*t._x+l*t._y+u*t._z;if(d<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,d=-d):this.copy(t),d>=1)return this._w=h,this._x=r,this._y=l,this._z=u,this;const m=1-d*d;if(m<=Number.EPSILON){const M=1-i;return this._w=M*h+i*this._w,this._x=M*r+i*this._x,this._y=M*l+i*this._y,this._z=M*u+i*this._z,this.normalize(),this}const p=Math.sqrt(m),g=Math.atan2(p,d),v=Math.sin((1-i)*g)/p,x=Math.sin(i*g)/p;return this._w=h*v+this._w*x,this._x=r*v+this._x*x,this._y=l*v+this._y*x,this._z=u*v+this._z*x,this._onChangeCallback(),this}slerpQuaternions(t,i,r){return this.copy(t).slerp(i,r)}random(){const t=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),r=Math.random(),l=Math.sqrt(1-r),u=Math.sqrt(r);return this.set(l*Math.sin(t),l*Math.cos(t),u*Math.sin(i),u*Math.cos(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,i=0){return this._x=t[i],this._y=t[i+1],this._z=t[i+2],this._w=t[i+3],this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._w,t}fromBufferAttribute(t,i){return this._x=t.getX(i),this._y=t.getY(i),this._z=t.getZ(i),this._w=t.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class rt{constructor(t=0,i=0,r=0){rt.prototype.isVector3=!0,this.x=t,this.y=i,this.z=r}set(t,i,r){return r===void 0&&(r=this.z),this.x=t,this.y=i,this.z=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,i){return this.x=t.x*i.x,this.y=t.y*i.y,this.z=t.z*i.z,this}applyEuler(t){return this.applyQuaternion(jg.setFromEuler(t))}applyAxisAngle(t,i){return this.applyQuaternion(jg.setFromAxisAngle(t,i))}applyMatrix3(t){const i=this.x,r=this.y,l=this.z,u=t.elements;return this.x=u[0]*i+u[3]*r+u[6]*l,this.y=u[1]*i+u[4]*r+u[7]*l,this.z=u[2]*i+u[5]*r+u[8]*l,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const i=this.x,r=this.y,l=this.z,u=t.elements,h=1/(u[3]*i+u[7]*r+u[11]*l+u[15]);return this.x=(u[0]*i+u[4]*r+u[8]*l+u[12])*h,this.y=(u[1]*i+u[5]*r+u[9]*l+u[13])*h,this.z=(u[2]*i+u[6]*r+u[10]*l+u[14])*h,this}applyQuaternion(t){const i=this.x,r=this.y,l=this.z,u=t.x,h=t.y,d=t.z,m=t.w,p=2*(h*l-d*r),g=2*(d*i-u*l),v=2*(u*r-h*i);return this.x=i+m*p+h*v-d*g,this.y=r+m*g+d*p-u*v,this.z=l+m*v+u*g-h*p,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const i=this.x,r=this.y,l=this.z,u=t.elements;return this.x=u[0]*i+u[4]*r+u[8]*l,this.y=u[1]*i+u[5]*r+u[9]*l,this.z=u[2]*i+u[6]*r+u[10]*l,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,i){return this.x=Se(this.x,t.x,i.x),this.y=Se(this.y,t.y,i.y),this.z=Se(this.z,t.z,i.z),this}clampScalar(t,i){return this.x=Se(this.x,t,i),this.y=Se(this.y,t,i),this.z=Se(this.z,t,i),this}clampLength(t,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Se(r,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this}lerpVectors(t,i,r){return this.x=t.x+(i.x-t.x)*r,this.y=t.y+(i.y-t.y)*r,this.z=t.z+(i.z-t.z)*r,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,i){const r=t.x,l=t.y,u=t.z,h=i.x,d=i.y,m=i.z;return this.x=l*m-u*d,this.y=u*h-r*m,this.z=r*d-l*h,this}projectOnVector(t){const i=t.lengthSq();if(i===0)return this.set(0,0,0);const r=t.dot(this)/i;return this.copy(t).multiplyScalar(r)}projectOnPlane(t){return zf.copy(this).projectOnVector(t),this.sub(zf)}reflect(t){return this.sub(zf.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const r=this.dot(t)/i;return Math.acos(Se(r,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,r=this.y-t.y,l=this.z-t.z;return i*i+r*r+l*l}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,i,r){const l=Math.sin(i)*t;return this.x=l*Math.sin(r),this.y=Math.cos(i)*t,this.z=l*Math.cos(r),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,i,r){return this.x=t*Math.sin(i),this.y=r,this.z=t*Math.cos(i),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(t){const i=this.setFromMatrixColumn(t,0).length(),r=this.setFromMatrixColumn(t,1).length(),l=this.setFromMatrixColumn(t,2).length();return this.x=i,this.y=r,this.z=l,this}setFromMatrixColumn(t,i){return this.fromArray(t.elements,i*4)}setFromMatrix3Column(t,i){return this.fromArray(t.elements,i*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,i=Math.random()*2-1,r=Math.sqrt(1-i*i);return this.x=r*Math.cos(t),this.y=i,this.z=r*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const zf=new rt,jg=new No;class Oo{constructor(t=new rt(1/0,1/0,1/0),i=new rt(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=i}set(t,i){return this.min.copy(t),this.max.copy(i),this}setFromArray(t){this.makeEmpty();for(let i=0,r=t.length;i<r;i+=3)this.expandByPoint(hi.fromArray(t,i));return this}setFromBufferAttribute(t){this.makeEmpty();for(let i=0,r=t.count;i<r;i++)this.expandByPoint(hi.fromBufferAttribute(t,i));return this}setFromPoints(t){this.makeEmpty();for(let i=0,r=t.length;i<r;i++)this.expandByPoint(t[i]);return this}setFromCenterAndSize(t,i){const r=hi.copy(i).multiplyScalar(.5);return this.min.copy(t).sub(r),this.max.copy(t).add(r),this}setFromObject(t,i=!1){return this.makeEmpty(),this.expandByObject(t,i)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,i=!1){t.updateWorldMatrix(!1,!1);const r=t.geometry;if(r!==void 0){const u=r.getAttribute("position");if(i===!0&&u!==void 0&&t.isInstancedMesh!==!0)for(let h=0,d=u.count;h<d;h++)t.isMesh===!0?t.getVertexPosition(h,hi):hi.fromBufferAttribute(u,h),hi.applyMatrix4(t.matrixWorld),this.expandByPoint(hi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Xl.copy(t.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),Xl.copy(r.boundingBox)),Xl.applyMatrix4(t.matrixWorld),this.union(Xl)}const l=t.children;for(let u=0,h=l.length;u<h;u++)this.expandByObject(l[u],i);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,i){return i.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,hi),hi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let i,r;return t.normal.x>0?(i=t.normal.x*this.min.x,r=t.normal.x*this.max.x):(i=t.normal.x*this.max.x,r=t.normal.x*this.min.x),t.normal.y>0?(i+=t.normal.y*this.min.y,r+=t.normal.y*this.max.y):(i+=t.normal.y*this.max.y,r+=t.normal.y*this.min.y),t.normal.z>0?(i+=t.normal.z*this.min.z,r+=t.normal.z*this.max.z):(i+=t.normal.z*this.max.z,r+=t.normal.z*this.min.z),i<=-t.constant&&r>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(To),Wl.subVectors(this.max,To),Qr.subVectors(t.a,To),Jr.subVectors(t.b,To),$r.subVectors(t.c,To),ba.subVectors(Jr,Qr),Aa.subVectors($r,Jr),nr.subVectors(Qr,$r);let i=[0,-ba.z,ba.y,0,-Aa.z,Aa.y,0,-nr.z,nr.y,ba.z,0,-ba.x,Aa.z,0,-Aa.x,nr.z,0,-nr.x,-ba.y,ba.x,0,-Aa.y,Aa.x,0,-nr.y,nr.x,0];return!Ff(i,Qr,Jr,$r,Wl)||(i=[1,0,0,0,1,0,0,0,1],!Ff(i,Qr,Jr,$r,Wl))?!1:(ql.crossVectors(ba,Aa),i=[ql.x,ql.y,ql.z],Ff(i,Qr,Jr,$r,Wl))}clampPoint(t,i){return i.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,hi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(hi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Yi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Yi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Yi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Yi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Yi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Yi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Yi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Yi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Yi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Yi=[new rt,new rt,new rt,new rt,new rt,new rt,new rt,new rt],hi=new rt,Xl=new Oo,Qr=new rt,Jr=new rt,$r=new rt,ba=new rt,Aa=new rt,nr=new rt,To=new rt,Wl=new rt,ql=new rt,ir=new rt;function Ff(o,t,i,r,l){for(let u=0,h=o.length-3;u<=h;u+=3){ir.fromArray(o,u);const d=l.x*Math.abs(ir.x)+l.y*Math.abs(ir.y)+l.z*Math.abs(ir.z),m=t.dot(ir),p=i.dot(ir),g=r.dot(ir);if(Math.max(-Math.max(m,p,g),Math.min(m,p,g))>d)return!1}return!0}const US=new Oo,bo=new rt,Bf=new rt;class od{constructor(t=new rt,i=-1){this.isSphere=!0,this.center=t,this.radius=i}set(t,i){return this.center.copy(t),this.radius=i,this}setFromPoints(t,i){const r=this.center;i!==void 0?r.copy(i):US.setFromPoints(t).getCenter(r);let l=0;for(let u=0,h=t.length;u<h;u++)l=Math.max(l,r.distanceToSquared(t[u]));return this.radius=Math.sqrt(l),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const i=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=i*i}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,i){const r=this.center.distanceToSquared(t);return i.copy(t),r>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;bo.subVectors(t,this.center);const i=bo.lengthSq();if(i>this.radius*this.radius){const r=Math.sqrt(i),l=(r-this.radius)*.5;this.center.addScaledVector(bo,l/r),this.radius+=l}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Bf.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(bo.copy(t.center).add(Bf)),this.expandByPoint(bo.copy(t.center).sub(Bf))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ji=new rt,If=new rt,Yl=new rt,Ra=new rt,Hf=new rt,jl=new rt,Gf=new rt;class LS{constructor(t=new rt,i=new rt(0,0,-1)){this.origin=t,this.direction=i}set(t,i){return this.origin.copy(t),this.direction.copy(i),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,i){return i.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ji)),this}closestPointToPoint(t,i){i.subVectors(t,this.origin);const r=i.dot(this.direction);return r<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const i=ji.subVectors(t,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(t):(ji.copy(this.origin).addScaledVector(this.direction,i),ji.distanceToSquared(t))}distanceSqToSegment(t,i,r,l){If.copy(t).add(i).multiplyScalar(.5),Yl.copy(i).sub(t).normalize(),Ra.copy(this.origin).sub(If);const u=t.distanceTo(i)*.5,h=-this.direction.dot(Yl),d=Ra.dot(this.direction),m=-Ra.dot(Yl),p=Ra.lengthSq(),g=Math.abs(1-h*h);let v,x,M,T;if(g>0)if(v=h*m-d,x=h*d-m,T=u*g,v>=0)if(x>=-T)if(x<=T){const C=1/g;v*=C,x*=C,M=v*(v+h*x+2*d)+x*(h*v+x+2*m)+p}else x=u,v=Math.max(0,-(h*x+d)),M=-v*v+x*(x+2*m)+p;else x=-u,v=Math.max(0,-(h*x+d)),M=-v*v+x*(x+2*m)+p;else x<=-T?(v=Math.max(0,-(-h*u+d)),x=v>0?-u:Math.min(Math.max(-u,-m),u),M=-v*v+x*(x+2*m)+p):x<=T?(v=0,x=Math.min(Math.max(-u,-m),u),M=x*(x+2*m)+p):(v=Math.max(0,-(h*u+d)),x=v>0?u:Math.min(Math.max(-u,-m),u),M=-v*v+x*(x+2*m)+p);else x=h>0?-u:u,v=Math.max(0,-(h*x+d)),M=-v*v+x*(x+2*m)+p;return r&&r.copy(this.origin).addScaledVector(this.direction,v),l&&l.copy(If).addScaledVector(Yl,x),M}intersectSphere(t,i){ji.subVectors(t.center,this.origin);const r=ji.dot(this.direction),l=ji.dot(ji)-r*r,u=t.radius*t.radius;if(l>u)return null;const h=Math.sqrt(u-l),d=r-h,m=r+h;return m<0?null:d<0?this.at(m,i):this.at(d,i)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const i=t.normal.dot(this.direction);if(i===0)return t.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(t.normal)+t.constant)/i;return r>=0?r:null}intersectPlane(t,i){const r=this.distanceToPlane(t);return r===null?null:this.at(r,i)}intersectsPlane(t){const i=t.distanceToPoint(this.origin);return i===0||t.normal.dot(this.direction)*i<0}intersectBox(t,i){let r,l,u,h,d,m;const p=1/this.direction.x,g=1/this.direction.y,v=1/this.direction.z,x=this.origin;return p>=0?(r=(t.min.x-x.x)*p,l=(t.max.x-x.x)*p):(r=(t.max.x-x.x)*p,l=(t.min.x-x.x)*p),g>=0?(u=(t.min.y-x.y)*g,h=(t.max.y-x.y)*g):(u=(t.max.y-x.y)*g,h=(t.min.y-x.y)*g),r>h||u>l||((u>r||isNaN(r))&&(r=u),(h<l||isNaN(l))&&(l=h),v>=0?(d=(t.min.z-x.z)*v,m=(t.max.z-x.z)*v):(d=(t.max.z-x.z)*v,m=(t.min.z-x.z)*v),r>m||d>l)||((d>r||r!==r)&&(r=d),(m<l||l!==l)&&(l=m),l<0)?null:this.at(r>=0?r:l,i)}intersectsBox(t){return this.intersectBox(t,ji)!==null}intersectTriangle(t,i,r,l,u){Hf.subVectors(i,t),jl.subVectors(r,t),Gf.crossVectors(Hf,jl);let h=this.direction.dot(Gf),d;if(h>0){if(l)return null;d=1}else if(h<0)d=-1,h=-h;else return null;Ra.subVectors(this.origin,t);const m=d*this.direction.dot(jl.crossVectors(Ra,jl));if(m<0)return null;const p=d*this.direction.dot(Hf.cross(Ra));if(p<0||m+p>h)return null;const g=-d*Ra.dot(Gf);return g<0?null:this.at(g/h,u)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class $e{constructor(t,i,r,l,u,h,d,m,p,g,v,x,M,T,C,y){$e.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,i,r,l,u,h,d,m,p,g,v,x,M,T,C,y)}set(t,i,r,l,u,h,d,m,p,g,v,x,M,T,C,y){const _=this.elements;return _[0]=t,_[4]=i,_[8]=r,_[12]=l,_[1]=u,_[5]=h,_[9]=d,_[13]=m,_[2]=p,_[6]=g,_[10]=v,_[14]=x,_[3]=M,_[7]=T,_[11]=C,_[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new $e().fromArray(this.elements)}copy(t){const i=this.elements,r=t.elements;return i[0]=r[0],i[1]=r[1],i[2]=r[2],i[3]=r[3],i[4]=r[4],i[5]=r[5],i[6]=r[6],i[7]=r[7],i[8]=r[8],i[9]=r[9],i[10]=r[10],i[11]=r[11],i[12]=r[12],i[13]=r[13],i[14]=r[14],i[15]=r[15],this}copyPosition(t){const i=this.elements,r=t.elements;return i[12]=r[12],i[13]=r[13],i[14]=r[14],this}setFromMatrix3(t){const i=t.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(t,i,r){return t.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this}makeBasis(t,i,r){return this.set(t.x,i.x,r.x,0,t.y,i.y,r.y,0,t.z,i.z,r.z,0,0,0,0,1),this}extractRotation(t){const i=this.elements,r=t.elements,l=1/ts.setFromMatrixColumn(t,0).length(),u=1/ts.setFromMatrixColumn(t,1).length(),h=1/ts.setFromMatrixColumn(t,2).length();return i[0]=r[0]*l,i[1]=r[1]*l,i[2]=r[2]*l,i[3]=0,i[4]=r[4]*u,i[5]=r[5]*u,i[6]=r[6]*u,i[7]=0,i[8]=r[8]*h,i[9]=r[9]*h,i[10]=r[10]*h,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(t){const i=this.elements,r=t.x,l=t.y,u=t.z,h=Math.cos(r),d=Math.sin(r),m=Math.cos(l),p=Math.sin(l),g=Math.cos(u),v=Math.sin(u);if(t.order==="XYZ"){const x=h*g,M=h*v,T=d*g,C=d*v;i[0]=m*g,i[4]=-m*v,i[8]=p,i[1]=M+T*p,i[5]=x-C*p,i[9]=-d*m,i[2]=C-x*p,i[6]=T+M*p,i[10]=h*m}else if(t.order==="YXZ"){const x=m*g,M=m*v,T=p*g,C=p*v;i[0]=x+C*d,i[4]=T*d-M,i[8]=h*p,i[1]=h*v,i[5]=h*g,i[9]=-d,i[2]=M*d-T,i[6]=C+x*d,i[10]=h*m}else if(t.order==="ZXY"){const x=m*g,M=m*v,T=p*g,C=p*v;i[0]=x-C*d,i[4]=-h*v,i[8]=T+M*d,i[1]=M+T*d,i[5]=h*g,i[9]=C-x*d,i[2]=-h*p,i[6]=d,i[10]=h*m}else if(t.order==="ZYX"){const x=h*g,M=h*v,T=d*g,C=d*v;i[0]=m*g,i[4]=T*p-M,i[8]=x*p+C,i[1]=m*v,i[5]=C*p+x,i[9]=M*p-T,i[2]=-p,i[6]=d*m,i[10]=h*m}else if(t.order==="YZX"){const x=h*m,M=h*p,T=d*m,C=d*p;i[0]=m*g,i[4]=C-x*v,i[8]=T*v+M,i[1]=v,i[5]=h*g,i[9]=-d*g,i[2]=-p*g,i[6]=M*v+T,i[10]=x-C*v}else if(t.order==="XZY"){const x=h*m,M=h*p,T=d*m,C=d*p;i[0]=m*g,i[4]=-v,i[8]=p*g,i[1]=x*v+C,i[5]=h*g,i[9]=M*v-T,i[2]=T*v-M,i[6]=d*g,i[10]=C*v+x}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(t){return this.compose(NS,t,OS)}lookAt(t,i,r){const l=this.elements;return Wn.subVectors(t,i),Wn.lengthSq()===0&&(Wn.z=1),Wn.normalize(),wa.crossVectors(r,Wn),wa.lengthSq()===0&&(Math.abs(r.z)===1?Wn.x+=1e-4:Wn.z+=1e-4,Wn.normalize(),wa.crossVectors(r,Wn)),wa.normalize(),Zl.crossVectors(Wn,wa),l[0]=wa.x,l[4]=Zl.x,l[8]=Wn.x,l[1]=wa.y,l[5]=Zl.y,l[9]=Wn.y,l[2]=wa.z,l[6]=Zl.z,l[10]=Wn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const r=t.elements,l=i.elements,u=this.elements,h=r[0],d=r[4],m=r[8],p=r[12],g=r[1],v=r[5],x=r[9],M=r[13],T=r[2],C=r[6],y=r[10],_=r[14],P=r[3],O=r[7],D=r[11],H=r[15],F=l[0],z=l[4],K=l[8],w=l[12],R=l[1],I=l[5],ct=l[9],it=l[13],mt=l[2],ht=l[6],W=l[10],at=l[14],j=l[3],St=l[7],L=l[11],nt=l[15];return u[0]=h*F+d*R+m*mt+p*j,u[4]=h*z+d*I+m*ht+p*St,u[8]=h*K+d*ct+m*W+p*L,u[12]=h*w+d*it+m*at+p*nt,u[1]=g*F+v*R+x*mt+M*j,u[5]=g*z+v*I+x*ht+M*St,u[9]=g*K+v*ct+x*W+M*L,u[13]=g*w+v*it+x*at+M*nt,u[2]=T*F+C*R+y*mt+_*j,u[6]=T*z+C*I+y*ht+_*St,u[10]=T*K+C*ct+y*W+_*L,u[14]=T*w+C*it+y*at+_*nt,u[3]=P*F+O*R+D*mt+H*j,u[7]=P*z+O*I+D*ht+H*St,u[11]=P*K+O*ct+D*W+H*L,u[15]=P*w+O*it+D*at+H*nt,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[4]*=t,i[8]*=t,i[12]*=t,i[1]*=t,i[5]*=t,i[9]*=t,i[13]*=t,i[2]*=t,i[6]*=t,i[10]*=t,i[14]*=t,i[3]*=t,i[7]*=t,i[11]*=t,i[15]*=t,this}determinant(){const t=this.elements,i=t[0],r=t[4],l=t[8],u=t[12],h=t[1],d=t[5],m=t[9],p=t[13],g=t[2],v=t[6],x=t[10],M=t[14],T=t[3],C=t[7],y=t[11],_=t[15];return T*(+u*m*v-l*p*v-u*d*x+r*p*x+l*d*M-r*m*M)+C*(+i*m*M-i*p*x+u*h*x-l*h*M+l*p*g-u*m*g)+y*(+i*p*v-i*d*M-u*h*v+r*h*M+u*d*g-r*p*g)+_*(-l*d*g-i*m*v+i*d*x+l*h*v-r*h*x+r*m*g)}transpose(){const t=this.elements;let i;return i=t[1],t[1]=t[4],t[4]=i,i=t[2],t[2]=t[8],t[8]=i,i=t[6],t[6]=t[9],t[9]=i,i=t[3],t[3]=t[12],t[12]=i,i=t[7],t[7]=t[13],t[13]=i,i=t[11],t[11]=t[14],t[14]=i,this}setPosition(t,i,r){const l=this.elements;return t.isVector3?(l[12]=t.x,l[13]=t.y,l[14]=t.z):(l[12]=t,l[13]=i,l[14]=r),this}invert(){const t=this.elements,i=t[0],r=t[1],l=t[2],u=t[3],h=t[4],d=t[5],m=t[6],p=t[7],g=t[8],v=t[9],x=t[10],M=t[11],T=t[12],C=t[13],y=t[14],_=t[15],P=v*y*p-C*x*p+C*m*M-d*y*M-v*m*_+d*x*_,O=T*x*p-g*y*p-T*m*M+h*y*M+g*m*_-h*x*_,D=g*C*p-T*v*p+T*d*M-h*C*M-g*d*_+h*v*_,H=T*v*m-g*C*m-T*d*x+h*C*x+g*d*y-h*v*y,F=i*P+r*O+l*D+u*H;if(F===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const z=1/F;return t[0]=P*z,t[1]=(C*x*u-v*y*u-C*l*M+r*y*M+v*l*_-r*x*_)*z,t[2]=(d*y*u-C*m*u+C*l*p-r*y*p-d*l*_+r*m*_)*z,t[3]=(v*m*u-d*x*u-v*l*p+r*x*p+d*l*M-r*m*M)*z,t[4]=O*z,t[5]=(g*y*u-T*x*u+T*l*M-i*y*M-g*l*_+i*x*_)*z,t[6]=(T*m*u-h*y*u-T*l*p+i*y*p+h*l*_-i*m*_)*z,t[7]=(h*x*u-g*m*u+g*l*p-i*x*p-h*l*M+i*m*M)*z,t[8]=D*z,t[9]=(T*v*u-g*C*u-T*r*M+i*C*M+g*r*_-i*v*_)*z,t[10]=(h*C*u-T*d*u+T*r*p-i*C*p-h*r*_+i*d*_)*z,t[11]=(g*d*u-h*v*u-g*r*p+i*v*p+h*r*M-i*d*M)*z,t[12]=H*z,t[13]=(g*C*l-T*v*l+T*r*x-i*C*x-g*r*y+i*v*y)*z,t[14]=(T*d*l-h*C*l-T*r*m+i*C*m+h*r*y-i*d*y)*z,t[15]=(h*v*l-g*d*l+g*r*m-i*v*m-h*r*x+i*d*x)*z,this}scale(t){const i=this.elements,r=t.x,l=t.y,u=t.z;return i[0]*=r,i[4]*=l,i[8]*=u,i[1]*=r,i[5]*=l,i[9]*=u,i[2]*=r,i[6]*=l,i[10]*=u,i[3]*=r,i[7]*=l,i[11]*=u,this}getMaxScaleOnAxis(){const t=this.elements,i=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],r=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],l=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(i,r,l))}makeTranslation(t,i,r){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,i,0,0,1,r,0,0,0,1),this}makeRotationX(t){const i=Math.cos(t),r=Math.sin(t);return this.set(1,0,0,0,0,i,-r,0,0,r,i,0,0,0,0,1),this}makeRotationY(t){const i=Math.cos(t),r=Math.sin(t);return this.set(i,0,r,0,0,1,0,0,-r,0,i,0,0,0,0,1),this}makeRotationZ(t){const i=Math.cos(t),r=Math.sin(t);return this.set(i,-r,0,0,r,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,i){const r=Math.cos(i),l=Math.sin(i),u=1-r,h=t.x,d=t.y,m=t.z,p=u*h,g=u*d;return this.set(p*h+r,p*d-l*m,p*m+l*d,0,p*d+l*m,g*d+r,g*m-l*h,0,p*m-l*d,g*m+l*h,u*m*m+r,0,0,0,0,1),this}makeScale(t,i,r){return this.set(t,0,0,0,0,i,0,0,0,0,r,0,0,0,0,1),this}makeShear(t,i,r,l,u,h){return this.set(1,r,u,0,t,1,h,0,i,l,1,0,0,0,0,1),this}compose(t,i,r){const l=this.elements,u=i._x,h=i._y,d=i._z,m=i._w,p=u+u,g=h+h,v=d+d,x=u*p,M=u*g,T=u*v,C=h*g,y=h*v,_=d*v,P=m*p,O=m*g,D=m*v,H=r.x,F=r.y,z=r.z;return l[0]=(1-(C+_))*H,l[1]=(M+D)*H,l[2]=(T-O)*H,l[3]=0,l[4]=(M-D)*F,l[5]=(1-(x+_))*F,l[6]=(y+P)*F,l[7]=0,l[8]=(T+O)*z,l[9]=(y-P)*z,l[10]=(1-(x+C))*z,l[11]=0,l[12]=t.x,l[13]=t.y,l[14]=t.z,l[15]=1,this}decompose(t,i,r){const l=this.elements;let u=ts.set(l[0],l[1],l[2]).length();const h=ts.set(l[4],l[5],l[6]).length(),d=ts.set(l[8],l[9],l[10]).length();this.determinant()<0&&(u=-u),t.x=l[12],t.y=l[13],t.z=l[14],di.copy(this);const p=1/u,g=1/h,v=1/d;return di.elements[0]*=p,di.elements[1]*=p,di.elements[2]*=p,di.elements[4]*=g,di.elements[5]*=g,di.elements[6]*=g,di.elements[8]*=v,di.elements[9]*=v,di.elements[10]*=v,i.setFromRotationMatrix(di),r.x=u,r.y=h,r.z=d,this}makePerspective(t,i,r,l,u,h,d=ea){const m=this.elements,p=2*u/(i-t),g=2*u/(r-l),v=(i+t)/(i-t),x=(r+l)/(r-l);let M,T;if(d===ea)M=-(h+u)/(h-u),T=-2*h*u/(h-u);else if(d===vc)M=-h/(h-u),T=-h*u/(h-u);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return m[0]=p,m[4]=0,m[8]=v,m[12]=0,m[1]=0,m[5]=g,m[9]=x,m[13]=0,m[2]=0,m[6]=0,m[10]=M,m[14]=T,m[3]=0,m[7]=0,m[11]=-1,m[15]=0,this}makeOrthographic(t,i,r,l,u,h,d=ea){const m=this.elements,p=1/(i-t),g=1/(r-l),v=1/(h-u),x=(i+t)*p,M=(r+l)*g;let T,C;if(d===ea)T=(h+u)*v,C=-2*v;else if(d===vc)T=u*v,C=-1*v;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return m[0]=2*p,m[4]=0,m[8]=0,m[12]=-x,m[1]=0,m[5]=2*g,m[9]=0,m[13]=-M,m[2]=0,m[6]=0,m[10]=C,m[14]=-T,m[3]=0,m[7]=0,m[11]=0,m[15]=1,this}equals(t){const i=this.elements,r=t.elements;for(let l=0;l<16;l++)if(i[l]!==r[l])return!1;return!0}fromArray(t,i=0){for(let r=0;r<16;r++)this.elements[r]=t[r+i];return this}toArray(t=[],i=0){const r=this.elements;return t[i]=r[0],t[i+1]=r[1],t[i+2]=r[2],t[i+3]=r[3],t[i+4]=r[4],t[i+5]=r[5],t[i+6]=r[6],t[i+7]=r[7],t[i+8]=r[8],t[i+9]=r[9],t[i+10]=r[10],t[i+11]=r[11],t[i+12]=r[12],t[i+13]=r[13],t[i+14]=r[14],t[i+15]=r[15],t}}const ts=new rt,di=new $e,NS=new rt(0,0,0),OS=new rt(1,1,1),wa=new rt,Zl=new rt,Wn=new rt,Zg=new $e,Kg=new No;class Ci{constructor(t=0,i=0,r=0,l=Ci.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=i,this._z=r,this._order=l}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,i,r,l=this._order){return this._x=t,this._y=i,this._z=r,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,i=this._order,r=!0){const l=t.elements,u=l[0],h=l[4],d=l[8],m=l[1],p=l[5],g=l[9],v=l[2],x=l[6],M=l[10];switch(i){case"XYZ":this._y=Math.asin(Se(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-g,M),this._z=Math.atan2(-h,u)):(this._x=Math.atan2(x,p),this._z=0);break;case"YXZ":this._x=Math.asin(-Se(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(d,M),this._z=Math.atan2(m,p)):(this._y=Math.atan2(-v,u),this._z=0);break;case"ZXY":this._x=Math.asin(Se(x,-1,1)),Math.abs(x)<.9999999?(this._y=Math.atan2(-v,M),this._z=Math.atan2(-h,p)):(this._y=0,this._z=Math.atan2(m,u));break;case"ZYX":this._y=Math.asin(-Se(v,-1,1)),Math.abs(v)<.9999999?(this._x=Math.atan2(x,M),this._z=Math.atan2(m,u)):(this._x=0,this._z=Math.atan2(-h,p));break;case"YZX":this._z=Math.asin(Se(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-g,p),this._y=Math.atan2(-v,u)):(this._x=0,this._y=Math.atan2(d,M));break;case"XZY":this._z=Math.asin(-Se(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(x,p),this._y=Math.atan2(d,u)):(this._x=Math.atan2(-g,M),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,r===!0&&this._onChangeCallback(),this}setFromQuaternion(t,i,r){return Zg.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Zg,i,r)}setFromVector3(t,i=this._order){return this.set(t.x,t.y,t.z,i)}reorder(t){return Kg.setFromEuler(this),this.setFromQuaternion(Kg,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ci.DEFAULT_ORDER="XYZ";class e0{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let PS=0;const Qg=new rt,es=new No,Zi=new $e,Kl=new rt,Ao=new rt,zS=new rt,FS=new No,Jg=new rt(1,0,0),$g=new rt(0,1,0),t_=new rt(0,0,1),e_={type:"added"},BS={type:"removed"},ns={type:"childadded",child:null},Vf={type:"childremoved",child:null};class jn extends Es{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:PS++}),this.uuid=Lo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=jn.DEFAULT_UP.clone();const t=new rt,i=new Ci,r=new No,l=new rt(1,1,1);function u(){r.setFromEuler(i,!1)}function h(){i.setFromQuaternion(r,void 0,!1)}i._onChange(u),r._onChange(h),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new $e},normalMatrix:{value:new le}}),this.matrix=new $e,this.matrixWorld=new $e,this.matrixAutoUpdate=jn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=jn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new e0,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,i){this.quaternion.setFromAxisAngle(t,i)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,i){return es.setFromAxisAngle(t,i),this.quaternion.multiply(es),this}rotateOnWorldAxis(t,i){return es.setFromAxisAngle(t,i),this.quaternion.premultiply(es),this}rotateX(t){return this.rotateOnAxis(Jg,t)}rotateY(t){return this.rotateOnAxis($g,t)}rotateZ(t){return this.rotateOnAxis(t_,t)}translateOnAxis(t,i){return Qg.copy(t).applyQuaternion(this.quaternion),this.position.add(Qg.multiplyScalar(i)),this}translateX(t){return this.translateOnAxis(Jg,t)}translateY(t){return this.translateOnAxis($g,t)}translateZ(t){return this.translateOnAxis(t_,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Zi.copy(this.matrixWorld).invert())}lookAt(t,i,r){t.isVector3?Kl.copy(t):Kl.set(t,i,r);const l=this.parent;this.updateWorldMatrix(!0,!1),Ao.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Zi.lookAt(Ao,Kl,this.up):Zi.lookAt(Kl,Ao,this.up),this.quaternion.setFromRotationMatrix(Zi),l&&(Zi.extractRotation(l.matrixWorld),es.setFromRotationMatrix(Zi),this.quaternion.premultiply(es.invert()))}add(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(e_),ns.child=t,this.dispatchEvent(ns),ns.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const i=this.children.indexOf(t);return i!==-1&&(t.parent=null,this.children.splice(i,1),t.dispatchEvent(BS),Vf.child=t,this.dispatchEvent(Vf),Vf.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Zi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Zi.multiply(t.parent.matrixWorld)),t.applyMatrix4(Zi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(e_),ns.child=t,this.dispatchEvent(ns),ns.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,i){if(this[t]===i)return this;for(let r=0,l=this.children.length;r<l;r++){const h=this.children[r].getObjectByProperty(t,i);if(h!==void 0)return h}}getObjectsByProperty(t,i,r=[]){this[t]===i&&r.push(this);const l=this.children;for(let u=0,h=l.length;u<h;u++)l[u].getObjectsByProperty(t,i,r);return r}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ao,t,zS),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ao,FS,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return t.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(t){t(this);const i=this.children;for(let r=0,l=i.length;r<l;r++)i[r].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const i=this.children;for(let r=0,l=i.length;r<l;r++)i[r].traverseVisible(t)}traverseAncestors(t){const i=this.parent;i!==null&&(t(i),i.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const i=this.children;for(let r=0,l=i.length;r<l;r++)i[r].updateMatrixWorld(t)}updateWorldMatrix(t,i){const r=this.parent;if(t===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){const l=this.children;for(let u=0,h=l.length;u<h;u++)l[u].updateWorldMatrix(!1,!0)}}toJSON(t){const i=t===void 0||typeof t=="string",r={};i&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.visibility=this._visibility,l.active=this._active,l.bounds=this._bounds.map(d=>({boxInitialized:d.boxInitialized,boxMin:d.box.min.toArray(),boxMax:d.box.max.toArray(),sphereInitialized:d.sphereInitialized,sphereRadius:d.sphere.radius,sphereCenter:d.sphere.center.toArray()})),l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.geometryCount=this._geometryCount,l.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(l.boundingSphere={center:l.boundingSphere.center.toArray(),radius:l.boundingSphere.radius}),this.boundingBox!==null&&(l.boundingBox={min:l.boundingBox.min.toArray(),max:l.boundingBox.max.toArray()}));function u(d,m){return d[m.uuid]===void 0&&(d[m.uuid]=m.toJSON(t)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=u(t.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const m=d.shapes;if(Array.isArray(m))for(let p=0,g=m.length;p<g;p++){const v=m[p];u(t.shapes,v)}else u(t.shapes,m)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(u(t.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let m=0,p=this.material.length;m<p;m++)d.push(u(t.materials,this.material[m]));l.material=d}else l.material=u(t.materials,this.material);if(this.children.length>0){l.children=[];for(let d=0;d<this.children.length;d++)l.children.push(this.children[d].toJSON(t).object)}if(this.animations.length>0){l.animations=[];for(let d=0;d<this.animations.length;d++){const m=this.animations[d];l.animations.push(u(t.animations,m))}}if(i){const d=h(t.geometries),m=h(t.materials),p=h(t.textures),g=h(t.images),v=h(t.shapes),x=h(t.skeletons),M=h(t.animations),T=h(t.nodes);d.length>0&&(r.geometries=d),m.length>0&&(r.materials=m),p.length>0&&(r.textures=p),g.length>0&&(r.images=g),v.length>0&&(r.shapes=v),x.length>0&&(r.skeletons=x),M.length>0&&(r.animations=M),T.length>0&&(r.nodes=T)}return r.object=l,r;function h(d){const m=[];for(const p in d){const g=d[p];delete g.metadata,m.push(g)}return m}}clone(t){return new this.constructor().copy(this,t)}copy(t,i=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),i===!0)for(let r=0;r<t.children.length;r++){const l=t.children[r];this.add(l.clone())}return this}}jn.DEFAULT_UP=new rt(0,1,0);jn.DEFAULT_MATRIX_AUTO_UPDATE=!0;jn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const pi=new rt,Ki=new rt,kf=new rt,Qi=new rt,is=new rt,as=new rt,n_=new rt,Xf=new rt,Wf=new rt,qf=new rt,Yf=new je,jf=new je,Zf=new je;class mi{constructor(t=new rt,i=new rt,r=new rt){this.a=t,this.b=i,this.c=r}static getNormal(t,i,r,l){l.subVectors(r,i),pi.subVectors(t,i),l.cross(pi);const u=l.lengthSq();return u>0?l.multiplyScalar(1/Math.sqrt(u)):l.set(0,0,0)}static getBarycoord(t,i,r,l,u){pi.subVectors(l,i),Ki.subVectors(r,i),kf.subVectors(t,i);const h=pi.dot(pi),d=pi.dot(Ki),m=pi.dot(kf),p=Ki.dot(Ki),g=Ki.dot(kf),v=h*p-d*d;if(v===0)return u.set(0,0,0),null;const x=1/v,M=(p*m-d*g)*x,T=(h*g-d*m)*x;return u.set(1-M-T,T,M)}static containsPoint(t,i,r,l){return this.getBarycoord(t,i,r,l,Qi)===null?!1:Qi.x>=0&&Qi.y>=0&&Qi.x+Qi.y<=1}static getInterpolation(t,i,r,l,u,h,d,m){return this.getBarycoord(t,i,r,l,Qi)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(u,Qi.x),m.addScaledVector(h,Qi.y),m.addScaledVector(d,Qi.z),m)}static getInterpolatedAttribute(t,i,r,l,u,h){return Yf.setScalar(0),jf.setScalar(0),Zf.setScalar(0),Yf.fromBufferAttribute(t,i),jf.fromBufferAttribute(t,r),Zf.fromBufferAttribute(t,l),h.setScalar(0),h.addScaledVector(Yf,u.x),h.addScaledVector(jf,u.y),h.addScaledVector(Zf,u.z),h}static isFrontFacing(t,i,r,l){return pi.subVectors(r,i),Ki.subVectors(t,i),pi.cross(Ki).dot(l)<0}set(t,i,r){return this.a.copy(t),this.b.copy(i),this.c.copy(r),this}setFromPointsAndIndices(t,i,r,l){return this.a.copy(t[i]),this.b.copy(t[r]),this.c.copy(t[l]),this}setFromAttributeAndIndices(t,i,r,l){return this.a.fromBufferAttribute(t,i),this.b.fromBufferAttribute(t,r),this.c.fromBufferAttribute(t,l),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return pi.subVectors(this.c,this.b),Ki.subVectors(this.a,this.b),pi.cross(Ki).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return mi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,i){return mi.getBarycoord(t,this.a,this.b,this.c,i)}getInterpolation(t,i,r,l,u){return mi.getInterpolation(t,this.a,this.b,this.c,i,r,l,u)}containsPoint(t){return mi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return mi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,i){const r=this.a,l=this.b,u=this.c;let h,d;is.subVectors(l,r),as.subVectors(u,r),Xf.subVectors(t,r);const m=is.dot(Xf),p=as.dot(Xf);if(m<=0&&p<=0)return i.copy(r);Wf.subVectors(t,l);const g=is.dot(Wf),v=as.dot(Wf);if(g>=0&&v<=g)return i.copy(l);const x=m*v-g*p;if(x<=0&&m>=0&&g<=0)return h=m/(m-g),i.copy(r).addScaledVector(is,h);qf.subVectors(t,u);const M=is.dot(qf),T=as.dot(qf);if(T>=0&&M<=T)return i.copy(u);const C=M*p-m*T;if(C<=0&&p>=0&&T<=0)return d=p/(p-T),i.copy(r).addScaledVector(as,d);const y=g*T-M*v;if(y<=0&&v-g>=0&&M-T>=0)return n_.subVectors(u,l),d=(v-g)/(v-g+(M-T)),i.copy(l).addScaledVector(n_,d);const _=1/(y+C+x);return h=C*_,d=x*_,i.copy(r).addScaledVector(is,h).addScaledVector(as,d)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const n0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ca={h:0,s:0,l:0},Ql={h:0,s:0,l:0};function Kf(o,t,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?o+(t-o)*6*i:i<1/2?t:i<2/3?o+(t-o)*6*(2/3-i):o}class ie{constructor(t,i,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,i,r)}set(t,i,r){if(i===void 0&&r===void 0){const l=t;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(t,i,r);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,i=si){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Re.toWorkingColorSpace(this,i),this}setRGB(t,i,r,l=Re.workingColorSpace){return this.r=t,this.g=i,this.b=r,Re.toWorkingColorSpace(this,l),this}setHSL(t,i,r,l=Re.workingColorSpace){if(t=SS(t,1),i=Se(i,0,1),r=Se(r,0,1),i===0)this.r=this.g=this.b=r;else{const u=r<=.5?r*(1+i):r+i-r*i,h=2*r-u;this.r=Kf(h,u,t+1/3),this.g=Kf(h,u,t),this.b=Kf(h,u,t-1/3)}return Re.toWorkingColorSpace(this,l),this}setStyle(t,i=si){function r(u){u!==void 0&&parseFloat(u)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(t)){let u;const h=l[1],d=l[2];switch(h){case"rgb":case"rgba":if(u=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(u[4]),this.setRGB(Math.min(255,parseInt(u[1],10))/255,Math.min(255,parseInt(u[2],10))/255,Math.min(255,parseInt(u[3],10))/255,i);if(u=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(u[4]),this.setRGB(Math.min(100,parseInt(u[1],10))/100,Math.min(100,parseInt(u[2],10))/100,Math.min(100,parseInt(u[3],10))/100,i);break;case"hsl":case"hsla":if(u=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(u[4]),this.setHSL(parseFloat(u[1])/360,parseFloat(u[2])/100,parseFloat(u[3])/100,i);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(t)){const u=l[1],h=u.length;if(h===3)return this.setRGB(parseInt(u.charAt(0),16)/15,parseInt(u.charAt(1),16)/15,parseInt(u.charAt(2),16)/15,i);if(h===6)return this.setHex(parseInt(u,16),i);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,i);return this}setColorName(t,i=si){const r=n0[t.toLowerCase()];return r!==void 0?this.setHex(r,i):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=na(t.r),this.g=na(t.g),this.b=na(t.b),this}copyLinearToSRGB(t){return this.r=ps(t.r),this.g=ps(t.g),this.b=ps(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=si){return Re.fromWorkingColorSpace(En.copy(this),t),Math.round(Se(En.r*255,0,255))*65536+Math.round(Se(En.g*255,0,255))*256+Math.round(Se(En.b*255,0,255))}getHexString(t=si){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,i=Re.workingColorSpace){Re.fromWorkingColorSpace(En.copy(this),i);const r=En.r,l=En.g,u=En.b,h=Math.max(r,l,u),d=Math.min(r,l,u);let m,p;const g=(d+h)/2;if(d===h)m=0,p=0;else{const v=h-d;switch(p=g<=.5?v/(h+d):v/(2-h-d),h){case r:m=(l-u)/v+(l<u?6:0);break;case l:m=(u-r)/v+2;break;case u:m=(r-l)/v+4;break}m/=6}return t.h=m,t.s=p,t.l=g,t}getRGB(t,i=Re.workingColorSpace){return Re.fromWorkingColorSpace(En.copy(this),i),t.r=En.r,t.g=En.g,t.b=En.b,t}getStyle(t=si){Re.fromWorkingColorSpace(En.copy(this),t);const i=En.r,r=En.g,l=En.b;return t!==si?`color(${t} ${i.toFixed(3)} ${r.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(r*255)},${Math.round(l*255)})`}offsetHSL(t,i,r){return this.getHSL(Ca),this.setHSL(Ca.h+t,Ca.s+i,Ca.l+r)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,i){return this.r=t.r+i.r,this.g=t.g+i.g,this.b=t.b+i.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,i){return this.r+=(t.r-this.r)*i,this.g+=(t.g-this.g)*i,this.b+=(t.b-this.b)*i,this}lerpColors(t,i,r){return this.r=t.r+(i.r-t.r)*r,this.g=t.g+(i.g-t.g)*r,this.b=t.b+(i.b-t.b)*r,this}lerpHSL(t,i){this.getHSL(Ca),t.getHSL(Ql);const r=Nf(Ca.h,Ql.h,i),l=Nf(Ca.s,Ql.s,i),u=Nf(Ca.l,Ql.l,i);return this.setHSL(r,l,u),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const i=this.r,r=this.g,l=this.b,u=t.elements;return this.r=u[0]*i+u[3]*r+u[6]*l,this.g=u[1]*i+u[4]*r+u[7]*l,this.b=u[2]*i+u[5]*r+u[8]*l,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,i=0){return this.r=t[i],this.g=t[i+1],this.b=t[i+2],this}toArray(t=[],i=0){return t[i]=this.r,t[i+1]=this.g,t[i+2]=this.b,t}fromBufferAttribute(t,i){return this.r=t.getX(i),this.g=t.getY(i),this.b=t.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const En=new ie;ie.NAMES=n0;let IS=0;class Po extends Es{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:IS++}),this.uuid=Lo(),this.name="",this.type="Material",this.blending=hs,this.side=Oa,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=fh,this.blendDst=hh,this.blendEquation=ur,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ie(0,0,0),this.blendAlpha=0,this.depthFunc=gs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Vg,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Zr,this.stencilZFail=Zr,this.stencilZPass=Zr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const i in t){const r=t[i];if(r===void 0){console.warn(`THREE.Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){console.warn(`THREE.Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(r):l&&l.isVector3&&r&&r.isVector3?l.copy(r):this[i]=r}}toJSON(t){const i=t===void 0||typeof t=="string";i&&(t={textures:{},images:{}});const r={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(t).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(t).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(t).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(t).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(t).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==hs&&(r.blending=this.blending),this.side!==Oa&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==fh&&(r.blendSrc=this.blendSrc),this.blendDst!==hh&&(r.blendDst=this.blendDst),this.blendEquation!==ur&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==gs&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Vg&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Zr&&(r.stencilFail=this.stencilFail),this.stencilZFail!==Zr&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==Zr&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function l(u){const h=[];for(const d in u){const m=u[d];delete m.metadata,h.push(m)}return h}if(i){const u=l(t.textures),h=l(t.images);u.length>0&&(r.textures=u),h.length>0&&(r.images=h)}return r}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const i=t.clippingPlanes;let r=null;if(i!==null){const l=i.length;r=new Array(l);for(let u=0;u!==l;++u)r[u]=i[u].clone()}return this.clippingPlanes=r,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class i0 extends Po{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ie(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ci,this.combine=td,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Je=new rt,Jl=new Ce;class Ri{constructor(t,i,r=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=i,this.count=t!==void 0?t.length/i:0,this.normalized=r,this.usage=kg,this.updateRanges=[],this.gpuType=ta,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,i,r){t*=this.itemSize,r*=i.itemSize;for(let l=0,u=this.itemSize;l<u;l++)this.array[t+l]=i.array[r+l];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let i=0,r=this.count;i<r;i++)Jl.fromBufferAttribute(this,i),Jl.applyMatrix3(t),this.setXY(i,Jl.x,Jl.y);else if(this.itemSize===3)for(let i=0,r=this.count;i<r;i++)Je.fromBufferAttribute(this,i),Je.applyMatrix3(t),this.setXYZ(i,Je.x,Je.y,Je.z);return this}applyMatrix4(t){for(let i=0,r=this.count;i<r;i++)Je.fromBufferAttribute(this,i),Je.applyMatrix4(t),this.setXYZ(i,Je.x,Je.y,Je.z);return this}applyNormalMatrix(t){for(let i=0,r=this.count;i<r;i++)Je.fromBufferAttribute(this,i),Je.applyNormalMatrix(t),this.setXYZ(i,Je.x,Je.y,Je.z);return this}transformDirection(t){for(let i=0,r=this.count;i<r;i++)Je.fromBufferAttribute(this,i),Je.transformDirection(t),this.setXYZ(i,Je.x,Je.y,Je.z);return this}set(t,i=0){return this.array.set(t,i),this}getComponent(t,i){let r=this.array[t*this.itemSize+i];return this.normalized&&(r=Eo(r,this.array)),r}setComponent(t,i,r){return this.normalized&&(r=Fn(r,this.array)),this.array[t*this.itemSize+i]=r,this}getX(t){let i=this.array[t*this.itemSize];return this.normalized&&(i=Eo(i,this.array)),i}setX(t,i){return this.normalized&&(i=Fn(i,this.array)),this.array[t*this.itemSize]=i,this}getY(t){let i=this.array[t*this.itemSize+1];return this.normalized&&(i=Eo(i,this.array)),i}setY(t,i){return this.normalized&&(i=Fn(i,this.array)),this.array[t*this.itemSize+1]=i,this}getZ(t){let i=this.array[t*this.itemSize+2];return this.normalized&&(i=Eo(i,this.array)),i}setZ(t,i){return this.normalized&&(i=Fn(i,this.array)),this.array[t*this.itemSize+2]=i,this}getW(t){let i=this.array[t*this.itemSize+3];return this.normalized&&(i=Eo(i,this.array)),i}setW(t,i){return this.normalized&&(i=Fn(i,this.array)),this.array[t*this.itemSize+3]=i,this}setXY(t,i,r){return t*=this.itemSize,this.normalized&&(i=Fn(i,this.array),r=Fn(r,this.array)),this.array[t+0]=i,this.array[t+1]=r,this}setXYZ(t,i,r,l){return t*=this.itemSize,this.normalized&&(i=Fn(i,this.array),r=Fn(r,this.array),l=Fn(l,this.array)),this.array[t+0]=i,this.array[t+1]=r,this.array[t+2]=l,this}setXYZW(t,i,r,l,u){return t*=this.itemSize,this.normalized&&(i=Fn(i,this.array),r=Fn(r,this.array),l=Fn(l,this.array),u=Fn(u,this.array)),this.array[t+0]=i,this.array[t+1]=r,this.array[t+2]=l,this.array[t+3]=u,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==kg&&(t.usage=this.usage),t}}class a0 extends Ri{constructor(t,i,r){super(new Uint16Array(t),i,r)}}class r0 extends Ri{constructor(t,i,r){super(new Uint32Array(t),i,r)}}class wi extends Ri{constructor(t,i,r){super(new Float32Array(t),i,r)}}let HS=0;const ri=new $e,Qf=new jn,rs=new rt,qn=new Oo,Ro=new Oo,dn=new rt;class Pa extends Es{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:HS++}),this.uuid=Lo(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(J_(t)?r0:a0)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,i){return this.attributes[t]=i,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,i,r=0){this.groups.push({start:t,count:i,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(t,i){this.drawRange.start=t,this.drawRange.count=i}applyMatrix4(t){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(t),i.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const u=new le().getNormalMatrix(t);r.applyNormalMatrix(u),r.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(t),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return ri.makeRotationFromQuaternion(t),this.applyMatrix4(ri),this}rotateX(t){return ri.makeRotationX(t),this.applyMatrix4(ri),this}rotateY(t){return ri.makeRotationY(t),this.applyMatrix4(ri),this}rotateZ(t){return ri.makeRotationZ(t),this.applyMatrix4(ri),this}translate(t,i,r){return ri.makeTranslation(t,i,r),this.applyMatrix4(ri),this}scale(t,i,r){return ri.makeScale(t,i,r),this.applyMatrix4(ri),this}lookAt(t){return Qf.lookAt(t),Qf.updateMatrix(),this.applyMatrix4(Qf.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(rs).negate(),this.translate(rs.x,rs.y,rs.z),this}setFromPoints(t){const i=this.getAttribute("position");if(i===void 0){const r=[];for(let l=0,u=t.length;l<u;l++){const h=t[l];r.push(h.x,h.y,h.z||0)}this.setAttribute("position",new wi(r,3))}else{const r=Math.min(t.length,i.count);for(let l=0;l<r;l++){const u=t[l];i.setXYZ(l,u.x,u.y,u.z||0)}t.length>i.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Oo);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new rt(-1/0,-1/0,-1/0),new rt(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),i)for(let r=0,l=i.length;r<l;r++){const u=i[r];qn.setFromBufferAttribute(u),this.morphTargetsRelative?(dn.addVectors(this.boundingBox.min,qn.min),this.boundingBox.expandByPoint(dn),dn.addVectors(this.boundingBox.max,qn.max),this.boundingBox.expandByPoint(dn)):(this.boundingBox.expandByPoint(qn.min),this.boundingBox.expandByPoint(qn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new od);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new rt,1/0);return}if(t){const r=this.boundingSphere.center;if(qn.setFromBufferAttribute(t),i)for(let u=0,h=i.length;u<h;u++){const d=i[u];Ro.setFromBufferAttribute(d),this.morphTargetsRelative?(dn.addVectors(qn.min,Ro.min),qn.expandByPoint(dn),dn.addVectors(qn.max,Ro.max),qn.expandByPoint(dn)):(qn.expandByPoint(Ro.min),qn.expandByPoint(Ro.max))}qn.getCenter(r);let l=0;for(let u=0,h=t.count;u<h;u++)dn.fromBufferAttribute(t,u),l=Math.max(l,r.distanceToSquared(dn));if(i)for(let u=0,h=i.length;u<h;u++){const d=i[u],m=this.morphTargetsRelative;for(let p=0,g=d.count;p<g;p++)dn.fromBufferAttribute(d,p),m&&(rs.fromBufferAttribute(t,p),dn.add(rs)),l=Math.max(l,r.distanceToSquared(dn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,i=this.attributes;if(t===null||i.position===void 0||i.normal===void 0||i.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=i.position,l=i.normal,u=i.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ri(new Float32Array(4*r.count),4));const h=this.getAttribute("tangent"),d=[],m=[];for(let K=0;K<r.count;K++)d[K]=new rt,m[K]=new rt;const p=new rt,g=new rt,v=new rt,x=new Ce,M=new Ce,T=new Ce,C=new rt,y=new rt;function _(K,w,R){p.fromBufferAttribute(r,K),g.fromBufferAttribute(r,w),v.fromBufferAttribute(r,R),x.fromBufferAttribute(u,K),M.fromBufferAttribute(u,w),T.fromBufferAttribute(u,R),g.sub(p),v.sub(p),M.sub(x),T.sub(x);const I=1/(M.x*T.y-T.x*M.y);isFinite(I)&&(C.copy(g).multiplyScalar(T.y).addScaledVector(v,-M.y).multiplyScalar(I),y.copy(v).multiplyScalar(M.x).addScaledVector(g,-T.x).multiplyScalar(I),d[K].add(C),d[w].add(C),d[R].add(C),m[K].add(y),m[w].add(y),m[R].add(y))}let P=this.groups;P.length===0&&(P=[{start:0,count:t.count}]);for(let K=0,w=P.length;K<w;++K){const R=P[K],I=R.start,ct=R.count;for(let it=I,mt=I+ct;it<mt;it+=3)_(t.getX(it+0),t.getX(it+1),t.getX(it+2))}const O=new rt,D=new rt,H=new rt,F=new rt;function z(K){H.fromBufferAttribute(l,K),F.copy(H);const w=d[K];O.copy(w),O.sub(H.multiplyScalar(H.dot(w))).normalize(),D.crossVectors(F,w);const I=D.dot(m[K])<0?-1:1;h.setXYZW(K,O.x,O.y,O.z,I)}for(let K=0,w=P.length;K<w;++K){const R=P[K],I=R.start,ct=R.count;for(let it=I,mt=I+ct;it<mt;it+=3)z(t.getX(it+0)),z(t.getX(it+1)),z(t.getX(it+2))}}computeVertexNormals(){const t=this.index,i=this.getAttribute("position");if(i!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new Ri(new Float32Array(i.count*3),3),this.setAttribute("normal",r);else for(let x=0,M=r.count;x<M;x++)r.setXYZ(x,0,0,0);const l=new rt,u=new rt,h=new rt,d=new rt,m=new rt,p=new rt,g=new rt,v=new rt;if(t)for(let x=0,M=t.count;x<M;x+=3){const T=t.getX(x+0),C=t.getX(x+1),y=t.getX(x+2);l.fromBufferAttribute(i,T),u.fromBufferAttribute(i,C),h.fromBufferAttribute(i,y),g.subVectors(h,u),v.subVectors(l,u),g.cross(v),d.fromBufferAttribute(r,T),m.fromBufferAttribute(r,C),p.fromBufferAttribute(r,y),d.add(g),m.add(g),p.add(g),r.setXYZ(T,d.x,d.y,d.z),r.setXYZ(C,m.x,m.y,m.z),r.setXYZ(y,p.x,p.y,p.z)}else for(let x=0,M=i.count;x<M;x+=3)l.fromBufferAttribute(i,x+0),u.fromBufferAttribute(i,x+1),h.fromBufferAttribute(i,x+2),g.subVectors(h,u),v.subVectors(l,u),g.cross(v),r.setXYZ(x+0,g.x,g.y,g.z),r.setXYZ(x+1,g.x,g.y,g.z),r.setXYZ(x+2,g.x,g.y,g.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let i=0,r=t.count;i<r;i++)dn.fromBufferAttribute(t,i),dn.normalize(),t.setXYZ(i,dn.x,dn.y,dn.z)}toNonIndexed(){function t(d,m){const p=d.array,g=d.itemSize,v=d.normalized,x=new p.constructor(m.length*g);let M=0,T=0;for(let C=0,y=m.length;C<y;C++){d.isInterleavedBufferAttribute?M=m[C]*d.data.stride+d.offset:M=m[C]*g;for(let _=0;_<g;_++)x[T++]=p[M++]}return new Ri(x,g,v)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new Pa,r=this.index.array,l=this.attributes;for(const d in l){const m=l[d],p=t(m,r);i.setAttribute(d,p)}const u=this.morphAttributes;for(const d in u){const m=[],p=u[d];for(let g=0,v=p.length;g<v;g++){const x=p[g],M=t(x,r);m.push(M)}i.morphAttributes[d]=m}i.morphTargetsRelative=this.morphTargetsRelative;const h=this.groups;for(let d=0,m=h.length;d<m;d++){const p=h[d];i.addGroup(p.start,p.count,p.materialIndex)}return i}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const m=this.parameters;for(const p in m)m[p]!==void 0&&(t[p]=m[p]);return t}t.data={attributes:{}};const i=this.index;i!==null&&(t.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const r=this.attributes;for(const m in r){const p=r[m];t.data.attributes[m]=p.toJSON(t.data)}const l={};let u=!1;for(const m in this.morphAttributes){const p=this.morphAttributes[m],g=[];for(let v=0,x=p.length;v<x;v++){const M=p[v];g.push(M.toJSON(t.data))}g.length>0&&(l[m]=g,u=!0)}u&&(t.data.morphAttributes=l,t.data.morphTargetsRelative=this.morphTargetsRelative);const h=this.groups;h.length>0&&(t.data.groups=JSON.parse(JSON.stringify(h)));const d=this.boundingSphere;return d!==null&&(t.data.boundingSphere={center:d.center.toArray(),radius:d.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=t.name;const r=t.index;r!==null&&this.setIndex(r.clone(i));const l=t.attributes;for(const p in l){const g=l[p];this.setAttribute(p,g.clone(i))}const u=t.morphAttributes;for(const p in u){const g=[],v=u[p];for(let x=0,M=v.length;x<M;x++)g.push(v[x].clone(i));this.morphAttributes[p]=g}this.morphTargetsRelative=t.morphTargetsRelative;const h=t.groups;for(let p=0,g=h.length;p<g;p++){const v=h[p];this.addGroup(v.start,v.count,v.materialIndex)}const d=t.boundingBox;d!==null&&(this.boundingBox=d.clone());const m=t.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const i_=new $e,ar=new LS,$l=new od,a_=new rt,tc=new rt,ec=new rt,nc=new rt,Jf=new rt,ic=new rt,r_=new rt,ac=new rt;class Bn extends jn{constructor(t=new Pa,i=new i0){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=i,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,r=Object.keys(i);if(r.length>0){const l=i[r[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let u=0,h=l.length;u<h;u++){const d=l[u].name||String(u);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=u}}}}getVertexPosition(t,i){const r=this.geometry,l=r.attributes.position,u=r.morphAttributes.position,h=r.morphTargetsRelative;i.fromBufferAttribute(l,t);const d=this.morphTargetInfluences;if(u&&d){ic.set(0,0,0);for(let m=0,p=u.length;m<p;m++){const g=d[m],v=u[m];g!==0&&(Jf.fromBufferAttribute(v,t),h?ic.addScaledVector(Jf,g):ic.addScaledVector(Jf.sub(i),g))}i.add(ic)}return i}raycast(t,i){const r=this.geometry,l=this.material,u=this.matrixWorld;l!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),$l.copy(r.boundingSphere),$l.applyMatrix4(u),ar.copy(t.ray).recast(t.near),!($l.containsPoint(ar.origin)===!1&&(ar.intersectSphere($l,a_)===null||ar.origin.distanceToSquared(a_)>(t.far-t.near)**2))&&(i_.copy(u).invert(),ar.copy(t.ray).applyMatrix4(i_),!(r.boundingBox!==null&&ar.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(t,i,ar)))}_computeIntersections(t,i,r){let l;const u=this.geometry,h=this.material,d=u.index,m=u.attributes.position,p=u.attributes.uv,g=u.attributes.uv1,v=u.attributes.normal,x=u.groups,M=u.drawRange;if(d!==null)if(Array.isArray(h))for(let T=0,C=x.length;T<C;T++){const y=x[T],_=h[y.materialIndex],P=Math.max(y.start,M.start),O=Math.min(d.count,Math.min(y.start+y.count,M.start+M.count));for(let D=P,H=O;D<H;D+=3){const F=d.getX(D),z=d.getX(D+1),K=d.getX(D+2);l=rc(this,_,t,r,p,g,v,F,z,K),l&&(l.faceIndex=Math.floor(D/3),l.face.materialIndex=y.materialIndex,i.push(l))}}else{const T=Math.max(0,M.start),C=Math.min(d.count,M.start+M.count);for(let y=T,_=C;y<_;y+=3){const P=d.getX(y),O=d.getX(y+1),D=d.getX(y+2);l=rc(this,h,t,r,p,g,v,P,O,D),l&&(l.faceIndex=Math.floor(y/3),i.push(l))}}else if(m!==void 0)if(Array.isArray(h))for(let T=0,C=x.length;T<C;T++){const y=x[T],_=h[y.materialIndex],P=Math.max(y.start,M.start),O=Math.min(m.count,Math.min(y.start+y.count,M.start+M.count));for(let D=P,H=O;D<H;D+=3){const F=D,z=D+1,K=D+2;l=rc(this,_,t,r,p,g,v,F,z,K),l&&(l.faceIndex=Math.floor(D/3),l.face.materialIndex=y.materialIndex,i.push(l))}}else{const T=Math.max(0,M.start),C=Math.min(m.count,M.start+M.count);for(let y=T,_=C;y<_;y+=3){const P=y,O=y+1,D=y+2;l=rc(this,h,t,r,p,g,v,P,O,D),l&&(l.faceIndex=Math.floor(y/3),i.push(l))}}}}function GS(o,t,i,r,l,u,h,d){let m;if(t.side===Un?m=r.intersectTriangle(h,u,l,!0,d):m=r.intersectTriangle(l,u,h,t.side===Oa,d),m===null)return null;ac.copy(d),ac.applyMatrix4(o.matrixWorld);const p=i.ray.origin.distanceTo(ac);return p<i.near||p>i.far?null:{distance:p,point:ac.clone(),object:o}}function rc(o,t,i,r,l,u,h,d,m,p){o.getVertexPosition(d,tc),o.getVertexPosition(m,ec),o.getVertexPosition(p,nc);const g=GS(o,t,i,r,tc,ec,nc,r_);if(g){const v=new rt;mi.getBarycoord(r_,tc,ec,nc,v),l&&(g.uv=mi.getInterpolatedAttribute(l,d,m,p,v,new Ce)),u&&(g.uv1=mi.getInterpolatedAttribute(u,d,m,p,v,new Ce)),h&&(g.normal=mi.getInterpolatedAttribute(h,d,m,p,v,new rt),g.normal.dot(r.direction)>0&&g.normal.multiplyScalar(-1));const x={a:d,b:m,c:p,normal:new rt,materialIndex:0};mi.getNormal(tc,ec,nc,x.normal),g.face=x,g.barycoord=v}return g}class zo extends Pa{constructor(t=1,i=1,r=1,l=1,u=1,h=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:i,depth:r,widthSegments:l,heightSegments:u,depthSegments:h};const d=this;l=Math.floor(l),u=Math.floor(u),h=Math.floor(h);const m=[],p=[],g=[],v=[];let x=0,M=0;T("z","y","x",-1,-1,r,i,t,h,u,0),T("z","y","x",1,-1,r,i,-t,h,u,1),T("x","z","y",1,1,t,r,i,l,h,2),T("x","z","y",1,-1,t,r,-i,l,h,3),T("x","y","z",1,-1,t,i,r,l,u,4),T("x","y","z",-1,-1,t,i,-r,l,u,5),this.setIndex(m),this.setAttribute("position",new wi(p,3)),this.setAttribute("normal",new wi(g,3)),this.setAttribute("uv",new wi(v,2));function T(C,y,_,P,O,D,H,F,z,K,w){const R=D/z,I=H/K,ct=D/2,it=H/2,mt=F/2,ht=z+1,W=K+1;let at=0,j=0;const St=new rt;for(let L=0;L<W;L++){const nt=L*I-it;for(let Et=0;Et<ht;Et++){const At=Et*R-ct;St[C]=At*P,St[y]=nt*O,St[_]=mt,p.push(St.x,St.y,St.z),St[C]=0,St[y]=0,St[_]=F>0?1:-1,g.push(St.x,St.y,St.z),v.push(Et/z),v.push(1-L/K),at+=1}}for(let L=0;L<K;L++)for(let nt=0;nt<z;nt++){const Et=x+nt+ht*L,At=x+nt+ht*(L+1),q=x+(nt+1)+ht*(L+1),dt=x+(nt+1)+ht*L;m.push(Et,At,dt),m.push(At,q,dt),j+=6}d.addGroup(M,j,w),M+=j,x+=at}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new zo(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ms(o){const t={};for(const i in o){t[i]={};for(const r in o[i]){const l=o[i][r];l&&(l.isColor||l.isMatrix3||l.isMatrix4||l.isVector2||l.isVector3||l.isVector4||l.isTexture||l.isQuaternion)?l.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[i][r]=null):t[i][r]=l.clone():Array.isArray(l)?t[i][r]=l.slice():t[i][r]=l}}return t}function Dn(o){const t={};for(let i=0;i<o.length;i++){const r=Ms(o[i]);for(const l in r)t[l]=r[l]}return t}function VS(o){const t=[];for(let i=0;i<o.length;i++)t.push(o[i].clone());return t}function s0(o){const t=o.getRenderTarget();return t===null?o.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Re.workingColorSpace}const kS={clone:Ms,merge:Dn};var XS=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,WS=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class vi extends Po{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=XS,this.fragmentShader=WS,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ms(t.uniforms),this.uniformsGroups=VS(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const i=super.toJSON(t);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const h=this.uniforms[l].value;h&&h.isTexture?i.uniforms[l]={type:"t",value:h.toJSON(t).uuid}:h&&h.isColor?i.uniforms[l]={type:"c",value:h.getHex()}:h&&h.isVector2?i.uniforms[l]={type:"v2",value:h.toArray()}:h&&h.isVector3?i.uniforms[l]={type:"v3",value:h.toArray()}:h&&h.isVector4?i.uniforms[l]={type:"v4",value:h.toArray()}:h&&h.isMatrix3?i.uniforms[l]={type:"m3",value:h.toArray()}:h&&h.isMatrix4?i.uniforms[l]={type:"m4",value:h.toArray()}:i.uniforms[l]={value:h}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const r={};for(const l in this.extensions)this.extensions[l]===!0&&(r[l]=!0);return Object.keys(r).length>0&&(i.extensions=r),i}}class o0 extends jn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new $e,this.projectionMatrix=new $e,this.projectionMatrixInverse=new $e,this.coordinateSystem=ea}copy(t,i){return super.copy(t,i),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,i){super.updateWorldMatrix(t,i),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Da=new rt,s_=new Ce,o_=new Ce;class Yn extends o0{constructor(t=50,i=1,r=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=r,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const i=.5*this.getFilmHeight()/t;this.fov=Kh*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Lf*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Kh*2*Math.atan(Math.tan(Lf*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,i,r){Da.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Da.x,Da.y).multiplyScalar(-t/Da.z),Da.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(Da.x,Da.y).multiplyScalar(-t/Da.z)}getViewSize(t,i){return this.getViewBounds(t,s_,o_),i.subVectors(o_,s_)}setViewOffset(t,i,r,l,u,h){this.aspect=t/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=r,this.view.offsetY=l,this.view.width=u,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let i=t*Math.tan(Lf*.5*this.fov)/this.zoom,r=2*i,l=this.aspect*r,u=-.5*l;const h=this.view;if(this.view!==null&&this.view.enabled){const m=h.fullWidth,p=h.fullHeight;u+=h.offsetX*l/m,i-=h.offsetY*r/p,l*=h.width/m,r*=h.height/p}const d=this.filmOffset;d!==0&&(u+=t*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(u,u+l,i,i-r,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}const ss=-90,os=1;class qS extends jn{constructor(t,i,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new Yn(ss,os,t,i);l.layers=this.layers,this.add(l);const u=new Yn(ss,os,t,i);u.layers=this.layers,this.add(u);const h=new Yn(ss,os,t,i);h.layers=this.layers,this.add(h);const d=new Yn(ss,os,t,i);d.layers=this.layers,this.add(d);const m=new Yn(ss,os,t,i);m.layers=this.layers,this.add(m);const p=new Yn(ss,os,t,i);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const t=this.coordinateSystem,i=this.children.concat(),[r,l,u,h,d,m]=i;for(const p of i)this.remove(p);if(t===ea)r.up.set(0,1,0),r.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),u.up.set(0,0,-1),u.lookAt(0,1,0),h.up.set(0,0,1),h.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(t===vc)r.up.set(0,-1,0),r.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),u.up.set(0,0,1),u.lookAt(0,1,0),h.up.set(0,0,-1),h.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const p of i)this.add(p),p.updateMatrixWorld()}update(t,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:l}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[u,h,d,m,p,g]=this.children,v=t.getRenderTarget(),x=t.getActiveCubeFace(),M=t.getActiveMipmapLevel(),T=t.xr.enabled;t.xr.enabled=!1;const C=r.texture.generateMipmaps;r.texture.generateMipmaps=!1,t.setRenderTarget(r,0,l),t.render(i,u),t.setRenderTarget(r,1,l),t.render(i,h),t.setRenderTarget(r,2,l),t.render(i,d),t.setRenderTarget(r,3,l),t.render(i,m),t.setRenderTarget(r,4,l),t.render(i,p),r.texture.generateMipmaps=C,t.setRenderTarget(r,5,l),t.render(i,g),t.setRenderTarget(v,x,M),t.xr.enabled=T,r.texture.needsPMREMUpdate=!0}}class l0 extends Ln{constructor(t,i,r,l,u,h,d,m,p,g){t=t!==void 0?t:[],i=i!==void 0?i:_s,super(t,i,r,l,u,h,d,m,p,g),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class YS extends gr{constructor(t=1,i={}){super(t,t,i),this.isWebGLCubeRenderTarget=!0;const r={width:t,height:t,depth:1},l=[r,r,r,r,r,r];this.texture=new l0(l,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=i.generateMipmaps!==void 0?i.generateMipmaps:!1,this.texture.minFilter=i.minFilter!==void 0?i.minFilter:Ai}fromEquirectangularTexture(t,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},l=new zo(5,5,5),u=new vi({name:"CubemapFromEquirect",uniforms:Ms(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:Un,blending:La});u.uniforms.tEquirect.value=i;const h=new Bn(l,u),d=i.minFilter;return i.minFilter===pr&&(i.minFilter=Ai),new qS(1,10,this).update(t,h),i.minFilter=d,h.geometry.dispose(),h.material.dispose(),this}clear(t,i,r,l){const u=t.getRenderTarget();for(let h=0;h<6;h++)t.setRenderTarget(this,h),t.clear(i,r,l);t.setRenderTarget(u)}}class ld extends jn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ci,this.environmentIntensity=1,this.environmentRotation=new Ci,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,i){return super.copy(t,i),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const i=super.toJSON(t);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(i.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(i.object.backgroundIntensity=this.backgroundIntensity),i.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(i.object.environmentIntensity=this.environmentIntensity),i.object.environmentRotation=this.environmentRotation.toArray(),i}}const $f=new rt,jS=new rt,ZS=new le;class lr{constructor(t=new rt(1,0,0),i=0){this.isPlane=!0,this.normal=t,this.constant=i}set(t,i){return this.normal.copy(t),this.constant=i,this}setComponents(t,i,r,l){return this.normal.set(t,i,r),this.constant=l,this}setFromNormalAndCoplanarPoint(t,i){return this.normal.copy(t),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(t,i,r){const l=$f.subVectors(r,i).cross(jS.subVectors(t,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,i){return i.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,i){const r=t.delta($f),l=this.normal.dot(r);if(l===0)return this.distanceToPoint(t.start)===0?i.copy(t.start):null;const u=-(t.start.dot(this.normal)+this.constant)/l;return u<0||u>1?null:i.copy(t.start).addScaledVector(r,u)}intersectsLine(t){const i=this.distanceToPoint(t.start),r=this.distanceToPoint(t.end);return i<0&&r>0||r<0&&i>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,i){const r=i||ZS.getNormalMatrix(t),l=this.coplanarPoint($f).applyMatrix4(t),u=this.normal.applyMatrix3(r).normalize();return this.constant=-l.dot(u),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const rr=new od,sc=new rt;class c0{constructor(t=new lr,i=new lr,r=new lr,l=new lr,u=new lr,h=new lr){this.planes=[t,i,r,l,u,h]}set(t,i,r,l,u,h){const d=this.planes;return d[0].copy(t),d[1].copy(i),d[2].copy(r),d[3].copy(l),d[4].copy(u),d[5].copy(h),this}copy(t){const i=this.planes;for(let r=0;r<6;r++)i[r].copy(t.planes[r]);return this}setFromProjectionMatrix(t,i=ea){const r=this.planes,l=t.elements,u=l[0],h=l[1],d=l[2],m=l[3],p=l[4],g=l[5],v=l[6],x=l[7],M=l[8],T=l[9],C=l[10],y=l[11],_=l[12],P=l[13],O=l[14],D=l[15];if(r[0].setComponents(m-u,x-p,y-M,D-_).normalize(),r[1].setComponents(m+u,x+p,y+M,D+_).normalize(),r[2].setComponents(m+h,x+g,y+T,D+P).normalize(),r[3].setComponents(m-h,x-g,y-T,D-P).normalize(),r[4].setComponents(m-d,x-v,y-C,D-O).normalize(),i===ea)r[5].setComponents(m+d,x+v,y+C,D+O).normalize();else if(i===vc)r[5].setComponents(d,v,C,O).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),rr.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const i=t.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),rr.copy(i.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(rr)}intersectsSprite(t){return rr.center.set(0,0,0),rr.radius=.7071067811865476,rr.applyMatrix4(t.matrixWorld),this.intersectsSphere(rr)}intersectsSphere(t){const i=this.planes,r=t.center,l=-t.radius;for(let u=0;u<6;u++)if(i[u].distanceToPoint(r)<l)return!1;return!0}intersectsBox(t){const i=this.planes;for(let r=0;r<6;r++){const l=i[r];if(sc.x=l.normal.x>0?t.max.x:t.min.x,sc.y=l.normal.y>0?t.max.y:t.min.y,sc.z=l.normal.z>0?t.max.z:t.min.z,l.distanceToPoint(sc)<0)return!1}return!0}containsPoint(t){const i=this.planes;for(let r=0;r<6;r++)if(i[r].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class oc extends jn{constructor(){super(),this.isGroup=!0,this.type="Group"}}class u0 extends Ln{constructor(t,i,r,l,u,h,d,m,p,g=ds){if(g!==ds&&g!==Ss)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");r===void 0&&g===ds&&(r=mr),r===void 0&&g===Ss&&(r=xs),super(null,l,u,h,d,m,g,r,p),this.isDepthTexture=!0,this.image={width:t,height:i},this.magFilter=d!==void 0?d:_i,this.minFilter=m!==void 0?m:_i,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const i=super.toJSON(t);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}class Ts extends Pa{constructor(t=1,i=1,r=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:i,widthSegments:r,heightSegments:l};const u=t/2,h=i/2,d=Math.floor(r),m=Math.floor(l),p=d+1,g=m+1,v=t/d,x=i/m,M=[],T=[],C=[],y=[];for(let _=0;_<g;_++){const P=_*x-h;for(let O=0;O<p;O++){const D=O*v-u;T.push(D,-P,0),C.push(0,0,1),y.push(O/d),y.push(1-_/m)}}for(let _=0;_<m;_++)for(let P=0;P<d;P++){const O=P+p*_,D=P+p*(_+1),H=P+1+p*(_+1),F=P+1+p*_;M.push(O,D,F),M.push(D,H,F)}this.setIndex(M),this.setAttribute("position",new wi(T,3)),this.setAttribute("normal",new wi(C,3)),this.setAttribute("uv",new wi(y,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ts(t.width,t.height,t.widthSegments,t.heightSegments)}}class xc extends Pa{constructor(t=1,i=32,r=16,l=0,u=Math.PI*2,h=0,d=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:i,heightSegments:r,phiStart:l,phiLength:u,thetaStart:h,thetaLength:d},i=Math.max(3,Math.floor(i)),r=Math.max(2,Math.floor(r));const m=Math.min(h+d,Math.PI);let p=0;const g=[],v=new rt,x=new rt,M=[],T=[],C=[],y=[];for(let _=0;_<=r;_++){const P=[],O=_/r;let D=0;_===0&&h===0?D=.5/i:_===r&&m===Math.PI&&(D=-.5/i);for(let H=0;H<=i;H++){const F=H/i;v.x=-t*Math.cos(l+F*u)*Math.sin(h+O*d),v.y=t*Math.cos(h+O*d),v.z=t*Math.sin(l+F*u)*Math.sin(h+O*d),T.push(v.x,v.y,v.z),x.copy(v).normalize(),C.push(x.x,x.y,x.z),y.push(F+D,1-O),P.push(p++)}g.push(P)}for(let _=0;_<r;_++)for(let P=0;P<i;P++){const O=g[_][P+1],D=g[_][P],H=g[_+1][P],F=g[_+1][P+1];(_!==0||h>0)&&M.push(O,D,F),(_!==r-1||m<Math.PI)&&M.push(D,H,F)}this.setIndex(M),this.setAttribute("position",new wi(T,3)),this.setAttribute("normal",new wi(C,3)),this.setAttribute("uv",new wi(y,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new xc(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class l_ extends Po{constructor(t){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new ie(16777215),this.specular=new ie(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ie(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=K_,this.normalScale=new Ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ci,this.combine=td,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class KS extends Po{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=uS,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class QS extends Po{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const c_={enabled:!1,files:{},add:function(o,t){this.enabled!==!1&&(this.files[o]=t)},get:function(o){if(this.enabled!==!1)return this.files[o]},remove:function(o){delete this.files[o]},clear:function(){this.files={}}};class JS{constructor(t,i,r){const l=this;let u=!1,h=0,d=0,m;const p=[];this.onStart=void 0,this.onLoad=t,this.onProgress=i,this.onError=r,this.itemStart=function(g){d++,u===!1&&l.onStart!==void 0&&l.onStart(g,h,d),u=!0},this.itemEnd=function(g){h++,l.onProgress!==void 0&&l.onProgress(g,h,d),h===d&&(u=!1,l.onLoad!==void 0&&l.onLoad())},this.itemError=function(g){l.onError!==void 0&&l.onError(g)},this.resolveURL=function(g){return m?m(g):g},this.setURLModifier=function(g){return m=g,this},this.addHandler=function(g,v){return p.push(g,v),this},this.removeHandler=function(g){const v=p.indexOf(g);return v!==-1&&p.splice(v,2),this},this.getHandler=function(g){for(let v=0,x=p.length;v<x;v+=2){const M=p[v],T=p[v+1];if(M.global&&(M.lastIndex=0),M.test(g))return T}return null}}}const $S=new JS;class cd{constructor(t){this.manager=t!==void 0?t:$S,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,i){const r=this;return new Promise(function(l,u){r.load(t,l,i,u)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}cd.DEFAULT_MATERIAL_NAME="__DEFAULT";class ty extends cd{constructor(t){super(t)}load(t,i,r,l){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const u=this,h=c_.get(t);if(h!==void 0)return u.manager.itemStart(t),setTimeout(function(){i&&i(h),u.manager.itemEnd(t)},0),h;const d=Do("img");function m(){g(),c_.add(t,this),i&&i(this),u.manager.itemEnd(t)}function p(v){g(),l&&l(v),u.manager.itemError(t),u.manager.itemEnd(t)}function g(){d.removeEventListener("load",m,!1),d.removeEventListener("error",p,!1)}return d.addEventListener("load",m,!1),d.addEventListener("error",p,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(d.crossOrigin=this.crossOrigin),u.manager.itemStart(t),d.src=t,d}}class ey extends cd{constructor(t){super(t)}load(t,i,r,l){const u=new Ln,h=new ty(this.manager);return h.setCrossOrigin(this.crossOrigin),h.setPath(this.path),h.load(t,function(d){u.image=d,u.needsUpdate=!0,i!==void 0&&i(u)},r,l),u}}class f0 extends o0{constructor(t=-1,i=1,r=1,l=-1,u=.1,h=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=i,this.top=r,this.bottom=l,this.near=u,this.far=h,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,i,r,l,u,h){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=r,this.view.offsetY=l,this.view.width=u,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let u=r-t,h=r+t,d=l+i,m=l-i;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,g=(this.top-this.bottom)/this.view.fullHeight/this.zoom;u+=p*this.view.offsetX,h=u+p*this.view.width,d-=g*this.view.offsetY,m=d-g*this.view.height}this.projectionMatrix.makeOrthographic(u,h,d,m,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}class ny extends Yn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}function u_(o,t,i,r){const l=iy(r);switch(i){case k_:return o*t;case W_:return o*t;case q_:return o*t*2;case Y_:return o*t/l.components*l.byteLength;case ad:return o*t/l.components*l.byteLength;case j_:return o*t*2/l.components*l.byteLength;case rd:return o*t*2/l.components*l.byteLength;case X_:return o*t*3/l.components*l.byteLength;case gi:return o*t*4/l.components*l.byteLength;case sd:return o*t*4/l.components*l.byteLength;case fc:case hc:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*8;case dc:case pc:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*16;case bh:case Rh:return Math.max(o,16)*Math.max(t,8)/4;case Th:case Ah:return Math.max(o,8)*Math.max(t,8)/2;case wh:case Ch:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*8;case Dh:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*16;case Uh:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*16;case Lh:return Math.floor((o+4)/5)*Math.floor((t+3)/4)*16;case Nh:return Math.floor((o+4)/5)*Math.floor((t+4)/5)*16;case Oh:return Math.floor((o+5)/6)*Math.floor((t+4)/5)*16;case Ph:return Math.floor((o+5)/6)*Math.floor((t+5)/6)*16;case zh:return Math.floor((o+7)/8)*Math.floor((t+4)/5)*16;case Fh:return Math.floor((o+7)/8)*Math.floor((t+5)/6)*16;case Bh:return Math.floor((o+7)/8)*Math.floor((t+7)/8)*16;case Ih:return Math.floor((o+9)/10)*Math.floor((t+4)/5)*16;case Hh:return Math.floor((o+9)/10)*Math.floor((t+5)/6)*16;case Gh:return Math.floor((o+9)/10)*Math.floor((t+7)/8)*16;case Vh:return Math.floor((o+9)/10)*Math.floor((t+9)/10)*16;case kh:return Math.floor((o+11)/12)*Math.floor((t+9)/10)*16;case Xh:return Math.floor((o+11)/12)*Math.floor((t+11)/12)*16;case mc:case Wh:case qh:return Math.ceil(o/4)*Math.ceil(t/4)*16;case Z_:case Yh:return Math.ceil(o/4)*Math.ceil(t/4)*8;case jh:case Zh:return Math.ceil(o/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function iy(o){switch(o){case ia:case H_:return{byteLength:1,components:1};case Co:case G_:case Uo:return{byteLength:2,components:1};case nd:case id:return{byteLength:2,components:4};case mr:case ed:case ta:return{byteLength:4,components:1};case V_:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${o}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:$h}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=$h);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function h0(){let o=null,t=!1,i=null,r=null;function l(u,h){i(u,h),r=o.requestAnimationFrame(l)}return{start:function(){t!==!0&&i!==null&&(r=o.requestAnimationFrame(l),t=!0)},stop:function(){o.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(u){i=u},setContext:function(u){o=u}}}function ay(o){const t=new WeakMap;function i(d,m){const p=d.array,g=d.usage,v=p.byteLength,x=o.createBuffer();o.bindBuffer(m,x),o.bufferData(m,p,g),d.onUploadCallback();let M;if(p instanceof Float32Array)M=o.FLOAT;else if(p instanceof Uint16Array)d.isFloat16BufferAttribute?M=o.HALF_FLOAT:M=o.UNSIGNED_SHORT;else if(p instanceof Int16Array)M=o.SHORT;else if(p instanceof Uint32Array)M=o.UNSIGNED_INT;else if(p instanceof Int32Array)M=o.INT;else if(p instanceof Int8Array)M=o.BYTE;else if(p instanceof Uint8Array)M=o.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)M=o.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:x,type:M,bytesPerElement:p.BYTES_PER_ELEMENT,version:d.version,size:v}}function r(d,m,p){const g=m.array,v=m.updateRanges;if(o.bindBuffer(p,d),v.length===0)o.bufferSubData(p,0,g);else{v.sort((M,T)=>M.start-T.start);let x=0;for(let M=1;M<v.length;M++){const T=v[x],C=v[M];C.start<=T.start+T.count+1?T.count=Math.max(T.count,C.start+C.count-T.start):(++x,v[x]=C)}v.length=x+1;for(let M=0,T=v.length;M<T;M++){const C=v[M];o.bufferSubData(p,C.start*g.BYTES_PER_ELEMENT,g,C.start,C.count)}m.clearUpdateRanges()}m.onUploadCallback()}function l(d){return d.isInterleavedBufferAttribute&&(d=d.data),t.get(d)}function u(d){d.isInterleavedBufferAttribute&&(d=d.data);const m=t.get(d);m&&(o.deleteBuffer(m.buffer),t.delete(d))}function h(d,m){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const g=t.get(d);(!g||g.version<d.version)&&t.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const p=t.get(d);if(p===void 0)t.set(d,i(d,m));else if(p.version<d.version){if(p.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(p.buffer,d,m),p.version=d.version}}return{get:l,remove:u,update:h}}var ry=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,sy=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,oy=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ly=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,cy=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,uy=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,fy=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,hy=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,dy=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,py=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,my=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,gy=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,_y=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,vy=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,xy=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Sy=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,yy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,My=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ey=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ty=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,by=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ay=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Ry=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,wy=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Cy=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Dy=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Uy=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ly=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ny=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Oy=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Py="gl_FragColor = linearToOutputTexel( gl_FragColor );",zy=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Fy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,By=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Iy=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Hy=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Gy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Vy=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ky=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Xy=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Wy=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,qy=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Yy=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,jy=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Zy=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ky=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Qy=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Jy=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,$y=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,tM=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,eM=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,nM=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,iM=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,aM=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,rM=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,sM=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,oM=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,lM=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cM=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,uM=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,fM=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,hM=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,dM=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,pM=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,mM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,gM=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,_M=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,vM=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,xM=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,SM=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,yM=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,MM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,EM=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,TM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,AM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,RM=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,wM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,CM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,DM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,UM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,LM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,NM=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,OM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,PM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,zM=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,FM=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,BM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,IM=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,HM=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,GM=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,VM=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,kM=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,XM=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,WM=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,qM=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,YM=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,jM=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ZM=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,KM=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,QM=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,JM=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,$M=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,tE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,eE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,nE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,iE=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const aE=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,rE=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,oE=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cE=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,uE=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,fE=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,hE=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,dE=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,pE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,mE=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gE=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,_E=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,vE=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,xE=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,SE=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yE=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ME=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,EE=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,TE=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,bE=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,AE=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,RE=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wE=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,CE=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,DE=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,UE=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,LE=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,NE=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,OE=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,PE=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,zE=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,FE=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ce={alphahash_fragment:ry,alphahash_pars_fragment:sy,alphamap_fragment:oy,alphamap_pars_fragment:ly,alphatest_fragment:cy,alphatest_pars_fragment:uy,aomap_fragment:fy,aomap_pars_fragment:hy,batching_pars_vertex:dy,batching_vertex:py,begin_vertex:my,beginnormal_vertex:gy,bsdfs:_y,iridescence_fragment:vy,bumpmap_pars_fragment:xy,clipping_planes_fragment:Sy,clipping_planes_pars_fragment:yy,clipping_planes_pars_vertex:My,clipping_planes_vertex:Ey,color_fragment:Ty,color_pars_fragment:by,color_pars_vertex:Ay,color_vertex:Ry,common:wy,cube_uv_reflection_fragment:Cy,defaultnormal_vertex:Dy,displacementmap_pars_vertex:Uy,displacementmap_vertex:Ly,emissivemap_fragment:Ny,emissivemap_pars_fragment:Oy,colorspace_fragment:Py,colorspace_pars_fragment:zy,envmap_fragment:Fy,envmap_common_pars_fragment:By,envmap_pars_fragment:Iy,envmap_pars_vertex:Hy,envmap_physical_pars_fragment:Qy,envmap_vertex:Gy,fog_vertex:Vy,fog_pars_vertex:ky,fog_fragment:Xy,fog_pars_fragment:Wy,gradientmap_pars_fragment:qy,lightmap_pars_fragment:Yy,lights_lambert_fragment:jy,lights_lambert_pars_fragment:Zy,lights_pars_begin:Ky,lights_toon_fragment:Jy,lights_toon_pars_fragment:$y,lights_phong_fragment:tM,lights_phong_pars_fragment:eM,lights_physical_fragment:nM,lights_physical_pars_fragment:iM,lights_fragment_begin:aM,lights_fragment_maps:rM,lights_fragment_end:sM,logdepthbuf_fragment:oM,logdepthbuf_pars_fragment:lM,logdepthbuf_pars_vertex:cM,logdepthbuf_vertex:uM,map_fragment:fM,map_pars_fragment:hM,map_particle_fragment:dM,map_particle_pars_fragment:pM,metalnessmap_fragment:mM,metalnessmap_pars_fragment:gM,morphinstance_vertex:_M,morphcolor_vertex:vM,morphnormal_vertex:xM,morphtarget_pars_vertex:SM,morphtarget_vertex:yM,normal_fragment_begin:MM,normal_fragment_maps:EM,normal_pars_fragment:TM,normal_pars_vertex:bM,normal_vertex:AM,normalmap_pars_fragment:RM,clearcoat_normal_fragment_begin:wM,clearcoat_normal_fragment_maps:CM,clearcoat_pars_fragment:DM,iridescence_pars_fragment:UM,opaque_fragment:LM,packing:NM,premultiplied_alpha_fragment:OM,project_vertex:PM,dithering_fragment:zM,dithering_pars_fragment:FM,roughnessmap_fragment:BM,roughnessmap_pars_fragment:IM,shadowmap_pars_fragment:HM,shadowmap_pars_vertex:GM,shadowmap_vertex:VM,shadowmask_pars_fragment:kM,skinbase_vertex:XM,skinning_pars_vertex:WM,skinning_vertex:qM,skinnormal_vertex:YM,specularmap_fragment:jM,specularmap_pars_fragment:ZM,tonemapping_fragment:KM,tonemapping_pars_fragment:QM,transmission_fragment:JM,transmission_pars_fragment:$M,uv_pars_fragment:tE,uv_pars_vertex:eE,uv_vertex:nE,worldpos_vertex:iE,background_vert:aE,background_frag:rE,backgroundCube_vert:sE,backgroundCube_frag:oE,cube_vert:lE,cube_frag:cE,depth_vert:uE,depth_frag:fE,distanceRGBA_vert:hE,distanceRGBA_frag:dE,equirect_vert:pE,equirect_frag:mE,linedashed_vert:gE,linedashed_frag:_E,meshbasic_vert:vE,meshbasic_frag:xE,meshlambert_vert:SE,meshlambert_frag:yE,meshmatcap_vert:ME,meshmatcap_frag:EE,meshnormal_vert:TE,meshnormal_frag:bE,meshphong_vert:AE,meshphong_frag:RE,meshphysical_vert:wE,meshphysical_frag:CE,meshtoon_vert:DE,meshtoon_frag:UE,points_vert:LE,points_frag:NE,shadow_vert:OE,shadow_frag:PE,sprite_vert:zE,sprite_frag:FE},Ut={common:{diffuse:{value:new ie(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new le},alphaMap:{value:null},alphaMapTransform:{value:new le},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new le}},envmap:{envMap:{value:null},envMapRotation:{value:new le},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new le}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new le}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new le},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new le},normalScale:{value:new Ce(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new le},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new le}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new le}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new le}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ie(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ie(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new le},alphaTest:{value:0},uvTransform:{value:new le}},sprite:{diffuse:{value:new ie(16777215)},opacity:{value:1},center:{value:new Ce(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new le},alphaMap:{value:null},alphaMapTransform:{value:new le},alphaTest:{value:0}}},bi={basic:{uniforms:Dn([Ut.common,Ut.specularmap,Ut.envmap,Ut.aomap,Ut.lightmap,Ut.fog]),vertexShader:ce.meshbasic_vert,fragmentShader:ce.meshbasic_frag},lambert:{uniforms:Dn([Ut.common,Ut.specularmap,Ut.envmap,Ut.aomap,Ut.lightmap,Ut.emissivemap,Ut.bumpmap,Ut.normalmap,Ut.displacementmap,Ut.fog,Ut.lights,{emissive:{value:new ie(0)}}]),vertexShader:ce.meshlambert_vert,fragmentShader:ce.meshlambert_frag},phong:{uniforms:Dn([Ut.common,Ut.specularmap,Ut.envmap,Ut.aomap,Ut.lightmap,Ut.emissivemap,Ut.bumpmap,Ut.normalmap,Ut.displacementmap,Ut.fog,Ut.lights,{emissive:{value:new ie(0)},specular:{value:new ie(1118481)},shininess:{value:30}}]),vertexShader:ce.meshphong_vert,fragmentShader:ce.meshphong_frag},standard:{uniforms:Dn([Ut.common,Ut.envmap,Ut.aomap,Ut.lightmap,Ut.emissivemap,Ut.bumpmap,Ut.normalmap,Ut.displacementmap,Ut.roughnessmap,Ut.metalnessmap,Ut.fog,Ut.lights,{emissive:{value:new ie(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ce.meshphysical_vert,fragmentShader:ce.meshphysical_frag},toon:{uniforms:Dn([Ut.common,Ut.aomap,Ut.lightmap,Ut.emissivemap,Ut.bumpmap,Ut.normalmap,Ut.displacementmap,Ut.gradientmap,Ut.fog,Ut.lights,{emissive:{value:new ie(0)}}]),vertexShader:ce.meshtoon_vert,fragmentShader:ce.meshtoon_frag},matcap:{uniforms:Dn([Ut.common,Ut.bumpmap,Ut.normalmap,Ut.displacementmap,Ut.fog,{matcap:{value:null}}]),vertexShader:ce.meshmatcap_vert,fragmentShader:ce.meshmatcap_frag},points:{uniforms:Dn([Ut.points,Ut.fog]),vertexShader:ce.points_vert,fragmentShader:ce.points_frag},dashed:{uniforms:Dn([Ut.common,Ut.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ce.linedashed_vert,fragmentShader:ce.linedashed_frag},depth:{uniforms:Dn([Ut.common,Ut.displacementmap]),vertexShader:ce.depth_vert,fragmentShader:ce.depth_frag},normal:{uniforms:Dn([Ut.common,Ut.bumpmap,Ut.normalmap,Ut.displacementmap,{opacity:{value:1}}]),vertexShader:ce.meshnormal_vert,fragmentShader:ce.meshnormal_frag},sprite:{uniforms:Dn([Ut.sprite,Ut.fog]),vertexShader:ce.sprite_vert,fragmentShader:ce.sprite_frag},background:{uniforms:{uvTransform:{value:new le},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ce.background_vert,fragmentShader:ce.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new le}},vertexShader:ce.backgroundCube_vert,fragmentShader:ce.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ce.cube_vert,fragmentShader:ce.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ce.equirect_vert,fragmentShader:ce.equirect_frag},distanceRGBA:{uniforms:Dn([Ut.common,Ut.displacementmap,{referencePosition:{value:new rt},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ce.distanceRGBA_vert,fragmentShader:ce.distanceRGBA_frag},shadow:{uniforms:Dn([Ut.lights,Ut.fog,{color:{value:new ie(0)},opacity:{value:1}}]),vertexShader:ce.shadow_vert,fragmentShader:ce.shadow_frag}};bi.physical={uniforms:Dn([bi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new le},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new le},clearcoatNormalScale:{value:new Ce(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new le},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new le},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new le},sheen:{value:0},sheenColor:{value:new ie(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new le},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new le},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new le},transmissionSamplerSize:{value:new Ce},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new le},attenuationDistance:{value:0},attenuationColor:{value:new ie(0)},specularColor:{value:new ie(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new le},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new le},anisotropyVector:{value:new Ce},anisotropyMap:{value:null},anisotropyMapTransform:{value:new le}}]),vertexShader:ce.meshphysical_vert,fragmentShader:ce.meshphysical_frag};const lc={r:0,b:0,g:0},sr=new Ci,BE=new $e;function IE(o,t,i,r,l,u,h){const d=new ie(0);let m=u===!0?0:1,p,g,v=null,x=0,M=null;function T(O){let D=O.isScene===!0?O.background:null;return D&&D.isTexture&&(D=(O.backgroundBlurriness>0?i:t).get(D)),D}function C(O){let D=!1;const H=T(O);H===null?_(d,m):H&&H.isColor&&(_(H,1),D=!0);const F=o.xr.getEnvironmentBlendMode();F==="additive"?r.buffers.color.setClear(0,0,0,1,h):F==="alpha-blend"&&r.buffers.color.setClear(0,0,0,0,h),(o.autoClear||D)&&(r.buffers.depth.setTest(!0),r.buffers.depth.setMask(!0),r.buffers.color.setMask(!0),o.clear(o.autoClearColor,o.autoClearDepth,o.autoClearStencil))}function y(O,D){const H=T(D);H&&(H.isCubeTexture||H.mapping===Sc)?(g===void 0&&(g=new Bn(new zo(1,1,1),new vi({name:"BackgroundCubeMaterial",uniforms:Ms(bi.backgroundCube.uniforms),vertexShader:bi.backgroundCube.vertexShader,fragmentShader:bi.backgroundCube.fragmentShader,side:Un,depthTest:!1,depthWrite:!1,fog:!1})),g.geometry.deleteAttribute("normal"),g.geometry.deleteAttribute("uv"),g.onBeforeRender=function(F,z,K){this.matrixWorld.copyPosition(K.matrixWorld)},Object.defineProperty(g.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),l.update(g)),sr.copy(D.backgroundRotation),sr.x*=-1,sr.y*=-1,sr.z*=-1,H.isCubeTexture&&H.isRenderTargetTexture===!1&&(sr.y*=-1,sr.z*=-1),g.material.uniforms.envMap.value=H,g.material.uniforms.flipEnvMap.value=H.isCubeTexture&&H.isRenderTargetTexture===!1?-1:1,g.material.uniforms.backgroundBlurriness.value=D.backgroundBlurriness,g.material.uniforms.backgroundIntensity.value=D.backgroundIntensity,g.material.uniforms.backgroundRotation.value.setFromMatrix4(BE.makeRotationFromEuler(sr)),g.material.toneMapped=Re.getTransfer(H.colorSpace)!==Pe,(v!==H||x!==H.version||M!==o.toneMapping)&&(g.material.needsUpdate=!0,v=H,x=H.version,M=o.toneMapping),g.layers.enableAll(),O.unshift(g,g.geometry,g.material,0,0,null)):H&&H.isTexture&&(p===void 0&&(p=new Bn(new Ts(2,2),new vi({name:"BackgroundMaterial",uniforms:Ms(bi.background.uniforms),vertexShader:bi.background.vertexShader,fragmentShader:bi.background.fragmentShader,side:Oa,depthTest:!1,depthWrite:!1,fog:!1})),p.geometry.deleteAttribute("normal"),Object.defineProperty(p.material,"map",{get:function(){return this.uniforms.t2D.value}}),l.update(p)),p.material.uniforms.t2D.value=H,p.material.uniforms.backgroundIntensity.value=D.backgroundIntensity,p.material.toneMapped=Re.getTransfer(H.colorSpace)!==Pe,H.matrixAutoUpdate===!0&&H.updateMatrix(),p.material.uniforms.uvTransform.value.copy(H.matrix),(v!==H||x!==H.version||M!==o.toneMapping)&&(p.material.needsUpdate=!0,v=H,x=H.version,M=o.toneMapping),p.layers.enableAll(),O.unshift(p,p.geometry,p.material,0,0,null))}function _(O,D){O.getRGB(lc,s0(o)),r.buffers.color.setClear(lc.r,lc.g,lc.b,D,h)}function P(){g!==void 0&&(g.geometry.dispose(),g.material.dispose()),p!==void 0&&(p.geometry.dispose(),p.material.dispose())}return{getClearColor:function(){return d},setClearColor:function(O,D=1){d.set(O),m=D,_(d,m)},getClearAlpha:function(){return m},setClearAlpha:function(O){m=O,_(d,m)},render:C,addToRenderList:y,dispose:P}}function HE(o,t){const i=o.getParameter(o.MAX_VERTEX_ATTRIBS),r={},l=x(null);let u=l,h=!1;function d(R,I,ct,it,mt){let ht=!1;const W=v(it,ct,I);u!==W&&(u=W,p(u.object)),ht=M(R,it,ct,mt),ht&&T(R,it,ct,mt),mt!==null&&t.update(mt,o.ELEMENT_ARRAY_BUFFER),(ht||h)&&(h=!1,D(R,I,ct,it),mt!==null&&o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,t.get(mt).buffer))}function m(){return o.createVertexArray()}function p(R){return o.bindVertexArray(R)}function g(R){return o.deleteVertexArray(R)}function v(R,I,ct){const it=ct.wireframe===!0;let mt=r[R.id];mt===void 0&&(mt={},r[R.id]=mt);let ht=mt[I.id];ht===void 0&&(ht={},mt[I.id]=ht);let W=ht[it];return W===void 0&&(W=x(m()),ht[it]=W),W}function x(R){const I=[],ct=[],it=[];for(let mt=0;mt<i;mt++)I[mt]=0,ct[mt]=0,it[mt]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:ct,attributeDivisors:it,object:R,attributes:{},index:null}}function M(R,I,ct,it){const mt=u.attributes,ht=I.attributes;let W=0;const at=ct.getAttributes();for(const j in at)if(at[j].location>=0){const L=mt[j];let nt=ht[j];if(nt===void 0&&(j==="instanceMatrix"&&R.instanceMatrix&&(nt=R.instanceMatrix),j==="instanceColor"&&R.instanceColor&&(nt=R.instanceColor)),L===void 0||L.attribute!==nt||nt&&L.data!==nt.data)return!0;W++}return u.attributesNum!==W||u.index!==it}function T(R,I,ct,it){const mt={},ht=I.attributes;let W=0;const at=ct.getAttributes();for(const j in at)if(at[j].location>=0){let L=ht[j];L===void 0&&(j==="instanceMatrix"&&R.instanceMatrix&&(L=R.instanceMatrix),j==="instanceColor"&&R.instanceColor&&(L=R.instanceColor));const nt={};nt.attribute=L,L&&L.data&&(nt.data=L.data),mt[j]=nt,W++}u.attributes=mt,u.attributesNum=W,u.index=it}function C(){const R=u.newAttributes;for(let I=0,ct=R.length;I<ct;I++)R[I]=0}function y(R){_(R,0)}function _(R,I){const ct=u.newAttributes,it=u.enabledAttributes,mt=u.attributeDivisors;ct[R]=1,it[R]===0&&(o.enableVertexAttribArray(R),it[R]=1),mt[R]!==I&&(o.vertexAttribDivisor(R,I),mt[R]=I)}function P(){const R=u.newAttributes,I=u.enabledAttributes;for(let ct=0,it=I.length;ct<it;ct++)I[ct]!==R[ct]&&(o.disableVertexAttribArray(ct),I[ct]=0)}function O(R,I,ct,it,mt,ht,W){W===!0?o.vertexAttribIPointer(R,I,ct,mt,ht):o.vertexAttribPointer(R,I,ct,it,mt,ht)}function D(R,I,ct,it){C();const mt=it.attributes,ht=ct.getAttributes(),W=I.defaultAttributeValues;for(const at in ht){const j=ht[at];if(j.location>=0){let St=mt[at];if(St===void 0&&(at==="instanceMatrix"&&R.instanceMatrix&&(St=R.instanceMatrix),at==="instanceColor"&&R.instanceColor&&(St=R.instanceColor)),St!==void 0){const L=St.normalized,nt=St.itemSize,Et=t.get(St);if(Et===void 0)continue;const At=Et.buffer,q=Et.type,dt=Et.bytesPerElement,xt=q===o.INT||q===o.UNSIGNED_INT||St.gpuType===ed;if(St.isInterleavedBufferAttribute){const Tt=St.data,Rt=Tt.stride,Ft=St.offset;if(Tt.isInstancedInterleavedBuffer){for(let Gt=0;Gt<j.locationSize;Gt++)_(j.location+Gt,Tt.meshPerAttribute);R.isInstancedMesh!==!0&&it._maxInstanceCount===void 0&&(it._maxInstanceCount=Tt.meshPerAttribute*Tt.count)}else for(let Gt=0;Gt<j.locationSize;Gt++)y(j.location+Gt);o.bindBuffer(o.ARRAY_BUFFER,At);for(let Gt=0;Gt<j.locationSize;Gt++)O(j.location+Gt,nt/j.locationSize,q,L,Rt*dt,(Ft+nt/j.locationSize*Gt)*dt,xt)}else{if(St.isInstancedBufferAttribute){for(let Tt=0;Tt<j.locationSize;Tt++)_(j.location+Tt,St.meshPerAttribute);R.isInstancedMesh!==!0&&it._maxInstanceCount===void 0&&(it._maxInstanceCount=St.meshPerAttribute*St.count)}else for(let Tt=0;Tt<j.locationSize;Tt++)y(j.location+Tt);o.bindBuffer(o.ARRAY_BUFFER,At);for(let Tt=0;Tt<j.locationSize;Tt++)O(j.location+Tt,nt/j.locationSize,q,L,nt*dt,nt/j.locationSize*Tt*dt,xt)}}else if(W!==void 0){const L=W[at];if(L!==void 0)switch(L.length){case 2:o.vertexAttrib2fv(j.location,L);break;case 3:o.vertexAttrib3fv(j.location,L);break;case 4:o.vertexAttrib4fv(j.location,L);break;default:o.vertexAttrib1fv(j.location,L)}}}}P()}function H(){K();for(const R in r){const I=r[R];for(const ct in I){const it=I[ct];for(const mt in it)g(it[mt].object),delete it[mt];delete I[ct]}delete r[R]}}function F(R){if(r[R.id]===void 0)return;const I=r[R.id];for(const ct in I){const it=I[ct];for(const mt in it)g(it[mt].object),delete it[mt];delete I[ct]}delete r[R.id]}function z(R){for(const I in r){const ct=r[I];if(ct[R.id]===void 0)continue;const it=ct[R.id];for(const mt in it)g(it[mt].object),delete it[mt];delete ct[R.id]}}function K(){w(),h=!0,u!==l&&(u=l,p(u.object))}function w(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:K,resetDefaultState:w,dispose:H,releaseStatesOfGeometry:F,releaseStatesOfProgram:z,initAttributes:C,enableAttribute:y,disableUnusedAttributes:P}}function GE(o,t,i){let r;function l(p){r=p}function u(p,g){o.drawArrays(r,p,g),i.update(g,r,1)}function h(p,g,v){v!==0&&(o.drawArraysInstanced(r,p,g,v),i.update(g,r,v))}function d(p,g,v){if(v===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,p,0,g,0,v);let M=0;for(let T=0;T<v;T++)M+=g[T];i.update(M,r,1)}function m(p,g,v,x){if(v===0)return;const M=t.get("WEBGL_multi_draw");if(M===null)for(let T=0;T<p.length;T++)h(p[T],g[T],x[T]);else{M.multiDrawArraysInstancedWEBGL(r,p,0,g,0,x,0,v);let T=0;for(let C=0;C<v;C++)T+=g[C]*x[C];i.update(T,r,1)}}this.setMode=l,this.render=u,this.renderInstances=h,this.renderMultiDraw=d,this.renderMultiDrawInstances=m}function VE(o,t,i,r){let l;function u(){if(l!==void 0)return l;if(t.has("EXT_texture_filter_anisotropic")===!0){const z=t.get("EXT_texture_filter_anisotropic");l=o.getParameter(z.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function h(z){return!(z!==gi&&r.convert(z)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(z){const K=z===Uo&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(z!==ia&&r.convert(z)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_TYPE)&&z!==ta&&!K)}function m(z){if(z==="highp"){if(o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.HIGH_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.HIGH_FLOAT).precision>0)return"highp";z="mediump"}return z==="mediump"&&o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.MEDIUM_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=i.precision!==void 0?i.precision:"highp";const g=m(p);g!==p&&(console.warn("THREE.WebGLRenderer:",p,"not supported, using",g,"instead."),p=g);const v=i.logarithmicDepthBuffer===!0,x=i.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),M=o.getParameter(o.MAX_TEXTURE_IMAGE_UNITS),T=o.getParameter(o.MAX_VERTEX_TEXTURE_IMAGE_UNITS),C=o.getParameter(o.MAX_TEXTURE_SIZE),y=o.getParameter(o.MAX_CUBE_MAP_TEXTURE_SIZE),_=o.getParameter(o.MAX_VERTEX_ATTRIBS),P=o.getParameter(o.MAX_VERTEX_UNIFORM_VECTORS),O=o.getParameter(o.MAX_VARYING_VECTORS),D=o.getParameter(o.MAX_FRAGMENT_UNIFORM_VECTORS),H=T>0,F=o.getParameter(o.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:u,getMaxPrecision:m,textureFormatReadable:h,textureTypeReadable:d,precision:p,logarithmicDepthBuffer:v,reverseDepthBuffer:x,maxTextures:M,maxVertexTextures:T,maxTextureSize:C,maxCubemapSize:y,maxAttributes:_,maxVertexUniforms:P,maxVaryings:O,maxFragmentUniforms:D,vertexTextures:H,maxSamples:F}}function kE(o){const t=this;let i=null,r=0,l=!1,u=!1;const h=new lr,d=new le,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(v,x){const M=v.length!==0||x||r!==0||l;return l=x,r=v.length,M},this.beginShadows=function(){u=!0,g(null)},this.endShadows=function(){u=!1},this.setGlobalState=function(v,x){i=g(v,x,0)},this.setState=function(v,x,M){const T=v.clippingPlanes,C=v.clipIntersection,y=v.clipShadows,_=o.get(v);if(!l||T===null||T.length===0||u&&!y)u?g(null):p();else{const P=u?0:r,O=P*4;let D=_.clippingState||null;m.value=D,D=g(T,x,O,M);for(let H=0;H!==O;++H)D[H]=i[H];_.clippingState=D,this.numIntersection=C?this.numPlanes:0,this.numPlanes+=P}};function p(){m.value!==i&&(m.value=i,m.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function g(v,x,M,T){const C=v!==null?v.length:0;let y=null;if(C!==0){if(y=m.value,T!==!0||y===null){const _=M+C*4,P=x.matrixWorldInverse;d.getNormalMatrix(P),(y===null||y.length<_)&&(y=new Float32Array(_));for(let O=0,D=M;O!==C;++O,D+=4)h.copy(v[O]).applyMatrix4(P,d),h.normal.toArray(y,D),y[D+3]=h.constant}m.value=y,m.needsUpdate=!0}return t.numPlanes=C,t.numIntersection=0,y}}function XE(o){let t=new WeakMap;function i(h,d){return d===Sh?h.mapping=_s:d===yh&&(h.mapping=vs),h}function r(h){if(h&&h.isTexture){const d=h.mapping;if(d===Sh||d===yh)if(t.has(h)){const m=t.get(h).texture;return i(m,h.mapping)}else{const m=h.image;if(m&&m.height>0){const p=new YS(m.height);return p.fromEquirectangularTexture(o,h),t.set(h,p),h.addEventListener("dispose",l),i(p.texture,h.mapping)}else return null}}return h}function l(h){const d=h.target;d.removeEventListener("dispose",l);const m=t.get(d);m!==void 0&&(t.delete(d),m.dispose())}function u(){t=new WeakMap}return{get:r,dispose:u}}const us=4,f_=[.125,.215,.35,.446,.526,.582],fr=20,th=new f0,h_=new ie;let eh=null,nh=0,ih=0,ah=!1;const cr=(1+Math.sqrt(5))/2,ls=1/cr,d_=[new rt(-cr,ls,0),new rt(cr,ls,0),new rt(-ls,0,cr),new rt(ls,0,cr),new rt(0,cr,-ls),new rt(0,cr,ls),new rt(-1,1,-1),new rt(1,1,-1),new rt(-1,1,1),new rt(1,1,1)];class p_{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,i=0,r=.1,l=100){eh=this._renderer.getRenderTarget(),nh=this._renderer.getActiveCubeFace(),ih=this._renderer.getActiveMipmapLevel(),ah=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const u=this._allocateTargets();return u.depthBuffer=!0,this._sceneToCubeUV(t,r,l,u),i>0&&this._blur(u,0,0,i),this._applyPMREM(u),this._cleanup(u),u}fromEquirectangular(t,i=null){return this._fromTexture(t,i)}fromCubemap(t,i=null){return this._fromTexture(t,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=__(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=g_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(eh,nh,ih),this._renderer.xr.enabled=ah,t.scissorTest=!1,cc(t,0,0,t.width,t.height)}_fromTexture(t,i){t.mapping===_s||t.mapping===vs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),eh=this._renderer.getRenderTarget(),nh=this._renderer.getActiveCubeFace(),ih=this._renderer.getActiveMipmapLevel(),ah=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const r=i||this._allocateTargets();return this._textureToCubeUV(t,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,r={magFilter:Ai,minFilter:Ai,generateMipmaps:!1,type:Uo,format:gi,colorSpace:ys,depthBuffer:!1},l=m_(t,i,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=m_(t,i,r);const{_lodMax:u}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=WE(u)),this._blurMaterial=qE(u,t,i)}return l}_compileMaterial(t){const i=new Bn(this._lodPlanes[0],t);this._renderer.compile(i,th)}_sceneToCubeUV(t,i,r,l){const d=new Yn(90,1,i,r),m=[1,-1,1,1,1,1],p=[1,1,1,-1,-1,-1],g=this._renderer,v=g.autoClear,x=g.toneMapping;g.getClearColor(h_),g.toneMapping=Na,g.autoClear=!1;const M=new i0({name:"PMREM.Background",side:Un,depthWrite:!1,depthTest:!1}),T=new Bn(new zo,M);let C=!1;const y=t.background;y?y.isColor&&(M.color.copy(y),t.background=null,C=!0):(M.color.copy(h_),C=!0);for(let _=0;_<6;_++){const P=_%3;P===0?(d.up.set(0,m[_],0),d.lookAt(p[_],0,0)):P===1?(d.up.set(0,0,m[_]),d.lookAt(0,p[_],0)):(d.up.set(0,m[_],0),d.lookAt(0,0,p[_]));const O=this._cubeSize;cc(l,P*O,_>2?O:0,O,O),g.setRenderTarget(l),C&&g.render(T,d),g.render(t,d)}T.geometry.dispose(),T.material.dispose(),g.toneMapping=x,g.autoClear=v,t.background=y}_textureToCubeUV(t,i){const r=this._renderer,l=t.mapping===_s||t.mapping===vs;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=__()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=g_());const u=l?this._cubemapMaterial:this._equirectMaterial,h=new Bn(this._lodPlanes[0],u),d=u.uniforms;d.envMap.value=t;const m=this._cubeSize;cc(i,0,0,3*m,2*m),r.setRenderTarget(i),r.render(h,th)}_applyPMREM(t){const i=this._renderer,r=i.autoClear;i.autoClear=!1;const l=this._lodPlanes.length;for(let u=1;u<l;u++){const h=Math.sqrt(this._sigmas[u]*this._sigmas[u]-this._sigmas[u-1]*this._sigmas[u-1]),d=d_[(l-u-1)%d_.length];this._blur(t,u-1,u,h,d)}i.autoClear=r}_blur(t,i,r,l,u){const h=this._pingPongRenderTarget;this._halfBlur(t,h,i,r,l,"latitudinal",u),this._halfBlur(h,t,r,r,l,"longitudinal",u)}_halfBlur(t,i,r,l,u,h,d){const m=this._renderer,p=this._blurMaterial;h!=="latitudinal"&&h!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const g=3,v=new Bn(this._lodPlanes[l],p),x=p.uniforms,M=this._sizeLods[r]-1,T=isFinite(u)?Math.PI/(2*M):2*Math.PI/(2*fr-1),C=u/T,y=isFinite(u)?1+Math.floor(g*C):fr;y>fr&&console.warn(`sigmaRadians, ${u}, is too large and will clip, as it requested ${y} samples when the maximum is set to ${fr}`);const _=[];let P=0;for(let z=0;z<fr;++z){const K=z/C,w=Math.exp(-K*K/2);_.push(w),z===0?P+=w:z<y&&(P+=2*w)}for(let z=0;z<_.length;z++)_[z]=_[z]/P;x.envMap.value=t.texture,x.samples.value=y,x.weights.value=_,x.latitudinal.value=h==="latitudinal",d&&(x.poleAxis.value=d);const{_lodMax:O}=this;x.dTheta.value=T,x.mipInt.value=O-r;const D=this._sizeLods[l],H=3*D*(l>O-us?l-O+us:0),F=4*(this._cubeSize-D);cc(i,H,F,3*D,2*D),m.setRenderTarget(i),m.render(v,th)}}function WE(o){const t=[],i=[],r=[];let l=o;const u=o-us+1+f_.length;for(let h=0;h<u;h++){const d=Math.pow(2,l);i.push(d);let m=1/d;h>o-us?m=f_[h-o+us-1]:h===0&&(m=0),r.push(m);const p=1/(d-2),g=-p,v=1+p,x=[g,g,v,g,v,v,g,g,v,v,g,v],M=6,T=6,C=3,y=2,_=1,P=new Float32Array(C*T*M),O=new Float32Array(y*T*M),D=new Float32Array(_*T*M);for(let F=0;F<M;F++){const z=F%3*2/3-1,K=F>2?0:-1,w=[z,K,0,z+2/3,K,0,z+2/3,K+1,0,z,K,0,z+2/3,K+1,0,z,K+1,0];P.set(w,C*T*F),O.set(x,y*T*F);const R=[F,F,F,F,F,F];D.set(R,_*T*F)}const H=new Pa;H.setAttribute("position",new Ri(P,C)),H.setAttribute("uv",new Ri(O,y)),H.setAttribute("faceIndex",new Ri(D,_)),t.push(H),l>us&&l--}return{lodPlanes:t,sizeLods:i,sigmas:r}}function m_(o,t,i){const r=new gr(o,t,i);return r.texture.mapping=Sc,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function cc(o,t,i,r,l){o.viewport.set(t,i,r,l),o.scissor.set(t,i,r,l)}function qE(o,t,i){const r=new Float32Array(fr),l=new rt(0,1,0);return new vi({name:"SphericalGaussianBlur",defines:{n:fr,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:ud(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:La,depthTest:!1,depthWrite:!1})}function g_(){return new vi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ud(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:La,depthTest:!1,depthWrite:!1})}function __(){return new vi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ud(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:La,depthTest:!1,depthWrite:!1})}function ud(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function YE(o){let t=new WeakMap,i=null;function r(d){if(d&&d.isTexture){const m=d.mapping,p=m===Sh||m===yh,g=m===_s||m===vs;if(p||g){let v=t.get(d);const x=v!==void 0?v.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==x)return i===null&&(i=new p_(o)),v=p?i.fromEquirectangular(d,v):i.fromCubemap(d,v),v.texture.pmremVersion=d.pmremVersion,t.set(d,v),v.texture;if(v!==void 0)return v.texture;{const M=d.image;return p&&M&&M.height>0||g&&M&&l(M)?(i===null&&(i=new p_(o)),v=p?i.fromEquirectangular(d):i.fromCubemap(d),v.texture.pmremVersion=d.pmremVersion,t.set(d,v),d.addEventListener("dispose",u),v.texture):null}}}return d}function l(d){let m=0;const p=6;for(let g=0;g<p;g++)d[g]!==void 0&&m++;return m===p}function u(d){const m=d.target;m.removeEventListener("dispose",u);const p=t.get(m);p!==void 0&&(t.delete(m),p.dispose())}function h(){t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:h}}function jE(o){const t={};function i(r){if(t[r]!==void 0)return t[r];let l;switch(r){case"WEBGL_depth_texture":l=o.getExtension("WEBGL_depth_texture")||o.getExtension("MOZ_WEBGL_depth_texture")||o.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":l=o.getExtension("EXT_texture_filter_anisotropic")||o.getExtension("MOZ_EXT_texture_filter_anisotropic")||o.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":l=o.getExtension("WEBGL_compressed_texture_s3tc")||o.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||o.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":l=o.getExtension("WEBGL_compressed_texture_pvrtc")||o.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:l=o.getExtension(r)}return t[r]=l,l}return{has:function(r){return i(r)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(r){const l=i(r);return l===null&&cs("THREE.WebGLRenderer: "+r+" extension not supported."),l}}}function ZE(o,t,i,r){const l={},u=new WeakMap;function h(v){const x=v.target;x.index!==null&&t.remove(x.index);for(const T in x.attributes)t.remove(x.attributes[T]);x.removeEventListener("dispose",h),delete l[x.id];const M=u.get(x);M&&(t.remove(M),u.delete(x)),r.releaseStatesOfGeometry(x),x.isInstancedBufferGeometry===!0&&delete x._maxInstanceCount,i.memory.geometries--}function d(v,x){return l[x.id]===!0||(x.addEventListener("dispose",h),l[x.id]=!0,i.memory.geometries++),x}function m(v){const x=v.attributes;for(const M in x)t.update(x[M],o.ARRAY_BUFFER)}function p(v){const x=[],M=v.index,T=v.attributes.position;let C=0;if(M!==null){const P=M.array;C=M.version;for(let O=0,D=P.length;O<D;O+=3){const H=P[O+0],F=P[O+1],z=P[O+2];x.push(H,F,F,z,z,H)}}else if(T!==void 0){const P=T.array;C=T.version;for(let O=0,D=P.length/3-1;O<D;O+=3){const H=O+0,F=O+1,z=O+2;x.push(H,F,F,z,z,H)}}else return;const y=new(J_(x)?r0:a0)(x,1);y.version=C;const _=u.get(v);_&&t.remove(_),u.set(v,y)}function g(v){const x=u.get(v);if(x){const M=v.index;M!==null&&x.version<M.version&&p(v)}else p(v);return u.get(v)}return{get:d,update:m,getWireframeAttribute:g}}function KE(o,t,i){let r;function l(x){r=x}let u,h;function d(x){u=x.type,h=x.bytesPerElement}function m(x,M){o.drawElements(r,M,u,x*h),i.update(M,r,1)}function p(x,M,T){T!==0&&(o.drawElementsInstanced(r,M,u,x*h,T),i.update(M,r,T))}function g(x,M,T){if(T===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,M,0,u,x,0,T);let y=0;for(let _=0;_<T;_++)y+=M[_];i.update(y,r,1)}function v(x,M,T,C){if(T===0)return;const y=t.get("WEBGL_multi_draw");if(y===null)for(let _=0;_<x.length;_++)p(x[_]/h,M[_],C[_]);else{y.multiDrawElementsInstancedWEBGL(r,M,0,u,x,0,C,0,T);let _=0;for(let P=0;P<T;P++)_+=M[P]*C[P];i.update(_,r,1)}}this.setMode=l,this.setIndex=d,this.render=m,this.renderInstances=p,this.renderMultiDraw=g,this.renderMultiDrawInstances=v}function QE(o){const t={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function r(u,h,d){switch(i.calls++,h){case o.TRIANGLES:i.triangles+=d*(u/3);break;case o.LINES:i.lines+=d*(u/2);break;case o.LINE_STRIP:i.lines+=d*(u-1);break;case o.LINE_LOOP:i.lines+=d*u;break;case o.POINTS:i.points+=d*u;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",h);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:t,render:i,programs:null,autoReset:!0,reset:l,update:r}}function JE(o,t,i){const r=new WeakMap,l=new je;function u(h,d,m){const p=h.morphTargetInfluences,g=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,v=g!==void 0?g.length:0;let x=r.get(d);if(x===void 0||x.count!==v){let R=function(){K.dispose(),r.delete(d),d.removeEventListener("dispose",R)};var M=R;x!==void 0&&x.texture.dispose();const T=d.morphAttributes.position!==void 0,C=d.morphAttributes.normal!==void 0,y=d.morphAttributes.color!==void 0,_=d.morphAttributes.position||[],P=d.morphAttributes.normal||[],O=d.morphAttributes.color||[];let D=0;T===!0&&(D=1),C===!0&&(D=2),y===!0&&(D=3);let H=d.attributes.position.count*D,F=1;H>t.maxTextureSize&&(F=Math.ceil(H/t.maxTextureSize),H=t.maxTextureSize);const z=new Float32Array(H*F*4*v),K=new t0(z,H,F,v);K.type=ta,K.needsUpdate=!0;const w=D*4;for(let I=0;I<v;I++){const ct=_[I],it=P[I],mt=O[I],ht=H*F*4*I;for(let W=0;W<ct.count;W++){const at=W*w;T===!0&&(l.fromBufferAttribute(ct,W),z[ht+at+0]=l.x,z[ht+at+1]=l.y,z[ht+at+2]=l.z,z[ht+at+3]=0),C===!0&&(l.fromBufferAttribute(it,W),z[ht+at+4]=l.x,z[ht+at+5]=l.y,z[ht+at+6]=l.z,z[ht+at+7]=0),y===!0&&(l.fromBufferAttribute(mt,W),z[ht+at+8]=l.x,z[ht+at+9]=l.y,z[ht+at+10]=l.z,z[ht+at+11]=mt.itemSize===4?l.w:1)}}x={count:v,texture:K,size:new Ce(H,F)},r.set(d,x),d.addEventListener("dispose",R)}if(h.isInstancedMesh===!0&&h.morphTexture!==null)m.getUniforms().setValue(o,"morphTexture",h.morphTexture,i);else{let T=0;for(let y=0;y<p.length;y++)T+=p[y];const C=d.morphTargetsRelative?1:1-T;m.getUniforms().setValue(o,"morphTargetBaseInfluence",C),m.getUniforms().setValue(o,"morphTargetInfluences",p)}m.getUniforms().setValue(o,"morphTargetsTexture",x.texture,i),m.getUniforms().setValue(o,"morphTargetsTextureSize",x.size)}return{update:u}}function $E(o,t,i,r){let l=new WeakMap;function u(m){const p=r.render.frame,g=m.geometry,v=t.get(m,g);if(l.get(v)!==p&&(t.update(v),l.set(v,p)),m.isInstancedMesh&&(m.hasEventListener("dispose",d)===!1&&m.addEventListener("dispose",d),l.get(m)!==p&&(i.update(m.instanceMatrix,o.ARRAY_BUFFER),m.instanceColor!==null&&i.update(m.instanceColor,o.ARRAY_BUFFER),l.set(m,p))),m.isSkinnedMesh){const x=m.skeleton;l.get(x)!==p&&(x.update(),l.set(x,p))}return v}function h(){l=new WeakMap}function d(m){const p=m.target;p.removeEventListener("dispose",d),i.remove(p.instanceMatrix),p.instanceColor!==null&&i.remove(p.instanceColor)}return{update:u,dispose:h}}const d0=new Ln,v_=new u0(1,1),p0=new t0,m0=new DS,g0=new l0,x_=[],S_=[],y_=new Float32Array(16),M_=new Float32Array(9),E_=new Float32Array(4);function bs(o,t,i){const r=o[0];if(r<=0||r>0)return o;const l=t*i;let u=x_[l];if(u===void 0&&(u=new Float32Array(l),x_[l]=u),t!==0){r.toArray(u,0);for(let h=1,d=0;h!==t;++h)d+=i,o[h].toArray(u,d)}return u}function on(o,t){if(o.length!==t.length)return!1;for(let i=0,r=o.length;i<r;i++)if(o[i]!==t[i])return!1;return!0}function ln(o,t){for(let i=0,r=t.length;i<r;i++)o[i]=t[i]}function yc(o,t){let i=S_[t];i===void 0&&(i=new Int32Array(t),S_[t]=i);for(let r=0;r!==t;++r)i[r]=o.allocateTextureUnit();return i}function tT(o,t){const i=this.cache;i[0]!==t&&(o.uniform1f(this.addr,t),i[0]=t)}function eT(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(o.uniform2f(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(on(i,t))return;o.uniform2fv(this.addr,t),ln(i,t)}}function nT(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(o.uniform3f(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else if(t.r!==void 0)(i[0]!==t.r||i[1]!==t.g||i[2]!==t.b)&&(o.uniform3f(this.addr,t.r,t.g,t.b),i[0]=t.r,i[1]=t.g,i[2]=t.b);else{if(on(i,t))return;o.uniform3fv(this.addr,t),ln(i,t)}}function iT(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(o.uniform4f(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(on(i,t))return;o.uniform4fv(this.addr,t),ln(i,t)}}function aT(o,t){const i=this.cache,r=t.elements;if(r===void 0){if(on(i,t))return;o.uniformMatrix2fv(this.addr,!1,t),ln(i,t)}else{if(on(i,r))return;E_.set(r),o.uniformMatrix2fv(this.addr,!1,E_),ln(i,r)}}function rT(o,t){const i=this.cache,r=t.elements;if(r===void 0){if(on(i,t))return;o.uniformMatrix3fv(this.addr,!1,t),ln(i,t)}else{if(on(i,r))return;M_.set(r),o.uniformMatrix3fv(this.addr,!1,M_),ln(i,r)}}function sT(o,t){const i=this.cache,r=t.elements;if(r===void 0){if(on(i,t))return;o.uniformMatrix4fv(this.addr,!1,t),ln(i,t)}else{if(on(i,r))return;y_.set(r),o.uniformMatrix4fv(this.addr,!1,y_),ln(i,r)}}function oT(o,t){const i=this.cache;i[0]!==t&&(o.uniform1i(this.addr,t),i[0]=t)}function lT(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(o.uniform2i(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(on(i,t))return;o.uniform2iv(this.addr,t),ln(i,t)}}function cT(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(o.uniform3i(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(on(i,t))return;o.uniform3iv(this.addr,t),ln(i,t)}}function uT(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(o.uniform4i(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(on(i,t))return;o.uniform4iv(this.addr,t),ln(i,t)}}function fT(o,t){const i=this.cache;i[0]!==t&&(o.uniform1ui(this.addr,t),i[0]=t)}function hT(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(o.uniform2ui(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(on(i,t))return;o.uniform2uiv(this.addr,t),ln(i,t)}}function dT(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(o.uniform3ui(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(on(i,t))return;o.uniform3uiv(this.addr,t),ln(i,t)}}function pT(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(o.uniform4ui(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(on(i,t))return;o.uniform4uiv(this.addr,t),ln(i,t)}}function mT(o,t,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(o.uniform1i(this.addr,l),r[0]=l);let u;this.type===o.SAMPLER_2D_SHADOW?(v_.compareFunction=Q_,u=v_):u=d0,i.setTexture2D(t||u,l)}function gT(o,t,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(o.uniform1i(this.addr,l),r[0]=l),i.setTexture3D(t||m0,l)}function _T(o,t,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(o.uniform1i(this.addr,l),r[0]=l),i.setTextureCube(t||g0,l)}function vT(o,t,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(o.uniform1i(this.addr,l),r[0]=l),i.setTexture2DArray(t||p0,l)}function xT(o){switch(o){case 5126:return tT;case 35664:return eT;case 35665:return nT;case 35666:return iT;case 35674:return aT;case 35675:return rT;case 35676:return sT;case 5124:case 35670:return oT;case 35667:case 35671:return lT;case 35668:case 35672:return cT;case 35669:case 35673:return uT;case 5125:return fT;case 36294:return hT;case 36295:return dT;case 36296:return pT;case 35678:case 36198:case 36298:case 36306:case 35682:return mT;case 35679:case 36299:case 36307:return gT;case 35680:case 36300:case 36308:case 36293:return _T;case 36289:case 36303:case 36311:case 36292:return vT}}function ST(o,t){o.uniform1fv(this.addr,t)}function yT(o,t){const i=bs(t,this.size,2);o.uniform2fv(this.addr,i)}function MT(o,t){const i=bs(t,this.size,3);o.uniform3fv(this.addr,i)}function ET(o,t){const i=bs(t,this.size,4);o.uniform4fv(this.addr,i)}function TT(o,t){const i=bs(t,this.size,4);o.uniformMatrix2fv(this.addr,!1,i)}function bT(o,t){const i=bs(t,this.size,9);o.uniformMatrix3fv(this.addr,!1,i)}function AT(o,t){const i=bs(t,this.size,16);o.uniformMatrix4fv(this.addr,!1,i)}function RT(o,t){o.uniform1iv(this.addr,t)}function wT(o,t){o.uniform2iv(this.addr,t)}function CT(o,t){o.uniform3iv(this.addr,t)}function DT(o,t){o.uniform4iv(this.addr,t)}function UT(o,t){o.uniform1uiv(this.addr,t)}function LT(o,t){o.uniform2uiv(this.addr,t)}function NT(o,t){o.uniform3uiv(this.addr,t)}function OT(o,t){o.uniform4uiv(this.addr,t)}function PT(o,t,i){const r=this.cache,l=t.length,u=yc(i,l);on(r,u)||(o.uniform1iv(this.addr,u),ln(r,u));for(let h=0;h!==l;++h)i.setTexture2D(t[h]||d0,u[h])}function zT(o,t,i){const r=this.cache,l=t.length,u=yc(i,l);on(r,u)||(o.uniform1iv(this.addr,u),ln(r,u));for(let h=0;h!==l;++h)i.setTexture3D(t[h]||m0,u[h])}function FT(o,t,i){const r=this.cache,l=t.length,u=yc(i,l);on(r,u)||(o.uniform1iv(this.addr,u),ln(r,u));for(let h=0;h!==l;++h)i.setTextureCube(t[h]||g0,u[h])}function BT(o,t,i){const r=this.cache,l=t.length,u=yc(i,l);on(r,u)||(o.uniform1iv(this.addr,u),ln(r,u));for(let h=0;h!==l;++h)i.setTexture2DArray(t[h]||p0,u[h])}function IT(o){switch(o){case 5126:return ST;case 35664:return yT;case 35665:return MT;case 35666:return ET;case 35674:return TT;case 35675:return bT;case 35676:return AT;case 5124:case 35670:return RT;case 35667:case 35671:return wT;case 35668:case 35672:return CT;case 35669:case 35673:return DT;case 5125:return UT;case 36294:return LT;case 36295:return NT;case 36296:return OT;case 35678:case 36198:case 36298:case 36306:case 35682:return PT;case 35679:case 36299:case 36307:return zT;case 35680:case 36300:case 36308:case 36293:return FT;case 36289:case 36303:case 36311:case 36292:return BT}}class HT{constructor(t,i,r){this.id=t,this.addr=r,this.cache=[],this.type=i.type,this.setValue=xT(i.type)}}class GT{constructor(t,i,r){this.id=t,this.addr=r,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=IT(i.type)}}class VT{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,i,r){const l=this.seq;for(let u=0,h=l.length;u!==h;++u){const d=l[u];d.setValue(t,i[d.id],r)}}}const rh=/(\w+)(\])?(\[|\.)?/g;function T_(o,t){o.seq.push(t),o.map[t.id]=t}function kT(o,t,i){const r=o.name,l=r.length;for(rh.lastIndex=0;;){const u=rh.exec(r),h=rh.lastIndex;let d=u[1];const m=u[2]==="]",p=u[3];if(m&&(d=d|0),p===void 0||p==="["&&h+2===l){T_(i,p===void 0?new HT(d,o,t):new GT(d,o,t));break}else{let v=i.map[d];v===void 0&&(v=new VT(d),T_(i,v)),i=v}}}class gc{constructor(t,i){this.seq=[],this.map={};const r=t.getProgramParameter(i,t.ACTIVE_UNIFORMS);for(let l=0;l<r;++l){const u=t.getActiveUniform(i,l),h=t.getUniformLocation(i,u.name);kT(u,h,this)}}setValue(t,i,r,l){const u=this.map[i];u!==void 0&&u.setValue(t,r,l)}setOptional(t,i,r){const l=i[r];l!==void 0&&this.setValue(t,r,l)}static upload(t,i,r,l){for(let u=0,h=i.length;u!==h;++u){const d=i[u],m=r[d.id];m.needsUpdate!==!1&&d.setValue(t,m.value,l)}}static seqWithValue(t,i){const r=[];for(let l=0,u=t.length;l!==u;++l){const h=t[l];h.id in i&&r.push(h)}return r}}function b_(o,t,i){const r=o.createShader(t);return o.shaderSource(r,i),o.compileShader(r),r}const XT=37297;let WT=0;function qT(o,t){const i=o.split(`
`),r=[],l=Math.max(t-6,0),u=Math.min(t+6,i.length);for(let h=l;h<u;h++){const d=h+1;r.push(`${d===t?">":" "} ${d}: ${i[h]}`)}return r.join(`
`)}const A_=new le;function YT(o){Re._getMatrix(A_,Re.workingColorSpace,o);const t=`mat3( ${A_.elements.map(i=>i.toFixed(4))} )`;switch(Re.getTransfer(o)){case _c:return[t,"LinearTransferOETF"];case Pe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",o),[t,"LinearTransferOETF"]}}function R_(o,t,i){const r=o.getShaderParameter(t,o.COMPILE_STATUS),l=o.getShaderInfoLog(t).trim();if(r&&l==="")return"";const u=/ERROR: 0:(\d+)/.exec(l);if(u){const h=parseInt(u[1]);return i.toUpperCase()+`

`+l+`

`+qT(o.getShaderSource(t),h)}else return l}function jT(o,t){const i=YT(t);return[`vec4 ${o}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}function ZT(o,t){let i;switch(t){case nS:i="Linear";break;case iS:i="Reinhard";break;case aS:i="Cineon";break;case rS:i="ACESFilmic";break;case oS:i="AgX";break;case lS:i="Neutral";break;case sS:i="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),i="Linear"}return"vec3 "+o+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const uc=new rt;function KT(){Re.getLuminanceCoefficients(uc);const o=uc.x.toFixed(4),t=uc.y.toFixed(4),i=uc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${o}, ${t}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function QT(o){return[o.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",o.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(wo).join(`
`)}function JT(o){const t=[];for(const i in o){const r=o[i];r!==!1&&t.push("#define "+i+" "+r)}return t.join(`
`)}function $T(o,t){const i={},r=o.getProgramParameter(t,o.ACTIVE_ATTRIBUTES);for(let l=0;l<r;l++){const u=o.getActiveAttrib(t,l),h=u.name;let d=1;u.type===o.FLOAT_MAT2&&(d=2),u.type===o.FLOAT_MAT3&&(d=3),u.type===o.FLOAT_MAT4&&(d=4),i[h]={type:u.type,location:o.getAttribLocation(t,h),locationSize:d}}return i}function wo(o){return o!==""}function w_(o,t){const i=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return o.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function C_(o,t){return o.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const tb=/^[ \t]*#include +<([\w\d./]+)>/gm;function Qh(o){return o.replace(tb,nb)}const eb=new Map;function nb(o,t){let i=ce[t];if(i===void 0){const r=eb.get(t);if(r!==void 0)i=ce[r],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,r);else throw new Error("Can not resolve #include <"+t+">")}return Qh(i)}const ib=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function D_(o){return o.replace(ib,ab)}function ab(o,t,i,r){let l="";for(let u=parseInt(t);u<parseInt(i);u++)l+=r.replace(/\[\s*i\s*\]/g,"[ "+u+" ]").replace(/UNROLLED_LOOP_INDEX/g,u);return l}function U_(o){let t=`precision ${o.precision} float;
	precision ${o.precision} int;
	precision ${o.precision} sampler2D;
	precision ${o.precision} samplerCube;
	precision ${o.precision} sampler3D;
	precision ${o.precision} sampler2DArray;
	precision ${o.precision} sampler2DShadow;
	precision ${o.precision} samplerCubeShadow;
	precision ${o.precision} sampler2DArrayShadow;
	precision ${o.precision} isampler2D;
	precision ${o.precision} isampler3D;
	precision ${o.precision} isamplerCube;
	precision ${o.precision} isampler2DArray;
	precision ${o.precision} usampler2D;
	precision ${o.precision} usampler3D;
	precision ${o.precision} usamplerCube;
	precision ${o.precision} usampler2DArray;
	`;return o.precision==="highp"?t+=`
#define HIGH_PRECISION`:o.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:o.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function rb(o){let t="SHADOWMAP_TYPE_BASIC";return o.shadowMapType===B_?t="SHADOWMAP_TYPE_PCF":o.shadowMapType===Px?t="SHADOWMAP_TYPE_PCF_SOFT":o.shadowMapType===Ji&&(t="SHADOWMAP_TYPE_VSM"),t}function sb(o){let t="ENVMAP_TYPE_CUBE";if(o.envMap)switch(o.envMapMode){case _s:case vs:t="ENVMAP_TYPE_CUBE";break;case Sc:t="ENVMAP_TYPE_CUBE_UV";break}return t}function ob(o){let t="ENVMAP_MODE_REFLECTION";if(o.envMap)switch(o.envMapMode){case vs:t="ENVMAP_MODE_REFRACTION";break}return t}function lb(o){let t="ENVMAP_BLENDING_NONE";if(o.envMap)switch(o.combine){case td:t="ENVMAP_BLENDING_MULTIPLY";break;case tS:t="ENVMAP_BLENDING_MIX";break;case eS:t="ENVMAP_BLENDING_ADD";break}return t}function cb(o){const t=o.envMapCubeUVHeight;if(t===null)return null;const i=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,i),7*16)),texelHeight:r,maxMip:i}}function ub(o,t,i,r){const l=o.getContext(),u=i.defines;let h=i.vertexShader,d=i.fragmentShader;const m=rb(i),p=sb(i),g=ob(i),v=lb(i),x=cb(i),M=QT(i),T=JT(u),C=l.createProgram();let y,_,P=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(y=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T].filter(wo).join(`
`),y.length>0&&(y+=`
`),_=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T].filter(wo).join(`
`),_.length>0&&(_+=`
`)):(y=[U_(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+g:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(wo).join(`
`),_=[U_(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+p:"",i.envMap?"#define "+g:"",i.envMap?"#define "+v:"",x?"#define CUBEUV_TEXEL_WIDTH "+x.texelWidth:"",x?"#define CUBEUV_TEXEL_HEIGHT "+x.texelHeight:"",x?"#define CUBEUV_MAX_MIP "+x.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor||i.batchingColor?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==Na?"#define TONE_MAPPING":"",i.toneMapping!==Na?ce.tonemapping_pars_fragment:"",i.toneMapping!==Na?ZT("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",ce.colorspace_pars_fragment,jT("linearToOutputTexel",i.outputColorSpace),KT(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(wo).join(`
`)),h=Qh(h),h=w_(h,i),h=C_(h,i),d=Qh(d),d=w_(d,i),d=C_(d,i),h=D_(h),d=D_(d),i.isRawShaderMaterial!==!0&&(P=`#version 300 es
`,y=[M,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,_=["#define varying in",i.glslVersion===Xg?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===Xg?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const O=P+y+h,D=P+_+d,H=b_(l,l.VERTEX_SHADER,O),F=b_(l,l.FRAGMENT_SHADER,D);l.attachShader(C,H),l.attachShader(C,F),i.index0AttributeName!==void 0?l.bindAttribLocation(C,0,i.index0AttributeName):i.morphTargets===!0&&l.bindAttribLocation(C,0,"position"),l.linkProgram(C);function z(I){if(o.debug.checkShaderErrors){const ct=l.getProgramInfoLog(C).trim(),it=l.getShaderInfoLog(H).trim(),mt=l.getShaderInfoLog(F).trim();let ht=!0,W=!0;if(l.getProgramParameter(C,l.LINK_STATUS)===!1)if(ht=!1,typeof o.debug.onShaderError=="function")o.debug.onShaderError(l,C,H,F);else{const at=R_(l,H,"vertex"),j=R_(l,F,"fragment");console.error("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(C,l.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+ct+`
`+at+`
`+j)}else ct!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ct):(it===""||mt==="")&&(W=!1);W&&(I.diagnostics={runnable:ht,programLog:ct,vertexShader:{log:it,prefix:y},fragmentShader:{log:mt,prefix:_}})}l.deleteShader(H),l.deleteShader(F),K=new gc(l,C),w=$T(l,C)}let K;this.getUniforms=function(){return K===void 0&&z(this),K};let w;this.getAttributes=function(){return w===void 0&&z(this),w};let R=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=l.getProgramParameter(C,XT)),R},this.destroy=function(){r.releaseStatesOfProgram(this),l.deleteProgram(C),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=WT++,this.cacheKey=t,this.usedTimes=1,this.program=C,this.vertexShader=H,this.fragmentShader=F,this}let fb=0;class hb{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const i=t.vertexShader,r=t.fragmentShader,l=this._getShaderStage(i),u=this._getShaderStage(r),h=this._getShaderCacheForMaterial(t);return h.has(l)===!1&&(h.add(l),l.usedTimes++),h.has(u)===!1&&(h.add(u),u.usedTimes++),this}remove(t){const i=this.materialCache.get(t);for(const r of i)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const i=this.materialCache;let r=i.get(t);return r===void 0&&(r=new Set,i.set(t,r)),r}_getShaderStage(t){const i=this.shaderCache;let r=i.get(t);return r===void 0&&(r=new db(t),i.set(t,r)),r}}class db{constructor(t){this.id=fb++,this.code=t,this.usedTimes=0}}function pb(o,t,i,r,l,u,h){const d=new e0,m=new hb,p=new Set,g=[],v=l.logarithmicDepthBuffer,x=l.vertexTextures;let M=l.precision;const T={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function C(w){return p.add(w),w===0?"uv":`uv${w}`}function y(w,R,I,ct,it){const mt=ct.fog,ht=it.geometry,W=w.isMeshStandardMaterial?ct.environment:null,at=(w.isMeshStandardMaterial?i:t).get(w.envMap||W),j=at&&at.mapping===Sc?at.image.height:null,St=T[w.type];w.precision!==null&&(M=l.getMaxPrecision(w.precision),M!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",M,"instead."));const L=ht.morphAttributes.position||ht.morphAttributes.normal||ht.morphAttributes.color,nt=L!==void 0?L.length:0;let Et=0;ht.morphAttributes.position!==void 0&&(Et=1),ht.morphAttributes.normal!==void 0&&(Et=2),ht.morphAttributes.color!==void 0&&(Et=3);let At,q,dt,xt;if(St){const Ee=bi[St];At=Ee.vertexShader,q=Ee.fragmentShader}else At=w.vertexShader,q=w.fragmentShader,m.update(w),dt=m.getVertexShaderID(w),xt=m.getFragmentShaderID(w);const Tt=o.getRenderTarget(),Rt=o.state.buffers.depth.getReversed(),Ft=it.isInstancedMesh===!0,Gt=it.isBatchedMesh===!0,ye=!!w.map,ue=!!w.matcap,we=!!at,B=!!w.aoMap,pn=!!w.lightMap,se=!!w.bumpMap,he=!!w.normalMap,Wt=!!w.displacementMap,De=!!w.emissiveMap,qt=!!w.metalnessMap,U=!!w.roughnessMap,E=w.anisotropy>0,tt=w.clearcoat>0,ut=w.dispersion>0,vt=w.iridescence>0,ft=w.sheen>0,Vt=w.transmission>0,Ct=E&&!!w.anisotropyMap,zt=tt&&!!w.clearcoatMap,me=tt&&!!w.clearcoatNormalMap,Mt=tt&&!!w.clearcoatRoughnessMap,Bt=vt&&!!w.iridescenceMap,jt=vt&&!!w.iridescenceThicknessMap,kt=ft&&!!w.sheenColorMap,It=ft&&!!w.sheenRoughnessMap,re=!!w.specularMap,Kt=!!w.specularColorMap,Ue=!!w.specularIntensityMap,k=Vt&&!!w.transmissionMap,Lt=Vt&&!!w.thicknessMap,st=!!w.gradientMap,gt=!!w.alphaMap,wt=w.alphaTest>0,Dt=!!w.alphaHash,$t=!!w.extensions;let He=Na;w.toneMapped&&(Tt===null||Tt.isXRRenderTarget===!0)&&(He=o.toneMapping);const tn={shaderID:St,shaderType:w.type,shaderName:w.name,vertexShader:At,fragmentShader:q,defines:w.defines,customVertexShaderID:dt,customFragmentShaderID:xt,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:M,batching:Gt,batchingColor:Gt&&it._colorsTexture!==null,instancing:Ft,instancingColor:Ft&&it.instanceColor!==null,instancingMorph:Ft&&it.morphTexture!==null,supportsVertexTextures:x,outputColorSpace:Tt===null?o.outputColorSpace:Tt.isXRRenderTarget===!0?Tt.texture.colorSpace:ys,alphaToCoverage:!!w.alphaToCoverage,map:ye,matcap:ue,envMap:we,envMapMode:we&&at.mapping,envMapCubeUVHeight:j,aoMap:B,lightMap:pn,bumpMap:se,normalMap:he,displacementMap:x&&Wt,emissiveMap:De,normalMapObjectSpace:he&&w.normalMapType===hS,normalMapTangentSpace:he&&w.normalMapType===K_,metalnessMap:qt,roughnessMap:U,anisotropy:E,anisotropyMap:Ct,clearcoat:tt,clearcoatMap:zt,clearcoatNormalMap:me,clearcoatRoughnessMap:Mt,dispersion:ut,iridescence:vt,iridescenceMap:Bt,iridescenceThicknessMap:jt,sheen:ft,sheenColorMap:kt,sheenRoughnessMap:It,specularMap:re,specularColorMap:Kt,specularIntensityMap:Ue,transmission:Vt,transmissionMap:k,thicknessMap:Lt,gradientMap:st,opaque:w.transparent===!1&&w.blending===hs&&w.alphaToCoverage===!1,alphaMap:gt,alphaTest:wt,alphaHash:Dt,combine:w.combine,mapUv:ye&&C(w.map.channel),aoMapUv:B&&C(w.aoMap.channel),lightMapUv:pn&&C(w.lightMap.channel),bumpMapUv:se&&C(w.bumpMap.channel),normalMapUv:he&&C(w.normalMap.channel),displacementMapUv:Wt&&C(w.displacementMap.channel),emissiveMapUv:De&&C(w.emissiveMap.channel),metalnessMapUv:qt&&C(w.metalnessMap.channel),roughnessMapUv:U&&C(w.roughnessMap.channel),anisotropyMapUv:Ct&&C(w.anisotropyMap.channel),clearcoatMapUv:zt&&C(w.clearcoatMap.channel),clearcoatNormalMapUv:me&&C(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Mt&&C(w.clearcoatRoughnessMap.channel),iridescenceMapUv:Bt&&C(w.iridescenceMap.channel),iridescenceThicknessMapUv:jt&&C(w.iridescenceThicknessMap.channel),sheenColorMapUv:kt&&C(w.sheenColorMap.channel),sheenRoughnessMapUv:It&&C(w.sheenRoughnessMap.channel),specularMapUv:re&&C(w.specularMap.channel),specularColorMapUv:Kt&&C(w.specularColorMap.channel),specularIntensityMapUv:Ue&&C(w.specularIntensityMap.channel),transmissionMapUv:k&&C(w.transmissionMap.channel),thicknessMapUv:Lt&&C(w.thicknessMap.channel),alphaMapUv:gt&&C(w.alphaMap.channel),vertexTangents:!!ht.attributes.tangent&&(he||E),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!ht.attributes.color&&ht.attributes.color.itemSize===4,pointsUvs:it.isPoints===!0&&!!ht.attributes.uv&&(ye||gt),fog:!!mt,useFog:w.fog===!0,fogExp2:!!mt&&mt.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:v,reverseDepthBuffer:Rt,skinning:it.isSkinnedMesh===!0,morphTargets:ht.morphAttributes.position!==void 0,morphNormals:ht.morphAttributes.normal!==void 0,morphColors:ht.morphAttributes.color!==void 0,morphTargetsCount:nt,morphTextureStride:Et,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numClippingPlanes:h.numPlanes,numClipIntersection:h.numIntersection,dithering:w.dithering,shadowMapEnabled:o.shadowMap.enabled&&I.length>0,shadowMapType:o.shadowMap.type,toneMapping:He,decodeVideoTexture:ye&&w.map.isVideoTexture===!0&&Re.getTransfer(w.map.colorSpace)===Pe,decodeVideoTextureEmissive:De&&w.emissiveMap.isVideoTexture===!0&&Re.getTransfer(w.emissiveMap.colorSpace)===Pe,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===$i,flipSided:w.side===Un,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:$t&&w.extensions.clipCullDistance===!0&&r.has("WEBGL_clip_cull_distance"),extensionMultiDraw:($t&&w.extensions.multiDraw===!0||Gt)&&r.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:r.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return tn.vertexUv1s=p.has(1),tn.vertexUv2s=p.has(2),tn.vertexUv3s=p.has(3),p.clear(),tn}function _(w){const R=[];if(w.shaderID?R.push(w.shaderID):(R.push(w.customVertexShaderID),R.push(w.customFragmentShaderID)),w.defines!==void 0)for(const I in w.defines)R.push(I),R.push(w.defines[I]);return w.isRawShaderMaterial===!1&&(P(R,w),O(R,w),R.push(o.outputColorSpace)),R.push(w.customProgramCacheKey),R.join()}function P(w,R){w.push(R.precision),w.push(R.outputColorSpace),w.push(R.envMapMode),w.push(R.envMapCubeUVHeight),w.push(R.mapUv),w.push(R.alphaMapUv),w.push(R.lightMapUv),w.push(R.aoMapUv),w.push(R.bumpMapUv),w.push(R.normalMapUv),w.push(R.displacementMapUv),w.push(R.emissiveMapUv),w.push(R.metalnessMapUv),w.push(R.roughnessMapUv),w.push(R.anisotropyMapUv),w.push(R.clearcoatMapUv),w.push(R.clearcoatNormalMapUv),w.push(R.clearcoatRoughnessMapUv),w.push(R.iridescenceMapUv),w.push(R.iridescenceThicknessMapUv),w.push(R.sheenColorMapUv),w.push(R.sheenRoughnessMapUv),w.push(R.specularMapUv),w.push(R.specularColorMapUv),w.push(R.specularIntensityMapUv),w.push(R.transmissionMapUv),w.push(R.thicknessMapUv),w.push(R.combine),w.push(R.fogExp2),w.push(R.sizeAttenuation),w.push(R.morphTargetsCount),w.push(R.morphAttributeCount),w.push(R.numDirLights),w.push(R.numPointLights),w.push(R.numSpotLights),w.push(R.numSpotLightMaps),w.push(R.numHemiLights),w.push(R.numRectAreaLights),w.push(R.numDirLightShadows),w.push(R.numPointLightShadows),w.push(R.numSpotLightShadows),w.push(R.numSpotLightShadowsWithMaps),w.push(R.numLightProbes),w.push(R.shadowMapType),w.push(R.toneMapping),w.push(R.numClippingPlanes),w.push(R.numClipIntersection),w.push(R.depthPacking)}function O(w,R){d.disableAll(),R.supportsVertexTextures&&d.enable(0),R.instancing&&d.enable(1),R.instancingColor&&d.enable(2),R.instancingMorph&&d.enable(3),R.matcap&&d.enable(4),R.envMap&&d.enable(5),R.normalMapObjectSpace&&d.enable(6),R.normalMapTangentSpace&&d.enable(7),R.clearcoat&&d.enable(8),R.iridescence&&d.enable(9),R.alphaTest&&d.enable(10),R.vertexColors&&d.enable(11),R.vertexAlphas&&d.enable(12),R.vertexUv1s&&d.enable(13),R.vertexUv2s&&d.enable(14),R.vertexUv3s&&d.enable(15),R.vertexTangents&&d.enable(16),R.anisotropy&&d.enable(17),R.alphaHash&&d.enable(18),R.batching&&d.enable(19),R.dispersion&&d.enable(20),R.batchingColor&&d.enable(21),w.push(d.mask),d.disableAll(),R.fog&&d.enable(0),R.useFog&&d.enable(1),R.flatShading&&d.enable(2),R.logarithmicDepthBuffer&&d.enable(3),R.reverseDepthBuffer&&d.enable(4),R.skinning&&d.enable(5),R.morphTargets&&d.enable(6),R.morphNormals&&d.enable(7),R.morphColors&&d.enable(8),R.premultipliedAlpha&&d.enable(9),R.shadowMapEnabled&&d.enable(10),R.doubleSided&&d.enable(11),R.flipSided&&d.enable(12),R.useDepthPacking&&d.enable(13),R.dithering&&d.enable(14),R.transmission&&d.enable(15),R.sheen&&d.enable(16),R.opaque&&d.enable(17),R.pointsUvs&&d.enable(18),R.decodeVideoTexture&&d.enable(19),R.decodeVideoTextureEmissive&&d.enable(20),R.alphaToCoverage&&d.enable(21),w.push(d.mask)}function D(w){const R=T[w.type];let I;if(R){const ct=bi[R];I=kS.clone(ct.uniforms)}else I=w.uniforms;return I}function H(w,R){let I;for(let ct=0,it=g.length;ct<it;ct++){const mt=g[ct];if(mt.cacheKey===R){I=mt,++I.usedTimes;break}}return I===void 0&&(I=new ub(o,R,w,u),g.push(I)),I}function F(w){if(--w.usedTimes===0){const R=g.indexOf(w);g[R]=g[g.length-1],g.pop(),w.destroy()}}function z(w){m.remove(w)}function K(){m.dispose()}return{getParameters:y,getProgramCacheKey:_,getUniforms:D,acquireProgram:H,releaseProgram:F,releaseShaderCache:z,programs:g,dispose:K}}function mb(){let o=new WeakMap;function t(h){return o.has(h)}function i(h){let d=o.get(h);return d===void 0&&(d={},o.set(h,d)),d}function r(h){o.delete(h)}function l(h,d,m){o.get(h)[d]=m}function u(){o=new WeakMap}return{has:t,get:i,remove:r,update:l,dispose:u}}function gb(o,t){return o.groupOrder!==t.groupOrder?o.groupOrder-t.groupOrder:o.renderOrder!==t.renderOrder?o.renderOrder-t.renderOrder:o.material.id!==t.material.id?o.material.id-t.material.id:o.z!==t.z?o.z-t.z:o.id-t.id}function L_(o,t){return o.groupOrder!==t.groupOrder?o.groupOrder-t.groupOrder:o.renderOrder!==t.renderOrder?o.renderOrder-t.renderOrder:o.z!==t.z?t.z-o.z:o.id-t.id}function N_(){const o=[];let t=0;const i=[],r=[],l=[];function u(){t=0,i.length=0,r.length=0,l.length=0}function h(v,x,M,T,C,y){let _=o[t];return _===void 0?(_={id:v.id,object:v,geometry:x,material:M,groupOrder:T,renderOrder:v.renderOrder,z:C,group:y},o[t]=_):(_.id=v.id,_.object=v,_.geometry=x,_.material=M,_.groupOrder=T,_.renderOrder=v.renderOrder,_.z=C,_.group=y),t++,_}function d(v,x,M,T,C,y){const _=h(v,x,M,T,C,y);M.transmission>0?r.push(_):M.transparent===!0?l.push(_):i.push(_)}function m(v,x,M,T,C,y){const _=h(v,x,M,T,C,y);M.transmission>0?r.unshift(_):M.transparent===!0?l.unshift(_):i.unshift(_)}function p(v,x){i.length>1&&i.sort(v||gb),r.length>1&&r.sort(x||L_),l.length>1&&l.sort(x||L_)}function g(){for(let v=t,x=o.length;v<x;v++){const M=o[v];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:i,transmissive:r,transparent:l,init:u,push:d,unshift:m,finish:g,sort:p}}function _b(){let o=new WeakMap;function t(r,l){const u=o.get(r);let h;return u===void 0?(h=new N_,o.set(r,[h])):l>=u.length?(h=new N_,u.push(h)):h=u[l],h}function i(){o=new WeakMap}return{get:t,dispose:i}}function vb(){const o={};return{get:function(t){if(o[t.id]!==void 0)return o[t.id];let i;switch(t.type){case"DirectionalLight":i={direction:new rt,color:new ie};break;case"SpotLight":i={position:new rt,direction:new rt,color:new ie,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new rt,color:new ie,distance:0,decay:0};break;case"HemisphereLight":i={direction:new rt,skyColor:new ie,groundColor:new ie};break;case"RectAreaLight":i={color:new ie,position:new rt,halfWidth:new rt,halfHeight:new rt};break}return o[t.id]=i,i}}}function xb(){const o={};return{get:function(t){if(o[t.id]!==void 0)return o[t.id];let i;switch(t.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce,shadowCameraNear:1,shadowCameraFar:1e3};break}return o[t.id]=i,i}}}let Sb=0;function yb(o,t){return(t.castShadow?2:0)-(o.castShadow?2:0)+(t.map?1:0)-(o.map?1:0)}function Mb(o){const t=new vb,i=xb(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)r.probe.push(new rt);const l=new rt,u=new $e,h=new $e;function d(p){let g=0,v=0,x=0;for(let w=0;w<9;w++)r.probe[w].set(0,0,0);let M=0,T=0,C=0,y=0,_=0,P=0,O=0,D=0,H=0,F=0,z=0;p.sort(yb);for(let w=0,R=p.length;w<R;w++){const I=p[w],ct=I.color,it=I.intensity,mt=I.distance,ht=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)g+=ct.r*it,v+=ct.g*it,x+=ct.b*it;else if(I.isLightProbe){for(let W=0;W<9;W++)r.probe[W].addScaledVector(I.sh.coefficients[W],it);z++}else if(I.isDirectionalLight){const W=t.get(I);if(W.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const at=I.shadow,j=i.get(I);j.shadowIntensity=at.intensity,j.shadowBias=at.bias,j.shadowNormalBias=at.normalBias,j.shadowRadius=at.radius,j.shadowMapSize=at.mapSize,r.directionalShadow[M]=j,r.directionalShadowMap[M]=ht,r.directionalShadowMatrix[M]=I.shadow.matrix,P++}r.directional[M]=W,M++}else if(I.isSpotLight){const W=t.get(I);W.position.setFromMatrixPosition(I.matrixWorld),W.color.copy(ct).multiplyScalar(it),W.distance=mt,W.coneCos=Math.cos(I.angle),W.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),W.decay=I.decay,r.spot[C]=W;const at=I.shadow;if(I.map&&(r.spotLightMap[H]=I.map,H++,at.updateMatrices(I),I.castShadow&&F++),r.spotLightMatrix[C]=at.matrix,I.castShadow){const j=i.get(I);j.shadowIntensity=at.intensity,j.shadowBias=at.bias,j.shadowNormalBias=at.normalBias,j.shadowRadius=at.radius,j.shadowMapSize=at.mapSize,r.spotShadow[C]=j,r.spotShadowMap[C]=ht,D++}C++}else if(I.isRectAreaLight){const W=t.get(I);W.color.copy(ct).multiplyScalar(it),W.halfWidth.set(I.width*.5,0,0),W.halfHeight.set(0,I.height*.5,0),r.rectArea[y]=W,y++}else if(I.isPointLight){const W=t.get(I);if(W.color.copy(I.color).multiplyScalar(I.intensity),W.distance=I.distance,W.decay=I.decay,I.castShadow){const at=I.shadow,j=i.get(I);j.shadowIntensity=at.intensity,j.shadowBias=at.bias,j.shadowNormalBias=at.normalBias,j.shadowRadius=at.radius,j.shadowMapSize=at.mapSize,j.shadowCameraNear=at.camera.near,j.shadowCameraFar=at.camera.far,r.pointShadow[T]=j,r.pointShadowMap[T]=ht,r.pointShadowMatrix[T]=I.shadow.matrix,O++}r.point[T]=W,T++}else if(I.isHemisphereLight){const W=t.get(I);W.skyColor.copy(I.color).multiplyScalar(it),W.groundColor.copy(I.groundColor).multiplyScalar(it),r.hemi[_]=W,_++}}y>0&&(o.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Ut.LTC_FLOAT_1,r.rectAreaLTC2=Ut.LTC_FLOAT_2):(r.rectAreaLTC1=Ut.LTC_HALF_1,r.rectAreaLTC2=Ut.LTC_HALF_2)),r.ambient[0]=g,r.ambient[1]=v,r.ambient[2]=x;const K=r.hash;(K.directionalLength!==M||K.pointLength!==T||K.spotLength!==C||K.rectAreaLength!==y||K.hemiLength!==_||K.numDirectionalShadows!==P||K.numPointShadows!==O||K.numSpotShadows!==D||K.numSpotMaps!==H||K.numLightProbes!==z)&&(r.directional.length=M,r.spot.length=C,r.rectArea.length=y,r.point.length=T,r.hemi.length=_,r.directionalShadow.length=P,r.directionalShadowMap.length=P,r.pointShadow.length=O,r.pointShadowMap.length=O,r.spotShadow.length=D,r.spotShadowMap.length=D,r.directionalShadowMatrix.length=P,r.pointShadowMatrix.length=O,r.spotLightMatrix.length=D+H-F,r.spotLightMap.length=H,r.numSpotLightShadowsWithMaps=F,r.numLightProbes=z,K.directionalLength=M,K.pointLength=T,K.spotLength=C,K.rectAreaLength=y,K.hemiLength=_,K.numDirectionalShadows=P,K.numPointShadows=O,K.numSpotShadows=D,K.numSpotMaps=H,K.numLightProbes=z,r.version=Sb++)}function m(p,g){let v=0,x=0,M=0,T=0,C=0;const y=g.matrixWorldInverse;for(let _=0,P=p.length;_<P;_++){const O=p[_];if(O.isDirectionalLight){const D=r.directional[v];D.direction.setFromMatrixPosition(O.matrixWorld),l.setFromMatrixPosition(O.target.matrixWorld),D.direction.sub(l),D.direction.transformDirection(y),v++}else if(O.isSpotLight){const D=r.spot[M];D.position.setFromMatrixPosition(O.matrixWorld),D.position.applyMatrix4(y),D.direction.setFromMatrixPosition(O.matrixWorld),l.setFromMatrixPosition(O.target.matrixWorld),D.direction.sub(l),D.direction.transformDirection(y),M++}else if(O.isRectAreaLight){const D=r.rectArea[T];D.position.setFromMatrixPosition(O.matrixWorld),D.position.applyMatrix4(y),h.identity(),u.copy(O.matrixWorld),u.premultiply(y),h.extractRotation(u),D.halfWidth.set(O.width*.5,0,0),D.halfHeight.set(0,O.height*.5,0),D.halfWidth.applyMatrix4(h),D.halfHeight.applyMatrix4(h),T++}else if(O.isPointLight){const D=r.point[x];D.position.setFromMatrixPosition(O.matrixWorld),D.position.applyMatrix4(y),x++}else if(O.isHemisphereLight){const D=r.hemi[C];D.direction.setFromMatrixPosition(O.matrixWorld),D.direction.transformDirection(y),C++}}}return{setup:d,setupView:m,state:r}}function O_(o){const t=new Mb(o),i=[],r=[];function l(g){p.camera=g,i.length=0,r.length=0}function u(g){i.push(g)}function h(g){r.push(g)}function d(){t.setup(i)}function m(g){t.setupView(i,g)}const p={lightsArray:i,shadowsArray:r,camera:null,lights:t,transmissionRenderTarget:{}};return{init:l,state:p,setupLights:d,setupLightsView:m,pushLight:u,pushShadow:h}}function Eb(o){let t=new WeakMap;function i(l,u=0){const h=t.get(l);let d;return h===void 0?(d=new O_(o),t.set(l,[d])):u>=h.length?(d=new O_(o),h.push(d)):d=h[u],d}function r(){t=new WeakMap}return{get:i,dispose:r}}const Tb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,bb=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Ab(o,t,i){let r=new c0;const l=new Ce,u=new Ce,h=new je,d=new KS({depthPacking:fS}),m=new QS,p={},g=i.maxTextureSize,v={[Oa]:Un,[Un]:Oa,[$i]:$i},x=new vi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ce},radius:{value:4}},vertexShader:Tb,fragmentShader:bb}),M=x.clone();M.defines.HORIZONTAL_PASS=1;const T=new Pa;T.setAttribute("position",new Ri(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const C=new Bn(T,x),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=B_;let _=this.type;this.render=function(F,z,K){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||F.length===0)return;const w=o.getRenderTarget(),R=o.getActiveCubeFace(),I=o.getActiveMipmapLevel(),ct=o.state;ct.setBlending(La),ct.buffers.color.setClear(1,1,1,1),ct.buffers.depth.setTest(!0),ct.setScissorTest(!1);const it=_!==Ji&&this.type===Ji,mt=_===Ji&&this.type!==Ji;for(let ht=0,W=F.length;ht<W;ht++){const at=F[ht],j=at.shadow;if(j===void 0){console.warn("THREE.WebGLShadowMap:",at,"has no shadow.");continue}if(j.autoUpdate===!1&&j.needsUpdate===!1)continue;l.copy(j.mapSize);const St=j.getFrameExtents();if(l.multiply(St),u.copy(j.mapSize),(l.x>g||l.y>g)&&(l.x>g&&(u.x=Math.floor(g/St.x),l.x=u.x*St.x,j.mapSize.x=u.x),l.y>g&&(u.y=Math.floor(g/St.y),l.y=u.y*St.y,j.mapSize.y=u.y)),j.map===null||it===!0||mt===!0){const nt=this.type!==Ji?{minFilter:_i,magFilter:_i}:{};j.map!==null&&j.map.dispose(),j.map=new gr(l.x,l.y,nt),j.map.texture.name=at.name+".shadowMap",j.camera.updateProjectionMatrix()}o.setRenderTarget(j.map),o.clear();const L=j.getViewportCount();for(let nt=0;nt<L;nt++){const Et=j.getViewport(nt);h.set(u.x*Et.x,u.y*Et.y,u.x*Et.z,u.y*Et.w),ct.viewport(h),j.updateMatrices(at,nt),r=j.getFrustum(),D(z,K,j.camera,at,this.type)}j.isPointLightShadow!==!0&&this.type===Ji&&P(j,K),j.needsUpdate=!1}_=this.type,y.needsUpdate=!1,o.setRenderTarget(w,R,I)};function P(F,z){const K=t.update(C);x.defines.VSM_SAMPLES!==F.blurSamples&&(x.defines.VSM_SAMPLES=F.blurSamples,M.defines.VSM_SAMPLES=F.blurSamples,x.needsUpdate=!0,M.needsUpdate=!0),F.mapPass===null&&(F.mapPass=new gr(l.x,l.y)),x.uniforms.shadow_pass.value=F.map.texture,x.uniforms.resolution.value=F.mapSize,x.uniforms.radius.value=F.radius,o.setRenderTarget(F.mapPass),o.clear(),o.renderBufferDirect(z,null,K,x,C,null),M.uniforms.shadow_pass.value=F.mapPass.texture,M.uniforms.resolution.value=F.mapSize,M.uniforms.radius.value=F.radius,o.setRenderTarget(F.map),o.clear(),o.renderBufferDirect(z,null,K,M,C,null)}function O(F,z,K,w){let R=null;const I=K.isPointLight===!0?F.customDistanceMaterial:F.customDepthMaterial;if(I!==void 0)R=I;else if(R=K.isPointLight===!0?m:d,o.localClippingEnabled&&z.clipShadows===!0&&Array.isArray(z.clippingPlanes)&&z.clippingPlanes.length!==0||z.displacementMap&&z.displacementScale!==0||z.alphaMap&&z.alphaTest>0||z.map&&z.alphaTest>0){const ct=R.uuid,it=z.uuid;let mt=p[ct];mt===void 0&&(mt={},p[ct]=mt);let ht=mt[it];ht===void 0&&(ht=R.clone(),mt[it]=ht,z.addEventListener("dispose",H)),R=ht}if(R.visible=z.visible,R.wireframe=z.wireframe,w===Ji?R.side=z.shadowSide!==null?z.shadowSide:z.side:R.side=z.shadowSide!==null?z.shadowSide:v[z.side],R.alphaMap=z.alphaMap,R.alphaTest=z.alphaTest,R.map=z.map,R.clipShadows=z.clipShadows,R.clippingPlanes=z.clippingPlanes,R.clipIntersection=z.clipIntersection,R.displacementMap=z.displacementMap,R.displacementScale=z.displacementScale,R.displacementBias=z.displacementBias,R.wireframeLinewidth=z.wireframeLinewidth,R.linewidth=z.linewidth,K.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const ct=o.properties.get(R);ct.light=K}return R}function D(F,z,K,w,R){if(F.visible===!1)return;if(F.layers.test(z.layers)&&(F.isMesh||F.isLine||F.isPoints)&&(F.castShadow||F.receiveShadow&&R===Ji)&&(!F.frustumCulled||r.intersectsObject(F))){F.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,F.matrixWorld);const it=t.update(F),mt=F.material;if(Array.isArray(mt)){const ht=it.groups;for(let W=0,at=ht.length;W<at;W++){const j=ht[W],St=mt[j.materialIndex];if(St&&St.visible){const L=O(F,St,w,R);F.onBeforeShadow(o,F,z,K,it,L,j),o.renderBufferDirect(K,null,it,L,F,j),F.onAfterShadow(o,F,z,K,it,L,j)}}}else if(mt.visible){const ht=O(F,mt,w,R);F.onBeforeShadow(o,F,z,K,it,ht,null),o.renderBufferDirect(K,null,it,ht,F,null),F.onAfterShadow(o,F,z,K,it,ht,null)}}const ct=F.children;for(let it=0,mt=ct.length;it<mt;it++)D(ct[it],z,K,w,R)}function H(F){F.target.removeEventListener("dispose",H);for(const K in p){const w=p[K],R=F.target.uuid;R in w&&(w[R].dispose(),delete w[R])}}}const Rb={[dh]:ph,[mh]:vh,[gh]:xh,[gs]:_h,[ph]:dh,[vh]:mh,[xh]:gh,[_h]:gs};function wb(o,t){function i(){let k=!1;const Lt=new je;let st=null;const gt=new je(0,0,0,0);return{setMask:function(wt){st!==wt&&!k&&(o.colorMask(wt,wt,wt,wt),st=wt)},setLocked:function(wt){k=wt},setClear:function(wt,Dt,$t,He,tn){tn===!0&&(wt*=He,Dt*=He,$t*=He),Lt.set(wt,Dt,$t,He),gt.equals(Lt)===!1&&(o.clearColor(wt,Dt,$t,He),gt.copy(Lt))},reset:function(){k=!1,st=null,gt.set(-1,0,0,0)}}}function r(){let k=!1,Lt=!1,st=null,gt=null,wt=null;return{setReversed:function(Dt){if(Lt!==Dt){const $t=t.get("EXT_clip_control");Lt?$t.clipControlEXT($t.LOWER_LEFT_EXT,$t.ZERO_TO_ONE_EXT):$t.clipControlEXT($t.LOWER_LEFT_EXT,$t.NEGATIVE_ONE_TO_ONE_EXT);const He=wt;wt=null,this.setClear(He)}Lt=Dt},getReversed:function(){return Lt},setTest:function(Dt){Dt?Tt(o.DEPTH_TEST):Rt(o.DEPTH_TEST)},setMask:function(Dt){st!==Dt&&!k&&(o.depthMask(Dt),st=Dt)},setFunc:function(Dt){if(Lt&&(Dt=Rb[Dt]),gt!==Dt){switch(Dt){case dh:o.depthFunc(o.NEVER);break;case ph:o.depthFunc(o.ALWAYS);break;case mh:o.depthFunc(o.LESS);break;case gs:o.depthFunc(o.LEQUAL);break;case gh:o.depthFunc(o.EQUAL);break;case _h:o.depthFunc(o.GEQUAL);break;case vh:o.depthFunc(o.GREATER);break;case xh:o.depthFunc(o.NOTEQUAL);break;default:o.depthFunc(o.LEQUAL)}gt=Dt}},setLocked:function(Dt){k=Dt},setClear:function(Dt){wt!==Dt&&(Lt&&(Dt=1-Dt),o.clearDepth(Dt),wt=Dt)},reset:function(){k=!1,st=null,gt=null,wt=null,Lt=!1}}}function l(){let k=!1,Lt=null,st=null,gt=null,wt=null,Dt=null,$t=null,He=null,tn=null;return{setTest:function(Ee){k||(Ee?Tt(o.STENCIL_TEST):Rt(o.STENCIL_TEST))},setMask:function(Ee){Lt!==Ee&&!k&&(o.stencilMask(Ee),Lt=Ee)},setFunc:function(Ee,Tn,bn){(st!==Ee||gt!==Tn||wt!==bn)&&(o.stencilFunc(Ee,Tn,bn),st=Ee,gt=Tn,wt=bn)},setOp:function(Ee,Tn,bn){(Dt!==Ee||$t!==Tn||He!==bn)&&(o.stencilOp(Ee,Tn,bn),Dt=Ee,$t=Tn,He=bn)},setLocked:function(Ee){k=Ee},setClear:function(Ee){tn!==Ee&&(o.clearStencil(Ee),tn=Ee)},reset:function(){k=!1,Lt=null,st=null,gt=null,wt=null,Dt=null,$t=null,He=null,tn=null}}}const u=new i,h=new r,d=new l,m=new WeakMap,p=new WeakMap;let g={},v={},x=new WeakMap,M=[],T=null,C=!1,y=null,_=null,P=null,O=null,D=null,H=null,F=null,z=new ie(0,0,0),K=0,w=!1,R=null,I=null,ct=null,it=null,mt=null;const ht=o.getParameter(o.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,at=0;const j=o.getParameter(o.VERSION);j.indexOf("WebGL")!==-1?(at=parseFloat(/^WebGL (\d)/.exec(j)[1]),W=at>=1):j.indexOf("OpenGL ES")!==-1&&(at=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),W=at>=2);let St=null,L={};const nt=o.getParameter(o.SCISSOR_BOX),Et=o.getParameter(o.VIEWPORT),At=new je().fromArray(nt),q=new je().fromArray(Et);function dt(k,Lt,st,gt){const wt=new Uint8Array(4),Dt=o.createTexture();o.bindTexture(k,Dt),o.texParameteri(k,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(k,o.TEXTURE_MAG_FILTER,o.NEAREST);for(let $t=0;$t<st;$t++)k===o.TEXTURE_3D||k===o.TEXTURE_2D_ARRAY?o.texImage3D(Lt,0,o.RGBA,1,1,gt,0,o.RGBA,o.UNSIGNED_BYTE,wt):o.texImage2D(Lt+$t,0,o.RGBA,1,1,0,o.RGBA,o.UNSIGNED_BYTE,wt);return Dt}const xt={};xt[o.TEXTURE_2D]=dt(o.TEXTURE_2D,o.TEXTURE_2D,1),xt[o.TEXTURE_CUBE_MAP]=dt(o.TEXTURE_CUBE_MAP,o.TEXTURE_CUBE_MAP_POSITIVE_X,6),xt[o.TEXTURE_2D_ARRAY]=dt(o.TEXTURE_2D_ARRAY,o.TEXTURE_2D_ARRAY,1,1),xt[o.TEXTURE_3D]=dt(o.TEXTURE_3D,o.TEXTURE_3D,1,1),u.setClear(0,0,0,1),h.setClear(1),d.setClear(0),Tt(o.DEPTH_TEST),h.setFunc(gs),se(!1),he(Ig),Tt(o.CULL_FACE),B(La);function Tt(k){g[k]!==!0&&(o.enable(k),g[k]=!0)}function Rt(k){g[k]!==!1&&(o.disable(k),g[k]=!1)}function Ft(k,Lt){return v[k]!==Lt?(o.bindFramebuffer(k,Lt),v[k]=Lt,k===o.DRAW_FRAMEBUFFER&&(v[o.FRAMEBUFFER]=Lt),k===o.FRAMEBUFFER&&(v[o.DRAW_FRAMEBUFFER]=Lt),!0):!1}function Gt(k,Lt){let st=M,gt=!1;if(k){st=x.get(Lt),st===void 0&&(st=[],x.set(Lt,st));const wt=k.textures;if(st.length!==wt.length||st[0]!==o.COLOR_ATTACHMENT0){for(let Dt=0,$t=wt.length;Dt<$t;Dt++)st[Dt]=o.COLOR_ATTACHMENT0+Dt;st.length=wt.length,gt=!0}}else st[0]!==o.BACK&&(st[0]=o.BACK,gt=!0);gt&&o.drawBuffers(st)}function ye(k){return T!==k?(o.useProgram(k),T=k,!0):!1}const ue={[ur]:o.FUNC_ADD,[Fx]:o.FUNC_SUBTRACT,[Bx]:o.FUNC_REVERSE_SUBTRACT};ue[Ix]=o.MIN,ue[Hx]=o.MAX;const we={[Gx]:o.ZERO,[Vx]:o.ONE,[kx]:o.SRC_COLOR,[fh]:o.SRC_ALPHA,[Zx]:o.SRC_ALPHA_SATURATE,[Yx]:o.DST_COLOR,[Wx]:o.DST_ALPHA,[Xx]:o.ONE_MINUS_SRC_COLOR,[hh]:o.ONE_MINUS_SRC_ALPHA,[jx]:o.ONE_MINUS_DST_COLOR,[qx]:o.ONE_MINUS_DST_ALPHA,[Kx]:o.CONSTANT_COLOR,[Qx]:o.ONE_MINUS_CONSTANT_COLOR,[Jx]:o.CONSTANT_ALPHA,[$x]:o.ONE_MINUS_CONSTANT_ALPHA};function B(k,Lt,st,gt,wt,Dt,$t,He,tn,Ee){if(k===La){C===!0&&(Rt(o.BLEND),C=!1);return}if(C===!1&&(Tt(o.BLEND),C=!0),k!==zx){if(k!==y||Ee!==w){if((_!==ur||D!==ur)&&(o.blendEquation(o.FUNC_ADD),_=ur,D=ur),Ee)switch(k){case hs:o.blendFuncSeparate(o.ONE,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case uh:o.blendFunc(o.ONE,o.ONE);break;case Hg:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case Gg:o.blendFuncSeparate(o.ZERO,o.SRC_COLOR,o.ZERO,o.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case hs:o.blendFuncSeparate(o.SRC_ALPHA,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case uh:o.blendFunc(o.SRC_ALPHA,o.ONE);break;case Hg:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case Gg:o.blendFunc(o.ZERO,o.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}P=null,O=null,H=null,F=null,z.set(0,0,0),K=0,y=k,w=Ee}return}wt=wt||Lt,Dt=Dt||st,$t=$t||gt,(Lt!==_||wt!==D)&&(o.blendEquationSeparate(ue[Lt],ue[wt]),_=Lt,D=wt),(st!==P||gt!==O||Dt!==H||$t!==F)&&(o.blendFuncSeparate(we[st],we[gt],we[Dt],we[$t]),P=st,O=gt,H=Dt,F=$t),(He.equals(z)===!1||tn!==K)&&(o.blendColor(He.r,He.g,He.b,tn),z.copy(He),K=tn),y=k,w=!1}function pn(k,Lt){k.side===$i?Rt(o.CULL_FACE):Tt(o.CULL_FACE);let st=k.side===Un;Lt&&(st=!st),se(st),k.blending===hs&&k.transparent===!1?B(La):B(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),h.setFunc(k.depthFunc),h.setTest(k.depthTest),h.setMask(k.depthWrite),u.setMask(k.colorWrite);const gt=k.stencilWrite;d.setTest(gt),gt&&(d.setMask(k.stencilWriteMask),d.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),d.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),De(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?Tt(o.SAMPLE_ALPHA_TO_COVERAGE):Rt(o.SAMPLE_ALPHA_TO_COVERAGE)}function se(k){R!==k&&(k?o.frontFace(o.CW):o.frontFace(o.CCW),R=k)}function he(k){k!==Nx?(Tt(o.CULL_FACE),k!==I&&(k===Ig?o.cullFace(o.BACK):k===Ox?o.cullFace(o.FRONT):o.cullFace(o.FRONT_AND_BACK))):Rt(o.CULL_FACE),I=k}function Wt(k){k!==ct&&(W&&o.lineWidth(k),ct=k)}function De(k,Lt,st){k?(Tt(o.POLYGON_OFFSET_FILL),(it!==Lt||mt!==st)&&(o.polygonOffset(Lt,st),it=Lt,mt=st)):Rt(o.POLYGON_OFFSET_FILL)}function qt(k){k?Tt(o.SCISSOR_TEST):Rt(o.SCISSOR_TEST)}function U(k){k===void 0&&(k=o.TEXTURE0+ht-1),St!==k&&(o.activeTexture(k),St=k)}function E(k,Lt,st){st===void 0&&(St===null?st=o.TEXTURE0+ht-1:st=St);let gt=L[st];gt===void 0&&(gt={type:void 0,texture:void 0},L[st]=gt),(gt.type!==k||gt.texture!==Lt)&&(St!==st&&(o.activeTexture(st),St=st),o.bindTexture(k,Lt||xt[k]),gt.type=k,gt.texture=Lt)}function tt(){const k=L[St];k!==void 0&&k.type!==void 0&&(o.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function ut(){try{o.compressedTexImage2D.apply(o,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function vt(){try{o.compressedTexImage3D.apply(o,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ft(){try{o.texSubImage2D.apply(o,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Vt(){try{o.texSubImage3D.apply(o,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ct(){try{o.compressedTexSubImage2D.apply(o,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function zt(){try{o.compressedTexSubImage3D.apply(o,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function me(){try{o.texStorage2D.apply(o,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Mt(){try{o.texStorage3D.apply(o,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Bt(){try{o.texImage2D.apply(o,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function jt(){try{o.texImage3D.apply(o,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function kt(k){At.equals(k)===!1&&(o.scissor(k.x,k.y,k.z,k.w),At.copy(k))}function It(k){q.equals(k)===!1&&(o.viewport(k.x,k.y,k.z,k.w),q.copy(k))}function re(k,Lt){let st=p.get(Lt);st===void 0&&(st=new WeakMap,p.set(Lt,st));let gt=st.get(k);gt===void 0&&(gt=o.getUniformBlockIndex(Lt,k.name),st.set(k,gt))}function Kt(k,Lt){const gt=p.get(Lt).get(k);m.get(Lt)!==gt&&(o.uniformBlockBinding(Lt,gt,k.__bindingPointIndex),m.set(Lt,gt))}function Ue(){o.disable(o.BLEND),o.disable(o.CULL_FACE),o.disable(o.DEPTH_TEST),o.disable(o.POLYGON_OFFSET_FILL),o.disable(o.SCISSOR_TEST),o.disable(o.STENCIL_TEST),o.disable(o.SAMPLE_ALPHA_TO_COVERAGE),o.blendEquation(o.FUNC_ADD),o.blendFunc(o.ONE,o.ZERO),o.blendFuncSeparate(o.ONE,o.ZERO,o.ONE,o.ZERO),o.blendColor(0,0,0,0),o.colorMask(!0,!0,!0,!0),o.clearColor(0,0,0,0),o.depthMask(!0),o.depthFunc(o.LESS),h.setReversed(!1),o.clearDepth(1),o.stencilMask(4294967295),o.stencilFunc(o.ALWAYS,0,4294967295),o.stencilOp(o.KEEP,o.KEEP,o.KEEP),o.clearStencil(0),o.cullFace(o.BACK),o.frontFace(o.CCW),o.polygonOffset(0,0),o.activeTexture(o.TEXTURE0),o.bindFramebuffer(o.FRAMEBUFFER,null),o.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),o.bindFramebuffer(o.READ_FRAMEBUFFER,null),o.useProgram(null),o.lineWidth(1),o.scissor(0,0,o.canvas.width,o.canvas.height),o.viewport(0,0,o.canvas.width,o.canvas.height),g={},St=null,L={},v={},x=new WeakMap,M=[],T=null,C=!1,y=null,_=null,P=null,O=null,D=null,H=null,F=null,z=new ie(0,0,0),K=0,w=!1,R=null,I=null,ct=null,it=null,mt=null,At.set(0,0,o.canvas.width,o.canvas.height),q.set(0,0,o.canvas.width,o.canvas.height),u.reset(),h.reset(),d.reset()}return{buffers:{color:u,depth:h,stencil:d},enable:Tt,disable:Rt,bindFramebuffer:Ft,drawBuffers:Gt,useProgram:ye,setBlending:B,setMaterial:pn,setFlipSided:se,setCullFace:he,setLineWidth:Wt,setPolygonOffset:De,setScissorTest:qt,activeTexture:U,bindTexture:E,unbindTexture:tt,compressedTexImage2D:ut,compressedTexImage3D:vt,texImage2D:Bt,texImage3D:jt,updateUBOMapping:re,uniformBlockBinding:Kt,texStorage2D:me,texStorage3D:Mt,texSubImage2D:ft,texSubImage3D:Vt,compressedTexSubImage2D:Ct,compressedTexSubImage3D:zt,scissor:kt,viewport:It,reset:Ue}}function Cb(o,t,i,r,l,u,h){const d=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new Ce,g=new WeakMap;let v;const x=new WeakMap;let M=!1;try{M=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function T(U,E){return M?new OffscreenCanvas(U,E):Do("canvas")}function C(U,E,tt){let ut=1;const vt=qt(U);if((vt.width>tt||vt.height>tt)&&(ut=tt/Math.max(vt.width,vt.height)),ut<1)if(typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&U instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&U instanceof ImageBitmap||typeof VideoFrame<"u"&&U instanceof VideoFrame){const ft=Math.floor(ut*vt.width),Vt=Math.floor(ut*vt.height);v===void 0&&(v=T(ft,Vt));const Ct=E?T(ft,Vt):v;return Ct.width=ft,Ct.height=Vt,Ct.getContext("2d").drawImage(U,0,0,ft,Vt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+vt.width+"x"+vt.height+") to ("+ft+"x"+Vt+")."),Ct}else return"data"in U&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+vt.width+"x"+vt.height+")."),U;return U}function y(U){return U.generateMipmaps}function _(U){o.generateMipmap(U)}function P(U){return U.isWebGLCubeRenderTarget?o.TEXTURE_CUBE_MAP:U.isWebGL3DRenderTarget?o.TEXTURE_3D:U.isWebGLArrayRenderTarget||U.isCompressedArrayTexture?o.TEXTURE_2D_ARRAY:o.TEXTURE_2D}function O(U,E,tt,ut,vt=!1){if(U!==null){if(o[U]!==void 0)return o[U];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+U+"'")}let ft=E;if(E===o.RED&&(tt===o.FLOAT&&(ft=o.R32F),tt===o.HALF_FLOAT&&(ft=o.R16F),tt===o.UNSIGNED_BYTE&&(ft=o.R8)),E===o.RED_INTEGER&&(tt===o.UNSIGNED_BYTE&&(ft=o.R8UI),tt===o.UNSIGNED_SHORT&&(ft=o.R16UI),tt===o.UNSIGNED_INT&&(ft=o.R32UI),tt===o.BYTE&&(ft=o.R8I),tt===o.SHORT&&(ft=o.R16I),tt===o.INT&&(ft=o.R32I)),E===o.RG&&(tt===o.FLOAT&&(ft=o.RG32F),tt===o.HALF_FLOAT&&(ft=o.RG16F),tt===o.UNSIGNED_BYTE&&(ft=o.RG8)),E===o.RG_INTEGER&&(tt===o.UNSIGNED_BYTE&&(ft=o.RG8UI),tt===o.UNSIGNED_SHORT&&(ft=o.RG16UI),tt===o.UNSIGNED_INT&&(ft=o.RG32UI),tt===o.BYTE&&(ft=o.RG8I),tt===o.SHORT&&(ft=o.RG16I),tt===o.INT&&(ft=o.RG32I)),E===o.RGB_INTEGER&&(tt===o.UNSIGNED_BYTE&&(ft=o.RGB8UI),tt===o.UNSIGNED_SHORT&&(ft=o.RGB16UI),tt===o.UNSIGNED_INT&&(ft=o.RGB32UI),tt===o.BYTE&&(ft=o.RGB8I),tt===o.SHORT&&(ft=o.RGB16I),tt===o.INT&&(ft=o.RGB32I)),E===o.RGBA_INTEGER&&(tt===o.UNSIGNED_BYTE&&(ft=o.RGBA8UI),tt===o.UNSIGNED_SHORT&&(ft=o.RGBA16UI),tt===o.UNSIGNED_INT&&(ft=o.RGBA32UI),tt===o.BYTE&&(ft=o.RGBA8I),tt===o.SHORT&&(ft=o.RGBA16I),tt===o.INT&&(ft=o.RGBA32I)),E===o.RGB&&tt===o.UNSIGNED_INT_5_9_9_9_REV&&(ft=o.RGB9_E5),E===o.RGBA){const Vt=vt?_c:Re.getTransfer(ut);tt===o.FLOAT&&(ft=o.RGBA32F),tt===o.HALF_FLOAT&&(ft=o.RGBA16F),tt===o.UNSIGNED_BYTE&&(ft=Vt===Pe?o.SRGB8_ALPHA8:o.RGBA8),tt===o.UNSIGNED_SHORT_4_4_4_4&&(ft=o.RGBA4),tt===o.UNSIGNED_SHORT_5_5_5_1&&(ft=o.RGB5_A1)}return(ft===o.R16F||ft===o.R32F||ft===o.RG16F||ft===o.RG32F||ft===o.RGBA16F||ft===o.RGBA32F)&&t.get("EXT_color_buffer_float"),ft}function D(U,E){let tt;return U?E===null||E===mr||E===xs?tt=o.DEPTH24_STENCIL8:E===ta?tt=o.DEPTH32F_STENCIL8:E===Co&&(tt=o.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===mr||E===xs?tt=o.DEPTH_COMPONENT24:E===ta?tt=o.DEPTH_COMPONENT32F:E===Co&&(tt=o.DEPTH_COMPONENT16),tt}function H(U,E){return y(U)===!0||U.isFramebufferTexture&&U.minFilter!==_i&&U.minFilter!==Ai?Math.log2(Math.max(E.width,E.height))+1:U.mipmaps!==void 0&&U.mipmaps.length>0?U.mipmaps.length:U.isCompressedTexture&&Array.isArray(U.image)?E.mipmaps.length:1}function F(U){const E=U.target;E.removeEventListener("dispose",F),K(E),E.isVideoTexture&&g.delete(E)}function z(U){const E=U.target;E.removeEventListener("dispose",z),R(E)}function K(U){const E=r.get(U);if(E.__webglInit===void 0)return;const tt=U.source,ut=x.get(tt);if(ut){const vt=ut[E.__cacheKey];vt.usedTimes--,vt.usedTimes===0&&w(U),Object.keys(ut).length===0&&x.delete(tt)}r.remove(U)}function w(U){const E=r.get(U);o.deleteTexture(E.__webglTexture);const tt=U.source,ut=x.get(tt);delete ut[E.__cacheKey],h.memory.textures--}function R(U){const E=r.get(U);if(U.depthTexture&&(U.depthTexture.dispose(),r.remove(U.depthTexture)),U.isWebGLCubeRenderTarget)for(let ut=0;ut<6;ut++){if(Array.isArray(E.__webglFramebuffer[ut]))for(let vt=0;vt<E.__webglFramebuffer[ut].length;vt++)o.deleteFramebuffer(E.__webglFramebuffer[ut][vt]);else o.deleteFramebuffer(E.__webglFramebuffer[ut]);E.__webglDepthbuffer&&o.deleteRenderbuffer(E.__webglDepthbuffer[ut])}else{if(Array.isArray(E.__webglFramebuffer))for(let ut=0;ut<E.__webglFramebuffer.length;ut++)o.deleteFramebuffer(E.__webglFramebuffer[ut]);else o.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&o.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&o.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let ut=0;ut<E.__webglColorRenderbuffer.length;ut++)E.__webglColorRenderbuffer[ut]&&o.deleteRenderbuffer(E.__webglColorRenderbuffer[ut]);E.__webglDepthRenderbuffer&&o.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const tt=U.textures;for(let ut=0,vt=tt.length;ut<vt;ut++){const ft=r.get(tt[ut]);ft.__webglTexture&&(o.deleteTexture(ft.__webglTexture),h.memory.textures--),r.remove(tt[ut])}r.remove(U)}let I=0;function ct(){I=0}function it(){const U=I;return U>=l.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+U+" texture units while this GPU supports only "+l.maxTextures),I+=1,U}function mt(U){const E=[];return E.push(U.wrapS),E.push(U.wrapT),E.push(U.wrapR||0),E.push(U.magFilter),E.push(U.minFilter),E.push(U.anisotropy),E.push(U.internalFormat),E.push(U.format),E.push(U.type),E.push(U.generateMipmaps),E.push(U.premultiplyAlpha),E.push(U.flipY),E.push(U.unpackAlignment),E.push(U.colorSpace),E.join()}function ht(U,E){const tt=r.get(U);if(U.isVideoTexture&&Wt(U),U.isRenderTargetTexture===!1&&U.version>0&&tt.__version!==U.version){const ut=U.image;if(ut===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ut.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(tt,U,E);return}}i.bindTexture(o.TEXTURE_2D,tt.__webglTexture,o.TEXTURE0+E)}function W(U,E){const tt=r.get(U);if(U.version>0&&tt.__version!==U.version){q(tt,U,E);return}i.bindTexture(o.TEXTURE_2D_ARRAY,tt.__webglTexture,o.TEXTURE0+E)}function at(U,E){const tt=r.get(U);if(U.version>0&&tt.__version!==U.version){q(tt,U,E);return}i.bindTexture(o.TEXTURE_3D,tt.__webglTexture,o.TEXTURE0+E)}function j(U,E){const tt=r.get(U);if(U.version>0&&tt.__version!==U.version){dt(tt,U,E);return}i.bindTexture(o.TEXTURE_CUBE_MAP,tt.__webglTexture,o.TEXTURE0+E)}const St={[Mh]:o.REPEAT,[dr]:o.CLAMP_TO_EDGE,[Eh]:o.MIRRORED_REPEAT},L={[_i]:o.NEAREST,[cS]:o.NEAREST_MIPMAP_NEAREST,[kl]:o.NEAREST_MIPMAP_LINEAR,[Ai]:o.LINEAR,[Uf]:o.LINEAR_MIPMAP_NEAREST,[pr]:o.LINEAR_MIPMAP_LINEAR},nt={[dS]:o.NEVER,[xS]:o.ALWAYS,[pS]:o.LESS,[Q_]:o.LEQUAL,[mS]:o.EQUAL,[vS]:o.GEQUAL,[gS]:o.GREATER,[_S]:o.NOTEQUAL};function Et(U,E){if(E.type===ta&&t.has("OES_texture_float_linear")===!1&&(E.magFilter===Ai||E.magFilter===Uf||E.magFilter===kl||E.magFilter===pr||E.minFilter===Ai||E.minFilter===Uf||E.minFilter===kl||E.minFilter===pr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),o.texParameteri(U,o.TEXTURE_WRAP_S,St[E.wrapS]),o.texParameteri(U,o.TEXTURE_WRAP_T,St[E.wrapT]),(U===o.TEXTURE_3D||U===o.TEXTURE_2D_ARRAY)&&o.texParameteri(U,o.TEXTURE_WRAP_R,St[E.wrapR]),o.texParameteri(U,o.TEXTURE_MAG_FILTER,L[E.magFilter]),o.texParameteri(U,o.TEXTURE_MIN_FILTER,L[E.minFilter]),E.compareFunction&&(o.texParameteri(U,o.TEXTURE_COMPARE_MODE,o.COMPARE_REF_TO_TEXTURE),o.texParameteri(U,o.TEXTURE_COMPARE_FUNC,nt[E.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===_i||E.minFilter!==kl&&E.minFilter!==pr||E.type===ta&&t.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||r.get(E).__currentAnisotropy){const tt=t.get("EXT_texture_filter_anisotropic");o.texParameterf(U,tt.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,l.getMaxAnisotropy())),r.get(E).__currentAnisotropy=E.anisotropy}}}function At(U,E){let tt=!1;U.__webglInit===void 0&&(U.__webglInit=!0,E.addEventListener("dispose",F));const ut=E.source;let vt=x.get(ut);vt===void 0&&(vt={},x.set(ut,vt));const ft=mt(E);if(ft!==U.__cacheKey){vt[ft]===void 0&&(vt[ft]={texture:o.createTexture(),usedTimes:0},h.memory.textures++,tt=!0),vt[ft].usedTimes++;const Vt=vt[U.__cacheKey];Vt!==void 0&&(vt[U.__cacheKey].usedTimes--,Vt.usedTimes===0&&w(E)),U.__cacheKey=ft,U.__webglTexture=vt[ft].texture}return tt}function q(U,E,tt){let ut=o.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(ut=o.TEXTURE_2D_ARRAY),E.isData3DTexture&&(ut=o.TEXTURE_3D);const vt=At(U,E),ft=E.source;i.bindTexture(ut,U.__webglTexture,o.TEXTURE0+tt);const Vt=r.get(ft);if(ft.version!==Vt.__version||vt===!0){i.activeTexture(o.TEXTURE0+tt);const Ct=Re.getPrimaries(Re.workingColorSpace),zt=E.colorSpace===Ua?null:Re.getPrimaries(E.colorSpace),me=E.colorSpace===Ua||Ct===zt?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,E.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,E.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);let Mt=C(E.image,!1,l.maxTextureSize);Mt=De(E,Mt);const Bt=u.convert(E.format,E.colorSpace),jt=u.convert(E.type);let kt=O(E.internalFormat,Bt,jt,E.colorSpace,E.isVideoTexture);Et(ut,E);let It;const re=E.mipmaps,Kt=E.isVideoTexture!==!0,Ue=Vt.__version===void 0||vt===!0,k=ft.dataReady,Lt=H(E,Mt);if(E.isDepthTexture)kt=D(E.format===Ss,E.type),Ue&&(Kt?i.texStorage2D(o.TEXTURE_2D,1,kt,Mt.width,Mt.height):i.texImage2D(o.TEXTURE_2D,0,kt,Mt.width,Mt.height,0,Bt,jt,null));else if(E.isDataTexture)if(re.length>0){Kt&&Ue&&i.texStorage2D(o.TEXTURE_2D,Lt,kt,re[0].width,re[0].height);for(let st=0,gt=re.length;st<gt;st++)It=re[st],Kt?k&&i.texSubImage2D(o.TEXTURE_2D,st,0,0,It.width,It.height,Bt,jt,It.data):i.texImage2D(o.TEXTURE_2D,st,kt,It.width,It.height,0,Bt,jt,It.data);E.generateMipmaps=!1}else Kt?(Ue&&i.texStorage2D(o.TEXTURE_2D,Lt,kt,Mt.width,Mt.height),k&&i.texSubImage2D(o.TEXTURE_2D,0,0,0,Mt.width,Mt.height,Bt,jt,Mt.data)):i.texImage2D(o.TEXTURE_2D,0,kt,Mt.width,Mt.height,0,Bt,jt,Mt.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Kt&&Ue&&i.texStorage3D(o.TEXTURE_2D_ARRAY,Lt,kt,re[0].width,re[0].height,Mt.depth);for(let st=0,gt=re.length;st<gt;st++)if(It=re[st],E.format!==gi)if(Bt!==null)if(Kt){if(k)if(E.layerUpdates.size>0){const wt=u_(It.width,It.height,E.format,E.type);for(const Dt of E.layerUpdates){const $t=It.data.subarray(Dt*wt/It.data.BYTES_PER_ELEMENT,(Dt+1)*wt/It.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,st,0,0,Dt,It.width,It.height,1,Bt,$t)}E.clearLayerUpdates()}else i.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,st,0,0,0,It.width,It.height,Mt.depth,Bt,It.data)}else i.compressedTexImage3D(o.TEXTURE_2D_ARRAY,st,kt,It.width,It.height,Mt.depth,0,It.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Kt?k&&i.texSubImage3D(o.TEXTURE_2D_ARRAY,st,0,0,0,It.width,It.height,Mt.depth,Bt,jt,It.data):i.texImage3D(o.TEXTURE_2D_ARRAY,st,kt,It.width,It.height,Mt.depth,0,Bt,jt,It.data)}else{Kt&&Ue&&i.texStorage2D(o.TEXTURE_2D,Lt,kt,re[0].width,re[0].height);for(let st=0,gt=re.length;st<gt;st++)It=re[st],E.format!==gi?Bt!==null?Kt?k&&i.compressedTexSubImage2D(o.TEXTURE_2D,st,0,0,It.width,It.height,Bt,It.data):i.compressedTexImage2D(o.TEXTURE_2D,st,kt,It.width,It.height,0,It.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Kt?k&&i.texSubImage2D(o.TEXTURE_2D,st,0,0,It.width,It.height,Bt,jt,It.data):i.texImage2D(o.TEXTURE_2D,st,kt,It.width,It.height,0,Bt,jt,It.data)}else if(E.isDataArrayTexture)if(Kt){if(Ue&&i.texStorage3D(o.TEXTURE_2D_ARRAY,Lt,kt,Mt.width,Mt.height,Mt.depth),k)if(E.layerUpdates.size>0){const st=u_(Mt.width,Mt.height,E.format,E.type);for(const gt of E.layerUpdates){const wt=Mt.data.subarray(gt*st/Mt.data.BYTES_PER_ELEMENT,(gt+1)*st/Mt.data.BYTES_PER_ELEMENT);i.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,gt,Mt.width,Mt.height,1,Bt,jt,wt)}E.clearLayerUpdates()}else i.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,0,Mt.width,Mt.height,Mt.depth,Bt,jt,Mt.data)}else i.texImage3D(o.TEXTURE_2D_ARRAY,0,kt,Mt.width,Mt.height,Mt.depth,0,Bt,jt,Mt.data);else if(E.isData3DTexture)Kt?(Ue&&i.texStorage3D(o.TEXTURE_3D,Lt,kt,Mt.width,Mt.height,Mt.depth),k&&i.texSubImage3D(o.TEXTURE_3D,0,0,0,0,Mt.width,Mt.height,Mt.depth,Bt,jt,Mt.data)):i.texImage3D(o.TEXTURE_3D,0,kt,Mt.width,Mt.height,Mt.depth,0,Bt,jt,Mt.data);else if(E.isFramebufferTexture){if(Ue)if(Kt)i.texStorage2D(o.TEXTURE_2D,Lt,kt,Mt.width,Mt.height);else{let st=Mt.width,gt=Mt.height;for(let wt=0;wt<Lt;wt++)i.texImage2D(o.TEXTURE_2D,wt,kt,st,gt,0,Bt,jt,null),st>>=1,gt>>=1}}else if(re.length>0){if(Kt&&Ue){const st=qt(re[0]);i.texStorage2D(o.TEXTURE_2D,Lt,kt,st.width,st.height)}for(let st=0,gt=re.length;st<gt;st++)It=re[st],Kt?k&&i.texSubImage2D(o.TEXTURE_2D,st,0,0,Bt,jt,It):i.texImage2D(o.TEXTURE_2D,st,kt,Bt,jt,It);E.generateMipmaps=!1}else if(Kt){if(Ue){const st=qt(Mt);i.texStorage2D(o.TEXTURE_2D,Lt,kt,st.width,st.height)}k&&i.texSubImage2D(o.TEXTURE_2D,0,0,0,Bt,jt,Mt)}else i.texImage2D(o.TEXTURE_2D,0,kt,Bt,jt,Mt);y(E)&&_(ut),Vt.__version=ft.version,E.onUpdate&&E.onUpdate(E)}U.__version=E.version}function dt(U,E,tt){if(E.image.length!==6)return;const ut=At(U,E),vt=E.source;i.bindTexture(o.TEXTURE_CUBE_MAP,U.__webglTexture,o.TEXTURE0+tt);const ft=r.get(vt);if(vt.version!==ft.__version||ut===!0){i.activeTexture(o.TEXTURE0+tt);const Vt=Re.getPrimaries(Re.workingColorSpace),Ct=E.colorSpace===Ua?null:Re.getPrimaries(E.colorSpace),zt=E.colorSpace===Ua||Vt===Ct?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,E.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,E.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,zt);const me=E.isCompressedTexture||E.image[0].isCompressedTexture,Mt=E.image[0]&&E.image[0].isDataTexture,Bt=[];for(let gt=0;gt<6;gt++)!me&&!Mt?Bt[gt]=C(E.image[gt],!0,l.maxCubemapSize):Bt[gt]=Mt?E.image[gt].image:E.image[gt],Bt[gt]=De(E,Bt[gt]);const jt=Bt[0],kt=u.convert(E.format,E.colorSpace),It=u.convert(E.type),re=O(E.internalFormat,kt,It,E.colorSpace),Kt=E.isVideoTexture!==!0,Ue=ft.__version===void 0||ut===!0,k=vt.dataReady;let Lt=H(E,jt);Et(o.TEXTURE_CUBE_MAP,E);let st;if(me){Kt&&Ue&&i.texStorage2D(o.TEXTURE_CUBE_MAP,Lt,re,jt.width,jt.height);for(let gt=0;gt<6;gt++){st=Bt[gt].mipmaps;for(let wt=0;wt<st.length;wt++){const Dt=st[wt];E.format!==gi?kt!==null?Kt?k&&i.compressedTexSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+gt,wt,0,0,Dt.width,Dt.height,kt,Dt.data):i.compressedTexImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+gt,wt,re,Dt.width,Dt.height,0,Dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Kt?k&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+gt,wt,0,0,Dt.width,Dt.height,kt,It,Dt.data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+gt,wt,re,Dt.width,Dt.height,0,kt,It,Dt.data)}}}else{if(st=E.mipmaps,Kt&&Ue){st.length>0&&Lt++;const gt=qt(Bt[0]);i.texStorage2D(o.TEXTURE_CUBE_MAP,Lt,re,gt.width,gt.height)}for(let gt=0;gt<6;gt++)if(Mt){Kt?k&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,0,0,Bt[gt].width,Bt[gt].height,kt,It,Bt[gt].data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,re,Bt[gt].width,Bt[gt].height,0,kt,It,Bt[gt].data);for(let wt=0;wt<st.length;wt++){const $t=st[wt].image[gt].image;Kt?k&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+gt,wt+1,0,0,$t.width,$t.height,kt,It,$t.data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+gt,wt+1,re,$t.width,$t.height,0,kt,It,$t.data)}}else{Kt?k&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,0,0,kt,It,Bt[gt]):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,re,kt,It,Bt[gt]);for(let wt=0;wt<st.length;wt++){const Dt=st[wt];Kt?k&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+gt,wt+1,0,0,kt,It,Dt.image[gt]):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+gt,wt+1,re,kt,It,Dt.image[gt])}}}y(E)&&_(o.TEXTURE_CUBE_MAP),ft.__version=vt.version,E.onUpdate&&E.onUpdate(E)}U.__version=E.version}function xt(U,E,tt,ut,vt,ft){const Vt=u.convert(tt.format,tt.colorSpace),Ct=u.convert(tt.type),zt=O(tt.internalFormat,Vt,Ct,tt.colorSpace),me=r.get(E),Mt=r.get(tt);if(Mt.__renderTarget=E,!me.__hasExternalTextures){const Bt=Math.max(1,E.width>>ft),jt=Math.max(1,E.height>>ft);vt===o.TEXTURE_3D||vt===o.TEXTURE_2D_ARRAY?i.texImage3D(vt,ft,zt,Bt,jt,E.depth,0,Vt,Ct,null):i.texImage2D(vt,ft,zt,Bt,jt,0,Vt,Ct,null)}i.bindFramebuffer(o.FRAMEBUFFER,U),he(E)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,ut,vt,Mt.__webglTexture,0,se(E)):(vt===o.TEXTURE_2D||vt>=o.TEXTURE_CUBE_MAP_POSITIVE_X&&vt<=o.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&o.framebufferTexture2D(o.FRAMEBUFFER,ut,vt,Mt.__webglTexture,ft),i.bindFramebuffer(o.FRAMEBUFFER,null)}function Tt(U,E,tt){if(o.bindRenderbuffer(o.RENDERBUFFER,U),E.depthBuffer){const ut=E.depthTexture,vt=ut&&ut.isDepthTexture?ut.type:null,ft=D(E.stencilBuffer,vt),Vt=E.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Ct=se(E);he(E)?d.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,Ct,ft,E.width,E.height):tt?o.renderbufferStorageMultisample(o.RENDERBUFFER,Ct,ft,E.width,E.height):o.renderbufferStorage(o.RENDERBUFFER,ft,E.width,E.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,Vt,o.RENDERBUFFER,U)}else{const ut=E.textures;for(let vt=0;vt<ut.length;vt++){const ft=ut[vt],Vt=u.convert(ft.format,ft.colorSpace),Ct=u.convert(ft.type),zt=O(ft.internalFormat,Vt,Ct,ft.colorSpace),me=se(E);tt&&he(E)===!1?o.renderbufferStorageMultisample(o.RENDERBUFFER,me,zt,E.width,E.height):he(E)?d.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,me,zt,E.width,E.height):o.renderbufferStorage(o.RENDERBUFFER,zt,E.width,E.height)}}o.bindRenderbuffer(o.RENDERBUFFER,null)}function Rt(U,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(i.bindFramebuffer(o.FRAMEBUFFER,U),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ut=r.get(E.depthTexture);ut.__renderTarget=E,(!ut.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),ht(E.depthTexture,0);const vt=ut.__webglTexture,ft=se(E);if(E.depthTexture.format===ds)he(E)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.TEXTURE_2D,vt,0,ft):o.framebufferTexture2D(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.TEXTURE_2D,vt,0);else if(E.depthTexture.format===Ss)he(E)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,o.DEPTH_STENCIL_ATTACHMENT,o.TEXTURE_2D,vt,0,ft):o.framebufferTexture2D(o.FRAMEBUFFER,o.DEPTH_STENCIL_ATTACHMENT,o.TEXTURE_2D,vt,0);else throw new Error("Unknown depthTexture format")}function Ft(U){const E=r.get(U),tt=U.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==U.depthTexture){const ut=U.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),ut){const vt=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,ut.removeEventListener("dispose",vt)};ut.addEventListener("dispose",vt),E.__depthDisposeCallback=vt}E.__boundDepthTexture=ut}if(U.depthTexture&&!E.__autoAllocateDepthBuffer){if(tt)throw new Error("target.depthTexture not supported in Cube render targets");Rt(E.__webglFramebuffer,U)}else if(tt){E.__webglDepthbuffer=[];for(let ut=0;ut<6;ut++)if(i.bindFramebuffer(o.FRAMEBUFFER,E.__webglFramebuffer[ut]),E.__webglDepthbuffer[ut]===void 0)E.__webglDepthbuffer[ut]=o.createRenderbuffer(),Tt(E.__webglDepthbuffer[ut],U,!1);else{const vt=U.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,ft=E.__webglDepthbuffer[ut];o.bindRenderbuffer(o.RENDERBUFFER,ft),o.framebufferRenderbuffer(o.FRAMEBUFFER,vt,o.RENDERBUFFER,ft)}}else if(i.bindFramebuffer(o.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=o.createRenderbuffer(),Tt(E.__webglDepthbuffer,U,!1);else{const ut=U.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,vt=E.__webglDepthbuffer;o.bindRenderbuffer(o.RENDERBUFFER,vt),o.framebufferRenderbuffer(o.FRAMEBUFFER,ut,o.RENDERBUFFER,vt)}i.bindFramebuffer(o.FRAMEBUFFER,null)}function Gt(U,E,tt){const ut=r.get(U);E!==void 0&&xt(ut.__webglFramebuffer,U,U.texture,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,0),tt!==void 0&&Ft(U)}function ye(U){const E=U.texture,tt=r.get(U),ut=r.get(E);U.addEventListener("dispose",z);const vt=U.textures,ft=U.isWebGLCubeRenderTarget===!0,Vt=vt.length>1;if(Vt||(ut.__webglTexture===void 0&&(ut.__webglTexture=o.createTexture()),ut.__version=E.version,h.memory.textures++),ft){tt.__webglFramebuffer=[];for(let Ct=0;Ct<6;Ct++)if(E.mipmaps&&E.mipmaps.length>0){tt.__webglFramebuffer[Ct]=[];for(let zt=0;zt<E.mipmaps.length;zt++)tt.__webglFramebuffer[Ct][zt]=o.createFramebuffer()}else tt.__webglFramebuffer[Ct]=o.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){tt.__webglFramebuffer=[];for(let Ct=0;Ct<E.mipmaps.length;Ct++)tt.__webglFramebuffer[Ct]=o.createFramebuffer()}else tt.__webglFramebuffer=o.createFramebuffer();if(Vt)for(let Ct=0,zt=vt.length;Ct<zt;Ct++){const me=r.get(vt[Ct]);me.__webglTexture===void 0&&(me.__webglTexture=o.createTexture(),h.memory.textures++)}if(U.samples>0&&he(U)===!1){tt.__webglMultisampledFramebuffer=o.createFramebuffer(),tt.__webglColorRenderbuffer=[],i.bindFramebuffer(o.FRAMEBUFFER,tt.__webglMultisampledFramebuffer);for(let Ct=0;Ct<vt.length;Ct++){const zt=vt[Ct];tt.__webglColorRenderbuffer[Ct]=o.createRenderbuffer(),o.bindRenderbuffer(o.RENDERBUFFER,tt.__webglColorRenderbuffer[Ct]);const me=u.convert(zt.format,zt.colorSpace),Mt=u.convert(zt.type),Bt=O(zt.internalFormat,me,Mt,zt.colorSpace,U.isXRRenderTarget===!0),jt=se(U);o.renderbufferStorageMultisample(o.RENDERBUFFER,jt,Bt,U.width,U.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+Ct,o.RENDERBUFFER,tt.__webglColorRenderbuffer[Ct])}o.bindRenderbuffer(o.RENDERBUFFER,null),U.depthBuffer&&(tt.__webglDepthRenderbuffer=o.createRenderbuffer(),Tt(tt.__webglDepthRenderbuffer,U,!0)),i.bindFramebuffer(o.FRAMEBUFFER,null)}}if(ft){i.bindTexture(o.TEXTURE_CUBE_MAP,ut.__webglTexture),Et(o.TEXTURE_CUBE_MAP,E);for(let Ct=0;Ct<6;Ct++)if(E.mipmaps&&E.mipmaps.length>0)for(let zt=0;zt<E.mipmaps.length;zt++)xt(tt.__webglFramebuffer[Ct][zt],U,E,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,zt);else xt(tt.__webglFramebuffer[Ct],U,E,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,0);y(E)&&_(o.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(Vt){for(let Ct=0,zt=vt.length;Ct<zt;Ct++){const me=vt[Ct],Mt=r.get(me);i.bindTexture(o.TEXTURE_2D,Mt.__webglTexture),Et(o.TEXTURE_2D,me),xt(tt.__webglFramebuffer,U,me,o.COLOR_ATTACHMENT0+Ct,o.TEXTURE_2D,0),y(me)&&_(o.TEXTURE_2D)}i.unbindTexture()}else{let Ct=o.TEXTURE_2D;if((U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(Ct=U.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY),i.bindTexture(Ct,ut.__webglTexture),Et(Ct,E),E.mipmaps&&E.mipmaps.length>0)for(let zt=0;zt<E.mipmaps.length;zt++)xt(tt.__webglFramebuffer[zt],U,E,o.COLOR_ATTACHMENT0,Ct,zt);else xt(tt.__webglFramebuffer,U,E,o.COLOR_ATTACHMENT0,Ct,0);y(E)&&_(Ct),i.unbindTexture()}U.depthBuffer&&Ft(U)}function ue(U){const E=U.textures;for(let tt=0,ut=E.length;tt<ut;tt++){const vt=E[tt];if(y(vt)){const ft=P(U),Vt=r.get(vt).__webglTexture;i.bindTexture(ft,Vt),_(ft),i.unbindTexture()}}}const we=[],B=[];function pn(U){if(U.samples>0){if(he(U)===!1){const E=U.textures,tt=U.width,ut=U.height;let vt=o.COLOR_BUFFER_BIT;const ft=U.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Vt=r.get(U),Ct=E.length>1;if(Ct)for(let zt=0;zt<E.length;zt++)i.bindFramebuffer(o.FRAMEBUFFER,Vt.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+zt,o.RENDERBUFFER,null),i.bindFramebuffer(o.FRAMEBUFFER,Vt.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+zt,o.TEXTURE_2D,null,0);i.bindFramebuffer(o.READ_FRAMEBUFFER,Vt.__webglMultisampledFramebuffer),i.bindFramebuffer(o.DRAW_FRAMEBUFFER,Vt.__webglFramebuffer);for(let zt=0;zt<E.length;zt++){if(U.resolveDepthBuffer&&(U.depthBuffer&&(vt|=o.DEPTH_BUFFER_BIT),U.stencilBuffer&&U.resolveStencilBuffer&&(vt|=o.STENCIL_BUFFER_BIT)),Ct){o.framebufferRenderbuffer(o.READ_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.RENDERBUFFER,Vt.__webglColorRenderbuffer[zt]);const me=r.get(E[zt]).__webglTexture;o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,me,0)}o.blitFramebuffer(0,0,tt,ut,0,0,tt,ut,vt,o.NEAREST),m===!0&&(we.length=0,B.length=0,we.push(o.COLOR_ATTACHMENT0+zt),U.depthBuffer&&U.resolveDepthBuffer===!1&&(we.push(ft),B.push(ft),o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,B)),o.invalidateFramebuffer(o.READ_FRAMEBUFFER,we))}if(i.bindFramebuffer(o.READ_FRAMEBUFFER,null),i.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),Ct)for(let zt=0;zt<E.length;zt++){i.bindFramebuffer(o.FRAMEBUFFER,Vt.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+zt,o.RENDERBUFFER,Vt.__webglColorRenderbuffer[zt]);const me=r.get(E[zt]).__webglTexture;i.bindFramebuffer(o.FRAMEBUFFER,Vt.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+zt,o.TEXTURE_2D,me,0)}i.bindFramebuffer(o.DRAW_FRAMEBUFFER,Vt.__webglMultisampledFramebuffer)}else if(U.depthBuffer&&U.resolveDepthBuffer===!1&&m){const E=U.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,[E])}}}function se(U){return Math.min(l.maxSamples,U.samples)}function he(U){const E=r.get(U);return U.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Wt(U){const E=h.render.frame;g.get(U)!==E&&(g.set(U,E),U.update())}function De(U,E){const tt=U.colorSpace,ut=U.format,vt=U.type;return U.isCompressedTexture===!0||U.isVideoTexture===!0||tt!==ys&&tt!==Ua&&(Re.getTransfer(tt)===Pe?(ut!==gi||vt!==ia)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",tt)),E}function qt(U){return typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement?(p.width=U.naturalWidth||U.width,p.height=U.naturalHeight||U.height):typeof VideoFrame<"u"&&U instanceof VideoFrame?(p.width=U.displayWidth,p.height=U.displayHeight):(p.width=U.width,p.height=U.height),p}this.allocateTextureUnit=it,this.resetTextureUnits=ct,this.setTexture2D=ht,this.setTexture2DArray=W,this.setTexture3D=at,this.setTextureCube=j,this.rebindTextures=Gt,this.setupRenderTarget=ye,this.updateRenderTargetMipmap=ue,this.updateMultisampleRenderTarget=pn,this.setupDepthRenderbuffer=Ft,this.setupFrameBufferTexture=xt,this.useMultisampledRTT=he}function Db(o,t){function i(r,l=Ua){let u;const h=Re.getTransfer(l);if(r===ia)return o.UNSIGNED_BYTE;if(r===nd)return o.UNSIGNED_SHORT_4_4_4_4;if(r===id)return o.UNSIGNED_SHORT_5_5_5_1;if(r===V_)return o.UNSIGNED_INT_5_9_9_9_REV;if(r===H_)return o.BYTE;if(r===G_)return o.SHORT;if(r===Co)return o.UNSIGNED_SHORT;if(r===ed)return o.INT;if(r===mr)return o.UNSIGNED_INT;if(r===ta)return o.FLOAT;if(r===Uo)return o.HALF_FLOAT;if(r===k_)return o.ALPHA;if(r===X_)return o.RGB;if(r===gi)return o.RGBA;if(r===W_)return o.LUMINANCE;if(r===q_)return o.LUMINANCE_ALPHA;if(r===ds)return o.DEPTH_COMPONENT;if(r===Ss)return o.DEPTH_STENCIL;if(r===Y_)return o.RED;if(r===ad)return o.RED_INTEGER;if(r===j_)return o.RG;if(r===rd)return o.RG_INTEGER;if(r===sd)return o.RGBA_INTEGER;if(r===fc||r===hc||r===dc||r===pc)if(h===Pe)if(u=t.get("WEBGL_compressed_texture_s3tc_srgb"),u!==null){if(r===fc)return u.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===hc)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===dc)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===pc)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(u=t.get("WEBGL_compressed_texture_s3tc"),u!==null){if(r===fc)return u.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===hc)return u.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===dc)return u.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===pc)return u.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Th||r===bh||r===Ah||r===Rh)if(u=t.get("WEBGL_compressed_texture_pvrtc"),u!==null){if(r===Th)return u.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===bh)return u.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Ah)return u.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Rh)return u.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===wh||r===Ch||r===Dh)if(u=t.get("WEBGL_compressed_texture_etc"),u!==null){if(r===wh||r===Ch)return h===Pe?u.COMPRESSED_SRGB8_ETC2:u.COMPRESSED_RGB8_ETC2;if(r===Dh)return h===Pe?u.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:u.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Uh||r===Lh||r===Nh||r===Oh||r===Ph||r===zh||r===Fh||r===Bh||r===Ih||r===Hh||r===Gh||r===Vh||r===kh||r===Xh)if(u=t.get("WEBGL_compressed_texture_astc"),u!==null){if(r===Uh)return h===Pe?u.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:u.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Lh)return h===Pe?u.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:u.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Nh)return h===Pe?u.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:u.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Oh)return h===Pe?u.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:u.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Ph)return h===Pe?u.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:u.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===zh)return h===Pe?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:u.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Fh)return h===Pe?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:u.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Bh)return h===Pe?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:u.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Ih)return h===Pe?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:u.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Hh)return h===Pe?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:u.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Gh)return h===Pe?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:u.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Vh)return h===Pe?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:u.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===kh)return h===Pe?u.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:u.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Xh)return h===Pe?u.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:u.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===mc||r===Wh||r===qh)if(u=t.get("EXT_texture_compression_bptc"),u!==null){if(r===mc)return h===Pe?u.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:u.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Wh)return u.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===qh)return u.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Z_||r===Yh||r===jh||r===Zh)if(u=t.get("EXT_texture_compression_rgtc"),u!==null){if(r===mc)return u.COMPRESSED_RED_RGTC1_EXT;if(r===Yh)return u.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===jh)return u.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Zh)return u.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===xs?o.UNSIGNED_INT_24_8:o[r]!==void 0?o[r]:null}return{convert:i}}const Ub={type:"move"};class sh{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new oc,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new oc,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new rt,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new rt),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new oc,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new rt,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new rt),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const i=this._hand;if(i)for(const r of t.hand.values())this._getHandJoint(i,r)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,i,r){let l=null,u=null,h=null;const d=this._targetRay,m=this._grip,p=this._hand;if(t&&i.session.visibilityState!=="visible-blurred"){if(p&&t.hand){h=!0;for(const C of t.hand.values()){const y=i.getJointPose(C,r),_=this._getHandJoint(p,C);y!==null&&(_.matrix.fromArray(y.transform.matrix),_.matrix.decompose(_.position,_.rotation,_.scale),_.matrixWorldNeedsUpdate=!0,_.jointRadius=y.radius),_.visible=y!==null}const g=p.joints["index-finger-tip"],v=p.joints["thumb-tip"],x=g.position.distanceTo(v.position),M=.02,T=.005;p.inputState.pinching&&x>M+T?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!p.inputState.pinching&&x<=M-T&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else m!==null&&t.gripSpace&&(u=i.getPose(t.gripSpace,r),u!==null&&(m.matrix.fromArray(u.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,u.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(u.linearVelocity)):m.hasLinearVelocity=!1,u.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(u.angularVelocity)):m.hasAngularVelocity=!1));d!==null&&(l=i.getPose(t.targetRaySpace,r),l===null&&u!==null&&(l=u),l!==null&&(d.matrix.fromArray(l.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,l.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(l.linearVelocity)):d.hasLinearVelocity=!1,l.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(l.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(Ub)))}return d!==null&&(d.visible=l!==null),m!==null&&(m.visible=u!==null),p!==null&&(p.visible=h!==null),this}_getHandJoint(t,i){if(t.joints[i.jointName]===void 0){const r=new oc;r.matrixAutoUpdate=!1,r.visible=!1,t.joints[i.jointName]=r,t.add(r)}return t.joints[i.jointName]}}const Lb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Nb=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Ob{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,i,r){if(this.texture===null){const l=new Ln,u=t.properties.get(l);u.__webglTexture=i.texture,(i.depthNear!==r.depthNear||i.depthFar!==r.depthFar)&&(this.depthNear=i.depthNear,this.depthFar=i.depthFar),this.texture=l}}getMesh(t){if(this.texture!==null&&this.mesh===null){const i=t.cameras[0].viewport,r=new vi({vertexShader:Lb,fragmentShader:Nb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new Bn(new Ts(20,20),r)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Pb extends Es{constructor(t,i){super();const r=this;let l=null,u=1,h=null,d="local-floor",m=1,p=null,g=null,v=null,x=null,M=null,T=null;const C=new Ob,y=i.getContextAttributes();let _=null,P=null;const O=[],D=[],H=new Ce;let F=null;const z=new Yn;z.viewport=new je;const K=new Yn;K.viewport=new je;const w=[z,K],R=new ny;let I=null,ct=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let dt=O[q];return dt===void 0&&(dt=new sh,O[q]=dt),dt.getTargetRaySpace()},this.getControllerGrip=function(q){let dt=O[q];return dt===void 0&&(dt=new sh,O[q]=dt),dt.getGripSpace()},this.getHand=function(q){let dt=O[q];return dt===void 0&&(dt=new sh,O[q]=dt),dt.getHandSpace()};function it(q){const dt=D.indexOf(q.inputSource);if(dt===-1)return;const xt=O[dt];xt!==void 0&&(xt.update(q.inputSource,q.frame,p||h),xt.dispatchEvent({type:q.type,data:q.inputSource}))}function mt(){l.removeEventListener("select",it),l.removeEventListener("selectstart",it),l.removeEventListener("selectend",it),l.removeEventListener("squeeze",it),l.removeEventListener("squeezestart",it),l.removeEventListener("squeezeend",it),l.removeEventListener("end",mt),l.removeEventListener("inputsourceschange",ht);for(let q=0;q<O.length;q++){const dt=D[q];dt!==null&&(D[q]=null,O[q].disconnect(dt))}I=null,ct=null,C.reset(),t.setRenderTarget(_),M=null,x=null,v=null,l=null,P=null,At.stop(),r.isPresenting=!1,t.setPixelRatio(F),t.setSize(H.width,H.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){u=q,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){d=q,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||h},this.setReferenceSpace=function(q){p=q},this.getBaseLayer=function(){return x!==null?x:M},this.getBinding=function(){return v},this.getFrame=function(){return T},this.getSession=function(){return l},this.setSession=async function(q){if(l=q,l!==null){if(_=t.getRenderTarget(),l.addEventListener("select",it),l.addEventListener("selectstart",it),l.addEventListener("selectend",it),l.addEventListener("squeeze",it),l.addEventListener("squeezestart",it),l.addEventListener("squeezeend",it),l.addEventListener("end",mt),l.addEventListener("inputsourceschange",ht),y.xrCompatible!==!0&&await i.makeXRCompatible(),F=t.getPixelRatio(),t.getSize(H),l.enabledFeatures!==void 0&&l.enabledFeatures.includes("layers")){let xt=null,Tt=null,Rt=null;y.depth&&(Rt=y.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,xt=y.stencil?Ss:ds,Tt=y.stencil?xs:mr);const Ft={colorFormat:i.RGBA8,depthFormat:Rt,scaleFactor:u};v=new XRWebGLBinding(l,i),x=v.createProjectionLayer(Ft),l.updateRenderState({layers:[x]}),t.setPixelRatio(1),t.setSize(x.textureWidth,x.textureHeight,!1),P=new gr(x.textureWidth,x.textureHeight,{format:gi,type:ia,depthTexture:new u0(x.textureWidth,x.textureHeight,Tt,void 0,void 0,void 0,void 0,void 0,void 0,xt),stencilBuffer:y.stencil,colorSpace:t.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:x.ignoreDepthValues===!1})}else{const xt={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:u};M=new XRWebGLLayer(l,i,xt),l.updateRenderState({baseLayer:M}),t.setPixelRatio(1),t.setSize(M.framebufferWidth,M.framebufferHeight,!1),P=new gr(M.framebufferWidth,M.framebufferHeight,{format:gi,type:ia,colorSpace:t.outputColorSpace,stencilBuffer:y.stencil})}P.isXRRenderTarget=!0,this.setFoveation(m),p=null,h=await l.requestReferenceSpace(d),At.setContext(l),At.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return C.getDepthTexture()};function ht(q){for(let dt=0;dt<q.removed.length;dt++){const xt=q.removed[dt],Tt=D.indexOf(xt);Tt>=0&&(D[Tt]=null,O[Tt].disconnect(xt))}for(let dt=0;dt<q.added.length;dt++){const xt=q.added[dt];let Tt=D.indexOf(xt);if(Tt===-1){for(let Ft=0;Ft<O.length;Ft++)if(Ft>=D.length){D.push(xt),Tt=Ft;break}else if(D[Ft]===null){D[Ft]=xt,Tt=Ft;break}if(Tt===-1)break}const Rt=O[Tt];Rt&&Rt.connect(xt)}}const W=new rt,at=new rt;function j(q,dt,xt){W.setFromMatrixPosition(dt.matrixWorld),at.setFromMatrixPosition(xt.matrixWorld);const Tt=W.distanceTo(at),Rt=dt.projectionMatrix.elements,Ft=xt.projectionMatrix.elements,Gt=Rt[14]/(Rt[10]-1),ye=Rt[14]/(Rt[10]+1),ue=(Rt[9]+1)/Rt[5],we=(Rt[9]-1)/Rt[5],B=(Rt[8]-1)/Rt[0],pn=(Ft[8]+1)/Ft[0],se=Gt*B,he=Gt*pn,Wt=Tt/(-B+pn),De=Wt*-B;if(dt.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(De),q.translateZ(Wt),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),Rt[10]===-1)q.projectionMatrix.copy(dt.projectionMatrix),q.projectionMatrixInverse.copy(dt.projectionMatrixInverse);else{const qt=Gt+Wt,U=ye+Wt,E=se-De,tt=he+(Tt-De),ut=ue*ye/U*qt,vt=we*ye/U*qt;q.projectionMatrix.makePerspective(E,tt,ut,vt,qt,U),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function St(q,dt){dt===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(dt.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(l===null)return;let dt=q.near,xt=q.far;C.texture!==null&&(C.depthNear>0&&(dt=C.depthNear),C.depthFar>0&&(xt=C.depthFar)),R.near=K.near=z.near=dt,R.far=K.far=z.far=xt,(I!==R.near||ct!==R.far)&&(l.updateRenderState({depthNear:R.near,depthFar:R.far}),I=R.near,ct=R.far),z.layers.mask=q.layers.mask|2,K.layers.mask=q.layers.mask|4,R.layers.mask=z.layers.mask|K.layers.mask;const Tt=q.parent,Rt=R.cameras;St(R,Tt);for(let Ft=0;Ft<Rt.length;Ft++)St(Rt[Ft],Tt);Rt.length===2?j(R,z,K):R.projectionMatrix.copy(z.projectionMatrix),L(q,R,Tt)};function L(q,dt,xt){xt===null?q.matrix.copy(dt.matrixWorld):(q.matrix.copy(xt.matrixWorld),q.matrix.invert(),q.matrix.multiply(dt.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(dt.projectionMatrix),q.projectionMatrixInverse.copy(dt.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Kh*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return R},this.getFoveation=function(){if(!(x===null&&M===null))return m},this.setFoveation=function(q){m=q,x!==null&&(x.fixedFoveation=q),M!==null&&M.fixedFoveation!==void 0&&(M.fixedFoveation=q)},this.hasDepthSensing=function(){return C.texture!==null},this.getDepthSensingMesh=function(){return C.getMesh(R)};let nt=null;function Et(q,dt){if(g=dt.getViewerPose(p||h),T=dt,g!==null){const xt=g.views;M!==null&&(t.setRenderTargetFramebuffer(P,M.framebuffer),t.setRenderTarget(P));let Tt=!1;xt.length!==R.cameras.length&&(R.cameras.length=0,Tt=!0);for(let Ft=0;Ft<xt.length;Ft++){const Gt=xt[Ft];let ye=null;if(M!==null)ye=M.getViewport(Gt);else{const we=v.getViewSubImage(x,Gt);ye=we.viewport,Ft===0&&(t.setRenderTargetTextures(P,we.colorTexture,x.ignoreDepthValues?void 0:we.depthStencilTexture),t.setRenderTarget(P))}let ue=w[Ft];ue===void 0&&(ue=new Yn,ue.layers.enable(Ft),ue.viewport=new je,w[Ft]=ue),ue.matrix.fromArray(Gt.transform.matrix),ue.matrix.decompose(ue.position,ue.quaternion,ue.scale),ue.projectionMatrix.fromArray(Gt.projectionMatrix),ue.projectionMatrixInverse.copy(ue.projectionMatrix).invert(),ue.viewport.set(ye.x,ye.y,ye.width,ye.height),Ft===0&&(R.matrix.copy(ue.matrix),R.matrix.decompose(R.position,R.quaternion,R.scale)),Tt===!0&&R.cameras.push(ue)}const Rt=l.enabledFeatures;if(Rt&&Rt.includes("depth-sensing")){const Ft=v.getDepthInformation(xt[0]);Ft&&Ft.isValid&&Ft.texture&&C.init(t,Ft,l.renderState)}}for(let xt=0;xt<O.length;xt++){const Tt=D[xt],Rt=O[xt];Tt!==null&&Rt!==void 0&&Rt.update(Tt,dt,p||h)}nt&&nt(q,dt),dt.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:dt}),T=null}const At=new h0;At.setAnimationLoop(Et),this.setAnimationLoop=function(q){nt=q},this.dispose=function(){}}}const or=new Ci,zb=new $e;function Fb(o,t){function i(y,_){y.matrixAutoUpdate===!0&&y.updateMatrix(),_.value.copy(y.matrix)}function r(y,_){_.color.getRGB(y.fogColor.value,s0(o)),_.isFog?(y.fogNear.value=_.near,y.fogFar.value=_.far):_.isFogExp2&&(y.fogDensity.value=_.density)}function l(y,_,P,O,D){_.isMeshBasicMaterial||_.isMeshLambertMaterial?u(y,_):_.isMeshToonMaterial?(u(y,_),v(y,_)):_.isMeshPhongMaterial?(u(y,_),g(y,_)):_.isMeshStandardMaterial?(u(y,_),x(y,_),_.isMeshPhysicalMaterial&&M(y,_,D)):_.isMeshMatcapMaterial?(u(y,_),T(y,_)):_.isMeshDepthMaterial?u(y,_):_.isMeshDistanceMaterial?(u(y,_),C(y,_)):_.isMeshNormalMaterial?u(y,_):_.isLineBasicMaterial?(h(y,_),_.isLineDashedMaterial&&d(y,_)):_.isPointsMaterial?m(y,_,P,O):_.isSpriteMaterial?p(y,_):_.isShadowMaterial?(y.color.value.copy(_.color),y.opacity.value=_.opacity):_.isShaderMaterial&&(_.uniformsNeedUpdate=!1)}function u(y,_){y.opacity.value=_.opacity,_.color&&y.diffuse.value.copy(_.color),_.emissive&&y.emissive.value.copy(_.emissive).multiplyScalar(_.emissiveIntensity),_.map&&(y.map.value=_.map,i(_.map,y.mapTransform)),_.alphaMap&&(y.alphaMap.value=_.alphaMap,i(_.alphaMap,y.alphaMapTransform)),_.bumpMap&&(y.bumpMap.value=_.bumpMap,i(_.bumpMap,y.bumpMapTransform),y.bumpScale.value=_.bumpScale,_.side===Un&&(y.bumpScale.value*=-1)),_.normalMap&&(y.normalMap.value=_.normalMap,i(_.normalMap,y.normalMapTransform),y.normalScale.value.copy(_.normalScale),_.side===Un&&y.normalScale.value.negate()),_.displacementMap&&(y.displacementMap.value=_.displacementMap,i(_.displacementMap,y.displacementMapTransform),y.displacementScale.value=_.displacementScale,y.displacementBias.value=_.displacementBias),_.emissiveMap&&(y.emissiveMap.value=_.emissiveMap,i(_.emissiveMap,y.emissiveMapTransform)),_.specularMap&&(y.specularMap.value=_.specularMap,i(_.specularMap,y.specularMapTransform)),_.alphaTest>0&&(y.alphaTest.value=_.alphaTest);const P=t.get(_),O=P.envMap,D=P.envMapRotation;O&&(y.envMap.value=O,or.copy(D),or.x*=-1,or.y*=-1,or.z*=-1,O.isCubeTexture&&O.isRenderTargetTexture===!1&&(or.y*=-1,or.z*=-1),y.envMapRotation.value.setFromMatrix4(zb.makeRotationFromEuler(or)),y.flipEnvMap.value=O.isCubeTexture&&O.isRenderTargetTexture===!1?-1:1,y.reflectivity.value=_.reflectivity,y.ior.value=_.ior,y.refractionRatio.value=_.refractionRatio),_.lightMap&&(y.lightMap.value=_.lightMap,y.lightMapIntensity.value=_.lightMapIntensity,i(_.lightMap,y.lightMapTransform)),_.aoMap&&(y.aoMap.value=_.aoMap,y.aoMapIntensity.value=_.aoMapIntensity,i(_.aoMap,y.aoMapTransform))}function h(y,_){y.diffuse.value.copy(_.color),y.opacity.value=_.opacity,_.map&&(y.map.value=_.map,i(_.map,y.mapTransform))}function d(y,_){y.dashSize.value=_.dashSize,y.totalSize.value=_.dashSize+_.gapSize,y.scale.value=_.scale}function m(y,_,P,O){y.diffuse.value.copy(_.color),y.opacity.value=_.opacity,y.size.value=_.size*P,y.scale.value=O*.5,_.map&&(y.map.value=_.map,i(_.map,y.uvTransform)),_.alphaMap&&(y.alphaMap.value=_.alphaMap,i(_.alphaMap,y.alphaMapTransform)),_.alphaTest>0&&(y.alphaTest.value=_.alphaTest)}function p(y,_){y.diffuse.value.copy(_.color),y.opacity.value=_.opacity,y.rotation.value=_.rotation,_.map&&(y.map.value=_.map,i(_.map,y.mapTransform)),_.alphaMap&&(y.alphaMap.value=_.alphaMap,i(_.alphaMap,y.alphaMapTransform)),_.alphaTest>0&&(y.alphaTest.value=_.alphaTest)}function g(y,_){y.specular.value.copy(_.specular),y.shininess.value=Math.max(_.shininess,1e-4)}function v(y,_){_.gradientMap&&(y.gradientMap.value=_.gradientMap)}function x(y,_){y.metalness.value=_.metalness,_.metalnessMap&&(y.metalnessMap.value=_.metalnessMap,i(_.metalnessMap,y.metalnessMapTransform)),y.roughness.value=_.roughness,_.roughnessMap&&(y.roughnessMap.value=_.roughnessMap,i(_.roughnessMap,y.roughnessMapTransform)),_.envMap&&(y.envMapIntensity.value=_.envMapIntensity)}function M(y,_,P){y.ior.value=_.ior,_.sheen>0&&(y.sheenColor.value.copy(_.sheenColor).multiplyScalar(_.sheen),y.sheenRoughness.value=_.sheenRoughness,_.sheenColorMap&&(y.sheenColorMap.value=_.sheenColorMap,i(_.sheenColorMap,y.sheenColorMapTransform)),_.sheenRoughnessMap&&(y.sheenRoughnessMap.value=_.sheenRoughnessMap,i(_.sheenRoughnessMap,y.sheenRoughnessMapTransform))),_.clearcoat>0&&(y.clearcoat.value=_.clearcoat,y.clearcoatRoughness.value=_.clearcoatRoughness,_.clearcoatMap&&(y.clearcoatMap.value=_.clearcoatMap,i(_.clearcoatMap,y.clearcoatMapTransform)),_.clearcoatRoughnessMap&&(y.clearcoatRoughnessMap.value=_.clearcoatRoughnessMap,i(_.clearcoatRoughnessMap,y.clearcoatRoughnessMapTransform)),_.clearcoatNormalMap&&(y.clearcoatNormalMap.value=_.clearcoatNormalMap,i(_.clearcoatNormalMap,y.clearcoatNormalMapTransform),y.clearcoatNormalScale.value.copy(_.clearcoatNormalScale),_.side===Un&&y.clearcoatNormalScale.value.negate())),_.dispersion>0&&(y.dispersion.value=_.dispersion),_.iridescence>0&&(y.iridescence.value=_.iridescence,y.iridescenceIOR.value=_.iridescenceIOR,y.iridescenceThicknessMinimum.value=_.iridescenceThicknessRange[0],y.iridescenceThicknessMaximum.value=_.iridescenceThicknessRange[1],_.iridescenceMap&&(y.iridescenceMap.value=_.iridescenceMap,i(_.iridescenceMap,y.iridescenceMapTransform)),_.iridescenceThicknessMap&&(y.iridescenceThicknessMap.value=_.iridescenceThicknessMap,i(_.iridescenceThicknessMap,y.iridescenceThicknessMapTransform))),_.transmission>0&&(y.transmission.value=_.transmission,y.transmissionSamplerMap.value=P.texture,y.transmissionSamplerSize.value.set(P.width,P.height),_.transmissionMap&&(y.transmissionMap.value=_.transmissionMap,i(_.transmissionMap,y.transmissionMapTransform)),y.thickness.value=_.thickness,_.thicknessMap&&(y.thicknessMap.value=_.thicknessMap,i(_.thicknessMap,y.thicknessMapTransform)),y.attenuationDistance.value=_.attenuationDistance,y.attenuationColor.value.copy(_.attenuationColor)),_.anisotropy>0&&(y.anisotropyVector.value.set(_.anisotropy*Math.cos(_.anisotropyRotation),_.anisotropy*Math.sin(_.anisotropyRotation)),_.anisotropyMap&&(y.anisotropyMap.value=_.anisotropyMap,i(_.anisotropyMap,y.anisotropyMapTransform))),y.specularIntensity.value=_.specularIntensity,y.specularColor.value.copy(_.specularColor),_.specularColorMap&&(y.specularColorMap.value=_.specularColorMap,i(_.specularColorMap,y.specularColorMapTransform)),_.specularIntensityMap&&(y.specularIntensityMap.value=_.specularIntensityMap,i(_.specularIntensityMap,y.specularIntensityMapTransform))}function T(y,_){_.matcap&&(y.matcap.value=_.matcap)}function C(y,_){const P=t.get(_).light;y.referencePosition.value.setFromMatrixPosition(P.matrixWorld),y.nearDistance.value=P.shadow.camera.near,y.farDistance.value=P.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:l}}function Bb(o,t,i,r){let l={},u={},h=[];const d=o.getParameter(o.MAX_UNIFORM_BUFFER_BINDINGS);function m(P,O){const D=O.program;r.uniformBlockBinding(P,D)}function p(P,O){let D=l[P.id];D===void 0&&(T(P),D=g(P),l[P.id]=D,P.addEventListener("dispose",y));const H=O.program;r.updateUBOMapping(P,H);const F=t.render.frame;u[P.id]!==F&&(x(P),u[P.id]=F)}function g(P){const O=v();P.__bindingPointIndex=O;const D=o.createBuffer(),H=P.__size,F=P.usage;return o.bindBuffer(o.UNIFORM_BUFFER,D),o.bufferData(o.UNIFORM_BUFFER,H,F),o.bindBuffer(o.UNIFORM_BUFFER,null),o.bindBufferBase(o.UNIFORM_BUFFER,O,D),D}function v(){for(let P=0;P<d;P++)if(h.indexOf(P)===-1)return h.push(P),P;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function x(P){const O=l[P.id],D=P.uniforms,H=P.__cache;o.bindBuffer(o.UNIFORM_BUFFER,O);for(let F=0,z=D.length;F<z;F++){const K=Array.isArray(D[F])?D[F]:[D[F]];for(let w=0,R=K.length;w<R;w++){const I=K[w];if(M(I,F,w,H)===!0){const ct=I.__offset,it=Array.isArray(I.value)?I.value:[I.value];let mt=0;for(let ht=0;ht<it.length;ht++){const W=it[ht],at=C(W);typeof W=="number"||typeof W=="boolean"?(I.__data[0]=W,o.bufferSubData(o.UNIFORM_BUFFER,ct+mt,I.__data)):W.isMatrix3?(I.__data[0]=W.elements[0],I.__data[1]=W.elements[1],I.__data[2]=W.elements[2],I.__data[3]=0,I.__data[4]=W.elements[3],I.__data[5]=W.elements[4],I.__data[6]=W.elements[5],I.__data[7]=0,I.__data[8]=W.elements[6],I.__data[9]=W.elements[7],I.__data[10]=W.elements[8],I.__data[11]=0):(W.toArray(I.__data,mt),mt+=at.storage/Float32Array.BYTES_PER_ELEMENT)}o.bufferSubData(o.UNIFORM_BUFFER,ct,I.__data)}}}o.bindBuffer(o.UNIFORM_BUFFER,null)}function M(P,O,D,H){const F=P.value,z=O+"_"+D;if(H[z]===void 0)return typeof F=="number"||typeof F=="boolean"?H[z]=F:H[z]=F.clone(),!0;{const K=H[z];if(typeof F=="number"||typeof F=="boolean"){if(K!==F)return H[z]=F,!0}else if(K.equals(F)===!1)return K.copy(F),!0}return!1}function T(P){const O=P.uniforms;let D=0;const H=16;for(let z=0,K=O.length;z<K;z++){const w=Array.isArray(O[z])?O[z]:[O[z]];for(let R=0,I=w.length;R<I;R++){const ct=w[R],it=Array.isArray(ct.value)?ct.value:[ct.value];for(let mt=0,ht=it.length;mt<ht;mt++){const W=it[mt],at=C(W),j=D%H,St=j%at.boundary,L=j+St;D+=St,L!==0&&H-L<at.storage&&(D+=H-L),ct.__data=new Float32Array(at.storage/Float32Array.BYTES_PER_ELEMENT),ct.__offset=D,D+=at.storage}}}const F=D%H;return F>0&&(D+=H-F),P.__size=D,P.__cache={},this}function C(P){const O={boundary:0,storage:0};return typeof P=="number"||typeof P=="boolean"?(O.boundary=4,O.storage=4):P.isVector2?(O.boundary=8,O.storage=8):P.isVector3||P.isColor?(O.boundary=16,O.storage=12):P.isVector4?(O.boundary=16,O.storage=16):P.isMatrix3?(O.boundary=48,O.storage=48):P.isMatrix4?(O.boundary=64,O.storage=64):P.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",P),O}function y(P){const O=P.target;O.removeEventListener("dispose",y);const D=h.indexOf(O.__bindingPointIndex);h.splice(D,1),o.deleteBuffer(l[O.id]),delete l[O.id],delete u[O.id]}function _(){for(const P in l)o.deleteBuffer(l[P]);h=[],l={},u={}}return{bind:m,update:p,dispose:_}}class fd{constructor(t={}){const{canvas:i=yS(),context:r=null,depth:l=!0,stencil:u=!1,alpha:h=!1,antialias:d=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:p=!1,powerPreference:g="default",failIfMajorPerformanceCaveat:v=!1,reverseDepthBuffer:x=!1}=t;this.isWebGLRenderer=!0;let M;if(r!==null){if(typeof WebGLRenderingContext<"u"&&r instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");M=r.getContextAttributes().alpha}else M=h;const T=new Uint32Array(4),C=new Int32Array(4);let y=null,_=null;const P=[],O=[];this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=si,this.toneMapping=Na,this.toneMappingExposure=1;const D=this;let H=!1,F=0,z=0,K=null,w=-1,R=null;const I=new je,ct=new je;let it=null;const mt=new ie(0);let ht=0,W=i.width,at=i.height,j=1,St=null,L=null;const nt=new je(0,0,W,at),Et=new je(0,0,W,at);let At=!1;const q=new c0;let dt=!1,xt=!1;this.transmissionResolutionScale=1;const Tt=new $e,Rt=new $e,Ft=new rt,Gt=new je,ye={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ue=!1;function we(){return K===null?j:1}let B=r;function pn(A,X){return i.getContext(A,X)}try{const A={alpha:!0,depth:l,stencil:u,antialias:d,premultipliedAlpha:m,preserveDrawingBuffer:p,powerPreference:g,failIfMajorPerformanceCaveat:v};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${$h}`),i.addEventListener("webglcontextlost",gt,!1),i.addEventListener("webglcontextrestored",wt,!1),i.addEventListener("webglcontextcreationerror",Dt,!1),B===null){const X="webgl2";if(B=pn(X,A),B===null)throw pn(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let se,he,Wt,De,qt,U,E,tt,ut,vt,ft,Vt,Ct,zt,me,Mt,Bt,jt,kt,It,re,Kt,Ue,k;function Lt(){se=new jE(B),se.init(),Kt=new Db(B,se),he=new VE(B,se,t,Kt),Wt=new wb(B,se),he.reverseDepthBuffer&&x&&Wt.buffers.depth.setReversed(!0),De=new QE(B),qt=new mb,U=new Cb(B,se,Wt,qt,he,Kt,De),E=new XE(D),tt=new YE(D),ut=new ay(B),Ue=new HE(B,ut),vt=new ZE(B,ut,De,Ue),ft=new $E(B,vt,ut,De),kt=new JE(B,he,U),Mt=new kE(qt),Vt=new pb(D,E,tt,se,he,Ue,Mt),Ct=new Fb(D,qt),zt=new _b,me=new Eb(se),jt=new IE(D,E,tt,Wt,ft,M,m),Bt=new Ab(D,ft,he),k=new Bb(B,De,he,Wt),It=new GE(B,se,De),re=new KE(B,se,De),De.programs=Vt.programs,D.capabilities=he,D.extensions=se,D.properties=qt,D.renderLists=zt,D.shadowMap=Bt,D.state=Wt,D.info=De}Lt();const st=new Pb(D,B);this.xr=st,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const A=se.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=se.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(A){A!==void 0&&(j=A,this.setSize(W,at,!1))},this.getSize=function(A){return A.set(W,at)},this.setSize=function(A,X,$=!0){if(st.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=A,at=X,i.width=Math.floor(A*j),i.height=Math.floor(X*j),$===!0&&(i.style.width=A+"px",i.style.height=X+"px"),this.setViewport(0,0,A,X)},this.getDrawingBufferSize=function(A){return A.set(W*j,at*j).floor()},this.setDrawingBufferSize=function(A,X,$){W=A,at=X,j=$,i.width=Math.floor(A*$),i.height=Math.floor(X*$),this.setViewport(0,0,A,X)},this.getCurrentViewport=function(A){return A.copy(I)},this.getViewport=function(A){return A.copy(nt)},this.setViewport=function(A,X,$,Q){A.isVector4?nt.set(A.x,A.y,A.z,A.w):nt.set(A,X,$,Q),Wt.viewport(I.copy(nt).multiplyScalar(j).round())},this.getScissor=function(A){return A.copy(Et)},this.setScissor=function(A,X,$,Q){A.isVector4?Et.set(A.x,A.y,A.z,A.w):Et.set(A,X,$,Q),Wt.scissor(ct.copy(Et).multiplyScalar(j).round())},this.getScissorTest=function(){return At},this.setScissorTest=function(A){Wt.setScissorTest(At=A)},this.setOpaqueSort=function(A){St=A},this.setTransparentSort=function(A){L=A},this.getClearColor=function(A){return A.copy(jt.getClearColor())},this.setClearColor=function(){jt.setClearColor.apply(jt,arguments)},this.getClearAlpha=function(){return jt.getClearAlpha()},this.setClearAlpha=function(){jt.setClearAlpha.apply(jt,arguments)},this.clear=function(A=!0,X=!0,$=!0){let Q=0;if(A){let Y=!1;if(K!==null){const yt=K.texture.format;Y=yt===sd||yt===rd||yt===ad}if(Y){const yt=K.texture.type,bt=yt===ia||yt===mr||yt===Co||yt===xs||yt===nd||yt===id,Ot=jt.getClearColor(),Nt=jt.getClearAlpha(),te=Ot.r,ee=Ot.g,Zt=Ot.b;bt?(T[0]=te,T[1]=ee,T[2]=Zt,T[3]=Nt,B.clearBufferuiv(B.COLOR,0,T)):(C[0]=te,C[1]=ee,C[2]=Zt,C[3]=Nt,B.clearBufferiv(B.COLOR,0,C))}else Q|=B.COLOR_BUFFER_BIT}X&&(Q|=B.DEPTH_BUFFER_BIT),$&&(Q|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B.clear(Q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){i.removeEventListener("webglcontextlost",gt,!1),i.removeEventListener("webglcontextrestored",wt,!1),i.removeEventListener("webglcontextcreationerror",Dt,!1),jt.dispose(),zt.dispose(),me.dispose(),qt.dispose(),E.dispose(),tt.dispose(),ft.dispose(),Ue.dispose(),k.dispose(),Vt.dispose(),st.dispose(),st.removeEventListener("sessionstart",Fo),st.removeEventListener("sessionend",As),xi.stop()};function gt(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),H=!0}function wt(){console.log("THREE.WebGLRenderer: Context Restored."),H=!1;const A=De.autoReset,X=Bt.enabled,$=Bt.autoUpdate,Q=Bt.needsUpdate,Y=Bt.type;Lt(),De.autoReset=A,Bt.enabled=X,Bt.autoUpdate=$,Bt.needsUpdate=Q,Bt.type=Y}function Dt(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function $t(A){const X=A.target;X.removeEventListener("dispose",$t),He(X)}function He(A){tn(A),qt.remove(A)}function tn(A){const X=qt.get(A).programs;X!==void 0&&(X.forEach(function($){Vt.releaseProgram($)}),A.isShaderMaterial&&Vt.releaseShaderCache(A))}this.renderBufferDirect=function(A,X,$,Q,Y,yt){X===null&&(X=ye);const bt=Y.isMesh&&Y.matrixWorld.determinant()<0,Ot=Mc(A,X,$,Q,Y);Wt.setMaterial(Q,bt);let Nt=$.index,te=1;if(Q.wireframe===!0){if(Nt=vt.getWireframeAttribute($),Nt===void 0)return;te=2}const ee=$.drawRange,Zt=$.attributes.position;let ge=ee.start*te,_e=(ee.start+ee.count)*te;yt!==null&&(ge=Math.max(ge,yt.start*te),_e=Math.min(_e,(yt.start+yt.count)*te)),Nt!==null?(ge=Math.max(ge,0),_e=Math.min(_e,Nt.count)):Zt!=null&&(ge=Math.max(ge,0),_e=Math.min(_e,Zt.count));const Ie=_e-ge;if(Ie<0||Ie===1/0)return;Ue.setup(Y,Q,Ot,$,Nt);let Te,ne=It;if(Nt!==null&&(Te=ut.get(Nt),ne=re,ne.setIndex(Te)),Y.isMesh)Q.wireframe===!0?(Wt.setLineWidth(Q.wireframeLinewidth*we()),ne.setMode(B.LINES)):ne.setMode(B.TRIANGLES);else if(Y.isLine){let Qt=Q.linewidth;Qt===void 0&&(Qt=1),Wt.setLineWidth(Qt*we()),Y.isLineSegments?ne.setMode(B.LINES):Y.isLineLoop?ne.setMode(B.LINE_LOOP):ne.setMode(B.LINE_STRIP)}else Y.isPoints?ne.setMode(B.POINTS):Y.isSprite&&ne.setMode(B.TRIANGLES);if(Y.isBatchedMesh)if(Y._multiDrawInstances!==null)ne.renderMultiDrawInstances(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount,Y._multiDrawInstances);else if(se.get("WEBGL_multi_draw"))ne.renderMultiDraw(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount);else{const Qt=Y._multiDrawStarts,an=Y._multiDrawCounts,ve=Y._multiDrawCount,Nn=Nt?ut.get(Nt).bytesPerElement:1,oi=qt.get(Q).currentProgram.getUniforms();for(let An=0;An<ve;An++)oi.setValue(B,"_gl_DrawID",An),ne.render(Qt[An]/Nn,an[An])}else if(Y.isInstancedMesh)ne.renderInstances(ge,Ie,Y.count);else if($.isInstancedBufferGeometry){const Qt=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,an=Math.min($.instanceCount,Qt);ne.renderInstances(ge,Ie,an)}else ne.render(ge,Ie)};function Ee(A,X,$){A.transparent===!0&&A.side===$i&&A.forceSinglePass===!1?(A.side=Un,A.needsUpdate=!0,nn(A,X,$),A.side=Oa,A.needsUpdate=!0,nn(A,X,$),A.side=$i):nn(A,X,$)}this.compile=function(A,X,$=null){$===null&&($=A),_=me.get($),_.init(X),O.push(_),$.traverseVisible(function(Y){Y.isLight&&Y.layers.test(X.layers)&&(_.pushLight(Y),Y.castShadow&&_.pushShadow(Y))}),A!==$&&A.traverseVisible(function(Y){Y.isLight&&Y.layers.test(X.layers)&&(_.pushLight(Y),Y.castShadow&&_.pushShadow(Y))}),_.setupLights();const Q=new Set;return A.traverse(function(Y){if(!(Y.isMesh||Y.isPoints||Y.isLine||Y.isSprite))return;const yt=Y.material;if(yt)if(Array.isArray(yt))for(let bt=0;bt<yt.length;bt++){const Ot=yt[bt];Ee(Ot,$,Y),Q.add(Ot)}else Ee(yt,$,Y),Q.add(yt)}),O.pop(),_=null,Q},this.compileAsync=function(A,X,$=null){const Q=this.compile(A,X,$);return new Promise(Y=>{function yt(){if(Q.forEach(function(bt){qt.get(bt).currentProgram.isReady()&&Q.delete(bt)}),Q.size===0){Y(A);return}setTimeout(yt,10)}se.get("KHR_parallel_shader_compile")!==null?yt():setTimeout(yt,10)})};let Tn=null;function bn(A){Tn&&Tn(A)}function Fo(){xi.stop()}function As(){xi.start()}const xi=new h0;xi.setAnimationLoop(bn),typeof self<"u"&&xi.setContext(self),this.setAnimationLoop=function(A){Tn=A,st.setAnimationLoop(A),A===null?xi.stop():xi.start()},st.addEventListener("sessionstart",Fo),st.addEventListener("sessionend",As),this.render=function(A,X){if(X!==void 0&&X.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(H===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),st.enabled===!0&&st.isPresenting===!0&&(st.cameraAutoUpdate===!0&&st.updateCamera(X),X=st.getCamera()),A.isScene===!0&&A.onBeforeRender(D,A,X,K),_=me.get(A,O.length),_.init(X),O.push(_),Rt.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),q.setFromProjectionMatrix(Rt),xt=this.localClippingEnabled,dt=Mt.init(this.clippingPlanes,xt),y=zt.get(A,P.length),y.init(),P.push(y),st.enabled===!0&&st.isPresenting===!0){const yt=D.xr.getDepthSensingMesh();yt!==null&&_r(yt,X,-1/0,D.sortObjects)}_r(A,X,0,D.sortObjects),y.finish(),D.sortObjects===!0&&y.sort(St,L),ue=st.enabled===!1||st.isPresenting===!1||st.hasDepthSensing()===!1,ue&&jt.addToRenderList(y,A),this.info.render.frame++,dt===!0&&Mt.beginShadows();const $=_.state.shadowsArray;Bt.render($,A,X),dt===!0&&Mt.endShadows(),this.info.autoReset===!0&&this.info.reset();const Q=y.opaque,Y=y.transmissive;if(_.setupLights(),X.isArrayCamera){const yt=X.cameras;if(Y.length>0)for(let bt=0,Ot=yt.length;bt<Ot;bt++){const Nt=yt[bt];Bo(Q,Y,A,Nt)}ue&&jt.render(A);for(let bt=0,Ot=yt.length;bt<Ot;bt++){const Nt=yt[bt];Rs(y,A,Nt,Nt.viewport)}}else Y.length>0&&Bo(Q,Y,A,X),ue&&jt.render(A),Rs(y,A,X);K!==null&&z===0&&(U.updateMultisampleRenderTarget(K),U.updateRenderTargetMipmap(K)),A.isScene===!0&&A.onAfterRender(D,A,X),Ue.resetDefaultState(),w=-1,R=null,O.pop(),O.length>0?(_=O[O.length-1],dt===!0&&Mt.setGlobalState(D.clippingPlanes,_.state.camera)):_=null,P.pop(),P.length>0?y=P[P.length-1]:y=null};function _r(A,X,$,Q){if(A.visible===!1)return;if(A.layers.test(X.layers)){if(A.isGroup)$=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(X);else if(A.isLight)_.pushLight(A),A.castShadow&&_.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||q.intersectsSprite(A)){Q&&Gt.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Rt);const bt=ft.update(A),Ot=A.material;Ot.visible&&y.push(A,bt,Ot,$,Gt.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||q.intersectsObject(A))){const bt=ft.update(A),Ot=A.material;if(Q&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Gt.copy(A.boundingSphere.center)):(bt.boundingSphere===null&&bt.computeBoundingSphere(),Gt.copy(bt.boundingSphere.center)),Gt.applyMatrix4(A.matrixWorld).applyMatrix4(Rt)),Array.isArray(Ot)){const Nt=bt.groups;for(let te=0,ee=Nt.length;te<ee;te++){const Zt=Nt[te],ge=Ot[Zt.materialIndex];ge&&ge.visible&&y.push(A,bt,ge,$,Gt.z,Zt)}}else Ot.visible&&y.push(A,bt,Ot,$,Gt.z,null)}}const yt=A.children;for(let bt=0,Ot=yt.length;bt<Ot;bt++)_r(yt[bt],X,$,Q)}function Rs(A,X,$,Q){const Y=A.opaque,yt=A.transmissive,bt=A.transparent;_.setupLightsView($),dt===!0&&Mt.setGlobalState(D.clippingPlanes,$),Q&&Wt.viewport(I.copy(Q)),Y.length>0&&In(Y,X,$),yt.length>0&&In(yt,X,$),bt.length>0&&In(bt,X,$),Wt.buffers.depth.setTest(!0),Wt.buffers.depth.setMask(!0),Wt.buffers.color.setMask(!0),Wt.setPolygonOffset(!1)}function Bo(A,X,$,Q){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;_.state.transmissionRenderTarget[Q.id]===void 0&&(_.state.transmissionRenderTarget[Q.id]=new gr(1,1,{generateMipmaps:!0,type:se.has("EXT_color_buffer_half_float")||se.has("EXT_color_buffer_float")?Uo:ia,minFilter:pr,samples:4,stencilBuffer:u,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Re.workingColorSpace}));const yt=_.state.transmissionRenderTarget[Q.id],bt=Q.viewport||I;yt.setSize(bt.z*D.transmissionResolutionScale,bt.w*D.transmissionResolutionScale);const Ot=D.getRenderTarget();D.setRenderTarget(yt),D.getClearColor(mt),ht=D.getClearAlpha(),ht<1&&D.setClearColor(16777215,.5),D.clear(),ue&&jt.render($);const Nt=D.toneMapping;D.toneMapping=Na;const te=Q.viewport;if(Q.viewport!==void 0&&(Q.viewport=void 0),_.setupLightsView(Q),dt===!0&&Mt.setGlobalState(D.clippingPlanes,Q),In(A,$,Q),U.updateMultisampleRenderTarget(yt),U.updateRenderTargetMipmap(yt),se.has("WEBGL_multisampled_render_to_texture")===!1){let ee=!1;for(let Zt=0,ge=X.length;Zt<ge;Zt++){const _e=X[Zt],Ie=_e.object,Te=_e.geometry,ne=_e.material,Qt=_e.group;if(ne.side===$i&&Ie.layers.test(Q.layers)){const an=ne.side;ne.side=Un,ne.needsUpdate=!0,en(Ie,$,Q,Te,ne,Qt),ne.side=an,ne.needsUpdate=!0,ee=!0}}ee===!0&&(U.updateMultisampleRenderTarget(yt),U.updateRenderTargetMipmap(yt))}D.setRenderTarget(Ot),D.setClearColor(mt,ht),te!==void 0&&(Q.viewport=te),D.toneMapping=Nt}function In(A,X,$){const Q=X.isScene===!0?X.overrideMaterial:null;for(let Y=0,yt=A.length;Y<yt;Y++){const bt=A[Y],Ot=bt.object,Nt=bt.geometry,te=Q===null?bt.material:Q,ee=bt.group;Ot.layers.test($.layers)&&en(Ot,X,$,Nt,te,ee)}}function en(A,X,$,Q,Y,yt){A.onBeforeRender(D,X,$,Q,Y,yt),A.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),Y.onBeforeRender(D,X,$,Q,A,yt),Y.transparent===!0&&Y.side===$i&&Y.forceSinglePass===!1?(Y.side=Un,Y.needsUpdate=!0,D.renderBufferDirect($,X,Q,Y,A,yt),Y.side=Oa,Y.needsUpdate=!0,D.renderBufferDirect($,X,Q,Y,A,yt),Y.side=$i):D.renderBufferDirect($,X,Q,Y,A,yt),A.onAfterRender(D,X,$,Q,Y,yt)}function nn(A,X,$){X.isScene!==!0&&(X=ye);const Q=qt.get(A),Y=_.state.lights,yt=_.state.shadowsArray,bt=Y.state.version,Ot=Vt.getParameters(A,Y.state,yt,X,$),Nt=Vt.getProgramCacheKey(Ot);let te=Q.programs;Q.environment=A.isMeshStandardMaterial?X.environment:null,Q.fog=X.fog,Q.envMap=(A.isMeshStandardMaterial?tt:E).get(A.envMap||Q.environment),Q.envMapRotation=Q.environment!==null&&A.envMap===null?X.environmentRotation:A.envMapRotation,te===void 0&&(A.addEventListener("dispose",$t),te=new Map,Q.programs=te);let ee=te.get(Nt);if(ee!==void 0){if(Q.currentProgram===ee&&Q.lightsStateVersion===bt)return vr(A,Ot),ee}else Ot.uniforms=Vt.getUniforms(A),A.onBeforeCompile(Ot,D),ee=Vt.acquireProgram(Ot,Nt),te.set(Nt,ee),Q.uniforms=Ot.uniforms;const Zt=Q.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Zt.clippingPlanes=Mt.uniform),vr(A,Ot),Q.needsLights=Io(A),Q.lightsStateVersion=bt,Q.needsLights&&(Zt.ambientLightColor.value=Y.state.ambient,Zt.lightProbe.value=Y.state.probe,Zt.directionalLights.value=Y.state.directional,Zt.directionalLightShadows.value=Y.state.directionalShadow,Zt.spotLights.value=Y.state.spot,Zt.spotLightShadows.value=Y.state.spotShadow,Zt.rectAreaLights.value=Y.state.rectArea,Zt.ltc_1.value=Y.state.rectAreaLTC1,Zt.ltc_2.value=Y.state.rectAreaLTC2,Zt.pointLights.value=Y.state.point,Zt.pointLightShadows.value=Y.state.pointShadow,Zt.hemisphereLights.value=Y.state.hemi,Zt.directionalShadowMap.value=Y.state.directionalShadowMap,Zt.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,Zt.spotShadowMap.value=Y.state.spotShadowMap,Zt.spotLightMatrix.value=Y.state.spotLightMatrix,Zt.spotLightMap.value=Y.state.spotLightMap,Zt.pointShadowMap.value=Y.state.pointShadowMap,Zt.pointShadowMatrix.value=Y.state.pointShadowMatrix),Q.currentProgram=ee,Q.uniformsList=null,ee}function Di(A){if(A.uniformsList===null){const X=A.currentProgram.getUniforms();A.uniformsList=gc.seqWithValue(X.seq,A.uniforms)}return A.uniformsList}function vr(A,X){const $=qt.get(A);$.outputColorSpace=X.outputColorSpace,$.batching=X.batching,$.batchingColor=X.batchingColor,$.instancing=X.instancing,$.instancingColor=X.instancingColor,$.instancingMorph=X.instancingMorph,$.skinning=X.skinning,$.morphTargets=X.morphTargets,$.morphNormals=X.morphNormals,$.morphColors=X.morphColors,$.morphTargetsCount=X.morphTargetsCount,$.numClippingPlanes=X.numClippingPlanes,$.numIntersection=X.numClipIntersection,$.vertexAlphas=X.vertexAlphas,$.vertexTangents=X.vertexTangents,$.toneMapping=X.toneMapping}function Mc(A,X,$,Q,Y){X.isScene!==!0&&(X=ye),U.resetTextureUnits();const yt=X.fog,bt=Q.isMeshStandardMaterial?X.environment:null,Ot=K===null?D.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:ys,Nt=(Q.isMeshStandardMaterial?tt:E).get(Q.envMap||bt),te=Q.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,ee=!!$.attributes.tangent&&(!!Q.normalMap||Q.anisotropy>0),Zt=!!$.morphAttributes.position,ge=!!$.morphAttributes.normal,_e=!!$.morphAttributes.color;let Ie=Na;Q.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(Ie=D.toneMapping);const Te=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,ne=Te!==void 0?Te.length:0,Qt=qt.get(Q),an=_.state.lights;if(dt===!0&&(xt===!0||A!==R)){const ke=A===R&&Q.id===w;Mt.setState(Q,A,ke)}let ve=!1;Q.version===Qt.__version?(Qt.needsLights&&Qt.lightsStateVersion!==an.state.version||Qt.outputColorSpace!==Ot||Y.isBatchedMesh&&Qt.batching===!1||!Y.isBatchedMesh&&Qt.batching===!0||Y.isBatchedMesh&&Qt.batchingColor===!0&&Y.colorTexture===null||Y.isBatchedMesh&&Qt.batchingColor===!1&&Y.colorTexture!==null||Y.isInstancedMesh&&Qt.instancing===!1||!Y.isInstancedMesh&&Qt.instancing===!0||Y.isSkinnedMesh&&Qt.skinning===!1||!Y.isSkinnedMesh&&Qt.skinning===!0||Y.isInstancedMesh&&Qt.instancingColor===!0&&Y.instanceColor===null||Y.isInstancedMesh&&Qt.instancingColor===!1&&Y.instanceColor!==null||Y.isInstancedMesh&&Qt.instancingMorph===!0&&Y.morphTexture===null||Y.isInstancedMesh&&Qt.instancingMorph===!1&&Y.morphTexture!==null||Qt.envMap!==Nt||Q.fog===!0&&Qt.fog!==yt||Qt.numClippingPlanes!==void 0&&(Qt.numClippingPlanes!==Mt.numPlanes||Qt.numIntersection!==Mt.numIntersection)||Qt.vertexAlphas!==te||Qt.vertexTangents!==ee||Qt.morphTargets!==Zt||Qt.morphNormals!==ge||Qt.morphColors!==_e||Qt.toneMapping!==Ie||Qt.morphTargetsCount!==ne)&&(ve=!0):(ve=!0,Qt.__version=Q.version);let Nn=Qt.currentProgram;ve===!0&&(Nn=nn(Q,X,Y));let oi=!1,An=!1,cn=!1;const Le=Nn.getUniforms(),Rn=Qt.uniforms;if(Wt.useProgram(Nn.program)&&(oi=!0,An=!0,cn=!0),Q.id!==w&&(w=Q.id,An=!0),oi||R!==A){Wt.buffers.depth.getReversed()?(Tt.copy(A.projectionMatrix),ES(Tt),TS(Tt),Le.setValue(B,"projectionMatrix",Tt)):Le.setValue(B,"projectionMatrix",A.projectionMatrix),Le.setValue(B,"viewMatrix",A.matrixWorldInverse);const mn=Le.map.cameraPosition;mn!==void 0&&mn.setValue(B,Ft.setFromMatrixPosition(A.matrixWorld)),he.logarithmicDepthBuffer&&Le.setValue(B,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(Q.isMeshPhongMaterial||Q.isMeshToonMaterial||Q.isMeshLambertMaterial||Q.isMeshBasicMaterial||Q.isMeshStandardMaterial||Q.isShaderMaterial)&&Le.setValue(B,"isOrthographic",A.isOrthographicCamera===!0),R!==A&&(R=A,An=!0,cn=!0)}if(Y.isSkinnedMesh){Le.setOptional(B,Y,"bindMatrix"),Le.setOptional(B,Y,"bindMatrixInverse");const ke=Y.skeleton;ke&&(ke.boneTexture===null&&ke.computeBoneTexture(),Le.setValue(B,"boneTexture",ke.boneTexture,U))}Y.isBatchedMesh&&(Le.setOptional(B,Y,"batchingTexture"),Le.setValue(B,"batchingTexture",Y._matricesTexture,U),Le.setOptional(B,Y,"batchingIdTexture"),Le.setValue(B,"batchingIdTexture",Y._indirectTexture,U),Le.setOptional(B,Y,"batchingColorTexture"),Y._colorsTexture!==null&&Le.setValue(B,"batchingColorTexture",Y._colorsTexture,U));const xn=$.morphAttributes;if((xn.position!==void 0||xn.normal!==void 0||xn.color!==void 0)&&kt.update(Y,$,Nn),(An||Qt.receiveShadow!==Y.receiveShadow)&&(Qt.receiveShadow=Y.receiveShadow,Le.setValue(B,"receiveShadow",Y.receiveShadow)),Q.isMeshGouraudMaterial&&Q.envMap!==null&&(Rn.envMap.value=Nt,Rn.flipEnvMap.value=Nt.isCubeTexture&&Nt.isRenderTargetTexture===!1?-1:1),Q.isMeshStandardMaterial&&Q.envMap===null&&X.environment!==null&&(Rn.envMapIntensity.value=X.environmentIntensity),An&&(Le.setValue(B,"toneMappingExposure",D.toneMappingExposure),Qt.needsLights&&Ec(Rn,cn),yt&&Q.fog===!0&&Ct.refreshFogUniforms(Rn,yt),Ct.refreshMaterialUniforms(Rn,Q,j,at,_.state.transmissionRenderTarget[A.id]),gc.upload(B,Di(Qt),Rn,U)),Q.isShaderMaterial&&Q.uniformsNeedUpdate===!0&&(gc.upload(B,Di(Qt),Rn,U),Q.uniformsNeedUpdate=!1),Q.isSpriteMaterial&&Le.setValue(B,"center",Y.center),Le.setValue(B,"modelViewMatrix",Y.modelViewMatrix),Le.setValue(B,"normalMatrix",Y.normalMatrix),Le.setValue(B,"modelMatrix",Y.matrixWorld),Q.isShaderMaterial||Q.isRawShaderMaterial){const ke=Q.uniformsGroups;for(let mn=0,xr=ke.length;mn<xr;mn++){const On=ke[mn];k.update(On,Nn),k.bind(On,Nn)}}return Nn}function Ec(A,X){A.ambientLightColor.needsUpdate=X,A.lightProbe.needsUpdate=X,A.directionalLights.needsUpdate=X,A.directionalLightShadows.needsUpdate=X,A.pointLights.needsUpdate=X,A.pointLightShadows.needsUpdate=X,A.spotLights.needsUpdate=X,A.spotLightShadows.needsUpdate=X,A.rectAreaLights.needsUpdate=X,A.hemisphereLights.needsUpdate=X}function Io(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return F},this.getActiveMipmapLevel=function(){return z},this.getRenderTarget=function(){return K},this.setRenderTargetTextures=function(A,X,$){qt.get(A.texture).__webglTexture=X,qt.get(A.depthTexture).__webglTexture=$;const Q=qt.get(A);Q.__hasExternalTextures=!0,Q.__autoAllocateDepthBuffer=$===void 0,Q.__autoAllocateDepthBuffer||se.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Q.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(A,X){const $=qt.get(A);$.__webglFramebuffer=X,$.__useDefaultFramebuffer=X===void 0};const za=B.createFramebuffer();this.setRenderTarget=function(A,X=0,$=0){K=A,F=X,z=$;let Q=!0,Y=null,yt=!1,bt=!1;if(A){const Nt=qt.get(A);if(Nt.__useDefaultFramebuffer!==void 0)Wt.bindFramebuffer(B.FRAMEBUFFER,null),Q=!1;else if(Nt.__webglFramebuffer===void 0)U.setupRenderTarget(A);else if(Nt.__hasExternalTextures)U.rebindTextures(A,qt.get(A.texture).__webglTexture,qt.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Zt=A.depthTexture;if(Nt.__boundDepthTexture!==Zt){if(Zt!==null&&qt.has(Zt)&&(A.width!==Zt.image.width||A.height!==Zt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");U.setupDepthRenderbuffer(A)}}const te=A.texture;(te.isData3DTexture||te.isDataArrayTexture||te.isCompressedArrayTexture)&&(bt=!0);const ee=qt.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(ee[X])?Y=ee[X][$]:Y=ee[X],yt=!0):A.samples>0&&U.useMultisampledRTT(A)===!1?Y=qt.get(A).__webglMultisampledFramebuffer:Array.isArray(ee)?Y=ee[$]:Y=ee,I.copy(A.viewport),ct.copy(A.scissor),it=A.scissorTest}else I.copy(nt).multiplyScalar(j).floor(),ct.copy(Et).multiplyScalar(j).floor(),it=At;if($!==0&&(Y=za),Wt.bindFramebuffer(B.FRAMEBUFFER,Y)&&Q&&Wt.drawBuffers(A,Y),Wt.viewport(I),Wt.scissor(ct),Wt.setScissorTest(it),yt){const Nt=qt.get(A.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+X,Nt.__webglTexture,$)}else if(bt){const Nt=qt.get(A.texture),te=X;B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,Nt.__webglTexture,$,te)}else if(A!==null&&$!==0){const Nt=qt.get(A.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Nt.__webglTexture,$)}w=-1},this.readRenderTargetPixels=function(A,X,$,Q,Y,yt,bt){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ot=qt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&bt!==void 0&&(Ot=Ot[bt]),Ot){Wt.bindFramebuffer(B.FRAMEBUFFER,Ot);try{const Nt=A.texture,te=Nt.format,ee=Nt.type;if(!he.textureFormatReadable(te)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!he.textureTypeReadable(ee)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=A.width-Q&&$>=0&&$<=A.height-Y&&B.readPixels(X,$,Q,Y,Kt.convert(te),Kt.convert(ee),yt)}finally{const Nt=K!==null?qt.get(K).__webglFramebuffer:null;Wt.bindFramebuffer(B.FRAMEBUFFER,Nt)}}},this.readRenderTargetPixelsAsync=async function(A,X,$,Q,Y,yt,bt){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ot=qt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&bt!==void 0&&(Ot=Ot[bt]),Ot){const Nt=A.texture,te=Nt.format,ee=Nt.type;if(!he.textureFormatReadable(te))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!he.textureTypeReadable(ee))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(X>=0&&X<=A.width-Q&&$>=0&&$<=A.height-Y){Wt.bindFramebuffer(B.FRAMEBUFFER,Ot);const Zt=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,Zt),B.bufferData(B.PIXEL_PACK_BUFFER,yt.byteLength,B.STREAM_READ),B.readPixels(X,$,Q,Y,Kt.convert(te),Kt.convert(ee),0);const ge=K!==null?qt.get(K).__webglFramebuffer:null;Wt.bindFramebuffer(B.FRAMEBUFFER,ge);const _e=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await MS(B,_e,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,Zt),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,yt),B.deleteBuffer(Zt),B.deleteSync(_e),yt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,X=null,$=0){A.isTexture!==!0&&(cs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),X=arguments[0]||null,A=arguments[1]);const Q=Math.pow(2,-$),Y=Math.floor(A.image.width*Q),yt=Math.floor(A.image.height*Q),bt=X!==null?X.x:0,Ot=X!==null?X.y:0;U.setTexture2D(A,0),B.copyTexSubImage2D(B.TEXTURE_2D,$,0,0,bt,Ot,Y,yt),Wt.unbindTexture()};const ws=B.createFramebuffer(),Ui=B.createFramebuffer();this.copyTextureToTexture=function(A,X,$=null,Q=null,Y=0,yt=null){A.isTexture!==!0&&(cs("WebGLRenderer: copyTextureToTexture function signature has changed."),Q=arguments[0]||null,A=arguments[1],X=arguments[2],yt=arguments[3]||0,$=null),yt===null&&(Y!==0?(cs("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),yt=Y,Y=0):yt=0);let bt,Ot,Nt,te,ee,Zt,ge,_e,Ie;const Te=A.isCompressedTexture?A.mipmaps[yt]:A.image;if($!==null)bt=$.max.x-$.min.x,Ot=$.max.y-$.min.y,Nt=$.isBox3?$.max.z-$.min.z:1,te=$.min.x,ee=$.min.y,Zt=$.isBox3?$.min.z:0;else{const xn=Math.pow(2,-Y);bt=Math.floor(Te.width*xn),Ot=Math.floor(Te.height*xn),A.isDataArrayTexture?Nt=Te.depth:A.isData3DTexture?Nt=Math.floor(Te.depth*xn):Nt=1,te=0,ee=0,Zt=0}Q!==null?(ge=Q.x,_e=Q.y,Ie=Q.z):(ge=0,_e=0,Ie=0);const ne=Kt.convert(X.format),Qt=Kt.convert(X.type);let an;X.isData3DTexture?(U.setTexture3D(X,0),an=B.TEXTURE_3D):X.isDataArrayTexture||X.isCompressedArrayTexture?(U.setTexture2DArray(X,0),an=B.TEXTURE_2D_ARRAY):(U.setTexture2D(X,0),an=B.TEXTURE_2D),B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,X.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,X.unpackAlignment);const ve=B.getParameter(B.UNPACK_ROW_LENGTH),Nn=B.getParameter(B.UNPACK_IMAGE_HEIGHT),oi=B.getParameter(B.UNPACK_SKIP_PIXELS),An=B.getParameter(B.UNPACK_SKIP_ROWS),cn=B.getParameter(B.UNPACK_SKIP_IMAGES);B.pixelStorei(B.UNPACK_ROW_LENGTH,Te.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Te.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,te),B.pixelStorei(B.UNPACK_SKIP_ROWS,ee),B.pixelStorei(B.UNPACK_SKIP_IMAGES,Zt);const Le=A.isDataArrayTexture||A.isData3DTexture,Rn=X.isDataArrayTexture||X.isData3DTexture;if(A.isDepthTexture){const xn=qt.get(A),ke=qt.get(X),mn=qt.get(xn.__renderTarget),xr=qt.get(ke.__renderTarget);Wt.bindFramebuffer(B.READ_FRAMEBUFFER,mn.__webglFramebuffer),Wt.bindFramebuffer(B.DRAW_FRAMEBUFFER,xr.__webglFramebuffer);for(let On=0;On<Nt;On++)Le&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,qt.get(A).__webglTexture,Y,Zt+On),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,qt.get(X).__webglTexture,yt,Ie+On)),B.blitFramebuffer(te,ee,bt,Ot,ge,_e,bt,Ot,B.DEPTH_BUFFER_BIT,B.NEAREST);Wt.bindFramebuffer(B.READ_FRAMEBUFFER,null),Wt.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if(Y!==0||A.isRenderTargetTexture||qt.has(A)){const xn=qt.get(A),ke=qt.get(X);Wt.bindFramebuffer(B.READ_FRAMEBUFFER,ws),Wt.bindFramebuffer(B.DRAW_FRAMEBUFFER,Ui);for(let mn=0;mn<Nt;mn++)Le?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,xn.__webglTexture,Y,Zt+mn):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,xn.__webglTexture,Y),Rn?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,ke.__webglTexture,yt,Ie+mn):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,ke.__webglTexture,yt),Y!==0?B.blitFramebuffer(te,ee,bt,Ot,ge,_e,bt,Ot,B.COLOR_BUFFER_BIT,B.NEAREST):Rn?B.copyTexSubImage3D(an,yt,ge,_e,Ie+mn,te,ee,bt,Ot):B.copyTexSubImage2D(an,yt,ge,_e,te,ee,bt,Ot);Wt.bindFramebuffer(B.READ_FRAMEBUFFER,null),Wt.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else Rn?A.isDataTexture||A.isData3DTexture?B.texSubImage3D(an,yt,ge,_e,Ie,bt,Ot,Nt,ne,Qt,Te.data):X.isCompressedArrayTexture?B.compressedTexSubImage3D(an,yt,ge,_e,Ie,bt,Ot,Nt,ne,Te.data):B.texSubImage3D(an,yt,ge,_e,Ie,bt,Ot,Nt,ne,Qt,Te):A.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,yt,ge,_e,bt,Ot,ne,Qt,Te.data):A.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,yt,ge,_e,Te.width,Te.height,ne,Te.data):B.texSubImage2D(B.TEXTURE_2D,yt,ge,_e,bt,Ot,ne,Qt,Te);B.pixelStorei(B.UNPACK_ROW_LENGTH,ve),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Nn),B.pixelStorei(B.UNPACK_SKIP_PIXELS,oi),B.pixelStorei(B.UNPACK_SKIP_ROWS,An),B.pixelStorei(B.UNPACK_SKIP_IMAGES,cn),yt===0&&X.generateMipmaps&&B.generateMipmap(an),Wt.unbindTexture()},this.copyTextureToTexture3D=function(A,X,$=null,Q=null,Y=0){return A.isTexture!==!0&&(cs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),$=arguments[0]||null,Q=arguments[1]||null,A=arguments[2],X=arguments[3],Y=arguments[4]||0),cs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(A,X,$,Q,Y)},this.initRenderTarget=function(A){qt.get(A).__webglFramebuffer===void 0&&U.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?U.setTextureCube(A,0):A.isData3DTexture?U.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?U.setTexture2DArray(A,0):U.setTexture2D(A,0),Wt.unbindTexture()},this.resetState=function(){F=0,z=0,K=null,Wt.reset(),Ue.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ea}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const i=this.getContext();i.drawingBufferColorspace=Re._getDrawingBufferColorSpace(t),i.unpackColorSpace=Re._getUnpackColorSpace()}}class Ib{constructor(t,i){this.canvas=t,this.gl=this.canvas.getContext("webgl"),this.params=i,this.program=null,this.animationFrameId=null,this.startTime=performance.now(),this.initGL()}initGL(){if(!this.gl){console.error("WebGL not supported.");return}this.gl.getExtension("OES_texture_float");const t=`
            #ifdef GL_ES
            precision mediump float;
            #endif

            uniform vec2 u_resolution;
            attribute vec2 a_position;

            void main() {
                gl_Position = vec4(a_position, 0, 1);
            }
        `,i=`
            #ifdef GL_ES
            precision mediump float;
            #endif

            uniform bool u_scanlines;
            uniform vec2 u_resolution;
            uniform float u_brightness;
            uniform float u_blobiness;
            uniform float u_particles;
            uniform float u_millis;
            uniform float u_energy;
            uniform float u_timeScale; 

            float noise(vec2 co) {
                return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
            }

            void main(void) {
                vec2 position = (gl_FragCoord.xy / u_resolution.x);
                float t = (u_millis * 0.001 * u_energy) * u_timeScale; 

                float a = 0.0;
                float b = 0.0;
                float c = 0.0;

                vec2 pos, center = vec2(0.5, 0.5 * (u_resolution.y / u_resolution.x));

                float na, nb, nc, nd, d;
                float limit = u_particles / 40.0;
                float step = 1.0 / u_particles;
                float n = 0.0;

                for (float i = 0.0; i <= 1.0; i += 0.025) {
                    if (i <= limit) {
                        vec2 np = vec2(n, 1-1);

                        na = noise(np * 1.1);
                        nb = noise(np * 2.8);
                        nc = noise(np * 0.7);
                        nd = noise(np * 3.2);

                        pos = center;
                        pos.x += sin(t * na) * cos(t * nb) * tan(t * na * 0.15) * 0.3;
                        pos.y += tan(t * nc) * sin(t * nd) * 0.1;

                        d = pow(1.6 * na / length(pos - position), u_blobiness);

                        if (i < limit * 0.3333) a += d;
                        else if (i < limit * 0.6666) b += d;
                        else c += d;

                        n += step;
                    }
                }

                vec3 col = vec3(a * c, b * c, a * b) * 0.0001 * u_brightness;

                if (u_scanlines) {
                    col -= mod(gl_FragCoord.y, 2.0) < 1.0 ? 0.5 : 0.0;
                }

                gl_FragColor = vec4(col, 1.0);
            }
        `,r=this.createShader(this.gl.VERTEX_SHADER,t),l=this.createShader(this.gl.FRAGMENT_SHADER,i);this.program=this.createProgram(r,l),this.setupBuffers()}createShader(t,i){const r=this.gl.createShader(t);return this.gl.shaderSource(r,i),this.gl.compileShader(r),this.gl.getShaderParameter(r,this.gl.COMPILE_STATUS)?r:(console.error(this.gl.getShaderInfoLog(r)),this.gl.deleteShader(r),null)}createProgram(t,i){const r=this.gl.createProgram();return this.gl.attachShader(r,t),this.gl.attachShader(r,i),this.gl.linkProgram(r),this.gl.getProgramParameter(r,this.gl.LINK_STATUS)?r:(console.error(this.gl.getProgramInfoLog(r)),this.gl.deleteProgram(r),null)}setupBuffers(){const t=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,t),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),this.gl.STATIC_DRAW);const i=this.gl.getAttribLocation(this.program,"a_position");this.gl.enableVertexAttribArray(i),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,t),this.gl.vertexAttribPointer(i,2,this.gl.FLOAT,!1,0,0)}start(){this.startTime=performance.now(),this.gl.viewport(0,0,this.canvas.width,this.canvas.height),this.gl.clearColor(0,0,0,1),this.render()}stop(){this.animationFrameId&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null)}onResize(t,i){this.canvas.width=t,this.canvas.height=i,this.gl.viewport(0,0,this.canvas.width,this.canvas.height)}render(){this.animationFrameId=requestAnimationFrame(this.render.bind(this));const i=performance.now()-this.startTime;this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT),this.gl.useProgram(this.program);const r=this.gl.getUniformLocation(this.program,"u_resolution"),l=this.gl.getUniformLocation(this.program,"u_brightness"),u=this.gl.getUniformLocation(this.program,"u_blobiness"),h=this.gl.getUniformLocation(this.program,"u_particles"),d=this.gl.getUniformLocation(this.program,"u_scanlines"),m=this.gl.getUniformLocation(this.program,"u_energy"),p=this.gl.getUniformLocation(this.program,"u_millis"),g=this.gl.getUniformLocation(this.program,"u_timeScale");this.gl.uniform2f(r,this.canvas.width,this.canvas.height),this.gl.uniform1f(l,this.params.brightness),this.gl.uniform1f(u,this.params.blobiness),this.gl.uniform1f(h,this.params.particles),this.gl.uniform1i(d,this.params.scanlines),this.gl.uniform1f(m,this.params.energy),this.gl.uniform1f(p,i),this.gl.uniform1f(g,.5),this.gl.drawArrays(this.gl.TRIANGLES,0,6)}}function Hb(o,t={}){let i,r,l,u,h;const d=()=>{l=new f0(-1,1,1,-1,0,1),r=new ld;const v=new Ts(2,2);u={time:{value:1},animationSpeed:{value:t.animationSpeed||.618},colors:{value:t.colors||[new ie(16711680),new ie(65280),new ie(255)]}};const x=new vi({uniforms:u,vertexShader:`
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = vec4( position, 1.0 );
                }
            `,fragmentShader:`
                varying vec2 vUv;
                uniform float time;
                uniform vec3 colors[3];

                void main() {
                    vec2 p = -1.0 + 2.0 * vUv;
                    float a = time * 40.0;
                    float d, e, f, g = 1.0 / 40.0, h, i, r, q;

                    e = 400.0 * (p.x * 0.5 + 0.5);
                    f = 400.0 * (p.y * 0.5 + 0.5);
                    i = 200.0 + sin(e * g + a / 150.0) * 20.0;
                    d = 200.0 + cos(f * g / 2.0) * 18.0 + cos(e * g) * 7.0;
                    r = sqrt(pow(abs(i - e), 2.0) + pow(abs(d - f), 2.0));
                    q = f / r;
                    e = (r * cos(q)) - a / 2.0;
                    f = (r * sin(q)) - a / 2.0;
                    d = sin(e * g) * 176.0 + sin(e * g) * 164.0 + r;
                    h = ((f + d) + a / 2.0) * g;
                    i = cos(h + r * p.x / 1.3) * (e + e + a) + cos(q * g * 6.0) * (r + h / 3.0);
                    h = sin(f * g) * 144.0 - sin(e * g) * 212.0 * p.x;
                    h = (h + (f - e) * q + sin(r - (a + h) / 7.0) * 10.0 + i / 4.0) * g;
                    i += cos(h * 2.3 * sin(a / 350.0 - q)) * 184.0 * sin(q - (r * 4.3 + a / 12.0) * g) + tan(r * g + h) * 184.0 * cos(r * g + h);
                    i = mod(i / 5.6, 256.0) / 64.0;
                    if (i < 0.0) i += 4.0;
                    if (i >= 2.0) i = 4.0 - i;
                    d = r / 350.0;
                    d += sin(d * d * 8.0) * 0.52;
                    f = (sin(a * g) + 1.0) / 2.0;

                    // Map to the provided colors
                    vec3 col = mix(colors[0], colors[1], i);
                    col = mix(col, colors[2], f);

                    gl_FragColor = vec4(col * d, 1.0);
                }
            `}),M=new Bn(v,x);r.add(M),i=new fd({canvas:o,antialias:!0}),i.setPixelRatio(window.devicePixelRatio),i.setSize(window.innerWidth,window.innerHeight),window.addEventListener("resize",m),p()},m=()=>{i.setSize(window.innerWidth,window.innerHeight)},p=()=>{h=requestAnimationFrame(p),u.time.value=performance.now()/1e3*u.animationSpeed.value,i.render(r,l)},g=()=>{h&&cancelAnimationFrame(h),i&&i.dispose(),window.removeEventListener("resize",m)};return d(),{stop:g}}class Gb{constructor(t,i={}){this.canvas=t,this.renderer=null,this.scene=null,this.camera=null,this.fireball=null,this.trailParticles=[],this.animationFrameId=null,this.time=0,this.sigma=10,this.rho=28,this.beta=8/3,this.x=.1,this.y=0,this.z=0,this.dt=.005,this.maxParticles=8888,this.fireballColor=i.fireballColor||new ie(16729344),this.particleColors=i.particleColors||[new ie(16711680),new ie(65280),new ie(255)],this.init()}init(){this.scene=new ld,this.scene.background=new ie(328965),this.camera=new Yn(30,this.canvas.width/this.canvas.height,1,1e4),this.camera.position.z=1290,this.renderer=new fd({canvas:this.canvas,antialias:!0}),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.shadowMap.enabled=!0;const t=new xc(10,64,64),i=new l_({color:this.fireballColor,emissive:this.fireballColor,emissiveIntensity:1,shininess:100});this.fireball=new Bn(t,i),this.fireball.castShadow=!0,this.scene.add(this.fireball),this.sphereGeometry=new xc(2,16,16),window.addEventListener("resize",this.onResize.bind(this))}getRandomParticleColor(){const t=Math.floor(Math.random()*this.particleColors.length);return this.particleColors[t]}createGlowMaterial(t){return new vi({uniforms:{viewVector:{type:"v3",value:this.camera.position},c:{type:"f",value:.3},p:{type:"f",value:2},glowColor:{type:"c",value:t},time:{type:"f",value:0}},vertexShader:`
                uniform vec3 viewVector;
                uniform float c;
                uniform float p;
                uniform float time; // 时间变量
                varying float intensity;
                void main() {
                    vec3 vNormal = normalize(normalMatrix * normal);
                    vec3 vNormel = normalize(normalMatrix * viewVector);
                    intensity = pow(c - dot(vNormal, vNormel), p);
                    intensity *= abs(sin(time * 2.0)); // 动态效果，闪烁
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,fragmentShader:`
                uniform vec3 glowColor;
                varying float intensity;
                void main() {
                    gl_FragColor = vec4(glowColor, intensity);
                }
            `,side:Un,blending:uh,transparent:!0})}start(){this.animate()}animate(){this.animationFrameId=requestAnimationFrame(this.animate.bind(this)),this.time+=.01;const t=this.sigma*(this.y-this.x)*this.dt,i=(this.x*(this.rho-this.z)-this.y)*this.dt,r=(this.x*this.y-this.beta*this.z)*this.dt;this.x+=t,this.y+=i,this.z+=r;const l=this.y*10,u=-this.x*10;this.fireball.position.set(l,u,this.z*10);const h=this.getRandomParticleColor(),d=new l_({color:h,emissive:h,emissiveIntensity:.8,shininess:100}),m=this.createGlowMaterial(h),p=Math.random()*.618+1.5,g=new Bn(this.sphereGeometry,d);g.position.set(l,u,this.z*10),g.scale.set(p,p,p),this.scene.add(g);const v=new Bn(this.sphereGeometry,m);if(v.position.set(l,u,this.z*10),v.scale.set(p*1.5,p*1.5,p*1.5),this.scene.add(v),this.trailParticles.push({particle:g,glow:v,glowMaterial:m}),this.trailParticles.length>this.maxParticles){const x=this.trailParticles.shift();this.scene.remove(x.particle),this.scene.remove(x.glow),x.particle.geometry.dispose(),x.particle.material.dispose(),x.glow.geometry.dispose(),x.glow.material.dispose()}this.trailParticles.forEach((x,M)=>{const T=1-M/this.trailParticles.length;x.particle.material.opacity=T,x.particle.material.transparent=!0,x.glowMaterial.uniforms.time.value=this.time}),this.scene.rotation.y-=.001,this.scene.rotation.x+=.001,this.renderer.render(this.scene,this.camera)}onResize(){const t=window.innerWidth/window.innerHeight;this.camera.aspect=t,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)}stop(){for(cancelAnimationFrame(this.animationFrameId),this.renderer.dispose(),this.trailParticles.forEach(t=>{this.scene.remove(t.particle),this.scene.remove(t.glow),t.particle.geometry.dispose(),t.particle.material.dispose(),t.glow.geometry.dispose(),t.glow.material.dispose()}),this.trailParticles=[];this.scene.children.length>0;)this.scene.remove(this.scene.children[0]);window.removeEventListener("resize",this.onResize.bind(this))}}var oh={exports:{}},lh,P_;function Vb(){if(P_)return lh;P_=1;var o="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return lh=o,lh}var ch,z_;function kb(){if(z_)return ch;z_=1;var o=Vb();function t(){}function i(){}return i.resetWarningCache=t,ch=function(){function r(h,d,m,p,g,v){if(v!==o){var x=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw x.name="Invariant Violation",x}}r.isRequired=r;function l(){return r}var u={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:l,element:r,elementType:r,instanceOf:l,node:r,objectOf:l,oneOf:l,oneOfType:l,shape:l,exact:l,checkPropTypes:i,resetWarningCache:t};return u.PropTypes=u,u},ch}var F_;function Xb(){return F_||(F_=1,oh.exports=kb()()),oh.exports}var Wb=Xb();const fs=Mx(Wb),_0=({src:o,style:t={}})=>{const i=hr.useRef();return hr.useEffect(()=>{let r,l,u,h,d,m={x:.5,y:.5},p={x:.5,y:.5},g={x:.5,y:.5},v=.02,x=0;const M=`
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,T=`
            varying vec2 vUv;
            uniform sampler2D u_texture;    
            uniform vec2 u_mouse;
            uniform vec2 u_prevMouse;
            uniform float u_aberrationIntensity;

            void main() {
                vec2 gridUV = floor(vUv * vec2(20.0, 20.0)) / vec2(20.0, 20.0);
                vec2 centerOfPixel = gridUV + vec2(1.0 / 20.0, 1.0 / 20.0);
                
                vec2 mouseDirection = u_mouse - u_prevMouse;
                
                vec2 pixelToMouseDirection = centerOfPixel - u_mouse;
                float pixelDistanceToMouse = length(pixelToMouseDirection);
                float strength = smoothstep(0.3, 0.0, pixelDistanceToMouse);
    
                vec2 uvOffset = strength * -mouseDirection * 0.2;
                vec2 uv = vUv - uvOffset;

                vec4 colorR = texture2D(u_texture, uv + vec2(strength * u_aberrationIntensity * 0.01, 0.0));
                vec4 colorG = texture2D(u_texture, uv);
                vec4 colorB = texture2D(u_texture, uv - vec2(strength * u_aberrationIntensity * 0.01, 0.0));

                gl_FragColor = vec4(colorR.r, colorG.g, colorB.b, 1.0);
            }
        `,C=F=>{l=new ld,u=new Yn(80,i.current.offsetWidth/i.current.offsetHeight,.01,10),u.position.z=1;const z={u_mouse:{type:"v2",value:new Ce},u_prevMouse:{type:"v2",value:new Ce},u_aberrationIntensity:{type:"f",value:0},u_texture:{type:"t",value:F}};h=new Bn(new Ts(2,2),new vi({uniforms:z,vertexShader:M,fragmentShader:T})),l.add(h),r=new fd({antialias:!0}),r.setSize(i.current.offsetWidth,i.current.offsetHeight),i.current.appendChild(r.domElement)},y=()=>{d=requestAnimationFrame(y),m.x+=(p.x-m.x)*v,m.y+=(p.y-m.y)*v,h.material.uniforms.u_mouse.value.set(m.x,1-m.y),h.material.uniforms.u_prevMouse.value.set(g.x,1-g.y),x=Math.max(0,x-.05),h.material.uniforms.u_aberrationIntensity.value=x,r.render(l,u)},_=()=>{if(!i.current)return;const F=i.current.offsetWidth,z=i.current.offsetHeight;u.aspect=F/z,u.updateProjectionMatrix(),r.setSize(F,z)},P=F=>{v=.02;const z=i.current.getBoundingClientRect();g={...p},p.x=(F.clientX-z.left)/z.width,p.y=(F.clientY-z.top)/z.height,x=1},O=F=>{v=.02;const z=i.current.getBoundingClientRect();m.x=p.x=(F.clientX-z.left)/z.width,m.y=p.y=(F.clientY-z.top)/z.height},D=()=>{v=.05,p={...g}};return new ey().load(o,F=>{C(F),y()},void 0,F=>{console.error(`Error loading texture from ${o}:`,F)}),window.addEventListener("resize",_),i.current.addEventListener("mousemove",P),i.current.addEventListener("mouseenter",O),i.current.addEventListener("mouseleave",D),()=>{d&&cancelAnimationFrame(d),r&&r.dispose(),window.removeEventListener("resize",_),i.current&&(i.current.removeEventListener("mousemove",P),i.current.removeEventListener("mouseenter",O),i.current.removeEventListener("mouseleave",D))}},[o]),Pt.jsx("div",{ref:i,style:{position:"relative",overflow:"hidden",borderRadius:"10px",width:"100%",height:"100%",...t}})};_0.propTypes={src:fs.string.isRequired,style:fs.object};class ms{constructor(t=0,i=0){this.x=t,this.y=i}clone(){return new ms(this.x,this.y)}length(t){return typeof t>"u"?Math.sqrt(this.x*this.x+this.y*this.y):(this.normalize(),this.x*=t,this.y*=t,this)}normalize(){const t=this.length();return this.x/=t,this.y/=t,this}}class qb{constructor(t){this.settings=t,this.position=new ms,this.velocity=new ms,this.acceleration=new ms,this.age=0}initialize(t,i,r,l){this.position.x=t,this.position.y=i,this.velocity.x=r,this.velocity.y=l,this.acceleration.x=r*this.settings.particles.effect,this.acceleration.y=l*this.settings.particles.effect,this.age=0}update(t){this.position.x+=this.velocity.x*t,this.position.y+=this.velocity.y*t,this.velocity.x+=this.acceleration.x*t,this.velocity.y+=this.acceleration.y*t,this.age+=t}draw(t,i){function r(u){return--u*u*u+1}const l=i.width*r(this.age/this.settings.particles.duration);t.globalAlpha=1-this.age/this.settings.particles.duration,t.drawImage(i,this.position.x-l/2,this.position.y-l/2,l,l)}}class Yb{constructor(t){this.settings=t,this.particles=new Array(t.particles.length),this.firstActive=0,this.firstFree=0,this.duration=t.particles.duration;for(let i=0;i<this.particles.length;i++)this.particles[i]=new qb(t)}add(t,i,r,l){this.particles[this.firstFree].initialize(t,i,r,l),this.firstFree++,this.firstFree===this.particles.length&&(this.firstFree=0),this.firstActive===this.firstFree&&this.firstActive++,this.firstActive===this.particles.length&&(this.firstActive=0)}update(t){let i;if(this.firstActive<this.firstFree)for(i=this.firstActive;i<this.firstFree;i++)this.particles[i].update(t);if(this.firstFree<this.firstActive){for(i=this.firstActive;i<this.particles.length;i++)this.particles[i].update(t);for(i=0;i<this.firstFree;i++)this.particles[i].update(t)}for(;this.particles[this.firstActive].age>=this.duration&&this.firstActive!==this.firstFree;)this.firstActive++,this.firstActive===this.particles.length&&(this.firstActive=0)}draw(t,i){if(this.firstActive<this.firstFree)for(let r=this.firstActive;r<this.firstFree;r++)this.particles[r].draw(t,i);if(this.firstFree<this.firstActive){for(let r=this.firstActive;r<this.particles.length;r++)this.particles[r].draw(t,i);for(let r=0;r<this.firstFree;r++)this.particles[r].draw(t,i)}}}class jb{constructor(t,i={}){var r,l,u,h,d;this.canvas=t,this.context=this.canvas.getContext("2d"),this.width=i.width||180,this.height=i.height||130,this.color=i.color||"#ea80b0",this.settings={particles:{length:((r=i.particles)==null?void 0:r.length)||500,duration:((l=i.particles)==null?void 0:l.duration)||2,velocity:((u=i.particles)==null?void 0:u.velocity)||100,effect:((h=i.particles)==null?void 0:h.effect)||-.75,size:((d=i.particles)==null?void 0:d.size)||30}},this.particles=new Yb(this.settings),this.particleRate=this.settings.particles.length/this.settings.particles.duration,this.time=null,this.animationFrameId=null,this.boundOnResize=this.onResize.bind(this),window.addEventListener("resize",this.boundOnResize),this.initializeCanvas(),this.image=this.createHeartImage()}initializeCanvas(){this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight,this.context.fillStyle="#000000",this.context.fillRect(0,0,this.canvas.width,this.canvas.height)}createHeartImage(){const t=document.createElement("canvas"),i=t.getContext("2d");t.width=this.settings.particles.size,t.height=this.settings.particles.size;const r=d=>{const m=this.pointOnHeart(d);return m.x=this.settings.particles.size/2+m.x*this.settings.particles.size/this.width,m.y=this.settings.particles.size/2-m.y*this.settings.particles.size/this.height,m};i.beginPath();let l=-Math.PI,u=r(l);for(i.moveTo(u.x,u.y);l<Math.PI;)l+=.01,u=r(l),i.lineTo(u.x,u.y);i.closePath(),i.fillStyle=this.color,i.fill();const h=new Image;return h.src=t.toDataURL(),h}pointOnHeart(t){return new ms(this.width*Math.pow(Math.sin(t),3),this.height*Math.cos(t)-50*Math.cos(2*t)-20*Math.cos(3*t)-10*Math.cos(4*t)+25)}start(){this.render()}onResize(){this.initializeCanvas()}render(){if(!this.context)return;this.animationFrameId=requestAnimationFrame(this.render.bind(this));const t=new Date().getTime()/1e3,i=t-(this.time||t);this.time=t,this.context.clearRect(0,0,this.canvas.width,this.canvas.height),this.context.fillStyle="black",this.context.fillRect(0,0,this.canvas.width,this.canvas.height);const r=this.particleRate*i;for(let l=0;l<r;l++){const u=this.pointOnHeart(Math.PI-2*Math.PI*Math.random()),h=u.clone().length(this.settings.particles.velocity);this.particles.add(this.canvas.width/2+u.x,this.canvas.height/2-u.y,h.x,-h.y)}this.particles.update(i),this.particles.draw(this.context,this.image)}stop(){this.animationFrameId&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null),this.canvas&&this.context.clearRect(0,0,this.canvas.width,this.canvas.height),window.removeEventListener("resize",this.boundOnResize)}}const Zb="/assets/hua-UD3hocap.jpeg",v0=({title:o,description:t,techUsed:i,imgSrc:r})=>Pt.jsx("div",{className:"bg-dark rounded-lg shadow-md overflow-hidden",children:Pt.jsxs("div",{className:"relative",children:[Pt.jsx("img",{src:r,alt:o,className:"w-full h-96 object-cover"}),Pt.jsx("div",{className:"absolute inset-0 bg-primaryDark bg-opacity-50 opacity-0 hover:opacity-100 hover:bg-opacity-80 transition-opacity flex items-center justify-center",children:Pt.jsxs("div",{className:"text-center text-white space-y-4",children:[Pt.jsx("h3",{className:"text-2xl font-semibold",children:o}),Pt.jsx("p",{className:"text-base",children:t}),Pt.jsx("p",{className:"text-sm font-light text-primary",children:i}),Pt.jsxs("div",{className:"flex justify-center space-x-4",children:[Pt.jsx("a",{href:"#",className:"w-10 h-10 inline-flex items-center justify-center p-2 border-solid border-2 border-secondary rounded-full text-[20px]  text-white no-underline transition duration-500 hover:bg-secondary hover:text-bg hover:shadow-lg",children:Pt.jsx("i",{className:"ri-github-fill"})}),Pt.jsx("a",{href:"#",className:"w-10 h-10 inline-flex items-center justify-center p-2 border-solid border-2 border-secondary rounded-full text-[20px]  text-white no-underline transition duration-500 hover:bg-secondary hover:text-bg hover:shadow-lg",children:Pt.jsx("i",{className:"ri-corner-down-left-line"})})]})]})})]})});v0.propTypes={title:fs.string.isRequired,description:fs.string.isRequired,techUsed:fs.string.isRequired,imgSrc:fs.string.isRequired};const Kb="/assets/AQI1-CWMnwi6r.jpg",Qb="/assets/AQI2-BuS38wij.jpg",Jb="/assets/AQI3-BSvsgO7T.jpg",$b="/assets/AQI4-BtkEH0YG.jpg",t1="/assets/AQI5-F1rqMnW7.jpg",e1=()=>{const[o,t]=hr.useState("effectfuse"),[i,r]=hr.useState(!1),[l,u]=hr.useState("home"),h=[{title:"Frontend Project",description:"Lorem ipsum dolor sit amet consectetur volup adipisicing elit. Placeat el voluptatem.",techUsed:"HTML5, CSS3, JavaScript",imgSrc:Kb},{title:"Full Stack Project",description:"Lorem ipsum dolor sit amet consectetur volup adipisicing elit. Placeat el voluptatem.",techUsed:"Next.js, Tailwind.css, Node.js",imgSrc:Qb},{title:"Frontend Project",description:"Lorem ipsum dolor sit amet consectetur volup adipisicing elit. Placeat el voluptatem.",techUsed:"React.js, Tailwind.css",imgSrc:Jb},{title:"Frontend Project",description:"Lorem ipsum dolor sit amet consectetur volup adipisicing elit. Placeat el voluptatem.",techUsed:"HTML5, Bootstrap, JavaScript",imgSrc:$b},{title:"Frontend Project",description:"Lorem ipsum dolor sit amet consectetur volup adipisicing elit. Placeat el voluptatem.",techUsed:"Next.js, Tailwind.css",imgSrc:t1}];return hr.useEffect(()=>{let d,m;const p=()=>{const T=document.createElement("canvas");return T.style.position="fixed",T.style.top="0",T.style.left="0",T.style.width="100%",T.style.height="100%",T.style.zIndex="-1",document.body.appendChild(T),T},g=()=>{m&&(m.width=window.innerWidth,m.height=window.innerHeight,d&&d.onResize&&d.onResize(window.innerWidth,window.innerHeight))};function v(T){return T.map(C=>{const{r:y,g:_,b:P}=C;return{r:y,g:_,b:P}})}const x=[new ie(1908754),new ie(11521167),new ie(8169052),new ie(6126923),new ie(7769744)],M=v(x);if(o==="effectfuse"){m=p();const T={brightness:.61,blobiness:1.6,particles:16,energy:1.11,scanlines:!1,colors:M};d=new Ib(m,T),d.start()}else if(o==="effectmonjori"){m=p();const T={animationSpeed:.618,colors:x};d=new Hb(m,T)}else if(o==="effectlorenzattractor"){m=p();const T={fireballColor:new ie(11521167),particleColors:x};d=new Gb(m,T),d.start()}else if(o==="heartEffect"){m=p();const T={width:180,height:130,color:"#7CA65C",particles:{length:600,duration:2,velocity:300,effect:-.8,size:25}};d=new jb(m,T),d.start()}return window.addEventListener("resize",g),g(),()=>{d&&d.stop&&d.stop(),m&&document.body.removeChild(m),window.removeEventListener("resize",g)}},[o]),Pt.jsxs(Pt.Fragment,{children:[Pt.jsxs("header",{className:"fixed top-0 left-0 w-full pt-20 px-24 z-10 bg-primary-dark text-white flex justify-between items-center",children:[Pt.jsx("span",{className:"text-2xl font-bold font-audiowide cursor-pointer animate-slideIn",onClick:()=>{t("effectfuse"),u("home")},children:"Portfolio."}),Pt.jsx("div",{className:"lg:hidden",children:Pt.jsx("button",{className:"text-3xl focus:outline-none",onClick:()=>r(!i),children:"☰"})}),Pt.jsxs("nav",{className:`lg:flex space-x-4 absolute lg:static top-[60px] left-0 bg-primary-dark w-full lg:w-auto lg:bg-transparent flex-col lg:flex-row items-center text-center transition-transform duration-300 transform lg:translate-x-0 ${i?"translate-x-0":"-translate-x-full"}`,children:[Pt.jsx("a",{href:"#",className:"font-audiowide text-lg hover:underline underline-offset-8 block lg:inline-block p-2 lg:p-0",onClick:()=>{r(!1),t("effectfuse"),u("home")},children:"Home"}),Pt.jsx("a",{href:"#",className:"font-audiowide text-lg hover:underline underline-offset-8 block lg:inline-block p-2 lg:p-0",onClick:()=>{r(!1),t("effectmonjori"),u("project")},children:"Project"}),Pt.jsx("a",{href:"#",className:"font-audiowide text-lg hover:underline underline-offset-8 block lg:inline-block p-2 lg:p-0",onClick:()=>{r(!1),t("effectlorenzattractor"),u("gallery")},children:"Gallery"}),Pt.jsx("a",{href:"#",className:"font-audiowide text-lg hover:underline underline-offset-8 block lg:inline-block p-2 lg:p-0",onClick:()=>{r(!1),t("effectlorenzattractor"),u("about")},children:"About"}),Pt.jsx("a",{href:"#",className:"font-audiowide text-lg hover:underline underline-offset-8 block lg:inline-block p-2 lg:p-0",onClick:()=>{r(!1),t("heartEffect"),u("contact")},children:"Contact"})]})]}),l==="home"&&Pt.jsxs("section",{className:"flex flex-col lg:flex-row justify-center items-center gap-12 p-36 h-full text-white z-1",children:[Pt.jsxs("div",{className:"order-2 lg:order-1 text-primary-dark space-y-6 text-center lg:text-left animate-slideIn",children:[Pt.jsx("h1",{className:"text-6xl font-bold font-beauRivage mb-6",children:"Hua Wang"}),Pt.jsx("h2",{className:"text-3xl font-semibold mb-6 font-mono",children:"Web Developer / Data Engineer"}),Pt.jsx("p",{className:"mt-4 leading-normal text-lg font-poppins",children:"I am a skilled and reliable software engineer with over 4 years of experience specializing in full stack development. My expertise includes building scalable APIs, integrating with cloud services, and designing CI/CD pipelines."}),Pt.jsxs("div",{className:"mt-12 flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4",children:[Pt.jsx("a",{href:"#",className:"btn border-solid border-2 border-secondary text-light px-4 py-2 rounded shadow-lg hover:bg-secondary",children:"Download CV"}),Pt.jsxs("div",{className:"flex space-x-4",children:[Pt.jsx("a",{href:"https://github.com/aemooooon",target:"_blank",rel:"noreferrer",className:"w-10 h-10 inline-flex items-center justify-center p-2 border-solid border-2 border-secondary rounded-full text-[24px] text-white no-underline transition duration-500 hover:bg-secondary hover:text-bg hover:shadow-lg",children:Pt.jsx("i",{className:"ri-github-fill"})}),Pt.jsx("a",{href:"https://www.linkedin.com/in/aemonwang",target:"_blank",rel:"noreferrer",className:"w-10 h-10 inline-flex items-center justify-center p-2 border-solid border-2 border-secondary rounded-full text-[20px]  text-white no-underline transition duration-500 hover:bg-secondary hover:text-bg hover:shadow-lg",children:Pt.jsx("i",{className:"ri-linkedin-fill"})}),Pt.jsx("a",{href:"mailto:aemooooon@gmail.com",rel:"noreferrer",className:"w-10 h-10 inline-flex items-center justify-center p-2 border-solid border-2 border-secondary rounded-full text-[20px]  text-white no-underline transition duration-500 hover:bg-secondary hover:text-bg hover:shadow-lg",children:Pt.jsx("i",{className:"ri-google-fill"})})]})]})]}),Pt.jsx("div",{className:"order-1 lg:order-2 animate-zoomIn",children:Pt.jsx("div",{className:"relative w-[25vw] h-[25vw] border-4 border-secondary rounded-full shadow-md overflow-hidden bg-light animate-hueRotate",children:Pt.jsx(_0,{src:Zb,style:{width:"100%",height:"100%",cursor:"all-scroll"}})})})]}),l==="about"&&Pt.jsx("section",{className:"flex justify-center items-center p-12 h-full text-white",children:Pt.jsx("h1",{children:"About Section Placeholder"})}),l==="project"&&Pt.jsx("section",{className:"my-36 mx-12 text-white overflow-y-auto",style:{maxHeight:"calc(100vh - 300px)"},children:Pt.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6",children:h.map((d,m)=>Pt.jsx(v0,{...d},m))})}),l==="gallery"&&Pt.jsx("section",{className:"flex justify-center items-center p-12 h-full text-white",children:Pt.jsx("h1",{children:"Gallery"})}),l==="contact"&&Pt.jsx("section",{className:"py-8 lg:py-20 h-full text-white",children:Pt.jsx("div",{className:"flex justify-center items-center h-full",children:Pt.jsxs("form",{className:"flex flex-col justify-center items-center w-full max-w-4xl",children:[Pt.jsx("h3",{className:"text-4xl font-semibold text-primary mb-12",children:"Let's Work Together!"}),Pt.jsxs("div",{className:"flex space-x-4 justify-center items-center mb-12",children:[Pt.jsx("a",{href:"https://github.com/aemooooon",target:"_blank",rel:"noreferrer",className:"w-10 h-10 inline-flex items-center justify-center p-2 border-solid border-2 border-secondary rounded-full text-[24px] text-white no-underline transition duration-500 hover:bg-secondary hover:text-bg hover:shadow-lg",children:Pt.jsx("i",{className:"ri-github-fill"})}),Pt.jsx("a",{href:"https://www.linkedin.com/in/aemonwang",target:"_blank",rel:"noreferrer",className:"w-10 h-10 inline-flex items-center justify-center p-2 border-solid border-2 border-secondary rounded-full text-[20px]  text-white no-underline transition duration-500 hover:bg-secondary hover:text-bg hover:shadow-lg",children:Pt.jsx("i",{className:"ri-linkedin-fill"})}),Pt.jsx("a",{href:"mailto:aemooooon@gmail.com",rel:"noreferrer",className:"w-10 h-10 inline-flex items-center justify-center p-2 border-solid border-2 border-secondary rounded-full text-[20px]  text-white no-underline transition duration-500 hover:bg-secondary hover:text-bg hover:shadow-lg",children:Pt.jsx("i",{className:"ri-google-fill"})})]}),Pt.jsxs("div",{className:"flex flex-wrap gap-6 w-full",children:[Pt.jsx("input",{type:"text",placeholder:"Full Name",required:!0,className:"flex-1 min-w-[20rem] p-4 bg-gray-800 rounded-md text-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:outline-none"}),Pt.jsx("input",{type:"email",placeholder:"Email Address",required:!0,className:"flex-1 min-w-[20rem] p-4 bg-gray-800 rounded-md text-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:outline-none"}),Pt.jsx("input",{type:"text",placeholder:"Phone Number",required:!0,className:"flex-1 min-w-[20rem] p-4 bg-gray-800 rounded-md text-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:outline-none"}),Pt.jsx("input",{type:"text",placeholder:"Email Subject",required:!0,className:"flex-1 min-w-[20rem] p-4 bg-gray-800 rounded-md text-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:outline-none"}),Pt.jsx("textarea",{placeholder:"Your Message",required:!0,className:"w-full p-4 bg-gray-800 rounded-md text-lg text-white placeholder-gray-400 resize-none h-40 focus:ring-2 focus:ring-primary focus:outline-none"})]}),Pt.jsx("div",{className:"mt-8",children:Pt.jsx("button",{type:"submit",className:"btn bg-secondary text-light px-8 py-3 rounded font-semibold shadow-lg hover:bg-accent transition-all",children:"Send Message"})})]})})})]})};Lx.createRoot(document.getElementById("root")).render(Pt.jsx(hr.StrictMode,{children:Pt.jsx(e1,{})}));
