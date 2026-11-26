/*! Copyright 2026 Adobe
All Rights Reserved. */
import { useState as x, useMemo as k, jsx as I, useEffect as w, useCallback as m } from "@dropins/tools/preact-bundle.js";
import { Picker as z } from "@dropins/tools/components.js";
import { events as u } from "@dropins/tools/event-bus.js";
import { CustomerCompanyContext as b, getCompanyHeaderManager as H, config as v, updateCustomerGroup as K, getGroupHeaderManager as G } from "./api.js";
import "./fragments.js";
import "@dropins/tools/fetch-graphql.js";
import "@dropins/tools/lib.js";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const M = ({ onCompanyChange: l, pageSize: y = 100 } = {}) => {
  const [c, s] = x([]), [p, r] = x({ text: "", value: "" }), C = m(async () => {
    var o, n;
    try {
      const e = await b.getInstance().getCustomerCompanyInfo(y);
      s(e.customerCompanies), (o = e.currentCompany) != null && o.name && (n = e.currentCompany) != null && n.id && r({ text: e.currentCompany.name, value: e.currentCompany.id });
    } catch (e) {
      console.error("Failed to load company data:", e);
    }
  }, [y]), S = m(async (o) => {
    const n = o.target.value, e = c.find((t) => t.value === n);
    e && r(e), H().setCompanyHeaders(n), n ? sessionStorage.setItem(v.getConfig().companySessionStorageKey, n) : sessionStorage.removeItem(v.getConfig().companySessionStorageKey);
    const a = await K();
    G().setGroupHeaders(a), a ? sessionStorage.setItem(v.getConfig().groupSessionStorageKey, a) : sessionStorage.removeItem(v.getConfig().groupSessionStorageKey), l == null || l({ id: n, name: (e == null ? void 0 : e.text) || "" }), u.emit("companyContext/changed", n);
  }, [c, l]), i = m(() => {
    b.getInstance().resetCache(), s([]), r({ text: "", value: "" });
  }, []), f = m((o) => {
    o ? C() : i();
  }, [C, i]), g = m((o) => {
    if (!o) {
      i();
      return;
    }
    s((n) => {
      const e = n.find((a) => a.value === o);
      return e && r(e), n;
    });
  }, [i, s, r]), d = m((o) => {
    const { company: n } = o;
    s((e) => {
      const a = e.findIndex((t) => t.value === n.id);
      return a === -1 ? e : e.map((t, h) => h === a ? { ...t, text: n.name } : t);
    }), r({ text: n.name, value: n.id });
  }, []);
  return w(() => {
    const o = u.on("authenticated", f, { eager: !0 }), n = u.on("companyContext/changed", g, { eager: !0 }), e = u.on("company/updated", d);
    return () => {
      var a, t, h;
      (a = o == null ? void 0 : o.off) == null || a.call(o), (t = n == null ? void 0 : n.off) == null || t.call(n), (h = e == null ? void 0 : e.off) == null || h.call(e);
    };
  }, [f, g, d]), { companies: c, currentCompany: p, handleCompanyChange: S };
}, P = ({ ariaLabel: l, onCompanyChange: y, size: c = 100, ...s }) => {
  const { companies: p, currentCompany: r, handleCompanyChange: C } = M({ onCompanyChange: y, pageSize: c }), [S, i] = x(!0), f = k(() => p, [p]);
  return w(() => {
    const g = () => {
      i(!1);
    }, d = u.on("checkout/initialized", g), o = u.on("checkout/updated", g);
    return () => {
      d == null || d.off(), o == null || o.off();
    };
  }, []), p.length < 2 || !S ? null : I("div", { ...s, children: I(z, { options: f, value: r.value, onChange: C, "aria-label": l || "Select company", "aria-describedby": "company-switcher-description" }) });
};
P.displayName = "CompanySwitcher";
export {
  P as CompanySwitcher
};
//# sourceMappingURL=containers.js.map
