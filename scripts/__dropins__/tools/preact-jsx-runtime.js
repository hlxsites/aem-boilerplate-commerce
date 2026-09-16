/*! TEMPORARY TEST OVERRIDE: re-exports from a vendored Preact build (see
scripts/vendor/preact/) instead of the version bundled with @dropins/tools,
for testing purposes only. Revert to the original @dropins/tools build to
restore the pinned version. */
export {
  Fragment,
  jsx,
  jsxAttr,
  jsxDEV,
  jsxEscape,
  jsxTemplate,
  jsxs,
} from 'preact/jsx-runtime';
