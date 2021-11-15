var e=Object.defineProperty,a=Object.defineProperties,l=Object.getOwnPropertyDescriptors,t=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable,r=(a,l,t)=>l in a?e(a,l,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[l]=t;import{p as s,g as i}from"./index.bd3d330c.js";import{c as u,u as c,b as d,a as v}from"./table.38630b50.js";import{d as p,m,A as b,n as y,an as h,aC as g,g as f,aD as k,aZ as S,aX as w,aY as I,aO as O,aT as j,aS as P,t as T,v as x,r as z,o as C,c as U,a as V,k as F}from"./vendor.204f34a9.js";const L=[{key:"name",label:"用户姓名",value:m(null),render:e=>y(k,{value:e.value.value,onUpdateValue:a=>{e.value.value=a},placeholder:"请输入姓名"})},{key:"sex",label:"用户姓别",value:m(null),optionItems:[{label:"男",value:0},{label:"女",value:1}],render:e=>y(S,{options:e.optionItems,value:e.value.value,placeholder:"请选择用户姓别",onUpdateValue:a=>{e.value.value=a}})},{key:"date",label:"日期",value:m(null),render:e=>y(w,{value:e.value.value,placeholder:"请选择日期",style:"width: 100%",onUpdateValue:a=>{e.value.value=a},type:"date"})},{key:"time",label:"时间",value:m(null),render:e=>y(I,{options:e.optionItems,value:e.value.value,placeholder:"请选择时间",style:"width: 100%",onUpdateValue:a=>{e.value.value=a}})},{key:"checkbox",label:"复选",value:m(null),optionItems:[{label:"选项1",value:0},{label:"选项2",value:1}],render:e=>y(P,{options:e.optionItems,value:e.value.value,placeholder:"请选择用户姓别",onUpdateValue:a=>{e.value.value=a}},{default:()=>y(O,{itemStyle:"display: flex;"},{default:()=>{var a;return null==(a=e.optionItems)?void 0:a.map((e=>y(j,{key:e.value,label:e.label,value:e.value})))}})})}];var R=p({name:"TableWithSearch",setup(){const e=m(null),p=u(O),k=c(),S=b(),w=d("id"),I=v([k.selectionColumn,k.indexColumn,{title:"名称",key:"nickName"},{title:"性别",key:"gender",width:80,render:e=>y("div",0===e.gender?"男":"女")},{title:"头像",key:"avatar",render:e=>y(h,{circle:!0,size:"small",src:e.avatar||""})},{title:"地址",key:"address"},{title:"名称",key:"nickName"},{title:"上次登录时间",key:"lastLoginTime"},{title:"上次登录IP",key:"lastLoginIp"},{title:"状态",key:"status",render:e=>y(g,{value:!!e.status})}],{align:"center"});function O(){s({url:i,data:()=>({page:p.page,pageSize:p.pageSize})}).then((e=>{k.handleSuccess(e),p.setTotalSize(e.totalSize||10)})).catch(console.log)}return f(O),j=((e,a)=>{for(var l in a||(a={}))n.call(a,l)&&r(e,l,a[l]);if(t)for(var l of t(a))o.call(a,l)&&r(e,l,a[l]);return e})({},k),a(j,l({rowKey:w,pagination:p,searchForm:e,tableColumns:I,conditionItems:L,onSearch:function(){var a;S.success("模拟查询成功，参数为："+JSON.stringify(null==(a=e.value)?void 0:a.generatorParams()))},onResetSearch:function(){var a;null==(a=e.value)||a.reset()}}));var j}});const _=F();T("data-v-0805c478");const D={class:"main-container"};x();const N=_(((e,a,l,t,n,o)=>{const r=z("DataForm"),s=z("TableHeader"),i=z("n-data-table"),u=z("TableBody"),c=z("TableFooter");return C(),U("div",D,[V(s,{"show-filter":!0,title:"查询条件",onSearch:e.onSearch,onResetSearch:e.onResetSearch},{"search-content":_((()=>[V(r,{ref:"searchForm","form-config":{labelWidth:60},options:e.conditionItems,preset:"grid-item"},null,8,["options"])])),_:1},8,["onSearch","onResetSearch"]),V(u,{ref:"tableBody"},{default:_((()=>[V(i,{loading:e.tableLoading,data:e.dataList,columns:e.tableColumns,"row-key":e.rowKey},null,8,["loading","data","columns","row-key"])])),_:1},512),V(c,{pagination:e.pagination},null,8,["pagination"])])}));R.render=N,R.__scopeId="data-v-0805c478";export default R;
