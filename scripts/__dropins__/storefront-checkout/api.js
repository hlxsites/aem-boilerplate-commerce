/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as h}from"@dropins/tools/event-bus.js";import{merge as ee,Initializer as ve,deepmerge as qe}from"@dropins/tools/lib.js";import{ESTIMATE_SHIPPING_METHOD_FRAGMENT as we,CHECKOUT_DATA_FRAGMENT as I,CUSTOMER_FRAGMENT as $e,NEGOTIABLE_QUOTE_FRAGMENT as T}from"./fragments.js";import{signal as Ue,computed as te}from"@dropins/tools/signals.js";import{FetchGraphQL as De}from"@dropins/tools/fetch-graphql.js";const Re={authenticated:!1,cartId:null,config:null,initialized:!1,quoteId:null},s=new Proxy(Re,{set(e,t,n){return e[t]=n,!0},get(e,t){return e[t]}});function qn(){return s.quoteId!==null}const Qe=async(e=!1)=>{s.authenticated=e},Pe=`
  mutation estimateShippingMethods(
    $cartId: String!
    $address: EstimateAddressInput!
  ) {
    estimateShippingMethods(input: { cart_id: $cartId, address: $address }) {
      ...ESTIMATE_SHIPPING_METHOD_FRAGMENT
    }
  }

  ${we}
`;function Ge({code:e,...t}){return{code:e,...t}}function xe({code:e,...t}){return{code:e,...t}}const Be=e=>{if("carrier_code"in e&&"method_code"in e)return e;const t=e,{carrierCode:n,methodCode:r,...i}=t;return{carrier_code:n,method_code:r,...i}};function Le(e){return e.map(Be)}function P(e){var t;return{fax:e.fax,middlename:e.middleName,prefix:e.prefix,suffix:e.suffix,vat_id:e.vatId,city:e.city,custom_attributes:((t=e.customAttributes)==null?void 0:t.map(n=>({attribute_code:n.code,value:n.value})))||[],company:e.company,country_code:e.countryCode,firstname:e.firstName,lastname:e.lastName,postcode:e.postcode,region:e.region,region_id:e.regionId,save_in_address_book:e.saveInAddressBook,street:e.street,telephone:e.telephone}}function Fe(e){const{companyAddressId:t,customerAddressId:n,pickupLocationCode:r,address:i}=e,o={};return t?{company_address_id:t}:n?{customer_address_id:n}:(r&&(o.pickup_location_code=r),!r&&i&&(o.address=P(i)),o)}function ke(e){const{customerAddressUid:t,address:n}=e,r={};return t?{customer_address_uid:t}:(n&&(r.address=P(n)),r)}function je(e){const{companyAddressId:t,customerAddressId:n,sameAsShipping:r=!1,useForShipping:i=!1,address:o}=e,a={use_for_shipping:i,same_as_shipping:r};return!r&&t?(a.company_address_id=t,a):!r&&n?(a.customer_address_id=n,a):(!r&&o&&(a.address=P(o)),a)}function Ve(e){const{customerAddressUid:t,sameAsShipping:n=!1,useForShipping:r=!1,address:i}=e,o={use_for_shipping:r,same_as_shipping:n};return!n&&t?(o.customer_address_uid=t,o):(!n&&i&&(o.address=P(i)),o)}const He=e=>e?"code"in e&&"value"in e:!1,ne=e=>e?e.filter(He).map(t=>{const{code:n,value:r}=t;return{code:n,value:r}}):[],re=e=>{if(!e)return;const{code:t,title:n,...r}=e;return{code:t,title:n,additionalData:r}},ie=e=>{if(e)return e.filter(t=>!!t).map(t=>{const{code:n,title:r,...i}=t;return{code:n,title:r,additionalData:i}})},se=e=>{const t=e.street.filter(Boolean);return{city:e.city,company:e.company||void 0,country:ue(e.country),customAttributes:ne(e.custom_attributes),fax:e.fax||void 0,firstName:e.firstname,id:(e==null?void 0:e.id)||void 0,lastName:e.lastname,middleName:e.middlename||void 0,postCode:e.postcode||void 0,prefix:e.prefix||void 0,region:ce(e.region),street:t,suffix:e.suffix||void 0,telephone:e.telephone||void 0,uid:e.uid,vatId:e.vat_id||void 0}},ze=e=>{if(e)return se(e)},Xe=e=>e.filter(t=>!!t).map(t=>{const{available_shipping_methods:n,selected_shipping_method:r,same_as_billing:i,...o}=t;return{...se(o),availableShippingMethods:F(n),selectedShippingMethod:me(r),sameAsBilling:i}}),wn=e=>{var t,n;if(e)return{city:e.city,company:e.company,countryCode:e.country.code,customAttributes:e.customAttributes||[],firstName:e.firstName,lastName:e.lastName,postcode:e.postCode,region:(t=e.region)==null?void 0:t.code,regionId:(n=e.region)==null?void 0:n.id,street:e.street,telephone:e.telephone,vatId:e.vatId,prefix:e.prefix,suffix:e.suffix,middleName:e.middleName,fax:e.fax}},N=e=>{var n,r,i;if(!e)return;const t={type:"cart",availablePaymentMethods:ie(e.available_payment_methods),billingAddress:ze(e.billing_address),email:e.email??void 0,id:e.id,isEmpty:e.total_quantity===0,isVirtual:e.is_virtual,hasAvailableFreeGifts:!!e.has_available_free_gifts,selectedPaymentMethod:re(e.selected_payment_method),shippingAddresses:Xe(e.shipping_addresses),isGuest:!s.authenticated};return ee(t,(i=(r=(n=$.getConfig().models)==null?void 0:n.CartModel)==null?void 0:r.transformer)==null?void 0:i.call(r,e))},Ke=e=>!e||!(e!=null&&e.available_credit)||e.available_credit.value==null||!e.available_credit.currency?null:{availableCredit:{value:e.available_credit.value,currency:e.available_credit.currency},exceedLimit:(e==null?void 0:e.exceed_limit)||!1},oe=e=>{const t=e.street.filter(Boolean);return{city:e.city,company:e.company||void 0,country:ue(e.country),customAttributes:ne(e.custom_attributes),customerAddressUid:e.customer_address_uid||void 0,fax:e.fax||void 0,firstName:e.firstname,lastName:e.lastname,middleName:e.middlename||void 0,postCode:e.postcode||void 0,prefix:e.prefix||void 0,region:ce(e.region),street:t,suffix:e.suffix||void 0,telephone:e.telephone||void 0,uid:e.uid,vatId:e.vat_id||void 0}},Ye=e=>{if(e)return oe(e)},We=e=>e.filter(t=>!!t).map(t=>{const{available_shipping_methods:n,selected_shipping_method:r,...i}=t;return{...oe(i),availableShippingMethods:F(n),selectedShippingMethod:me(r)}});var ae=(e=>(e.MANUAL="manual",e.AUTO="auto",e))(ae||{}),M=(e=>(e.EXCLUDING_TAX="EXCLUDING_TAX",e.INCLUDING_EXCLUDING_TAX="INCLUDING_AND_EXCLUDING_TAX",e.INCLUDING_TAX="INCLUDING_TAX",e))(M||{});const Je=e=>e?e.filter(t=>!!t).map(t=>({id:t.agreement_id,name:t.name,mode:ae[t.mode],text:t.checkbox_text,content:{value:t.content,html:t.is_html,height:t.content_height??null}})):[],ue=e=>({code:(e==null?void 0:e.code)??"",label:(e==null?void 0:e.label)??""}),Ze=e=>{var n,r,i;if(!e)return null;const t={firstName:e.firstname||"",lastName:e.lastname||"",email:e.email||""};return ee(t,(i=(r=(n=$.getConfig().models)==null?void 0:n.CustomerModel)==null?void 0:r.transformer)==null?void 0:i.call(r,e))},et=e=>!!(e!=null&&e.is_email_available),w=e=>e?{type:"quote",availablePaymentMethods:ie(e.available_payment_methods),billingAddress:Ye(e.billing_address),email:e.email??"",isEmpty:e.total_quantity===0,isVirtual:e.is_virtual,name:e.name,selectedPaymentMethod:re(e.selected_payment_method),shippingAddresses:We(e.shipping_addresses),status:e.status,uid:e.uid}:null,ce=e=>{if(!(!(e!=null&&e.code)||!(e!=null&&e.label)))return{code:e.code,name:e.label,id:e.region_id??void 0}};function tt(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var nt=function(t){return rt(t)&&!it(t)};function rt(e){return!!e&&typeof e=="object"}function it(e){var t=Object.prototype.toString.call(e);return t==="[object RegExp]"||t==="[object Date]"||at(e)}var st=typeof Symbol=="function"&&Symbol.for,ot=st?Symbol.for("react.element"):60103;function at(e){return e.$$typeof===ot}function ut(e){return Array.isArray(e)?[]:{}}function q(e,t){return t.clone!==!1&&t.isMergeableObject(e)?S(ut(e),e,t):e}function ct(e,t,n){return e.concat(t).map(function(r){return q(r,n)})}function lt(e,t){if(!t.customMerge)return S;var n=t.customMerge(e);return typeof n=="function"?n:S}function dt(e){return Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e).filter(function(t){return Object.propertyIsEnumerable.call(e,t)}):[]}function X(e){return Object.keys(e).concat(dt(e))}function le(e,t){try{return t in e}catch{return!1}}function pt(e,t){return le(e,t)&&!(Object.hasOwnProperty.call(e,t)&&Object.propertyIsEnumerable.call(e,t))}function ht(e,t,n){var r={};return n.isMergeableObject(e)&&X(e).forEach(function(i){r[i]=q(e[i],n)}),X(t).forEach(function(i){pt(e,i)||(le(e,i)&&n.isMergeableObject(t[i])?r[i]=lt(i,n)(e[i],t[i],n):r[i]=q(t[i],n))}),r}function S(e,t,n){n=n||{},n.arrayMerge=n.arrayMerge||ct,n.isMergeableObject=n.isMergeableObject||nt,n.cloneUnlessOtherwiseSpecified=q;var r=Array.isArray(t),i=Array.isArray(e),o=r===i;return o?r?n.arrayMerge(e,t,n):ht(e,t,n):q(t,n)}S.all=function(t,n){if(!Array.isArray(t))throw new Error("first argument should be an array");return t.reduce(function(r,i){return S(r,i,n)},{})};var mt=S,gt=mt;const de=tt(gt),ft={arrayMerge:(e,t,n)=>{const r=e.slice();return t.forEach((i,o)=>{typeof r[o]>"u"?r[o]=n.cloneUnlessOtherwiseSpecified(i,n):n.isMergeableObject(i)?r[o]=de(e[o],i,n):e.indexOf(i)===-1&&r.push(i)}),r}};function _t(e,t){return t?de(e,t,ft):e}const K=e=>({countryCode:e.country_id,postCode:e.postcode||"",...e.region_id?{regionId:Number(e.region_id)}:{...e.region?{region:e.region}:{}}}),yt=e=>({carrierCode:e.carrier.code||"",methodCode:e.code||"",amount:e.amount,amountExclTax:e.amountExclTax,amountInclTax:e.amountInclTax}),It=e=>{var n,r,i;const t=F(e);return _t(t,(i=(r=(n=$.getConfig().models)==null?void 0:n.EstimateShippingModel)==null?void 0:r.transformer)==null?void 0:i.call(r,e))},At=(e,t)=>e.amount.value-t.amount.value,Et=e=>e==null,pe=e=>!(!e||!e.method_code||!e.method_title||Et(e.amount.value)||!e.amount.currency),he=e=>({amount:{value:e.amount.value,currency:e.amount.currency},title:e.method_title,code:e.method_code,carrier:{code:e.carrier_code,title:e.carrier_title},value:`${e.carrier_code} - ${e.method_code}`,...e.price_excl_tax&&{amountExclTax:{value:e.price_excl_tax.value,currency:e.price_excl_tax.currency}},...e.price_incl_tax&&{amountInclTax:{value:e.price_incl_tax.value,currency:e.price_incl_tax.currency}},...e.original_amount&&{originalAmount:{value:e.original_amount.value,currency:e.original_amount.currency}}}),me=e=>{if(pe(e))return he(e)},F=e=>e?e.filter(pe).map(t=>he(t)).sort(At):[];var E=(e=>(e.Updates="updates",e.Default="default",e.ShippingEstimate="shippingEstimate",e))(E||{});const Q=new Map,x=new Map,b=Ue(new Set),ge=new Map;ge.set("updates",e=>{h.emit("checkout/updated",e)});async function Ct(e){x.set(e,!0);const t=Q.get(e);let n;for(;t.length>0;){const o=t.shift();try{const a=await o.requestFn();o.resolve(a),n=a}catch(a){o.reject(a)}}x.set(e,!1);const r=new Set(b.value);r.delete(e),b.value=r;const i=ge.get(e);i&&n&&i(n)}function Mt(e,t="default"){Q.has(t)||Q.set(t,[]);const n=Q.get(t),r=new Promise((o,a)=>{n.push({requestFn:e,resolve:o,reject:a})}),i=new Set(b.value);return i.add(t),b.value=i,x.get(t)||Ct(t),r}const $n=te(()=>b.value.has("updates")),Un=te(()=>b.value.has("shippingEstimate")),St=["sender_email","recipient_email"];function bt(e){return e.filter(t=>!t.path||!St.some(n=>{var r;return((r=t.path)==null?void 0:r.at(-1))===n}))}class Tt extends Error{constructor(t){super(t.map(n=>n.message).join(" ")),this.name="FetchError"}}class y extends Error{constructor(t){super(t),this.name="InvalidInput"}}class A extends y{constructor(t){super(`${t} is required.`)}}class k extends A{constructor(){super("Cart ID")}}class Nt extends y{constructor(){super("Either Cart ID or Quote ID is required.")}}class fe extends Error{constructor(){super("User is not authenticated")}}class Ot extends A{constructor(){super("Negotiable Quote ID")}}class vt extends A{constructor(){super("Email")}}class qt extends A{constructor(){super("Payment method code")}}class _e extends A{constructor(){super("Shipping address")}}class wt extends A{constructor(){super("Shipping method")}}class ye extends A{constructor(){super("Billing address")}}class $t extends A{constructor(){super("Country Code")}}var v=(e=>(e.INVALID_INPUT="INVALID_INPUT",e.SERVER_ERROR="SERVER_ERROR",e.UNAUTHENTICATED="UNAUTHENTICATED",e.UNKNOWN_ERROR="UNKNOWN_ERROR",e.QUOTE_DATA_ERROR="QUOTE_DATA_ERROR",e.QUOTE_PERMISSION_DENIED="QUOTE_PERMISSION_DENIED",e.PERMISSION_DENIED="PERMISSION_DENIED",e))(v||{});const Ut=["PlaceOrderError"],Dt=[{code:"INVALID_INPUT",matches:e=>e instanceof y},{code:"UNAUTHENTICATED",matches:e=>e instanceof fe},{code:"SERVER_ERROR",matches:e=>!e||typeof e!="object"||!("name"in e)?!1:Ut.includes(e.name)}];function Dn(e){const t=Dt.find(n=>n.matches(e));return t?t.code:v.UNKNOWN_ERROR}function Rt(e,t){return t.split(".").reduce((n,r)=>n&&n[r]!==void 0?n[r]:void 0,e)}async function m(e){const{defaultValueOnFail:t,options:n,path:r,query:i,queueName:o,transformer:a,type:g}=e;try{const u=async()=>{const{data:l,errors:c}=await Vt(i,{method:g==="query"?"GET":"POST",cache:g==="query"?"no-cache":void 0,...n});if(c){const f=bt(c);if(f.length>0)throw new Tt(f)}const d=Rt(l,r);if(d===void 0)throw new Error(`No data found at path: ${r}`);return a?a(d):d};return g==="mutation"?await Mt(u,o):await u()}catch(u){if(t!==void 0)return t;throw u}}function Qt(){return h.lastPayload("checkout/initialized")??null}function Pt(){return h.lastPayload("checkout/updated")??null}function Ie(){return Pt()??Qt()}function Rn(){var t;const e=Ie();return!!((t=e==null?void 0:e.shippingAddresses)!=null&&t.length)}function Qn(){const e=Ie();return(e==null?void 0:e.email)??null}const j={EMAIL:/^[a-z0-9,!#$%&'*+/=?^_`{|}~-]+(\.[a-z0-9,!#$%&'*+/=?^_`{|}~-]+)*@([a-z0-9-]+\.)+[a-z]{2,}$/i,NOT_EMPTY:/^(?!\s*$).+/},Pn=e=>j.EMAIL.test(e),Gn=e=>j.NOT_EMPTY.test(e),xn={NOT_EMPTY:j.NOT_EMPTY.source},Gt={email:"",isBillToShipping:void 0,selectedPaymentMethod:null,selectedPaymentMethodCartCode:null,selectedShippingMethod:null};function Bn(e){const n={...h.lastPayload("checkout/values")??Gt,...e};h.emit("checkout/values",n)}function Ae(e){const t=h.lastPayload("checkout/values");return t&&e in t?t[e]:null}const xt=`
  query getStoreConfig {
    storeConfig {
      default_country
      is_checkout_agreements_enabled
      is_guest_checkout_enabled
      is_one_page_checkout_enabled
      shopping_cart_display_shipping
    }
  }
`,Bt="US",B={defaultCountry:Bt,agreementsEnabled:!0,shoppingCartDisplaySetting:{shipping:M.EXCLUDING_TAX}},Lt=async()=>await m({defaultValueOnFail:B,options:{method:"GET",cache:"no-cache"},path:"storeConfig",query:xt,transformer:kt,type:"query"}),Ln=()=>s.config;function Ft(e){switch(e){case 1:return M.EXCLUDING_TAX;case 2:return M.INCLUDING_TAX;case 3:return M.INCLUDING_EXCLUDING_TAX;default:return M.EXCLUDING_TAX}}function kt(e){if(!e)return B;const{default_country:t,is_checkout_agreements_enabled:n,shopping_cart_display_shipping:r}=e;return{defaultCountry:t||B.defaultCountry,agreementsEnabled:n,shoppingCartDisplaySetting:{shipping:Ft(r)}}}const jt=e=>e.map(({payment_method_code:t,public_hash:n,details:r})=>({code:t,title:t,additionalData:{publicHash:n,details:r??void 0}})),Fn=async e=>{var l,c,d,f;const t=s.cartId,n=((l=e==null?void 0:e.criteria)==null?void 0:l.country_code)??((c=s.config)==null?void 0:c.defaultCountry);if(!t)throw new k;if(!n)throw new $t;const{region_id:r,region_name:i,zip:o}=(e==null?void 0:e.criteria)??{},a=r||i?{region_id:typeof r=="string"?parseInt(r,10):r,region_code:i}:void 0,g={country_code:n,...o&&{postcode:o},...a&&{region:{...a.region_id&&{region_id:a.region_id},...a.region_code&&{region_code:a.region_code}}}},u={country_id:n,region:(d=g.region)==null?void 0:d.region_code,region_id:(f=g.region)==null?void 0:f.region_id,postcode:o},p=K(u);return m({options:{variables:{cartId:t,address:g}},path:"estimateShippingMethods",query:Pe,queueName:E.ShippingEstimate,transformer:It,type:"mutation"}).then(_=>{const{defaults:U,shipping:D}=$.getConfig(),V=D!=null&&D.filterOptions?_.filter(D.filterOptions):_,Ne=V.length>0,Oe=K(u);let H=null;if(Ne){const C=Ae("selectedShippingMethod");let O=_.find(z=>z.code===(C==null?void 0:C.code)&&z.carrier.code===(C==null?void 0:C.carrier.code));!O&&(U!=null&&U.selectedShippingMethod)&&(O=U.selectedShippingMethod(_)??void 0),O||(O=_[0]),H=yt(O)}return h.emit("shipping/estimate",{address:Oe,availableShippingMethods:_,shippingMethod:H,success:!0}),V}).catch(_=>{throw h.emit("shipping/estimate",{address:p,shippingMethod:null,availableShippingMethods:[],success:!1}),_})},{setEndpoint:kn,setFetchGraphQlHeader:jn,removeFetchGraphQlHeader:Vn,setFetchGraphQlHeaders:Hn,fetchGraphQl:Vt,getConfig:zn}=new De().getMethods(),Ht=`
  query getCart($cartId: String!) {
    cart(cart_id: $cartId) {
      ...CHECKOUT_DATA_FRAGMENT
    }
  }

  ${I}
`,zt=`
  query getCustomerCart {
    cart: customerCart {
      ...CHECKOUT_DATA_FRAGMENT
    }
  }

  ${I}
`,Ee=async()=>{const e=s.cartId,t=s.authenticated===!1,n=t?Ht:zt,r=t?{cartId:e}:{};if(t&&!e)throw new k;return await m({type:"query",query:n,options:{method:"POST",cache:"no-cache",variables:r},path:"cart",transformer:N})},Xt=`
  query GET_CHECKOUT_AGREEMENTS {
    checkoutAgreements {
      agreement_id
      checkbox_text
      content
      content_height
      is_html
      mode
      name
    }
  }
`,Xn=async()=>await m({defaultValueOnFail:[],options:{method:"GET",cache:"no-cache"},path:"checkoutAgreements",query:Xt,transformer:Je,type:"query"}),Kt=`
  query getCompanyCredit {
    company {
      credit {
        exceed_limit
        available_credit {
          value
          currency
        }
      }
    }
  }
`,Kn=async()=>await m({type:"query",query:Kt,options:{method:"GET",cache:"no-cache"},path:"company.credit",transformer:Ke,defaultValueOnFail:null}),Yt=`
  query getCustomer {
    customer {
      ...CUSTOMER_FRAGMENT
    }
  }

  ${$e}
`,Yn=async()=>s.authenticated?await m({options:{method:"GET",cache:"no-cache"},path:"customer",query:Yt,transformer:Ze,type:"query"}):null,Wt=`
  query getNegotiableQuote($quoteId: ID!) {
    negotiableQuote(uid: $quoteId) {
      ...NEGOTIABLE_QUOTE_FRAGMENT
    }
  }

  ${T}
`,Ce=async(e={})=>{const t=e.uid??s.quoteId;if(s.authenticated===!1)throw new fe;if(!t)throw new Ot;return await m({type:"query",query:Wt,options:{method:"GET",cache:"no-cache",variables:{quoteId:t}},path:"negotiableQuote",transformer:w})},Jt=`
  query getStoredPaymentMethods {
    customerPaymentTokens {
      items {
        details
        payment_method_code
        public_hash
        type
      }
    }
  }
`,Wn=async()=>s.authenticated?await m({type:"query",query:Jt,options:{method:"GET",cache:"no-cache"},path:"customerPaymentTokens.items",transformer:jt,defaultValueOnFail:[]}):[],R={eager:!0},Zt=e=>{var a,g;const t=((g=(a=e==null?void 0:e.features)==null?void 0:a.b2b)==null?void 0:g.quotes)??!1;return[["authenticated",(u=!1)=>{var l,c,d;if(Qe(u),!t||u)return;const p=(d=(c=(l=e==null?void 0:e.features)==null?void 0:l.b2b)==null?void 0:c.routeLogin)==null?void 0:d.call(c);p&&window.location.assign(p)},R],...t?[["quote-management/quote-data/initialized",u=>{var p,l,c,d;if(!u.quote.canCheckout){const f=((d=(c=(l=(p=e==null?void 0:e.langDefinitions)==null?void 0:p.default)==null?void 0:l.Checkout)==null?void 0:c.Quote)==null?void 0:d.permissionDenied)||"You do not have permission to checkout with this quote.";h.emit("checkout/error",{message:f,code:v.QUOTE_PERMISSION_DENIED});return}L(u.quote)},R],["quote-management/quote-data/error",()=>{var p,l,c,d;const u=((d=(c=(l=(p=e==null?void 0:e.langDefinitions)==null?void 0:p.default)==null?void 0:l.Checkout)==null?void 0:c.Quote)==null?void 0:d.dataError)||"We were unable to retrieve the quote data. Please try again later.";h.emit("checkout/error",{message:u,code:v.QUOTE_DATA_ERROR})}]]:[["cart/initialized",L,R],["cart/reset",be],["cart/updated",Te],["auth/permissions",u=>{var p,l,c,d;if(u.admin!==!0&&!u["Magento_Sales::place_order"]){const f=((d=(c=(l=(p=e==null?void 0:e.langDefinitions)==null?void 0:p.default)==null?void 0:l.Checkout)==null?void 0:c.ServerError)==null?void 0:d.permissionDenied)||"You do not have permission to complete checkout. Please contact your administrator for assistance.";h.emit("checkout/error",{message:f,code:v.PERMISSION_DENIED})}},R]]].map(([u,p,l])=>h.on(u,p,l))},en=new URL(window.location.href),tn=en.searchParams.get("quoteId");s.quoteId=tn;const Me=new ve({init:async(e={})=>{Me.config.setConfig(qe({defaults:{isBillToShipping:!0,selectedShippingMethod:t=>t.length>0?t[0]:null},features:{b2b:{quotes:!1}}},e))},listeners:Zt}),$=Me.config,Se=e=>"id"in e,nn=async e=>{try{return Se(e)?(s.cartId=e.id,s.quoteId=null,await Ee()??null):(s.cartId=null,s.quoteId=e.uid,await Ce()??null)}catch(t){return console.error("Checkout initialization failed:",t),null}},L=async e=>{if(s.initialized){await Te(e);return}s.config||(s.config=await Lt());const t=e?await nn(e):null;s.initialized=!0,h.emit("checkout/initialized",t)},rn=`
  query isEmailAvailable($email: String!) {
    isEmailAvailable(email: $email) {
      is_email_available
    }
  }
`,Jn=async e=>{if(!e)throw new vt;return await m({options:{method:"GET",cache:"no-cache",variables:{email:e}},path:"isEmailAvailable",query:rn,transformer:et,type:"query"})},be=()=>{s.initialized&&(s.cartId=null,s.quoteId=null,h.emit("checkout/updated",null))},sn=`
  mutation setBillingAddress(
    $cartId: String!
    $billingAddress: BillingAddressInput!
  ) {
    setBillingAddressOnCart(
      input: { cart_id: $cartId, billing_address: $billingAddress }
    ) {
      cart {
        ...CHECKOUT_DATA_FRAGMENT
      }
    }
  }

  ${I}
`,on=`
  mutation setBillingAddressOnQuote(
    $quoteId: ID!
    $billingAddress: NegotiableQuoteBillingAddressInput!
  ) {
    setNegotiableQuoteBillingAddress(
      input: { quote_uid: $quoteId, billing_address: $billingAddress }
    ) {
      quote {
        ...NEGOTIABLE_QUOTE_FRAGMENT
      }
    }
  }

  ${T}
`,G=()=>{const{cartId:e,quoteId:t}=s;if(!e&&!t)throw new Nt},Y=(e,t,n,r,i,o)=>async a=>await m({type:"mutation",query:n,options:{variables:{[t]:e,billingAddress:i(a)}},path:o,queueName:E.Updates,transformer:r}),an=({address:e,companyAddressId:t,customerAddressId:n,customerAddressUid:r,sameAsShipping:i=!1})=>{if(!t){if(!n&&r)throw new y("customerAddressUid is not supported");if(!i&&!n&&!e)throw new ye}},un=({address:e,customerAddressId:t,customerAddressUid:n,sameAsShipping:r=!1})=>{if(!n&&t)throw new y("customerAddressId is not supported");if(!r&&!n&&!e)throw new ye},cn=e=>{const t=!!s.cartId,n=!!s.quoteId;t?an(e):n&&un(e)},Zn=async e=>(G(),cn(e),await(!!s.cartId?Y(s.cartId,"cartId",sn,N,je,"setBillingAddressOnCart.cart"):Y(s.quoteId,"quoteId",on,w,Ve,"setNegotiableQuoteBillingAddress.quote"))(e)),ln=`
  mutation setGuestEmail($cartId: String!, $email: String!) {
    setGuestEmailOnCart(input: { cart_id: $cartId, email: $email }) {
      cart {
        ...CHECKOUT_DATA_FRAGMENT
      }
    }
  }

  ${I}
`,er=async e=>{const t=s.cartId;if(!t)throw new k;return await m({options:{variables:{cartId:t,email:e}},path:"setGuestEmailOnCart.cart",query:ln,queueName:E.Updates,transformer:N,type:"mutation"})},dn=`
  mutation setPaymentMethodOnCart(
    $cartId: String!
    $input: PaymentMethodInput!
  ) {
    setPaymentMethodOnCart(
      input: { cart_id: $cartId, payment_method: $input }
    ) {
      cart {
        ...CHECKOUT_DATA_FRAGMENT
      }
    }
  }

  ${I}
`,pn=`
  mutation setPaymentMethodOnQuote(
    $quoteId: ID!
    $input: NegotiableQuotePaymentMethodInput!
  ) {
    setNegotiableQuotePaymentMethod(
      input: { quote_uid: $quoteId, payment_method: $input }
    ) {
      quote {
        ...NEGOTIABLE_QUOTE_FRAGMENT
      }
    }
  }

  ${T}
`,W=(e,t,n,r,i,o)=>async a=>await m({type:"mutation",query:n,options:{variables:{[t]:e,input:i(a)}},path:o,queueName:E.Updates,transformer:r}),hn=e=>{if(!e.code)throw new qt},tr=async e=>(G(),hn(e),await(!!s.cartId?W(s.cartId,"cartId",dn,N,Ge,"setPaymentMethodOnCart.cart"):W(s.quoteId,"quoteId",pn,w,xe,"setNegotiableQuotePaymentMethod.quote"))(e)),mn=`
  mutation setShippingAddressOnCartAndUseAsBilling(
    $cartId: String!
    $shippingAddress: ShippingAddressInput!
  ) {
    setShippingAddressesOnCart(
      input: { cart_id: $cartId, shipping_addresses: [$shippingAddress] }
    ) {
      cart {
        id
      }
    }

    setBillingAddressOnCart(
      input: { cart_id: $cartId, billing_address: { same_as_shipping: true } }
    ) {
      cart {
        ...CHECKOUT_DATA_FRAGMENT
      }
    }
  }

  ${I}
`,gn=`
  mutation setShippingAddressOnCart(
    $cartId: String!
    $shippingAddress: ShippingAddressInput!
  ) {
    setShippingAddressesOnCart(
      input: { cart_id: $cartId, shipping_addresses: [$shippingAddress] }
    ) {
      cart {
        ...CHECKOUT_DATA_FRAGMENT
      }
    }
  }

  ${I}
`,fn=`
  mutation setShippingAddressOnQuote(
    $quoteId: ID!
    $shippingAddress: NegotiableQuoteShippingAddressInput!
  ) {
    setNegotiableQuoteShippingAddress(
      input: { quote_uid: $quoteId, shipping_addresses: [$shippingAddress] }
    ) {
      quote {
        ...NEGOTIABLE_QUOTE_FRAGMENT
      }
    }
  }

  ${T}
`,_n=`
  mutation setShippingAddressOnQuoteAndUseAsBilling(
    $quoteId: ID!
    $shippingAddress: NegotiableQuoteShippingAddressInput!
  ) {
    setNegotiableQuoteShippingAddress(
      input: { quote_uid: $quoteId, shipping_addresses: [$shippingAddress] }
    ) {
      quote {
        uid
      }
    }

    setNegotiableQuoteBillingAddress(
      input: {
        quote_uid: $quoteId
        billing_address: { same_as_shipping: true }
      }
    ) {
      quote {
        ...NEGOTIABLE_QUOTE_FRAGMENT
      }
    }
  }

  ${T}
`,yn=({address:e,companyAddressId:t,customerAddressId:n,customerAddressUid:r,pickupLocationCode:i})=>{if(!t){if(!n&&r)throw new y("customerAddressUid is not supported");if(!n&&!i&&!e)throw new _e}},In=({address:e,customerAddressId:t,customerAddressUid:n,pickupLocationCode:r})=>{if(r)throw new y("pickup location is not supported in quotes");if(!n&&t)throw new y("customerAddressId is not supported in quotes");if(!n&&!e)throw new _e},An=e=>{const t=!!s.cartId,n=!!s.quoteId;t?yn(e):n&&In(e)},J=(e,t,n,r,i,o)=>async a=>await m({type:"mutation",query:n,options:{variables:{[t]:e,shippingAddress:i(a)}},path:o,queueName:E.Updates,transformer:r}),nr=async e=>{G(),An(e);const{defaults:t}=$.getConfig(),n=Ae("isBillToShipping")??(t==null?void 0:t.isBillToShipping);return await(!!s.cartId?J(s.cartId,"cartId",n?mn:gn,N,Fe,n?"setBillingAddressOnCart.cart":"setShippingAddressesOnCart.cart"):J(s.quoteId,"quoteId",n?_n:fn,w,ke,n?"setNegotiableQuoteBillingAddress.quote":"setNegotiableQuoteShippingAddress.quote"))(e)},En=`
  mutation setShippingMethodsOnCart(
    $cartId: String!
    $shippingMethods: [ShippingMethodInput]!
  ) {
    setShippingMethodsOnCart(
      input: { cart_id: $cartId, shipping_methods: $shippingMethods }
    ) {
      cart {
        ...CHECKOUT_DATA_FRAGMENT
      }
    }
  }

  ${I}
`,Cn=`
  mutation setShippingMethodsOnQuote(
    $quoteId: ID!
    $shippingMethods: [ShippingMethodInput]!
  ) {
    setNegotiableQuoteShippingMethods(
      input: { quote_uid: $quoteId, shipping_methods: $shippingMethods }
    ) {
      quote {
        ...NEGOTIABLE_QUOTE_FRAGMENT
      }
    }
  }

  ${T}
`,Z=(e,t,n,r,i)=>async o=>await m({type:"mutation",query:n,queueName:E.Updates,options:{variables:{[t]:e,shippingMethods:Le(o)}},path:i,transformer:r}),Mn=e=>{if(!Array.isArray(e)||e.length===0)throw new wt},rr=async e=>(G(),Mn(e),await(!!s.cartId?Z(s.cartId,"cartId",En,N,"setShippingMethodsOnCart.cart"):Z(s.quoteId,"quoteId",Cn,w,"setNegotiableQuoteShippingMethods.quote"))(e)),Sn=async e=>{try{return Se(e)?(s.cartId=e.id,s.quoteId=null,await Ee()??null):(s.cartId=null,s.quoteId=e.uid,await Ce()??null)}catch(t){return console.error("Checkout synchronization failed:",t),null}},Te=async e=>{if(!s.initialized)return L(e);if(e===null){be();return}const t=await Sn(e);h.emit("checkout/updated",t)};export{ae as A,Bt as DEFAULT_COUNTRY,v as E,B as STORE_CONFIG_DEFAULTS,M as T,Pt as a,Qe as authenticateCustomer,$n as b,Un as c,$ as config,Rn as d,Ae as e,Fn as estimateShippingMethods,Pn as f,Vt as fetchGraphQl,Ie as g,Ee as getCart,Xn as getCheckoutAgreements,Kn as getCompanyCredit,zn as getConfig,Yn as getCustomer,Ce as getNegotiableQuote,Lt as getStoreConfig,Ln as getStoreConfigCache,Wn as getStoredPaymentMethods,xn as h,qn as i,Me as initialize,L as initializeCheckout,Jn as isEmailAvailable,Qn as j,wn as k,de as l,Dn as m,Bn as n,Vn as removeFetchGraphQlHeader,be as resetCheckout,s,Zn as setBillingAddress,kn as setEndpoint,jn as setFetchGraphQlHeader,Hn as setFetchGraphQlHeaders,er as setGuestEmailOnCart,tr as setPaymentMethod,nr as setShippingAddress,rr as setShippingMethods,rr as setShippingMethodsOnCart,Te as synchronizeCheckout,yt as t,Gn as v};
//# sourceMappingURL=api.js.map
