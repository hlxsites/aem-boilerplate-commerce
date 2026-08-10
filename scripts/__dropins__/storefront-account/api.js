/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as at}from"@dropins/tools/event-bus.js";import{Initializer as it,merge as nt}from"@dropins/tools/lib.js";import{FetchGraphQL as ct}from"@dropins/tools/fetch-graphql.js";import{COMPANY_ADDRESS_FRAGMENT as z,BASIC_CUSTOMER_INFO_FRAGMENT as ut,CUSTOMER_ORDER_FRAGMENT as st,ADDRESS_FRAGMENT as lt,ORDER_SUMMARY_FRAGMENT as dt}from"./fragments.js";const rt=new it({init:async t=>{const n={authHeaderConfig:{header:"Authorization",tokenPrefix:"Bearer"}};rt.config.setConfig({...n,...t})},listeners:()=>[]}),w=rt.config,{setEndpoint:vn,setFetchGraphQlHeader:xn,removeFetchGraphQlHeader:$n,setFetchGraphQlHeaders:kn,fetchGraphQl:_,getConfig:Fn}=new ct().getMethods(),_t=`
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
`,ft=`
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
`,f=t=>{throw t instanceof DOMException&&t.name==="AbortError"||at.emit("error",{source:"auth",type:"network",error:t}),t},m=t=>{const n=t.map(r=>r.message).join(" ");throw Error(n)},K=t=>t.replace(/_([a-z])/g,(n,r)=>r.toUpperCase()),gt=t=>t.replace(/([A-Z])/g,n=>`_${n.toLowerCase()}`),G=(t,n,r)=>{const o=["string","boolean","number"],e=n==="camelCase"?K:gt;return Array.isArray(t)?t.map(a=>o.includes(typeof a)||a===null?a:typeof a=="object"?G(a,n,r):a):t!==null&&typeof t=="object"?Object.entries(t).reduce((a,[c,s])=>{const i=r&&r[c]?r[c]:e(c);return a[i]=o.includes(typeof s)||s===null?s:G(s,n,r),a},{}):t},mt=t=>{const n=[];for(const r of t)if(!(r.frontend_input!=="MULTILINE"||r.multiline_count<2))for(let o=2;o<=r.multiline_count;o++){const e={...r,is_required:!1,name:`${r.code}_multiline_${o}`,code:`${r.code}_multiline_${o}`,id:`${r.code}_multiline_${o}`};n.push(e)}return n},ht=t=>{switch(t){case"middlename":return"middleName";case"firstname":return"firstName";case"lastname":return"lastName";default:return K(t)}},At=t=>{var n;return t!=null&&t.options?(n=t==null?void 0:t.options)==null?void 0:n.map(r=>({isDefault:(r==null?void 0:r.is_default)??!1,text:(r==null?void 0:r.label)??"",value:(r==null?void 0:r.value)??""})):[]},Ct=t=>{var a,c,s;const n=((c=(a=t==null?void 0:t.data)==null?void 0:a.attributesForm)==null?void 0:c.items)||[];if(!n.length)return[];const r=(s=n.filter(i=>{var d;return!((d=i.frontend_input)!=null&&d.includes("HIDDEN"))}))==null?void 0:s.map(({code:i,...d})=>{const g=i!=="country_id"?i:"country_code";return{...d,name:g,id:g,code:g}}),o=mt(r);return r.concat(o).map(i=>({code:i==null?void 0:i.code,name:i==null?void 0:i.name,id:i==null?void 0:i.id,label:(i==null?void 0:i.label)??"",entityType:i==null?void 0:i.entity_type,className:(i==null?void 0:i.frontend_class)??"",defaultValue:(i==null?void 0:i.default_value)??"",fieldType:i==null?void 0:i.frontend_input,multilineCount:(i==null?void 0:i.multiline_count)??0,orderNumber:Number(i==null?void 0:i.sort_order)||0,isHidden:!1,isUnique:(i==null?void 0:i.is_unique)??!1,required:(i==null?void 0:i.is_required)??!1,validateRules:(i==null?void 0:i.validate_rules)??[],options:At(i),customUpperCode:ht(i==null?void 0:i.code)})).sort((i,d)=>Number(i.orderNumber)-Number(d.orderNumber))},St=t=>{const n={};for(const r in t){const o=t[r];!Array.isArray(o)||o.length===0||(r==="custom_attributesV2"?o.forEach(e=>{typeof e=="object"&&"value"in e&&(n[e==null?void 0:e.code]=e==null?void 0:e.value)}):o.length>1?o.forEach((e,a)=>{a===0?n[r]=e:n[`${r}_multiline_${a+1}`]=e}):n[r]=o[0])}return n},Et=t=>({prefix:(t==null?void 0:t.prefix)??"",suffix:(t==null?void 0:t.suffix)??"",firstname:(t==null?void 0:t.firstname)??"",lastname:(t==null?void 0:t.lastname)??"",nickname:(t==null?void 0:t.nickname)??"",middlename:(t==null?void 0:t.middlename)??""}),yt=t=>({id:(t==null?void 0:t.id)??"",vat_id:(t==null?void 0:t.vat_id)??"",postcode:(t==null?void 0:t.postcode)??"",country_code:(t==null?void 0:t.country_code)??"",uid:(t==null?void 0:t.uid)??""}),pt=t=>({company:(t==null?void 0:t.company)??"",telephone:(t==null?void 0:t.telephone)??"",fax:(t==null?void 0:t.fax)??""}),Y=t=>{var o,e,a;const n=t==null?void 0:t.address_type;return G({...Et(t),...yt(t),...pt(t),...n?{address_type:n}:{},city:(t==null?void 0:t.city)??"",region:{region:((o=t==null?void 0:t.region)==null?void 0:o.region)??"",region_code:((e=t==null?void 0:t.region)==null?void 0:e.region_code)??"",region_id:((a=t==null?void 0:t.region)==null?void 0:a.region_id)??""},default_shipping:(t==null?void 0:t.default_shipping)||!1,default_billing:(t==null?void 0:t.default_billing)||!1,...St(t)},"camelCase",{})},Tt=t=>{var o,e;const n=((e=(o=t==null?void 0:t.data)==null?void 0:o.customer)==null?void 0:e.addresses)||[];return n.length?n.map(Y).sort((a,c)=>(Number(c.defaultBilling)||Number(c.defaultShipping))-(Number(a.defaultBilling)||Number(a.defaultShipping))):[]},bt=t=>{var o,e,a,c,s,i,d,g,h,S,y,p,T,E,C,R,N,I,U,v,x,$,k,F,B,P,L;const n=(a=(e=(o=t==null?void 0:t.data)==null?void 0:o.customer)==null?void 0:e.custom_attributes)==null?void 0:a.filter(O=>O).reduce((O,b)=>{var u;const q=K(b.code);return(u=b.selected_options)!=null&&u.length?O[q]=b.selected_options[0].value??"":O[q]=b.value??"",O},{}),r={email:((s=(c=t==null?void 0:t.data)==null?void 0:c.customer)==null?void 0:s.email)||"",firstName:((d=(i=t==null?void 0:t.data)==null?void 0:i.customer)==null?void 0:d.firstname)||"",lastName:((h=(g=t==null?void 0:t.data)==null?void 0:g.customer)==null?void 0:h.lastname)||"",middleName:((y=(S=t==null?void 0:t.data)==null?void 0:S.customer)==null?void 0:y.middlename)||"",gender:((T=(p=t==null?void 0:t.data)==null?void 0:p.customer)==null?void 0:T.gender)||"1",dateOfBirth:((C=(E=t==null?void 0:t.data)==null?void 0:E.customer)==null?void 0:C.date_of_birth)||"",prefix:((N=(R=t==null?void 0:t.data)==null?void 0:R.customer)==null?void 0:N.prefix)||"",suffix:((U=(I=t==null?void 0:t.data)==null?void 0:I.customer)==null?void 0:U.suffix)||"",createdAt:((x=(v=t==null?void 0:t.data)==null?void 0:v.customer)==null?void 0:x.created_at)||"",allowRemoteShoppingAssistance:(k=($=t==null?void 0:t.data)==null?void 0:$.customer)==null?void 0:k.allow_remote_shopping_assistance,...n};return nt(r,(L=(P=(B=(F=w==null?void 0:w.getConfig())==null?void 0:F.models)==null?void 0:B.CustomerDataModelShort)==null?void 0:P.transformer)==null?void 0:L.call(P,t.data))},Rt=t=>{var c,s;if(!((s=(c=t==null?void 0:t.data)==null?void 0:c.countries)!=null&&s.length))return{availableCountries:[],countriesWithRequiredRegion:[],optionalZipCountries:[]};const{countries:n,storeConfig:r}=t.data,o=r==null?void 0:r.countries_with_required_region.split(","),e=r==null?void 0:r.optional_zip_countries.split(",");return{availableCountries:n.filter(({two_letter_abbreviation:i,full_name_locale:d})=>!!(i&&d)).map(i=>{const{two_letter_abbreviation:d,full_name_locale:g,available_regions:h}=i,S=Array.isArray(h)&&h.length>0;return{value:d,text:g,availableRegions:S?h:void 0}}).sort((i,d)=>i.text.localeCompare(d.text)),countriesWithRequiredRegion:o,optionalZipCountries:e}},Ot=t=>{var o,e;const n=(e=(o=t==null?void 0:t.data)==null?void 0:o.country)==null?void 0:e.available_regions;return n?n.filter(a=>{if(!a)return!1;const{id:c,code:s,name:i}=a;return!!(c&&s&&i)}).map(a=>{const{id:c}=a;return{id:c,text:a.name,value:`${a.code},${a.id}`}}):[]},Mt=(t,n="en-US",r={})=>{const o={day:"2-digit",month:"2-digit",year:"numeric"},e=/^\d{4}-\d{2}-\d{2}$/.test(t.trim()),a={...o,...e?{timeZone:"UTC"}:{},...r},c=new Date(t.trim());return isNaN(c.getTime())?"Invalid Date":new Intl.DateTimeFormat(n,a).format(c)},Nt=(t,n="en-US",r={})=>{const e={...{hour:"2-digit",minute:"2-digit"},...r},a=new Date(t);return isNaN(a.getTime())?"Invalid Time":new Intl.DateTimeFormat(n,e).format(a)},M={value:0,currency:"USD"},It=t=>{var n,r,o,e,a,c,s,i,d,g;return{subtotal:((n=t==null?void 0:t.total)==null?void 0:n.subtotal)??M,grandTotal:((r=t==null?void 0:t.total)==null?void 0:r.grand_total)??M,grandTotalExclTax:((o=t==null?void 0:t.total)==null?void 0:o.grand_total_excl_tax)??M,totalGiftcard:((e=t==null?void 0:t.total)==null?void 0:e.total_giftcard)??M,subtotalExclTax:((a=t==null?void 0:t.total)==null?void 0:a.subtotal_excl_tax)??M,subtotalInclTax:((c=t==null?void 0:t.total)==null?void 0:c.subtotal_incl_tax)??M,taxes:((s=t==null?void 0:t.total)==null?void 0:s.taxes)??[],totalTax:((i=t==null?void 0:t.total)==null?void 0:i.total_tax)??M,totalShipping:((d=t==null?void 0:t.total)==null?void 0:d.total_shipping)??M,discounts:((g=t==null?void 0:t.total)==null?void 0:g.discounts)??[]}},Pt=t=>{var e,a,c,s,i,d,g,h,S,y,p,T,E,C,R,N,I,U,v,x,$,k,F,B,P,L,O,b,q;if(!((a=(e=t.data)==null?void 0:e.customer)!=null&&a.orders))return null;const n=((s=(c=t==null?void 0:t.data)==null?void 0:c.customer)==null?void 0:s.returns)??[],o={items:(((g=(d=(i=t==null?void 0:t.data)==null?void 0:i.customer)==null?void 0:d.orders)==null?void 0:g.items)??[]).map(u=>{var W;return{adminAssistedOrder:(u==null?void 0:u.admin_assisted_order)??null,items:u==null?void 0:u.items.map(l=>{var j,Q,Z;return{status:(l==null?void 0:l.status)??"",productName:(l==null?void 0:l.product_name)??"",id:l==null?void 0:l.id,quantityOrdered:(l==null?void 0:l.quantity_ordered)??0,quantityShipped:(l==null?void 0:l.quantity_shipped)??0,quantityInvoiced:(l==null?void 0:l.quantity_invoiced)??0,sku:(l==null?void 0:l.product_sku)??"",urlKey:(l==null?void 0:l.product_url_key)??"",topLevelSku:((j=l==null?void 0:l.product)==null?void 0:j.sku)??"",product:{smallImage:{url:((Z=(Q=l==null?void 0:l.product)==null?void 0:Q.small_image)==null?void 0:Z.url)??""}}}}),token:u==null?void 0:u.token,email:u==null?void 0:u.email,shippingMethod:u==null?void 0:u.shipping_method,paymentMethods:(u==null?void 0:u.payment_methods)??[],shipments:(u==null?void 0:u.shipments)??[],id:u==null?void 0:u.id,carrier:u==null?void 0:u.carrier,status:u==null?void 0:u.status,number:u==null?void 0:u.number,returns:(W=n==null?void 0:n.items)==null?void 0:W.filter(l=>l.order.id===u.id),orderDate:Mt(u.order_date),orderTime:Nt(u.order_date),shippingAddress:Y(u.shipping_address),billingAddress:Y(u.billing_address),total:It(u)}}),pageInfo:{pageSize:((p=(y=(S=(h=t==null?void 0:t.data)==null?void 0:h.customer)==null?void 0:S.orders)==null?void 0:y.page_info)==null?void 0:p.page_size)??10,totalPages:((R=(C=(E=(T=t==null?void 0:t.data)==null?void 0:T.customer)==null?void 0:E.orders)==null?void 0:C.page_info)==null?void 0:R.total_pages)??1,currentPage:((v=(U=(I=(N=t==null?void 0:t.data)==null?void 0:N.customer)==null?void 0:I.orders)==null?void 0:U.page_info)==null?void 0:v.current_page)??1},totalCount:((k=($=(x=t==null?void 0:t.data)==null?void 0:x.customer)==null?void 0:$.orders)==null?void 0:k.total_count)??0,dateOfFirstOrder:((P=(B=(F=t==null?void 0:t.data)==null?void 0:F.customer)==null?void 0:B.orders)==null?void 0:P.date_of_first_order)??""};return nt(o,(q=(b=(O=(L=w==null?void 0:w.getConfig())==null?void 0:L.models)==null?void 0:O.OrderHistoryModel)==null?void 0:b.transformer)==null?void 0:q.call(b,t.data))},Dt=t=>{var n,r,o,e,a,c,s,i,d,g,h,S,y,p,T,E;return{baseMediaUrl:(r=(n=t==null?void 0:t.data)==null?void 0:n.storeConfig)==null?void 0:r.base_media_url,minLength:+((e=(o=t==null?void 0:t.data)==null?void 0:o.storeConfig)==null?void 0:e.minimum_password_length)||3,requiredCharacterClasses:+((c=(a=t==null?void 0:t.data)==null?void 0:a.storeConfig)==null?void 0:c.required_character_classes_number)||0,storeCode:((i=(s=t==null?void 0:t.data)==null?void 0:s.storeConfig)==null?void 0:i.store_code)??"",shoppingAssistanceEnabled:((g=(d=t==null?void 0:t.data)==null?void 0:d.storeConfig)==null?void 0:g.shopping_assistance_enabled)??!1,shoppingAssistanceCheckboxTitle:((S=(h=t==null?void 0:t.data)==null?void 0:h.storeConfig)==null?void 0:S.shopping_assistance_checkbox_title)||"",shoppingAssistanceCheckboxTooltip:((p=(y=t==null?void 0:t.data)==null?void 0:y.storeConfig)==null?void 0:p.shopping_assistance_checkbox_tooltip)||"",b2bEnabled:((E=(T=t==null?void 0:t.data)==null?void 0:T.storeConfig)==null?void 0:E.b2b_enabled)??!1}},Bn=t=>({firstName:t.firstName,lastName:t.lastName,emailAddress:(t==null?void 0:t.email)||"",accountId:(t==null?void 0:t.email)||""}),wt={VI:"Visa",MC:"Mastercard",MD:"Maestro",AE:"American Express",DI:"Discover",DN:"Diners",JCB:"JCB",UN:"UnionPay",VISA:"Visa",MASTERCARD:"Mastercard",MAESTRO:"Maestro",AMEX:"American Express",AMERICAN_EXPRESS:"American Express",DISCOVER:"Discover",DINERS:"Diners",DINERS_CLUB:"Diners",UNIONPAY:"UnionPay"};function Gt(t){try{return JSON.parse(t)}catch{return null}}function ot(t){return t.trim().toUpperCase().replaceAll(/\s+/g,"_")}function X(t){return!(t!=null&&t.trim())||ot(t)==="UNKNOWN"}function tt(t){if(t!=null&&t.trim())return wt[ot(t)]}function Ut(t){return t.replaceAll("_"," ").toLowerCase().split(/\s+/).filter(Boolean).map(n=>n.charAt(0).toUpperCase()+n.slice(1)).join(" ")}function vt(t,n){var e,a;const r=(e=t==null?void 0:t.brand)==null?void 0:e.trim(),o=(a=t==null?void 0:t.type)==null?void 0:a.trim();if(!X(r)){const c=tt(r);return c||Ut(r)}if(!X(o)){const c=tt(o);return c||o}return n.payment_method_code}function xt(t){if(!t)return!1;const n=/^(\d{1,2})\/(\d{4})$/.exec(t.trim());if(!n)return!1;const r=Number.parseInt(n[1],10),o=Number.parseInt(n[2],10);if(r<1||r>12)return!1;const e=new Date(o,r,0,23,59,59,999);return Date.now()>e.getTime()}function $t(t,n){return n.some(r=>t.payment_method_code===r||t.payment_method_code.startsWith(`${r}_`))}function kt(t,n){var o;const r=e=>{if(!e)return"";const a=e.replaceAll(/\D/g,"");return a.length>=4?a.slice(-4):""};if(t){const e=r(t.maskedCC)||r(t.lastFour)||r(t.last_four)||r(t.ccLast4)||r(t.cc_last4);if(e)return e}return((o=n.match(/\d{4}/g))==null?void 0:o.at(-1))??""}function Ft(t){const n=t.replaceAll(/[^a-zA-Z0-9]/g,"");return n.length>=4?n.slice(-4).toUpperCase():n.padEnd(4,"0").slice(0,4).toUpperCase()}function Bt(t){if(!t.public_hash)return null;const n=Gt(t.details),r=vt(n,t),o=kt(n,t.details)||Ft(t.public_hash);return{publicHash:t.public_hash,cardBrand:r,lastFourDigits:o,expired:xt(n==null?void 0:n.expirationDate)}}function Lt(t,n){return(n!=null&&n.length?t.filter(o=>$t(o,n)):t).map(o=>Bt(o)).filter(o=>o!==null)}function qt(t){var r,o,e,a,c,s;const n=(o=(r=t==null?void 0:t.data)==null?void 0:r.customer)==null?void 0:o.admin_assistance_actions;return n?{totalCount:n.total_count||0,items:((e=n.items)==null?void 0:e.map(i=>({action:i.action||"",date:i.date||"",details:i.details||""})))||[],pageInfo:{currentPage:((a=n.page_info)==null?void 0:a.current_page)||1,pageSize:((c=n.page_info)==null?void 0:c.page_size)||10,totalPages:((s=n.page_info)==null?void 0:s.total_pages)||1}}:null}const Yt=t=>"address_type"in t||"company_id"in t,zt=t=>[...t.custom_attributes??[],...t.extension_attributes??[]].filter(r=>!!(r!=null&&r.code||r!=null&&r.attribute_code)).map(r=>({code:r.code||r.attribute_code||"",value:r.value==null?"":String(r.value)})),Vt=t=>{var n,r,o;return{address_type:t.address_type??"SHIPPING",firstname:t.firstname??"",lastname:t.lastname??"",nickname:t.nickname??"",middlename:t.middlename??"",prefix:t.prefix??"",suffix:t.suffix??"",city:t.city??"",company:t.company??"",country_code:t.country_code??"",region:{region:((n=t.region)==null?void 0:n.region)??"",region_code:((r=t.region)==null?void 0:r.region_code)??"",region_id:((o=t.region)==null?void 0:o.region_id)??t.region_id??""},telephone:t.telephone??"",id:t.id??"",vat_id:t.vat_id??"",postcode:t.postcode??"",street:t.street??[],default_shipping:t.address_type==="SHIPPING"?t.is_default??!1:!1,default_billing:t.address_type==="BILLING"?t.is_default??!1:!1,custom_attributesV2:zt(t),fax:t.fax??"",uid:t.uid??""}},V=t=>{if(!t)return{};const n=Yt(t)?Vt(t):t;return Y(n)},Ht=t=>{var i,d,g,h,S,y,p,T;const n=(i=t==null?void 0:t.data)==null?void 0:i.company,r=n==null?void 0:n.addresses,o=(d=n==null?void 0:n.default_shipping_address)==null?void 0:d.id,e=(g=n==null?void 0:n.default_billing_address)==null?void 0:g.id,a=((r==null?void 0:r.items)??[]).map(E=>{const C=V(E),R=C.id?String(C.id):"",N=o?R===String(o):C.defaultShipping,I=e?R===String(e):C.defaultBilling;return{...C,defaultShipping:!!N,defaultBilling:!!I}});a.sort((E,C)=>(Number(C.defaultBilling)||Number(C.defaultShipping))-(Number(E.defaultBilling)||Number(E.defaultShipping)));const c=((h=n==null?void 0:n.config)==null?void 0:h.address_book_enabled)??(n==null?void 0:n.address_book_enabled)??!1,s=((S=n==null?void 0:n.config)==null?void 0:S.address_book_custom_shipping_address_enabled)??(n==null?void 0:n.address_book_custom_shipping_address_enabled)??!1;return{addressBookEnabled:c,addressBookCustomShippingAddressEnabled:s,addresses:{items:a,pageInfo:{currentPage:((y=r==null?void 0:r.page_info)==null?void 0:y.current_page)??1,pageSize:((p=r==null?void 0:r.page_info)==null?void 0:p.page_size)??a.length,totalPages:((T=r==null?void 0:r.page_info)==null?void 0:T.total_pages)??1},totalCount:(r==null?void 0:r.total_count)??a.length}}},Ln=async t=>{const n=`_account_attributesForm_${t}`,r=sessionStorage.getItem(n);return r?JSON.parse(r):await _(t!=="shortRequest"?_t:ft,{method:"GET",cache:"force-cache",variables:{formCode:t}}).then(o=>{var a;if((a=o.errors)!=null&&a.length)return m(o.errors);const e=Ct(o);return sessionStorage.setItem(n,JSON.stringify(e)),e}).catch(f)},Kt=`
  mutation CREATE_CUSTOMER_ADDRESS($input: CustomerAddressInput!) {
    createCustomerAddress(input: $input) {
      firstname
      uid
    }
  }
`,qn=async t=>await _(Kt,{method:"POST",variables:{input:G(t,"snakeCase",{custom_attributesV2:"custom_attributesV2",firstName:"firstname",lastName:"lastname",middleName:"middlename"})}}).then(n=>{var o,e;if((o=n.errors)!=null&&o.length)return m(n.errors);const r=(e=n==null?void 0:n.data)==null?void 0:e.createCustomerAddress;return{firstname:(r==null?void 0:r.firstname)??"",uid:(r==null?void 0:r.uid)??""}}).catch(f),Jt=`
  mutation CREATE_COMPANY_ADDRESS($input: CompanyAddressInput!) {
    createCompanyAddress(input: $input) {
      ...COMPANY_ADDRESS_FRAGMENT
    }
  }
  ${z}
`,H=t=>{if(Array.isArray(t))return t.reduce((n,r)=>(n.push(...H(r)),n),[]);if(typeof t=="string"){const n=t.trim();return n?[n]:[]}return[]},et=(t,n)=>{const r=t,o=[...H(r.street),...H(r.streetMultiline_2)],e=t.region?{region:t.region.region||"",region_code:t.region.regionCode||"",region_id:typeof t.region.regionId=="string"?Number(t.region.regionId):t.region.regionId}:void 0,a=t.addressTypeShipping&&!t.addressTypeBilling?"SHIPPING":t.addressTypeBilling&&!t.addressTypeShipping?"BILLING":void 0,c=t.addressType||a||(t.defaultBilling&&!t.defaultShipping?"BILLING":"SHIPPING"),i=typeof t.isDefault=="boolean"||typeof t.defaultShipping=="boolean"||typeof t.defaultBilling=="boolean"?typeof t.isDefault=="boolean"?t.isDefault:!!(t.defaultShipping||t.defaultBilling):n!=null&&n.preserveIsDefaultWhenUnset?void 0:!1;return{company:t.company||"",address_type:c,...typeof i=="boolean"?{is_default:i}:{},city:t.city||"",country_code:t.countryCode||"",region:e,street:o,telephone:t.telephone||"",postcode:t.postcode||"",firstname:t.firstName||"",middlename:t.middleName||"",lastname:t.lastName||"",nickname:t.nickname||"",prefix:t.prefix||"",suffix:t.suffix||"",fax:t.fax||"",vat_id:t.vatId||""}},Yn=async t=>{const n=et(t);return await _(Jt,{method:"POST",variables:{input:n}}).then(r=>{var o,e;return(o=r.errors)!=null&&o.length?m(r.errors):V((e=r==null?void 0:r.data)==null?void 0:e.createCompanyAddress)}).catch(f)},Wt=`
  mutation UPDATE_COMPANY_ADDRESS($id: ID!, $input: CompanyAddressUpdateInput!) {
    updateCompanyAddress(id: $id, input: $input) {
      ...COMPANY_ADDRESS_FRAGMENT
    }
  }
  ${z}
`,zn=async(t,n)=>{if(!t)return{};const o={...et(n,{preserveIsDefaultWhenUnset:!0})};return delete o.address_type,await _(Wt,{method:"POST",variables:{id:t,input:o}}).then(e=>{var a,c;return(a=e.errors)!=null&&a.length?m(e.errors):V((c=e==null?void 0:e.data)==null?void 0:c.updateCompanyAddress)}).catch(f)},jt=`
  mutation DELETE_COMPANY_ADDRESS($id: ID!) {
    deleteCompanyAddress(id: $id)
  }
`,Vn=async t=>await _(jt,{method:"POST",variables:{id:t}}).then(n=>{var r,o;return(r=n.errors)!=null&&r.length?m(n.errors):!!((o=n==null?void 0:n.data)!=null&&o.deleteCompanyAddress)}).catch(n=>(console.error("[Account][API][deleteCompanyAddress] network error",n),f(n))),Qt=`
  mutation SET_DEFAULT_COMPANY_ADDRESS($id: ID!) {
    setDefaultCompanyAddress(id: $id) {
      ...COMPANY_ADDRESS_FRAGMENT
    }
  }
  ${z}
`,Hn=async t=>t?await _(Qt,{method:"POST",variables:{id:t}}).then(n=>{var r,o;return(r=n.errors)!=null&&r.length?m(n.errors):V((o=n==null?void 0:n.data)==null?void 0:o.setDefaultCompanyAddress)}).catch(f):{},Zt=`
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
  ${z}
`,Xt=t=>{if(!t||!(t.message||"").toLowerCase().includes("the company address does not exist"))return!1;const o=(t.path||[]).join(".");return o==="company.default_shipping_address"||o==="company.default_billing_address"},Kn=async()=>{var r,o;const t=await _(Zt,{method:"GET",cache:"no-cache"}).catch(e=>f(e));return(r=t.errors)!=null&&r.length&&!(!!((o=t==null?void 0:t.data)!=null&&o.company)&&t.errors.every(a=>Xt(a)))?m(t.errors):Ht(t)},tn=`
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
`,Jn=async()=>await _(tn,{method:"GET",cache:"no-cache"}).then(t=>{var n;return(n=t.errors)!=null&&n.length?m(t.errors):Tt(t)}).catch(f),nn=`
  query GET_CUSTOMER_COMPANY_CONTEXT {
    company {
      id
      name
    }
  }
`,Wn=async()=>await _(nn,{method:"GET",cache:"no-cache"}).then(t=>{var n,r,o;return(n=t.errors)!=null&&n.length&&m(t.errors),!!((o=(r=t==null?void 0:t.data)==null?void 0:r.company)!=null&&o.id)}).catch(f),J={canAccessAddressBook:!1,canViewAddress:!1,canCreateAddress:!1,canEditAddress:!1,canDeleteAddress:!1,canSetDefaultAddress:!1},A=(t,n)=>n.some(r=>t.has(r)),D={view:"Magento_CompanyAddressStorefrontCompatibility::company_address",add:"Magento_CompanyAddressStorefrontCompatibility::add",edit:"Magento_CompanyAddressStorefrontCompatibility::edit",delete:"Magento_CompanyAddressStorefrontCompatibility::delete",default:"Magento_CompanyAddressStorefrontCompatibility::default",setDefaultLegacy:"Magento_CompanyAddressStorefrontCompatibility::set_default"},rn=[D.default,D.setDefaultLegacy],on=["Magento_Company::view_address","company_address_view"],en=["company_address_edit","Magento_Company::edit_address"],an=["company_address_add","Magento_Company::add_address","Magento_Company::edit_address"],cn=["company_address_delete","Magento_Company::delete_address","Magento_Company::edit_address"],un=["company_address_set_default","Magento_Company::set_default_address","Magento_Company::edit_address"],sn=(t=[])=>{const n=new Set,r=[...t];for(;r.length;){const o=r.pop();o&&(typeof o.id=="string"&&n.add(o.id),Array.isArray(o.children)&&o.children.length&&r.push(...o.children))}return n},ln=t=>Array.from(t).some(n=>n.startsWith("Magento_CompanyAddressStorefrontCompatibility::")),dn=t=>A(t,["company_address_add","company_address_edit","company_address_delete","company_address_set_default"]),_n=t=>t?t.id==="0"||t.id===0||t.id==="MA=="||t.name==="Company Administrator":!1,fn=()=>["Magento_Company::view_address","Magento_Company::edit_address","Magento_CompanyAddressStorefrontCompatibility::company_address","Magento_CompanyAddressStorefrontCompatibility::add","Magento_CompanyAddressStorefrontCompatibility::edit","Magento_CompanyAddressStorefrontCompatibility::delete","Magento_CompanyAddressStorefrontCompatibility::default","Magento_CompanyAddressStorefrontCompatibility::set_default","company_address_add","company_address_edit","company_address_delete","company_address_set_default"],gn=t=>{if(!t)return J;const n=sn(t.permissions||[]),r=new Set(n);_n(t)&&fn().forEach(h=>r.add(h));const o=ln(r),e=o?A(r,[D.view]):A(r,on),a=dn(r),c=o?A(r,[D.edit]):a?A(r,["company_address_edit"]):A(r,en),s=o?A(r,[D.add]):a?A(r,["company_address_add"]):A(r,an),i=o?A(r,[D.delete]):a?A(r,["company_address_delete"]):A(r,cn),d=o?A(r,rn):a?A(r,["company_address_set_default"]):A(r,un);return{canAccessAddressBook:e,canViewAddress:e,canCreateAddress:s,canEditAddress:c,canDeleteAddress:i,canSetDefaultAddress:d}},mn=t=>{var r,o,e;if((r=t==null?void 0:t.errors)!=null&&r.length)return J;const n=((e=(o=t==null?void 0:t.data)==null?void 0:o.customer)==null?void 0:e.role)??null;return gn(n)},jn=()=>J,hn=`
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
`,Qn=async()=>await _(hn,{method:"GET",cache:"no-cache"}).then(t=>mn(t)).catch(f),An=`
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
`,Zn=async()=>{const t="_account_countries",n=sessionStorage.getItem(t);return n?JSON.parse(n):await _(An,{method:"GET",cache:"no-cache"}).then(r=>{var e;if((e=r.errors)!=null&&e.length)return m(r.errors);const o=Rt(r);return sessionStorage.setItem(t,JSON.stringify(o)),o}).catch(f)},Cn=`
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
`,Xn=async t=>{const n=`_account_regions_${t}`,r=sessionStorage.getItem(n);return r?JSON.parse(r):await _(Cn,{method:"GET",cache:"no-cache",variables:{countryCode:t}}).then(o=>{var a;if((a=o.errors)!=null&&a.length)return m(o.errors);const e=Ot(o);return sessionStorage.setItem(n,JSON.stringify(e)),e}).catch(f)},Sn=`
  mutation UPDATE_CUSTOMER_ADDRESS($id: Int!, $input: CustomerAddressInput) {
    updateCustomerAddress(id: $id, input: $input) {
      firstname
    }
  }
`,tr=async t=>{const{addressId:n,...r}=t;return n?await _(Sn,{method:"POST",variables:{id:Number(n),input:G(r,"snakeCase",{custom_attributesV2:"custom_attributesV2",firstName:"firstname",lastName:"lastname",middleName:"middlename"})}}).then(o=>{var e,a,c;return(e=o.errors)!=null&&e.length?m(o.errors):((c=(a=o==null?void 0:o.data)==null?void 0:a.updateCustomerAddress)==null?void 0:c.firstname)||""}).catch(f):""},En=`
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
  ${ut}
`,nr=async()=>await _(En,{method:"GET",cache:"no-cache"}).then(t=>{var n;return(n=t.errors)!=null&&n.length?m(t.errors):bt(t)}).catch(f),yn=`
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
`,rr=async(t,n)=>await _(yn,{method:"GET",cache:"no-cache",variables:{pageSize:t,currentPage:n}}).then(r=>{var o;return(o=r.errors)!=null&&o.length?m(r.errors):qt(r)}).catch(f),pn=`
  mutation REMOVE_CUSTOMER_ADDRESS($id: Int!) {
    deleteCustomerAddress(id: $id)
  }
`,or=async t=>await _(pn,{method:"POST",variables:{id:t}}).then(n=>{var r;return(r=n.errors)!=null&&r.length?m(n.errors):n.data.deleteCustomerAddress}).catch(f),Tn=`
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
`,er=async t=>await _(Tn,{method:"GET",cache:"no-cache"}).then(n=>{var o,e,a;if((o=n.errors)!=null&&o.length)return m(n.errors);const r=((a=(e=n.data)==null?void 0:e.customerPaymentTokens)==null?void 0:a.items)??[];return Lt(r,t)}).catch(f),bn=`
  mutation deletePaymentToken($public_hash: String!) {
    deletePaymentToken(public_hash: $public_hash) {
      result
    }
  }
`,ar=async t=>await _(bn,{method:"POST",variables:{public_hash:t}}).then(n=>{var r,o,e;return(r=n.errors)!=null&&r.length?m(n.errors):!!((e=(o=n.data)==null?void 0:o.deletePaymentToken)!=null&&e.result)}).catch(f),Rn=`
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
  ${st}
  ${lt}
  ${dt}
`,On={sort_direction:"DESC",sort_field:"CREATED_AT"},ir=async(t,n,r)=>{const o=n.includes("viewAll")?{}:{order_date:JSON.parse(n)};return await _(Rn,{method:"GET",cache:"no-cache",variables:{pageSize:t,currentPage:r,filter:o,sort:On}}).then(e=>Pt(e)).catch(f)},Mn=`
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
`,cr=async({currentPassword:t,newPassword:n})=>await _(Mn,{method:"POST",variables:{currentPassword:t,newPassword:n}}).then(r=>{var o,e,a;return(o=r.errors)!=null&&o.length?m(r.errors):((a=(e=r==null?void 0:r.data)==null?void 0:e.changeCustomerPassword)==null?void 0:a.email)||""}).catch(f),Nn=`
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
`,ur=async()=>await _(Nn,{method:"GET",cache:"force-cache"}).then(t=>{var n;return(n=t.errors)!=null&&n.length?m(t.errors):Dt(t)}).catch(f),In=`
  mutation UPDATE_CUSTOMER_EMAIL($email: String!, $password: String!) {
    updateCustomerEmail(email: $email, password: $password) {
      customer {
        email
      }
    }
  }
`,sr=async({email:t,password:n})=>await _(In,{method:"POST",variables:{email:t,password:n}}).then(r=>{var o,e,a,c;return(o=r.errors)!=null&&o.length?m(r.errors):((c=(a=(e=r==null?void 0:r.data)==null?void 0:e.updateCustomerEmail)==null?void 0:a.customer)==null?void 0:c.email)||""}).catch(f),Pn=`
  mutation UPDATE_CUSTOMER_V2($input: CustomerUpdateInput!) {
    updateCustomerV2(input: $input) {
      customer {
        email
        allow_remote_shopping_assistance
      }
    }
  }
`,lr=async t=>await _(Pn,{method:"POST",variables:{input:G(t,"snakeCase",{firstName:"firstname",lastName:"lastname",middleName:"middlename",dob:"date_of_birth",custom_attributesV2:"custom_attributes"})}}).then(n=>{var r,o,e,a;return(r=n.errors)!=null&&r.length?m(n.errors):((a=(e=(o=n==null?void 0:n.data)==null?void 0:o.updateCustomerV2)==null?void 0:e.customer)==null?void 0:a.email)||""}).catch(f);export{gt as a,K as b,G as c,w as config,Yn as createCompanyAddress,qn as createCustomerAddress,Vn as deleteCompanyAddress,ar as deletePaymentToken,_ as fetchGraphQl,jn as g,rr as getAdminAssistanceActions,Ln as getAttributesForm,Kn as getCompanyAddressBook,Fn as getConfig,Zn as getCountries,nr as getCustomer,Jn as getCustomerAddress,Wn as getCustomerCompanyContext,er as getCustomerPaymentTokens,Qn as getCustomerRolePermissions,ir as getOrderHistoryList,Xn as getRegions,ur as getStoreConfig,rt as initialize,or as removeCustomerAddress,$n as removeFetchGraphQlHeader,Hn as setDefaultCompanyAddress,vn as setEndpoint,xn as setFetchGraphQlHeader,kn as setFetchGraphQlHeaders,Bn as t,zn as updateCompanyAddress,lr as updateCustomer,tr as updateCustomerAddress,sr as updateCustomerEmail,cr as updateCustomerPassword};
//# sourceMappingURL=api.js.map
