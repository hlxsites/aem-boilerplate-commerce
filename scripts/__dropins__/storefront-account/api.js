/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as X}from"@dropins/tools/event-bus.js";import{Initializer as tt,merge as Q}from"@dropins/tools/lib.js";import{FetchGraphQL as rt}from"@dropins/tools/fetch-graphql.js";import{BASIC_CUSTOMER_INFO_FRAGMENT as ot,CUSTOMER_ORDER_FRAGMENT as nt,ADDRESS_FRAGMENT as et,ORDER_SUMMARY_FRAGMENT as at}from"./fragments.js";const W=new tt({init:async t=>{const r={authHeaderConfig:{header:"Authorization",tokenPrefix:"Bearer"}};W.config.setConfig({...r,...t})},listeners:()=>[]}),O=W.config,{setEndpoint:gr,setFetchGraphQlHeader:mr,removeFetchGraphQlHeader:hr,setFetchGraphQlHeaders:Ar,fetchGraphQl:d,getConfig:yr}=new rt().getMethods(),it=`
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
`,ct=`
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
`,f=t=>{throw t instanceof DOMException&&t.name==="AbortError"||X.emit("error",{source:"auth",type:"network",error:t}),t},g=t=>{const r=t.map(o=>o.message).join(" ");throw Error(r)},V=t=>t.replace(/_([a-z])/g,(r,o)=>o.toUpperCase()),ut=t=>t.replace(/([A-Z])/g,r=>`_${r.toLowerCase()}`),I=(t,r,o)=>{const n=["string","boolean","number"],e=r==="camelCase"?V:ut;return Array.isArray(t)?t.map(i=>n.includes(typeof i)||i===null?i:typeof i=="object"?I(i,r,o):i):t!==null&&typeof t=="object"?Object.entries(t).reduce((i,[c,_])=>{const a=o&&o[c]?o[c]:e(c);return i[a]=n.includes(typeof _)||_===null?_:I(_,r,o),i},{}):t},lt=t=>{let r=[];for(const o of t)if(!(o.frontend_input!=="MULTILINE"||o.multiline_count<2))for(let n=2;n<=o.multiline_count;n++){const e={...o,is_required:!1,name:`${o.code}_multiline_${n}`,code:`${o.code}_multiline_${n}`,id:`${o.code}_multiline_${n}`};r.push(e)}return r},_t=t=>{switch(t){case"middlename":return"middleName";case"firstname":return"firstName";case"lastname":return"lastName";default:return V(t)}},st=t=>{var r;return t!=null&&t.options?(r=t==null?void 0:t.options)==null?void 0:r.map(o=>({isDefault:(o==null?void 0:o.is_default)??!1,text:(o==null?void 0:o.label)??"",value:(o==null?void 0:o.value)??""})):[]},dt=t=>{var i,c,_;const r=((c=(i=t==null?void 0:t.data)==null?void 0:i.attributesForm)==null?void 0:c.items)||[];if(!r.length)return[];const o=(_=r.filter(a=>{var s;return!((s=a.frontend_input)!=null&&s.includes("HIDDEN"))}))==null?void 0:_.map(({code:a,...s})=>{const m=a!=="country_id"?a:"country_code";return{...s,name:m,id:m,code:m}}),n=lt(o);return o.concat(n).map(a=>({code:a==null?void 0:a.code,name:a==null?void 0:a.name,id:a==null?void 0:a.id,label:(a==null?void 0:a.label)??"",entityType:a==null?void 0:a.entity_type,className:(a==null?void 0:a.frontend_class)??"",defaultValue:(a==null?void 0:a.default_value)??"",fieldType:a==null?void 0:a.frontend_input,multilineCount:(a==null?void 0:a.multiline_count)??0,orderNumber:Number(a==null?void 0:a.sort_order)||0,isHidden:!1,isUnique:(a==null?void 0:a.is_unique)??!1,required:(a==null?void 0:a.is_required)??!1,validateRules:(a==null?void 0:a.validate_rules)??[],options:st(a),customUpperCode:_t(a==null?void 0:a.code)})).sort((a,s)=>Number(a.orderNumber)-Number(s.orderNumber))},ft=t=>{const r={};for(const o in t){const n=t[o];!Array.isArray(n)||n.length===0||(o==="custom_attributesV2"?n.forEach(e=>{typeof e=="object"&&"value"in e&&(r[e==null?void 0:e.code]=e==null?void 0:e.value)}):n.length>1?n.forEach((e,i)=>{i===0?r[o]=e:r[`${o}_multiline_${i+1}`]=e}):r[o]=n[0])}return r},gt=t=>({prefix:(t==null?void 0:t.prefix)??"",suffix:(t==null?void 0:t.suffix)??"",firstname:(t==null?void 0:t.firstname)??"",lastname:(t==null?void 0:t.lastname)??"",middlename:(t==null?void 0:t.middlename)??""}),mt=t=>({id:(t==null?void 0:t.id)??"",vat_id:(t==null?void 0:t.vat_id)??"",postcode:(t==null?void 0:t.postcode)??"",country_code:(t==null?void 0:t.country_code)??"",uid:(t==null?void 0:t.uid)??""}),ht=t=>({company:(t==null?void 0:t.company)??"",telephone:(t==null?void 0:t.telephone)??"",fax:(t==null?void 0:t.fax)??""}),L=t=>{var o,n,e;return I({...gt(t),...mt(t),...ht(t),city:(t==null?void 0:t.city)??"",region:{region:((o=t==null?void 0:t.region)==null?void 0:o.region)??"",region_code:((n=t==null?void 0:t.region)==null?void 0:n.region_code)??"",region_id:((e=t==null?void 0:t.region)==null?void 0:e.region_id)??""},default_shipping:(t==null?void 0:t.default_shipping)||!1,default_billing:(t==null?void 0:t.default_billing)||!1,...ft(t)},"camelCase",{})},At=t=>{var n,e;const r=((e=(n=t==null?void 0:t.data)==null?void 0:n.customer)==null?void 0:e.addresses)||[];return r.length?r.map(L).sort((i,c)=>(Number(c.defaultBilling)||Number(c.defaultShipping))-(Number(i.defaultBilling)||Number(i.defaultShipping))):[]},yt=t=>{var n,e,i,c,_,a,s,m,h,A,C,E,S,b,N,v,P,x,M,w,$,U,G,k,D,R,B;const r=(i=(e=(n=t==null?void 0:t.data)==null?void 0:n.customer)==null?void 0:e.custom_attributes)==null?void 0:i.filter(T=>T).reduce((T,y)=>{var u;const F=V(y.code);return(u=y.selected_options)!=null&&u.length?T[F]=y.selected_options[0].value??"":T[F]=y.value??"",T},{}),o={email:((_=(c=t==null?void 0:t.data)==null?void 0:c.customer)==null?void 0:_.email)||"",firstName:((s=(a=t==null?void 0:t.data)==null?void 0:a.customer)==null?void 0:s.firstname)||"",lastName:((h=(m=t==null?void 0:t.data)==null?void 0:m.customer)==null?void 0:h.lastname)||"",middleName:((C=(A=t==null?void 0:t.data)==null?void 0:A.customer)==null?void 0:C.middlename)||"",gender:((S=(E=t==null?void 0:t.data)==null?void 0:E.customer)==null?void 0:S.gender)||"1",dateOfBirth:((N=(b=t==null?void 0:t.data)==null?void 0:b.customer)==null?void 0:N.date_of_birth)||"",prefix:((P=(v=t==null?void 0:t.data)==null?void 0:v.customer)==null?void 0:P.prefix)||"",suffix:((M=(x=t==null?void 0:t.data)==null?void 0:x.customer)==null?void 0:M.suffix)||"",createdAt:(($=(w=t==null?void 0:t.data)==null?void 0:w.customer)==null?void 0:$.created_at)||"",allowRemoteShoppingAssistance:(G=(U=t==null?void 0:t.data)==null?void 0:U.customer)==null?void 0:G.allow_remote_shopping_assistance,...r};return Q(o,(B=(R=(D=(k=O==null?void 0:O.getConfig())==null?void 0:k.models)==null?void 0:D.CustomerDataModelShort)==null?void 0:R.transformer)==null?void 0:B.call(R,t.data))},Ct=t=>{var c,_;if(!((_=(c=t==null?void 0:t.data)==null?void 0:c.countries)!=null&&_.length))return{availableCountries:[],countriesWithRequiredRegion:[],optionalZipCountries:[]};const{countries:r,storeConfig:o}=t.data,n=o==null?void 0:o.countries_with_required_region.split(","),e=o==null?void 0:o.optional_zip_countries.split(",");return{availableCountries:r.filter(({two_letter_abbreviation:a,full_name_locale:s})=>!!(a&&s)).map(a=>{const{two_letter_abbreviation:s,full_name_locale:m,available_regions:h}=a,A=Array.isArray(h)&&h.length>0;return{value:s,text:m,availableRegions:A?h:void 0}}).sort((a,s)=>a.text.localeCompare(s.text)),countriesWithRequiredRegion:n,optionalZipCountries:e}},Et=t=>{var n,e;const r=(e=(n=t==null?void 0:t.data)==null?void 0:n.country)==null?void 0:e.available_regions;return r?r.filter(i=>{if(!i)return!1;const{id:c,code:_,name:a}=i;return!!(c&&_&&a)}).map(i=>{const{id:c}=i;return{id:c,text:i.name,value:`${i.code},${i.id}`}}):[]},St=(t,r="en-US",o={})=>{const n={day:"2-digit",month:"2-digit",year:"numeric"},e=/^\d{4}-\d{2}-\d{2}$/.test(t.trim()),i={...n,...e?{timeZone:"UTC"}:{},...o},c=new Date(t.trim());return isNaN(c.getTime())?"Invalid Date":new Intl.DateTimeFormat(r,i).format(c)},bt=(t,r="en-US",o={})=>{const e={...{hour:"2-digit",minute:"2-digit"},...o},i=new Date(t);return isNaN(i.getTime())?"Invalid Time":new Intl.DateTimeFormat(r,e).format(i)},p={value:0,currency:"USD"},Tt=t=>{var r,o,n,e,i,c,_,a,s,m;return{subtotal:((r=t==null?void 0:t.total)==null?void 0:r.subtotal)??p,grandTotal:((o=t==null?void 0:t.total)==null?void 0:o.grand_total)??p,grandTotalExclTax:((n=t==null?void 0:t.total)==null?void 0:n.grand_total_excl_tax)??p,totalGiftcard:((e=t==null?void 0:t.total)==null?void 0:e.total_giftcard)??p,subtotalExclTax:((i=t==null?void 0:t.total)==null?void 0:i.subtotal_excl_tax)??p,subtotalInclTax:((c=t==null?void 0:t.total)==null?void 0:c.subtotal_incl_tax)??p,taxes:((_=t==null?void 0:t.total)==null?void 0:_.taxes)??[],totalTax:((a=t==null?void 0:t.total)==null?void 0:a.total_tax)??p,totalShipping:((s=t==null?void 0:t.total)==null?void 0:s.total_shipping)??p,discounts:((m=t==null?void 0:t.total)==null?void 0:m.discounts)??[]}},pt=t=>{var e,i,c,_,a,s,m,h,A,C,E,S,b,N,v,P,x,M,w,$,U,G,k,D,R,B,T,y,F;if(!((i=(e=t.data)==null?void 0:e.customer)!=null&&i.orders))return null;const r=((_=(c=t==null?void 0:t.data)==null?void 0:c.customer)==null?void 0:_.returns)??[],n={items:(((m=(s=(a=t==null?void 0:t.data)==null?void 0:a.customer)==null?void 0:s.orders)==null?void 0:m.items)??[]).map(u=>{var z;return{adminAssistedOrder:(u==null?void 0:u.admin_assisted_order)??null,items:u==null?void 0:u.items.map(l=>{var H,Y,K;return{status:(l==null?void 0:l.status)??"",productName:(l==null?void 0:l.product_name)??"",id:l==null?void 0:l.id,quantityOrdered:(l==null?void 0:l.quantity_ordered)??0,quantityShipped:(l==null?void 0:l.quantity_shipped)??0,quantityInvoiced:(l==null?void 0:l.quantity_invoiced)??0,sku:(l==null?void 0:l.product_sku)??"",urlKey:(l==null?void 0:l.product_url_key)??"",topLevelSku:((H=l==null?void 0:l.product)==null?void 0:H.sku)??"",product:{smallImage:{url:((K=(Y=l==null?void 0:l.product)==null?void 0:Y.small_image)==null?void 0:K.url)??""}}}}),token:u==null?void 0:u.token,email:u==null?void 0:u.email,shippingMethod:u==null?void 0:u.shipping_method,paymentMethods:(u==null?void 0:u.payment_methods)??[],shipments:(u==null?void 0:u.shipments)??[],id:u==null?void 0:u.id,carrier:u==null?void 0:u.carrier,status:u==null?void 0:u.status,number:u==null?void 0:u.number,returns:(z=r==null?void 0:r.items)==null?void 0:z.filter(l=>l.order.id===u.id),orderDate:St(u.order_date),orderTime:bt(u.order_date),shippingAddress:L(u.shipping_address),billingAddress:L(u.billing_address),total:Tt(u)}}),pageInfo:{pageSize:((E=(C=(A=(h=t==null?void 0:t.data)==null?void 0:h.customer)==null?void 0:A.orders)==null?void 0:C.page_info)==null?void 0:E.page_size)??10,totalPages:((v=(N=(b=(S=t==null?void 0:t.data)==null?void 0:S.customer)==null?void 0:b.orders)==null?void 0:N.page_info)==null?void 0:v.total_pages)??1,currentPage:((w=(M=(x=(P=t==null?void 0:t.data)==null?void 0:P.customer)==null?void 0:x.orders)==null?void 0:M.page_info)==null?void 0:w.current_page)??1},totalCount:((G=(U=($=t==null?void 0:t.data)==null?void 0:$.customer)==null?void 0:U.orders)==null?void 0:G.total_count)??0,dateOfFirstOrder:((R=(D=(k=t==null?void 0:t.data)==null?void 0:k.customer)==null?void 0:D.orders)==null?void 0:R.date_of_first_order)??""};return Q(n,(F=(y=(T=(B=O==null?void 0:O.getConfig())==null?void 0:B.models)==null?void 0:T.OrderHistoryModel)==null?void 0:y.transformer)==null?void 0:F.call(y,t.data))},Rt=t=>{var r,o,n,e,i,c,_,a,s,m,h,A,C,E,S,b;return{baseMediaUrl:(o=(r=t==null?void 0:t.data)==null?void 0:r.storeConfig)==null?void 0:o.base_media_url,minLength:+((e=(n=t==null?void 0:t.data)==null?void 0:n.storeConfig)==null?void 0:e.minimum_password_length)||3,requiredCharacterClasses:+((c=(i=t==null?void 0:t.data)==null?void 0:i.storeConfig)==null?void 0:c.required_character_classes_number)||0,storeCode:((a=(_=t==null?void 0:t.data)==null?void 0:_.storeConfig)==null?void 0:a.store_code)??"",shoppingAssistanceEnabled:((m=(s=t==null?void 0:t.data)==null?void 0:s.storeConfig)==null?void 0:m.shopping_assistance_enabled)??!1,shoppingAssistanceCheckboxTitle:((A=(h=t==null?void 0:t.data)==null?void 0:h.storeConfig)==null?void 0:A.shopping_assistance_checkbox_title)||"",shoppingAssistanceCheckboxTooltip:((E=(C=t==null?void 0:t.data)==null?void 0:C.storeConfig)==null?void 0:E.shopping_assistance_checkbox_tooltip)||"",b2bEnabled:((b=(S=t==null?void 0:t.data)==null?void 0:S.storeConfig)==null?void 0:b.b2b_enabled)??!1}},Cr=t=>({firstName:t.firstName,lastName:t.lastName,emailAddress:(t==null?void 0:t.email)||"",accountId:(t==null?void 0:t.email)||""}),Ot={VI:"Visa",MC:"Mastercard",MD:"Maestro",AE:"American Express",DI:"Discover",DN:"Diners",JCB:"JCB",UN:"UnionPay",VISA:"Visa",MASTERCARD:"Mastercard",MAESTRO:"Maestro",AMEX:"American Express",AMERICAN_EXPRESS:"American Express",DISCOVER:"Discover",DINERS:"Diners",DINERS_CLUB:"Diners",UNIONPAY:"UnionPay"};function It(t){try{return JSON.parse(t)}catch{return null}}function Z(t){return t.trim().toUpperCase().replaceAll(/\s+/g,"_")}function J(t){return!(t!=null&&t.trim())||Z(t)==="UNKNOWN"}function j(t){if(t!=null&&t.trim())return Ot[Z(t)]}function Nt(t){return t.replaceAll("_"," ").toLowerCase().split(/\s+/).filter(Boolean).map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join(" ")}function vt(t,r){var e,i;const o=(e=t==null?void 0:t.brand)==null?void 0:e.trim(),n=(i=t==null?void 0:t.type)==null?void 0:i.trim();if(!J(o)){const c=j(o);return c||Nt(o)}if(!J(n)){const c=j(n);return c||n}return r.payment_method_code}function Pt(t){if(!t)return!1;const r=/^(\d{1,2})\/(\d{4})$/.exec(t.trim());if(!r)return!1;const o=Number.parseInt(r[1],10),n=Number.parseInt(r[2],10);if(o<1||o>12)return!1;const e=new Date(n,o,0,23,59,59,999);return Date.now()>e.getTime()}function xt(t,r){return r.some(o=>t.payment_method_code===o||t.payment_method_code.startsWith(`${o}_`))}function Mt(t,r){var n;const o=e=>{if(!e)return"";const i=e.replaceAll(/\D/g,"");return i.length>=4?i.slice(-4):""};if(t){const e=o(t.maskedCC)||o(t.lastFour)||o(t.last_four)||o(t.ccLast4)||o(t.cc_last4);if(e)return e}return((n=r.match(/\d{4}/g))==null?void 0:n.at(-1))??""}function wt(t){const r=t.replaceAll(/[^a-zA-Z0-9]/g,"");return r.length>=4?r.slice(-4).toUpperCase():r.padEnd(4,"0").slice(0,4).toUpperCase()}function $t(t){if(!t.public_hash)return null;const r=It(t.details),o=vt(r,t),n=Mt(r,t.details)||wt(t.public_hash);return{publicHash:t.public_hash,cardBrand:o,lastFourDigits:n,expired:Pt(r==null?void 0:r.expirationDate)}}function Ut(t,r){return(r!=null&&r.length?t.filter(n=>xt(n,r)):t).map(n=>$t(n)).filter(n=>n!==null)}function Gt(t){var o,n,e,i,c,_;const r=(n=(o=t==null?void 0:t.data)==null?void 0:o.customer)==null?void 0:n.admin_assistance_actions;return r?{totalCount:r.total_count||0,items:((e=r.items)==null?void 0:e.map(a=>({action:a.action||"",date:a.date||"",details:a.details||""})))||[],pageInfo:{currentPage:((i=r.page_info)==null?void 0:i.current_page)||1,pageSize:((c=r.page_info)==null?void 0:c.page_size)||10,totalPages:((_=r.page_info)==null?void 0:_.total_pages)||1}}:null}const kt=t=>"address_type"in t||"country_code"in t,Dt=t=>[...t.custom_attributes??[],...t.extension_attributes??[]].filter(o=>!!(o!=null&&o.code||o!=null&&o.attribute_code)).map(o=>({code:o.code||o.attribute_code||"",value:o.value==null?"":String(o.value)})),Bt=t=>{var r,o,n;return{firstname:t.firstname??"",lastname:t.lastname??"",middlename:t.middlename??"",prefix:t.prefix??"",suffix:t.suffix??"",city:t.city??"",company:t.company??"",country_code:t.country_code??"",region:{region:((r=t.region)==null?void 0:r.region)??"",region_code:((o=t.region)==null?void 0:o.region_code)??"",region_id:((n=t.region)==null?void 0:n.region_id)??t.region_id??""},telephone:t.telephone??"",id:t.id??"",vat_id:t.vat_id??"",postcode:t.postcode??"",street:t.street??[],default_shipping:t.address_type==="SHIPPING"?t.is_default??!1:!1,default_billing:t.address_type==="BILLING"?t.is_default??!1:!1,custom_attributesV2:Dt(t),fax:t.fax??"",uid:t.uid??""}},q=t=>{if(!t)return{};const r=kt(t)?Bt(t):t;return L(r)},Ft=t=>{var c,_,a,s;const r=(c=t==null?void 0:t.data)==null?void 0:c.company,o=r==null?void 0:r.addresses,n=((o==null?void 0:o.items)??[]).map(m=>q(m)),e=(r==null?void 0:r.address_book_enabled)??!0,i=(r==null?void 0:r.address_book_custom_shipping_address_enabled)??!0;return{addressBookEnabled:e,addressBookCustomShippingAddressEnabled:i,addresses:{items:n,pageInfo:{currentPage:((_=o==null?void 0:o.page_info)==null?void 0:_.current_page)??1,pageSize:((a=o==null?void 0:o.page_info)==null?void 0:a.page_size)??n.length,totalPages:((s=o==null?void 0:o.page_info)==null?void 0:s.total_pages)??1},totalCount:(o==null?void 0:o.total_count)??n.length}}},Er=async t=>{const r=`_account_attributesForm_${t}`,o=sessionStorage.getItem(r);return o?JSON.parse(o):await d(t!=="shortRequest"?it:ct,{method:"GET",cache:"force-cache",variables:{formCode:t}}).then(n=>{var i;if((i=n.errors)!=null&&i.length)return g(n.errors);const e=dt(n);return sessionStorage.setItem(r,JSON.stringify(e)),e}).catch(f)},Lt=`
  mutation CREATE_CUSTOMER_ADDRESS($input: CustomerAddressInput!) {
    createCustomerAddress(input: $input) {
      firstname
      uid
    }
  }
`,Sr=async t=>await d(Lt,{method:"POST",variables:{input:I(t,"snakeCase",{custom_attributesV2:"custom_attributesV2",firstName:"firstname",lastName:"lastname",middleName:"middlename"})}}).then(r=>{var n,e;if((n=r.errors)!=null&&n.length)return g(r.errors);const o=(e=r==null?void 0:r.data)==null?void 0:e.createCustomerAddress;return{firstname:(o==null?void 0:o.firstname)??"",uid:(o==null?void 0:o.uid)??""}}).catch(f),qt=`
  mutation CREATE_COMPANY_ADDRESS($input: CompanyAddressInput!) {
    createCompanyAddress(input: $input) {
      id
      company_id
      address_type
      is_default
      company
      city
      country_code
      street
      telephone
      postcode
      firstname
      lastname
      middlename
      nickname
      prefix
      suffix
      fax
      vat_id
      region_id
      region {
        region
        region_code
        region_id
      }
      custom_attributes {
        ... on AttributeValue {
          code
          value
        }
      }
      extension_attributes {
        attribute_code
        value
      }
    }
  }
`,Vt=t=>{const r=[t.street,t.streetMultiline_2].filter(n=>!!n),o=t.region?{region:t.region.region||"",region_code:t.region.regionCode||"",region_id:typeof t.region.regionId=="string"?Number(t.region.regionId):t.region.regionId}:void 0;return{company:t.company||"",address_type:t.defaultBilling&&!t.defaultShipping?"BILLING":"SHIPPING",is_default:!!(t.defaultShipping||t.defaultBilling),city:t.city||"",country_code:t.countryCode||"",region:o,street:r,telephone:t.telephone||"",postcode:t.postcode||"",firstname:t.firstName||"",lastname:t.lastName||"",vat_id:t.vatId||""}},br=async t=>await d(qt,{method:"POST",variables:{input:Vt(t)}}).then(r=>{var o,n;return console.log("[Account][API][createCompanyAddress] response",r),(o=r.errors)!=null&&o.length?g(r.errors):q((n=r==null?void 0:r.data)==null?void 0:n.createCompanyAddress)}).catch(r=>(console.error("[Account][API][createCompanyAddress] network error",r),f(r))),zt=`
  mutation UPDATE_COMPANY_ADDRESS($id: ID!, $input: CompanyAddressInput!) {
    updateCompanyAddress(id: $id, input: $input) {
      id
      company_id
      address_type
      is_default
      company
      city
      country_code
      street
      telephone
      postcode
      firstname
      lastname
      middlename
      nickname
      prefix
      suffix
      fax
      vat_id
      region_id
      region {
        region
        region_code
        region_id
      }
      custom_attributes {
        ... on AttributeValue {
          code
          value
        }
      }
      extension_attributes {
        attribute_code
        value
      }
    }
  }
`,Ht=t=>{const r=[t.street,t.streetMultiline_2].filter(n=>!!n),o=t.region?{region:t.region.region||"",region_code:t.region.regionCode||"",region_id:typeof t.region.regionId=="string"?Number(t.region.regionId):t.region.regionId}:void 0;return{company:t.company||"",address_type:t.defaultBilling&&!t.defaultShipping?"BILLING":"SHIPPING",is_default:!!(t.defaultShipping||t.defaultBilling),city:t.city||"",country_code:t.countryCode||"",region:o,street:r,telephone:t.telephone||"",postcode:t.postcode||"",firstname:t.firstName||"",lastname:t.lastName||"",vat_id:t.vatId||""}},Tr=async(t,r)=>t?await d(zt,{method:"POST",variables:{id:t,input:Ht(r)}}).then(o=>{var n,e;return console.log("[Account][API][updateCompanyAddress] response",o),(n=o.errors)!=null&&n.length?g(o.errors):q((e=o==null?void 0:o.data)==null?void 0:e.updateCompanyAddress)}).catch(o=>(console.error("[Account][API][updateCompanyAddress] network error",o),f(o))):{},Yt=`
  mutation DELETE_COMPANY_ADDRESS($id: ID!) {
    deleteCompanyAddress(id: $id)
  }
`,pr=async t=>await d(Yt,{method:"POST",variables:{id:t}}).then(r=>{var o,n;return console.log("[Account][API][deleteCompanyAddress] response",r),(o=r.errors)!=null&&o.length?g(r.errors):!!((n=r==null?void 0:r.data)!=null&&n.deleteCompanyAddress)}).catch(r=>(console.error("[Account][API][deleteCompanyAddress] network error",r),f(r))),Kt=`
  mutation SET_DEFAULT_COMPANY_ADDRESS($id: ID!) {
    setDefaultCompanyAddress(id: $id) {
      id
      company_id
      address_type
      is_default
      company
      city
      country_code
      street
      telephone
      postcode
      firstname
      lastname
      middlename
      nickname
      prefix
      suffix
      fax
      vat_id
      region_id
      region {
        region
        region_code
        region_id
      }
      custom_attributes {
        ... on AttributeValue {
          code
          value
        }
      }
      extension_attributes {
        attribute_code
        value
      }
    }
  }
`,Rr=async t=>t?await d(Kt,{method:"POST",variables:{id:t}}).then(r=>{var o,n;return console.log("[Account][API][setDefaultCompanyAddress] response",r),(o=r.errors)!=null&&o.length?g(r.errors):q((n=r==null?void 0:r.data)==null?void 0:n.setDefaultCompanyAddress)}).catch(r=>(console.error("[Account][API][setDefaultCompanyAddress] network error",r),f(r))):{},Jt=`
  query GET_COMPANY_ADDRESS_BOOK {
    company {
      default_billing_address {
        id
        company_id
        address_type
        is_default
        company
        city
        country_code
        street
        telephone
        postcode
        firstname
        lastname
        middlename
        nickname
        prefix
        suffix
        fax
        vat_id
        region_id
        region {
          region
          region_code
          region_id
        }
        custom_attributes {
          ... on AttributeValue {
            code
            value
          }
        }
        extension_attributes {
          attribute_code
          value
        }
      }
      default_shipping_address {
        id
        company_id
        address_type
        is_default
        company
        city
        country_code
        street
        telephone
        postcode
        firstname
        lastname
        middlename
        nickname
        prefix
        suffix
        fax
        vat_id
        region_id
        region {
          region
          region_code
          region_id
        }
        custom_attributes {
          ... on AttributeValue {
            code
            value
          }
        }
        extension_attributes {
          attribute_code
          value
        }
      }
      addresses {
        items {
          id
          company_id
          address_type
          is_default
          company
          city
          country_code
          street
          telephone
          postcode
          firstname
          lastname
          middlename
          nickname
          prefix
          suffix
          fax
          vat_id
          region_id
          region {
            region
            region_code
            region_id
          }
          custom_attributes {
            ... on AttributeValue {
              code
              value
            }
          }
          extension_attributes {
            attribute_code
            value
          }
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
`,Or=async()=>await d(Jt,{method:"GET",cache:"no-cache"}).then(t=>{var r;return console.log("[Account][API][getCompanyAddressBook] response",t),(r=t.errors)!=null&&r.length?g(t.errors):Ft(t)}).catch(t=>(console.error("[Account][API][getCompanyAddressBook] network error",t),f(t))),jt=`
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
`,Ir=async()=>await d(jt,{method:"GET",cache:"no-cache"}).then(t=>{var r;return(r=t.errors)!=null&&r.length?g(t.errors):At(t)}).catch(f),Qt=`
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
`,Nr=async()=>{const t="_account_countries",r=sessionStorage.getItem(t);return r?JSON.parse(r):await d(Qt,{method:"GET",cache:"no-cache"}).then(o=>{var e;if((e=o.errors)!=null&&e.length)return g(o.errors);const n=Ct(o);return sessionStorage.setItem(t,JSON.stringify(n)),n}).catch(f)},Wt=`
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
`,vr=async t=>{const r=`_account_regions_${t}`,o=sessionStorage.getItem(r);return o?JSON.parse(o):await d(Wt,{method:"GET",cache:"no-cache",variables:{countryCode:t}}).then(n=>{var i;if((i=n.errors)!=null&&i.length)return g(n.errors);const e=Et(n);return sessionStorage.setItem(r,JSON.stringify(e)),e}).catch(f)},Zt=`
  mutation UPDATE_CUSTOMER_ADDRESS($id: Int!, $input: CustomerAddressInput) {
    updateCustomerAddress(id: $id, input: $input) {
      firstname
    }
  }
`,Pr=async t=>{const{addressId:r,...o}=t;return r?await d(Zt,{method:"POST",variables:{id:Number(r),input:I(o,"snakeCase",{custom_attributesV2:"custom_attributesV2",firstName:"firstname",lastName:"lastname",middleName:"middlename"})}}).then(n=>{var e,i,c;return(e=n.errors)!=null&&e.length?g(n.errors):((c=(i=n==null?void 0:n.data)==null?void 0:i.updateCustomerAddress)==null?void 0:c.firstname)||""}).catch(f):""},Xt=`
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
  ${ot}
`,xr=async()=>await d(Xt,{method:"GET",cache:"no-cache"}).then(t=>{var r;return(r=t.errors)!=null&&r.length?g(t.errors):yt(t)}).catch(f),tr=`
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
`,Mr=async(t,r)=>await d(tr,{method:"GET",cache:"no-cache",variables:{pageSize:t,currentPage:r}}).then(o=>{var n;return(n=o.errors)!=null&&n.length?g(o.errors):Gt(o)}).catch(f),rr=`
  mutation REMOVE_CUSTOMER_ADDRESS($id: Int!) {
    deleteCustomerAddress(id: $id)
  }
`,wr=async t=>await d(rr,{method:"POST",variables:{id:t}}).then(r=>{var o;return(o=r.errors)!=null&&o.length?g(r.errors):r.data.deleteCustomerAddress}).catch(f),or=`
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
`,$r=async t=>await d(or,{method:"GET",cache:"no-cache"}).then(r=>{var n,e,i;if((n=r.errors)!=null&&n.length)return g(r.errors);const o=((i=(e=r.data)==null?void 0:e.customerPaymentTokens)==null?void 0:i.items)??[];return Ut(o,t)}).catch(f),nr=`
  mutation deletePaymentToken($public_hash: String!) {
    deletePaymentToken(public_hash: $public_hash) {
      result
    }
  }
`,Ur=async t=>await d(nr,{method:"POST",variables:{public_hash:t}}).then(r=>{var o,n,e;return(o=r.errors)!=null&&o.length?g(r.errors):!!((e=(n=r.data)==null?void 0:n.deletePaymentToken)!=null&&e.result)}).catch(f),er=`
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
  ${nt}
  ${et}
  ${at}
`,ar={sort_direction:"DESC",sort_field:"CREATED_AT"},Gr=async(t,r,o)=>{const n=r.includes("viewAll")?{}:{order_date:JSON.parse(r)};return await d(er,{method:"GET",cache:"no-cache",variables:{pageSize:t,currentPage:o,filter:n,sort:ar}}).then(e=>pt(e)).catch(f)},ir=`
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
`,kr=async({currentPassword:t,newPassword:r})=>await d(ir,{method:"POST",variables:{currentPassword:t,newPassword:r}}).then(o=>{var n,e,i;return(n=o.errors)!=null&&n.length?g(o.errors):((i=(e=o==null?void 0:o.data)==null?void 0:e.changeCustomerPassword)==null?void 0:i.email)||""}).catch(f),cr=`
  query GET_STORE_CONFIG {
    storeConfig {
      base_media_url
      autocomplete_on_storefront
      minimum_password_length
      required_character_classes_number
      store_code
      b2b_enabled
      shopping_assistance_enabled
      shopping_assistance_checkbox_title
      shopping_assistance_checkbox_tooltip
    }
  }
`,Dr=async()=>await d(cr,{method:"GET",cache:"force-cache"}).then(t=>{var r;return(r=t.errors)!=null&&r.length?g(t.errors):Rt(t)}).catch(f),ur=`
  mutation UPDATE_CUSTOMER_EMAIL($email: String!, $password: String!) {
    updateCustomerEmail(email: $email, password: $password) {
      customer {
        email
      }
    }
  }
`,Br=async({email:t,password:r})=>await d(ur,{method:"POST",variables:{email:t,password:r}}).then(o=>{var n,e,i,c;return(n=o.errors)!=null&&n.length?g(o.errors):((c=(i=(e=o==null?void 0:o.data)==null?void 0:e.updateCustomerEmail)==null?void 0:i.customer)==null?void 0:c.email)||""}).catch(f),lr=`
  mutation UPDATE_CUSTOMER_V2($input: CustomerUpdateInput!) {
    updateCustomerV2(input: $input) {
      customer {
        email
        allow_remote_shopping_assistance
      }
    }
  }
`,Fr=async t=>await d(lr,{method:"POST",variables:{input:I(t,"snakeCase",{firstName:"firstname",lastName:"lastname",middleName:"middlename",dob:"date_of_birth",custom_attributesV2:"custom_attributes"})}}).then(r=>{var o,n,e,i;return(o=r.errors)!=null&&o.length?g(r.errors):((i=(e=(n=r==null?void 0:r.data)==null?void 0:n.updateCustomerV2)==null?void 0:e.customer)==null?void 0:i.email)||""}).catch(f);export{ut as a,V as b,I as c,O as config,br as createCompanyAddress,Sr as createCustomerAddress,pr as deleteCompanyAddress,Ur as deletePaymentToken,d as fetchGraphQl,Mr as getAdminAssistanceActions,Er as getAttributesForm,Or as getCompanyAddressBook,yr as getConfig,Nr as getCountries,xr as getCustomer,Ir as getCustomerAddress,$r as getCustomerPaymentTokens,Gr as getOrderHistoryList,vr as getRegions,Dr as getStoreConfig,W as initialize,wr as removeCustomerAddress,hr as removeFetchGraphQlHeader,Rr as setDefaultCompanyAddress,gr as setEndpoint,mr as setFetchGraphQlHeader,Ar as setFetchGraphQlHeaders,Cr as t,Tr as updateCompanyAddress,Fr as updateCustomer,Pr as updateCustomerAddress,Br as updateCustomerEmail,kr as updateCustomerPassword};
//# sourceMappingURL=api.js.map
