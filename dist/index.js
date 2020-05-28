!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.schema=e():t.schema=e()}(window,(function(){return function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=1)}([function(t,e){const r=(t,e,n)=>{if(void 0===e)throw TypeError("Schema should be provided.");if("string"==typeof e)return{data:t,...n({type:"prim",data:t,schema:e})};if(Array.isArray(e)){let o="list";if(!Array.isArray(t))return n({type:o,data:t,schema:e});const a=t.map(t=>r(t,e[0],n));return{data:t,...n({type:o,data:a,schema:e})}}if(e.constructor===Object){const o="dict";if(void 0===t||t.constructor!==Object)return n({type:o,data:t,schema:e});const a=Object.entries(e).map(([e,o])=>[e,r(t[e],o,n)]),c=n({type:o,data:Object.fromEntries(a),schema:e});return{data:t,...c}}};t.exports={trav:r}},function(t,e,r){const{validate:n}=r(2),{create:o}=r(3);t.exports={validate:n,create:o}},function(t,e,r){const{trav:n}=r(0);t.exports={validate:(t,e)=>n(t,e,({type:t,data:e,schema:r})=>{const n={prim:(t,e)=>{const r=typeof t===e;return r?{ok:r}:{ok:r,trace:{data:t,schema:e}}},list:(t,e)=>{if(![1,2].includes(e.length))throw TypeError("invalid schema specification");if(void 0===t)return{ok:!1,trace:{data:t,schema:e}};const r=t.map((t,e)=>[e,t]),n=r.every(([t,{ok:e}])=>e),o=r.find(([,{ok:t}])=>!t);let a=!0;if(2===e.length){if(!Array.isArray(e[1])||0===e[1].length)throw TypeError("The second argument of list schema must be an non-empty array");a=t.every(({data:t})=>e[1].includes(t))}let c=n&&a;if(c)return{ok:c};if(n)return{ok:c,trace:{data:t,schema:e}};{const[t,e]=o;return{ok:c,trace:{[t]:e}}}},dict:t=>{if(void 0===t)return{ok:!1,trace:{data:t,schema:r}};const e=Object.entries(t),n=e.every(([,{ok:t}])=>t),o=e.find(([,{ok:t}])=>!t);if(n)return{ok:n};{const[t,e]=o;return{ok:n,trace:{[t]:e}}}}};return t in n?n[t](e,r):{ok:!1}})}},function(t,e,r){const{trav:n}=r(0);t.exports={create:(t,e)=>n(t,e,({type:t,data:e,schema:r})=>{const n={prim:(t,e)=>void 0!==t?{data:t}:{data:{number:0,string:"",boolean:!1}[e]},list:t=>void 0===t?{data:[]}:{data:t.map(({data:t})=>t)},dict:t=>void 0===t?{data:{}}:"object"!=typeof t||t.constructor!==Object?{data:t}:{data:Object.fromEntries(Object.entries(t).map(([t,{data:e}])=>[t,e]))}};return t in n?n[t](e,r):{}})}}])}));