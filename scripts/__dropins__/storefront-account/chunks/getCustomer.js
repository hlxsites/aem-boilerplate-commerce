/*! Copyright 2026 Adobe
All Rights Reserved. */
import{m as n,f as H,h as J,a as K}from"./removeCustomerAddress.js";import{BASIC_CUSTOMER_INFO_FRAGMENT as W}from"../fragments.js";import{c as X}from"./initialize.js";import"@dropins/tools/event-bus.js";import{merge as Y}from"@dropins/tools/lib.js";const Z=t=>{var d,_,u,l,o,f,g,h,C,r,E,A,S,T,N,O,M,R,b,v,G,x,F,I,w,U,y,B,k,z,P,q,c,D;const i=(u=(_=(d=t==null?void 0:t.data)==null?void 0:d.customer)==null?void 0:_.custom_attributes)==null?void 0:u.filter(a=>a).reduce((a,m)=>{var Q;const L=n(m.code);return(Q=m.selected_options)!=null&&Q.length?a[L]=m.selected_options[0].value??"":a[L]=m.value??"",a},{}),$=(o=(l=t==null?void 0:t.data)==null?void 0:l.customer)!=null&&o.admin_assistance_actions?{totalCount:t.data.customer.admin_assistance_actions.total_count||0,items:((f=t.data.customer.admin_assistance_actions.items)==null?void 0:f.map(a=>({action:a.action||"",date:a.date||"",details:a.details||""})))||[],pageInfo:{currentPage:((g=t.data.customer.admin_assistance_actions.page_info)==null?void 0:g.current_page)||1,pageSize:((h=t.data.customer.admin_assistance_actions.page_info)==null?void 0:h.page_size)||5,totalPages:((C=t.data.customer.admin_assistance_actions.page_info)==null?void 0:C.total_pages)||1}}:void 0,j={email:((E=(r=t==null?void 0:t.data)==null?void 0:r.customer)==null?void 0:E.email)||"",firstName:((S=(A=t==null?void 0:t.data)==null?void 0:A.customer)==null?void 0:S.firstname)||"",lastName:((N=(T=t==null?void 0:t.data)==null?void 0:T.customer)==null?void 0:N.lastname)||"",middleName:((M=(O=t==null?void 0:t.data)==null?void 0:O.customer)==null?void 0:M.middlename)||"",gender:((b=(R=t==null?void 0:t.data)==null?void 0:R.customer)==null?void 0:b.gender)||"1",dateOfBirth:((G=(v=t==null?void 0:t.data)==null?void 0:v.customer)==null?void 0:G.date_of_birth)||"",prefix:((F=(x=t==null?void 0:t.data)==null?void 0:x.customer)==null?void 0:F.prefix)||"",suffix:((w=(I=t==null?void 0:t.data)==null?void 0:I.customer)==null?void 0:w.suffix)||"",createdAt:((y=(U=t==null?void 0:t.data)==null?void 0:U.customer)==null?void 0:y.created_at)||"",allowRemoteShoppingAssistance:(k=(B=t==null?void 0:t.data)==null?void 0:B.customer)==null?void 0:k.allow_remote_shopping_assistance,adminAssistanceActions:$,...i};return Y(j,(D=(c=(q=(P=(z=X)==null?void 0:z.getConfig())==null?void 0:P.models)==null?void 0:q.CustomerDataModelShort)==null?void 0:c.transformer)==null?void 0:D.call(c,t.data))},V=`
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
  ${W}
`,it=async()=>await H(V,{method:"GET",cache:"no-cache"}).then(t=>{var i;return(i=t.errors)!=null&&i.length?J(t.errors):Z(t)}).catch(K);export{it as g};
//# sourceMappingURL=getCustomer.js.map
