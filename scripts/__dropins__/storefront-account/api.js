/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as et}from"@dropins/tools/event-bus.js";import{Initializer as it,merge as nt}from"@dropins/tools/lib.js";import{FetchGraphQL as ct}from"@dropins/tools/fetch-graphql.js";import{COMPANY_ADDRESS_FRAGMENT as z,BASIC_CUSTOMER_INFO_FRAGMENT as ut,CUSTOMER_ORDER_FRAGMENT as st,ADDRESS_FRAGMENT as lt,ORDER_SUMMARY_FRAGMENT as _t}from"./fragments.js";const rt=new it({init:async t=>{const n={authHeaderConfig:{header:"Authorization",tokenPrefix:"Bearer"}};rt.config.setConfig({...n,...t})},listeners:()=>[]}),w=rt.config,{setEndpoint:vn,setFetchGraphQlHeader:xn,removeFetchGraphQlHeader:$n,setFetchGraphQlHeaders:kn,fetchGraphQl:d,getConfig:Fn}=new ct().getMethods(),dt=`
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
`,f=t=>{throw t instanceof DOMException&&t.name==="AbortError"||et.emit("error",{source:"auth",type:"network",error:t}),t},m=t=>{const n=t.map(r=>r.message).join(" ");throw Error(n)},K=t=>t.replace(/_([a-z])/g,(n,r)=>r.toUpperCase()),gt=t=>t.replace(/([A-Z])/g,n=>`_${n.toLowerCase()}`),G=(t,n,r)=>{const o=["string","boolean","number"],a=n==="camelCase"?K:gt;return Array.isArray(t)?t.map(e=>o.includes(typeof e)||e===null?e:typeof e=="object"?G(e,n,r):e):t!==null&&typeof t=="object"?Object.entries(t).reduce((e,[c,s])=>{const i=r&&r[c]?r[c]:a(c);return e[i]=o.includes(typeof s)||s===null?s:G(s,n,r),e},{}):t},mt=t=>{const n=[];for(const r of t)if(!(r.frontend_input!=="MULTILINE"||r.multiline_count<2))for(let o=2;o<=r.multiline_count;o++){const a={...r,is_required:!1,name:`${r.code}_multiline_${o}`,code:`${r.code}_multiline_${o}`,id:`${r.code}_multiline_${o}`};n.push(a)}return n},ht=t=>{switch(t){case"middlename":return"middleName";case"firstname":return"firstName";case"lastname":return"lastName";default:return K(t)}},At=t=>{var n;return t!=null&&t.options?(n=t==null?void 0:t.options)==null?void 0:n.map(r=>({isDefault:(r==null?void 0:r.is_default)??!1,text:(r==null?void 0:r.label)??"",value:(r==null?void 0:r.value)??""})):[]},Ct=t=>{var e,c,s;const n=((c=(e=t==null?void 0:t.data)==null?void 0:e.attributesForm)==null?void 0:c.items)||[];if(!n.length)return[];const r=(s=n.filter(i=>{var _;return!((_=i.frontend_input)!=null&&_.includes("HIDDEN"))}))==null?void 0:s.map(({code:i,..._})=>{const g=i!=="country_id"?i:"country_code";return{..._,name:g,id:g,code:g}}),o=mt(r);return r.concat(o).map(i=>({code:i==null?void 0:i.code,name:i==null?void 0:i.name,id:i==null?void 0:i.id,label:(i==null?void 0:i.label)??"",entityType:i==null?void 0:i.entity_type,className:(i==null?void 0:i.frontend_class)??"",defaultValue:(i==null?void 0:i.default_value)??"",fieldType:i==null?void 0:i.frontend_input,multilineCount:(i==null?void 0:i.multiline_count)??0,orderNumber:Number(i==null?void 0:i.sort_order)||0,isHidden:!1,isUnique:(i==null?void 0:i.is_unique)??!1,required:(i==null?void 0:i.is_required)??!1,validateRules:(i==null?void 0:i.validate_rules)??[],options:At(i),customUpperCode:ht(i==null?void 0:i.code)})).sort((i,_)=>Number(i.orderNumber)-Number(_.orderNumber))},St=t=>{const n={};for(const r in t){const o=t[r];!Array.isArray(o)||o.length===0||(r==="custom_attributesV2"?o.forEach(a=>{typeof a=="object"&&"value"in a&&(n[a==null?void 0:a.code]=a==null?void 0:a.value)}):o.length>1?o.forEach((a,e)=>{e===0?n[r]=a:n[`${r}_multiline_${e+1}`]=a}):n[r]=o[0])}return n},Et=t=>({prefix:(t==null?void 0:t.prefix)??"",suffix:(t==null?void 0:t.suffix)??"",firstname:(t==null?void 0:t.firstname)??"",lastname:(t==null?void 0:t.lastname)??"",nickname:(t==null?void 0:t.nickname)??"",middlename:(t==null?void 0:t.middlename)??""}),yt=t=>({id:(t==null?void 0:t.id)??"",vat_id:(t==null?void 0:t.vat_id)??"",postcode:(t==null?void 0:t.postcode)??"",country_code:(t==null?void 0:t.country_code)??"",uid:(t==null?void 0:t.uid)??""}),pt=t=>({company:(t==null?void 0:t.company)??"",telephone:(t==null?void 0:t.telephone)??"",fax:(t==null?void 0:t.fax)??""}),Y=t=>{var o,a,e;const n=t==null?void 0:t.address_type;return G({...Et(t),...yt(t),...pt(t),...n?{address_type:n}:{},city:(t==null?void 0:t.city)??"",region:{region:((o=t==null?void 0:t.region)==null?void 0:o.region)??"",region_code:((a=t==null?void 0:t.region)==null?void 0:a.region_code)??"",region_id:((e=t==null?void 0:t.region)==null?void 0:e.region_id)??""},default_shipping:(t==null?void 0:t.default_shipping)||!1,default_billing:(t==null?void 0:t.default_billing)||!1,...St(t)},"camelCase",{})},Tt=t=>{var o,a;const n=((a=(o=t==null?void 0:t.data)==null?void 0:o.customer)==null?void 0:a.addresses)||[];return n.length?n.map(Y).sort((e,c)=>(Number(c.defaultBilling)||Number(c.defaultShipping))-(Number(e.defaultBilling)||Number(e.defaultShipping))):[]},bt=t=>{var o,a,e,c,s,i,_,g,h,C,S,E,y,T,p,R,N,I,U,v,x,$,k,F,B,P,L;const n=(e=(a=(o=t==null?void 0:t.data)==null?void 0:o.customer)==null?void 0:a.custom_attributes)==null?void 0:e.filter(O=>O).reduce((O,b)=>{var u;const q=K(b.code);return(u=b.selected_options)!=null&&u.length?O[q]=b.selected_options[0].value??"":O[q]=b.value??"",O},{}),r={email:((s=(c=t==null?void 0:t.data)==null?void 0:c.customer)==null?void 0:s.email)||"",firstName:((_=(i=t==null?void 0:t.data)==null?void 0:i.customer)==null?void 0:_.firstname)||"",lastName:((h=(g=t==null?void 0:t.data)==null?void 0:g.customer)==null?void 0:h.lastname)||"",middleName:((S=(C=t==null?void 0:t.data)==null?void 0:C.customer)==null?void 0:S.middlename)||"",gender:((y=(E=t==null?void 0:t.data)==null?void 0:E.customer)==null?void 0:y.gender)||"1",dateOfBirth:((p=(T=t==null?void 0:t.data)==null?void 0:T.customer)==null?void 0:p.date_of_birth)||"",prefix:((N=(R=t==null?void 0:t.data)==null?void 0:R.customer)==null?void 0:N.prefix)||"",suffix:((U=(I=t==null?void 0:t.data)==null?void 0:I.customer)==null?void 0:U.suffix)||"",createdAt:((x=(v=t==null?void 0:t.data)==null?void 0:v.customer)==null?void 0:x.created_at)||"",allowRemoteShoppingAssistance:(k=($=t==null?void 0:t.data)==null?void 0:$.customer)==null?void 0:k.allow_remote_shopping_assistance,...n};return nt(r,(L=(P=(B=(F=w==null?void 0:w.getConfig())==null?void 0:F.models)==null?void 0:B.CustomerDataModelShort)==null?void 0:P.transformer)==null?void 0:L.call(P,t.data))},Rt=t=>{var c,s;if(!((s=(c=t==null?void 0:t.data)==null?void 0:c.countries)!=null&&s.length))return{availableCountries:[],countriesWithRequiredRegion:[],optionalZipCountries:[]};const{countries:n,storeConfig:r}=t.data,o=r==null?void 0:r.countries_with_required_region.split(","),a=r==null?void 0:r.optional_zip_countries.split(",");return{availableCountries:n.filter(({two_letter_abbreviation:i,full_name_locale:_})=>!!(i&&_)).map(i=>{const{two_letter_abbreviation:_,full_name_locale:g,available_regions:h}=i,C=Array.isArray(h)&&h.length>0;return{value:_,text:g,availableRegions:C?h:void 0}}).sort((i,_)=>i.text.localeCompare(_.text)),countriesWithRequiredRegion:o,optionalZipCountries:a}},Ot=t=>{var o,a;const n=(a=(o=t==null?void 0:t.data)==null?void 0:o.country)==null?void 0:a.available_regions;return n?n.filter(e=>{if(!e)return!1;const{id:c,code:s,name:i}=e;return!!(c&&s&&i)}).map(e=>{const{id:c}=e;return{id:c,text:e.name,value:`${e.code},${e.id}`}}):[]},Mt=(t,n="en-US",r={})=>{const o={day:"2-digit",month:"2-digit",year:"numeric"},a=/^\d{4}-\d{2}-\d{2}$/.test(t.trim()),e={...o,...a?{timeZone:"UTC"}:{},...r},c=new Date(t.trim());return isNaN(c.getTime())?"Invalid Date":new Intl.DateTimeFormat(n,e).format(c)},Nt=(t,n="en-US",r={})=>{const a={...{hour:"2-digit",minute:"2-digit"},...r},e=new Date(t);return isNaN(e.getTime())?"Invalid Time":new Intl.DateTimeFormat(n,a).format(e)},M={value:0,currency:"USD"},It=t=>{var n,r,o,a,e,c,s,i,_,g;return{subtotal:((n=t==null?void 0:t.total)==null?void 0:n.subtotal)??M,grandTotal:((r=t==null?void 0:t.total)==null?void 0:r.grand_total)??M,grandTotalExclTax:((o=t==null?void 0:t.total)==null?void 0:o.grand_total_excl_tax)??M,totalGiftcard:((a=t==null?void 0:t.total)==null?void 0:a.total_giftcard)??M,subtotalExclTax:((e=t==null?void 0:t.total)==null?void 0:e.subtotal_excl_tax)??M,subtotalInclTax:((c=t==null?void 0:t.total)==null?void 0:c.subtotal_incl_tax)??M,taxes:((s=t==null?void 0:t.total)==null?void 0:s.taxes)??[],totalTax:((i=t==null?void 0:t.total)==null?void 0:i.total_tax)??M,totalShipping:((_=t==null?void 0:t.total)==null?void 0:_.total_shipping)??M,discounts:((g=t==null?void 0:t.total)==null?void 0:g.discounts)??[]}},Pt=t=>{var a,e,c,s,i,_,g,h,C,S,E,y,T,p,R,N,I,U,v,x,$,k,F,B,P,L,O,b,q;if(!((e=(a=t.data)==null?void 0:a.customer)!=null&&e.orders))return null;const n=((s=(c=t==null?void 0:t.data)==null?void 0:c.customer)==null?void 0:s.returns)??[],o={items:(((g=(_=(i=t==null?void 0:t.data)==null?void 0:i.customer)==null?void 0:_.orders)==null?void 0:g.items)??[]).map(u=>{var W;return{adminAssistedOrder:(u==null?void 0:u.admin_assisted_order)??null,items:u==null?void 0:u.items.map(l=>{var j,Q,Z;return{status:(l==null?void 0:l.status)??"",productName:(l==null?void 0:l.product_name)??"",id:l==null?void 0:l.id,quantityOrdered:(l==null?void 0:l.quantity_ordered)??0,quantityShipped:(l==null?void 0:l.quantity_shipped)??0,quantityInvoiced:(l==null?void 0:l.quantity_invoiced)??0,sku:(l==null?void 0:l.product_sku)??"",urlKey:(l==null?void 0:l.product_url_key)??"",topLevelSku:((j=l==null?void 0:l.product)==null?void 0:j.sku)??"",product:{smallImage:{url:((Z=(Q=l==null?void 0:l.product)==null?void 0:Q.small_image)==null?void 0:Z.url)??""}}}}),token:u==null?void 0:u.token,email:u==null?void 0:u.email,shippingMethod:u==null?void 0:u.shipping_method,paymentMethods:(u==null?void 0:u.payment_methods)??[],shipments:(u==null?void 0:u.shipments)??[],id:u==null?void 0:u.id,carrier:u==null?void 0:u.carrier,status:u==null?void 0:u.status,number:u==null?void 0:u.number,returns:(W=n==null?void 0:n.items)==null?void 0:W.filter(l=>l.order.id===u.id),orderDate:Mt(u.order_date),orderTime:Nt(u.order_date),shippingAddress:Y(u.shipping_address),billingAddress:Y(u.billing_address),total:It(u)}}),pageInfo:{pageSize:((E=(S=(C=(h=t==null?void 0:t.data)==null?void 0:h.customer)==null?void 0:C.orders)==null?void 0:S.page_info)==null?void 0:E.page_size)??10,totalPages:((R=(p=(T=(y=t==null?void 0:t.data)==null?void 0:y.customer)==null?void 0:T.orders)==null?void 0:p.page_info)==null?void 0:R.total_pages)??1,currentPage:((v=(U=(I=(N=t==null?void 0:t.data)==null?void 0:N.customer)==null?void 0:I.orders)==null?void 0:U.page_info)==null?void 0:v.current_page)??1},totalCount:((k=($=(x=t==null?void 0:t.data)==null?void 0:x.customer)==null?void 0:$.orders)==null?void 0:k.total_count)??0,dateOfFirstOrder:((P=(B=(F=t==null?void 0:t.data)==null?void 0:F.customer)==null?void 0:B.orders)==null?void 0:P.date_of_first_order)??""};return nt(o,(q=(b=(O=(L=w==null?void 0:w.getConfig())==null?void 0:L.models)==null?void 0:O.OrderHistoryModel)==null?void 0:b.transformer)==null?void 0:q.call(b,t.data))},Dt=t=>{var n,r,o,a,e,c,s,i,_,g,h,C,S,E,y,T;return{baseMediaUrl:(r=(n=t==null?void 0:t.data)==null?void 0:n.storeConfig)==null?void 0:r.base_media_url,minLength:+((a=(o=t==null?void 0:t.data)==null?void 0:o.storeConfig)==null?void 0:a.minimum_password_length)||3,requiredCharacterClasses:+((c=(e=t==null?void 0:t.data)==null?void 0:e.storeConfig)==null?void 0:c.required_character_classes_number)||0,storeCode:((i=(s=t==null?void 0:t.data)==null?void 0:s.storeConfig)==null?void 0:i.store_code)??"",shoppingAssistanceEnabled:((g=(_=t==null?void 0:t.data)==null?void 0:_.storeConfig)==null?void 0:g.shopping_assistance_enabled)??!1,shoppingAssistanceCheckboxTitle:((C=(h=t==null?void 0:t.data)==null?void 0:h.storeConfig)==null?void 0:C.shopping_assistance_checkbox_title)||"",shoppingAssistanceCheckboxTooltip:((E=(S=t==null?void 0:t.data)==null?void 0:S.storeConfig)==null?void 0:E.shopping_assistance_checkbox_tooltip)||"",b2bEnabled:((T=(y=t==null?void 0:t.data)==null?void 0:y.storeConfig)==null?void 0:T.b2b_enabled)??!1}},Bn=t=>({firstName:t.firstName,lastName:t.lastName,emailAddress:(t==null?void 0:t.email)||"",accountId:(t==null?void 0:t.email)||""}),wt={VI:"Visa",MC:"Mastercard",MD:"Maestro",AE:"American Express",DI:"Discover",DN:"Diners",JCB:"JCB",UN:"UnionPay",VISA:"Visa",MASTERCARD:"Mastercard",MAESTRO:"Maestro",AMEX:"American Express",AMERICAN_EXPRESS:"American Express",DISCOVER:"Discover",DINERS:"Diners",DINERS_CLUB:"Diners",UNIONPAY:"UnionPay"};function Gt(t){try{return JSON.parse(t)}catch{return null}}function ot(t){return t.trim().toUpperCase().replaceAll(/\s+/g,"_")}function X(t){return!(t!=null&&t.trim())||ot(t)==="UNKNOWN"}function tt(t){if(t!=null&&t.trim())return wt[ot(t)]}function Ut(t){return t.replaceAll("_"," ").toLowerCase().split(/\s+/).filter(Boolean).map(n=>n.charAt(0).toUpperCase()+n.slice(1)).join(" ")}function vt(t,n){var a,e;const r=(a=t==null?void 0:t.brand)==null?void 0:a.trim(),o=(e=t==null?void 0:t.type)==null?void 0:e.trim();if(!X(r)){const c=tt(r);return c||Ut(r)}if(!X(o)){const c=tt(o);return c||o}return n.payment_method_code}function xt(t){if(!t)return!1;const n=/^(\d{1,2})\/(\d{4})$/.exec(t.trim());if(!n)return!1;const r=Number.parseInt(n[1],10),o=Number.parseInt(n[2],10);if(r<1||r>12)return!1;const a=new Date(o,r,0,23,59,59,999);return Date.now()>a.getTime()}function $t(t,n){return n.some(r=>t.payment_method_code===r||t.payment_method_code.startsWith(`${r}_`))}function kt(t,n){var o;const r=a=>{if(!a)return"";const e=a.replaceAll(/\D/g,"");return e.length>=4?e.slice(-4):""};if(t){const a=r(t.maskedCC)||r(t.lastFour)||r(t.last_four)||r(t.ccLast4)||r(t.cc_last4);if(a)return a}return((o=n.match(/\d{4}/g))==null?void 0:o.at(-1))??""}function Ft(t){const n=t.replaceAll(/[^a-zA-Z0-9]/g,"");return n.length>=4?n.slice(-4).toUpperCase():n.padEnd(4,"0").slice(0,4).toUpperCase()}function Bt(t){if(!t.public_hash)return null;const n=Gt(t.details),r=vt(n,t),o=kt(n,t.details)||Ft(t.public_hash);return{publicHash:t.public_hash,cardBrand:r,lastFourDigits:o,expired:xt(n==null?void 0:n.expirationDate)}}function Lt(t,n){return(n!=null&&n.length?t.filter(o=>$t(o,n)):t).map(o=>Bt(o)).filter(o=>o!==null)}function qt(t){var r,o,a,e,c,s;const n=(o=(r=t==null?void 0:t.data)==null?void 0:r.customer)==null?void 0:o.admin_assistance_actions;return n?{totalCount:n.total_count||0,items:((a=n.items)==null?void 0:a.map(i=>({action:i.action||"",date:i.date||"",details:i.details||""})))||[],pageInfo:{currentPage:((e=n.page_info)==null?void 0:e.current_page)||1,pageSize:((c=n.page_info)==null?void 0:c.page_size)||10,totalPages:((s=n.page_info)==null?void 0:s.total_pages)||1}}:null}const Yt=t=>"address_type"in t||"company_id"in t,zt=t=>[...t.custom_attributes??[],...t.extension_attributes??[]].filter(r=>!!(r!=null&&r.code||r!=null&&r.attribute_code)).map(r=>({code:r.code||r.attribute_code||"",value:r.value==null?"":String(r.value)})),Vt=t=>{var n,r,o;return{address_type:t.address_type??"SHIPPING",firstname:t.firstname??"",lastname:t.lastname??"",nickname:t.nickname??"",middlename:t.middlename??"",prefix:t.prefix??"",suffix:t.suffix??"",city:t.city??"",company:t.company??"",country_code:t.country_code??"",region:{region:((n=t.region)==null?void 0:n.region)??"",region_code:((r=t.region)==null?void 0:r.region_code)??"",region_id:((o=t.region)==null?void 0:o.region_id)??t.region_id??""},telephone:t.telephone??"",id:t.id??"",vat_id:t.vat_id??"",postcode:t.postcode??"",street:t.street??[],default_shipping:t.address_type==="SHIPPING"?t.is_default??!1:!1,default_billing:t.address_type==="BILLING"?t.is_default??!1:!1,custom_attributesV2:zt(t),fax:t.fax??"",uid:t.uid??""}},V=t=>{if(!t)return{};const n=Yt(t)?Vt(t):t;return Y(n)},Ht=t=>{var i,_,g,h,C,S,E,y;const n=(i=t==null?void 0:t.data)==null?void 0:i.company,r=n==null?void 0:n.addresses,o=(_=n==null?void 0:n.default_shipping_address)==null?void 0:_.id,a=(g=n==null?void 0:n.default_billing_address)==null?void 0:g.id,e=((r==null?void 0:r.items)??[]).map(T=>{const p=V(T),R=p.id?String(p.id):"",N=o?R===String(o):p.defaultShipping,I=a?R===String(a):p.defaultBilling;return{...p,defaultShipping:!!N,defaultBilling:!!I}}),c=((h=n==null?void 0:n.config)==null?void 0:h.address_book_enabled)??(n==null?void 0:n.address_book_enabled)??!1,s=((C=n==null?void 0:n.config)==null?void 0:C.address_book_custom_shipping_address_enabled)??(n==null?void 0:n.address_book_custom_shipping_address_enabled)??!1;return{addressBookEnabled:c,addressBookCustomShippingAddressEnabled:s,addresses:{items:e,pageInfo:{currentPage:((S=r==null?void 0:r.page_info)==null?void 0:S.current_page)??1,pageSize:((E=r==null?void 0:r.page_info)==null?void 0:E.page_size)??e.length,totalPages:((y=r==null?void 0:r.page_info)==null?void 0:y.total_pages)??1},totalCount:(r==null?void 0:r.total_count)??e.length}}},Ln=async t=>{const n=`_account_attributesForm_${t}`,r=sessionStorage.getItem(n);return r?JSON.parse(r):await d(t!=="shortRequest"?dt:ft,{method:"GET",cache:"force-cache",variables:{formCode:t}}).then(o=>{var e;if((e=o.errors)!=null&&e.length)return m(o.errors);const a=Ct(o);return sessionStorage.setItem(n,JSON.stringify(a)),a}).catch(f)},Kt=`
  mutation CREATE_CUSTOMER_ADDRESS($input: CustomerAddressInput!) {
    createCustomerAddress(input: $input) {
      firstname
      uid
    }
  }
`,qn=async t=>await d(Kt,{method:"POST",variables:{input:G(t,"snakeCase",{custom_attributesV2:"custom_attributesV2",firstName:"firstname",lastName:"lastname",middleName:"middlename"})}}).then(n=>{var o,a;if((o=n.errors)!=null&&o.length)return m(n.errors);const r=(a=n==null?void 0:n.data)==null?void 0:a.createCustomerAddress;return{firstname:(r==null?void 0:r.firstname)??"",uid:(r==null?void 0:r.uid)??""}}).catch(f),Jt=`
  mutation CREATE_COMPANY_ADDRESS($input: CompanyAddressInput!) {
    createCompanyAddress(input: $input) {
      ...COMPANY_ADDRESS_FRAGMENT
    }
  }
  ${z}
`,H=t=>{if(Array.isArray(t))return t.reduce((n,r)=>(n.push(...H(r)),n),[]);if(typeof t=="string"){const n=t.trim();return n?[n]:[]}return[]},at=(t,n)=>{const r=t,o=[...H(r.street),...H(r.streetMultiline_2)],a=t.region?{region:t.region.region||"",region_code:t.region.regionCode||"",region_id:typeof t.region.regionId=="string"?Number(t.region.regionId):t.region.regionId}:void 0,e=t.addressTypeShipping&&!t.addressTypeBilling?"SHIPPING":t.addressTypeBilling&&!t.addressTypeShipping?"BILLING":void 0,c=t.addressType||e||(t.defaultBilling&&!t.defaultShipping?"BILLING":"SHIPPING"),i=typeof t.isDefault=="boolean"||typeof t.defaultShipping=="boolean"||typeof t.defaultBilling=="boolean"?typeof t.isDefault=="boolean"?t.isDefault:!!(t.defaultShipping||t.defaultBilling):n!=null&&n.preserveIsDefaultWhenUnset?void 0:!1;return{company:t.company||"",address_type:c,...typeof i=="boolean"?{is_default:i}:{},city:t.city||"",country_code:t.countryCode||"",region:a,street:o,telephone:t.telephone||"",postcode:t.postcode||"",firstname:t.firstName||"",middlename:t.middleName||"",lastname:t.lastName||"",nickname:t.nickname||"",prefix:t.prefix||"",suffix:t.suffix||"",fax:t.fax||"",vat_id:t.vatId||""}},Yn=async t=>{const n=at(t);return await d(Jt,{method:"POST",variables:{input:n}}).then(r=>{var o,a;return(o=r.errors)!=null&&o.length?m(r.errors):V((a=r==null?void 0:r.data)==null?void 0:a.createCompanyAddress)}).catch(f)},Wt=`
  mutation UPDATE_COMPANY_ADDRESS($id: ID!, $input: CompanyAddressUpdateInput!) {
    updateCompanyAddress(id: $id, input: $input) {
      ...COMPANY_ADDRESS_FRAGMENT
    }
  }
  ${z}
`,zn=async(t,n)=>{if(!t)return{};const o={...at(n,{preserveIsDefaultWhenUnset:!0})};return delete o.address_type,await d(Wt,{method:"POST",variables:{id:t,input:o}}).then(a=>{var e,c;return(e=a.errors)!=null&&e.length?m(a.errors):V((c=a==null?void 0:a.data)==null?void 0:c.updateCompanyAddress)}).catch(f)},jt=`
  mutation DELETE_COMPANY_ADDRESS($id: ID!) {
    deleteCompanyAddress(id: $id)
  }
`,Vn=async t=>await d(jt,{method:"POST",variables:{id:t}}).then(n=>{var r,o;return(r=n.errors)!=null&&r.length?m(n.errors):!!((o=n==null?void 0:n.data)!=null&&o.deleteCompanyAddress)}).catch(n=>(console.error("[Account][API][deleteCompanyAddress] network error",n),f(n))),Qt=`
  mutation SET_DEFAULT_COMPANY_ADDRESS($id: ID!) {
    setDefaultCompanyAddress(id: $id) {
      ...COMPANY_ADDRESS_FRAGMENT
    }
  }
  ${z}
`,Hn=async t=>t?await d(Qt,{method:"POST",variables:{id:t}}).then(n=>{var r,o;return(r=n.errors)!=null&&r.length?m(n.errors):V((o=n==null?void 0:n.data)==null?void 0:o.setDefaultCompanyAddress)}).catch(f):{},Zt=`
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
`,Xt=t=>{if(!t||!(t.message||"").toLowerCase().includes("the company address does not exist"))return!1;const o=(t.path||[]).join(".");return o==="company.default_shipping_address"||o==="company.default_billing_address"},Kn=async()=>{var r,o;const t=await d(Zt,{method:"GET",cache:"no-cache"}).catch(a=>f(a));return(r=t.errors)!=null&&r.length&&!(!!((o=t==null?void 0:t.data)!=null&&o.company)&&t.errors.every(e=>Xt(e)))?m(t.errors):Ht(t)},tn=`
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
`,Jn=async()=>await d(tn,{method:"GET",cache:"no-cache"}).then(t=>{var n;return(n=t.errors)!=null&&n.length?m(t.errors):Tt(t)}).catch(f),nn=`
  query GET_CUSTOMER_COMPANY_CONTEXT {
    company {
      id
      name
    }
  }
`,Wn=async()=>await d(nn,{method:"GET",cache:"no-cache"}).then(t=>{var n,r,o;return(n=t.errors)!=null&&n.length&&m(t.errors),!!((o=(r=t==null?void 0:t.data)==null?void 0:r.company)!=null&&o.id)}).catch(f),J={canAccessAddressBook:!1,canViewAddress:!1,canCreateAddress:!1,canEditAddress:!1,canDeleteAddress:!1,canSetDefaultAddress:!1},A=(t,n)=>n.some(r=>t.has(r)),D={view:"Magento_CompanyAddressStorefrontCompatibility::company_address",add:"Magento_CompanyAddressStorefrontCompatibility::add",edit:"Magento_CompanyAddressStorefrontCompatibility::edit",delete:"Magento_CompanyAddressStorefrontCompatibility::delete",default:"Magento_CompanyAddressStorefrontCompatibility::default",setDefaultLegacy:"Magento_CompanyAddressStorefrontCompatibility::set_default"},rn=[D.default,D.setDefaultLegacy],on=["Magento_Company::view_address","company_address_view"],an=["company_address_edit","Magento_Company::edit_address"],en=["company_address_add","Magento_Company::add_address","Magento_Company::edit_address"],cn=["company_address_delete","Magento_Company::delete_address","Magento_Company::edit_address"],un=["company_address_set_default","Magento_Company::set_default_address","Magento_Company::edit_address"],sn=(t=[])=>{const n=new Set,r=[...t];for(;r.length;){const o=r.pop();o&&(typeof o.id=="string"&&n.add(o.id),Array.isArray(o.children)&&o.children.length&&r.push(...o.children))}return n},ln=t=>Array.from(t).some(n=>n.startsWith("Magento_CompanyAddressStorefrontCompatibility::")),_n=t=>A(t,["company_address_add","company_address_edit","company_address_delete","company_address_set_default"]),dn=t=>t?t.id==="0"||t.id===0||t.id==="MA=="||t.name==="Company Administrator":!1,fn=()=>["Magento_Company::view_address","Magento_Company::edit_address","Magento_CompanyAddressStorefrontCompatibility::company_address","Magento_CompanyAddressStorefrontCompatibility::add","Magento_CompanyAddressStorefrontCompatibility::edit","Magento_CompanyAddressStorefrontCompatibility::delete","Magento_CompanyAddressStorefrontCompatibility::default","Magento_CompanyAddressStorefrontCompatibility::set_default","company_address_add","company_address_edit","company_address_delete","company_address_set_default"],gn=t=>{if(!t)return J;const n=sn(t.permissions||[]),r=new Set(n);dn(t)&&fn().forEach(h=>r.add(h));const o=ln(r),a=o?A(r,[D.view]):A(r,on),e=_n(r),c=o?A(r,[D.edit]):e?A(r,["company_address_edit"]):A(r,an),s=o?A(r,[D.add]):e?A(r,["company_address_add"]):A(r,en),i=o?A(r,[D.delete]):e?A(r,["company_address_delete"]):A(r,cn),_=o?A(r,rn):e?A(r,["company_address_set_default"]):A(r,un);return{canAccessAddressBook:a,canViewAddress:a,canCreateAddress:s,canEditAddress:c,canDeleteAddress:i,canSetDefaultAddress:_}},mn=t=>{var r,o,a;if((r=t==null?void 0:t.errors)!=null&&r.length)return J;const n=((a=(o=t==null?void 0:t.data)==null?void 0:o.customer)==null?void 0:a.role)??null;return gn(n)},jn=()=>J,hn=`
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
`,Qn=async()=>await d(hn,{method:"GET",cache:"no-cache"}).then(t=>mn(t)).catch(f),An=`
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
`,Zn=async()=>{const t="_account_countries",n=sessionStorage.getItem(t);return n?JSON.parse(n):await d(An,{method:"GET",cache:"no-cache"}).then(r=>{var a;if((a=r.errors)!=null&&a.length)return m(r.errors);const o=Rt(r);return sessionStorage.setItem(t,JSON.stringify(o)),o}).catch(f)},Cn=`
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
`,Xn=async t=>{const n=`_account_regions_${t}`,r=sessionStorage.getItem(n);return r?JSON.parse(r):await d(Cn,{method:"GET",cache:"no-cache",variables:{countryCode:t}}).then(o=>{var e;if((e=o.errors)!=null&&e.length)return m(o.errors);const a=Ot(o);return sessionStorage.setItem(n,JSON.stringify(a)),a}).catch(f)},Sn=`
  mutation UPDATE_CUSTOMER_ADDRESS($id: Int!, $input: CustomerAddressInput) {
    updateCustomerAddress(id: $id, input: $input) {
      firstname
    }
  }
`,tr=async t=>{const{addressId:n,...r}=t;return n?await d(Sn,{method:"POST",variables:{id:Number(n),input:G(r,"snakeCase",{custom_attributesV2:"custom_attributesV2",firstName:"firstname",lastName:"lastname",middleName:"middlename"})}}).then(o=>{var a,e,c;return(a=o.errors)!=null&&a.length?m(o.errors):((c=(e=o==null?void 0:o.data)==null?void 0:e.updateCustomerAddress)==null?void 0:c.firstname)||""}).catch(f):""},En=`
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
`,nr=async()=>await d(En,{method:"GET",cache:"no-cache"}).then(t=>{var n;return(n=t.errors)!=null&&n.length?m(t.errors):bt(t)}).catch(f),yn=`
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
`,rr=async(t,n)=>await d(yn,{method:"GET",cache:"no-cache",variables:{pageSize:t,currentPage:n}}).then(r=>{var o;return(o=r.errors)!=null&&o.length?m(r.errors):qt(r)}).catch(f),pn=`
  mutation REMOVE_CUSTOMER_ADDRESS($id: Int!) {
    deleteCustomerAddress(id: $id)
  }
`,or=async t=>await d(pn,{method:"POST",variables:{id:t}}).then(n=>{var r;return(r=n.errors)!=null&&r.length?m(n.errors):n.data.deleteCustomerAddress}).catch(f),Tn=`
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
`,ar=async t=>await d(Tn,{method:"GET",cache:"no-cache"}).then(n=>{var o,a,e;if((o=n.errors)!=null&&o.length)return m(n.errors);const r=((e=(a=n.data)==null?void 0:a.customerPaymentTokens)==null?void 0:e.items)??[];return Lt(r,t)}).catch(f),bn=`
  mutation deletePaymentToken($public_hash: String!) {
    deletePaymentToken(public_hash: $public_hash) {
      result
    }
  }
`,er=async t=>await d(bn,{method:"POST",variables:{public_hash:t}}).then(n=>{var r,o,a;return(r=n.errors)!=null&&r.length?m(n.errors):!!((a=(o=n.data)==null?void 0:o.deletePaymentToken)!=null&&a.result)}).catch(f),Rn=`
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
  ${_t}
`,On={sort_direction:"DESC",sort_field:"CREATED_AT"},ir=async(t,n,r)=>{const o=n.includes("viewAll")?{}:{order_date:JSON.parse(n)};return await d(Rn,{method:"GET",cache:"no-cache",variables:{pageSize:t,currentPage:r,filter:o,sort:On}}).then(a=>Pt(a)).catch(f)},Mn=`
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
`,cr=async({currentPassword:t,newPassword:n})=>await d(Mn,{method:"POST",variables:{currentPassword:t,newPassword:n}}).then(r=>{var o,a,e;return(o=r.errors)!=null&&o.length?m(r.errors):((e=(a=r==null?void 0:r.data)==null?void 0:a.changeCustomerPassword)==null?void 0:e.email)||""}).catch(f),Nn=`
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
`,ur=async()=>await d(Nn,{method:"GET",cache:"force-cache"}).then(t=>{var n;return(n=t.errors)!=null&&n.length?m(t.errors):Dt(t)}).catch(f),In=`
  mutation UPDATE_CUSTOMER_EMAIL($email: String!, $password: String!) {
    updateCustomerEmail(email: $email, password: $password) {
      customer {
        email
      }
    }
  }
`,sr=async({email:t,password:n})=>await d(In,{method:"POST",variables:{email:t,password:n}}).then(r=>{var o,a,e,c;return(o=r.errors)!=null&&o.length?m(r.errors):((c=(e=(a=r==null?void 0:r.data)==null?void 0:a.updateCustomerEmail)==null?void 0:e.customer)==null?void 0:c.email)||""}).catch(f),Pn=`
  mutation UPDATE_CUSTOMER_V2($input: CustomerUpdateInput!) {
    updateCustomerV2(input: $input) {
      customer {
        email
        allow_remote_shopping_assistance
      }
    }
  }
`,lr=async t=>await d(Pn,{method:"POST",variables:{input:G(t,"snakeCase",{firstName:"firstname",lastName:"lastname",middleName:"middlename",dob:"date_of_birth",custom_attributesV2:"custom_attributes"})}}).then(n=>{var r,o,a,e;return(r=n.errors)!=null&&r.length?m(n.errors):((e=(a=(o=n==null?void 0:n.data)==null?void 0:o.updateCustomerV2)==null?void 0:a.customer)==null?void 0:e.email)||""}).catch(f);export{gt as a,K as b,G as c,w as config,Yn as createCompanyAddress,qn as createCustomerAddress,Vn as deleteCompanyAddress,er as deletePaymentToken,d as fetchGraphQl,jn as g,rr as getAdminAssistanceActions,Ln as getAttributesForm,Kn as getCompanyAddressBook,Fn as getConfig,Zn as getCountries,nr as getCustomer,Jn as getCustomerAddress,Wn as getCustomerCompanyContext,ar as getCustomerPaymentTokens,Qn as getCustomerRolePermissions,ir as getOrderHistoryList,Xn as getRegions,ur as getStoreConfig,rt as initialize,or as removeCustomerAddress,$n as removeFetchGraphQlHeader,Hn as setDefaultCompanyAddress,vn as setEndpoint,xn as setFetchGraphQlHeader,kn as setFetchGraphQlHeaders,Bn as t,zn as updateCompanyAddress,lr as updateCustomer,tr as updateCustomerAddress,sr as updateCustomerEmail,cr as updateCustomerPassword};
//# sourceMappingURL=api.js.map
