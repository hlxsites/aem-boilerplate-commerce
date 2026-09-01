/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as ut}from"@dropins/tools/event-bus.js";import{Initializer as st,merge as ot}from"@dropins/tools/lib.js";import{FetchGraphQL as lt}from"@dropins/tools/fetch-graphql.js";import{COMPANY_ADDRESS_FRAGMENT as V,BASIC_CUSTOMER_INFO_FRAGMENT as dt,CUSTOMER_ORDER_FRAGMENT as _t,ADDRESS_FRAGMENT as ft,ORDER_SUMMARY_FRAGMENT as gt}from"./fragments.js";const et=new st({init:async t=>{const r={authHeaderConfig:{header:"Authorization",tokenPrefix:"Bearer"}};et.config.setConfig({...r,...t})},listeners:()=>[]}),M=et.config,{setEndpoint:Fn,setFetchGraphQlHeader:Bn,removeFetchGraphQlHeader:Ln,setFetchGraphQlHeaders:qn,fetchGraphQl:_,getConfig:Yn}=new lt().getMethods(),mt=`
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
`,ht=`
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
`,f=t=>{throw t instanceof DOMException&&t.name==="AbortError"||ut.emit("error",{source:"auth",type:"network",error:t}),t},m=t=>{const r=t.map(n=>n.message).join(" ");throw Error(r)},W=t=>t.replace(/_([a-z])/g,(r,n)=>n.toUpperCase()),At=t=>t.replace(/([A-Z])/g,r=>`_${r.toLowerCase()}`),I=(t,r,n)=>{const o=["string","boolean","number"],e=r==="camelCase"?W:At;return Array.isArray(t)?t.map(a=>o.includes(typeof a)||a===null?a:typeof a=="object"?I(a,r,n):a):t!==null&&typeof t=="object"?Object.entries(t).reduce((a,[c,s])=>{const i=n&&n[c]?n[c]:e(c);return a[i]=o.includes(typeof s)||s===null?s:I(s,r,n),a},{}):t},Et=t=>{const r=[];for(const n of t)if(!(n.frontend_input!=="MULTILINE"||n.multiline_count<2))for(let o=2;o<=n.multiline_count;o++){const e={...n,is_required:!1,name:`${n.code}_multiline_${o}`,code:`${n.code}_multiline_${o}`,id:`${n.code}_multiline_${o}`};r.push(e)}return r},St=t=>{switch(t){case"middlename":return"middleName";case"firstname":return"firstName";case"lastname":return"lastName";default:return W(t)}},Ct=t=>{var r;return t!=null&&t.options?(r=t==null?void 0:t.options)==null?void 0:r.map(n=>({isDefault:(n==null?void 0:n.is_default)??!1,text:(n==null?void 0:n.label)??"",value:(n==null?void 0:n.value)??""})):[]},yt=t=>{var a,c,s;const r=((c=(a=t==null?void 0:t.data)==null?void 0:a.attributesForm)==null?void 0:c.items)||[];if(!r.length)return[];const n=(s=r.filter(i=>{var d;return!((d=i.frontend_input)!=null&&d.includes("HIDDEN"))}))==null?void 0:s.map(({code:i,...d})=>{const g=i!=="country_id"?i:"country_code";return{...d,name:g,id:g,code:g}}),o=Et(n);return n.concat(o).map(i=>({code:i==null?void 0:i.code,name:i==null?void 0:i.name,id:i==null?void 0:i.id,label:(i==null?void 0:i.label)??"",entityType:i==null?void 0:i.entity_type,className:(i==null?void 0:i.frontend_class)??"",defaultValue:(i==null?void 0:i.default_value)??"",fieldType:i==null?void 0:i.frontend_input,multilineCount:(i==null?void 0:i.multiline_count)??0,orderNumber:Number(i==null?void 0:i.sort_order)||0,isHidden:!1,isUnique:(i==null?void 0:i.is_unique)??!1,required:(i==null?void 0:i.is_required)??!1,validateRules:(i==null?void 0:i.validate_rules)??[],options:Ct(i),customUpperCode:St(i==null?void 0:i.code)})).sort((i,d)=>Number(i.orderNumber)-Number(d.orderNumber))},pt=t=>{const r={};for(const n in t){const o=t[n];!Array.isArray(o)||o.length===0||(n==="custom_attributesV2"?o.forEach(e=>{typeof e=="object"&&"value"in e&&(r[e==null?void 0:e.code]=e==null?void 0:e.value)}):o.length>1?o.forEach((e,a)=>{a===0?r[n]=e:r[`${n}_multiline_${a+1}`]=e}):r[n]=o[0])}return r},Tt=t=>({prefix:(t==null?void 0:t.prefix)??"",suffix:(t==null?void 0:t.suffix)??"",firstname:(t==null?void 0:t.firstname)??"",lastname:(t==null?void 0:t.lastname)??"",nickname:(t==null?void 0:t.nickname)??"",middlename:(t==null?void 0:t.middlename)??""}),bt=t=>({id:(t==null?void 0:t.id)??"",vat_id:(t==null?void 0:t.vat_id)??"",postcode:(t==null?void 0:t.postcode)??"",country_code:(t==null?void 0:t.country_code)??"",uid:(t==null?void 0:t.uid)??""}),Rt=t=>({company:(t==null?void 0:t.company)??"",telephone:(t==null?void 0:t.telephone)??"",fax:(t==null?void 0:t.fax)??""}),z=t=>{var o,e,a;const r=t==null?void 0:t.address_type;return I({...Tt(t),...bt(t),...Rt(t),...r?{address_type:r}:{},city:(t==null?void 0:t.city)??"",region:{region:((o=t==null?void 0:t.region)==null?void 0:o.region)??"",region_code:((e=t==null?void 0:t.region)==null?void 0:e.region_code)??"",region_id:((a=t==null?void 0:t.region)==null?void 0:a.region_id)??""},default_shipping:(t==null?void 0:t.default_shipping)||!1,default_billing:(t==null?void 0:t.default_billing)||!1,...pt(t)},"camelCase",{})},Ot=t=>{var o,e;const r=((e=(o=t==null?void 0:t.data)==null?void 0:o.customer)==null?void 0:e.addresses)||[];return r.length?r.map(z).sort((a,c)=>(Number(c.defaultBilling)||Number(c.defaultShipping))-(Number(a.defaultBilling)||Number(a.defaultShipping))):[]},Nt=t=>{var o,e,a,c,s,i,d,g,h,E,A,C,y,p,D,P,w,G,U,v,x,$,k,F,B,O,L;const r=(a=(e=(o=t==null?void 0:t.data)==null?void 0:o.customer)==null?void 0:e.custom_attributes)==null?void 0:a.filter(b=>b).reduce((b,T)=>{var u;const q=W(T.code);return(u=T.selected_options)!=null&&u.length?b[q]=T.selected_options[0].value??"":b[q]=T.value??"",b},{}),n={email:((s=(c=t==null?void 0:t.data)==null?void 0:c.customer)==null?void 0:s.email)||"",firstName:((d=(i=t==null?void 0:t.data)==null?void 0:i.customer)==null?void 0:d.firstname)||"",lastName:((h=(g=t==null?void 0:t.data)==null?void 0:g.customer)==null?void 0:h.lastname)||"",middleName:((A=(E=t==null?void 0:t.data)==null?void 0:E.customer)==null?void 0:A.middlename)||"",gender:((y=(C=t==null?void 0:t.data)==null?void 0:C.customer)==null?void 0:y.gender)||"1",dateOfBirth:((D=(p=t==null?void 0:t.data)==null?void 0:p.customer)==null?void 0:D.date_of_birth)||"",prefix:((w=(P=t==null?void 0:t.data)==null?void 0:P.customer)==null?void 0:w.prefix)||"",suffix:((U=(G=t==null?void 0:t.data)==null?void 0:G.customer)==null?void 0:U.suffix)||"",createdAt:((x=(v=t==null?void 0:t.data)==null?void 0:v.customer)==null?void 0:x.created_at)||"",allowRemoteShoppingAssistance:(k=($=t==null?void 0:t.data)==null?void 0:$.customer)==null?void 0:k.allow_remote_shopping_assistance,...r};return ot(n,(L=(O=(B=(F=M==null?void 0:M.getConfig())==null?void 0:F.models)==null?void 0:B.CustomerDataModelShort)==null?void 0:O.transformer)==null?void 0:L.call(O,t.data))},Mt=t=>{var c,s;if(!((s=(c=t==null?void 0:t.data)==null?void 0:c.countries)!=null&&s.length))return{availableCountries:[],countriesWithRequiredRegion:[],optionalZipCountries:[]};const{countries:r,storeConfig:n}=t.data,o=n==null?void 0:n.countries_with_required_region.split(","),e=n==null?void 0:n.optional_zip_countries.split(",");return{availableCountries:r.filter(({two_letter_abbreviation:i,full_name_locale:d})=>!!(i&&d)).map(i=>{const{two_letter_abbreviation:d,full_name_locale:g,available_regions:h}=i,E=Array.isArray(h)&&h.length>0;return{value:d,text:g,availableRegions:E?h:void 0}}).sort((i,d)=>i.text.localeCompare(d.text)),countriesWithRequiredRegion:o,optionalZipCountries:e}},It=t=>{var o,e;const r=(e=(o=t==null?void 0:t.data)==null?void 0:o.country)==null?void 0:e.available_regions;return r?r.filter(a=>{if(!a)return!1;const{id:c,code:s,name:i}=a;return!!(c&&s&&i)}).map(a=>{const{id:c}=a;return{id:c,text:a.name,value:`${a.code},${a.id}`}}):[]},Dt=(t,r="en-US",n={})=>{const o={day:"2-digit",month:"2-digit",year:"numeric"},e=/^\d{4}-\d{2}-\d{2}$/.test(t.trim()),a={...o,...e?{timeZone:"UTC"}:{},...n},c=new Date(t.trim());return isNaN(c.getTime())?"Invalid Date":new Intl.DateTimeFormat(r,a).format(c)},Pt=(t,r="en-US",n={})=>{const e={...{hour:"2-digit",minute:"2-digit"},...n},a=new Date(t);return isNaN(a.getTime())?"Invalid Time":new Intl.DateTimeFormat(r,e).format(a)},R={value:0,currency:"USD"},wt=t=>{var r,n,o,e,a,c,s,i,d,g;return{subtotal:((r=t==null?void 0:t.total)==null?void 0:r.subtotal)??R,grandTotal:((n=t==null?void 0:t.total)==null?void 0:n.grand_total)??R,grandTotalExclTax:((o=t==null?void 0:t.total)==null?void 0:o.grand_total_excl_tax)??R,totalGiftcard:((e=t==null?void 0:t.total)==null?void 0:e.total_giftcard)??R,subtotalExclTax:((a=t==null?void 0:t.total)==null?void 0:a.subtotal_excl_tax)??R,subtotalInclTax:((c=t==null?void 0:t.total)==null?void 0:c.subtotal_incl_tax)??R,taxes:((s=t==null?void 0:t.total)==null?void 0:s.taxes)??[],totalTax:((i=t==null?void 0:t.total)==null?void 0:i.total_tax)??R,totalShipping:((d=t==null?void 0:t.total)==null?void 0:d.total_shipping)??R,discounts:((g=t==null?void 0:t.total)==null?void 0:g.discounts)??[]}},Gt=t=>{var e,a,c,s,i,d,g,h,E,A,C,y,p,D,P,w,G,U,v,x,$,k,F,B,O,L,b,T,q;if(!((a=(e=t.data)==null?void 0:e.customer)!=null&&a.orders))return null;const r=((s=(c=t==null?void 0:t.data)==null?void 0:c.customer)==null?void 0:s.returns)??[],o={items:(((g=(d=(i=t==null?void 0:t.data)==null?void 0:i.customer)==null?void 0:d.orders)==null?void 0:g.items)??[]).map(u=>{var j;return{adminAssistedOrder:(u==null?void 0:u.admin_assisted_order)??null,items:u==null?void 0:u.items.map(l=>{var Q,Z,X;return{status:(l==null?void 0:l.status)??"",productName:(l==null?void 0:l.product_name)??"",id:l==null?void 0:l.id,quantityOrdered:(l==null?void 0:l.quantity_ordered)??0,quantityShipped:(l==null?void 0:l.quantity_shipped)??0,quantityInvoiced:(l==null?void 0:l.quantity_invoiced)??0,sku:(l==null?void 0:l.product_sku)??"",urlKey:(l==null?void 0:l.product_url_key)??"",topLevelSku:((Q=l==null?void 0:l.product)==null?void 0:Q.sku)??"",product:{smallImage:{url:((X=(Z=l==null?void 0:l.product)==null?void 0:Z.small_image)==null?void 0:X.url)??""}}}}),token:u==null?void 0:u.token,email:u==null?void 0:u.email,shippingMethod:u==null?void 0:u.shipping_method,paymentMethods:(u==null?void 0:u.payment_methods)??[],shipments:(u==null?void 0:u.shipments)??[],id:u==null?void 0:u.id,carrier:u==null?void 0:u.carrier,status:u==null?void 0:u.status,number:u==null?void 0:u.number,returns:(j=r==null?void 0:r.items)==null?void 0:j.filter(l=>l.order.id===u.id),orderDate:Dt(u.order_date),orderTime:Pt(u.order_date),shippingAddress:z(u.shipping_address),billingAddress:z(u.billing_address),total:wt(u)}}),pageInfo:{pageSize:((C=(A=(E=(h=t==null?void 0:t.data)==null?void 0:h.customer)==null?void 0:E.orders)==null?void 0:A.page_info)==null?void 0:C.page_size)??10,totalPages:((P=(D=(p=(y=t==null?void 0:t.data)==null?void 0:y.customer)==null?void 0:p.orders)==null?void 0:D.page_info)==null?void 0:P.total_pages)??1,currentPage:((v=(U=(G=(w=t==null?void 0:t.data)==null?void 0:w.customer)==null?void 0:G.orders)==null?void 0:U.page_info)==null?void 0:v.current_page)??1},totalCount:((k=($=(x=t==null?void 0:t.data)==null?void 0:x.customer)==null?void 0:$.orders)==null?void 0:k.total_count)??0,dateOfFirstOrder:((O=(B=(F=t==null?void 0:t.data)==null?void 0:F.customer)==null?void 0:B.orders)==null?void 0:O.date_of_first_order)??""};return ot(o,(q=(T=(b=(L=M==null?void 0:M.getConfig())==null?void 0:L.models)==null?void 0:b.OrderHistoryModel)==null?void 0:T.transformer)==null?void 0:q.call(T,t.data))},Ut=t=>{var r,n,o,e,a,c,s,i,d,g,h,E,A,C,y,p;return{baseMediaUrl:(n=(r=t==null?void 0:t.data)==null?void 0:r.storeConfig)==null?void 0:n.base_media_url,minLength:+((e=(o=t==null?void 0:t.data)==null?void 0:o.storeConfig)==null?void 0:e.minimum_password_length)||3,requiredCharacterClasses:+((c=(a=t==null?void 0:t.data)==null?void 0:a.storeConfig)==null?void 0:c.required_character_classes_number)||0,storeCode:((i=(s=t==null?void 0:t.data)==null?void 0:s.storeConfig)==null?void 0:i.store_code)??"",shoppingAssistanceEnabled:((g=(d=t==null?void 0:t.data)==null?void 0:d.storeConfig)==null?void 0:g.shopping_assistance_enabled)??!1,shoppingAssistanceCheckboxTitle:((E=(h=t==null?void 0:t.data)==null?void 0:h.storeConfig)==null?void 0:E.shopping_assistance_checkbox_title)||"",shoppingAssistanceCheckboxTooltip:((C=(A=t==null?void 0:t.data)==null?void 0:A.storeConfig)==null?void 0:C.shopping_assistance_checkbox_tooltip)||"",b2bEnabled:((p=(y=t==null?void 0:t.data)==null?void 0:y.storeConfig)==null?void 0:p.b2b_enabled)??!1}},zn=t=>({firstName:t.firstName,lastName:t.lastName,emailAddress:(t==null?void 0:t.email)||"",accountId:(t==null?void 0:t.email)||""}),vt={VI:"Visa",MC:"Mastercard",MD:"Maestro",AE:"American Express",DI:"Discover",DN:"Diners",JCB:"JCB",UN:"UnionPay",VISA:"Visa",MASTERCARD:"Mastercard",MAESTRO:"Maestro",AMEX:"American Express",AMERICAN_EXPRESS:"American Express",DISCOVER:"Discover",DINERS:"Diners",DINERS_CLUB:"Diners",UNIONPAY:"UnionPay"};function xt(t){try{return JSON.parse(t)}catch{return null}}function at(t){return t.trim().toUpperCase().replaceAll(/\s+/g,"_")}function tt(t){return!(t!=null&&t.trim())||at(t)==="UNKNOWN"}function nt(t){if(t!=null&&t.trim())return vt[at(t)]}function $t(t){return t.replaceAll("_"," ").toLowerCase().split(/\s+/).filter(Boolean).map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join(" ")}function kt(t,r){var e,a;const n=(e=t==null?void 0:t.brand)==null?void 0:e.trim(),o=(a=t==null?void 0:t.type)==null?void 0:a.trim();if(!tt(n)){const c=nt(n);return c||$t(n)}if(!tt(o)){const c=nt(o);return c||o}return r.payment_method_code}function Ft(t){if(!t)return!1;const r=/^(\d{1,2})\/(\d{4})$/.exec(t.trim());if(!r)return!1;const n=Number.parseInt(r[1],10),o=Number.parseInt(r[2],10);if(n<1||n>12)return!1;const e=new Date(o,n,0,23,59,59,999);return Date.now()>e.getTime()}function Bt(t,r){return r.some(n=>t.payment_method_code===n||t.payment_method_code.startsWith(`${n}_`))}function Lt(t,r){var o;const n=e=>{if(!e)return"";const a=e.replaceAll(/\D/g,"");return a.length>=4?a.slice(-4):""};if(t){const e=n(t.maskedCC)||n(t.lastFour)||n(t.last_four)||n(t.ccLast4)||n(t.cc_last4);if(e)return e}return((o=r.match(/\d{4}/g))==null?void 0:o.at(-1))??""}function qt(t){const r=t.replaceAll(/[^a-zA-Z0-9]/g,"");return r.length>=4?r.slice(-4).toUpperCase():r.padEnd(4,"0").slice(0,4).toUpperCase()}function Yt(t){if(!t.public_hash)return null;const r=xt(t.details),n=kt(r,t),o=Lt(r,t.details)||qt(t.public_hash);return{publicHash:t.public_hash,cardBrand:n,lastFourDigits:o,expired:Ft(r==null?void 0:r.expirationDate)}}function zt(t,r){return(r!=null&&r.length?t.filter(o=>Bt(o,r)):t).map(o=>Yt(o)).filter(o=>o!==null)}function Vt(t){var n,o,e,a,c,s;const r=(o=(n=t==null?void 0:t.data)==null?void 0:n.customer)==null?void 0:o.admin_assistance_actions;return r?{totalCount:r.total_count||0,items:((e=r.items)==null?void 0:e.map(i=>({action:i.action||"",date:i.date||"",details:i.details||""})))||[],pageInfo:{currentPage:((a=r.page_info)==null?void 0:a.current_page)||1,pageSize:((c=r.page_info)==null?void 0:c.page_size)||10,totalPages:((s=r.page_info)==null?void 0:s.total_pages)||1}}:null}const Ht=t=>"address_type"in t||"company_id"in t,Kt=t=>[...t.custom_attributes??[],...t.extension_attributes??[]].filter(n=>!!(n!=null&&n.code||n!=null&&n.attribute_code)).map(n=>({code:n.code||n.attribute_code||"",value:n.value==null?"":String(n.value)})),Wt=t=>{var r,n,o;return{address_type:t.address_type??"SHIPPING",firstname:t.firstname??"",lastname:t.lastname??"",nickname:t.nickname??"",middlename:t.middlename??"",prefix:t.prefix??"",suffix:t.suffix??"",city:t.city??"",company:t.company??"",country_code:t.country_code??"",region:{region:((r=t.region)==null?void 0:r.region)??"",region_code:((n=t.region)==null?void 0:n.region_code)??"",region_id:((o=t.region)==null?void 0:o.region_id)??t.region_id??""},telephone:t.telephone??"",id:t.id??"",vat_id:t.vat_id??"",postcode:t.postcode??"",street:t.street??[],default_shipping:t.address_type==="SHIPPING"?t.is_default??!1:!1,default_billing:t.address_type==="BILLING"?t.is_default??!1:!1,custom_attributesV2:Kt(t),fax:t.fax??"",uid:t.uid??""}},H=t=>{if(!t)return{};const r=Ht(t)?Wt(t):t;return z(r)},it=t=>{var r,n;return{addressBookEnabled:((r=t==null?void 0:t.config)==null?void 0:r.address_book_enabled)??(t==null?void 0:t.address_book_enabled)??!1,addressBookCustomShippingAddressEnabled:((n=t==null?void 0:t.config)==null?void 0:n.address_book_custom_shipping_address_enabled)??(t==null?void 0:t.address_book_custom_shipping_address_enabled)??!1}},Jt=t=>{var c,s,i,d,g,h;const r=(c=t==null?void 0:t.data)==null?void 0:c.company,n=r==null?void 0:r.addresses,o=(s=r==null?void 0:r.default_shipping_address)==null?void 0:s.id,e=(i=r==null?void 0:r.default_billing_address)==null?void 0:i.id,a=((n==null?void 0:n.items)??[]).map(E=>{const A=H(E),C=A.id?String(A.id):"",y=o?C===String(o):A.defaultShipping,p=e?C===String(e):A.defaultBilling;return{...A,defaultShipping:!!y,defaultBilling:!!p}});return a.sort((E,A)=>(Number(A.defaultBilling)||Number(A.defaultShipping))-(Number(E.defaultBilling)||Number(E.defaultShipping))),{...it(r),addresses:{items:a,pageInfo:{currentPage:((d=n==null?void 0:n.page_info)==null?void 0:d.current_page)??1,pageSize:((g=n==null?void 0:n.page_info)==null?void 0:g.page_size)??a.length,totalPages:((h=n==null?void 0:n.page_info)==null?void 0:h.total_pages)??1},totalCount:(n==null?void 0:n.total_count)??a.length}}},Vn=async t=>{const r=`_account_attributesForm_${t}`,n=sessionStorage.getItem(r);return n?JSON.parse(n):await _(t!=="shortRequest"?mt:ht,{method:"GET",cache:"force-cache",variables:{formCode:t}}).then(o=>{var a;if((a=o.errors)!=null&&a.length)return m(o.errors);const e=yt(o);return sessionStorage.setItem(r,JSON.stringify(e)),e}).catch(f)},jt=`
  mutation CREATE_CUSTOMER_ADDRESS($input: CustomerAddressInput!) {
    createCustomerAddress(input: $input) {
      firstname
      uid
    }
  }
`,Hn=async t=>await _(jt,{method:"POST",variables:{input:I(t,"snakeCase",{custom_attributesV2:"custom_attributesV2",firstName:"firstname",lastName:"lastname",middleName:"middlename"})}}).then(r=>{var o,e;if((o=r.errors)!=null&&o.length)return m(r.errors);const n=(e=r==null?void 0:r.data)==null?void 0:e.createCustomerAddress;return{firstname:(n==null?void 0:n.firstname)??"",uid:(n==null?void 0:n.uid)??""}}).catch(f),Qt=`
  mutation CREATE_COMPANY_ADDRESS($input: CompanyAddressInput!) {
    createCompanyAddress(input: $input) {
      ...COMPANY_ADDRESS_FRAGMENT
    }
  }
  ${V}
`,K=t=>{if(Array.isArray(t))return t.reduce((r,n)=>(r.push(...K(n)),r),[]);if(typeof t=="string"){const r=t.trim();return r?[r]:[]}return[]},ct=(t,r)=>{const n=t,o=[...K(n.street),...K(n.streetMultiline_2)],e=t.region?{region:t.region.region||"",region_code:t.region.regionCode||"",region_id:typeof t.region.regionId=="string"?Number(t.region.regionId):t.region.regionId}:void 0,a=t.addressTypeShipping&&!t.addressTypeBilling?"SHIPPING":t.addressTypeBilling&&!t.addressTypeShipping?"BILLING":void 0,c=t.addressType||a||(t.defaultBilling&&!t.defaultShipping?"BILLING":"SHIPPING"),i=typeof t.isDefault=="boolean"||typeof t.defaultShipping=="boolean"||typeof t.defaultBilling=="boolean"?typeof t.isDefault=="boolean"?t.isDefault:!!(t.defaultShipping||t.defaultBilling):r!=null&&r.preserveIsDefaultWhenUnset?void 0:!1;return{company:t.company||"",address_type:c,...typeof i=="boolean"?{is_default:i}:{},city:t.city||"",country_code:t.countryCode||"",region:e,street:o,telephone:t.telephone||"",postcode:t.postcode||"",firstname:t.firstName||"",middlename:t.middleName||"",lastname:t.lastName||"",nickname:t.nickname||"",prefix:t.prefix||"",suffix:t.suffix||"",fax:t.fax||"",vat_id:t.vatId||""}},Kn=async t=>{const r=ct(t);return await _(Qt,{method:"POST",variables:{input:r}}).then(n=>{var o,e;return(o=n.errors)!=null&&o.length?m(n.errors):H((e=n==null?void 0:n.data)==null?void 0:e.createCompanyAddress)}).catch(f)},Zt=`
  mutation UPDATE_COMPANY_ADDRESS($id: ID!, $input: CompanyAddressUpdateInput!) {
    updateCompanyAddress(id: $id, input: $input) {
      ...COMPANY_ADDRESS_FRAGMENT
    }
  }
  ${V}
`,Wn=async(t,r)=>{if(!t)return{};const o={...ct(r,{preserveIsDefaultWhenUnset:!0})};return delete o.address_type,await _(Zt,{method:"POST",variables:{id:t,input:o}}).then(e=>{var a,c;return(a=e.errors)!=null&&a.length?m(e.errors):H((c=e==null?void 0:e.data)==null?void 0:c.updateCompanyAddress)}).catch(f)},Xt=`
  mutation DELETE_COMPANY_ADDRESS($id: ID!) {
    deleteCompanyAddress(id: $id)
  }
`,Jn=async t=>await _(Xt,{method:"POST",variables:{id:t}}).then(r=>{var n,o;return(n=r.errors)!=null&&n.length?m(r.errors):!!((o=r==null?void 0:r.data)!=null&&o.deleteCompanyAddress)}).catch(r=>(console.error("[Account][API][deleteCompanyAddress] network error",r),f(r))),tn=`
  mutation SET_DEFAULT_COMPANY_ADDRESS($id: ID!) {
    setDefaultCompanyAddress(id: $id) {
      ...COMPANY_ADDRESS_FRAGMENT
    }
  }
  ${V}
`,jn=async t=>t?await _(tn,{method:"POST",variables:{id:t}}).then(r=>{var n,o;return(n=r.errors)!=null&&n.length?m(r.errors):H((o=r==null?void 0:r.data)==null?void 0:o.setDefaultCompanyAddress)}).catch(f):{},nn=`
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
`,rn=t=>{if(!t||!(t.message||"").toLowerCase().includes("the company address does not exist"))return!1;const o=(t.path||[]).join(".");return o==="company.default_shipping_address"||o==="company.default_billing_address"},Qn=async()=>{var n,o;const t=await _(nn,{method:"GET",cache:"no-cache"}).catch(e=>f(e));return(n=t.errors)!=null&&n.length&&!(!!((o=t==null?void 0:t.data)!=null&&o.company)&&t.errors.every(a=>rn(a)))?m(t.errors):Jt(t)},on=`
  query GET_COMPANY_ADDRESS_BOOK_CONFIG {
    company {
      config {
        address_book_enabled
        address_book_custom_shipping_address_enabled
      }
    }
  }
`,rt={addressBookEnabled:!1,addressBookCustomShippingAddressEnabled:!1},Zn=async()=>{var t,r;try{const n=await _(on,{method:"GET",cache:"no-cache"});return(t=n==null?void 0:n.errors)!=null&&t.length?rt:it((r=n==null?void 0:n.data)==null?void 0:r.company)}catch{return rt}},Y={VIEW:"Magento_CompanyAddressStorefrontCompatibility::company_address",ADD:"Magento_CompanyAddressStorefrontCompatibility::add",EDIT:"Magento_CompanyAddressStorefrontCompatibility::edit",DELETE:"Magento_CompanyAddressStorefrontCompatibility::delete",SET_DEFAULT:"Magento_CompanyAddressStorefrontCompatibility::default"},en=`
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
`,Xn=async()=>await _(en,{method:"GET",cache:"no-cache"}).then(t=>{var r;return(r=t.errors)!=null&&r.length?m(t.errors):Ot(t)}).catch(f),an=`
  query GET_CUSTOMER_COMPANY_CONTEXT {
    company {
      id
      name
    }
  }
`,tr=async()=>await _(an,{method:"GET",cache:"no-cache"}).then(t=>{var r,n,o;return(r=t.errors)!=null&&r.length&&m(t.errors),!!((o=(n=t==null?void 0:t.data)==null?void 0:n.company)!=null&&o.id)}).catch(f),J={canAccessAddressBook:!1,canViewAddress:!1,canCreateAddress:!1,canEditAddress:!1,canDeleteAddress:!1,canSetDefaultAddress:!1},S=(t,r)=>r.some(n=>t.has(n)),N={view:Y.VIEW,add:Y.ADD,edit:Y.EDIT,delete:Y.DELETE,default:Y.SET_DEFAULT,setDefaultLegacy:"Magento_CompanyAddressStorefrontCompatibility::set_default"},cn=[N.default,N.setDefaultLegacy],un=["Magento_Company::view_address","company_address_view"],sn=["company_address_edit","Magento_Company::edit_address"],ln=["company_address_add","Magento_Company::add_address","Magento_Company::edit_address"],dn=["company_address_delete","Magento_Company::delete_address","Magento_Company::edit_address"],_n=["company_address_set_default","Magento_Company::set_default_address","Magento_Company::edit_address"],fn=(t=[])=>{const r=new Set,n=[...t];for(;n.length;){const o=n.pop();o&&(typeof o.id=="string"&&r.add(o.id),Array.isArray(o.children)&&o.children.length&&n.push(...o.children))}return r},gn=t=>Array.from(t).some(r=>r.startsWith("Magento_CompanyAddressStorefrontCompatibility::")),mn=t=>S(t,["company_address_add","company_address_edit","company_address_delete","company_address_set_default"]),hn=t=>t?t.id==="0"||t.id===0||t.id==="MA=="||t.name==="Company Administrator":!1,An=()=>["Magento_Company::view_address","Magento_Company::edit_address","Magento_CompanyAddressStorefrontCompatibility::company_address","Magento_CompanyAddressStorefrontCompatibility::add","Magento_CompanyAddressStorefrontCompatibility::edit","Magento_CompanyAddressStorefrontCompatibility::delete","Magento_CompanyAddressStorefrontCompatibility::default","Magento_CompanyAddressStorefrontCompatibility::set_default","company_address_add","company_address_edit","company_address_delete","company_address_set_default"],En=t=>{if(!t)return J;const r=fn(t.permissions||[]),n=new Set(r);hn(t)&&An().forEach(h=>n.add(h));const o=gn(n),e=o?S(n,[N.view]):S(n,un),a=mn(n),c=o?S(n,[N.edit]):a?S(n,["company_address_edit"]):S(n,sn),s=o?S(n,[N.add]):a?S(n,["company_address_add"]):S(n,ln),i=o?S(n,[N.delete]):a?S(n,["company_address_delete"]):S(n,dn),d=o?S(n,cn):a?S(n,["company_address_set_default"]):S(n,_n);return{canAccessAddressBook:e,canViewAddress:e,canCreateAddress:s,canEditAddress:c,canDeleteAddress:i,canSetDefaultAddress:d}},Sn=t=>{var n,o,e;if((n=t==null?void 0:t.errors)!=null&&n.length)return J;const r=((e=(o=t==null?void 0:t.data)==null?void 0:o.customer)==null?void 0:e.role)??null;return En(r)},nr=()=>J,Cn=`
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
`,rr=async()=>await _(Cn,{method:"GET",cache:"no-cache"}).then(t=>Sn(t)).catch(f),yn=`
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
`,or=async()=>{const t="_account_countries",r=sessionStorage.getItem(t);return r?JSON.parse(r):await _(yn,{method:"GET",cache:"no-cache"}).then(n=>{var e;if((e=n.errors)!=null&&e.length)return m(n.errors);const o=Mt(n);return sessionStorage.setItem(t,JSON.stringify(o)),o}).catch(f)},pn=`
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
`,er=async t=>{const r=`_account_regions_${t}`,n=sessionStorage.getItem(r);return n?JSON.parse(n):await _(pn,{method:"GET",cache:"no-cache",variables:{countryCode:t}}).then(o=>{var a;if((a=o.errors)!=null&&a.length)return m(o.errors);const e=It(o);return sessionStorage.setItem(r,JSON.stringify(e)),e}).catch(f)},Tn=`
  mutation UPDATE_CUSTOMER_ADDRESS($id: Int!, $input: CustomerAddressInput) {
    updateCustomerAddress(id: $id, input: $input) {
      firstname
    }
  }
`,ar=async t=>{const{addressId:r,...n}=t;return r?await _(Tn,{method:"POST",variables:{id:Number(r),input:I(n,"snakeCase",{custom_attributesV2:"custom_attributesV2",firstName:"firstname",lastName:"lastname",middleName:"middlename"})}}).then(o=>{var e,a,c;return(e=o.errors)!=null&&e.length?m(o.errors):((c=(a=o==null?void 0:o.data)==null?void 0:a.updateCustomerAddress)==null?void 0:c.firstname)||""}).catch(f):""},bn=`
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
  ${dt}
`,ir=async()=>await _(bn,{method:"GET",cache:"no-cache"}).then(t=>{var r;return(r=t.errors)!=null&&r.length?m(t.errors):Nt(t)}).catch(f),Rn=`
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
`,cr=async(t,r)=>await _(Rn,{method:"GET",cache:"no-cache",variables:{pageSize:t,currentPage:r}}).then(n=>{var o;return(o=n.errors)!=null&&o.length?m(n.errors):Vt(n)}).catch(f),On=`
  mutation REMOVE_CUSTOMER_ADDRESS($id: Int!) {
    deleteCustomerAddress(id: $id)
  }
`,ur=async t=>await _(On,{method:"POST",variables:{id:t}}).then(r=>{var n;return(n=r.errors)!=null&&n.length?m(r.errors):r.data.deleteCustomerAddress}).catch(f),Nn=`
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
`,sr=async t=>await _(Nn,{method:"GET",cache:"no-cache"}).then(r=>{var o,e,a;if((o=r.errors)!=null&&o.length)return m(r.errors);const n=((a=(e=r.data)==null?void 0:e.customerPaymentTokens)==null?void 0:a.items)??[];return zt(n,t)}).catch(f),Mn=`
  mutation deletePaymentToken($public_hash: String!) {
    deletePaymentToken(public_hash: $public_hash) {
      result
    }
  }
`,lr=async t=>await _(Mn,{method:"POST",variables:{public_hash:t}}).then(r=>{var n,o,e;return(n=r.errors)!=null&&n.length?m(r.errors):!!((e=(o=r.data)==null?void 0:o.deletePaymentToken)!=null&&e.result)}).catch(f),In=`
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
  ${_t}
  ${ft}
  ${gt}
`,Dn={sort_direction:"DESC",sort_field:"CREATED_AT"},dr=async(t,r,n)=>{const o=r.includes("viewAll")?{}:{order_date:JSON.parse(r)};return await _(In,{method:"GET",cache:"no-cache",variables:{pageSize:t,currentPage:n,filter:o,sort:Dn}}).then(e=>Gt(e)).catch(f)},Pn=`
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
`,_r=async({currentPassword:t,newPassword:r})=>await _(Pn,{method:"POST",variables:{currentPassword:t,newPassword:r}}).then(n=>{var o,e,a;return(o=n.errors)!=null&&o.length?m(n.errors):((a=(e=n==null?void 0:n.data)==null?void 0:e.changeCustomerPassword)==null?void 0:a.email)||""}).catch(f),wn=`
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
`,fr=async()=>await _(wn,{method:"GET",cache:"force-cache"}).then(t=>{var r;return(r=t.errors)!=null&&r.length?m(t.errors):Ut(t)}).catch(f),Gn=`
  mutation UPDATE_CUSTOMER_EMAIL($email: String!, $password: String!) {
    updateCustomerEmail(email: $email, password: $password) {
      customer {
        email
      }
    }
  }
`,gr=async({email:t,password:r})=>await _(Gn,{method:"POST",variables:{email:t,password:r}}).then(n=>{var o,e,a,c;return(o=n.errors)!=null&&o.length?m(n.errors):((c=(a=(e=n==null?void 0:n.data)==null?void 0:e.updateCustomerEmail)==null?void 0:a.customer)==null?void 0:c.email)||""}).catch(f),Un=`
  mutation UPDATE_CUSTOMER_V2($input: CustomerUpdateInput!) {
    updateCustomerV2(input: $input) {
      customer {
        email
        allow_remote_shopping_assistance
      }
    }
  }
`,mr=async t=>await _(Un,{method:"POST",variables:{input:I(t,"snakeCase",{firstName:"firstname",lastName:"lastname",middleName:"middlename",dob:"date_of_birth",custom_attributesV2:"custom_attributes"})}}).then(r=>{var n,o,e,a;return(n=r.errors)!=null&&n.length?m(r.errors):((a=(e=(o=r==null?void 0:r.data)==null?void 0:o.updateCustomerV2)==null?void 0:e.customer)==null?void 0:a.email)||""}).catch(f);export{Y as COMPANY_ADDRESS_PERMISSIONS,At as a,W as b,I as c,M as config,Kn as createCompanyAddress,Hn as createCustomerAddress,Jn as deleteCompanyAddress,lr as deletePaymentToken,_ as fetchGraphQl,nr as g,cr as getAdminAssistanceActions,Vn as getAttributesForm,Qn as getCompanyAddressBook,Zn as getCompanyAddressBookConfig,Yn as getConfig,or as getCountries,ir as getCustomer,Xn as getCustomerAddress,tr as getCustomerCompanyContext,sr as getCustomerPaymentTokens,rr as getCustomerRolePermissions,dr as getOrderHistoryList,er as getRegions,fr as getStoreConfig,et as initialize,ur as removeCustomerAddress,Ln as removeFetchGraphQlHeader,jn as setDefaultCompanyAddress,Fn as setEndpoint,Bn as setFetchGraphQlHeader,qn as setFetchGraphQlHeaders,zn as t,Wn as updateCompanyAddress,mr as updateCustomer,ar as updateCustomerAddress,gr as updateCustomerEmail,_r as updateCustomerPassword};
//# sourceMappingURL=api.js.map
