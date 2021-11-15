var e=Object.defineProperty,a=Object.defineProperties,l=Object.getOwnPropertyDescriptors,n=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable,o=(a,l,n)=>l in a?e(a,l,{enumerable:!0,configurable:!0,writable:!0,value:n}):a[l]=n;import{u as d,i as u,t as i,j as s,p as v,k as c,m}from"./index.bd3d330c.js";import{u as f,b,a as p,d as y}from"./table.38630b50.js";import{g,r as h,h as k,i as w}from"./form.b8e9dc80.js";import{d as O,B as P,A as j,m as x,n as C,N as U,q as D,aD as I,g as N,t as A,v as F,r as S,o as _,c as q,a as B,k as J}from"./vendor.204f34a9.js";var L=O({name:"Menu",setup(){let e="add",O=null;const A=f(),F=P(),S=j(),_=d(),q=x(null),B=x(null),J=b("menuUrl"),L=p([{title:"菜单名称",key:"menuName"},{title:"菜单地址",key:"menuUrl"},{title:"菜单图标",key:"icon",render:e=>"iconfont"===e.iconPrefix?C(u,{prefix:e.iconPrefix?e.iconPrefix:"iconfont",name:e.icon?e.icon:"menu"}):C(U,null,{default:()=>C("svg",{"aria-hidden":!1},{default:()=>[C("use",{href:"#icon-menu"})]})})},{title:"提示信息",key:"badge",render:e=>e.badge?C(D,{value:e.badge,dot:"dot"===e.badge}):C("span",null,{default:()=>"--"})},{title:"是否缓存",key:"cacheable",render:e=>C("div",null,{default:()=>e.cacheable?"是":"否"})},{title:"是否隐藏",key:"hidden",render:e=>C("div",null,{default:()=>e.hidden?"是":"否"})},{title:"是否固定标题栏",key:"affix",render:e=>C("div",null,{default:()=>e.affix?"是":"否"})},{title:"操作",key:"actions",render:e=>y([{label:"编辑",onClick:E.bind(null,e)},{label:"删除",type:"error",onClick:K.bind(null,e)}])}],{align:"center"}),T=[{label:"上级菜单",key:"parentPath",value:x(null),validator:(e,a)=>!!e.value.value||(a.error("请选择上级菜单"),!1),render:e=>g(e.value,i(A.dataList,"menuName","menuUrl"))},{label:"菜单名称",key:"menuName",required:!0,value:x(null),render:e=>h(e.value,{placeholder:"请输入菜单名称"})},{label:"菜单地址",key:"menuUrl",required:!0,value:x(null),disabled:x(!1),render:e=>h(e.value,{placeholder:"请输入菜单地址",disabled:e.disabled.value}),reset:e=>{e.value.value=null,e.disabled.value=!1}},{label:"外链地址",key:"redirect",value:x(null),render:e=>h(e.value,{placeholder:"请输入外链地址"})},{label:"菜单图标",key:"icon",value:x(null),render:e=>C(s,{defaultIcon:e.value.value,onUpdateIcon:a=>{e.value.value=a.name}})},{label:"提示信息",key:"badge",value:x(null),render:e=>C("div",null,{default:()=>[k(e.value,[{label:"红点",value:"dot"},{label:"new",value:"new"}]),C(I,{placeholder:"如果此项为空，则说明不需要提示信息",class:"mt-4",value:e.value.value,onUpdateValue:a=>{e.value.value=a}})]})},{label:"是否缓存",key:"cacheable",value:x(!1),render:e=>w(e.value)},{label:"是否隐藏",key:"hidden",value:x(!1),render:e=>w(e.value)},{label:"是否固定",key:"affix",value:x(!0),render:e=>w(e.value)}];function E(a){var l;e="edit",O=a,T.forEach((e=>{e.value.value=a[e.key]||null,"menuUrl"===e.key&&e.disabled&&(e.disabled.value=!0)})),null==(l=q.value)||l.show()}function K(e){F.warning({title:"提示",content:"是否要删除此数据？",positiveText:"删除",onPositiveClick:()=>{S.success("模拟删除成功，参数为："+JSON.stringify(e))}})}return N((function(){v({url:c,data:{}}).then(A.handleSuccess).catch(console.log)})),M=((e,a)=>{for(var l in a||(a={}))t.call(a,l)&&o(e,l,a[l]);if(n)for(var l of n(a))r.call(a,l)&&o(e,l,a[l]);return e})({rowKey:J,modalDialog:q,dataForm:B},A),a(M,l({itemFormOptions:T,tableColumns:L,onAddItem:function(){var a;e="add",null==(a=q.value)||a.show().then((()=>{var e;null==(e=B.value)||e.reset()}))},onDeleteItem:K,onConfirm:function(){var a,l,n,t;if("add"===e)(null==(a=B.value)?void 0:a.validator())&&S.success("模拟创建菜单成功, 参数为:"+JSON.stringify(null==(l=B.value)?void 0:l.generatorParams()));else if(null==(n=B.value)?void 0:n.validator()){const e=null==(t=B.value)?void 0:t.generatorParams();if(O){const a=m(_.state.permissionRoutes,O.menuUrl);a&&a.meta&&a.meta.badge&&(a.meta.badge=e.badge||"")}S.success("模拟修改菜单成功, 参数为:"+JSON.stringify(e))}}}));var M}});const T=J();A("data-v-06019dfe");const E={class:"main-container"};F();const K=T(((e,a,l,n,t,r)=>{const o=S("AddButton"),d=S("TableHeader"),u=S("n-data-table"),i=S("TableBody"),s=S("DataForm"),v=S("ModalDialog");return _(),q("div",E,[B(d,{"show-filter":!1},{"top-right":T((()=>[B(o,{onAdd:e.onAddItem},null,8,["onAdd"])])),_:1}),B(i,null,{default:T((()=>[B(u,{loading:e.tableLoading,data:e.dataList,"row-key":e.rowKey,columns:e.tableColumns},null,8,["loading","data","row-key","columns"])])),_:1}),B(v,{ref:"modalDialog",onConfirm:e.onConfirm,"content-height":"50vh"},{content:T((()=>[B(s,{ref:"dataForm",options:e.itemFormOptions},null,8,["options"])])),_:1},8,["onConfirm"])])}));L.render=K,L.__scopeId="data-v-06019dfe";export default L;
