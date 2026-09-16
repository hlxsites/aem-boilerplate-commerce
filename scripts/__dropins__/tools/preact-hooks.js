/*! TEMPORARY TEST OVERRIDE: re-exports from a vendored Preact build (see
scripts/vendor/preact/) instead of the version bundled with @dropins/tools,
for testing purposes only. Revert to the original @dropins/tools build to
restore the pinned version. */
export {
  useCallback,
  useContext,
  useDebugValue,
  useEffect,
  useErrorBoundary,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'preact/hooks';
