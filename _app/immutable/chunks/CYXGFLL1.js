import{aB as m,ap as w,aC as L,x as g,w as C,aI as M,aG as O,O as x,e as T,G as f,aJ as N,aK as V,h as _,m as l,j as D,i as B}from"./CL7g0V5-.js";function J(e){return e.endsWith("capture")&&e!=="gotpointercapture"&&e!=="lostpointercapture"}const R=["beforeinput","click","change","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"];function K(e){return R.includes(e)}const W={formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly",defaultvalue:"defaultValue",defaultchecked:"defaultChecked",srcobject:"srcObject",novalidate:"noValidate",allowfullscreen:"allowFullscreen",disablepictureinpicture:"disablePictureInPicture",disableremoteplayback:"disableRemotePlayback"};function Q(e){return e=e.toLowerCase(),W[e]??e}const j=["touchstart","touchmove"];function X(e){return j.includes(e)}function F(e){var t=L,r=g;m(null),w(null);try{return e()}finally{m(t),w(r)}}const G=new Set,U=new Set;function $(e,t,r,i={}){function n(a){if(i.capture||q.call(t,a),!a.cancelBubble)return F(()=>r==null?void 0:r.call(this,a))}return e.startsWith("pointer")||e.startsWith("touch")||e==="wheel"?C(()=>{t.addEventListener(e,n,i)}):t.addEventListener(e,n,i),n}function Y(e,t,r,i,n){var a={capture:i,passive:n},o=$(e,t,r,a);(t===document.body||t===window||t===document)&&M(()=>{t.removeEventListener(e,o,a)})}function Z(e){for(var t=0;t<e.length;t++)G.add(e[t]);for(var r of U)r(e)}function q(e){var S;var t=this,r=t.ownerDocument,i=e.type,n=((S=e.composedPath)==null?void 0:S.call(e))||[],a=n[0]||e.target,o=0,d=e.__root;if(d){var s=n.indexOf(d);if(s!==-1&&(t===document||t===window)){e.__root=t;return}var c=n.indexOf(t);if(c===-1)return;s<=c&&(o=s)}if(a=n[o]||e.target,a!==t){O(e,"currentTarget",{configurable:!0,get(){return a||r}});var y=L,b=g;m(null),w(null);try{for(var p,k=[];a!==null;){var E=a.assignedSlot||a.parentNode||a.host||null;try{var v=a["__"+i];if(v!==void 0&&!a.disabled)if(x(v)){var[P,...A]=v;P.apply(a,[e,...A])}else v.call(a,e)}catch(h){p?k.push(h):p=h}if(e.cancelBubble||E===t||E===null)break;a=E}if(p){for(let h of k)queueMicrotask(()=>{throw h});throw p}}finally{e.__root=t,delete e.currentTarget,m(y),w(b)}}}function I(e){var t=document.createElement("template");return t.innerHTML=e,t.content}function u(e,t){var r=g;r.nodes_start===null&&(r.nodes_start=e,r.nodes_end=t)}function ee(e,t){var r=(t&N)!==0,i=(t&V)!==0,n,a=!e.startsWith("<!>");return()=>{if(_)return u(l,null),l;n===void 0&&(n=I(a?e:"<!>"+e),r||(n=f(n)));var o=i?document.importNode(n,!0):n.cloneNode(!0);if(r){var d=f(o),s=o.lastChild;u(d,s)}else u(o,o);return o}}function te(e,t,r="svg"){var i=!e.startsWith("<!>"),n=(t&N)!==0,a=`<${r}>${i?e:"<!>"+e}</${r}>`,o;return()=>{if(_)return u(l,null),l;if(!o){var d=I(a),s=f(d);if(n)for(o=document.createDocumentFragment();f(s);)o.appendChild(f(s));else o=f(s)}var c=o.cloneNode(!0);if(n){var y=f(c),b=c.lastChild;u(y,b)}else u(c,c);return c}}function re(e=""){if(!_){var t=T(e+"");return u(t,t),t}var r=l;return r.nodeType!==3&&(r.before(r=T()),B(r)),u(r,r),r}function ae(){if(_)return u(l,null),l;var e=document.createDocumentFragment(),t=document.createComment(""),r=T();return e.append(t,r),u(t,r),e}function ne(e,t){if(_){g.nodes_end=l,D();return}e!==null&&e.before(t)}const z="5";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(z);export{ne as a,u as b,I as c,G as d,J as e,$ as f,Z as g,q as h,X as i,K as j,ae as k,re as l,te as m,Q as n,Y as o,U as r,ee as t};
