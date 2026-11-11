/*! Copyright 2026 Adobe
All Rights Reserved. */
import{Initializer as _t,merge as V}from"@dropins/tools/lib.js";import{events as ft}from"@dropins/tools/event-bus.js";import{FetchGraphQL as gt}from"@dropins/tools/fetch-graphql.js";import{COMPANY_ADDRESS_FRAGMENT as K,BASIC_CUSTOMER_INFO_FRAGMENT as mt,CUSTOMER_ORDER_FRAGMENT as ht,ADDRESS_FRAGMENT as At,ORDER_SUMMARY_FRAGMENT as Et}from"./fragments.js";const ct=new _t({init:async t=>{const e={authHeaderConfig:{header:"Authorization",tokenPrefix:"Bearer"}};ct.config.setConfig({...e,...t})},listeners:()=>[]}),M=ct.config,{setEndpoint:zr,setFetchGraphQlHeader:Vr,removeFetchGraphQlHeader:Hr,setFetchGraphQlHeaders:Kr,fetchGraphQl:f,getConfig:Wr}=new gt().getMethods(),St=`
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
`,pt=`
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
`,g=t=>{throw t instanceof DOMException&&t.name==="AbortError"||ft.emit("error",{source:"auth",type:"network",error:t}),t},m=t=>{const e=t.map(r=>r.message).join(" ");throw Error(e)},J=t=>t.replace(/_([a-z])/g,(e,r)=>r.toUpperCase()),yt=t=>t.replace(/([A-Z])/g,e=>`_${e.toLowerCase()}`),P=(t,e,r)=>{const n=["string","boolean","number"],a=e==="camelCase"?J:yt;return Array.isArray(t)?t.map(i=>n.includes(typeof i)||i===null?i:typeof i=="object"?P(i,e,r):i):t!==null&&typeof t=="object"?Object.entries(t).reduce((i,[c,s])=>{const o=r&&r[c]?r[c]:a(c);return i[o]=n.includes(typeof s)||s===null?s:P(s,e,r),i},{}):t},Ct=t=>{const e=[];for(const r of t)if(!(r.frontend_input!=="MULTILINE"||r.multiline_count<2))for(let n=2;n<=r.multiline_count;n++){const a={...r,is_required:!1,name:`${r.code}_multiline_${n}`,code:`${r.code}_multiline_${n}`,id:`${r.code}_multiline_${n}`};e.push(a)}return e},Tt=t=>{switch(t){case"middlename":return"middleName";case"firstname":return"firstName";case"lastname":return"lastName";default:return J(t)}},bt=t=>{var e;return t!=null&&t.options?(e=t==null?void 0:t.options)==null?void 0:e.map(r=>({isDefault:(r==null?void 0:r.is_default)??!1,text:(r==null?void 0:r.label)??"",value:(r==null?void 0:r.value)??""})):[]},Rt=t=>{var i,c,s;const e=((c=(i=t==null?void 0:t.data)==null?void 0:i.attributesForm)==null?void 0:c.items)||[];if(!e.length)return[];const r=(s=e.filter(o=>{var l;return!((l=o.frontend_input)!=null&&l.includes("HIDDEN"))}))==null?void 0:s.map(({code:o,...l})=>{const _=o!=="country_id"?o:"country_code";return{...l,name:_,id:_,code:_}}),n=Ct(r);return r.concat(n).map(o=>({code:o==null?void 0:o.code,name:o==null?void 0:o.name,id:o==null?void 0:o.id,label:(o==null?void 0:o.label)??"",entityType:o==null?void 0:o.entity_type,className:(o==null?void 0:o.frontend_class)??"",defaultValue:(o==null?void 0:o.default_value)??"",fieldType:o==null?void 0:o.frontend_input,multilineCount:(o==null?void 0:o.multiline_count)??0,orderNumber:Number(o==null?void 0:o.sort_order)||0,isHidden:!1,isUnique:(o==null?void 0:o.is_unique)??!1,required:(o==null?void 0:o.is_required)??!1,validateRules:(o==null?void 0:o.validate_rules)??[],options:bt(o),customUpperCode:Tt(o==null?void 0:o.code)})).sort((o,l)=>Number(o.orderNumber)-Number(l.orderNumber))},It=t=>{const e={};for(const r in t){const n=t[r];!Array.isArray(n)||n.length===0||(r==="custom_attributesV2"?n.forEach(a=>{typeof a=="object"&&"value"in a&&(e[a==null?void 0:a.code]=a==null?void 0:a.value)}):n.length>1?n.forEach((a,i)=>{i===0?e[r]=a:e[`${r}_multiline_${i+1}`]=a}):e[r]=n[0])}return e},Ot=t=>({prefix:(t==null?void 0:t.prefix)??"",suffix:(t==null?void 0:t.suffix)??"",firstname:(t==null?void 0:t.firstname)??"",lastname:(t==null?void 0:t.lastname)??"",nickname:(t==null?void 0:t.nickname)??"",middlename:(t==null?void 0:t.middlename)??""}),Nt=t=>({id:(t==null?void 0:t.id)??"",vat_id:(t==null?void 0:t.vat_id)??"",postcode:(t==null?void 0:t.postcode)??"",country_code:(t==null?void 0:t.country_code)??"",uid:(t==null?void 0:t.uid)??""}),Mt=t=>({company:(t==null?void 0:t.company)??"",telephone:(t==null?void 0:t.telephone)??"",fax:(t==null?void 0:t.fax)??""}),H=t=>{var n,a,i;const e=t==null?void 0:t.address_type;return P({...Ot(t),...Nt(t),...Mt(t),...e?{address_type:e}:{},city:(t==null?void 0:t.city)??"",region:{region:((n=t==null?void 0:t.region)==null?void 0:n.region)??"",region_code:((a=t==null?void 0:t.region)==null?void 0:a.region_code)??"",region_id:((i=t==null?void 0:t.region)==null?void 0:i.region_id)??""},default_shipping:(t==null?void 0:t.default_shipping)||!1,default_billing:(t==null?void 0:t.default_billing)||!1,...It(t)},"camelCase",{})},wt=t=>{var n,a;const e=((a=(n=t==null?void 0:t.data)==null?void 0:n.customer)==null?void 0:a.addresses)||[];return e.length?e.map(H).sort((i,c)=>(Number(c.defaultBilling)||Number(c.defaultShipping))-(Number(i.defaultBilling)||Number(i.defaultShipping))):[]},vt=t=>{var n,a,i,c,s,o,l,_,E,A,h,T,p,b,y,S,R,G,k,U,x,$,F,B,L,w,q;const e=(i=(a=(n=t==null?void 0:t.data)==null?void 0:n.customer)==null?void 0:a.custom_attributes)==null?void 0:i.filter(O=>O).reduce((O,I)=>{var u;const Y=J(I.code);return(u=I.selected_options)!=null&&u.length?O[Y]=I.selected_options[0].value??"":O[Y]=I.value??"",O},{}),r={email:((s=(c=t==null?void 0:t.data)==null?void 0:c.customer)==null?void 0:s.email)||"",firstName:((l=(o=t==null?void 0:t.data)==null?void 0:o.customer)==null?void 0:l.firstname)||"",lastName:((E=(_=t==null?void 0:t.data)==null?void 0:_.customer)==null?void 0:E.lastname)||"",middleName:((h=(A=t==null?void 0:t.data)==null?void 0:A.customer)==null?void 0:h.middlename)||"",gender:((p=(T=t==null?void 0:t.data)==null?void 0:T.customer)==null?void 0:p.gender)||"1",dateOfBirth:((y=(b=t==null?void 0:t.data)==null?void 0:b.customer)==null?void 0:y.date_of_birth)||"",prefix:((R=(S=t==null?void 0:t.data)==null?void 0:S.customer)==null?void 0:R.prefix)||"",suffix:((k=(G=t==null?void 0:t.data)==null?void 0:G.customer)==null?void 0:k.suffix)||"",createdAt:((x=(U=t==null?void 0:t.data)==null?void 0:U.customer)==null?void 0:x.created_at)||"",allowRemoteShoppingAssistance:(F=($=t==null?void 0:t.data)==null?void 0:$.customer)==null?void 0:F.allow_remote_shopping_assistance,...e};return V(r,(q=(w=(L=(B=M==null?void 0:M.getConfig())==null?void 0:B.models)==null?void 0:L.CustomerDataModelShort)==null?void 0:w.transformer)==null?void 0:q.call(w,t.data))},ut=(t,e="en-US",r={})=>{const n={day:"2-digit",month:"2-digit",year:"numeric"},a=/^\d{4}-\d{2}-\d{2}$/.test(t.trim()),i={...n,...a?{timeZone:"UTC"}:{},...r},c=new Date(t.trim());return isNaN(c.getTime())?"Invalid Date":new Intl.DateTimeFormat(e,i).format(c)},Dt=t=>{const e=t.slice(0,10),r=new Date(`${e}T00:00:00Z`);return!/^\d{4}-\d{2}-\d{2}$/.test(e)||!Number.isFinite(r.getTime())||r.toISOString().slice(0,10)!==e?null:ut(e,void 0,{day:"numeric",month:"short",year:"numeric",timeZone:"UTC"})},v=t=>typeof t=="object"&&t!==null&&!Array.isArray(t);function Pt(t){var i,c,s;if(!v(t)||!Array.isArray(t.items)||!v(t.page_info))throw new Error("Invalid customer reviews response.");const{current_page:e,page_size:r,total_pages:n}=t.page_info;if(typeof e!="number"||!Number.isSafeInteger(e)||e<1||typeof r!="number"||!Number.isSafeInteger(r)||r<1||typeof n!="number"||!Number.isSafeInteger(n)||n<0||t.items.length>r||t.items.length>0&&e>n)throw new Error("Invalid customer reviews page information.");const a=t.items.map(o=>{var T,p,b;if(!v(o)||typeof o.nickname!="string"||typeof o.summary!="string"||typeof o.text!="string"||typeof o.created_at!="string"||typeof o.average_rating!="number"||!Number.isFinite(o.average_rating)||o.average_rating<0||o.average_rating>100)throw new Error("Invalid customer review.");let l=null;if(o.product!==null&&o.product!==void 0)if(!v(o.product)||typeof o.product.sku!="string"||!o.product.sku.trim()||typeof o.product.name!="string"||!o.product.name.trim())console.warn("[Account Reviews] Invalid review product.");else{let y=null;if(o.product.thumbnail!==null&&o.product.thumbnail!==void 0){const S=o.product.thumbnail;if(!v(S)||typeof S.url!="string")console.warn("[Account Reviews] Invalid product thumbnail.");else try{const R=new URL(S.url);if(!["https:","http:"].includes(R.protocol))throw new TypeError("Expected an HTTP product thumbnail.");y={url:R.href,label:typeof S.label=="string"&&S.label.trim()?S.label:o.product.name}}catch(R){if(!(R instanceof TypeError))throw R;console.warn("[Account Reviews] Invalid product thumbnail.",R)}}l={sku:o.product.sku,name:o.product.name,urlKey:typeof o.product.url_key=="string"&&o.product.url_key.trim()?o.product.url_key:null,thumbnail:y}}const _=[];Array.isArray(o.ratings_breakdown)?o.ratings_breakdown.forEach(y=>{if(!v(y)||typeof y.name!="string"||typeof y.value!="string"||!y.value.trim()){console.warn("[Account Reviews] Invalid rating criterion.");return}const S=Number(y.value);if(!Number.isFinite(S)||S<1||S>5){console.warn("[Account Reviews] Invalid rating criterion score.");return}_.push({name:y.name,value:S})}):console.warn("[Account Reviews] Missing rating criteria.");const E={nickname:o.nickname,summary:o.summary,text:o.text,createdAt:o.created_at,createdDate:null,rating:o.average_rating===0&&!_.length?null:o.average_rating/20,ratingsBreakdown:_,product:l},A=(b=(p=(T=M.getConfig().models)==null?void 0:T.CustomerReviewModel)==null?void 0:p.transformer)==null?void 0:b.call(p,o),h=V(E,A);return(A==null?void 0:A.createdDate)===void 0&&(h.createdDate=Dt(h.createdAt)),h});return V({items:a,pageInfo:{currentPage:e,pageSize:r,totalPages:n}},(s=(c=(i=M.getConfig().models)==null?void 0:i.CustomerReviewsModel)==null?void 0:c.transformer)==null?void 0:s.call(c,t))}const Gt=t=>{var c,s;if(!((s=(c=t==null?void 0:t.data)==null?void 0:c.countries)!=null&&s.length))return{availableCountries:[],countriesWithRequiredRegion:[],optionalZipCountries:[]};const{countries:e,storeConfig:r}=t.data,n=r==null?void 0:r.countries_with_required_region.split(","),a=r==null?void 0:r.optional_zip_countries.split(",");return{availableCountries:e.filter(({two_letter_abbreviation:o,full_name_locale:l})=>!!(o&&l)).map(o=>{const{two_letter_abbreviation:l,full_name_locale:_,available_regions:E}=o,A=Array.isArray(E)&&E.length>0;return{value:l,text:_,availableRegions:A?E:void 0}}).sort((o,l)=>o.text.localeCompare(l.text)),countriesWithRequiredRegion:n,optionalZipCountries:a}},kt=t=>{var n,a;const e=(a=(n=t==null?void 0:t.data)==null?void 0:n.country)==null?void 0:a.available_regions;return e?e.filter(i=>{if(!i)return!1;const{id:c,code:s,name:o}=i;return!!(c&&s&&o)}).map(i=>{const{id:c}=i;return{id:c,text:i.name,value:`${i.code},${i.id}`}}):[]},Ut=(t,e="en-US",r={})=>{const a={...{hour:"2-digit",minute:"2-digit"},...r},i=new Date(t);return isNaN(i.getTime())?"Invalid Time":new Intl.DateTimeFormat(e,a).format(i)},N={value:0,currency:"USD"},xt=t=>{var e,r,n,a,i,c,s,o,l,_;return{subtotal:((e=t==null?void 0:t.total)==null?void 0:e.subtotal)??N,grandTotal:((r=t==null?void 0:t.total)==null?void 0:r.grand_total)??N,grandTotalExclTax:((n=t==null?void 0:t.total)==null?void 0:n.grand_total_excl_tax)??N,totalGiftcard:((a=t==null?void 0:t.total)==null?void 0:a.total_giftcard)??N,subtotalExclTax:((i=t==null?void 0:t.total)==null?void 0:i.subtotal_excl_tax)??N,subtotalInclTax:((c=t==null?void 0:t.total)==null?void 0:c.subtotal_incl_tax)??N,taxes:((s=t==null?void 0:t.total)==null?void 0:s.taxes)??[],totalTax:((o=t==null?void 0:t.total)==null?void 0:o.total_tax)??N,totalShipping:((l=t==null?void 0:t.total)==null?void 0:l.total_shipping)??N,discounts:((_=t==null?void 0:t.total)==null?void 0:_.discounts)??[]}},$t=t=>{var a,i,c,s,o,l,_,E,A,h,T,p,b,y,S,R,G,k,U,x,$,F,B,L,w,q,O,I,Y;if(!((i=(a=t.data)==null?void 0:a.customer)!=null&&i.orders))return null;const e=((s=(c=t==null?void 0:t.data)==null?void 0:c.customer)==null?void 0:s.returns)??[],n={items:(((_=(l=(o=t==null?void 0:t.data)==null?void 0:o.customer)==null?void 0:l.orders)==null?void 0:_.items)??[]).map(u=>{var Z;return{adminAssistedOrder:(u==null?void 0:u.admin_assisted_order)??null,items:u==null?void 0:u.items.map(d=>{var X,tt,rt;return{status:(d==null?void 0:d.status)??"",productName:(d==null?void 0:d.product_name)??"",id:d==null?void 0:d.id,quantityOrdered:(d==null?void 0:d.quantity_ordered)??0,quantityShipped:(d==null?void 0:d.quantity_shipped)??0,quantityInvoiced:(d==null?void 0:d.quantity_invoiced)??0,sku:(d==null?void 0:d.product_sku)??"",urlKey:(d==null?void 0:d.product_url_key)??"",topLevelSku:((X=d==null?void 0:d.product)==null?void 0:X.sku)??"",product:{smallImage:{url:((rt=(tt=d==null?void 0:d.product)==null?void 0:tt.small_image)==null?void 0:rt.url)??""}}}}),token:u==null?void 0:u.token,email:u==null?void 0:u.email,shippingMethod:u==null?void 0:u.shipping_method,paymentMethods:(u==null?void 0:u.payment_methods)??[],shipments:(u==null?void 0:u.shipments)??[],id:u==null?void 0:u.id,carrier:u==null?void 0:u.carrier,status:u==null?void 0:u.status,number:u==null?void 0:u.number,returns:(Z=e==null?void 0:e.items)==null?void 0:Z.filter(d=>d.order.id===u.id),orderDate:ut(u.order_date),orderTime:Ut(u.order_date),shippingAddress:H(u.shipping_address),billingAddress:H(u.billing_address),total:xt(u)}}),pageInfo:{pageSize:((T=(h=(A=(E=t==null?void 0:t.data)==null?void 0:E.customer)==null?void 0:A.orders)==null?void 0:h.page_info)==null?void 0:T.page_size)??10,totalPages:((S=(y=(b=(p=t==null?void 0:t.data)==null?void 0:p.customer)==null?void 0:b.orders)==null?void 0:y.page_info)==null?void 0:S.total_pages)??1,currentPage:((U=(k=(G=(R=t==null?void 0:t.data)==null?void 0:R.customer)==null?void 0:G.orders)==null?void 0:k.page_info)==null?void 0:U.current_page)??1},totalCount:((F=($=(x=t==null?void 0:t.data)==null?void 0:x.customer)==null?void 0:$.orders)==null?void 0:F.total_count)??0,dateOfFirstOrder:((w=(L=(B=t==null?void 0:t.data)==null?void 0:B.customer)==null?void 0:L.orders)==null?void 0:w.date_of_first_order)??""};return V(n,(Y=(I=(O=(q=M==null?void 0:M.getConfig())==null?void 0:q.models)==null?void 0:O.OrderHistoryModel)==null?void 0:I.transformer)==null?void 0:Y.call(I,t.data))},Ft=t=>{var r,n,a,i,c,s,o,l,_,E,A,h,T,p,b;const{product_reviews_enabled:e=!1}=((r=t==null?void 0:t.data)==null?void 0:r.storeConfig)??{};if(![!0,!1,1,0,"1","0"].includes(e))throw new Error("Invalid product reviews store configuration.");return{baseMediaUrl:(a=(n=t==null?void 0:t.data)==null?void 0:n.storeConfig)==null?void 0:a.base_media_url,minLength:+((c=(i=t==null?void 0:t.data)==null?void 0:i.storeConfig)==null?void 0:c.minimum_password_length)||3,requiredCharacterClasses:+((o=(s=t==null?void 0:t.data)==null?void 0:s.storeConfig)==null?void 0:o.required_character_classes_number)||0,storeCode:((_=(l=t==null?void 0:t.data)==null?void 0:l.storeConfig)==null?void 0:_.store_code)??"",productReviewsEnabled:[!0,1,"1"].includes(e),shoppingAssistanceEnabled:((A=(E=t==null?void 0:t.data)==null?void 0:E.storeConfig)==null?void 0:A.shopping_assistance_enabled)??!1,shoppingAssistanceCheckboxTitle:((T=(h=t==null?void 0:t.data)==null?void 0:h.storeConfig)==null?void 0:T.shopping_assistance_checkbox_title)||"",shoppingAssistanceCheckboxTooltip:((b=(p=t==null?void 0:t.data)==null?void 0:p.storeConfig)==null?void 0:b.shopping_assistance_checkbox_tooltip)||""}},jr=t=>({firstName:t.firstName,lastName:t.lastName,emailAddress:(t==null?void 0:t.email)||"",accountId:(t==null?void 0:t.email)||""}),Bt={VI:"Visa",MC:"Mastercard",MD:"Maestro",AE:"American Express",DI:"Discover",DN:"Diners",JCB:"JCB",UN:"UnionPay",VISA:"Visa",MASTERCARD:"Mastercard",MAESTRO:"Maestro",AMEX:"American Express",AMERICAN_EXPRESS:"American Express",DISCOVER:"Discover",DINERS:"Diners",DINERS_CLUB:"Diners",UNIONPAY:"UnionPay"};function Lt(t){try{return JSON.parse(t)}catch{return null}}function st(t){return t.trim().toUpperCase().replaceAll(/\s+/g,"_")}function et(t){return!(t!=null&&t.trim())||st(t)==="UNKNOWN"}function nt(t){if(t!=null&&t.trim())return Bt[st(t)]}function qt(t){return t.replaceAll("_"," ").toLowerCase().split(/\s+/).filter(Boolean).map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" ")}function Yt(t,e){var a,i;const r=(a=t==null?void 0:t.brand)==null?void 0:a.trim(),n=(i=t==null?void 0:t.type)==null?void 0:i.trim();if(!et(r)){const c=nt(r);return c||qt(r)}if(!et(n)){const c=nt(n);return c||n}return e.payment_method_code}function zt(t){if(!t)return!1;const e=/^(\d{1,2})\/(\d{4})$/.exec(t.trim());if(!e)return!1;const r=Number.parseInt(e[1],10),n=Number.parseInt(e[2],10);if(r<1||r>12)return!1;const a=new Date(n,r,0,23,59,59,999);return Date.now()>a.getTime()}function Vt(t,e){return e.some(r=>t.payment_method_code===r||t.payment_method_code.startsWith(`${r}_`))}function Ht(t,e){var n;const r=a=>{if(!a)return"";const i=a.replaceAll(/\D/g,"");return i.length>=4?i.slice(-4):""};if(t){const a=r(t.maskedCC)||r(t.lastFour)||r(t.last_four)||r(t.ccLast4)||r(t.cc_last4);if(a)return a}return((n=e.match(/\d{4}/g))==null?void 0:n.at(-1))??""}function Kt(t){const e=t.replaceAll(/[^a-zA-Z0-9]/g,"");return e.length>=4?e.slice(-4).toUpperCase():e.padEnd(4,"0").slice(0,4).toUpperCase()}function Wt(t){if(!t.public_hash)return null;const e=Lt(t.details),r=Yt(e,t),n=Ht(e,t.details)||Kt(t.public_hash);return{publicHash:t.public_hash,cardBrand:r,lastFourDigits:n,expired:zt(e==null?void 0:e.expirationDate)}}function jt(t,e){return(e!=null&&e.length?t.filter(n=>Vt(n,e)):t).map(n=>Wt(n)).filter(n=>n!==null)}function Jt(t){var r,n,a,i,c,s;const e=(n=(r=t==null?void 0:t.data)==null?void 0:r.customer)==null?void 0:n.admin_assistance_actions;return e?{totalCount:e.total_count||0,items:((a=e.items)==null?void 0:a.map(o=>({action:o.action||"",date:o.date||"",details:o.details||""})))||[],pageInfo:{currentPage:((i=e.page_info)==null?void 0:i.current_page)||1,pageSize:((c=e.page_info)==null?void 0:c.page_size)||10,totalPages:((s=e.page_info)==null?void 0:s.total_pages)||1}}:null}const Qt=t=>"address_type"in t||"company_id"in t,Zt=t=>[...t.custom_attributes??[],...t.extension_attributes??[]].filter(r=>!!(r!=null&&r.code||r!=null&&r.attribute_code)).map(r=>({code:r.code||r.attribute_code||"",value:r.value==null?"":String(r.value)})),Xt=t=>{var e,r,n;return{address_type:t.address_type??"SHIPPING",firstname:t.firstname??"",lastname:t.lastname??"",nickname:t.nickname??"",middlename:t.middlename??"",prefix:t.prefix??"",suffix:t.suffix??"",city:t.city??"",company:t.company??"",country_code:t.country_code??"",region:{region:((e=t.region)==null?void 0:e.region)??"",region_code:((r=t.region)==null?void 0:r.region_code)??"",region_id:((n=t.region)==null?void 0:n.region_id)??t.region_id??""},telephone:t.telephone??"",id:t.id??"",vat_id:t.vat_id??"",postcode:t.postcode??"",street:t.street??[],default_shipping:t.address_type==="SHIPPING"?t.is_default??!1:!1,default_billing:t.address_type==="BILLING"?t.is_default??!1:!1,custom_attributesV2:Zt(t),fax:t.fax??"",uid:t.uid??""}},W=t=>{if(!t)return{};const e=Qt(t)?Xt(t):t;return H(e)},lt=t=>{var e,r;return{addressBookEnabled:((e=t==null?void 0:t.config)==null?void 0:e.address_book_enabled)??(t==null?void 0:t.address_book_enabled)??!1,addressBookCustomShippingAddressEnabled:((r=t==null?void 0:t.config)==null?void 0:r.address_book_custom_shipping_address_enabled)??(t==null?void 0:t.address_book_custom_shipping_address_enabled)??!1}},tr=t=>{var c,s,o,l,_,E;const e=(c=t==null?void 0:t.data)==null?void 0:c.company,r=e==null?void 0:e.addresses,n=(s=e==null?void 0:e.default_shipping_address)==null?void 0:s.id,a=(o=e==null?void 0:e.default_billing_address)==null?void 0:o.id,i=((r==null?void 0:r.items)??[]).map(A=>{const h=W(A),T=h.id?String(h.id):"",p=n?T===String(n):h.defaultShipping,b=a?T===String(a):h.defaultBilling;return{...h,defaultShipping:!!p,defaultBilling:!!b}});return i.sort((A,h)=>(Number(h.defaultBilling)||Number(h.defaultShipping))-(Number(A.defaultBilling)||Number(A.defaultShipping))),{...lt(e),addresses:{items:i,pageInfo:{currentPage:((l=r==null?void 0:r.page_info)==null?void 0:l.current_page)??1,pageSize:((_=r==null?void 0:r.page_info)==null?void 0:_.page_size)??i.length,totalPages:((E=r==null?void 0:r.page_info)==null?void 0:E.total_pages)??1},totalCount:(r==null?void 0:r.total_count)??i.length}}},Jr=async t=>{const e=`_account_attributesForm_${t}`,r=sessionStorage.getItem(e);return r?JSON.parse(r):await f(t!=="shortRequest"?St:pt,{method:"GET",cache:"force-cache",variables:{formCode:t}}).then(n=>{var i;if((i=n.errors)!=null&&i.length)return m(n.errors);const a=Rt(n);return sessionStorage.setItem(e,JSON.stringify(a)),a}).catch(g)},rr=`
  mutation CREATE_CUSTOMER_ADDRESS($input: CustomerAddressInput!) {
    createCustomerAddress(input: $input) {
      firstname
      uid
    }
  }
`,Qr=async t=>await f(rr,{method:"POST",variables:{input:P(t,"snakeCase",{custom_attributesV2:"custom_attributesV2",firstName:"firstname",lastName:"lastname",middleName:"middlename"})}}).then(e=>{var n,a;if((n=e.errors)!=null&&n.length)return m(e.errors);const r=(a=e==null?void 0:e.data)==null?void 0:a.createCustomerAddress;return{firstname:(r==null?void 0:r.firstname)??"",uid:(r==null?void 0:r.uid)??""}}).catch(g),er=`
  mutation CREATE_COMPANY_ADDRESS($input: CompanyAddressInput!) {
    createCompanyAddress(input: $input) {
      ...COMPANY_ADDRESS_FRAGMENT
    }
  }
  ${K}
`,j=t=>{if(Array.isArray(t))return t.reduce((e,r)=>(e.push(...j(r)),e),[]);if(typeof t=="string"){const e=t.trim();return e?[e]:[]}return[]},dt=(t,e)=>{const r=t,n=[...j(r.street),...j(r.streetMultiline_2)],a=t.region?{region:t.region.region||"",region_code:t.region.regionCode||"",region_id:typeof t.region.regionId=="string"?Number(t.region.regionId):t.region.regionId}:void 0,i=t.addressTypeShipping&&!t.addressTypeBilling?"SHIPPING":t.addressTypeBilling&&!t.addressTypeShipping?"BILLING":void 0,c=t.addressType||i||(t.defaultBilling&&!t.defaultShipping?"BILLING":"SHIPPING"),o=typeof t.isDefault=="boolean"||typeof t.defaultShipping=="boolean"||typeof t.defaultBilling=="boolean"?typeof t.isDefault=="boolean"?t.isDefault:!!(t.defaultShipping||t.defaultBilling):e!=null&&e.preserveIsDefaultWhenUnset?void 0:!1;return{company:t.company||"",address_type:c,...typeof o=="boolean"?{is_default:o}:{},city:t.city||"",country_code:t.countryCode||"",region:a,street:n,telephone:t.telephone||"",postcode:t.postcode||"",firstname:t.firstName||"",middlename:t.middleName||"",lastname:t.lastName||"",nickname:t.nickname||"",prefix:t.prefix||"",suffix:t.suffix||"",fax:t.fax||"",vat_id:t.vatId||""}},Zr=async t=>{const e=dt(t);return await f(er,{method:"POST",variables:{input:e}}).then(r=>{var n,a;return(n=r.errors)!=null&&n.length?m(r.errors):W((a=r==null?void 0:r.data)==null?void 0:a.createCompanyAddress)}).catch(g)},nr=`
  mutation UPDATE_COMPANY_ADDRESS(
    $id: ID!
    $input: CompanyAddressUpdateInput!
  ) {
    updateCompanyAddress(id: $id, input: $input) {
      ...COMPANY_ADDRESS_FRAGMENT
    }
  }
  ${K}
`,Xr=async(t,e)=>{if(!t)return{};const n={...dt(e,{preserveIsDefaultWhenUnset:!0})};return delete n.address_type,await f(nr,{method:"POST",variables:{id:t,input:n}}).then(a=>{var i,c;return(i=a.errors)!=null&&i.length?m(a.errors):W((c=a==null?void 0:a.data)==null?void 0:c.updateCompanyAddress)}).catch(g)},or=`
  mutation DELETE_COMPANY_ADDRESS($id: ID!) {
    deleteCompanyAddress(id: $id)
  }
`,te=async t=>await f(or,{method:"POST",variables:{id:t}}).then(e=>{var r,n;return(r=e.errors)!=null&&r.length?m(e.errors):!!((n=e==null?void 0:e.data)!=null&&n.deleteCompanyAddress)}).catch(e=>(console.error("[Account][API][deleteCompanyAddress] network error",e),g(e))),ar=`
  mutation SET_DEFAULT_COMPANY_ADDRESS($id: ID!) {
    setDefaultCompanyAddress(id: $id) {
      ...COMPANY_ADDRESS_FRAGMENT
    }
  }
  ${K}
`,re=async t=>t?await f(ar,{method:"POST",variables:{id:t}}).then(e=>{var r,n;return(r=e.errors)!=null&&r.length?m(e.errors):W((n=e==null?void 0:e.data)==null?void 0:n.setDefaultCompanyAddress)}).catch(g):{},ir=`
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
  ${K}
`,cr=t=>{if(!t||!(t.message||"").toLowerCase().includes("the company address does not exist"))return!1;const n=(t.path||[]).join(".");return n==="company.default_shipping_address"||n==="company.default_billing_address"},ee=async()=>{var r,n;const t=await f(ir,{method:"GET",cache:"no-cache"}).catch(a=>g(a));return(r=t.errors)!=null&&r.length&&!(!!((n=t==null?void 0:t.data)!=null&&n.company)&&t.errors.every(i=>cr(i)))?m(t.errors):tr(t)},ur=`
  query GET_COMPANY_ADDRESS_BOOK_CONFIG {
    company {
      config {
        address_book_enabled
        address_book_custom_shipping_address_enabled
      }
    }
  }
`,ot={addressBookEnabled:!1,addressBookCustomShippingAddressEnabled:!1},ne=async()=>{var t,e;try{const r=await f(ur,{method:"GET",cache:"no-cache"});return(t=r==null?void 0:r.errors)!=null&&t.length?ot:lt((e=r==null?void 0:r.data)==null?void 0:e.company)}catch{return ot}},z={VIEW:"Magento_CompanyAddressStorefrontCompatibility::company_address",ADD:"Magento_CompanyAddressStorefrontCompatibility::add",EDIT:"Magento_CompanyAddressStorefrontCompatibility::edit",DELETE:"Magento_CompanyAddressStorefrontCompatibility::delete",SET_DEFAULT:"Magento_CompanyAddressStorefrontCompatibility::default"},sr=`
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
`,oe=async()=>await f(sr,{method:"GET",cache:"no-cache"}).then(t=>{var e;return(e=t.errors)!=null&&e.length?m(t.errors):wt(t)}).catch(g),lr=`
  query GET_CUSTOMER_COMPANY_CONTEXT {
    company {
      id
      name
    }
  }
`,ae=async()=>await f(lr,{method:"GET",cache:"no-cache"}).then(t=>{var e,r,n;return(e=t.errors)!=null&&e.length&&m(t.errors),!!((n=(r=t==null?void 0:t.data)==null?void 0:r.company)!=null&&n.id)}).catch(g),Q={canAccessAddressBook:!1,canViewAddress:!1,canCreateAddress:!1,canEditAddress:!1,canDeleteAddress:!1,canSetDefaultAddress:!1},C=(t,e)=>e.some(r=>t.has(r)),D={view:z.VIEW,add:z.ADD,edit:z.EDIT,delete:z.DELETE,default:z.SET_DEFAULT,setDefaultLegacy:"Magento_CompanyAddressStorefrontCompatibility::set_default"},dr=[D.default,D.setDefaultLegacy],_r=["Magento_Company::view_address","company_address_view"],fr=["company_address_edit","Magento_Company::edit_address"],gr=["company_address_add","Magento_Company::add_address","Magento_Company::edit_address"],mr=["company_address_delete","Magento_Company::delete_address","Magento_Company::edit_address"],hr=["company_address_set_default","Magento_Company::set_default_address","Magento_Company::edit_address"],Ar=(t=[])=>{const e=new Set,r=[...t];for(;r.length;){const n=r.pop();n&&(typeof n.id=="string"&&e.add(n.id),Array.isArray(n.children)&&n.children.length&&r.push(...n.children))}return e},Er=t=>Array.from(t).some(e=>e.startsWith("Magento_CompanyAddressStorefrontCompatibility::")),Sr=t=>C(t,["company_address_add","company_address_edit","company_address_delete","company_address_set_default"]),pr=t=>t?t.id==="0"||t.id===0||t.id==="MA=="||t.name==="Company Administrator":!1,yr=()=>["Magento_Company::view_address","Magento_Company::edit_address","Magento_CompanyAddressStorefrontCompatibility::company_address","Magento_CompanyAddressStorefrontCompatibility::add","Magento_CompanyAddressStorefrontCompatibility::edit","Magento_CompanyAddressStorefrontCompatibility::delete","Magento_CompanyAddressStorefrontCompatibility::default","Magento_CompanyAddressStorefrontCompatibility::set_default","company_address_add","company_address_edit","company_address_delete","company_address_set_default"],Cr=t=>{if(!t)return Q;const e=Ar(t.permissions||[]),r=new Set(e);pr(t)&&yr().forEach(E=>r.add(E));const n=Er(r),a=n?C(r,[D.view]):C(r,_r),i=Sr(r),c=n?C(r,[D.edit]):i?C(r,["company_address_edit"]):C(r,fr),s=n?C(r,[D.add]):i?C(r,["company_address_add"]):C(r,gr),o=n?C(r,[D.delete]):i?C(r,["company_address_delete"]):C(r,mr),l=n?C(r,dr):i?C(r,["company_address_set_default"]):C(r,hr);return{canAccessAddressBook:a,canViewAddress:a,canCreateAddress:s,canEditAddress:c,canDeleteAddress:o,canSetDefaultAddress:l}},Tr=t=>{var r,n,a;if((r=t==null?void 0:t.errors)!=null&&r.length)return Q;const e=((a=(n=t==null?void 0:t.data)==null?void 0:n.customer)==null?void 0:a.role)??null;return Cr(e)},ie=()=>Q,br=`
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
`,ce=async()=>await f(br,{method:"GET",cache:"no-cache"}).then(t=>Tr(t)).catch(g),Rr=`
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
`,ue=async()=>{const t="_account_countries",e=sessionStorage.getItem(t);return e?JSON.parse(e):await f(Rr,{method:"GET",cache:"no-cache"}).then(r=>{var a;if((a=r.errors)!=null&&a.length)return m(r.errors);const n=Gt(r);return sessionStorage.setItem(t,JSON.stringify(n)),n}).catch(g)},Ir=`
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
`,se=async t=>{const e=`_account_regions_${t}`,r=sessionStorage.getItem(e);return r?JSON.parse(r):await f(Ir,{method:"GET",cache:"no-cache",variables:{countryCode:t}}).then(n=>{var i;if((i=n.errors)!=null&&i.length)return m(n.errors);const a=kt(n);return sessionStorage.setItem(e,JSON.stringify(a)),a}).catch(g)},Or=`
  mutation UPDATE_CUSTOMER_ADDRESS($id: Int!, $input: CustomerAddressInput) {
    updateCustomerAddress(id: $id, input: $input) {
      firstname
    }
  }
`,le=async t=>{const{addressId:e,...r}=t;return e?await f(Or,{method:"POST",variables:{id:Number(e),input:P(r,"snakeCase",{custom_attributesV2:"custom_attributesV2",firstName:"firstname",lastName:"lastname",middleName:"middlename"})}}).then(n=>{var a,i,c;return(a=n.errors)!=null&&a.length?m(n.errors):((c=(i=n==null?void 0:n.data)==null?void 0:i.updateCustomerAddress)==null?void 0:c.firstname)||""}).catch(g):""},Nr=`
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
  ${mt}
`,de=async()=>await f(Nr,{method:"GET",cache:"no-cache"}).then(t=>{var e;return(e=t.errors)!=null&&e.length?m(t.errors):vt(t)}).catch(g),Mr=`
  query GET_CUSTOMER_REVIEWS($pageSize: Int!, $currentPage: Int!) {
    customer {
      reviews(
        filter: { status: [APPROVED] }
        pageSize: $pageSize
        currentPage: $currentPage
      ) {
        items {
          nickname
          summary
          text
          average_rating
          created_at
          product {
            sku
            name
            url_key
            thumbnail {
              url
              label
            }
          }
          ratings_breakdown {
            name
            value
          }
        }
        page_info {
          current_page
          page_size
          total_pages
        }
      }
    }
  }
`;async function _e({pageSize:t=10,currentPage:e=1,signal:r}={}){var n,a,i;if(!Number.isSafeInteger(t)||t<1||!Number.isSafeInteger(e)||e<1)throw new RangeError("Customer review page size and current page must be positive integers.");try{const c=await f(Mr,{method:"GET",cache:"no-store",variables:{pageSize:t,currentPage:e},signal:r});if((n=c.errors)!=null&&n.length)return m(c.errors);if(!((i=(a=c.data)==null?void 0:a.customer)!=null&&i.reviews))throw new Error("Customer reviews are unavailable.");return Pt(c.data.customer.reviews)}catch(c){if(r!=null&&r.aborted)throw c;return g(c instanceof Error?c:new Error(String(c)))}}const wr=`
  query GET_ADMIN_ASSISTANCE_ACTIONS($currentPage: Int, $pageSize: Int) {
    customer {
      admin_assistance_actions(pageSize: $pageSize, currentPage: $currentPage) {
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
`,fe=async(t,e)=>await f(wr,{method:"GET",cache:"no-cache",variables:{pageSize:t,currentPage:e}}).then(r=>{var n;return(n=r.errors)!=null&&n.length?m(r.errors):Jt(r)}).catch(g),vr=`
  mutation REMOVE_CUSTOMER_ADDRESS($id: Int!) {
    deleteCustomerAddress(id: $id)
  }
`,ge=async t=>await f(vr,{method:"POST",variables:{id:t}}).then(e=>{var r;return(r=e.errors)!=null&&r.length?m(e.errors):e.data.deleteCustomerAddress}).catch(g),Dr=`
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
`,me=async t=>await f(Dr,{method:"GET",cache:"no-cache"}).then(e=>{var n,a,i;if((n=e.errors)!=null&&n.length)return m(e.errors);const r=((i=(a=e.data)==null?void 0:a.customerPaymentTokens)==null?void 0:i.items)??[];return jt(r,t)}).catch(g),Pr=`
  mutation deletePaymentToken($public_hash: String!) {
    deletePaymentToken(public_hash: $public_hash) {
      result
    }
  }
`,he=async t=>await f(Pr,{method:"POST",variables:{public_hash:t}}).then(e=>{var r,n,a;return(r=e.errors)!=null&&r.length?m(e.errors):!!((a=(n=e.data)==null?void 0:n.deletePaymentToken)!=null&&a.result)}).catch(g),Gr=`
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
  ${ht}
  ${At}
  ${Et}
`,at=3,it=100,kr={sort_direction:"DESC",sort_field:"CREATED_AT"},Ae=async(t,e,r,n="",a)=>{const i={};e!=="viewAll"&&(i.order_date=JSON.parse(e));const c=n.trim();if(c&&c.length<at)throw new RangeError(`Order search must contain at least ${at} characters.`);if(c.length>it)throw new RangeError(`Order search cannot exceed ${it} characters.`);return c&&(i.search=c),await f(Gr,{method:"GET",cache:"no-cache",signal:a,variables:{pageSize:t,currentPage:r,filter:i,sort:kr}}).then(s=>{var o;return(o=s.errors)!=null&&o.length?m(s.errors):$t(s)}).catch(g)},Ur=`
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
`,Ee=async({currentPassword:t,newPassword:e})=>await f(Ur,{method:"POST",variables:{currentPassword:t,newPassword:e}}).then(r=>{var n,a,i;return(n=r.errors)!=null&&n.length?m(r.errors):((i=(a=r==null?void 0:r.data)==null?void 0:a.changeCustomerPassword)==null?void 0:i.email)||""}).catch(g),xr=`
  query GET_STORE_CONFIG {
    storeConfig {
      base_media_url
      autocomplete_on_storefront
      minimum_password_length
      required_character_classes_number
      store_code
      product_reviews_enabled
      shopping_assistance_enabled
      shopping_assistance_checkbox_title
      shopping_assistance_checkbox_tooltip
    }
  }
`,Se=async()=>await f(xr,{method:"GET",cache:"force-cache"}).then(t=>{var e;return(e=t.errors)!=null&&e.length?m(t.errors):Ft(t)}).catch(g),$r=`
  mutation UPDATE_CUSTOMER_EMAIL($email: String!, $password: String!) {
    updateCustomerEmail(email: $email, password: $password) {
      customer {
        email
      }
    }
  }
`,pe=async({email:t,password:e})=>await f($r,{method:"POST",variables:{email:t,password:e}}).then(r=>{var n,a,i,c;return(n=r.errors)!=null&&n.length?m(r.errors):((c=(i=(a=r==null?void 0:r.data)==null?void 0:a.updateCustomerEmail)==null?void 0:i.customer)==null?void 0:c.email)||""}).catch(g),Fr=`
  mutation UPDATE_CUSTOMER_V2($input: CustomerUpdateInput!) {
    updateCustomerV2(input: $input) {
      customer {
        email
        allow_remote_shopping_assistance
      }
    }
  }
`,ye=async t=>await f(Fr,{method:"POST",variables:{input:P(t,"snakeCase",{firstName:"firstname",lastName:"lastname",middleName:"middlename",dob:"date_of_birth",custom_attributesV2:"custom_attributes"})}}).then(e=>{var r,n,a,i;return(r=e.errors)!=null&&r.length?m(e.errors):((i=(a=(n=e==null?void 0:e.data)==null?void 0:n.updateCustomerV2)==null?void 0:a.customer)==null?void 0:i.email)||""}).catch(g);export{z as COMPANY_ADDRESS_PERMISSIONS,it as O,yt as a,J as b,P as c,M as config,Zr as createCompanyAddress,Qr as createCustomerAddress,at as d,te as deleteCompanyAddress,he as deletePaymentToken,f as fetchGraphQl,ie as g,fe as getAdminAssistanceActions,Jr as getAttributesForm,ee as getCompanyAddressBook,ne as getCompanyAddressBookConfig,Wr as getConfig,ue as getCountries,de as getCustomer,oe as getCustomerAddress,ae as getCustomerCompanyContext,me as getCustomerPaymentTokens,_e as getCustomerReviews,ce as getCustomerRolePermissions,Ae as getOrderHistoryList,se as getRegions,Se as getStoreConfig,ct as initialize,ge as removeCustomerAddress,Hr as removeFetchGraphQlHeader,re as setDefaultCompanyAddress,zr as setEndpoint,Vr as setFetchGraphQlHeader,Kr as setFetchGraphQlHeaders,jr as t,Xr as updateCompanyAddress,ye as updateCustomer,le as updateCustomerAddress,pe as updateCustomerEmail,Ee as updateCustomerPassword};
//# sourceMappingURL=api.js.map
