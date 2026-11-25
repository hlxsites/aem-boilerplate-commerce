/*! Copyright 2026 Adobe
All Rights Reserved. */
import { useState as u, useEffect as c, jsx as p } from "@dropins/tools/preact-bundle.js";
import { events as g } from "@dropins/tools/event-bus.js";
import { Slot as d } from "@dropins/tools/lib.js";
import { getPersonalizationData as f, r as s } from "./api.js";
import "@dropins/tools/fetch-graphql.js";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const r = (e, t) => e && t.some((o) => e.includes(o.trim())), x = (e, t) => t.includes(e);
function l(e, t) {
  const [o] = e.groups;
  return !(t.segments.length > 0 && !r(e.segments, t.segments) || t.groups.length > 0 && (o === void 0 || !x(o, t.groups)) || t.cartRules.length > 0 && !r(e.cartRules, t.cartRules));
}
const h = ({ slots: e, personalizationData: t, type: o }) => {
  const [a, i] = u(() => l(f(), t) && s(o));
  return c(() => {
    const n = g.on("personalization/updated", (m) => {
      i(l(m, t) && s(o));
    });
    return () => {
      n == null || n.off();
    };
  }, [o, t]), a ? p(d, { name: "Content", slot: e.Content, context: {} }) : null;
};
h.displayName = "TargetedBlock";
export {
  h as TargetedBlock
};
//# sourceMappingURL=containers.js.map
