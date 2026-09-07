/*! Copyright 2026 Adobe
All Rights Reserved. */
import{signal as qe,computed as te}from"@dropins/tools/signals.js";import{events as h}from"@dropins/tools/event-bus.js";import{merge as ne,Initializer as we,deepmerge as $e}from"@dropins/tools/lib.js";import{ESTIMATE_SHIPPING_METHOD_FRAGMENT as De,CHECKOUT_DATA_FRAGMENT as I,CUSTOMER_FRAGMENT as Re,NEGOTIABLE_QUOTE_FRAGMENT as T}from"./fragments.js";import{FetchGraphQL as Ue}from"@dropins/tools/fetch-graphql.js";const Qe={authenticated:!1,cartId:null,config:null,initialized:!1,quoteId:null},s=new Proxy(Qe,{set(e,t,n){return e[t]=n,!0},get(e,t){return e[t]}});function wn(){return s.quoteId!==null}const Pe=async(e=!1)=>{s.authenticated=e},Ge=`
  mutation estimateShippingMethods(
    $cartId: String!
    $address: EstimateAddressInput!
  ) {
    estimateShippingMethods(input: { cart_id: $cartId, address: $address }) {
      ...ESTIMATE_SHIPPING_METHOD_FRAGMENT
    }
  }

  ${De}
`;function xe({code:e,...t}){return{code:e,...t}}function Be({code:e,...t}){return{code:e,...t}}const Le=e=>{if("carrier_code"in e&&"method_code"in e)return e;const t=e,{carrierCode:n,methodCode:r,...i}=t;return{carrier_code:n,method_code:r,...i}};function Fe(e){return e.map(Le)}function P(e){var t;return{fax:e.fax,middlename:e.middleName,prefix:e.prefix,suffix:e.suffix,vat_id:e.vatId,city:e.city,custom_attributes:((t=e.customAttributes)==null?void 0:t.map(n=>({attribute_code:n.code,value:n.value})))||[],company:e.company,country_code:e.countryCode,firstname:e.firstName,lastname:e.lastName,postcode:e.postcode,region:e.region,region_id:e.regionId,save_in_address_book:e.saveInAddressBook,street:e.street,telephone:e.telephone}}function ke(e){const{customerAddressId:t,pickupLocationCode:n,address:r}=e,i={};return t?{customer_address_id:t}:(n&&(i.pickup_location_code=n),!n&&r&&(i.address=P(r)),i)}function Ve(e){const{customerAddressUid:t,address:n}=e,r={};return t?{customer_address_uid:t}:(n&&(r.address=P(n)),r)}function je(e){const{customerAddressId:t,sameAsShipping:n=!1,useForShipping:r=!1,address:i}=e,o={use_for_shipping:r,same_as_shipping:n};return!n&&t?(o.customer_address_id=t,o):(!n&&i&&(o.address=P(i)),o)}function He(e){const{customerAddressUid:t,sameAsShipping:n=!1,useForShipping:r=!1,address:i}=e,o={use_for_shipping:r,same_as_shipping:n};return!n&&t?(o.customer_address_uid=t,o):(!n&&i&&(o.address=P(i)),o)}const ze=e=>e?"code"in e&&"value"in e:!1,re=e=>e?e.filter(ze).map(t=>{const{code:n,value:r}=t;return{code:n,value:r}}):[],ie=e=>{if(!e)return;const{code:t,title:n,...r}=e;return{code:t,title:n,additionalData:r}},se=e=>{if(e)return e.filter(t=>!!t).map(t=>{const{code:n,title:r,...i}=t;return{code:n,title:r,additionalData:i}})},oe=e=>{const t=e.street.filter(Boolean);return{city:e.city,company:e.company||void 0,country:ce(e.country),customAttributes:re(e.custom_attributes),fax:e.fax||void 0,firstName:e.firstname,id:(e==null?void 0:e.id)||void 0,lastName:e.lastname,middleName:e.middlename||void 0,postCode:e.postcode||void 0,prefix:e.prefix||void 0,region:le(e.region),street:t,suffix:e.suffix||void 0,telephone:e.telephone||void 0,uid:e.uid,vatId:e.vat_id||void 0}},Xe=e=>{if(e)return oe(e)},Ke=e=>e.filter(t=>!!t).map(t=>{const{available_shipping_methods:n,selected_shipping_method:r,same_as_billing:i,...o}=t;return{...oe(o),availableShippingMethods:k(n),selectedShippingMethod:ge(r),sameAsBilling:i}}),$n=e=>{var t,n;if(e)return{city:e.city,company:e.company,countryCode:e.country.code,customAttributes:e.customAttributes||[],firstName:e.firstName,lastName:e.lastName,postcode:e.postCode,region:(t=e.region)==null?void 0:t.code,regionId:(n=e.region)==null?void 0:n.id,street:e.street,telephone:e.telephone,vatId:e.vatId,prefix:e.prefix,suffix:e.suffix,middleName:e.middleName,fax:e.fax}},N=e=>{var n,r,i;if(!e)return;const t={type:"cart",availablePaymentMethods:se(e.available_payment_methods),billingAddress:Xe(e.billing_address),email:e.email??void 0,id:e.id,isEmpty:e.total_quantity===0,isVirtual:e.is_virtual,selectedPaymentMethod:ie(e.selected_payment_method),shippingAddresses:Ke(e.shipping_addresses),isGuest:!s.authenticated};return ne(t,(i=(r=(n=$.getConfig().models)==null?void 0:n.CartModel)==null?void 0:r.transformer)==null?void 0:i.call(r,e))},Ye=e=>!e||!(e!=null&&e.available_credit)||e.available_credit.value==null||!e.available_credit.currency?null:{availableCredit:{value:e.available_credit.value,currency:e.available_credit.currency},exceedLimit:(e==null?void 0:e.exceed_limit)||!1},ae=e=>{const t=e.street.filter(Boolean);return{city:e.city,company:e.company||void 0,country:ce(e.country),customAttributes:re(e.custom_attributes),customerAddressUid:e.customer_address_uid||void 0,fax:e.fax||void 0,firstName:e.firstname,lastName:e.lastname,middleName:e.middlename||void 0,postCode:e.postcode||void 0,prefix:e.prefix||void 0,region:le(e.region),street:t,suffix:e.suffix||void 0,telephone:e.telephone||void 0,uid:e.uid,vatId:e.vat_id||void 0}},We=e=>{if(e)return ae(e)},Je=e=>e.filter(t=>!!t).map(t=>{const{available_shipping_methods:n,selected_shipping_method:r,...i}=t;return{...ae(i),availableShippingMethods:k(n),selectedShippingMethod:ge(r)}});var ue=(e=>(e.MANUAL="manual",e.AUTO="auto",e))(ue||{}),M=(e=>(e.EXCLUDING_TAX="EXCLUDING_TAX",e.INCLUDING_EXCLUDING_TAX="INCLUDING_AND_EXCLUDING_TAX",e.INCLUDING_TAX="INCLUDING_TAX",e))(M||{});const Ze=e=>e?e.filter(t=>!!t).map(t=>({id:t.agreement_id,name:t.name,mode:ue[t.mode],text:t.checkbox_text,content:{value:t.content,html:t.is_html,height:t.content_height??null}})):[],ce=e=>({code:(e==null?void 0:e.code)??"",label:(e==null?void 0:e.label)??""}),et=e=>{var n,r,i;if(!e)return null;const t={firstName:e.firstname||"",lastName:e.lastname||"",email:e.email||""};return ne(t,(i=(r=(n=$.getConfig().models)==null?void 0:n.CustomerModel)==null?void 0:r.transformer)==null?void 0:i.call(r,e))},tt=e=>!!(e!=null&&e.is_email_available),w=e=>e?{type:"quote",availablePaymentMethods:se(e.available_payment_methods),billingAddress:We(e.billing_address),email:e.email??"",isEmpty:e.total_quantity===0,isVirtual:e.is_virtual,name:e.name,selectedPaymentMethod:ie(e.selected_payment_method),shippingAddresses:Je(e.shipping_addresses),status:e.status,uid:e.uid}:null,le=e=>{if(!(!(e!=null&&e.code)||!(e!=null&&e.label)))return{code:e.code,name:e.label,id:e.region_id??void 0}};function nt(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var rt=function(t){return it(t)&&!st(t)};function it(e){return!!e&&typeof e=="object"}function st(e){var t=Object.prototype.toString.call(e);return t==="[object RegExp]"||t==="[object Date]"||ut(e)}var ot=typeof Symbol=="function"&&Symbol.for,at=ot?Symbol.for("react.element"):60103;function ut(e){return e.$$typeof===at}function ct(e){return Array.isArray(e)?[]:{}}function q(e,t){return t.clone!==!1&&t.isMergeableObject(e)?S(ct(e),e,t):e}function lt(e,t,n){return e.concat(t).map(function(r){return q(r,n)})}function dt(e,t){if(!t.customMerge)return S;var n=t.customMerge(e);return typeof n=="function"?n:S}function pt(e){return Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e).filter(function(t){return Object.propertyIsEnumerable.call(e,t)}):[]}function K(e){return Object.keys(e).concat(pt(e))}function de(e,t){try{return t in e}catch{return!1}}function ht(e,t){return de(e,t)&&!(Object.hasOwnProperty.call(e,t)&&Object.propertyIsEnumerable.call(e,t))}function mt(e,t,n){var r={};return n.isMergeableObject(e)&&K(e).forEach(function(i){r[i]=q(e[i],n)}),K(t).forEach(function(i){ht(e,i)||(de(e,i)&&n.isMergeableObject(t[i])?r[i]=dt(i,n)(e[i],t[i],n):r[i]=q(t[i],n))}),r}function S(e,t,n){n=n||{},n.arrayMerge=n.arrayMerge||lt,n.isMergeableObject=n.isMergeableObject||rt,n.cloneUnlessOtherwiseSpecified=q;var r=Array.isArray(t),i=Array.isArray(e),o=r===i;return o?r?n.arrayMerge(e,t,n):mt(e,t,n):q(t,n)}S.all=function(t,n){if(!Array.isArray(t))throw new Error("first argument should be an array");return t.reduce(function(r,i){return S(r,i,n)},{})};var gt=S,ft=gt;const pe=nt(ft),_t={arrayMerge:(e,t,n)=>{const r=e.slice();return t.forEach((i,o)=>{typeof r[o]>"u"?r[o]=n.cloneUnlessOtherwiseSpecified(i,n):n.isMergeableObject(i)?r[o]=pe(e[o],i,n):e.indexOf(i)===-1&&r.push(i)}),r}};function yt(e,t){return t?pe(e,t,_t):e}const Y=e=>({countryCode:e.country_id,postCode:e.postcode||"",...e.region_id?{regionId:Number(e.region_id)}:{...e.region?{region:e.region}:{}}}),It=e=>({carrierCode:e.carrier.code||"",methodCode:e.code||"",amount:e.amount,amountExclTax:e.amountExclTax,amountInclTax:e.amountInclTax}),At=e=>{var n,r,i;const t=k(e);return yt(t,(i=(r=(n=$.getConfig().models)==null?void 0:n.EstimateShippingModel)==null?void 0:r.transformer)==null?void 0:i.call(r,e))},Et=(e,t)=>e.amount.value-t.amount.value,Ct=e=>e==null,he=e=>!(!e||!e.method_code||!e.method_title||Ct(e.amount.value)||!e.amount.currency),me=e=>({amount:{value:e.amount.value,currency:e.amount.currency},title:e.method_title,code:e.method_code,carrier:{code:e.carrier_code,title:e.carrier_title},value:`${e.carrier_code} - ${e.method_code}`,...e.price_excl_tax&&{amountExclTax:{value:e.price_excl_tax.value,currency:e.price_excl_tax.currency}},...e.price_incl_tax&&{amountInclTax:{value:e.price_incl_tax.value,currency:e.price_incl_tax.currency}},...e.original_amount&&{originalAmount:{value:e.original_amount.value,currency:e.original_amount.currency}}}),ge=e=>{if(he(e))return me(e)},k=e=>e?e.filter(he).map(t=>me(t)).sort(Et):[];var E=(e=>(e.Updates="updates",e.Default="default",e.ShippingEstimate="shippingEstimate",e))(E||{});const Q=new Map,x=new Map,b=qe(new Set),fe=new Map;fe.set("updates",e=>{h.emit("checkout/updated",e)});async function Mt(e){x.set(e,!0);const t=Q.get(e);let n;for(;t.length>0;){const o=t.shift();try{const a=await o.requestFn();o.resolve(a),n=a}catch(a){o.reject(a)}}x.set(e,!1);const r=new Set(b.value);r.delete(e),b.value=r;const i=fe.get(e);i&&n&&i(n)}function St(e,t="default"){Q.has(t)||Q.set(t,[]);const n=Q.get(t),r=new Promise((o,a)=>{n.push({requestFn:e,resolve:o,reject:a})}),i=new Set(b.value);return i.add(t),b.value=i,x.get(t)||Mt(t),r}const Dn=te(()=>b.value.has("updates")),Rn=te(()=>b.value.has("shippingEstimate")),bt=["sender_email","recipient_email"];function Tt(e){return e.filter(t=>!t.path||!bt.some(n=>{var r;return((r=t.path)==null?void 0:r.at(-1))===n}))}class Nt extends Error{constructor(t){super(t.map(n=>n.message).join(" ")),this.name="FetchError"}}class y extends Error{constructor(t){super(t),this.name="InvalidInput"}}class A extends y{constructor(t){super(`${t} is required.`)}}class V extends A{constructor(){super("Cart ID")}}class Ot extends y{constructor(){super("Either Cart ID or Quote ID is required.")}}class _e extends Error{constructor(){super("User is not authenticated")}}class vt extends A{constructor(){super("Negotiable Quote ID")}}class qt extends A{constructor(){super("Email")}}class wt extends A{constructor(){super("Payment method code")}}class ye extends A{constructor(){super("Shipping address")}}class $t extends A{constructor(){super("Shipping method")}}class Ie extends A{constructor(){super("Billing address")}}class Dt extends A{constructor(){super("Country Code")}}var v=(e=>(e.INVALID_INPUT="INVALID_INPUT",e.SERVER_ERROR="SERVER_ERROR",e.UNAUTHENTICATED="UNAUTHENTICATED",e.UNKNOWN_ERROR="UNKNOWN_ERROR",e.QUOTE_DATA_ERROR="QUOTE_DATA_ERROR",e.QUOTE_PERMISSION_DENIED="QUOTE_PERMISSION_DENIED",e.PERMISSION_DENIED="PERMISSION_DENIED",e))(v||{});const Rt=["PlaceOrderError"],Ut=[{code:"INVALID_INPUT",matches:e=>e instanceof y},{code:"UNAUTHENTICATED",matches:e=>e instanceof _e},{code:"SERVER_ERROR",matches:e=>!e||typeof e!="object"||!("name"in e)?!1:Rt.includes(e.name)}];function Un(e){const t=Ut.find(n=>n.matches(e));return t?t.code:v.UNKNOWN_ERROR}function Qt(e,t){return t.split(".").reduce((n,r)=>n&&n[r]!==void 0?n[r]:void 0,e)}async function m(e){const{defaultValueOnFail:t,options:n,path:r,query:i,queueName:o,transformer:a,type:g}=e;try{const u=async()=>{const{data:l,errors:c}=await Ht(i,{method:g==="query"?"GET":"POST",cache:g==="query"?"no-cache":void 0,...n});if(c){const f=Tt(c);if(f.length>0)throw new Nt(f)}const d=Qt(l,r);if(d===void 0)throw new Error(`No data found at path: ${r}`);return a?a(d):d};return g==="mutation"?await St(u,o):await u()}catch(u){if(t!==void 0)return t;throw u}}function Pt(){return h.lastPayload("checkout/initialized")??null}function Gt(){return h.lastPayload("checkout/updated")??null}function Ae(){return Gt()??Pt()}function Qn(){var t;const e=Ae();return!!((t=e==null?void 0:e.shippingAddresses)!=null&&t.length)}function Pn(){const e=Ae();return(e==null?void 0:e.email)??null}const j={EMAIL:/^[a-z0-9,!#$%&'*+/=?^_`{|}~-]+(\.[a-z0-9,!#$%&'*+/=?^_`{|}~-]+)*@([a-z0-9-]+\.)+[a-z]{2,}$/i,NOT_EMPTY:/^(?!\s*$).+/},Gn=e=>j.EMAIL.test(e),xn=e=>j.NOT_EMPTY.test(e),Bn={NOT_EMPTY:j.NOT_EMPTY.source},xt={email:"",isBillToShipping:void 0,selectedPaymentMethod:null,selectedPaymentMethodCode:null,selectedShippingMethod:null};function Ln(e){const n={...h.lastPayload("checkout/values")??xt,...e};h.emit("checkout/values",n)}function Ee(e){const t=h.lastPayload("checkout/values");return t&&e in t?t[e]:null}const Bt=`
  query getStoreConfig {
    storeConfig {
      default_country
      is_checkout_agreements_enabled
      is_guest_checkout_enabled
      is_one_page_checkout_enabled
      shopping_cart_display_shipping
    }
  }
`,Lt="US",B={defaultCountry:Lt,agreementsEnabled:!0,shoppingCartDisplaySetting:{shipping:M.EXCLUDING_TAX}},Ft=async()=>await m({defaultValueOnFail:B,options:{method:"GET",cache:"no-cache"},path:"storeConfig",query:Bt,transformer:Vt,type:"query"}),Fn=()=>s.config;function kt(e){switch(e){case 1:return M.EXCLUDING_TAX;case 2:return M.INCLUDING_TAX;case 3:return M.INCLUDING_EXCLUDING_TAX;default:return M.EXCLUDING_TAX}}function Vt(e){if(!e)return B;const{default_country:t,is_checkout_agreements_enabled:n,shopping_cart_display_shipping:r}=e;return{defaultCountry:t||B.defaultCountry,agreementsEnabled:n,shoppingCartDisplaySetting:{shipping:kt(r)}}}const jt=e=>e.map(({payment_method_code:t,public_hash:n,details:r})=>({code:t,title:t,additionalData:{publicHash:n,details:r??void 0}})),kn=async e=>{var l,c,d,f;const t=s.cartId,n=((l=e==null?void 0:e.criteria)==null?void 0:l.country_code)??((c=s.config)==null?void 0:c.defaultCountry);if(!t)throw new V;if(!n)throw new Dt;const{region_id:r,region_name:i,zip:o}=(e==null?void 0:e.criteria)??{},a=r||i?{region_id:typeof r=="string"?parseInt(r,10):r,region_code:i}:void 0,g={country_code:n,...o&&{postcode:o},...a&&{region:{...a.region_id&&{region_id:a.region_id},...a.region_code&&{region_code:a.region_code}}}},u={country_id:n,region:(d=g.region)==null?void 0:d.region_code,region_id:(f=g.region)==null?void 0:f.region_id,postcode:o},p=Y(u);return m({options:{variables:{cartId:t,address:g}},path:"estimateShippingMethods",query:Ge,queueName:E.ShippingEstimate,transformer:At,type:"mutation"}).then(_=>{const{defaults:D,shipping:R}=$.getConfig(),H=R!=null&&R.filterOptions?_.filter(R.filterOptions):_,Oe=H.length>0,ve=Y(u);let z=null;if(Oe){const C=Ee("selectedShippingMethod");let O=_.find(X=>X.code===(C==null?void 0:C.code)&&X.carrier.code===(C==null?void 0:C.carrier.code));!O&&(D!=null&&D.selectedShippingMethod)&&(O=D.selectedShippingMethod(_)??void 0),O||(O=_[0]),z=It(O)}return h.emit("shipping/estimate",{address:ve,availableShippingMethods:_,shippingMethod:z,success:!0}),H}).catch(_=>{throw h.emit("shipping/estimate",{address:p,shippingMethod:null,availableShippingMethods:[],success:!1}),_})},{setEndpoint:Vn,setFetchGraphQlHeader:jn,removeFetchGraphQlHeader:Hn,setFetchGraphQlHeaders:zn,fetchGraphQl:Ht,getConfig:Xn}=new Ue().getMethods(),zt=`
  query getCart($cartId: String!) {
    cart(cart_id: $cartId) {
      ...CHECKOUT_DATA_FRAGMENT
    }
  }

  ${I}
`,Xt=`
  query getCustomerCart {
    cart: customerCart {
      ...CHECKOUT_DATA_FRAGMENT
    }
  }

  ${I}
`,Ce=async()=>{const e=s.cartId,t=s.authenticated===!1,n=t?zt:Xt,r=t?{cartId:e}:{};if(t&&!e)throw new V;return await m({type:"query",query:n,options:{method:"POST",cache:"no-cache",variables:r},path:"cart",transformer:N})},Kt=`
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
`,Kn=async()=>await m({defaultValueOnFail:[],options:{method:"GET",cache:"no-cache"},path:"checkoutAgreements",query:Kt,transformer:Ze,type:"query"}),Yt=`
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
`,Yn=async()=>await m({type:"query",query:Yt,options:{method:"GET",cache:"no-cache"},path:"company.credit",transformer:Ye,defaultValueOnFail:null}),Wt=`
  query getCustomer {
    customer {
      ...CUSTOMER_FRAGMENT
    }
  }

  ${Re}
`,Wn=async()=>s.authenticated?await m({options:{method:"GET",cache:"no-cache"},path:"customer",query:Wt,transformer:et,type:"query"}):null,Jt=`
  query getNegotiableQuote($quoteId: ID!) {
    negotiableQuote(uid: $quoteId) {
      ...NEGOTIABLE_QUOTE_FRAGMENT
    }
  }

  ${T}
`,Me=async(e={})=>{const t=e.uid??s.quoteId;if(s.authenticated===!1)throw new _e;if(!t)throw new vt;return await m({type:"query",query:Jt,options:{method:"GET",cache:"no-cache",variables:{quoteId:t}},path:"negotiableQuote",transformer:w})};var L=(e=>(e.Account="account",e.Card="card",e))(L||{});const Zt=`
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
`,Jn=[{payment_method_code:"payment_services_paypal_vault",public_hash:"b2ca8fd54f68e7c1d1e76546931248361dca23d06a3fd048716100fe02f58f5",type:L.Card,details:JSON.stringify({type:"CREDIT",brand:"VISA",maskedCC:"0120",expirationDate:"08/2027",cardholderName:"Veronica Costello"})},{payment_method_code:"payment_services_paypal_vault",public_hash:"377c1514e07f7e5a1f6e02b6e5f0a2b0f5e6d3c2b1a0f9e8d7c6b5a4f3e2d1c0",type:L.Card,details:JSON.stringify({type:"DEBIT",brand:"MASTERCARD",maskedCC:"8174",expirationDate:"11/2026",cardholderName:"John Doe"})}],Zn=async()=>s.authenticated?await m({type:"query",query:Zt,options:{method:"GET",cache:"no-cache"},path:"customerPaymentTokens.items",transformer:jt,defaultValueOnFail:[]}):[],U={eager:!0},en=e=>{var a,g;const t=((g=(a=e==null?void 0:e.features)==null?void 0:a.b2b)==null?void 0:g.quotes)??!1;return[["authenticated",(u=!1)=>{var l,c,d;if(Pe(u),!t||u)return;const p=(d=(c=(l=e==null?void 0:e.features)==null?void 0:l.b2b)==null?void 0:c.routeLogin)==null?void 0:d.call(c);p&&window.location.assign(p)},U],...t?[["quote-management/quote-data/initialized",u=>{var p,l,c,d;if(!u.quote.canCheckout){const f=((d=(c=(l=(p=e==null?void 0:e.langDefinitions)==null?void 0:p.default)==null?void 0:l.Checkout)==null?void 0:c.Quote)==null?void 0:d.permissionDenied)||"You do not have permission to checkout with this quote.";h.emit("checkout/error",{message:f,code:v.QUOTE_PERMISSION_DENIED});return}F(u.quote)},U],["quote-management/quote-data/error",()=>{var p,l,c,d;const u=((d=(c=(l=(p=e==null?void 0:e.langDefinitions)==null?void 0:p.default)==null?void 0:l.Checkout)==null?void 0:c.Quote)==null?void 0:d.dataError)||"We were unable to retrieve the quote data. Please try again later.";h.emit("checkout/error",{message:u,code:v.QUOTE_DATA_ERROR})}]]:[["cart/initialized",F,U],["cart/reset",Te],["cart/updated",Ne],["auth/permissions",u=>{var p,l,c,d;if(u.admin!==!0&&!u["Magento_Sales::place_order"]){const f=((d=(c=(l=(p=e==null?void 0:e.langDefinitions)==null?void 0:p.default)==null?void 0:l.Checkout)==null?void 0:c.ServerError)==null?void 0:d.permissionDenied)||"You do not have permission to complete checkout. Please contact your administrator for assistance.";h.emit("checkout/error",{message:f,code:v.PERMISSION_DENIED})}},U]]].map(([u,p,l])=>h.on(u,p,l))},tn=new URL(window.location.href),nn=tn.searchParams.get("quoteId");s.quoteId=nn;const Se=new we({init:async(e={})=>{Se.config.setConfig($e({defaults:{isBillToShipping:!0,selectedShippingMethod:t=>t.length>0?t[0]:null},features:{b2b:{quotes:!1}}},e))},listeners:en}),$=Se.config,be=e=>"id"in e,rn=async e=>{try{return be(e)?(s.cartId=e.id,s.quoteId=null,await Ce()??null):(s.cartId=null,s.quoteId=e.uid,await Me()??null)}catch(t){return console.error("Checkout initialization failed:",t),null}},F=async e=>{if(s.initialized){await Ne(e);return}s.config||(s.config=await Ft());const t=e?await rn(e):null;s.initialized=!0,h.emit("checkout/initialized",t)},sn=`
  query isEmailAvailable($email: String!) {
    isEmailAvailable(email: $email) {
      is_email_available
    }
  }
`,er=async e=>{if(!e)throw new qt;return await m({options:{method:"GET",cache:"no-cache",variables:{email:e}},path:"isEmailAvailable",query:sn,transformer:tt,type:"query"})},Te=()=>{s.initialized&&(s.cartId=null,s.quoteId=null,h.emit("checkout/updated",null))},on=`
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
`,an=`
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
`,G=()=>{const{cartId:e,quoteId:t}=s;if(!e&&!t)throw new Ot},W=(e,t,n,r,i,o)=>async a=>await m({type:"mutation",query:n,options:{variables:{[t]:e,billingAddress:i(a)}},path:o,queueName:E.Updates,transformer:r}),un=({address:e,customerAddressId:t,customerAddressUid:n,sameAsShipping:r=!1})=>{if(!t&&n)throw new y("customerAddressUid is not supported");if(!r&&!t&&!e)throw new Ie},cn=({address:e,customerAddressId:t,customerAddressUid:n,sameAsShipping:r=!1})=>{if(!n&&t)throw new y("customerAddressId is not supported");if(!r&&!n&&!e)throw new Ie},ln=e=>{const t=!!s.cartId,n=!!s.quoteId;t?un(e):n&&cn(e)},tr=async e=>(G(),ln(e),await(!!s.cartId?W(s.cartId,"cartId",on,N,je,"setBillingAddressOnCart.cart"):W(s.quoteId,"quoteId",an,w,He,"setNegotiableQuoteBillingAddress.quote"))(e)),dn=`
  mutation setGuestEmail($cartId: String!, $email: String!) {
    setGuestEmailOnCart(input: { cart_id: $cartId, email: $email }) {
      cart {
        ...CHECKOUT_DATA_FRAGMENT
      }
    }
  }

  ${I}
`,nr=async e=>{const t=s.cartId;if(!t)throw new V;return await m({options:{variables:{cartId:t,email:e}},path:"setGuestEmailOnCart.cart",query:dn,queueName:E.Updates,transformer:N,type:"mutation"})},pn=`
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
`,hn=`
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
`,J=(e,t,n,r,i,o)=>async a=>await m({type:"mutation",query:n,options:{variables:{[t]:e,input:i(a)}},path:o,queueName:E.Updates,transformer:r}),mn=e=>{if(!e.code)throw new wt},rr=async e=>(G(),mn(e),await(!!s.cartId?J(s.cartId,"cartId",pn,N,xe,"setPaymentMethodOnCart.cart"):J(s.quoteId,"quoteId",hn,w,Be,"setNegotiableQuotePaymentMethod.quote"))(e)),gn=`
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
`,fn=`
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
`,_n=`
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
`,yn=`
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
`,In=({address:e,customerAddressId:t,customerAddressUid:n,pickupLocationCode:r})=>{if(!t&&n)throw new y("customerAddressUid is not supported");if(!t&&!r&&!e)throw new ye},An=({address:e,customerAddressId:t,customerAddressUid:n,pickupLocationCode:r})=>{if(r)throw new y("pickup location is not supported in quotes");if(!n&&t)throw new y("customerAddressId is not supported in quotes");if(!n&&!e)throw new ye},En=e=>{const t=!!s.cartId,n=!!s.quoteId;t?In(e):n&&An(e)},Z=(e,t,n,r,i,o)=>async a=>await m({type:"mutation",query:n,options:{variables:{[t]:e,shippingAddress:i(a)}},path:o,queueName:E.Updates,transformer:r}),ir=async e=>{G(),En(e);const{defaults:t}=$.getConfig(),n=Ee("isBillToShipping")??(t==null?void 0:t.isBillToShipping);return await(!!s.cartId?Z(s.cartId,"cartId",n?gn:fn,N,ke,n?"setBillingAddressOnCart.cart":"setShippingAddressesOnCart.cart"):Z(s.quoteId,"quoteId",n?yn:_n,w,Ve,n?"setNegotiableQuoteBillingAddress.quote":"setNegotiableQuoteShippingAddress.quote"))(e)},Cn=`
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
`,Mn=`
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
`,ee=(e,t,n,r,i)=>async o=>await m({type:"mutation",query:n,queueName:E.Updates,options:{variables:{[t]:e,shippingMethods:Fe(o)}},path:i,transformer:r}),Sn=e=>{if(!Array.isArray(e)||e.length===0)throw new $t},sr=async e=>(G(),Sn(e),await(!!s.cartId?ee(s.cartId,"cartId",Cn,N,"setShippingMethodsOnCart.cart"):ee(s.quoteId,"quoteId",Mn,w,"setNegotiableQuoteShippingMethods.quote"))(e)),bn=async e=>{try{return be(e)?(s.cartId=e.id,s.quoteId=null,await Ce()??null):(s.cartId=null,s.quoteId=e.uid,await Me()??null)}catch(t){return console.error("Checkout synchronization failed:",t),null}},Ne=async e=>{if(!s.initialized)return F(e);if(e===null){Te();return}const t=await bn(e);h.emit("checkout/updated",t)};export{ue as A,Lt as DEFAULT_COUNTRY,v as E,B as STORE_CONFIG_DEFAULTS,Jn as STUB_STORED_PAYMENT_TOKENS,M as T,Gt as a,Pe as authenticateCustomer,Dn as b,Rn as c,$ as config,Qn as d,Ee as e,kn as estimateShippingMethods,Gn as f,Ht as fetchGraphQl,Ae as g,Ce as getCart,Kn as getCheckoutAgreements,Yn as getCompanyCredit,Xn as getConfig,Wn as getCustomer,Me as getNegotiableQuote,Ft as getStoreConfig,Fn as getStoreConfigCache,Zn as getStoredPaymentMethods,Bn as h,wn as i,Se as initialize,F as initializeCheckout,er as isEmailAvailable,Pn as j,$n as k,pe as l,Un as m,Ln as n,Hn as removeFetchGraphQlHeader,Te as resetCheckout,s,tr as setBillingAddress,Vn as setEndpoint,jn as setFetchGraphQlHeader,zn as setFetchGraphQlHeaders,nr as setGuestEmailOnCart,rr as setPaymentMethod,ir as setShippingAddress,sr as setShippingMethods,sr as setShippingMethodsOnCart,Ne as synchronizeCheckout,It as t,xn as v};
//# sourceMappingURL=api.js.map
