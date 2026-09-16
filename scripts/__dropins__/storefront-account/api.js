/*! Copyright 2026 Adobe
All Rights Reserved. */
<<<<<<< HEAD
import{events as lt}from"@dropins/tools/event-bus.js";import{Initializer as _t,merge as at}from"@dropins/tools/lib.js";import{FetchGraphQL as dt}from"@dropins/tools/fetch-graphql.js";import{COMPANY_ADDRESS_FRAGMENT as V,BASIC_CUSTOMER_INFO_FRAGMENT as ft,CUSTOMER_ORDER_FRAGMENT as gt,ADDRESS_FRAGMENT as mt,ORDER_SUMMARY_FRAGMENT as ht}from"./fragments.js";const it=new _t({init:async t=>{const n={authHeaderConfig:{header:"Authorization",tokenPrefix:"Bearer"}};it.config.setConfig({...n,...t})},listeners:()=>[]}),M=it.config,{setEndpoint:Br,setFetchGraphQlHeader:Lr,removeFetchGraphQlHeader:qr,setFetchGraphQlHeaders:Yr,fetchGraphQl:d,getConfig:zr}=new dt().getMethods(),At=`
=======
import{events as tt}from"@dropins/tools/event-bus.js";import{Initializer as rt,merge as W}from"@dropins/tools/lib.js";import{FetchGraphQL as at}from"@dropins/tools/fetch-graphql.js";import{BASIC_CUSTOMER_INFO_FRAGMENT as ot,CUSTOMER_ORDER_FRAGMENT as nt,ADDRESS_FRAGMENT as it,ORDER_SUMMARY_FRAGMENT as ct}from"./fragments.js";const Z=new rt({init:async t=>{const r={authHeaderConfig:{header:"Authorization",tokenPrefix:"Bearer"}};Z.config.setConfig({...r,...t})},listeners:()=>[]}),y=Z.config,{setEndpoint:nr,setFetchGraphQlHeader:ir,removeFetchGraphQlHeader:cr,setFetchGraphQlHeaders:ur,fetchGraphQl:d,getConfig:er}=new at().getMethods(),ut=`
>>>>>>> 6c65641a7ae144e73bca95136eec963787cdac85
  query GET_ATTRIBUTES_FORM($formCode: String!) {
    attributesForm(formCode: $formCode) {
      items {
        code
        default_value
        entity_type
        frontend_class
        frontend_input
        is_required
        is_unique
        label
        options {
          is_default
          label
          value
        }
        ... on CustomerAttributeMetadata {
          multiline_count
          sort_order
          validate_rules {
            name
            value
          }
        }
      }
      errors {
        type
        message
      }
    }
  }
<<<<<<< HEAD
`,Et=`
=======
`,et=`
>>>>>>> 6c65641a7ae144e73bca95136eec963787cdac85
  query GET_ATTRIBUTES_FORM_SHORT {
    attributesForm(formCode: "customer_register_address") {
      items {
        frontend_input
        label
        code
        ... on CustomerAttributeMetadata {
          multiline_count
          sort_order
        }
      }
    }
  }
<<<<<<< HEAD
`,f=t=>{throw t instanceof DOMException&&t.name==="AbortError"||lt.emit("error",{source:"auth",type:"network",error:t}),t},g=t=>{const n=t.map(r=>r.message).join(" ");throw Error(n)},W=t=>t.replace(/_([a-z])/g,(n,r)=>r.toUpperCase()),St=t=>t.replace(/([A-Z])/g,n=>`_${n.toLowerCase()}`),I=(t,n,r)=>{const o=["string","boolean","number"],e=n==="camelCase"?W:St;return Array.isArray(t)?t.map(a=>o.includes(typeof a)||a===null?a:typeof a=="object"?I(a,n,r):a):t!==null&&typeof t=="object"?Object.entries(t).reduce((a,[c,s])=>{const i=r&&r[c]?r[c]:e(c);return a[i]=o.includes(typeof s)||s===null?s:I(s,n,r),a},{}):t},Ct=t=>{const n=[];for(const r of t)if(!(r.frontend_input!=="MULTILINE"||r.multiline_count<2))for(let o=2;o<=r.multiline_count;o++){const e={...r,is_required:!1,name:`${r.code}_multiline_${o}`,code:`${r.code}_multiline_${o}`,id:`${r.code}_multiline_${o}`};n.push(e)}return n},yt=t=>{switch(t){case"middlename":return"middleName";case"firstname":return"firstName";case"lastname":return"lastName";default:return W(t)}},pt=t=>{var n;return t!=null&&t.options?(n=t==null?void 0:t.options)==null?void 0:n.map(r=>({isDefault:(r==null?void 0:r.is_default)??!1,text:(r==null?void 0:r.label)??"",value:(r==null?void 0:r.value)??""})):[]},Tt=t=>{var a,c,s;const n=((c=(a=t==null?void 0:t.data)==null?void 0:a.attributesForm)==null?void 0:c.items)||[];if(!n.length)return[];const r=(s=n.filter(i=>{var _;return!((_=i.frontend_input)!=null&&_.includes("HIDDEN"))}))==null?void 0:s.map(({code:i,..._})=>{const m=i!=="country_id"?i:"country_code";return{..._,name:m,id:m,code:m}}),o=Ct(r);return r.concat(o).map(i=>({code:i==null?void 0:i.code,name:i==null?void 0:i.name,id:i==null?void 0:i.id,label:(i==null?void 0:i.label)??"",entityType:i==null?void 0:i.entity_type,className:(i==null?void 0:i.frontend_class)??"",defaultValue:(i==null?void 0:i.default_value)??"",fieldType:i==null?void 0:i.frontend_input,multilineCount:(i==null?void 0:i.multiline_count)??0,orderNumber:Number(i==null?void 0:i.sort_order)||0,isHidden:!1,isUnique:(i==null?void 0:i.is_unique)??!1,required:(i==null?void 0:i.is_required)??!1,validateRules:(i==null?void 0:i.validate_rules)??[],options:pt(i),customUpperCode:yt(i==null?void 0:i.code)})).sort((i,_)=>Number(i.orderNumber)-Number(_.orderNumber))},bt=t=>{const n={};for(const r in t){const o=t[r];!Array.isArray(o)||o.length===0||(r==="custom_attributesV2"?o.forEach(e=>{typeof e=="object"&&"value"in e&&(n[e==null?void 0:e.code]=e==null?void 0:e.value)}):o.length>1?o.forEach((e,a)=>{a===0?n[r]=e:n[`${r}_multiline_${a+1}`]=e}):n[r]=o[0])}return n},Rt=t=>({prefix:(t==null?void 0:t.prefix)??"",suffix:(t==null?void 0:t.suffix)??"",firstname:(t==null?void 0:t.firstname)??"",lastname:(t==null?void 0:t.lastname)??"",nickname:(t==null?void 0:t.nickname)??"",middlename:(t==null?void 0:t.middlename)??""}),Ot=t=>({id:(t==null?void 0:t.id)??"",vat_id:(t==null?void 0:t.vat_id)??"",postcode:(t==null?void 0:t.postcode)??"",country_code:(t==null?void 0:t.country_code)??"",uid:(t==null?void 0:t.uid)??""}),Nt=t=>({company:(t==null?void 0:t.company)??"",telephone:(t==null?void 0:t.telephone)??"",fax:(t==null?void 0:t.fax)??""}),z=t=>{var o,e,a;const n=t==null?void 0:t.address_type;return I({...Rt(t),...Ot(t),...Nt(t),...n?{address_type:n}:{},city:(t==null?void 0:t.city)??"",region:{region:((o=t==null?void 0:t.region)==null?void 0:o.region)??"",region_code:((e=t==null?void 0:t.region)==null?void 0:e.region_code)??"",region_id:((a=t==null?void 0:t.region)==null?void 0:a.region_id)??""},default_shipping:(t==null?void 0:t.default_shipping)||!1,default_billing:(t==null?void 0:t.default_billing)||!1,...bt(t)},"camelCase",{})},Mt=t=>{var o,e;const n=((e=(o=t==null?void 0:t.data)==null?void 0:o.customer)==null?void 0:e.addresses)||[];return n.length?n.map(z).sort((a,c)=>(Number(c.defaultBilling)||Number(c.defaultShipping))-(Number(a.defaultBilling)||Number(a.defaultShipping))):[]},It=t=>{var o,e,a,c,s,i,_,m,h,E,A,C,b,R,D,P,w,G,U,v,x,$,k,F,B,O,L;const n=(a=(e=(o=t==null?void 0:t.data)==null?void 0:o.customer)==null?void 0:e.custom_attributes)==null?void 0:a.filter(p=>p).reduce((p,y)=>{var u;const q=W(y.code);return(u=y.selected_options)!=null&&u.length?p[q]=y.selected_options[0].value??"":p[q]=y.value??"",p},{}),r={email:((s=(c=t==null?void 0:t.data)==null?void 0:c.customer)==null?void 0:s.email)||"",firstName:((_=(i=t==null?void 0:t.data)==null?void 0:i.customer)==null?void 0:_.firstname)||"",lastName:((h=(m=t==null?void 0:t.data)==null?void 0:m.customer)==null?void 0:h.lastname)||"",middleName:((A=(E=t==null?void 0:t.data)==null?void 0:E.customer)==null?void 0:A.middlename)||"",gender:((b=(C=t==null?void 0:t.data)==null?void 0:C.customer)==null?void 0:b.gender)||"1",dateOfBirth:((D=(R=t==null?void 0:t.data)==null?void 0:R.customer)==null?void 0:D.date_of_birth)||"",prefix:((w=(P=t==null?void 0:t.data)==null?void 0:P.customer)==null?void 0:w.prefix)||"",suffix:((U=(G=t==null?void 0:t.data)==null?void 0:G.customer)==null?void 0:U.suffix)||"",createdAt:((x=(v=t==null?void 0:t.data)==null?void 0:v.customer)==null?void 0:x.created_at)||"",allowRemoteShoppingAssistance:(k=($=t==null?void 0:t.data)==null?void 0:$.customer)==null?void 0:k.allow_remote_shopping_assistance,...n};return at(r,(L=(O=(B=(F=M==null?void 0:M.getConfig())==null?void 0:F.models)==null?void 0:B.CustomerDataModelShort)==null?void 0:O.transformer)==null?void 0:L.call(O,t.data))},Dt=t=>{var c,s;if(!((s=(c=t==null?void 0:t.data)==null?void 0:c.countries)!=null&&s.length))return{availableCountries:[],countriesWithRequiredRegion:[],optionalZipCountries:[]};const{countries:n,storeConfig:r}=t.data,o=r==null?void 0:r.countries_with_required_region.split(","),e=r==null?void 0:r.optional_zip_countries.split(",");return{availableCountries:n.filter(({two_letter_abbreviation:i,full_name_locale:_})=>!!(i&&_)).map(i=>{const{two_letter_abbreviation:_,full_name_locale:m,available_regions:h}=i,E=Array.isArray(h)&&h.length>0;return{value:_,text:m,availableRegions:E?h:void 0}}).sort((i,_)=>i.text.localeCompare(_.text)),countriesWithRequiredRegion:o,optionalZipCountries:e}},Pt=t=>{var o,e;const n=(e=(o=t==null?void 0:t.data)==null?void 0:o.country)==null?void 0:e.available_regions;return n?n.filter(a=>{if(!a)return!1;const{id:c,code:s,name:i}=a;return!!(c&&s&&i)}).map(a=>{const{id:c}=a;return{id:c,text:a.name,value:`${a.code},${a.id}`}}):[]},wt=(t,n="en-US",r={})=>{const o={day:"2-digit",month:"2-digit",year:"numeric"},e=/^\d{4}-\d{2}-\d{2}$/.test(t.trim()),a={...o,...e?{timeZone:"UTC"}:{},...r},c=new Date(t.trim());return isNaN(c.getTime())?"Invalid Date":new Intl.DateTimeFormat(n,a).format(c)},Gt=(t,n="en-US",r={})=>{const e={...{hour:"2-digit",minute:"2-digit"},...r},a=new Date(t);return isNaN(a.getTime())?"Invalid Time":new Intl.DateTimeFormat(n,e).format(a)},T={value:0,currency:"USD"},Ut=t=>{var n,r,o,e,a,c,s,i,_,m;return{subtotal:((n=t==null?void 0:t.total)==null?void 0:n.subtotal)??T,grandTotal:((r=t==null?void 0:t.total)==null?void 0:r.grand_total)??T,grandTotalExclTax:((o=t==null?void 0:t.total)==null?void 0:o.grand_total_excl_tax)??T,totalGiftcard:((e=t==null?void 0:t.total)==null?void 0:e.total_giftcard)??T,subtotalExclTax:((a=t==null?void 0:t.total)==null?void 0:a.subtotal_excl_tax)??T,subtotalInclTax:((c=t==null?void 0:t.total)==null?void 0:c.subtotal_incl_tax)??T,taxes:((s=t==null?void 0:t.total)==null?void 0:s.taxes)??[],totalTax:((i=t==null?void 0:t.total)==null?void 0:i.total_tax)??T,totalShipping:((_=t==null?void 0:t.total)==null?void 0:_.total_shipping)??T,discounts:((m=t==null?void 0:t.total)==null?void 0:m.discounts)??[]}},vt=t=>{var e,a,c,s,i,_,m,h,E,A,C,b,R,D,P,w,G,U,v,x,$,k,F,B,O,L,p,y,q;if(!((a=(e=t.data)==null?void 0:e.customer)!=null&&a.orders))return null;const n=((s=(c=t==null?void 0:t.data)==null?void 0:c.customer)==null?void 0:s.returns)??[],o={items:(((m=(_=(i=t==null?void 0:t.data)==null?void 0:i.customer)==null?void 0:_.orders)==null?void 0:m.items)??[]).map(u=>{var j;return{adminAssistedOrder:(u==null?void 0:u.admin_assisted_order)??null,items:u==null?void 0:u.items.map(l=>{var Q,X,Z;return{status:(l==null?void 0:l.status)??"",productName:(l==null?void 0:l.product_name)??"",id:l==null?void 0:l.id,quantityOrdered:(l==null?void 0:l.quantity_ordered)??0,quantityShipped:(l==null?void 0:l.quantity_shipped)??0,quantityInvoiced:(l==null?void 0:l.quantity_invoiced)??0,sku:(l==null?void 0:l.product_sku)??"",urlKey:(l==null?void 0:l.product_url_key)??"",topLevelSku:((Q=l==null?void 0:l.product)==null?void 0:Q.sku)??"",product:{smallImage:{url:((Z=(X=l==null?void 0:l.product)==null?void 0:X.small_image)==null?void 0:Z.url)??""}}}}),token:u==null?void 0:u.token,email:u==null?void 0:u.email,shippingMethod:u==null?void 0:u.shipping_method,paymentMethods:(u==null?void 0:u.payment_methods)??[],shipments:(u==null?void 0:u.shipments)??[],id:u==null?void 0:u.id,carrier:u==null?void 0:u.carrier,status:u==null?void 0:u.status,number:u==null?void 0:u.number,returns:(j=n==null?void 0:n.items)==null?void 0:j.filter(l=>l.order.id===u.id),orderDate:wt(u.order_date),orderTime:Gt(u.order_date),shippingAddress:z(u.shipping_address),billingAddress:z(u.billing_address),total:Ut(u)}}),pageInfo:{pageSize:((C=(A=(E=(h=t==null?void 0:t.data)==null?void 0:h.customer)==null?void 0:E.orders)==null?void 0:A.page_info)==null?void 0:C.page_size)??10,totalPages:((P=(D=(R=(b=t==null?void 0:t.data)==null?void 0:b.customer)==null?void 0:R.orders)==null?void 0:D.page_info)==null?void 0:P.total_pages)??1,currentPage:((v=(U=(G=(w=t==null?void 0:t.data)==null?void 0:w.customer)==null?void 0:G.orders)==null?void 0:U.page_info)==null?void 0:v.current_page)??1},totalCount:((k=($=(x=t==null?void 0:t.data)==null?void 0:x.customer)==null?void 0:$.orders)==null?void 0:k.total_count)??0,dateOfFirstOrder:((O=(B=(F=t==null?void 0:t.data)==null?void 0:F.customer)==null?void 0:B.orders)==null?void 0:O.date_of_first_order)??""};return at(o,(q=(y=(p=(L=M==null?void 0:M.getConfig())==null?void 0:L.models)==null?void 0:p.OrderHistoryModel)==null?void 0:y.transformer)==null?void 0:q.call(y,t.data))},xt=t=>{var n,r,o,e,a,c,s,i,_,m,h,E,A,C;return{baseMediaUrl:(r=(n=t==null?void 0:t.data)==null?void 0:n.storeConfig)==null?void 0:r.base_media_url,minLength:+((e=(o=t==null?void 0:t.data)==null?void 0:o.storeConfig)==null?void 0:e.minimum_password_length)||3,requiredCharacterClasses:+((c=(a=t==null?void 0:t.data)==null?void 0:a.storeConfig)==null?void 0:c.required_character_classes_number)||0,storeCode:((i=(s=t==null?void 0:t.data)==null?void 0:s.storeConfig)==null?void 0:i.store_code)??"",shoppingAssistanceEnabled:((m=(_=t==null?void 0:t.data)==null?void 0:_.storeConfig)==null?void 0:m.shopping_assistance_enabled)??!1,shoppingAssistanceCheckboxTitle:((E=(h=t==null?void 0:t.data)==null?void 0:h.storeConfig)==null?void 0:E.shopping_assistance_checkbox_title)||"",shoppingAssistanceCheckboxTooltip:((C=(A=t==null?void 0:t.data)==null?void 0:A.storeConfig)==null?void 0:C.shopping_assistance_checkbox_tooltip)||""}},Vr=t=>({firstName:t.firstName,lastName:t.lastName,emailAddress:(t==null?void 0:t.email)||"",accountId:(t==null?void 0:t.email)||""}),$t={VI:"Visa",MC:"Mastercard",MD:"Maestro",AE:"American Express",DI:"Discover",DN:"Diners",JCB:"JCB",UN:"UnionPay",VISA:"Visa",MASTERCARD:"Mastercard",MAESTRO:"Maestro",AMEX:"American Express",AMERICAN_EXPRESS:"American Express",DISCOVER:"Discover",DINERS:"Diners",DINERS_CLUB:"Diners",UNIONPAY:"UnionPay"};function kt(t){try{return JSON.parse(t)}catch{return null}}function ct(t){return t.trim().toUpperCase().replaceAll(/\s+/g,"_")}function tt(t){return!(t!=null&&t.trim())||ct(t)==="UNKNOWN"}function rt(t){if(t!=null&&t.trim())return $t[ct(t)]}function Ft(t){return t.replaceAll("_"," ").toLowerCase().split(/\s+/).filter(Boolean).map(n=>n.charAt(0).toUpperCase()+n.slice(1)).join(" ")}function Bt(t,n){var e,a;const r=(e=t==null?void 0:t.brand)==null?void 0:e.trim(),o=(a=t==null?void 0:t.type)==null?void 0:a.trim();if(!tt(r)){const c=rt(r);return c||Ft(r)}if(!tt(o)){const c=rt(o);return c||o}return n.payment_method_code}function Lt(t){if(!t)return!1;const n=/^(\d{1,2})\/(\d{4})$/.exec(t.trim());if(!n)return!1;const r=Number.parseInt(n[1],10),o=Number.parseInt(n[2],10);if(r<1||r>12)return!1;const e=new Date(o,r,0,23,59,59,999);return Date.now()>e.getTime()}function qt(t,n){return n.some(r=>t.payment_method_code===r||t.payment_method_code.startsWith(`${r}_`))}function Yt(t,n){var o;const r=e=>{if(!e)return"";const a=e.replaceAll(/\D/g,"");return a.length>=4?a.slice(-4):""};if(t){const e=r(t.maskedCC)||r(t.lastFour)||r(t.last_four)||r(t.ccLast4)||r(t.cc_last4);if(e)return e}return((o=n.match(/\d{4}/g))==null?void 0:o.at(-1))??""}function zt(t){const n=t.replaceAll(/[^a-zA-Z0-9]/g,"");return n.length>=4?n.slice(-4).toUpperCase():n.padEnd(4,"0").slice(0,4).toUpperCase()}function Vt(t){if(!t.public_hash)return null;const n=kt(t.details),r=Bt(n,t),o=Yt(n,t.details)||zt(t.public_hash);return{publicHash:t.public_hash,cardBrand:r,lastFourDigits:o,expired:Lt(n==null?void 0:n.expirationDate)}}function Ht(t,n){return(n!=null&&n.length?t.filter(o=>qt(o,n)):t).map(o=>Vt(o)).filter(o=>o!==null)}function Kt(t){var r,o,e,a,c,s;const n=(o=(r=t==null?void 0:t.data)==null?void 0:r.customer)==null?void 0:o.admin_assistance_actions;return n?{totalCount:n.total_count||0,items:((e=n.items)==null?void 0:e.map(i=>({action:i.action||"",date:i.date||"",details:i.details||""})))||[],pageInfo:{currentPage:((a=n.page_info)==null?void 0:a.current_page)||1,pageSize:((c=n.page_info)==null?void 0:c.page_size)||10,totalPages:((s=n.page_info)==null?void 0:s.total_pages)||1}}:null}const Wt=t=>"address_type"in t||"company_id"in t,Jt=t=>[...t.custom_attributes??[],...t.extension_attributes??[]].filter(r=>!!(r!=null&&r.code||r!=null&&r.attribute_code)).map(r=>({code:r.code||r.attribute_code||"",value:r.value==null?"":String(r.value)})),jt=t=>{var n,r,o;return{address_type:t.address_type??"SHIPPING",firstname:t.firstname??"",lastname:t.lastname??"",nickname:t.nickname??"",middlename:t.middlename??"",prefix:t.prefix??"",suffix:t.suffix??"",city:t.city??"",company:t.company??"",country_code:t.country_code??"",region:{region:((n=t.region)==null?void 0:n.region)??"",region_code:((r=t.region)==null?void 0:r.region_code)??"",region_id:((o=t.region)==null?void 0:o.region_id)??t.region_id??""},telephone:t.telephone??"",id:t.id??"",vat_id:t.vat_id??"",postcode:t.postcode??"",street:t.street??[],default_shipping:t.address_type==="SHIPPING"?t.is_default??!1:!1,default_billing:t.address_type==="BILLING"?t.is_default??!1:!1,custom_attributesV2:Jt(t),fax:t.fax??"",uid:t.uid??""}},H=t=>{if(!t)return{};const n=Wt(t)?jt(t):t;return z(n)},ut=t=>{var n,r;return{addressBookEnabled:((n=t==null?void 0:t.config)==null?void 0:n.address_book_enabled)??(t==null?void 0:t.address_book_enabled)??!1,addressBookCustomShippingAddressEnabled:((r=t==null?void 0:t.config)==null?void 0:r.address_book_custom_shipping_address_enabled)??(t==null?void 0:t.address_book_custom_shipping_address_enabled)??!1}},Qt=t=>{var c,s,i,_,m,h;const n=(c=t==null?void 0:t.data)==null?void 0:c.company,r=n==null?void 0:n.addresses,o=(s=n==null?void 0:n.default_shipping_address)==null?void 0:s.id,e=(i=n==null?void 0:n.default_billing_address)==null?void 0:i.id,a=((r==null?void 0:r.items)??[]).map(E=>{const A=H(E),C=A.id?String(A.id):"",b=o?C===String(o):A.defaultShipping,R=e?C===String(e):A.defaultBilling;return{...A,defaultShipping:!!b,defaultBilling:!!R}});return a.sort((E,A)=>(Number(A.defaultBilling)||Number(A.defaultShipping))-(Number(E.defaultBilling)||Number(E.defaultShipping))),{...ut(n),addresses:{items:a,pageInfo:{currentPage:((_=r==null?void 0:r.page_info)==null?void 0:_.current_page)??1,pageSize:((m=r==null?void 0:r.page_info)==null?void 0:m.page_size)??a.length,totalPages:((h=r==null?void 0:r.page_info)==null?void 0:h.total_pages)??1},totalCount:(r==null?void 0:r.total_count)??a.length}}},Hr=async t=>{const n=`_account_attributesForm_${t}`,r=sessionStorage.getItem(n);return r?JSON.parse(r):await d(t!=="shortRequest"?At:Et,{method:"GET",cache:"force-cache",variables:{formCode:t}}).then(o=>{var a;if((a=o.errors)!=null&&a.length)return g(o.errors);const e=Tt(o);return sessionStorage.setItem(n,JSON.stringify(e)),e}).catch(f)},Xt=`
=======
`,g=t=>{throw t instanceof DOMException&&t.name==="AbortError"||tt.emit("error",{source:"auth",type:"network",error:t}),t},h=t=>{const r=t.map(a=>a.message).join(" ");throw Error(r)},B=t=>t.replace(/_([a-z])/g,(r,a)=>a.toUpperCase()),lt=t=>t.replace(/([A-Z])/g,r=>`_${r.toLowerCase()}`),O=(t,r,a)=>{const o=["string","boolean","number"],n=r==="camelCase"?B:lt;return Array.isArray(t)?t.map(c=>o.includes(typeof c)||c===null?c:typeof c=="object"?O(c,r,a):c):t!==null&&typeof t=="object"?Object.entries(t).reduce((c,[u,l])=>{const i=a&&a[u]?a[u]:n(u);return c[i]=o.includes(typeof l)||l===null?l:O(l,r,a),c},{}):t},_t=t=>{const r=[];for(const a of t)if(!(a.frontend_input!=="MULTILINE"||a.multiline_count<2))for(let o=2;o<=a.multiline_count;o++){const n={...a,is_required:!1,name:`${a.code}_multiline_${o}`,code:`${a.code}_multiline_${o}`,id:`${a.code}_multiline_${o}`};r.push(n)}return r},st=t=>{switch(t){case"middlename":return"middleName";case"firstname":return"firstName";case"lastname":return"lastName";default:return B(t)}},ft=t=>{var r;return t!=null&&t.options?(r=t==null?void 0:t.options)==null?void 0:r.map(a=>({isDefault:(a==null?void 0:a.is_default)??!1,text:(a==null?void 0:a.label)??"",value:(a==null?void 0:a.value)??""})):[]},dt=t=>{var c,u,l;const r=((u=(c=t==null?void 0:t.data)==null?void 0:c.attributesForm)==null?void 0:u.items)||[];if(!r.length)return[];const a=(l=r.filter(i=>{var s;return!((s=i.frontend_input)!=null&&s.includes("HIDDEN"))}))==null?void 0:l.map(({code:i,...s})=>{const f=i!=="country_id"?i:"country_code";return{...s,name:f,id:f,code:f}}),o=_t(a);return a.concat(o).map(i=>({code:i==null?void 0:i.code,name:i==null?void 0:i.name,id:i==null?void 0:i.id,label:(i==null?void 0:i.label)??"",entityType:i==null?void 0:i.entity_type,className:(i==null?void 0:i.frontend_class)??"",defaultValue:(i==null?void 0:i.default_value)??"",fieldType:i==null?void 0:i.frontend_input,multilineCount:(i==null?void 0:i.multiline_count)??0,orderNumber:Number(i==null?void 0:i.sort_order)||0,isHidden:!1,isUnique:(i==null?void 0:i.is_unique)??!1,required:(i==null?void 0:i.is_required)??!1,validateRules:(i==null?void 0:i.validate_rules)??[],options:ft(i),customUpperCode:st(i==null?void 0:i.code)})).sort((i,s)=>Number(i.orderNumber)-Number(s.orderNumber))},gt=t=>{const r={};for(const a in t){const o=t[a];!Array.isArray(o)||o.length===0||(a==="custom_attributesV2"?o.forEach(n=>{typeof n=="object"&&"value"in n&&(r[n==null?void 0:n.code]=n==null?void 0:n.value)}):o.length>1?o.forEach((n,c)=>{c===0?r[a]=n:r[`${a}_multiline_${c+1}`]=n}):r[a]=o[0])}return r},ht=t=>({prefix:(t==null?void 0:t.prefix)??"",suffix:(t==null?void 0:t.suffix)??"",firstname:(t==null?void 0:t.firstname)??"",lastname:(t==null?void 0:t.lastname)??"",middlename:(t==null?void 0:t.middlename)??""}),Et=t=>({id:(t==null?void 0:t.id)??"",vat_id:(t==null?void 0:t.vat_id)??"",postcode:(t==null?void 0:t.postcode)??"",country_code:(t==null?void 0:t.country_code)??"",uid:(t==null?void 0:t.uid)??""}),mt=t=>({company:(t==null?void 0:t.company)??"",telephone:(t==null?void 0:t.telephone)??"",fax:(t==null?void 0:t.fax)??""}),L=t=>{var a,o,n;return O({...ht(t),...Et(t),...mt(t),city:(t==null?void 0:t.city)??"",region:{region:((a=t==null?void 0:t.region)==null?void 0:a.region)??"",region_code:((o=t==null?void 0:t.region)==null?void 0:o.region_code)??"",region_id:((n=t==null?void 0:t.region)==null?void 0:n.region_id)??""},default_shipping:(t==null?void 0:t.default_shipping)||!1,default_billing:(t==null?void 0:t.default_billing)||!1,...gt(t)},"camelCase",{})},St=t=>{var o,n;const r=((n=(o=t==null?void 0:t.data)==null?void 0:o.customer)==null?void 0:n.addresses)||[];return r.length?r.map(L).sort((c,u)=>(Number(u.defaultBilling)||Number(u.defaultShipping))-(Number(c.defaultBilling)||Number(c.defaultShipping))):[]},Tt=t=>{var o,n,c,u,l,i,s,f,E,m,T,C,N,I,M,w,U,p,$,v,x,G,D,P,F,R,k;const r=(c=(n=(o=t==null?void 0:t.data)==null?void 0:o.customer)==null?void 0:n.custom_attributes)==null?void 0:c.filter(A=>A).reduce((A,S)=>{var e;const q=B(S.code);return(e=S.selected_options)!=null&&e.length?A[q]=S.selected_options[0].value??"":A[q]=S.value??"",A},{}),a={email:((l=(u=t==null?void 0:t.data)==null?void 0:u.customer)==null?void 0:l.email)||"",firstName:((s=(i=t==null?void 0:t.data)==null?void 0:i.customer)==null?void 0:s.firstname)||"",lastName:((E=(f=t==null?void 0:t.data)==null?void 0:f.customer)==null?void 0:E.lastname)||"",middleName:((T=(m=t==null?void 0:t.data)==null?void 0:m.customer)==null?void 0:T.middlename)||"",gender:((N=(C=t==null?void 0:t.data)==null?void 0:C.customer)==null?void 0:N.gender)||"1",dateOfBirth:((M=(I=t==null?void 0:t.data)==null?void 0:I.customer)==null?void 0:M.date_of_birth)||"",prefix:((U=(w=t==null?void 0:t.data)==null?void 0:w.customer)==null?void 0:U.prefix)||"",suffix:(($=(p=t==null?void 0:t.data)==null?void 0:p.customer)==null?void 0:$.suffix)||"",createdAt:((x=(v=t==null?void 0:t.data)==null?void 0:v.customer)==null?void 0:x.created_at)||"",allowRemoteShoppingAssistance:(D=(G=t==null?void 0:t.data)==null?void 0:G.customer)==null?void 0:D.allow_remote_shopping_assistance,...r};return W(a,(k=(R=(F=(P=y==null?void 0:y.getConfig())==null?void 0:P.models)==null?void 0:F.CustomerDataModelShort)==null?void 0:R.transformer)==null?void 0:k.call(R,t.data))},Ct=t=>{var u,l;if(!((l=(u=t==null?void 0:t.data)==null?void 0:u.countries)!=null&&l.length))return{availableCountries:[],countriesWithRequiredRegion:[],optionalZipCountries:[]};const{countries:r,storeConfig:a}=t.data,o=a==null?void 0:a.countries_with_required_region.split(","),n=a==null?void 0:a.optional_zip_countries.split(",");return{availableCountries:r.filter(({two_letter_abbreviation:i,full_name_locale:s})=>!!(i&&s)).map(i=>{const{two_letter_abbreviation:s,full_name_locale:f,available_regions:E}=i,m=Array.isArray(E)&&E.length>0;return{value:s,text:f,availableRegions:m?E:void 0}}).sort((i,s)=>i.text.localeCompare(s.text)),countriesWithRequiredRegion:o,optionalZipCountries:n}},At=t=>{var o,n;const r=(n=(o=t==null?void 0:t.data)==null?void 0:o.country)==null?void 0:n.available_regions;return r?r.filter(c=>{if(!c)return!1;const{id:u,code:l,name:i}=c;return!!(u&&l&&i)}).map(c=>{const{id:u}=c;return{id:u,text:c.name,value:`${c.code},${c.id}`}}):[]},bt=(t,r="en-US",a={})=>{const o={day:"2-digit",month:"2-digit",year:"numeric"},n=/^\d{4}-\d{2}-\d{2}$/.test(t.trim()),c={...o,...n?{timeZone:"UTC"}:{},...a},u=new Date(t.trim());return isNaN(u.getTime())?"Invalid Date":new Intl.DateTimeFormat(r,c).format(u)},Rt=(t,r="en-US",a={})=>{const n={...{hour:"2-digit",minute:"2-digit"},...a},c=new Date(t);return isNaN(c.getTime())?"Invalid Time":new Intl.DateTimeFormat(r,n).format(c)},b={value:0,currency:"USD"},yt=t=>{var r,a,o,n,c,u,l,i,s,f;return{subtotal:((r=t==null?void 0:t.total)==null?void 0:r.subtotal)??b,grandTotal:((a=t==null?void 0:t.total)==null?void 0:a.grand_total)??b,grandTotalExclTax:((o=t==null?void 0:t.total)==null?void 0:o.grand_total_excl_tax)??b,totalGiftcard:((n=t==null?void 0:t.total)==null?void 0:n.total_giftcard)??b,subtotalExclTax:((c=t==null?void 0:t.total)==null?void 0:c.subtotal_excl_tax)??b,subtotalInclTax:((u=t==null?void 0:t.total)==null?void 0:u.subtotal_incl_tax)??b,taxes:((l=t==null?void 0:t.total)==null?void 0:l.taxes)??[],totalTax:((i=t==null?void 0:t.total)==null?void 0:i.total_tax)??b,totalShipping:((s=t==null?void 0:t.total)==null?void 0:s.total_shipping)??b,discounts:((f=t==null?void 0:t.total)==null?void 0:f.discounts)??[]}},Ot=t=>{var n,c,u,l,i,s,f,E,m,T,C,N,I,M,w,U,p,$,v,x,G,D,P,F,R,k,A,S,q;if(!((c=(n=t.data)==null?void 0:n.customer)!=null&&c.orders))return null;const r=((l=(u=t==null?void 0:t.data)==null?void 0:u.customer)==null?void 0:l.returns)??[],o={items:(((f=(s=(i=t==null?void 0:t.data)==null?void 0:i.customer)==null?void 0:s.orders)==null?void 0:f.items)??[]).map(e=>{var z;return{adminAssistedOrder:(e==null?void 0:e.admin_assisted_order)??null,items:e==null?void 0:e.items.map(_=>{var H,V,J;return{status:(_==null?void 0:_.status)??"",productName:(_==null?void 0:_.product_name)??"",id:_==null?void 0:_.id,quantityOrdered:(_==null?void 0:_.quantity_ordered)??0,quantityShipped:(_==null?void 0:_.quantity_shipped)??0,quantityInvoiced:(_==null?void 0:_.quantity_invoiced)??0,sku:(_==null?void 0:_.product_sku)??"",urlKey:(_==null?void 0:_.product_url_key)??"",topLevelSku:((H=_==null?void 0:_.product)==null?void 0:H.sku)??"",product:{smallImage:{url:((J=(V=_==null?void 0:_.product)==null?void 0:V.small_image)==null?void 0:J.url)??""}}}}),token:e==null?void 0:e.token,email:e==null?void 0:e.email,shippingMethod:e==null?void 0:e.shipping_method,paymentMethods:(e==null?void 0:e.payment_methods)??[],shipments:(e==null?void 0:e.shipments)??[],id:e==null?void 0:e.id,carrier:e==null?void 0:e.carrier,status:e==null?void 0:e.status,number:e==null?void 0:e.number,returns:(z=r==null?void 0:r.items)==null?void 0:z.filter(_=>_.order.id===e.id),orderDate:bt(e.order_date),orderTime:Rt(e.order_date),shippingAddress:L(e.shipping_address),billingAddress:L(e.billing_address),total:yt(e)}}),pageInfo:{pageSize:((C=(T=(m=(E=t==null?void 0:t.data)==null?void 0:E.customer)==null?void 0:m.orders)==null?void 0:T.page_info)==null?void 0:C.page_size)??10,totalPages:((w=(M=(I=(N=t==null?void 0:t.data)==null?void 0:N.customer)==null?void 0:I.orders)==null?void 0:M.page_info)==null?void 0:w.total_pages)??1,currentPage:((v=($=(p=(U=t==null?void 0:t.data)==null?void 0:U.customer)==null?void 0:p.orders)==null?void 0:$.page_info)==null?void 0:v.current_page)??1},totalCount:((D=(G=(x=t==null?void 0:t.data)==null?void 0:x.customer)==null?void 0:G.orders)==null?void 0:D.total_count)??0,dateOfFirstOrder:((R=(F=(P=t==null?void 0:t.data)==null?void 0:P.customer)==null?void 0:F.orders)==null?void 0:R.date_of_first_order)??""};return W(o,(q=(S=(A=(k=y==null?void 0:y.getConfig())==null?void 0:k.models)==null?void 0:A.OrderHistoryModel)==null?void 0:S.transformer)==null?void 0:q.call(S,t.data))},Nt=t=>{var r,a,o,n,c,u,l,i,s,f,E,m,T,C;return{baseMediaUrl:(a=(r=t==null?void 0:t.data)==null?void 0:r.storeConfig)==null?void 0:a.base_media_url,minLength:+((n=(o=t==null?void 0:t.data)==null?void 0:o.storeConfig)==null?void 0:n.minimum_password_length)||3,requiredCharacterClasses:+((u=(c=t==null?void 0:t.data)==null?void 0:c.storeConfig)==null?void 0:u.required_character_classes_number)||0,storeCode:((i=(l=t==null?void 0:t.data)==null?void 0:l.storeConfig)==null?void 0:i.store_code)??"",shoppingAssistanceEnabled:((f=(s=t==null?void 0:t.data)==null?void 0:s.storeConfig)==null?void 0:f.shopping_assistance_enabled)??!1,shoppingAssistanceCheckboxTitle:((m=(E=t==null?void 0:t.data)==null?void 0:E.storeConfig)==null?void 0:m.shopping_assistance_checkbox_title)||"",shoppingAssistanceCheckboxTooltip:((C=(T=t==null?void 0:t.data)==null?void 0:T.storeConfig)==null?void 0:C.shopping_assistance_checkbox_tooltip)||""}},lr=t=>({firstName:t.firstName,lastName:t.lastName,emailAddress:(t==null?void 0:t.email)||"",accountId:(t==null?void 0:t.email)||""}),It={VI:"Visa",MC:"Mastercard",MD:"Maestro",AE:"American Express",DI:"Discover",DN:"Diners",JCB:"JCB",UN:"UnionPay",VISA:"Visa",MASTERCARD:"Mastercard",MAESTRO:"Maestro",AMEX:"American Express",AMERICAN_EXPRESS:"American Express",DISCOVER:"Discover",DINERS:"Diners",DINERS_CLUB:"Diners",UNIONPAY:"UnionPay"};function Mt(t){try{return JSON.parse(t)}catch{return null}}function X(t){return t.trim().toUpperCase().replaceAll(/\s+/g,"_")}function K(t){return!(t!=null&&t.trim())||X(t)==="UNKNOWN"}function j(t){if(t!=null&&t.trim())return It[X(t)]}function wt(t){return t.replaceAll("_"," ").toLowerCase().split(/\s+/).filter(Boolean).map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join(" ")}function Ut(t,r){var n,c;const a=(n=t==null?void 0:t.brand)==null?void 0:n.trim(),o=(c=t==null?void 0:t.type)==null?void 0:c.trim();if(!K(a)){const u=j(a);return u||wt(a)}if(!K(o)){const u=j(o);return u||o}return r.payment_method_code}function pt(t){if(!t)return!1;const r=/^(\d{1,2})\/(\d{4})$/.exec(t.trim());if(!r)return!1;const a=Number.parseInt(r[1],10),o=Number.parseInt(r[2],10);if(a<1||a>12)return!1;const n=new Date(o,a,0,23,59,59,999);return Date.now()>n.getTime()}function $t(t,r){return r.some(a=>t.payment_method_code===a||t.payment_method_code.startsWith(`${a}_`))}function vt(t,r){var o;const a=n=>{if(!n)return"";const c=n.replaceAll(/\D/g,"");return c.length>=4?c.slice(-4):""};if(t){const n=a(t.maskedCC)||a(t.lastFour)||a(t.last_four)||a(t.ccLast4)||a(t.cc_last4);if(n)return n}return((o=r.match(/\d{4}/g))==null?void 0:o.at(-1))??""}function xt(t){const r=t.replaceAll(/[^a-zA-Z0-9]/g,"");return r.length>=4?r.slice(-4).toUpperCase():r.padEnd(4,"0").slice(0,4).toUpperCase()}function Gt(t){if(!t.public_hash)return null;const r=Mt(t.details),a=Ut(r,t),o=vt(r,t.details)||xt(t.public_hash);return{publicHash:t.public_hash,cardBrand:a,lastFourDigits:o,expired:pt(r==null?void 0:r.expirationDate)}}function Dt(t,r){return(r!=null&&r.length?t.filter(o=>$t(o,r)):t).map(o=>Gt(o)).filter(o=>o!==null)}function Pt(t){var a,o,n,c,u,l;const r=(o=(a=t==null?void 0:t.data)==null?void 0:a.customer)==null?void 0:o.admin_assistance_actions;return r?{totalCount:r.total_count||0,items:((n=r.items)==null?void 0:n.map(i=>({action:i.action||"",date:i.date||"",details:i.details||""})))||[],pageInfo:{currentPage:((c=r.page_info)==null?void 0:c.current_page)||1,pageSize:((u=r.page_info)==null?void 0:u.page_size)||10,totalPages:((l=r.page_info)==null?void 0:l.total_pages)||1}}:null}const _r=async t=>{const r=`_account_attributesForm_${t}`,a=sessionStorage.getItem(r);return a?JSON.parse(a):await d(t!=="shortRequest"?ut:et,{method:"GET",cache:"force-cache",variables:{formCode:t}}).then(o=>{var c;if((c=o.errors)!=null&&c.length)return h(o.errors);const n=dt(o);return sessionStorage.setItem(r,JSON.stringify(n)),n}).catch(g)},Ft=`
>>>>>>> 6c65641a7ae144e73bca95136eec963787cdac85
  mutation CREATE_CUSTOMER_ADDRESS($input: CustomerAddressInput!) {
    createCustomerAddress(input: $input) {
      firstname
      uid
    }
  }
<<<<<<< HEAD
`,Kr=async t=>await d(Xt,{method:"POST",variables:{input:I(t,"snakeCase",{custom_attributesV2:"custom_attributesV2",firstName:"firstname",lastName:"lastname",middleName:"middlename"})}}).then(n=>{var o,e;if((o=n.errors)!=null&&o.length)return g(n.errors);const r=(e=n==null?void 0:n.data)==null?void 0:e.createCustomerAddress;return{firstname:(r==null?void 0:r.firstname)??"",uid:(r==null?void 0:r.uid)??""}}).catch(f),Zt=`
  mutation CREATE_COMPANY_ADDRESS($input: CompanyAddressInput!) {
    createCompanyAddress(input: $input) {
      ...COMPANY_ADDRESS_FRAGMENT
    }
  }
  ${V}
`,K=t=>{if(Array.isArray(t))return t.reduce((n,r)=>(n.push(...K(r)),n),[]);if(typeof t=="string"){const n=t.trim();return n?[n]:[]}return[]},st=(t,n)=>{const r=t,o=[...K(r.street),...K(r.streetMultiline_2)],e=t.region?{region:t.region.region||"",region_code:t.region.regionCode||"",region_id:typeof t.region.regionId=="string"?Number(t.region.regionId):t.region.regionId}:void 0,a=t.addressTypeShipping&&!t.addressTypeBilling?"SHIPPING":t.addressTypeBilling&&!t.addressTypeShipping?"BILLING":void 0,c=t.addressType||a||(t.defaultBilling&&!t.defaultShipping?"BILLING":"SHIPPING"),i=typeof t.isDefault=="boolean"||typeof t.defaultShipping=="boolean"||typeof t.defaultBilling=="boolean"?typeof t.isDefault=="boolean"?t.isDefault:!!(t.defaultShipping||t.defaultBilling):n!=null&&n.preserveIsDefaultWhenUnset?void 0:!1;return{company:t.company||"",address_type:c,...typeof i=="boolean"?{is_default:i}:{},city:t.city||"",country_code:t.countryCode||"",region:e,street:o,telephone:t.telephone||"",postcode:t.postcode||"",firstname:t.firstName||"",middlename:t.middleName||"",lastname:t.lastName||"",nickname:t.nickname||"",prefix:t.prefix||"",suffix:t.suffix||"",fax:t.fax||"",vat_id:t.vatId||""}},Wr=async t=>{const n=st(t);return await d(Zt,{method:"POST",variables:{input:n}}).then(r=>{var o,e;return(o=r.errors)!=null&&o.length?g(r.errors):H((e=r==null?void 0:r.data)==null?void 0:e.createCompanyAddress)}).catch(f)},tr=`
  mutation UPDATE_COMPANY_ADDRESS($id: ID!, $input: CompanyAddressUpdateInput!) {
    updateCompanyAddress(id: $id, input: $input) {
      ...COMPANY_ADDRESS_FRAGMENT
    }
  }
  ${V}
`,Jr=async(t,n)=>{if(!t)return{};const o={...st(n,{preserveIsDefaultWhenUnset:!0})};return delete o.address_type,await d(tr,{method:"POST",variables:{id:t,input:o}}).then(e=>{var a,c;return(a=e.errors)!=null&&a.length?g(e.errors):H((c=e==null?void 0:e.data)==null?void 0:c.updateCompanyAddress)}).catch(f)},rr=`
  mutation DELETE_COMPANY_ADDRESS($id: ID!) {
    deleteCompanyAddress(id: $id)
  }
`,jr=async t=>await d(rr,{method:"POST",variables:{id:t}}).then(n=>{var r,o;return(r=n.errors)!=null&&r.length?g(n.errors):!!((o=n==null?void 0:n.data)!=null&&o.deleteCompanyAddress)}).catch(n=>(console.error("[Account][API][deleteCompanyAddress] network error",n),f(n))),nr=`
  mutation SET_DEFAULT_COMPANY_ADDRESS($id: ID!) {
    setDefaultCompanyAddress(id: $id) {
      ...COMPANY_ADDRESS_FRAGMENT
    }
  }
  ${V}
`,Qr=async t=>t?await d(nr,{method:"POST",variables:{id:t}}).then(n=>{var r,o;return(r=n.errors)!=null&&r.length?g(n.errors):H((o=n==null?void 0:n.data)==null?void 0:o.setDefaultCompanyAddress)}).catch(f):{},or=`
  query GET_COMPANY_ADDRESS_BOOK {
    company {
      config {
        address_book_enabled
        address_book_custom_shipping_address_enabled
        __typename
      }
      default_billing_address {
        ...COMPANY_ADDRESS_FRAGMENT
      }
      default_shipping_address {
        ...COMPANY_ADDRESS_FRAGMENT
      }
      addresses {
        items {
          ...COMPANY_ADDRESS_FRAGMENT
        }
        page_info {
          current_page
          page_size
          total_pages
        }
        total_count
      }
    }
  }
  ${V}
`,er=t=>{if(!t||!(t.message||"").toLowerCase().includes("the company address does not exist"))return!1;const o=(t.path||[]).join(".");return o==="company.default_shipping_address"||o==="company.default_billing_address"},Xr=async()=>{var r,o;const t=await d(or,{method:"GET",cache:"no-cache"}).catch(e=>f(e));return(r=t.errors)!=null&&r.length&&!(!!((o=t==null?void 0:t.data)!=null&&o.company)&&t.errors.every(a=>er(a)))?g(t.errors):Qt(t)},ar=`
  query GET_COMPANY_ADDRESS_BOOK_CONFIG {
    company {
      config {
        address_book_enabled
        address_book_custom_shipping_address_enabled
      }
    }
  }
`,nt={addressBookEnabled:!1,addressBookCustomShippingAddressEnabled:!1},Zr=async()=>{var t,n;try{const r=await d(ar,{method:"GET",cache:"no-cache"});return(t=r==null?void 0:r.errors)!=null&&t.length?nt:ut((n=r==null?void 0:r.data)==null?void 0:n.company)}catch{return nt}},Y={VIEW:"Magento_CompanyAddressStorefrontCompatibility::company_address",ADD:"Magento_CompanyAddressStorefrontCompatibility::add",EDIT:"Magento_CompanyAddressStorefrontCompatibility::edit",DELETE:"Magento_CompanyAddressStorefrontCompatibility::delete",SET_DEFAULT:"Magento_CompanyAddressStorefrontCompatibility::default"},ir=`
=======
`,sr=async t=>await d(Ft,{method:"POST",variables:{input:O(t,"snakeCase",{custom_attributesV2:"custom_attributesV2",firstName:"firstname",lastName:"lastname",middleName:"middlename"})}}).then(r=>{var o,n;if((o=r.errors)!=null&&o.length)return h(r.errors);const a=(n=r==null?void 0:r.data)==null?void 0:n.createCustomerAddress;return{firstname:(a==null?void 0:a.firstname)??"",uid:(a==null?void 0:a.uid)??""}}).catch(g),kt=`
>>>>>>> 6c65641a7ae144e73bca95136eec963787cdac85
  query GET_CUSTOMER_ADDRESS {
    customer {
      addresses {
        firstname
        lastname
        middlename
        fax
        prefix
        suffix
        city
        company
        country_code
        region {
          region
          region_code
          region_id
        }
        custom_attributesV2 {
          ... on AttributeValue {
            code
            value
          }
        }
        telephone
        id
        vat_id
        postcode
        street
        default_shipping
        default_billing
        uid
      }
    }
  }
<<<<<<< HEAD
`,tn=async()=>await d(ir,{method:"GET",cache:"no-cache"}).then(t=>{var n;return(n=t.errors)!=null&&n.length?g(t.errors):Mt(t)}).catch(f),cr=`
  query GET_CUSTOMER_COMPANY_CONTEXT {
    company {
      id
      name
    }
  }
`,rn=async()=>await d(cr,{method:"GET",cache:"no-cache"}).then(t=>{var n,r,o;return(n=t.errors)!=null&&n.length&&g(t.errors),!!((o=(r=t==null?void 0:t.data)==null?void 0:r.company)!=null&&o.id)}).catch(f),J={canAccessAddressBook:!1,canViewAddress:!1,canCreateAddress:!1,canEditAddress:!1,canDeleteAddress:!1,canSetDefaultAddress:!1},S=(t,n)=>n.some(r=>t.has(r)),N={view:Y.VIEW,add:Y.ADD,edit:Y.EDIT,delete:Y.DELETE,default:Y.SET_DEFAULT,setDefaultLegacy:"Magento_CompanyAddressStorefrontCompatibility::set_default"},ur=[N.default,N.setDefaultLegacy],sr=["Magento_Company::view_address","company_address_view"],lr=["company_address_edit","Magento_Company::edit_address"],_r=["company_address_add","Magento_Company::add_address","Magento_Company::edit_address"],dr=["company_address_delete","Magento_Company::delete_address","Magento_Company::edit_address"],fr=["company_address_set_default","Magento_Company::set_default_address","Magento_Company::edit_address"],gr=(t=[])=>{const n=new Set,r=[...t];for(;r.length;){const o=r.pop();o&&(typeof o.id=="string"&&n.add(o.id),Array.isArray(o.children)&&o.children.length&&r.push(...o.children))}return n},mr=t=>Array.from(t).some(n=>n.startsWith("Magento_CompanyAddressStorefrontCompatibility::")),hr=t=>S(t,["company_address_add","company_address_edit","company_address_delete","company_address_set_default"]),Ar=t=>t?t.id==="0"||t.id===0||t.id==="MA=="||t.name==="Company Administrator":!1,Er=()=>["Magento_Company::view_address","Magento_Company::edit_address","Magento_CompanyAddressStorefrontCompatibility::company_address","Magento_CompanyAddressStorefrontCompatibility::add","Magento_CompanyAddressStorefrontCompatibility::edit","Magento_CompanyAddressStorefrontCompatibility::delete","Magento_CompanyAddressStorefrontCompatibility::default","Magento_CompanyAddressStorefrontCompatibility::set_default","company_address_add","company_address_edit","company_address_delete","company_address_set_default"],Sr=t=>{if(!t)return J;const n=gr(t.permissions||[]),r=new Set(n);Ar(t)&&Er().forEach(h=>r.add(h));const o=mr(r),e=o?S(r,[N.view]):S(r,sr),a=hr(r),c=o?S(r,[N.edit]):a?S(r,["company_address_edit"]):S(r,lr),s=o?S(r,[N.add]):a?S(r,["company_address_add"]):S(r,_r),i=o?S(r,[N.delete]):a?S(r,["company_address_delete"]):S(r,dr),_=o?S(r,ur):a?S(r,["company_address_set_default"]):S(r,fr);return{canAccessAddressBook:e,canViewAddress:e,canCreateAddress:s,canEditAddress:c,canDeleteAddress:i,canSetDefaultAddress:_}},Cr=t=>{var r,o,e;if((r=t==null?void 0:t.errors)!=null&&r.length)return J;const n=((e=(o=t==null?void 0:t.data)==null?void 0:o.customer)==null?void 0:e.role)??null;return Sr(n)},nn=()=>J,yr=`
  query GET_CUSTOMER_ROLE_PERMISSIONS {
    customer {
      role {
        id
        name
        permissions {
          id
          text
          children {
            id
            text
            children {
              id
              text
              children {
                id
                text
                children {
                  id
                  text
                }
              }
            }
          }
        }
      }
      status
    }
  }
`,on=async()=>await d(yr,{method:"GET",cache:"no-cache"}).then(t=>Cr(t)).catch(f),pr=`
=======
`,fr=async()=>await d(kt,{method:"GET",cache:"no-cache"}).then(t=>{var r;return(r=t.errors)!=null&&r.length?h(t.errors):St(t)}).catch(g),qt=`
>>>>>>> 6c65641a7ae144e73bca95136eec963787cdac85
  query GET_COUNTRIES_QUERY {
    countries {
      two_letter_abbreviation
      full_name_locale
      available_regions {
        id
        code
        name
      }
    }
    storeConfig {
      countries_with_required_region
      optional_zip_countries
    }
  }
<<<<<<< HEAD
`,en=async()=>{const t="_account_countries",n=sessionStorage.getItem(t);return n?JSON.parse(n):await d(pr,{method:"GET",cache:"no-cache"}).then(r=>{var e;if((e=r.errors)!=null&&e.length)return g(r.errors);const o=Dt(r);return sessionStorage.setItem(t,JSON.stringify(o)),o}).catch(f)},Tr=`
=======
`,dr=async()=>{const t="_account_countries",r=sessionStorage.getItem(t);return r?JSON.parse(r):await d(qt,{method:"GET",cache:"no-cache"}).then(a=>{var n;if((n=a.errors)!=null&&n.length)return h(a.errors);const o=Ct(a);return sessionStorage.setItem(t,JSON.stringify(o)),o}).catch(g)},Lt=`
>>>>>>> 6c65641a7ae144e73bca95136eec963787cdac85
  query GET_REGIONS($countryCode: String!) {
    country(id: $countryCode) {
      id
      available_regions {
        id
        code
        name
      }
    }
  }
<<<<<<< HEAD
`,an=async t=>{const n=`_account_regions_${t}`,r=sessionStorage.getItem(n);return r?JSON.parse(r):await d(Tr,{method:"GET",cache:"no-cache",variables:{countryCode:t}}).then(o=>{var a;if((a=o.errors)!=null&&a.length)return g(o.errors);const e=Pt(o);return sessionStorage.setItem(n,JSON.stringify(e)),e}).catch(f)},br=`
=======
`,gr=async t=>{const r=`_account_regions_${t}`,a=sessionStorage.getItem(r);return a?JSON.parse(a):await d(Lt,{method:"GET",cache:"no-cache",variables:{countryCode:t}}).then(o=>{var c;if((c=o.errors)!=null&&c.length)return h(o.errors);const n=At(o);return sessionStorage.setItem(r,JSON.stringify(n)),n}).catch(g)},Bt=`
>>>>>>> 6c65641a7ae144e73bca95136eec963787cdac85
  mutation UPDATE_CUSTOMER_ADDRESS($id: Int!, $input: CustomerAddressInput) {
    updateCustomerAddress(id: $id, input: $input) {
      firstname
    }
  }
<<<<<<< HEAD
`,cn=async t=>{const{addressId:n,...r}=t;return n?await d(br,{method:"POST",variables:{id:Number(n),input:I(r,"snakeCase",{custom_attributesV2:"custom_attributesV2",firstName:"firstname",lastName:"lastname",middleName:"middlename"})}}).then(o=>{var e,a,c;return(e=o.errors)!=null&&e.length?g(o.errors):((c=(a=o==null?void 0:o.data)==null?void 0:a.updateCustomerAddress)==null?void 0:c.firstname)||""}).catch(f):""},Rr=`
=======
`,hr=async t=>{const{addressId:r,...a}=t;return r?await d(Bt,{method:"POST",variables:{id:Number(r),input:O(a,"snakeCase",{custom_attributesV2:"custom_attributesV2",firstName:"firstname",lastName:"lastname",middleName:"middlename"})}}).then(o=>{var n,c,u;return(n=o.errors)!=null&&n.length?h(o.errors):((u=(c=o==null?void 0:o.data)==null?void 0:c.updateCustomerAddress)==null?void 0:u.firstname)||""}).catch(g):""},zt=`
>>>>>>> 6c65641a7ae144e73bca95136eec963787cdac85
  query GET_CUSTOMER {
    customer {
      ...BASIC_CUSTOMER_INFO_FRAGMENT
      custom_attributes {
        ... on AttributeValue {
          code
          value
        }
        ... on AttributeSelectedOptions {
          code
          selected_options {
            value
          }
        }
        code
      }
    }
  }
<<<<<<< HEAD
  ${ft}
`,un=async()=>await d(Rr,{method:"GET",cache:"no-cache"}).then(t=>{var n;return(n=t.errors)!=null&&n.length?g(t.errors):It(t)}).catch(f),Or=`
=======
  ${ot}
`,Er=async()=>await d(zt,{method:"GET",cache:"no-cache"}).then(t=>{var r;return(r=t.errors)!=null&&r.length?h(t.errors):Tt(t)}).catch(g),Ht=`
>>>>>>> 6c65641a7ae144e73bca95136eec963787cdac85
  query GET_ADMIN_ASSISTANCE_ACTIONS($currentPage: Int, $pageSize: Int) {
    customer {
      admin_assistance_actions(
        pageSize: $pageSize
        currentPage: $currentPage
      ) {
        total_count
        items {
          action
          date
          details
        }
        page_info {
          current_page
          page_size
          total_pages
        }
      }
    }
  }
<<<<<<< HEAD
`,sn=async(t,n)=>await d(Or,{method:"GET",cache:"no-cache",variables:{pageSize:t,currentPage:n}}).then(r=>{var o;return(o=r.errors)!=null&&o.length?g(r.errors):Kt(r)}).catch(f),Nr=`
  mutation REMOVE_CUSTOMER_ADDRESS($id: Int!) {
    deleteCustomerAddress(id: $id)
  }
`,ln=async t=>await d(Nr,{method:"POST",variables:{id:t}}).then(n=>{var r;return(r=n.errors)!=null&&r.length?g(n.errors):n.data.deleteCustomerAddress}).catch(f),Mr=`
=======
`,mr=async(t,r)=>await d(Ht,{method:"GET",cache:"no-cache",variables:{pageSize:t,currentPage:r}}).then(a=>{var o;return(o=a.errors)!=null&&o.length?h(a.errors):Pt(a)}).catch(g),Vt=`
  mutation REMOVE_CUSTOMER_ADDRESS($id: Int!) {
    deleteCustomerAddress(id: $id)
  }
`,Sr=async t=>await d(Vt,{method:"POST",variables:{id:t}}).then(r=>{var a;return(a=r.errors)!=null&&a.length?h(r.errors):r.data.deleteCustomerAddress}).catch(g),Jt=`
>>>>>>> 6c65641a7ae144e73bca95136eec963787cdac85
  query getCustomerPaymentTokens {
    customerPaymentTokens {
      items {
        details
        public_hash
        payment_method_code
        type
      }
    }
  }
<<<<<<< HEAD
`,_n=async t=>await d(Mr,{method:"GET",cache:"no-cache"}).then(n=>{var o,e,a;if((o=n.errors)!=null&&o.length)return g(n.errors);const r=((a=(e=n.data)==null?void 0:e.customerPaymentTokens)==null?void 0:a.items)??[];return Ht(r,t)}).catch(f),Ir=`
=======
`,Tr=async t=>await d(Jt,{method:"GET",cache:"no-cache"}).then(r=>{var o,n,c;if((o=r.errors)!=null&&o.length)return h(r.errors);const a=((c=(n=r.data)==null?void 0:n.customerPaymentTokens)==null?void 0:c.items)??[];return Dt(a,t)}).catch(g),Kt=`
>>>>>>> 6c65641a7ae144e73bca95136eec963787cdac85
  mutation deletePaymentToken($public_hash: String!) {
    deletePaymentToken(public_hash: $public_hash) {
      result
    }
  }
<<<<<<< HEAD
`,dn=async t=>await d(Ir,{method:"POST",variables:{public_hash:t}}).then(n=>{var r,o,e;return(r=n.errors)!=null&&r.length?g(n.errors):!!((e=(o=n.data)==null?void 0:o.deletePaymentToken)!=null&&e.result)}).catch(f),Dr=`
=======
`,Cr=async t=>await d(Kt,{method:"POST",variables:{public_hash:t}}).then(r=>{var a,o,n;return(a=r.errors)!=null&&a.length?h(r.errors):!!((n=(o=r.data)==null?void 0:o.deletePaymentToken)!=null&&n.result)}).catch(g),jt=`
>>>>>>> 6c65641a7ae144e73bca95136eec963787cdac85
  query GET_CUSTOMER_ORDERS_LIST(
    $currentPage: Int
    $pageSize: Int
    $filter: CustomerOrdersFilterInput
    $sort: CustomerOrderSortInput
  ) {
    customer {
      returns {
        items {
          uid
          number
          order {
            id
          }
        }
      }
      orders(
        currentPage: $currentPage
        pageSize: $pageSize
        filter: $filter
        sort: $sort
      ) {
        page_info {
          page_size
          total_pages
          current_page
        }
        date_of_first_order
        total_count
        items {
          ...CUSTOMER_ORDER_FRAGMENT
          shipping_address {
            ...ADDRESS_FRAGMENT
          }
          billing_address {
            ...ADDRESS_FRAGMENT
          }
          total {
            ...ORDER_SUMMARY_FRAGMENT
          }
        }
      }
    }
  }
<<<<<<< HEAD
  ${gt}
  ${mt}
  ${ht}
`,ot=3,et=100,Pr={sort_direction:"DESC",sort_field:"CREATED_AT"},fn=async(t,n,r,o="",e)=>{const a={};n!=="viewAll"&&(a.order_date=JSON.parse(n));const c=o.trim();if(c&&c.length<ot)throw new RangeError(`Order search must contain at least ${ot} characters.`);if(c.length>et)throw new RangeError(`Order search cannot exceed ${et} characters.`);return c&&(a.search=c),await d(Dr,{method:"GET",cache:"no-cache",signal:e,variables:{pageSize:t,currentPage:r,filter:a,sort:Pr}}).then(s=>{var i;return(i=s.errors)!=null&&i.length?g(s.errors):vt(s)}).catch(f)},wr=`
=======
  ${nt}
  ${it}
  ${ct}
`,Q=3,Y=100,Qt={sort_direction:"DESC",sort_field:"CREATED_AT"},Ar=async(t,r,a,o="",n)=>{const c={};r!=="viewAll"&&(c.order_date=JSON.parse(r));const u=o.trim();if(u&&u.length<Q)throw new RangeError(`Order search must contain at least ${Q} characters.`);if(u.length>Y)throw new RangeError(`Order search cannot exceed ${Y} characters.`);return u&&(c.search=u),await d(jt,{method:"GET",cache:"no-cache",signal:n,variables:{pageSize:t,currentPage:a,filter:c,sort:Qt}}).then(l=>{var i;return(i=l.errors)!=null&&i.length?h(l.errors):Ot(l)}).catch(g)},Yt=`
>>>>>>> 6c65641a7ae144e73bca95136eec963787cdac85
  mutation CHANGE_CUSTOMER_PASSWORD(
    $currentPassword: String!
    $newPassword: String!
  ) {
    changeCustomerPassword(
      currentPassword: $currentPassword
      newPassword: $newPassword
    ) {
      email
    }
  }
<<<<<<< HEAD
`,gn=async({currentPassword:t,newPassword:n})=>await d(wr,{method:"POST",variables:{currentPassword:t,newPassword:n}}).then(r=>{var o,e,a;return(o=r.errors)!=null&&o.length?g(r.errors):((a=(e=r==null?void 0:r.data)==null?void 0:e.changeCustomerPassword)==null?void 0:a.email)||""}).catch(f),Gr=`
=======
`,br=async({currentPassword:t,newPassword:r})=>await d(Yt,{method:"POST",variables:{currentPassword:t,newPassword:r}}).then(a=>{var o,n,c;return(o=a.errors)!=null&&o.length?h(a.errors):((c=(n=a==null?void 0:a.data)==null?void 0:n.changeCustomerPassword)==null?void 0:c.email)||""}).catch(g),Wt=`
>>>>>>> 6c65641a7ae144e73bca95136eec963787cdac85
  query GET_STORE_CONFIG {
    storeConfig {
      base_media_url
      autocomplete_on_storefront
      minimum_password_length
      required_character_classes_number
      store_code
      shopping_assistance_enabled
      shopping_assistance_checkbox_title
      shopping_assistance_checkbox_tooltip
    }
  }
<<<<<<< HEAD
`,mn=async()=>await d(Gr,{method:"GET",cache:"force-cache"}).then(t=>{var n;return(n=t.errors)!=null&&n.length?g(t.errors):xt(t)}).catch(f),Ur=`
=======
`,Rr=async()=>await d(Wt,{method:"GET",cache:"force-cache"}).then(t=>{var r;return(r=t.errors)!=null&&r.length?h(t.errors):Nt(t)}).catch(g),Zt=`
>>>>>>> 6c65641a7ae144e73bca95136eec963787cdac85
  mutation UPDATE_CUSTOMER_EMAIL($email: String!, $password: String!) {
    updateCustomerEmail(email: $email, password: $password) {
      customer {
        email
      }
    }
  }
<<<<<<< HEAD
`,hn=async({email:t,password:n})=>await d(Ur,{method:"POST",variables:{email:t,password:n}}).then(r=>{var o,e,a,c;return(o=r.errors)!=null&&o.length?g(r.errors):((c=(a=(e=r==null?void 0:r.data)==null?void 0:e.updateCustomerEmail)==null?void 0:a.customer)==null?void 0:c.email)||""}).catch(f),vr=`
=======
`,yr=async({email:t,password:r})=>await d(Zt,{method:"POST",variables:{email:t,password:r}}).then(a=>{var o,n,c,u;return(o=a.errors)!=null&&o.length?h(a.errors):((u=(c=(n=a==null?void 0:a.data)==null?void 0:n.updateCustomerEmail)==null?void 0:c.customer)==null?void 0:u.email)||""}).catch(g),Xt=`
>>>>>>> 6c65641a7ae144e73bca95136eec963787cdac85
  mutation UPDATE_CUSTOMER_V2($input: CustomerUpdateInput!) {
    updateCustomerV2(input: $input) {
      customer {
        email
        allow_remote_shopping_assistance
      }
    }
  }
<<<<<<< HEAD
`,An=async t=>await d(vr,{method:"POST",variables:{input:I(t,"snakeCase",{firstName:"firstname",lastName:"lastname",middleName:"middlename",dob:"date_of_birth",custom_attributesV2:"custom_attributes"})}}).then(n=>{var r,o,e,a;return(r=n.errors)!=null&&r.length?g(n.errors):((a=(e=(o=n==null?void 0:n.data)==null?void 0:o.updateCustomerV2)==null?void 0:e.customer)==null?void 0:a.email)||""}).catch(f);export{Y as COMPANY_ADDRESS_PERMISSIONS,et as O,St as a,W as b,I as c,M as config,Wr as createCompanyAddress,Kr as createCustomerAddress,ot as d,jr as deleteCompanyAddress,dn as deletePaymentToken,d as fetchGraphQl,nn as g,sn as getAdminAssistanceActions,Hr as getAttributesForm,Xr as getCompanyAddressBook,Zr as getCompanyAddressBookConfig,zr as getConfig,en as getCountries,un as getCustomer,tn as getCustomerAddress,rn as getCustomerCompanyContext,_n as getCustomerPaymentTokens,on as getCustomerRolePermissions,fn as getOrderHistoryList,an as getRegions,mn as getStoreConfig,it as initialize,ln as removeCustomerAddress,qr as removeFetchGraphQlHeader,Qr as setDefaultCompanyAddress,Br as setEndpoint,Lr as setFetchGraphQlHeader,Yr as setFetchGraphQlHeaders,Vr as t,Jr as updateCompanyAddress,An as updateCustomer,cn as updateCustomerAddress,hn as updateCustomerEmail,gn as updateCustomerPassword};
=======
`,Or=async t=>await d(Xt,{method:"POST",variables:{input:O(t,"snakeCase",{firstName:"firstname",lastName:"lastname",middleName:"middlename",dob:"date_of_birth",custom_attributesV2:"custom_attributes"})}}).then(r=>{var a,o,n,c;return(a=r.errors)!=null&&a.length?h(r.errors):((c=(n=(o=r==null?void 0:r.data)==null?void 0:o.updateCustomerV2)==null?void 0:n.customer)==null?void 0:c.email)||""}).catch(g);export{Y as O,lt as a,B as b,O as c,y as config,sr as createCustomerAddress,Q as d,Cr as deletePaymentToken,d as fetchGraphQl,mr as getAdminAssistanceActions,_r as getAttributesForm,er as getConfig,dr as getCountries,Er as getCustomer,fr as getCustomerAddress,Tr as getCustomerPaymentTokens,Ar as getOrderHistoryList,gr as getRegions,Rr as getStoreConfig,Z as initialize,Sr as removeCustomerAddress,cr as removeFetchGraphQlHeader,nr as setEndpoint,ir as setFetchGraphQlHeader,ur as setFetchGraphQlHeaders,lr as t,Or as updateCustomer,hr as updateCustomerAddress,yr as updateCustomerEmail,br as updateCustomerPassword};
>>>>>>> 6c65641a7ae144e73bca95136eec963787cdac85
//# sourceMappingURL=api.js.map
