/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as tt}from"@dropins/tools/event-bus.js";import{Initializer as rt,merge as W}from"@dropins/tools/lib.js";import{FetchGraphQL as at}from"@dropins/tools/fetch-graphql.js";import{BASIC_CUSTOMER_INFO_FRAGMENT as ot,CUSTOMER_ORDER_FRAGMENT as nt,ADDRESS_FRAGMENT as it,ORDER_SUMMARY_FRAGMENT as ct}from"./fragments.js";const Z=new rt({init:async t=>{const r={authHeaderConfig:{header:"Authorization",tokenPrefix:"Bearer"}};Z.config.setConfig({...r,...t})},listeners:()=>[]}),y=Z.config,{setEndpoint:nr,setFetchGraphQlHeader:ir,removeFetchGraphQlHeader:cr,setFetchGraphQlHeaders:ur,fetchGraphQl:d,getConfig:er}=new at().getMethods(),ut=`
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
`,et=`
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
`,g=t=>{throw t instanceof DOMException&&t.name==="AbortError"||tt.emit("error",{source:"auth",type:"network",error:t}),t},h=t=>{const r=t.map(a=>a.message).join(" ");throw Error(r)},B=t=>t.replace(/_([a-z])/g,(r,a)=>a.toUpperCase()),lt=t=>t.replace(/([A-Z])/g,r=>`_${r.toLowerCase()}`),O=(t,r,a)=>{const o=["string","boolean","number"],n=r==="camelCase"?B:lt;return Array.isArray(t)?t.map(c=>o.includes(typeof c)||c===null?c:typeof c=="object"?O(c,r,a):c):t!==null&&typeof t=="object"?Object.entries(t).reduce((c,[u,l])=>{const i=a&&a[u]?a[u]:n(u);return c[i]=o.includes(typeof l)||l===null?l:O(l,r,a),c},{}):t},_t=t=>{const r=[];for(const a of t)if(!(a.frontend_input!=="MULTILINE"||a.multiline_count<2))for(let o=2;o<=a.multiline_count;o++){const n={...a,is_required:!1,name:`${a.code}_multiline_${o}`,code:`${a.code}_multiline_${o}`,id:`${a.code}_multiline_${o}`};r.push(n)}return r},st=t=>{switch(t){case"middlename":return"middleName";case"firstname":return"firstName";case"lastname":return"lastName";default:return B(t)}},ft=t=>{var r;return t!=null&&t.options?(r=t==null?void 0:t.options)==null?void 0:r.map(a=>({isDefault:(a==null?void 0:a.is_default)??!1,text:(a==null?void 0:a.label)??"",value:(a==null?void 0:a.value)??""})):[]},dt=t=>{var c,u,l;const r=((u=(c=t==null?void 0:t.data)==null?void 0:c.attributesForm)==null?void 0:u.items)||[];if(!r.length)return[];const a=(l=r.filter(i=>{var s;return!((s=i.frontend_input)!=null&&s.includes("HIDDEN"))}))==null?void 0:l.map(({code:i,...s})=>{const f=i!=="country_id"?i:"country_code";return{...s,name:f,id:f,code:f}}),o=_t(a);return a.concat(o).map(i=>({code:i==null?void 0:i.code,name:i==null?void 0:i.name,id:i==null?void 0:i.id,label:(i==null?void 0:i.label)??"",entityType:i==null?void 0:i.entity_type,className:(i==null?void 0:i.frontend_class)??"",defaultValue:(i==null?void 0:i.default_value)??"",fieldType:i==null?void 0:i.frontend_input,multilineCount:(i==null?void 0:i.multiline_count)??0,orderNumber:Number(i==null?void 0:i.sort_order)||0,isHidden:!1,isUnique:(i==null?void 0:i.is_unique)??!1,required:(i==null?void 0:i.is_required)??!1,validateRules:(i==null?void 0:i.validate_rules)??[],options:ft(i),customUpperCode:st(i==null?void 0:i.code)})).sort((i,s)=>Number(i.orderNumber)-Number(s.orderNumber))},gt=t=>{const r={};for(const a in t){const o=t[a];!Array.isArray(o)||o.length===0||(a==="custom_attributesV2"?o.forEach(n=>{typeof n=="object"&&"value"in n&&(r[n==null?void 0:n.code]=n==null?void 0:n.value)}):o.length>1?o.forEach((n,c)=>{c===0?r[a]=n:r[`${a}_multiline_${c+1}`]=n}):r[a]=o[0])}return r},ht=t=>({prefix:(t==null?void 0:t.prefix)??"",suffix:(t==null?void 0:t.suffix)??"",firstname:(t==null?void 0:t.firstname)??"",lastname:(t==null?void 0:t.lastname)??"",middlename:(t==null?void 0:t.middlename)??""}),Et=t=>({id:(t==null?void 0:t.id)??"",vat_id:(t==null?void 0:t.vat_id)??"",postcode:(t==null?void 0:t.postcode)??"",country_code:(t==null?void 0:t.country_code)??"",uid:(t==null?void 0:t.uid)??""}),mt=t=>({company:(t==null?void 0:t.company)??"",telephone:(t==null?void 0:t.telephone)??"",fax:(t==null?void 0:t.fax)??""}),L=t=>{var a,o,n;return O({...ht(t),...Et(t),...mt(t),city:(t==null?void 0:t.city)??"",region:{region:((a=t==null?void 0:t.region)==null?void 0:a.region)??"",region_code:((o=t==null?void 0:t.region)==null?void 0:o.region_code)??"",region_id:((n=t==null?void 0:t.region)==null?void 0:n.region_id)??""},default_shipping:(t==null?void 0:t.default_shipping)||!1,default_billing:(t==null?void 0:t.default_billing)||!1,...gt(t)},"camelCase",{})},St=t=>{var o,n;const r=((n=(o=t==null?void 0:t.data)==null?void 0:o.customer)==null?void 0:n.addresses)||[];return r.length?r.map(L).sort((c,u)=>(Number(u.defaultBilling)||Number(u.defaultShipping))-(Number(c.defaultBilling)||Number(c.defaultShipping))):[]},Tt=t=>{var o,n,c,u,l,i,s,f,E,m,T,C,N,I,M,w,U,p,$,v,x,G,D,P,F,R,k;const r=(c=(n=(o=t==null?void 0:t.data)==null?void 0:o.customer)==null?void 0:n.custom_attributes)==null?void 0:c.filter(A=>A).reduce((A,S)=>{var e;const q=B(S.code);return(e=S.selected_options)!=null&&e.length?A[q]=S.selected_options[0].value??"":A[q]=S.value??"",A},{}),a={email:((l=(u=t==null?void 0:t.data)==null?void 0:u.customer)==null?void 0:l.email)||"",firstName:((s=(i=t==null?void 0:t.data)==null?void 0:i.customer)==null?void 0:s.firstname)||"",lastName:((E=(f=t==null?void 0:t.data)==null?void 0:f.customer)==null?void 0:E.lastname)||"",middleName:((T=(m=t==null?void 0:t.data)==null?void 0:m.customer)==null?void 0:T.middlename)||"",gender:((N=(C=t==null?void 0:t.data)==null?void 0:C.customer)==null?void 0:N.gender)||"1",dateOfBirth:((M=(I=t==null?void 0:t.data)==null?void 0:I.customer)==null?void 0:M.date_of_birth)||"",prefix:((U=(w=t==null?void 0:t.data)==null?void 0:w.customer)==null?void 0:U.prefix)||"",suffix:(($=(p=t==null?void 0:t.data)==null?void 0:p.customer)==null?void 0:$.suffix)||"",createdAt:((x=(v=t==null?void 0:t.data)==null?void 0:v.customer)==null?void 0:x.created_at)||"",allowRemoteShoppingAssistance:(D=(G=t==null?void 0:t.data)==null?void 0:G.customer)==null?void 0:D.allow_remote_shopping_assistance,...r};return W(a,(k=(R=(F=(P=y==null?void 0:y.getConfig())==null?void 0:P.models)==null?void 0:F.CustomerDataModelShort)==null?void 0:R.transformer)==null?void 0:k.call(R,t.data))},Ct=t=>{var u,l;if(!((l=(u=t==null?void 0:t.data)==null?void 0:u.countries)!=null&&l.length))return{availableCountries:[],countriesWithRequiredRegion:[],optionalZipCountries:[]};const{countries:r,storeConfig:a}=t.data,o=a==null?void 0:a.countries_with_required_region.split(","),n=a==null?void 0:a.optional_zip_countries.split(",");return{availableCountries:r.filter(({two_letter_abbreviation:i,full_name_locale:s})=>!!(i&&s)).map(i=>{const{two_letter_abbreviation:s,full_name_locale:f,available_regions:E}=i,m=Array.isArray(E)&&E.length>0;return{value:s,text:f,availableRegions:m?E:void 0}}).sort((i,s)=>i.text.localeCompare(s.text)),countriesWithRequiredRegion:o,optionalZipCountries:n}},At=t=>{var o,n;const r=(n=(o=t==null?void 0:t.data)==null?void 0:o.country)==null?void 0:n.available_regions;return r?r.filter(c=>{if(!c)return!1;const{id:u,code:l,name:i}=c;return!!(u&&l&&i)}).map(c=>{const{id:u}=c;return{id:u,text:c.name,value:`${c.code},${c.id}`}}):[]},bt=(t,r="en-US",a={})=>{const o={day:"2-digit",month:"2-digit",year:"numeric"},n=/^\d{4}-\d{2}-\d{2}$/.test(t.trim()),c={...o,...n?{timeZone:"UTC"}:{},...a},u=new Date(t.trim());return isNaN(u.getTime())?"Invalid Date":new Intl.DateTimeFormat(r,c).format(u)},Rt=(t,r="en-US",a={})=>{const n={...{hour:"2-digit",minute:"2-digit"},...a},c=new Date(t);return isNaN(c.getTime())?"Invalid Time":new Intl.DateTimeFormat(r,n).format(c)},b={value:0,currency:"USD"},yt=t=>{var r,a,o,n,c,u,l,i,s,f;return{subtotal:((r=t==null?void 0:t.total)==null?void 0:r.subtotal)??b,grandTotal:((a=t==null?void 0:t.total)==null?void 0:a.grand_total)??b,grandTotalExclTax:((o=t==null?void 0:t.total)==null?void 0:o.grand_total_excl_tax)??b,totalGiftcard:((n=t==null?void 0:t.total)==null?void 0:n.total_giftcard)??b,subtotalExclTax:((c=t==null?void 0:t.total)==null?void 0:c.subtotal_excl_tax)??b,subtotalInclTax:((u=t==null?void 0:t.total)==null?void 0:u.subtotal_incl_tax)??b,taxes:((l=t==null?void 0:t.total)==null?void 0:l.taxes)??[],totalTax:((i=t==null?void 0:t.total)==null?void 0:i.total_tax)??b,totalShipping:((s=t==null?void 0:t.total)==null?void 0:s.total_shipping)??b,discounts:((f=t==null?void 0:t.total)==null?void 0:f.discounts)??[]}},Ot=t=>{var n,c,u,l,i,s,f,E,m,T,C,N,I,M,w,U,p,$,v,x,G,D,P,F,R,k,A,S,q;if(!((c=(n=t.data)==null?void 0:n.customer)!=null&&c.orders))return null;const r=((l=(u=t==null?void 0:t.data)==null?void 0:u.customer)==null?void 0:l.returns)??[],o={items:(((f=(s=(i=t==null?void 0:t.data)==null?void 0:i.customer)==null?void 0:s.orders)==null?void 0:f.items)??[]).map(e=>{var z;return{adminAssistedOrder:(e==null?void 0:e.admin_assisted_order)??null,items:e==null?void 0:e.items.map(_=>{var H,V,J;return{status:(_==null?void 0:_.status)??"",productName:(_==null?void 0:_.product_name)??"",id:_==null?void 0:_.id,quantityOrdered:(_==null?void 0:_.quantity_ordered)??0,quantityShipped:(_==null?void 0:_.quantity_shipped)??0,quantityInvoiced:(_==null?void 0:_.quantity_invoiced)??0,sku:(_==null?void 0:_.product_sku)??"",urlKey:(_==null?void 0:_.product_url_key)??"",topLevelSku:((H=_==null?void 0:_.product)==null?void 0:H.sku)??"",product:{smallImage:{url:((J=(V=_==null?void 0:_.product)==null?void 0:V.small_image)==null?void 0:J.url)??""}}}}),token:e==null?void 0:e.token,email:e==null?void 0:e.email,shippingMethod:e==null?void 0:e.shipping_method,paymentMethods:(e==null?void 0:e.payment_methods)??[],shipments:(e==null?void 0:e.shipments)??[],id:e==null?void 0:e.id,carrier:e==null?void 0:e.carrier,status:e==null?void 0:e.status,number:e==null?void 0:e.number,returns:(z=r==null?void 0:r.items)==null?void 0:z.filter(_=>_.order.id===e.id),orderDate:bt(e.order_date),orderTime:Rt(e.order_date),shippingAddress:L(e.shipping_address),billingAddress:L(e.billing_address),total:yt(e)}}),pageInfo:{pageSize:((C=(T=(m=(E=t==null?void 0:t.data)==null?void 0:E.customer)==null?void 0:m.orders)==null?void 0:T.page_info)==null?void 0:C.page_size)??10,totalPages:((w=(M=(I=(N=t==null?void 0:t.data)==null?void 0:N.customer)==null?void 0:I.orders)==null?void 0:M.page_info)==null?void 0:w.total_pages)??1,currentPage:((v=($=(p=(U=t==null?void 0:t.data)==null?void 0:U.customer)==null?void 0:p.orders)==null?void 0:$.page_info)==null?void 0:v.current_page)??1},totalCount:((D=(G=(x=t==null?void 0:t.data)==null?void 0:x.customer)==null?void 0:G.orders)==null?void 0:D.total_count)??0,dateOfFirstOrder:((R=(F=(P=t==null?void 0:t.data)==null?void 0:P.customer)==null?void 0:F.orders)==null?void 0:R.date_of_first_order)??""};return W(o,(q=(S=(A=(k=y==null?void 0:y.getConfig())==null?void 0:k.models)==null?void 0:A.OrderHistoryModel)==null?void 0:S.transformer)==null?void 0:q.call(S,t.data))},Nt=t=>{var r,a,o,n,c,u,l,i,s,f,E,m,T,C;return{baseMediaUrl:(a=(r=t==null?void 0:t.data)==null?void 0:r.storeConfig)==null?void 0:a.base_media_url,minLength:+((n=(o=t==null?void 0:t.data)==null?void 0:o.storeConfig)==null?void 0:n.minimum_password_length)||3,requiredCharacterClasses:+((u=(c=t==null?void 0:t.data)==null?void 0:c.storeConfig)==null?void 0:u.required_character_classes_number)||0,storeCode:((i=(l=t==null?void 0:t.data)==null?void 0:l.storeConfig)==null?void 0:i.store_code)??"",shoppingAssistanceEnabled:((f=(s=t==null?void 0:t.data)==null?void 0:s.storeConfig)==null?void 0:f.shopping_assistance_enabled)??!1,shoppingAssistanceCheckboxTitle:((m=(E=t==null?void 0:t.data)==null?void 0:E.storeConfig)==null?void 0:m.shopping_assistance_checkbox_title)||"",shoppingAssistanceCheckboxTooltip:((C=(T=t==null?void 0:t.data)==null?void 0:T.storeConfig)==null?void 0:C.shopping_assistance_checkbox_tooltip)||""}},lr=t=>({firstName:t.firstName,lastName:t.lastName,emailAddress:(t==null?void 0:t.email)||"",accountId:(t==null?void 0:t.email)||""}),It={VI:"Visa",MC:"Mastercard",MD:"Maestro",AE:"American Express",DI:"Discover",DN:"Diners",JCB:"JCB",UN:"UnionPay",VISA:"Visa",MASTERCARD:"Mastercard",MAESTRO:"Maestro",AMEX:"American Express",AMERICAN_EXPRESS:"American Express",DISCOVER:"Discover",DINERS:"Diners",DINERS_CLUB:"Diners",UNIONPAY:"UnionPay"};function Mt(t){try{return JSON.parse(t)}catch{return null}}function X(t){return t.trim().toUpperCase().replaceAll(/\s+/g,"_")}function K(t){return!(t!=null&&t.trim())||X(t)==="UNKNOWN"}function j(t){if(t!=null&&t.trim())return It[X(t)]}function wt(t){return t.replaceAll("_"," ").toLowerCase().split(/\s+/).filter(Boolean).map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join(" ")}function Ut(t,r){var n,c;const a=(n=t==null?void 0:t.brand)==null?void 0:n.trim(),o=(c=t==null?void 0:t.type)==null?void 0:c.trim();if(!K(a)){const u=j(a);return u||wt(a)}if(!K(o)){const u=j(o);return u||o}return r.payment_method_code}function pt(t){if(!t)return!1;const r=/^(\d{1,2})\/(\d{4})$/.exec(t.trim());if(!r)return!1;const a=Number.parseInt(r[1],10),o=Number.parseInt(r[2],10);if(a<1||a>12)return!1;const n=new Date(o,a,0,23,59,59,999);return Date.now()>n.getTime()}function $t(t,r){return r.some(a=>t.payment_method_code===a||t.payment_method_code.startsWith(`${a}_`))}function vt(t,r){var o;const a=n=>{if(!n)return"";const c=n.replaceAll(/\D/g,"");return c.length>=4?c.slice(-4):""};if(t){const n=a(t.maskedCC)||a(t.lastFour)||a(t.last_four)||a(t.ccLast4)||a(t.cc_last4);if(n)return n}return((o=r.match(/\d{4}/g))==null?void 0:o.at(-1))??""}function xt(t){const r=t.replaceAll(/[^a-zA-Z0-9]/g,"");return r.length>=4?r.slice(-4).toUpperCase():r.padEnd(4,"0").slice(0,4).toUpperCase()}function Gt(t){if(!t.public_hash)return null;const r=Mt(t.details),a=Ut(r,t),o=vt(r,t.details)||xt(t.public_hash);return{publicHash:t.public_hash,cardBrand:a,lastFourDigits:o,expired:pt(r==null?void 0:r.expirationDate)}}function Dt(t,r){return(r!=null&&r.length?t.filter(o=>$t(o,r)):t).map(o=>Gt(o)).filter(o=>o!==null)}function Pt(t){var a,o,n,c,u,l;const r=(o=(a=t==null?void 0:t.data)==null?void 0:a.customer)==null?void 0:o.admin_assistance_actions;return r?{totalCount:r.total_count||0,items:((n=r.items)==null?void 0:n.map(i=>({action:i.action||"",date:i.date||"",details:i.details||""})))||[],pageInfo:{currentPage:((c=r.page_info)==null?void 0:c.current_page)||1,pageSize:((u=r.page_info)==null?void 0:u.page_size)||10,totalPages:((l=r.page_info)==null?void 0:l.total_pages)||1}}:null}const _r=async t=>{const r=`_account_attributesForm_${t}`,a=sessionStorage.getItem(r);return a?JSON.parse(a):await d(t!=="shortRequest"?ut:et,{method:"GET",cache:"force-cache",variables:{formCode:t}}).then(o=>{var c;if((c=o.errors)!=null&&c.length)return h(o.errors);const n=dt(o);return sessionStorage.setItem(r,JSON.stringify(n)),n}).catch(g)},Ft=`
  mutation CREATE_CUSTOMER_ADDRESS($input: CustomerAddressInput!) {
    createCustomerAddress(input: $input) {
      firstname
      uid
    }
  }
`,sr=async t=>await d(Ft,{method:"POST",variables:{input:O(t,"snakeCase",{custom_attributesV2:"custom_attributesV2",firstName:"firstname",lastName:"lastname",middleName:"middlename"})}}).then(r=>{var o,n;if((o=r.errors)!=null&&o.length)return h(r.errors);const a=(n=r==null?void 0:r.data)==null?void 0:n.createCustomerAddress;return{firstname:(a==null?void 0:a.firstname)??"",uid:(a==null?void 0:a.uid)??""}}).catch(g),kt=`
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
`,fr=async()=>await d(kt,{method:"GET",cache:"no-cache"}).then(t=>{var r;return(r=t.errors)!=null&&r.length?h(t.errors):St(t)}).catch(g),qt=`
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
`,dr=async()=>{const t="_account_countries",r=sessionStorage.getItem(t);return r?JSON.parse(r):await d(qt,{method:"GET",cache:"no-cache"}).then(a=>{var n;if((n=a.errors)!=null&&n.length)return h(a.errors);const o=Ct(a);return sessionStorage.setItem(t,JSON.stringify(o)),o}).catch(g)},Lt=`
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
`,gr=async t=>{const r=`_account_regions_${t}`,a=sessionStorage.getItem(r);return a?JSON.parse(a):await d(Lt,{method:"GET",cache:"no-cache",variables:{countryCode:t}}).then(o=>{var c;if((c=o.errors)!=null&&c.length)return h(o.errors);const n=At(o);return sessionStorage.setItem(r,JSON.stringify(n)),n}).catch(g)},Bt=`
  mutation UPDATE_CUSTOMER_ADDRESS($id: Int!, $input: CustomerAddressInput) {
    updateCustomerAddress(id: $id, input: $input) {
      firstname
    }
  }
`,hr=async t=>{const{addressId:r,...a}=t;return r?await d(Bt,{method:"POST",variables:{id:Number(r),input:O(a,"snakeCase",{custom_attributesV2:"custom_attributesV2",firstName:"firstname",lastName:"lastname",middleName:"middlename"})}}).then(o=>{var n,c,u;return(n=o.errors)!=null&&n.length?h(o.errors):((u=(c=o==null?void 0:o.data)==null?void 0:c.updateCustomerAddress)==null?void 0:u.firstname)||""}).catch(g):""},zt=`
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
`,Er=async()=>await d(zt,{method:"GET",cache:"no-cache"}).then(t=>{var r;return(r=t.errors)!=null&&r.length?h(t.errors):Tt(t)}).catch(g),Ht=`
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
`,mr=async(t,r)=>await d(Ht,{method:"GET",cache:"no-cache",variables:{pageSize:t,currentPage:r}}).then(a=>{var o;return(o=a.errors)!=null&&o.length?h(a.errors):Pt(a)}).catch(g),Vt=`
  mutation REMOVE_CUSTOMER_ADDRESS($id: Int!) {
    deleteCustomerAddress(id: $id)
  }
`,Sr=async t=>await d(Vt,{method:"POST",variables:{id:t}}).then(r=>{var a;return(a=r.errors)!=null&&a.length?h(r.errors):r.data.deleteCustomerAddress}).catch(g),Jt=`
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
`,Tr=async t=>await d(Jt,{method:"GET",cache:"no-cache"}).then(r=>{var o,n,c;if((o=r.errors)!=null&&o.length)return h(r.errors);const a=((c=(n=r.data)==null?void 0:n.customerPaymentTokens)==null?void 0:c.items)??[];return Dt(a,t)}).catch(g),Kt=`
  mutation deletePaymentToken($public_hash: String!) {
    deletePaymentToken(public_hash: $public_hash) {
      result
    }
  }
`,Cr=async t=>await d(Kt,{method:"POST",variables:{public_hash:t}}).then(r=>{var a,o,n;return(a=r.errors)!=null&&a.length?h(r.errors):!!((n=(o=r.data)==null?void 0:o.deletePaymentToken)!=null&&n.result)}).catch(g),jt=`
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
  ${it}
  ${ct}
`,Q=3,Y=100,Qt={sort_direction:"DESC",sort_field:"CREATED_AT"},Ar=async(t,r,a,o="",n)=>{const c={};r!=="viewAll"&&(c.order_date=JSON.parse(r));const u=o.trim();if(u&&u.length<Q)throw new RangeError(`Order search must contain at least ${Q} characters.`);if(u.length>Y)throw new RangeError(`Order search cannot exceed ${Y} characters.`);return u&&(c.search=u),await d(jt,{method:"GET",cache:"no-cache",signal:n,variables:{pageSize:t,currentPage:a,filter:c,sort:Qt}}).then(l=>{var i;return(i=l.errors)!=null&&i.length?h(l.errors):Ot(l)}).catch(g)},Yt=`
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
`,br=async({currentPassword:t,newPassword:r})=>await d(Yt,{method:"POST",variables:{currentPassword:t,newPassword:r}}).then(a=>{var o,n,c;return(o=a.errors)!=null&&o.length?h(a.errors):((c=(n=a==null?void 0:a.data)==null?void 0:n.changeCustomerPassword)==null?void 0:c.email)||""}).catch(g),Wt=`
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
`,Rr=async()=>await d(Wt,{method:"GET",cache:"force-cache"}).then(t=>{var r;return(r=t.errors)!=null&&r.length?h(t.errors):Nt(t)}).catch(g),Zt=`
  mutation UPDATE_CUSTOMER_EMAIL($email: String!, $password: String!) {
    updateCustomerEmail(email: $email, password: $password) {
      customer {
        email
      }
    }
  }
`,yr=async({email:t,password:r})=>await d(Zt,{method:"POST",variables:{email:t,password:r}}).then(a=>{var o,n,c,u;return(o=a.errors)!=null&&o.length?h(a.errors):((u=(c=(n=a==null?void 0:a.data)==null?void 0:n.updateCustomerEmail)==null?void 0:c.customer)==null?void 0:u.email)||""}).catch(g),Xt=`
  mutation UPDATE_CUSTOMER_V2($input: CustomerUpdateInput!) {
    updateCustomerV2(input: $input) {
      customer {
        email
        allow_remote_shopping_assistance
      }
    }
  }
`,Or=async t=>await d(Xt,{method:"POST",variables:{input:O(t,"snakeCase",{firstName:"firstname",lastName:"lastname",middleName:"middlename",dob:"date_of_birth",custom_attributesV2:"custom_attributes"})}}).then(r=>{var a,o,n,c;return(a=r.errors)!=null&&a.length?h(r.errors):((c=(n=(o=r==null?void 0:r.data)==null?void 0:o.updateCustomerV2)==null?void 0:n.customer)==null?void 0:c.email)||""}).catch(g);export{Y as O,lt as a,B as b,O as c,y as config,sr as createCustomerAddress,Q as d,Cr as deletePaymentToken,d as fetchGraphQl,mr as getAdminAssistanceActions,_r as getAttributesForm,er as getConfig,dr as getCountries,Er as getCustomer,fr as getCustomerAddress,Tr as getCustomerPaymentTokens,Ar as getOrderHistoryList,gr as getRegions,Rr as getStoreConfig,Z as initialize,Sr as removeCustomerAddress,cr as removeFetchGraphQlHeader,nr as setEndpoint,ir as setFetchGraphQlHeader,ur as setFetchGraphQlHeaders,lr as t,Or as updateCustomer,hr as updateCustomerAddress,yr as updateCustomerEmail,br as updateCustomerPassword};
//# sourceMappingURL=api.js.map
