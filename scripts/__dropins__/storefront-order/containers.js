/*! Copyright 2026 Adobe
All Rights Reserved. */
import * as C from "@dropins/tools/preact-bundle.js";
import { memo as Ge, useCallback as Z, jsx as r, Fragment as D, jsxs as h, useRef as Ue, useState as O, useEffect as M, useMemo as re } from "@dropins/tools/preact-bundle.js";
import { classes as E, Slot as q, debounce as pr, sanitizeHtml as gr } from "@dropins/tools/lib.js";
import { Field as ve, Picker as je, Input as hr, InputDate as vr, Checkbox as Be, TextArea as fr, InLineAlert as ue, Button as Q, Icon as J, Skeleton as be, SkeletonRow as $, CartItemSkeleton as fe, CartItem as Qe, Image as he, Price as R, Card as z, Header as B, ContentGrid as we, Pagination as _r, Accordion as Ne, AccordionSection as Le, Incrementer as yr, IllustratedMessage as br, Modal as Cr } from "@dropins/tools/components.js";
import { useText as H, Text as F } from "@dropins/tools/i18n.js";
import { events as G } from "@dropins/tools/event-bus.js";
import { createRef as xr, Fragment as Ye } from "@dropins/tools/preact.js";
import { requestGuestOrderCancel as Or, cancelOrder as wr, getStoreConfig as Nr, getAttributesList as Lr, requestGuestReturn as Sr, requestReturn as Tr, getAttributesForm as Er, c as kr, getOrderInvoices as Xe, t as ke, getCustomer as Ae, r as ne, getGuestOrder as Ir, confirmCancelOrder as Dr, confirmGuestReturn as Rr, getCustomerOrdersReturn as Mr, reorderItems as Pr } from "./api.js";
import "@dropins/tools/recaptcha.js";
import "./fragments.js";
import "@dropins/tools/fetch-graphql.js";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const Ar = (e) => C.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, C.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M2.00718 5H22.1507C22.7047 5 23.1579 5.45323 23.1579 6.00718V7.51794C23.1579 7.51794 1.01007 7.58844 1 7.55823V6.00718C1 5.45323 1.45323 5 2.00718 5Z", stroke: "currentColor", strokeWidth: 1 }), C.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M23.1579 9.78409V18.3451C23.1579 18.899 22.7047 19.3523 22.1507 19.3523H2.00718C1.45323 19.3523 1 18.899 1 18.3451V9.78409H23.1579Z", stroke: "currentColor", strokeWidth: 1 }), C.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M3.01465 15.9682H8.40305", stroke: "currentColor", strokeWidth: 1, strokeLinecap: "round" }), C.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M17.6192 17.5897C18.4535 17.5897 19.1299 16.9133 19.1299 16.0789C19.1299 15.2446 18.4535 14.5682 17.6192 14.5682C16.7848 14.5682 16.1084 15.2446 16.1084 16.0789C16.1084 16.9133 16.7848 17.5897 17.6192 17.5897Z", stroke: "currentColor", strokeWidth: 1 }), C.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M19.8848 17.5897C20.7192 17.5897 21.3956 16.9133 21.3956 16.0789C21.3956 15.2446 20.7192 14.5682 19.8848 14.5682C19.0504 14.5682 18.374 15.2446 18.374 16.0789C18.374 16.9133 19.0504 17.5897 19.8848 17.5897Z", stroke: "currentColor", strokeWidth: 1 })), Vr = (e) => C.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, C.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M0.75 12C0.75 5.78421 5.78421 0.75 12 0.75C18.2158 0.75 23.25 5.78421 23.25 12C23.25 18.2158 18.2158 23.25 12 23.25C5.78421 23.25 0.75 18.2158 0.75 12Z", stroke: "currentColor" }), C.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M6.75 12.762L10.2385 15.75L17.25 9", stroke: "currentColor" })), $r = (e) => C.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, C.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M7.74512 9.87701L12.0001 14.132L16.2551 9.87701", stroke: "currentColor", strokeWidth: 1, strokeLinecap: "square", strokeLinejoin: "round" })), Ve = (e) => C.createElement("svg", { id: "Icon_Chevron_right_Base", "data-name": "Icon \\u2013 Chevron right \\u2013 Base", xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", ...e }, C.createElement("g", { id: "Large" }, C.createElement("rect", { id: "Placement_area", "data-name": "Placement area", width: 24, height: 24, fill: "#fff", opacity: 0 }), C.createElement("g", { id: "Chevron_right_icon", "data-name": "Chevron right icon" }, C.createElement("path", { vectorEffect: "non-scaling-stroke", id: "chevron", d: "M199.75,367.5l4.255,-4.255-4.255,-4.255", transform: "translate(-189.25 -351.0)", fill: "none", stroke: "currentColor" })))), Hr = (e) => C.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, C.createElement("path", { d: "M7.74512 14.132L12.0001 9.87701L16.2551 14.132", stroke: "currentColor", strokeWidth: 1, strokeLinecap: "square", strokeLinejoin: "round" })), Zr = (e) => C.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, C.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M22 6.25H22.75C22.75 5.83579 22.4142 5.5 22 5.5V6.25ZM22 9.27L22.2514 9.97663C22.5503 9.87029 22.75 9.58731 22.75 9.27H22ZM20.26 12.92L19.5534 13.1714L19.5539 13.1728L20.26 12.92ZM22 14.66H22.75C22.75 14.3433 22.551 14.0607 22.2528 13.9539L22 14.66ZM22 17.68V18.43C22.4142 18.43 22.75 18.0942 22.75 17.68H22ZM2 17.68H1.25C1.25 18.0942 1.58579 18.43 2 18.43V17.68ZM2 14.66L1.74865 13.9534C1.44969 14.0597 1.25 14.3427 1.25 14.66H2ZM3.74 11.01L4.44663 10.7586L4.44611 10.7572L3.74 11.01ZM2 9.27H1.25C1.25 9.58675 1.44899 9.86934 1.7472 9.97611L2 9.27ZM2 6.25V5.5C1.58579 5.5 1.25 5.83579 1.25 6.25H2ZM21.25 6.25V9.27H22.75V6.25H21.25ZM21.7486 8.56337C19.8706 9.23141 18.8838 11.2889 19.5534 13.1714L20.9666 12.6686C20.5762 11.5711 21.1494 10.3686 22.2514 9.97663L21.7486 8.56337ZM19.5539 13.1728C19.9195 14.1941 20.7259 15.0005 21.7472 15.3661L22.2528 13.9539C21.6541 13.7395 21.1805 13.2659 20.9661 12.6672L19.5539 13.1728ZM21.25 14.66V17.68H22.75V14.66H21.25ZM22 16.93H2V18.43H22V16.93ZM2.75 17.68V14.66H1.25V17.68H2.75ZM2.25135 15.3666C4.12941 14.6986 5.11623 12.6411 4.44663 10.7586L3.03337 11.2614C3.42377 12.3589 2.85059 13.5614 1.74865 13.9534L2.25135 15.3666ZM4.44611 10.7572C4.08045 9.73588 3.27412 8.92955 2.2528 8.56389L1.7472 9.97611C2.34588 10.1905 2.81955 10.6641 3.03389 11.2628L4.44611 10.7572ZM2.75 9.27V6.25H1.25V9.27H2.75ZM2 7H22V5.5H2V7ZM7.31 6.74V18.17H8.81V6.74H7.31ZM17.0997 8.39967L11.0397 14.4597L12.1003 15.5203L18.1603 9.46033L17.0997 8.39967ZM12.57 9.67C12.57 9.87231 12.4159 10 12.27 10V11.5C13.2839 11.5 14.07 10.6606 14.07 9.67H12.57ZM12.27 10C12.1241 10 11.97 9.87231 11.97 9.67H10.47C10.47 10.6606 11.2561 11.5 12.27 11.5V10ZM11.97 9.67C11.97 9.46769 12.1241 9.34 12.27 9.34V7.84C11.2561 7.84 10.47 8.67938 10.47 9.67H11.97ZM12.27 9.34C12.4159 9.34 12.57 9.46769 12.57 9.67H14.07C14.07 8.67938 13.2839 7.84 12.27 7.84V9.34ZM17.22 14.32C17.22 14.5223 17.0659 14.65 16.92 14.65V16.15C17.9339 16.15 18.72 15.3106 18.72 14.32H17.22ZM16.92 14.65C16.7741 14.65 16.62 14.5223 16.62 14.32H15.12C15.12 15.3106 15.9061 16.15 16.92 16.15V14.65ZM16.62 14.32C16.62 14.1177 16.7741 13.99 16.92 13.99V12.49C15.9061 12.49 15.12 13.3294 15.12 14.32H16.62ZM16.92 13.99C17.0659 13.99 17.22 14.1177 17.22 14.32H18.72C18.72 13.3294 17.9339 12.49 16.92 12.49V13.99Z", fill: "currentColor" })), Wr = (e) => C.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, C.createElement("path", { d: "M12.002 21L11.8275 21.4686C11.981 21.5257 12.1528 21.5041 12.2873 21.4106C12.4218 21.3172 12.502 21.1638 12.502 21H12.002ZM3.89502 17.9823H3.39502C3.39502 18.1912 3.52485 18.378 3.72059 18.4509L3.89502 17.9823ZM3.89502 8.06421L4.07193 7.59655C3.91831 7.53844 3.74595 7.55948 3.61082 7.65284C3.47568 7.74619 3.39502 7.89997 3.39502 8.06421H3.89502ZM12.0007 21H11.5007C11.5007 21.1638 11.5809 21.3172 11.7154 21.4106C11.8499 21.5041 12.0216 21.5257 12.1751 21.4686L12.0007 21ZM20.1076 17.9823L20.282 18.4509C20.4778 18.378 20.6076 18.1912 20.6076 17.9823H20.1076ZM20.1076 8.06421H20.6076C20.6076 7.89997 20.527 7.74619 20.3918 7.65284C20.2567 7.55948 20.0843 7.53844 19.9307 7.59655L20.1076 8.06421ZM12.0007 11.1311L11.8238 10.6634C11.6293 10.737 11.5007 10.9232 11.5007 11.1311H12.0007ZM20.2858 8.53191C20.5441 8.43421 20.6743 8.14562 20.5766 7.88734C20.4789 7.62906 20.1903 7.49889 19.932 7.5966L20.2858 8.53191ZM12.002 4.94826L12.1775 4.48008C12.0605 4.43623 11.9314 4.43775 11.8154 4.48436L12.002 4.94826ZM5.87955 6.87106C5.62334 6.97407 5.49915 7.26528 5.60217 7.52149C5.70518 7.77769 5.99639 7.90188 6.2526 7.79887L5.87955 6.87106ZM18.1932 7.80315C18.4518 7.90008 18.74 7.76904 18.8369 7.51047C18.9338 7.2519 18.8028 6.96371 18.5442 6.86678L18.1932 7.80315ZM12 4.94827L11.5879 5.23148C11.6812 5.36719 11.8353 5.44827 12 5.44827C12.1647 5.44827 12.3188 5.36719 12.4121 5.23148L12 4.94827ZM14.0263 2L14.2028 1.53218C13.9875 1.45097 13.7446 1.52717 13.6143 1.71679L14.0263 2ZM21.8421 4.94827L22.2673 5.2113C22.3459 5.08422 22.3636 4.92863 22.3154 4.78717C22.2673 4.64571 22.1584 4.53319 22.0186 4.48045L21.8421 4.94827ZM9.97368 2L10.3857 1.71679C10.2554 1.52717 10.0125 1.45097 9.79721 1.53218L9.97368 2ZM2.15789 4.94827L1.98142 4.48045C1.84161 4.53319 1.73271 4.64571 1.68456 4.78717C1.63641 4.92863 1.65406 5.08422 1.73267 5.2113L2.15789 4.94827ZM12 11.1256L11.6702 11.5014C11.8589 11.667 12.1411 11.667 12.3298 11.5014L12 11.1256ZM15.0395 8.45812L14.8732 7.98659C14.8131 8.00779 14.7576 8.04028 14.7097 8.08232L15.0395 8.45812ZM23 5.65024L23.3288 6.0269C23.5095 5.86916 23.5527 5.60532 23.4318 5.39817C23.3109 5.19102 23.0599 5.09893 22.8337 5.17871L23 5.65024ZM8.96053 8.45812L9.29034 8.08232C9.24244 8.04028 9.18695 8.00779 9.12685 7.98659L8.96053 8.45812ZM1 5.65024L1.16632 5.17871C0.940115 5.09893 0.689119 5.19102 0.568192 5.39817C0.447264 5.60532 0.49048 5.86916 0.671176 6.0269L1 5.65024ZM12.1764 20.5314L4.06945 17.5137L3.72059 18.4509L11.8275 21.4686L12.1764 20.5314ZM4.39502 17.9823V8.06421H3.39502V17.9823H4.39502ZM3.71811 8.53187L11.8251 11.5987L12.1789 10.6634L4.07193 7.59655L3.71811 8.53187ZM11.502 11.1311V21H12.502V11.1311H11.502ZM12.1751 21.4686L20.282 18.4509L19.9332 17.5137L11.8262 20.5314L12.1751 21.4686ZM20.6076 17.9823V8.06421H19.6076V17.9823H20.6076ZM19.9307 7.59655L11.8238 10.6634L12.1776 11.5987L20.2845 8.53187L19.9307 7.59655ZM11.5007 11.1311V21H12.5007V11.1311H11.5007ZM19.932 7.5966L11.8251 10.6634L12.1789 11.5987L20.2858 8.53191L19.932 7.5966ZM11.8154 4.48436L5.87955 6.87106L6.2526 7.79887L12.1885 5.41217L11.8154 4.48436ZM11.8265 5.41645L18.1932 7.80315L18.5442 6.86678L12.1775 4.48008L11.8265 5.41645ZM11.502 4.94826V11.1311H12.502V4.94826H11.502ZM12.4121 5.23148L14.4384 2.28321L13.6143 1.71679L11.5879 4.66507L12.4121 5.23148ZM13.8498 2.46782L21.6656 5.4161L22.0186 4.48045L14.2028 1.53218L13.8498 2.46782ZM21.4169 4.68525L20.5485 6.08919L21.3989 6.61524L22.2673 5.2113L21.4169 4.68525ZM12.4121 4.66507L10.3857 1.71679L9.56162 2.28321L11.5879 5.23148L12.4121 4.66507ZM9.79721 1.53218L1.98142 4.48045L2.33437 5.4161L10.1502 2.46782L9.79721 1.53218ZM1.73267 5.2113L2.60109 6.61524L3.45154 6.08919L2.58312 4.68525L1.73267 5.2113ZM12.3298 11.5014L15.3693 8.83392L14.7097 8.08232L11.6702 10.7498L12.3298 11.5014ZM15.2058 8.92965L23.1663 6.12177L22.8337 5.17871L14.8732 7.98659L15.2058 8.92965ZM22.6712 5.27358L19.7764 7.80067L20.4341 8.554L23.3288 6.0269L22.6712 5.27358ZM12.3298 10.7498L9.29034 8.08232L8.63072 8.83392L11.6702 11.5014L12.3298 10.7498ZM9.12685 7.98659L1.16632 5.17871L0.83368 6.12177L8.79421 8.92965L9.12685 7.98659ZM0.671176 6.0269L3.56591 8.554L4.22356 7.80067L1.32882 5.27358L0.671176 6.0269Z", fill: "currentColor" })), zr = (e) => C.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, C.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M22 12.8571V6.75774C22 6.33761 21.5848 6 21.0884 6H2.91155C2.40614 6 2 6.34511 2 6.75774V12.8571M22 12.8571H2M22 12.8571V17.0049C22 17.5468 21.5939 18 21.0884 18H2.91155C2.41516 18 2 17.5567 2 17.0049V12.8571M5.18182 16.0886L8.64545 12.8229M8.64545 12.8229L12.1087 16.0886M8.64545 12.8229C8.64545 12.8229 8.09964 10.4743 7.56328 9.96857C7.02692 9.46286 6.15419 9.46286 5.61783 9.96857C5.08146 10.4743 5.08146 11.2971 5.61783 11.8029C6.15419 12.3086 8.64545 12.8229 8.64545 12.8229ZM8.64545 12.8229C8.64545 12.8229 11.1542 12.2914 11.6905 11.7857C12.2269 11.28 12.2269 10.4571 11.6905 9.95141C11.1542 9.4457 10.2814 9.4457 9.74507 9.95141C9.2087 10.4571 8.64545 12.8229 8.64545 12.8229ZM8.64506 17.2886V6.70286", stroke: "currentColor", strokeWidth: 1, strokeLinecap: "round" })), qr = (e) => C.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, C.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M12 22.2125L2 18.375V5.76245L12 9.66245V22.2125Z", stroke: "currentColor", strokeWidth: 1, strokeLinecap: "round", strokeLinejoin: "round" }), C.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M12 22.2125L22 18.375V5.76245L12 9.66245V22.2125Z", stroke: "currentColor", strokeWidth: 1, strokeLinecap: "round", strokeLinejoin: "round" }), C.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M2 5.76249L12 1.79999L22 5.76249L12 9.66249L2 5.76249Z", stroke: "currentColor", strokeWidth: 1, strokeLinecap: "round", strokeLinejoin: "round" }), C.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M7.41309 3.61249L17.4131 7.52499V11.3625", stroke: "currentColor", strokeWidth: 1, strokeLinecap: "round", strokeLinejoin: "round" })), Fr = (e) => C.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, C.createElement("g", { clipPath: "url(#clip0_4797_15077)" }, C.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M10.15 20.85L1.5 17.53V6.63L10.15 10V20.85Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1 }), C.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M1.5 6.63001L10.15 3.20001L18.8 6.63001L10.15 10L1.5 6.63001Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1 }), C.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M6.17969 4.77002L14.8297 8.15002V11.47", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1 }), C.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M18.7896 12.64V6.63L10.1396 10V20.85L14.8296 19.05", stroke: "currentColor", strokeLinejoin: "round", strokeWidth: 1 }), C.createElement("path", { className: "success-icon", vectorEffect: "non-scaling-stroke", d: "M15.71 17.26C15.71 15.38 17.23 13.86 19.11 13.86C20.99 13.86 22.51 15.38 22.51 17.26C22.51 19.14 20.99 20.66 19.11 20.66C17.23 20.66 15.71 19.14 15.71 17.26Z", stroke: "currentColor", strokeWidth: 1 }), C.createElement("path", { className: "success-icon", vectorEffect: "non-scaling-stroke", d: "M17.4805 17.49L18.5605 18.41L20.7205 16.33", stroke: "currentColor", strokeLinecap: "square", strokeLinejoin: "round", strokeWidth: 1 })), C.createElement("defs", null, C.createElement("clipPath", { id: "clip0_4797_15077" }, C.createElement("rect", { width: 22, height: 18.65, fill: "white", transform: "translate(1 2.70001)" })))), Gr = (e) => C.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, C.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M11.8052 14.4968C10.8552 14.4968 9.9752 14.0268 9.4452 13.2368L9.4152 13.1868L9.3852 13.1268C8.1352 11.2268 7.5352 8.96681 7.6852 6.68681C7.7552 4.42681 9.6052 2.61681 11.8652 2.60681H12.0052C14.2752 2.47681 16.2152 4.21681 16.3452 6.47681C16.3452 6.55681 16.3452 6.62681 16.3452 6.70681C16.4852 8.94681 15.9052 11.1768 14.6852 13.0568L14.6052 13.1768C14.0552 13.9868 13.1352 14.4668 12.1652 14.4768H12.0052C11.9352 14.4768 11.8652 14.4868 11.7952 14.4868L11.8052 14.4968Z", stroke: "currentColor" }), C.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M4.3252 21.5469C4.3552 20.4169 4.4752 19.2869 4.6752 18.1769C4.8952 17.1669 6.4752 16.0269 8.9052 15.1569C9.2352 15.0369 9.4852 14.7869 9.5952 14.4569L9.8052 14.0269", stroke: "currentColor" }), C.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M14.425 14.4069L14.165 14.1569C14.375 14.5969 14.725 14.9569 15.155 15.1869C16.945 15.7969 19.125 16.9569 19.375 18.2069C19.585 19.3069 19.685 20.4269 19.675 21.5369", stroke: "currentColor" })), Ur = (e) => C.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, C.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M17.93 14.8V18.75H5.97C4.75 18.75 3.75 17.97 3.75 17V6.5M3.75 6.5C3.75 5.53 4.74 4.75 5.97 4.75H15.94V8.25H5.97C4.75 8.25 3.75 7.47 3.75 6.5Z", stroke: "currentColor", strokeWidth: 1, strokeLinecap: "round", strokeLinejoin: "round" }), C.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M19.35 11.64H14.04V14.81H19.35V11.64Z", stroke: "currentColor", strokeWidth: 1, strokeLinecap: "round", strokeLinejoin: "round" }), C.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M17.9304 11.64V8.25H15.1504", stroke: "currentColor", strokeWidth: 1, strokeLinecap: "round", strokeLinejoin: "round" })), jr = (e) => C.createElement("svg", { id: "Icon_Warning_Base", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, C.createElement("g", { clipPath: "url(#clip0_841_1324)" }, C.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M11.9949 2.30237L0.802734 21.6977H23.1977L11.9949 2.30237Z", stroke: "currentColor", strokeWidth: 1, strokeLinecap: "round", strokeLinejoin: "round" }), C.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M12.4336 10.5504L12.3373 14.4766H11.6632L11.5669 10.5504V9.51273H12.4336V10.5504ZM11.5883 18.2636V17.2687H12.4229V18.2636H11.5883Z", stroke: "currentColor", strokeWidth: 1, strokeLinecap: "round", strokeLinejoin: "round" })), C.createElement("defs", null, C.createElement("clipPath", { id: "clip0_841_1324" }, C.createElement("rect", { width: 24, height: 21, fill: "white", transform: "translate(0 1.5)", strokeWidth: 1 })))), Br = (e) => C.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, C.createElement("path", { vectorEffect: "non-scaling-stroke", fillRule: "evenodd", clipRule: "evenodd", d: "M1 20.8953L12.1922 1.5L23.395 20.8953H1ZM13.0278 13.9638L13.25 10.0377V9H11.25V10.0377L11.4722 13.9638H13.0278ZM11.2994 16V17.7509H13.2253V16H11.2994Z", fill: "currentColor" })), Je = (e) => C.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, C.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M0.75 12C0.75 5.78421 5.78421 0.75 12 0.75C18.2158 0.75 23.25 5.78421 23.25 12C23.25 18.2158 18.2158 23.25 12 23.25C5.78421 23.25 0.75 18.2158 0.75 12Z", stroke: "currentColor" }), C.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M11.75 5.88423V4.75H12.25V5.88423L12.0485 13.0713H11.9515L11.75 5.88423ZM11.7994 18.25V16.9868H12.2253V18.25H11.7994Z", stroke: "currentColor" }));
var Oe = ((e) => (e.CANCEL = "CANCEL", e.RETURN = "RETURN", e.REORDER = "REORDER", e))(Oe || {}), pe = ((e) => (e.BOOLEAN = "BOOLEAN", e.DATE = "DATE", e.DATETIME = "DATETIME", e.DROPDOWN = "DROPDOWN", e.FILE = "FILE", e.GALLERY = "GALLERY", e.HIDDEN = "HIDDEN", e.IMAGE = "IMAGE", e.MEDIA_IMAGE = "MEDIA_IMAGE", e.MULTILINE = "MULTILINE", e.MULTISELECT = "MULTISELECT", e.PRICE = "PRICE", e.SELECT = "SELECT", e.TEXT = "TEXT", e.TEXTAREA = "TEXTAREA", e.UNDEFINED = "UNDEFINED", e.VISUAL = "VISUAL", e.WEIGHT = "WEIGHT", e.EMPTY = "", e))(pe || {}), Ke = ((e) => (e.PENDING = "pending", e.SHIPPING = "shipping", e.COMPLETE = "complete", e.PROCESSING = "processing", e.HOLD = "on hold", e.CANCELED = "Canceled", e.SUSPECTED_FRAUD = "suspected fraud", e.PAYMENT_REVIEW = "payment review", e))(Ke || {});
const er = (e) => {
  if (!e) return null;
  const t = new FormData(e);
  if (e.querySelectorAll('input[type="checkbox"]').forEach((a) => {
    t.has(a.name) || t.set(a.name, "false"), a.checked && t.set(a.name, "true");
  }), t && typeof t.entries == "function") {
    const a = t.entries();
    if (a && typeof a[Symbol.iterator] == "function") return JSON.parse(JSON.stringify(Object.fromEntries(a))) || {};
  }
  return {};
}, Qr = { PENDING: "pending", AUTHORIZED: "authorized", PARTIALLY_AUTHORIZED: "partiallyAuthorized", RECEIVED: "received", PARTIALLY_RECEIVED: "partiallyReceived", APPROVED: "approved", PARTIALLY_APPROVED: "partiallyApproved", REJECTED: "rejected", PARTIALLY_REJECTED: "partiallyRejected", DENIED: "denied", PROCESSED_AND_CLOSED: "processedAndClosed", CLOSED: "closed" }, rr = (e, t) => ({ id: `${e.id}_${e.fieldType}_${t + 1}`, name: `${e.name}_${e.fieldType}_${t + 1}`, code: `${e.code}_${e.fieldType}_${t + 1}`, customUpperCode: `${e.customUpperCode}_${e.fieldType}_${t + 1}` }), Yr = (e) => {
  const t = {};
  return !e || typeof e != "object" || Object.keys(e).length === 0 || Object.keys(e).forEach((a) => {
    if (/_(\d+)$/.exec(a)) {
      const n = a == null ? void 0 : a.replace(/_\d+$/, "");
      t[n] = e[a];
    } else t[a] = e[a];
  }), t;
}, Xr = (e, t) => e.map((a) => ({ ...a, ...rr(a, t) })), Jr = (e, t) => e == null ? void 0 : e.flatMap((a) => Array.from({ length: t }, (n, o) => ({ ...a, ...rr(a, o) }))), Kr = (e) => {
  const t = [], a = [];
  return Object.entries(e).forEach(([n, o]) => {
    const i = n.lastIndexOf("_"), l = n.slice(0, i), d = n.slice(i + 1);
    d === pe.MULTISELECT || d === pe.SELECT ? t.push({ attributeCode: l, value: o }) : a.push({ attributeCode: l, value: o });
  }), { selectedCustomAttributes: t, enteredCustomAttributes: a };
}, Se = (e) => typeof e != "string" ? "" : Qr[e] ?? "", et = (e) => {
  var t;
  const a = [];
  if (e != null && e.current.length) for (const { current: n } of e.current) {
    if (!n) continue;
    const o = n.name.replace(/_\d+$/, ""), i = ((t = n == null ? void 0 : n.dataset) == null ? void 0 : t.quantity) ?? 1, l = er(n), d = Yr(l);
    a.push({ orderItemUid: o, quantityToReturn: +i, ...Kr(d) });
  }
  return a;
}, rt = (e) => {
  var t;
  return (t = e == null ? void 0 : e.items) != null && t.length ? [...(e == null ? void 0 : e.items) ?? []].sort((a, n) => {
    const o = a.quantityShipped - a.quantityReturnRequested === 0, i = n.quantityShipped - n.quantityReturnRequested === 0;
    return a.eligibleForReturn && !n.eligibleForReturn ? -1 : !a.eligibleForReturn && n.eligibleForReturn || o && !i ? 1 : !o && i ? -1 : 0;
  }) : [];
}, tt = { day: "2-digit", month: "2-digit", year: "numeric" }, nt = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: !0 }, _e = /* @__PURE__ */ new Map(), at = 16;
function it(e) {
  let t = _e.get(e);
  if (!t) {
    if (_e.size >= at) {
      const a = _e.keys().next().value;
      a !== void 0 && _e.delete(a);
    }
    t = new Intl.DateTimeFormat(e, nt), _e.set(e, t);
  }
  return t;
}
const tr = "datetime", ge = (e, t = "en-US", a = {}) => {
  const n = new Date(e);
  if (isNaN(n.getTime())) return "Invalid Date";
  if (a === tr) return it(t).format(n);
  const o = { ...tt, ...a };
  return new Intl.DateTimeFormat(t, o).format(n);
}, Re = (e) => {
  const t = (a) => {
    const n = Array.isArray(a.value) ? a.value.join(" ") : a.value;
    return a.label ? `${a.label}: ${n}` : n;
  };
  return (e ?? []).flat().map((a, n) => r("p", { children: t(a) }, `${a.name}${n}`));
}, ot = (e) => {
  var t, a;
  const n = e && e.length > 0, o = n ? ((t = e[0]) == null ? void 0 : t.name) ?? "" : "", i = n ? ((a = e[0]) == null ? void 0 : a.code) ?? "" : "";
  return { selectedPaymentMethod: o, selectedPaymentMethodCode: i, hasToDisplayPaymentMethod: n && o !== "" };
}, lt = ({ loading: e, order: t, withHeader: a = !0, title: n, paymentIconsMap: o = {}, normalizeAddress: i, translations: l, slots: d }) => {
  var g, u, m, p;
  const c = !!(t != null && t.returnNumber), s = !!(t != null && t.isVirtual), f = (g = t == null ? void 0 : t.returns) == null ? void 0 : g[0], v = re(() => ({ checkmo: Ur, card: Ar, ...o }), [o]);
  if (!t || e) return r(bt, {});
  const _ = (t == null ? void 0 : t.email) ?? "", b = (u = t == null ? void 0 : t.shipping) == null ? void 0 : u.code, y = (m = t == null ? void 0 : t.shipping) == null ? void 0 : m.amount, w = (p = t == null ? void 0 : t.shipping) == null ? void 0 : p.currency, T = t == null ? void 0 : t.payments, { selectedPaymentMethod: N, selectedPaymentMethodCode: P, hasToDisplayPaymentMethod: k } = ot(T), L = v[P], S = Re(i.shippingAddress) ?? [], I = Re(i.billingAddress) ?? [], x = h("div", { className: "order-customer-details-content__container-email", children: [r("div", { className: "order-customer-details-content__container-title", children: l == null ? void 0 : l.emailTitle }), r("p", { children: _ })] }), W = c ? h("div", { className: "order-customer-details-content__container-return-information", "data-testid": "returnDetailsBlock", children: [r("div", { className: "order-customer-details-content__container-title", children: l == null ? void 0 : l.returnInformationTitle }), r("div", { className: "order-customer-details-content__container-description", children: r(q, { "data-testid": "OrderReturnInformation", name: "OrderReturnInformation", slot: d == null ? void 0 : d.OrderReturnInformation, context: f, children: h(D, { children: [h("p", { children: [l.createdReturnAt, r("span", { children: ge((f == null ? void 0 : f.createdReturnAt) ?? "") })] }), h("p", { children: [l.returnStatusLabel, r(F, { id: `Order.CustomerDetails.returnStatus.${Se((f == null ? void 0 : f.returnStatus) ?? "")}` })] }), h("p", { children: [l.orderNumberLabel, r("span", { children: f == null ? void 0 : f.orderNumber })] })] }) }) })] }) : null, U = !s && S.length ? h("div", { className: "order-customer-details-content__container-shipping_address", children: [r("h3", { className: "order-customer-details-content__container-title", children: l.shippingAddressTitle }), r("div", { className: "order-customer-details-content__container-description", children: S })] }) : null, j = I.length ? h("div", { className: E(["order-customer-details-content__container-billing_address", ["order-customer-details-content__container-billing_address--fullwidth", !S.length || s]]), children: [r("h3", { className: "order-customer-details-content__container-title", children: l.billingAddressTitle }), r("div", { className: "order-customer-details-content__container-description", children: I })] }) : null, X = k ? h("div", { className: E(["order-customer-details-content__container-payment_methods", ["order-customer-details-content__container-payment_methods--fullwidth", !b]]), children: [r("div", { className: "order-customer-details-content__container-title", children: l == null ? void 0 : l.paymentMethodsTitle }), h("p", { "data-testid": "payment_methods_description", className: E([["order-customer-details-content__container-payment_methods--icon", !!L]]), children: [r(q, { "data-testid": "PaymentMethodIcon", name: "PaymentMethodIcon", slot: d == null ? void 0 : d.PaymentMethodIcon, context: { selectedPaymentMethodCode: P }, children: L ? r(J, { source: L }) : null }), N] })] }) : null, A = b ? h("div", { className: "order-customer-details-content__container-shipping_methods", children: [r("div", { className: "order-customer-details-content__container-title", children: l == null ? void 0 : l.shippingMethodsTitle }), y ? h("p", { "data-testid": "shipping_methods_price", children: [r(R, { amount: y, currency: w }), " ", b] }) : r("p", { "data-testid": "shipping_methods_placeholder", children: l == null ? void 0 : l.freeShipping })] }) : null, Y = c ? W : h(D, { children: [j, A, X] });
  return h(z, { "data-testid": "order-details", variant: "secondary", className: E(["order-customer-details-content"]), children: [a ? r(B, { title: n ?? (l == null ? void 0 : l.headerText) ?? "", level: 2 }) : null, h("div", { className: E(["order-customer-details-content__container", ["order-customer-details-content__container--no-margin", !!(S.length || I.length)]]), children: [x, U, Y] })] });
}, $e = ({ typeList: e, isEmpty: t, minifiedView: a, message: n }) => {
  const o = re(() => {
    switch (e) {
      case "orders":
        return { icon: Wr, text: r("p", { children: n }), className: "order-empty-list--empty-box" };
      default:
        return { icon: "", text: "", className: "" };
    }
  }, [e, n]);
  return !t || !e || !o.text ? null : r(br, { className: E(["order-empty-list", o.className, a ? "order-empty-list--minified" : ""]), message: o.text, icon: r(J, { source: o.icon }), "data-testid": "emptyList" });
}, dt = (e) => e.reduce((t, { code: a, required: n, defaultValue: o }) => (n && (t[a] = o), t), {}), nr = ({ fieldsConfig: e, onSubmit: t }) => {
  const { requiredFieldError: a } = H({ requiredFieldError: "Order.Form.notifications.requiredFieldError" }), n = Ue(null), [o, i] = O({}), [l, d] = O({});
  M(() => {
    if (i({}), !e || !e.length) return;
    const c = dt(e);
    i(c);
  }, [e == null ? void 0 : e.length]), M(() => () => {
    var c;
    i({}), (c = n.current) == null || c.reset();
  }, []);
  const g = Z((c, s) => {
    const f = e.find((v) => v.code === c);
    return f != null && f.required && !s ? a : "";
  }, [e, a]), u = Z((c) => {
    const { name: s, value: f, type: v, checked: _ } = c == null ? void 0 : c.target, b = v === "checkbox" ? _ : f;
    i((y) => ({ ...y, [s]: b }));
  }, []), m = Z((c) => {
    const { name: s, value: f, type: v, checked: _ } = c == null ? void 0 : c.target, b = v === "checkbox" ? _ : f;
    d((y) => ({ ...y, [s]: g(s, b) }));
  }, [g]), p = Z((c) => {
    c.preventDefault();
    let s = !0;
    const f = {};
    let v = null;
    for (const [_, b] of Object.entries(o)) {
      const y = g(_, b);
      y && (f[_] = y, s = !1, v || (v = _));
    }
    if (d(f), v && n.current) {
      const _ = n.current.elements.namedItem(v);
      _ == null || _.focus();
    }
    t == null || t(c, s);
  }, [o, g, t]);
  return { formData: o, errors: l, formRef: n, handleChange: u, handleBlur: m, handleSubmit: p };
}, st = { email: "email", lastname: "family-name" }, ar = Ge(({ loading: e, values: t, fields: a = [], errors: n, className: o = "", onChange: i, onBlur: l }) => {
  const d = `${o}__item`, g = Z((s, f, v) => {
    const _ = s.options.map((b) => ({ text: b.label, value: b.value }));
    return r(ve, { error: v, className: E([d, `${d}--${s.id}`, [`${d}--${s.id}-hidden`, s.is_hidden], s.className]), "data-testid": `${o}--${s.id}`, disabled: e, children: r(je, { name: s.id, floatingLabel: `${s.label} ${s.required ? "*" : ""}`, placeholder: s.label, "aria-label": s.label, options: _, onBlur: l, handleSelect: i, value: f || s.defaultValue }) }, s.id);
  }, [o, e, d, l, i]), u = Z((s, f, v) => {
    const _ = s.id === "email" ? r(Gr, {}) : void 0, b = st[s.id] ?? "";
    return r(ve, { error: v, className: E([d, `${d}--${s.id}`, [`${d}--${s.id}-hidden`, s == null ? void 0 : s.is_hidden], s.className]), "data-testid": `${o}--${s.id}`, disabled: e, children: r(hr, { "aria-label": s.label, "aria-required": s.required, autoComplete: b, icon: _, type: "text", name: s.id, value: f || s.defaultValue, placeholder: s.label, floatingLabel: `${s.label} ${s.required ? "*" : ""}`, onBlur: l, onChange: i }) }, s.id);
  }, [o, e, d, l, i]), m = Z((s, f, v) => r(ve, { error: v, className: E([d, `${d}--${s.id}`, [`${d}--${s.id}-hidden`, s.is_hidden], s.className]), "data-testid": `${o}--${s.id}`, disabled: e, children: r(vr, { type: "text", name: s.id, value: f || s.defaultValue, placeholder: s.label, floatingLabel: `${s.label} ${s.required ? "*" : ""}`, onBlur: l, onChange: i }) }, s.id), [o, e, d, l, i]), p = Z((s, f, v) => r(ve, { error: v, className: E([d, `${d}--${s.id}`, [`${d}--${s.id}-hidden`, s.is_hidden], s.className]), "data-testid": `${o}--${s.id}`, disabled: e, children: r(Be, { name: s.id, checked: f || s.defaultValue, placeholder: s.label, label: `${s.label} ${s.required ? "*" : ""}`, onBlur: l, onChange: i }) }, s.id), [o, e, d, l, i]), c = Z((s, f, v) => r(ve, { error: v, className: E([d, `${d}--${s.id}`, [`${d}--${s.id}-hidden`, s.is_hidden], s.className]), "data-testid": `${o}--${s.id}`, disabled: e, children: r(fr, { type: "text", name: s.id, value: f === void 0 ? s.defaultValue : f, label: `${s.label} ${s.required ? "*" : ""}`, onBlur: l, onChange: i }) }, s.id), [o, e, d, l, i]);
  return a.length ? r(D, { children: a.map((s) => {
    var f;
    const v = (n == null ? void 0 : n[s.id]) ?? "", _ = (t == null ? void 0 : t[s.id]) ?? "";
    switch (s.fieldType) {
      case "TEXT":
        return (f = s == null ? void 0 : s.options) != null && f.length ? g(s, _, v) : u(s, _, v);
      case "MULTILINE":
        return u(s, _, v);
      case "SELECT":
        return g(s, _, v);
      case "DATE":
        return m(s, _, v);
      case "BOOLEAN":
        return p(s, _, v);
      case "TEXTAREA":
        return c(s, _, v);
      default:
        return null;
    }
  }) }) : null;
}), ir = Ge(({ name: e, loading: t, children: a, className: n = "defaultForm", fieldsConfig: o, onSubmit: i }) => {
  const { formData: l, errors: d, formRef: g, handleChange: u, handleBlur: m, handleSubmit: p } = nr({ fieldsConfig: o, onSubmit: i });
  return h("form", { className: E(["order-form", n]), onSubmit: p, name: e, ref: g, children: [r(ar, { className: n, loading: t, fields: o, onChange: u, onBlur: m, errors: d, values: l }), a] });
}), Te = (e) => e && e.charAt(0).toLocaleUpperCase() + e.slice(1).toLocaleLowerCase(), ct = { paid: "positive", pending: "warning", canceled: "alert" }, ut = (e) => ct[e.toLowerCase()] ?? "neutral", xe = ({ label: e, value: t, testId: a }) => h("div", { className: "invoice-details-content__meta-row", "data-testid": a, children: [r("span", { className: "invoice-details-content__meta-label", children: e }), r("span", { className: "invoice-details-content__meta-value", children: t })] }), mt = ({ translations: e, order: t, invoice: a }) => {
  const n = (a == null ? void 0 : a.status) ?? "", o = ((t == null ? void 0 : t.payments) ?? []).map((i) => i.name).filter(Boolean).join(", ");
  return h(z, { variant: "secondary", className: "invoice-details-content__meta-card", "data-testid": "invoice-details-meta-card", children: [r(xe, { label: e.invoiceNumberLabel, value: a == null ? void 0 : a.number, testId: "invoice-details-number-row" }), r(xe, { label: e.orderNumber, value: t == null ? void 0 : t.number, testId: "invoice-details-order-number" }), r(xe, { label: e.orderDate, value: t != null && t.orderDate ? ge(t.orderDate) : "", testId: "invoice-details-order-date" }), r(xe, { label: e.paymentMethod, value: o, testId: "invoice-details-payment-method" }), h("div", { className: "invoice-details-content__meta-row", "data-testid": "invoice-details-status-row", children: [r("span", { className: "invoice-details-content__meta-label", children: e.status }), n ? r("span", { className: `invoice-details-content__status invoice-details-content__status--${ut(n)}`, "data-testid": "invoice-details-status", children: Te(n) }) : null] })] });
}, or = (e, t) => {
  if (!e) return [];
  const a = Object.fromEntries(Object.entries(e).map(([n, o]) => [n.toLowerCase(), o]));
  return t.flatMap(({ name: n, orderNumber: o, label: i }, l) => {
    const d = a[n.toLowerCase()];
    return d ? [{ name: n, orderNumber: o ?? l, value: d, label: i }] : [];
  });
}, pt = (e) => {
  var t, a, n;
  const o = [{ name: "name", orderNumber: 0 }, { name: "company", orderNumber: 1 }, ...(e.street ?? []).map((l, d) => ({ name: `street-${d}`, orderNumber: d + 2 })), { name: "city", orderNumber: (((t = e.street) == null ? void 0 : t.length) ?? 0) + 2 }, { name: "country", orderNumber: (((a = e.street) == null ? void 0 : a.length) ?? 0) + 3 }, { name: "telephone", orderNumber: (((n = e.street) == null ? void 0 : n.length) ?? 0) + 4 }], i = { name: [e.firstName, e.middleName, e.lastName].filter(Boolean).join(" "), company: e.company, ...(e.street ?? []).reduce((l, d, g) => ({ ...l, [`street-${g}`]: d }), {}), city: [[e.city, e.region].filter(Boolean).join(", "), e.postCode].filter(Boolean).join(" "), country: e.countryCode, telephone: e.telephone };
  return or(i, o);
}, He = ({ title: e, address: t, testId: a }) => t ? h(z, { variant: "secondary", className: "invoice-details-content__address", "data-testid": a, children: [r("h3", { className: "invoice-details-content__address-title", children: e }), r("address", { className: "invoice-details-content__address-lines", children: Re(pt(t)) })] }) : null, gt = ({ translations: e, billingAddress: t, shippingAddress: a }) => h("div", { className: "invoice-details-content__addresses", children: [r(He, { title: e.billingAddress, address: t, testId: "invoice-details-billing-address" }), r(He, { title: e.shippingAddress, address: a, testId: "invoice-details-shipping-address" })] }), ht = ({ translations: e, items: t }) => h("table", { className: "invoice-details-content__items-table", "data-testid": "invoice-details-items-table", children: [r("thead", { children: h("tr", { children: [r("th", { children: e.productName }), r("th", { children: e.sku }), r("th", { children: e.price }), r("th", { children: e.qtyInvoiced }), r("th", { children: e.itemTax }), r("th", { children: e.itemSubtotal })] }) }), r("tbody", { children: t.map((a) => h("tr", { "data-testid": `invoice-details-item-${a.id}`, children: [r("td", { className: "invoice-details-content__item-name", children: a.productName }), r("td", { className: "invoice-details-content__item-sku", children: a.productSku }), r("td", { children: r(R, { amount: a.productSalePrice.value, currency: a.productSalePrice.currency }) }), r("td", { children: a.quantityInvoiced }), r("td", { children: a.taxAmount != null ? r(R, { amount: a.taxAmount.value, currency: a.taxAmount.currency }) : "—" }), r("td", { children: a.rowTotal != null ? r(R, { amount: a.rowTotal.value, currency: a.rowTotal.currency, weight: "bold" }) : "—" })] }, a.id)) })] }), ye = ({ label: e, amount: t, currency: a, bold: n }) => h("div", { className: "invoice-details-content__totals-row", children: [r("span", { children: e }), r(R, { amount: t, currency: a, weight: n ? "bold" : "normal" })] }), vt = ({ translations: e, total: t }) => {
  var a, n, o, i, l, d, g, u, m;
  const p = (t.discounts ?? []).reduce((_, b) => {
    var y;
    return _ + (((y = b == null ? void 0 : b.amount) == null ? void 0 : y.value) ?? 0);
  }, 0), c = ((o = (n = (a = t.discounts) == null ? void 0 : a[0]) == null ? void 0 : n.amount) == null ? void 0 : o.currency) ?? t.grandTotal.currency, s = (t.taxes ?? []).reduce((_, b) => {
    var y;
    return _ + (((y = b == null ? void 0 : b.amount) == null ? void 0 : y.value) ?? 0);
  }, 0), f = ((d = (l = (i = t.taxes) == null ? void 0 : i[0]) == null ? void 0 : l.amount) == null ? void 0 : d.currency) ?? t.grandTotal.currency, v = ((g = t.taxes) == null ? void 0 : g.length) === 1 && t.taxes[0] ? `${e.tax} (${t.taxes[0].rate}%)` : e.tax;
  return h("div", { className: "invoice-details-content__totals", "data-testid": "invoice-details-totals", children: [r(ye, { label: e.subtotal, amount: t.subtotal.value, currency: t.subtotal.currency }), r(ye, { label: e.discounts, amount: p ? -Math.abs(p) : 0, currency: c }), r(ye, { label: v, amount: s, currency: f }), r(ye, { label: e.shipping, amount: ((u = t.shippingHandling) == null ? void 0 : u.totalAmount.value) ?? 0, currency: ((m = t.shippingHandling) == null ? void 0 : m.totalAmount.currency) ?? t.grandTotal.currency }), r(ye, { label: e.grandTotal, amount: t.grandTotal.value, currency: t.grandTotal.currency, bold: !0 })] });
}, ft = ({ className: e, order: t, invoice: a, routeInvoicesList: n, onDownloadPdf: o }) => {
  const i = H({ backToOrderDetails: "Order.InvoiceDetails.backToOrderDetails", downloadPdf: "Order.InvoiceDetails.downloadPdf", invoiceNumberLabel: "Order.InvoiceDetails.invoiceNumberLabel", orderNumber: "Order.InvoiceDetails.orderNumber", orderDate: "Order.InvoiceDetails.orderDate", paymentMethod: "Order.InvoiceDetails.paymentMethod", status: "Order.InvoiceDetails.status", billingAddress: "Order.InvoiceDetails.billingAddress", shippingAddress: "Order.InvoiceDetails.shippingAddress", productName: "Order.InvoiceDetails.items.productName", sku: "Order.InvoiceDetails.items.sku", price: "Order.InvoiceDetails.items.price", qtyInvoiced: "Order.InvoiceDetails.items.qtyInvoiced", itemTax: "Order.InvoiceDetails.items.tax", itemSubtotal: "Order.InvoiceDetails.items.subtotal", subtotal: "Order.InvoiceDetails.totals.subtotal", discounts: "Order.InvoiceDetails.totals.discounts", tax: "Order.InvoiceDetails.totals.tax", shipping: "Order.InvoiceDetails.totals.shipping", grandTotal: "Order.InvoiceDetails.totals.grandTotal" });
  return a ? h("div", { className: E(["invoice-details-content", e]), "data-testid": "invoice-details-card", children: [n ? r("a", { className: "invoice-details-content__back-link", href: n(), "data-testid": "invoice-details-back-link", children: i.backToOrderDetails }) : null, h("div", { className: "invoice-details-content__title-row", children: [h("div", { className: "invoice-details-content__title", children: [r("span", { className: "invoice-details-content__title-icon", children: r(J, { source: qr, size: "16" }) }), r("h1", { className: "invoice-details-content__invoice-number", "data-testid": "invoice-details-number", children: a.number })] }), r(Q, { variant: "secondary", size: "medium", "data-testid": "invoice-details-download-pdf", onClick: o, children: i.downloadPdf })] }), r(mt, { translations: i, order: t, invoice: a }), r(gt, { translations: i, billingAddress: t == null ? void 0 : t.billingAddress, shippingAddress: t == null ? void 0 : t.shippingAddress }), h(z, { variant: "secondary", className: "invoice-details-content__items-card", children: [r(ht, { translations: i, items: a.items }), r(vt, { translations: i, total: a.total })] })] }) : null;
}, _t = ({ className: e, orderData: t, slots: a, routeCreateReturn: n, routeOnSuccess: o, onError: i }) => {
  const l = H({ cancel: "Order.OrderStatusContent.actions.cancel", createReturn: "Order.OrderStatusContent.actions.createReturn", createAnotherReturn: "Order.OrderStatusContent.actions.createAnotherReturn", reorder: "Order.OrderStatusContent.actions.reorder" }), d = re(() => {
    const g = t == null ? void 0 : t.availableActions, u = !!(g != null && g.length), m = !!(t != null && t.returnNumber), p = () => {
      ne(n, {}, t);
    };
    return r(D, { children: a != null && a.OrderActions ? r(q, { "data-testid": "OrderActionsSlot", name: "OrderCanceledActions", slot: a == null ? void 0 : a.OrderActions, context: t }) : r("div", { "data-testid": "availableActionsList", className: E(["order-order-actions__wrapper", ["order-order-actions__wrapper--empty", !u]]), children: g == null ? void 0 : g.map((c) => {
      switch (c) {
        case Oe.CANCEL:
          return r(D, { children: m ? null : r(yt, { orderRef: (t == null ? void 0 : t.token) || (t == null ? void 0 : t.id) || "" }) });
        case Oe.RETURN:
          return r(Q, { variant: "secondary", onClick: p, children: m ? l.createAnotherReturn : l.createReturn });
        case Oe.REORDER:
          return r(D, { children: m ? null : r(Ht, { orderData: t, onError: i, routeOnSuccess: o, children: l.reorder }) });
      }
    }) }) });
  }, [i, t, o, n, a, l]);
  return r("div", { className: E(["order-order-actions", e]), children: d });
}, ie = () => {
  const [e, t] = O(null);
  return M(() => {
    var a;
    const n = "orderStoreConfigPromise", o = sessionStorage.getItem("orderStoreConfig");
    if (o) {
      const i = JSON.parse(o);
      t(i);
    } else {
      const i = window;
      i[n] || (i[n] = Nr().then((l) => (l && sessionStorage.setItem("orderStoreConfig", JSON.stringify(l)), l))), (a = i[n]) == null || a.then((l) => {
        l && t(l);
      });
    }
  }, []), e;
}, lr = ({ orderRef: e, pickerProps: t, submitButtonProps: a, cancelReasons: n }) => {
  const o = H({ ErrorHeading: "Order.OrderCancelForm.errorHeading", ErrorDescription: "Order.OrderCancelForm.errorDescription", orderCancellationLabel: "Order.OrderCancelForm.label" }), [i, l] = O(0), [d, g] = O(!1), [u, m] = O(!1);
  G.on("authenticated", (c) => {
    c && m(!0);
  }, { eager: !0 });
  const p = (c) => {
    c.preventDefault();
    const s = Number(c.target.value);
    l(s);
  };
  return h(ir, { onSubmit: async (c) => (c.preventDefault(), (e.length > 20 ? Or : wr)(e, n[i].text, (s) => {
    u || (s.status = "guest order cancellation requested"), G.emit("order/data", s);
  }, () => {
    g(!0);
  })), "data-testid": "order-order-cancel-reasons-form__text", children: [d && r(ue, { heading: o.ErrorHeading, description: o.ErrorDescription }), r("div", { className: "order-order-cancel-reasons-form__text", children: r(F, { id: "Order.OrderCancelForm.description" }) }), r(je, { name: "cancellationReasons", floatingLabel: o.orderCancellationLabel, defaultOption: n[0], variant: "primary", options: n, value: String(i), handleSelect: p, required: !0, "data-testid": "order-cancellation-reasons-selector", ...t }), r("div", { className: "order-order-cancel-reasons-form__button-container", children: r(Q, { variant: "primary", "data-testid": "order-cancel-submit-button", ...a, children: r(F, { id: "Order.OrderCancelForm.button" }) }) })] });
};
lr.displayName = "OrderCancelForm";
const yt = ({ orderRef: e }) => {
  const [t, a] = O(!1), n = () => {
    a(!0);
  }, o = () => {
    a(!1);
  }, i = ie(), l = (i == null ? void 0 : i.orderCancellationReasons) ?? [], d = (g) => g.map((u, m) => ({ text: u == null ? void 0 : u.description, value: m.toString() }));
  return G.on("order/data", (g) => {
    const u = String((g == null ? void 0 : g.status) ?? "").toLocaleLowerCase();
    (u === "guest order cancellation requested" || u === "canceled") && o();
  }), h(D, { children: [r(Q, { variant: "secondary", onClick: n, "data-testid": "cancel-button", children: r(F, { id: "Order.OrderStatusContent.actions.cancel" }) }), t && r(Cr, { centered: !0, size: "medium", onClose: o, className: "order-order-cancel__modal", title: r("h2", { className: "order-order-cancel__title", children: r(F, { id: "Order.OrderCancelForm.title" }) }), "data-testid": "order-cancellation-reasons-modal", children: r(lr, { orderRef: e, cancelReasons: d(l) }) })] });
}, ae = ({ testId: e, withCard: t = !0 }) => {
  const a = h(be, { "data-testid": e ?? "skeletonLoader", children: [r($, { variant: "heading", size: "xlarge", fullWidth: !1, lines: 1 }), r($, { variant: "heading", size: "xlarge", fullWidth: !0, lines: 1 }), r($, { variant: "heading", size: "xlarge", fullWidth: !0, lines: 1 })] });
  return t ? a : r(z, { variant: "secondary", className: E(["order-order-loaders", "order-order-loaders--card-loader"]), children: a });
}, bt = (e) => r(z, { variant: "secondary", ...e, children: h(be, { "data-testid": "order-details-skeleton", children: [r($, { variant: "heading", size: "medium", fullWidth: !0 }), r($, { size: "medium" }), r($, { variant: "empty", size: "medium" }), r($, { size: "xlarge" }), r($, { size: "xlarge" }), r($, { size: "xlarge" }), r($, { size: "xlarge" })] }) }), dr = () => h(be, { "data-testid": "order-product-list-skeleton", style: { gridTemplateColumns: "1fr" }, children: [r($, { variant: "heading", fullWidth: !0, size: "medium" }), r(fe, {}), r(fe, {}), r(fe, {}), r(fe, {}), r(fe, {})] }), sr = () => h(be, { "data-testid": "order-cost-summary-content-skeleton", className: "order-cost-summary-content", children: [r($, { variant: "heading", size: "small" }), r($, { variant: "empty", size: "small" }), r($, { variant: "empty", size: "small" }), r($, { variant: "empty", size: "small" }), r($, { variant: "heading", size: "small", fullWidth: !0, lines: 3 })] }), Ct = () => h(be, { "data-testid": "order-header-skeleton", className: "order-header", children: [r($, { variant: "empty", size: "xlarge", fullWidth: !0 }), r($, { variant: "empty", size: "medium" }), r($, { variant: "empty", size: "medium" }), r($, { variant: "empty", size: "medium" }), r($, { variant: "empty", size: "medium" }), r($, { variant: "empty", size: "medium" }), r($, { size: "small", fullWidth: !0 }), r($, { variant: "heading", size: "xsmall", fullWidth: !0 })] }), Ze = ({ salesGiftWrapping: e, giftWrappingPrice: t, giftWrappingPriceInclTax: a, giftWrappingTitle: n, giftWrappingExclTaxText: o, giftWrappingInclTaxText: i }) => {
  const l = e == null ? void 0 : e.taxIncluded, d = e == null ? void 0 : e.taxExcluded, g = l && !d, u = d && !l, m = d && l;
  if (t.value === 0 || a.value === 0) return null;
  const p = g ? h(D, { children: [h("div", { className: "order-cost-summary-content__description--header", children: [r("span", { children: i }), r(R, { className: "order-cost-summary-content__description--normal-price", weight: "normal", currency: a.currency, amount: a.value })] }), r("div", { className: "order-cost-summary-content__description--subheader", children: r("span", { children: i }) })] }) : null, c = u ? h("div", { className: "order-cost-summary-content__description--header", children: [r("span", { children: n }), r("span", { children: r(R, { weight: "normal", currency: t.currency, amount: t.value }) })] }) : null, s = m ? h(D, { children: [h("div", { className: "order-cost-summary-content__description--header", children: [r("span", { children: n }), r("span", { children: r(R, { className: "order-cost-summary-content__description--normal-price", weight: "normal", currency: a.currency, amount: a.value }) })] }), h("div", { className: "order-cost-summary-content__description--subheader", children: [r(R, { currency: t.currency, amount: t.value, size: "small", weight: "bold" }), " ", r("span", { children: o })] })] }) : null;
  return h("div", { className: "order-cost-summary-content__description order-cost-summary-content__description--gift-wrapping", children: [p, c, s] });
}, xt = ({ translations: e, order: t, salesPrintedCard: a }) => {
  const n = t == null ? void 0 : t.totalGiftOptions, { printedCard: o, printedCardInclTax: i } = n, l = a == null ? void 0 : a.taxIncluded, d = a == null ? void 0 : a.taxExcluded;
  if (o.value === 0 || i.value === 0) return null;
  const g = l && !d ? h(D, { children: [h("div", { className: "order-cost-summary-content__description--header", children: [r("span", { children: e.printedCardTitle }), r("span", { children: r(R, { className: "order-cost-summary-content__description--normal-price", weight: "normal", currency: i.currency, amount: i.value }) })] }), r("div", { className: "order-cost-summary-content__description--subheader", children: r("span", { children: r("span", { children: e.printedCardTitleInclTax }) }) })] }) : null, u = d && !l ? h("div", { className: "order-cost-summary-content__description--header", children: [r("span", { children: e.printedCardTitle }), r("span", { children: r(R, { weight: "normal", currency: o.currency, amount: o.value }) })] }) : null, m = d && l ? h(D, { children: [h("div", { className: "order-cost-summary-content__description--header", children: [r("span", { children: e.printedCardTitle }), r("span", { children: r(R, { className: "order-cost-summary-content__description--normal-price", weight: "normal", currency: i.currency, amount: i.value }) })] }), h("div", { className: "order-cost-summary-content__description--subheader", children: [r(R, { currency: o.currency, amount: o.value, size: "small", weight: "bold" }), " ", r("span", { children: e.printedCardTitleExclTax })] })] }) : null;
  return h("div", { className: "order-cost-summary-content__description order-cost-summary-content__description--printed-card", children: [g, u, m] });
}, Ot = ({ translations: e, order: t, subtotalInclTax: a, subtotalExclTax: n, shoppingOrdersDisplaySubtotal: o }) => {
  var i, l, d, g;
  const u = o.taxIncluded, m = o.taxExcluded, p = u && !m ? h(D, { children: [h("div", { className: "order-cost-summary-content__description--header", children: [r("span", { children: e.subtotal }), r(R, { className: "order-cost-summary-content__description--normal-price", weight: "normal", currency: (i = t == null ? void 0 : t.subtotalInclTax) == null ? void 0 : i.currency, amount: a })] }), r("div", { className: "order-cost-summary-content__description--subheader", children: r("span", { children: e.incl }) })] }) : null, c = m && !u ? h("div", { className: "order-cost-summary-content__description--header", children: [r("span", { children: e.subtotal }), r(R, { className: "order-cost-summary-content__description--normal-price", weight: "normal", currency: (l = t == null ? void 0 : t.subtotalExclTax) == null ? void 0 : l.currency, amount: n })] }) : null, s = m && u ? h(D, { children: [h("div", { className: "order-cost-summary-content__description--header", children: [r("span", { children: e.subtotal }), r(R, { className: "order-cost-summary-content__description--normal-price", weight: "normal", currency: (d = t == null ? void 0 : t.subtotalInclTax) == null ? void 0 : d.currency, amount: a })] }), h("div", { className: "order-cost-summary-content__description--subheader", children: [r(R, { currency: (g = t == null ? void 0 : t.subtotalExclTax) == null ? void 0 : g.currency, amount: n, size: "small", weight: "bold" }), " ", r("span", { children: e.excl })] })] }) : null;
  return h("div", { className: "order-cost-summary-content__description order-cost-summary-content__description--subtotal", children: [p, c, s] });
}, wt = ({ translations: e, shoppingOrdersDisplayShipping: t, order: a, totalShipping: n }) => {
  var o, i, l, d;
  return a != null && a.isVirtual ? null : h("div", { className: "order-cost-summary-content__description order-cost-summary-content__description--shipping", children: [h("div", { className: "order-cost-summary-content__description--header", children: [r("span", { children: e.shipping }), (o = a == null ? void 0 : a.totalShipping) != null && o.value ? r(R, { weight: "normal", currency: (i = a == null ? void 0 : a.totalShipping) == null ? void 0 : i.currency, amount: n }) : r("span", { children: e.freeShipping })] }), h("div", { className: "order-cost-summary-content__description--subheader", children: [t.taxIncluded && t.taxExcluded ? h(D, { children: [r(R, { weight: "normal", currency: (l = a == null ? void 0 : a.totalShipping) == null ? void 0 : l.currency, amount: (d = a == null ? void 0 : a.totalShipping) == null ? void 0 : d.value, size: "small" }), h("span", { children: [" ", e.excl] })] }) : null, t.taxIncluded && !t.taxExcluded ? r("span", { children: e.incl }) : null] })] });
}, Nt = ({ translations: e, order: t }) => {
  var a, n;
  const o = t == null ? void 0 : t.coupons, i = t == null ? void 0 : t.discounts, l = (i == null ? void 0 : i.reduce((d, g) => d + (g.amount.value ?? 0), 0)) || 0;
  return !((a = t == null ? void 0 : t.discounts) != null && a.length) && l === 0 ? null : h("div", { className: "order-cost-summary-content__description order-cost-summary-content__description--discount", children: [h("div", { className: "order-cost-summary-content__description--header", children: [r("span", { children: e.discount }), r("span", { children: r(R, { weight: "normal", sale: !0, currency: (n = i[0]) == null ? void 0 : n.amount.currency, amount: -l }) })] }), o.map((d) => r("div", { className: "order-cost-summary-content__description--subheader", children: h("span", { children: [r(J, { source: Zr, size: "16", className: "order-cost-summary-content__description--coupon-icon" }), r("span", { children: d.code })] }) }, d.code))] });
}, Lt = ({ translations: e, shoppingOrdersDisplaySubtotal: t, order: a }) => {
  var n, o, i, l, d;
  const g = ((n = a == null ? void 0 : a.grandTotal) == null ? void 0 : n.value) === 0;
  return h("div", { className: "order-cost-summary-content__description order-cost-summary-content__description--total", children: [h("div", { className: "order-cost-summary-content__description--header", children: [r("span", { children: e.total }), g ? r("span", { className: "order-cost-summary-content__description--total-free", children: e.totalFree }) : r(R, { currency: (o = a == null ? void 0 : a.grandTotal) == null ? void 0 : o.currency, amount: (i = a == null ? void 0 : a.grandTotal) == null ? void 0 : i.value, weight: "bold", size: "medium" })] }), t.taxExcluded && t.taxIncluded && !g ? h("div", { className: "order-cost-summary-content__description--subheader", children: [r("span", { children: e.totalExcludingTaxes }), r(R, { currency: (l = a == null ? void 0 : a.grandTotalExclTax) == null ? void 0 : l.currency, amount: (d = a == null ? void 0 : a.grandTotalExclTax) == null ? void 0 : d.value, weight: "normal", size: "small" })] }) : null] });
}, St = ({ translations: e, renderTaxAccordion: t, totalAccordionTaxValue: a, order: n }) => {
  var o, i, l;
  const [d, g] = O(!1);
  return t ? r(Ne, { "data-testid": "tax-accordionTaxes", className: "order-cost-summary-content__accordion", iconOpen: $r, iconClose: Hr, children: h(Le, { onStateChange: g, title: e.accordionTitle, secondaryText: r(D, { children: d ? null : r(R, { weight: "normal", amount: a, currency: (i = n == null ? void 0 : n.totalTax) == null ? void 0 : i.currency }) }), renderContentWhenClosed: !1, children: [(l = n == null ? void 0 : n.taxes) == null ? void 0 : l.map((u, m) => {
    var p, c, s;
    return h("div", { className: "order-cost-summary-content__accordion-row", children: [r("p", { children: u == null ? void 0 : u.title }), r("p", { children: r(R, { weight: "normal", amount: (p = u == null ? void 0 : u.amount) == null ? void 0 : p.value, currency: (c = u == null ? void 0 : u.amount) == null ? void 0 : c.currency }) })] }, `${(s = u == null ? void 0 : u.amount) == null ? void 0 : s.value}${m}`);
  }), h("div", { className: "order-cost-summary-content__accordion-row order-cost-summary-content__accordion-total", children: [r("p", { children: e.accordionTotalTax }), r("p", { children: r(R, { weight: "normal", amount: a, currency: n.totalTax.currency, size: "medium" }) })] })] }) }) : r("div", { className: "order-cost-summary-content__description order-cost-summary-content__description--tax", children: h("div", { className: "order-cost-summary-content__description--header", children: [r("span", { children: e.tax }), r(R, { currency: (o = n == null ? void 0 : n.totalTax) == null ? void 0 : o.currency, amount: n == null ? void 0 : n.totalTax.value, weight: "normal", size: "small" })] }) });
}, Tt = ({ totalGiftCardValue: e, totalGiftCardCurrency: t, order: a }) => {
  const n = a == null ? void 0 : a.appliedGiftCards;
  return e ? h("div", { className: "order-cost-summary-content__description order-cost-summary-content__description--discount", children: [h("div", { className: "order-cost-summary-content__description--header", children: [r("span", { children: r(F, { id: "Order.OrderCostSummary.appliedGiftCards.label", plural: n == null ? void 0 : n.length, fields: { count: n == null ? void 0 : n.length } }) }), r("span", { children: r(R, { weight: "normal", sale: !0, currency: t, amount: -e }) })] }), n.map((o) => r("div", { className: "order-cost-summary-content__description--subheader", children: h("span", { children: [r(J, { source: zr, size: "16", className: "order-cost-summary-content__description--giftcard-icon" }), r("span", { children: o.code })] }) }, o.code))] }) : null;
}, Ie = { taxIncluded: !1, taxExcluded: !1 }, Et = ({ translations: e, loading: t, storeConfig: a, order: n, withHeader: o = !0 }) => {
  var i, l, d, g, u, m, p;
  if (t || !n) return r(sr, {});
  const c = ((i = n == null ? void 0 : n.totalGiftCard) == null ? void 0 : i.value) ?? 0, s = ((l = n.totalGiftCard) == null ? void 0 : l.currency) ?? "", f = ((d = n.subtotalInclTax) == null ? void 0 : d.value) ?? 0, v = ((g = n.subtotalExclTax) == null ? void 0 : g.value) ?? 0, _ = ((u = n.totalShipping) == null ? void 0 : u.value) ?? 0, b = !!((m = n == null ? void 0 : n.taxes) != null && m.length) && !!(a != null && a.shoppingOrdersDisplayFullSummary), y = b ? (p = n == null ? void 0 : n.taxes) == null ? void 0 : p.reduce((w, T) => {
    var N;
    return +((N = T == null ? void 0 : T.amount) == null ? void 0 : N.value) + w;
  }, 0) : 0;
  return h(z, { variant: "secondary", className: E(["order-cost-summary-content"]), children: [o ? r(B, { title: e.headerText, level: 2 }) : null, h("div", { className: "order-cost-summary-content__wrapper", children: [r(Ot, { translations: e, order: n, subtotalInclTax: f, subtotalExclTax: v, shoppingOrdersDisplaySubtotal: (a == null ? void 0 : a.shoppingOrdersDisplaySubtotal) ?? Ie }), r(wt, { translations: e, order: n, totalShipping: _, shoppingOrdersDisplayShipping: (a == null ? void 0 : a.shoppingOrdersDisplayShipping) ?? Ie }), r(xt, { order: n, translations: e, salesPrintedCard: a == null ? void 0 : a.salesPrintedCard }), r(Ze, { salesGiftWrapping: a == null ? void 0 : a.salesGiftWrapping, giftWrappingPrice: n.totalGiftOptions.giftWrappingForItems, giftWrappingPriceInclTax: n.totalGiftOptions.giftWrappingForItemsInclTax, giftWrappingTitle: e.itemGiftWrappingTitle, giftWrappingExclTaxText: e.itemGiftWrappingExclTax, giftWrappingInclTaxText: e.itemGiftWrappingInclTax }), r(Ze, { salesGiftWrapping: a == null ? void 0 : a.salesGiftWrapping, giftWrappingPrice: n.totalGiftOptions.giftWrappingForOrder, giftWrappingPriceInclTax: n.totalGiftOptions.giftWrappingForOrderInclTax, giftWrappingTitle: e.orderGiftWrappingTitle, giftWrappingExclTaxText: e.orderGiftWrappingExclTax, giftWrappingInclTaxText: e.orderGiftWrappingInclTax }), r(Nt, { translations: e, order: n }), r(Tt, { order: n, totalGiftCardValue: c, totalGiftCardCurrency: s }), r(St, { order: n, translations: e, renderTaxAccordion: b, totalAccordionTaxValue: y }), r(Lt, { translations: e, shoppingOrdersDisplaySubtotal: (a == null ? void 0 : a.shoppingOrdersDisplaySubtotal) ?? Ie, order: n })] })] });
}, kt = ({ customerName: e, orderNumber: t, onSignUpClick: a }) => {
  const n = H({ title: r(F, { id: "Order.OrderHeader.title", fields: { name: e } }), defaultTitle: "Order.OrderHeader.defaultTitle", order: r(F, { id: "Order.OrderHeader.order", fields: { order: t } }), createAccountMessage: "Order.OrderHeader.CreateAccount.message", createAccountButton: "Order.OrderHeader.CreateAccount.button" });
  return h("div", { "data-testid": "order-header", className: "order-header order-header__card", children: [r(J, { source: Fr, size: "64", className: "order-header__icon" }), r(B, { className: "order-header__title", title: n.title, size: "large", divider: !1, children: e ? n.title : n.defaultTitle }), r("p", { className: "order-header__order", children: n.order }), a && h("div", { className: "order-header-create-account", children: [r("p", { className: "order-header-create-account__message", children: n.createAccountMessage }), r(Q, { "data-testid": "create-account-button", className: "order-header-create-account__button", size: "medium", variant: "secondary", type: "submit", onClick: a, children: n.createAccountButton })] })] });
}, It = F, Dt = ({ className: e, invoices: t = [], loading: a, error: n, orderNumber: o = "", routeInvoiceDetails: i, ...l }) => {
  const d = H({ emptyState: "Order.OrderInvoices.emptyState", title: "Order.OrderInvoices.title", invoiceNumber: "Order.OrderInvoices.invoiceNumber", loadErrorHeading: "Order.OrderInvoices.loadError.heading", loadErrorDescription: "Order.OrderInvoices.loadError.description" }), g = a ? r(ae, { withCard: !1 }) : n ? r(ue, { heading: d.loadErrorHeading ?? "Unable to load invoices", description: d.loadErrorDescription ?? "Please try again later." }) : t.length === 0 ? r("ul", { className: E(["order-order-invoices", "order-order-invoices--empty"]), "data-testid": "order-invoices-list", children: r("li", { className: "order-order-invoices__empty-state", "data-testid": "order-invoices-empty-state", children: d.emptyState }) }) : r("ul", { className: "order-order-invoices", "data-testid": "order-invoices-list", children: t.map((u, m) => {
    var p;
    return h("li", { className: "order-order-invoices__item", "data-testid": `order-invoice-${m}`, children: [h("div", { className: "order-order-invoices__header", children: [i ? h("a", { className: "order-order-invoices__number", href: i(u, o), "data-testid": `order-invoice-number-${m}`, children: [d.invoiceNumber, " ", u.number] }) : h("span", { className: "order-order-invoices__number", "data-testid": `order-invoice-number-${m}`, children: [d.invoiceNumber, " ", u.number] }), r(R, { currency: u.total.grandTotal.currency, amount: u.total.grandTotal.value, weight: "bold", size: "small" })] }), (p = u.items) != null && p.length ? (() => {
      const c = u.items.reduce((s, f) => s + f.quantityInvoiced, 0);
      return r("p", { className: "order-order-invoices__items-count", "data-testid": `order-invoice-items-${m}`, children: r(It, { id: "Order.OrderInvoices.itemsCount", plural: c, fields: { count: c } }) });
    })() : null] }, u.id);
  }) });
  return h(z, { ...l, variant: "secondary", className: E(["order-order-invoices-card", e]), "data-testid": "order-invoices-card", children: [r(B, { title: d.title ?? "Invoices", level: 2 }), r("div", { className: "order-order-invoices-card__container", children: g })] });
}, Rt = (e) => {
  const t = (e == null ? void 0 : e.items) ?? [], a = t.filter((i) => (i == null ? void 0 : i.eligibleForReturn) && (i == null ? void 0 : i.quantityReturnRequested)).map((i) => ({ ...i, totalQuantity: i.quantityReturnRequested })), n = new Map(a.map((i) => [i.id, i])), o = t.map((i) => {
    const l = n.get(i == null ? void 0 : i.id);
    if (l) {
      const d = i.totalQuantity - l.quantityReturnRequested;
      return d === 0 ? null : { ...i, totalQuantity: d };
    }
    return i;
  }).filter((i) => i !== null);
  return { returnedList: a, canceledItems: o == null ? void 0 : o.filter((i) => i.quantityCanceled), nonCanceledItems: o == null ? void 0 : o.filter((i) => !i.quantityCanceled) };
}, Mt = ({ slots: e, placeholderImage: t, loading: a, taxConfig: n, order: o = null, withHeader: i = !0, showConfigurableOptions: l, routeProductDetails: d }) => {
  const g = !!(o != null && o.returnNumber), u = H({ cancelled: "Order.OrderProductListContent.cancelledTitle", allOrders: "Order.OrderProductListContent.allOrdersTitle", returned: "Order.OrderProductListContent.returnedTitle", refunded: "Order.OrderProductListContent.refundedTitle", sender: "Order.OrderProductListContent.GiftCard.sender", recipient: "Order.OrderProductListContent.GiftCard.recipient", message: "Order.OrderProductListContent.GiftCard.message", outOfStock: "Order.OrderProductListContent.stockStatus.outOfStock", downloadableCount: "Order.OrderProductListContent.downloadableCount" }), m = re(() => {
    var p, c;
    if (!o) return [];
    if (!g) {
      const { returnedList: s, canceledItems: f, nonCanceledItems: v } = Rt(o);
      return [{ type: "returned", list: s, title: u.returned }, { type: "cancelled", list: f, title: u.cancelled }, { type: "allItems", list: v, title: u.allOrders }].filter((_) => {
        var b;
        return ((b = _ == null ? void 0 : _.list) == null ? void 0 : b.length) > 0;
      });
    }
    return [{ type: "returned", list: ((c = (p = o.returns.find((s) => s.returnNumber === (o == null ? void 0 : o.returnNumber))) == null ? void 0 : p.items) == null ? void 0 : c.map((s) => ({ ...s, totalQuantity: s.requestQuantity }))) ?? [], title: u.returned }];
  }, [o, g, u]);
  return o ? m.every((p) => p.list.length === 0) ? null : r(z, { variant: "secondary", className: "order-order-product-list-content", children: m.map((p, c) => {
    var s;
    const f = p.list.filter((v) => v !== null).reduce((v, { totalQuantity: _ }) => _ + v, 0);
    return h(Ye, { children: [i ? r(B, { title: `${p.title} (${f})`, level: 2 }) : null, r("ul", { className: "order-order-product-list-content__items", children: (s = p.list) == null ? void 0 : s.filter((v) => v !== null).map((v) => r("li", { "data-testid": "order-product-list-content-item", children: r(ur, { slots: e, placeholderImage: t, loading: a, product: v, itemType: p.type, taxConfig: n, translations: u, showConfigurableOptions: l, routeProductDetails: d }) }, v.id)) })] }, c);
  }) }) : r(dr, {});
};
function Pt(e) {
  var t, a, n, o, i, l, d, g, u, m;
  const p = ((t = e.regularPrice) == null ? void 0 : t.value) ?? 0;
  if (p > 0) return { value: p, currency: ((a = e.regularPrice) == null ? void 0 : a.currency) ?? ((n = e.price) == null ? void 0 : n.currency) ?? "USD" };
  const c = ((i = (o = e.itemPrices) == null ? void 0 : o.originalPrice) == null ? void 0 : i.value) ?? 0;
  return c > 0 ? { value: c, currency: ((d = (l = e.itemPrices) == null ? void 0 : l.originalPrice) == null ? void 0 : d.currency) ?? ((g = e.price) == null ? void 0 : g.currency) ?? "USD" } : { value: 0, currency: ((u = e.price) == null ? void 0 : u.currency) ?? ((m = e.regularPrice) == null ? void 0 : m.currency) ?? "USD" };
}
function cr(e) {
  var t, a, n;
  const o = ((t = e.price) == null ? void 0 : t.value) ?? 0;
  return o > 0 ? { value: o, currency: ((a = e.price) == null ? void 0 : a.currency) ?? ((n = e.regularPrice) == null ? void 0 : n.currency) ?? "USD" } : Pt(e);
}
function At(e) {
  const t = cr(e), a = e.totalQuantity ?? 1;
  return { value: t.value * a, currency: t.currency };
}
const ur = ({ slots: e, placeholderImage: t = "", loading: a, product: n, itemType: o, taxConfig: i, translations: l, disabledIncrementer: d, onQuantity: g, showConfigurableOptions: u, routeProductDetails: m }) => {
  var p, c, s, f, v, _;
  const { taxExcluded: b, taxIncluded: y } = i, w = Z((V, K, ee) => r(R, { amount: V, currency: K, weight: "normal", ...ee }), []), T = Z((V) => {
    var K, ee;
    const me = (V == null ? void 0 : V.productName) ?? "", Pe = { title: me, src: ((ee = (K = V == null ? void 0 : V.product) == null ? void 0 : K.thumbnail) == null ? void 0 : ee.url) ?? t, alt: me, width: 90, height: 120, loading: "lazy" };
    return r(q, { slotTag: "span", contentTag: "span", "data-testid": `cartSummaryItemImage-${V.id}`, name: "CartSummaryItemImage", slot: e == null ? void 0 : e.CartSummaryItemImage, context: { data: V, defaultImageProps: Pe }, children: r(he, { ...Pe }) });
  }, [t, e == null ? void 0 : e.CartSummaryItemImage]);
  if (!n) return r(sr, {});
  let N = {};
  const P = o === "cancelled", k = (c = (p = n == null ? void 0 : n.product) == null ? void 0 : p.stockStatus) == null ? void 0 : c.includes("IN_STOCK"), L = n == null ? void 0 : n.giftCard, S = n.totalQuantity > 1 ? { quantity: n.totalQuantity } : {}, I = n.discounted, { includeAndExcludeTax: x, includeTax: W, excludeTax: U } = n.taxCalculations, j = n == null ? void 0 : n.totalQuantity, X = { ...(n == null ? void 0 : n.configurableOptions) || {}, ...(n == null ? void 0 : n.bundleOptions) || {}, ...L != null && L.senderName ? { [l.sender]: L == null ? void 0 : L.senderName } : {}, ...L != null && L.senderEmail ? { [l.sender]: L == null ? void 0 : L.senderEmail } : {}, ...L != null && L.senderName ? { [l.sender]: L == null ? void 0 : L.senderName } : {}, ...L != null && L.recipientEmail ? { [l.recipient]: L == null ? void 0 : L.recipientEmail } : {}, ...L != null && L.message ? { [l.message]: L == null ? void 0 : L.message } : {}, ...n != null && n.downloadableLinks ? { [`${(s = n == null ? void 0 : n.downloadableLinks) == null ? void 0 : s.count} ${l.downloadableCount}`]: (f = n == null ? void 0 : n.downloadableLinks) == null ? void 0 : f.result } : {} }, A = n == null ? void 0 : n.freeGiftLabel, Y = !!((n == null ? void 0 : n.isFreeGift) ?? A), oe = A ? r("div", { className: "cart-summary-item__discount-labels", children: r("div", { className: "cart-summary-item__discount-label", children: A }) }) : null, le = () => oe, te = () => {
    const V = At(n);
    return V.value === 0 ? w(0, V.currency, { weight: "bold" }) : h(D, { children: [w(V.value, V.currency, { variant: "strikethrough", weight: "bold" }), w(0, V.currency, { sale: !0, weight: "bold" })] });
  }, de = h(D, { children: [(() => {
    const V = cr(n);
    return r(R, { amount: V.value, currency: V.currency, weight: "normal", "data-testid": "free-gift-unit-price" });
  })(), le()] }), se = te(), Ce = w(0, ((v = n.price) == null ? void 0 : v.currency) ?? "USD", { weight: "bold" });
  if (Y) N = { taxExcluded: y && b ? !0 : void 0, taxIncluded: y && !b ? !0 : void 0, price: de, total: se, ...b ? { totalExcludingTax: Ce } : {} };
  else if (y && b) {
    const V = w(x.originalPrice.value, x.originalPrice.currency), K = w(x.baseOriginalPrice.value * j, x.baseOriginalPrice.currency, { variant: n.discounted ? "strikethrough" : "default", weight: "bold" }), ee = w(x.baseDiscountedPrice.value * j, x.baseDiscountedPrice.currency, { sale: !0, weight: "bold" }), me = w(x.baseExcludingTax.value * j, x.baseExcludingTax.currency, { weight: "bold" });
    N = { taxExcluded: !0, taxIncluded: void 0, price: V, total: h(D, { children: [K, n.discounted ? ee : null] }), totalExcludingTax: me };
  } else if (!y && b) {
    const V = w(U.originalPrice.value, U.originalPrice.currency), K = w(U.baseOriginalPrice.value * j, U.baseOriginalPrice.currency, { variant: I ? "strikethrough" : "default", weight: "bold" }), ee = w(U.baseDiscountedPrice.value * j, U.baseDiscountedPrice.currency, { sale: !0, weight: "bold" }), me = w(U.baseExcludingTax.value * j, U.baseExcludingTax.currency, { weight: "bold" });
    N = { taxExcluded: void 0, taxIncluded: void 0, price: V, total: h(D, { children: [K, I ? ee : null] }), totalExcludingTax: me };
  } else if (y && !b) {
    const V = w(W.singleItemPrice.value, W.singleItemPrice.currency), K = w(W.baseOriginalPrice.value * j, W.baseOriginalPrice.currency, { variant: I ? "strikethrough" : "default", weight: "bold" }), ee = w(W.baseDiscountedPrice.value * j, W.baseDiscountedPrice.currency, { sale: !0, weight: "bold" });
    N = { taxExcluded: void 0, taxIncluded: !0, price: V, total: h(D, { children: [K, I ? ee : null] }) };
  }
  return r(Qe, { loading: a, alert: P && !k ? h("span", { children: [r(J, { source: Je }), l.outOfStock] }) : r(D, {}), configurations: (u == null ? void 0 : u(X)) ?? X, title: r("h3", { "data-testid": "product-name", className: "cart-summary-item__title", children: m ? r("a", { href: m(n), children: n == null ? void 0 : n.productName }) : n == null ? void 0 : n.productName }), sku: r("div", { children: (_ = n == null ? void 0 : n.product) == null ? void 0 : _.sku }), ...S, image: m ? r("a", { href: m(n), children: T(n) }) : T(n), ...N, footer: h(D, { children: [g && !d ? r(yr, { value: 1, min: 1, max: n == null ? void 0 : n.totalQuantity, onValue: (V) => g == null ? void 0 : g(Number(V)), name: "quantity", "data-testid": "returnIncrementer", readonly: !0 }) : void 0, r(q, { "data-testid": "Footer", name: "Footer", slot: e == null ? void 0 : e.Footer, context: { item: n } })] }) });
}, Vt = ({ onSubmit: e, loading: t, inLineAlert: a, fieldsConfig: n }) => h(z, { variant: "secondary", className: "order-order-search-form", children: [r("h2", { className: "order-order-search-form__title", children: r(F, { id: "Order.OrderSearchForm.title" }) }), r("p", { children: r(F, { id: "Order.OrderSearchForm.description" }) }), a.text ? r(ue, { "data-testid": "orderAlert", className: "order-order-search-form__alert", type: a.type, variant: "secondary", heading: a.text, icon: r(J, { source: Br }) }) : null, r(ir, { className: "order-order-search-form__wrapper", name: "orderSearchForm", loading: t, fieldsConfig: n, onSubmit: e, children: r("div", { className: "order-order-search-form__button-container", children: r(Q, { className: "order-order-search-form__button", size: "medium", variant: "primary", type: "submit", disabled: t, children: r(F, { id: "Order.OrderSearchForm.button" }) }, "logIn") }) })] }), De = { pending: "orderPending", shiping: "orderShipped", complete: "orderComplete", processing: "orderProcessing", "on hold": "orderOnHold", canceled: "orderCanceled", "suspected fraud": "orderSuspectedFraud", "payment Review": "orderPaymentReview", "order received": "orderReceived", "guest order cancellation requested": "guestOrderCancellationRequested", "pending payment": "orderPendingPayment", rejected: "orderRejected", authorized: "orderAuthorized", "paypal canceled reversal": "orderPaypalCanceledReversal", "pending paypal": "orderPendingPaypal", "paypal reversed": "orderPaypalReversed", closed: "orderClosed" }, $t = ({ slots: e, title: t, status: a, orderData: n, routeCreateReturn: o, onError: i, routeOnSuccess: l }) => {
  var d, g, u;
  const m = !!(n != null && n.returnNumber), p = String(a).toLocaleLowerCase(), c = (d = n == null ? void 0 : n.returns) == null ? void 0 : d[0], s = (c == null ? void 0 : c.returnStatus) ?? "", f = (c == null ? void 0 : c.createdReturnAt) ?? "", v = H({ message: "Order.OrderStatusContent.orderPlaceholder.message", messageWithoutDate: "Order.OrderStatusContent.orderPlaceholder.messageWithoutDate" }), _ = H(`Order.OrderStatusContent.${De[p]}.title`), b = H(`Order.OrderStatusContent.${De[p]}.message`), y = H(`Order.OrderStatusContent.${De[p]}.messageWithoutDate`), w = H({ title: `Order.OrderStatusContent.returnStatus.${Se(s)}`, returnMessage: "Order.OrderStatusContent.returnMessage" }), T = H({ adminAssistedLabel: "Order.OrderStatusContent.adminAssistedLabel" });
  if (!a) return r("div", {});
  const N = _ != null && _.title ? _ : { title: Te(p) }, P = b != null && b.message ? b : v, k = y != null && y.messageWithoutDate ? y : v, L = n != null && n.orderStatusChangeDate ? P == null ? void 0 : P.message.replace("{DATE}", ge(n == null ? void 0 : n.orderStatusChangeDate)) : k.messageWithoutDate, S = n == null ? void 0 : n.adminAssistedOrder, I = ((u = (g = w == null ? void 0 : w.returnMessage) == null ? void 0 : g.replace("{ORDER_CREATE_DATE}", ge((n == null ? void 0 : n.orderDate) ?? ""))) == null ? void 0 : u.replace("{RETURN_CREATE_DATE}", ge(f))) ?? "", x = m ? t ?? (w.title || Te(s)) : t ?? N.title;
  return h(z, { className: "order-order-status-content", variant: "secondary", children: [r(B, { title: x, level: 2 }), h("div", { className: "order-order-status-content__wrapper", children: [h("div", { className: E(["order-order-status-content__wrapper-description", ["order-order-status-content__wrapper-description--actions-slot", !!(e != null && e.OrderActions)]]), children: [S && r("p", { className: "order-order-status-content__admin-assisted", children: T == null ? void 0 : T.adminAssistedLabel }), r("p", { children: m ? I : L })] }), r(_t, { orderData: n, slots: e, routeCreateReturn: o, routeOnSuccess: l, onError: i })] })] });
}, Ht = ({ onError: e, routeOnSuccess: t, orderData: a, children: n }) => {
  const [o, i] = O(!1), l = Z(() => {
    i(!0);
    const d = (a == null ? void 0 : a.number) ?? "";
    Pr(d).then(({ success: g, userInputErrors: u }) => {
      g && ne(t, {}), u.length && (e == null || e(u));
    }).catch((g) => {
      e == null || e(g.message);
    }).finally(() => {
      i(!1);
    });
  }, [a, t, e]);
  return r(Q, { type: "button", disabled: o, variant: "secondary", className: "order-reorder", onClick: l, children: n });
}, Zt = ({ routeReturnSuccess: e, translations: t, orderData: a }) => h("div", { className: "order-return-order-message", children: [r("p", { className: "order-return-order-message__title", children: t.successTitle }), r("p", { className: "order-return-order-message__subtitle", children: t.successMessage }), r(Q, { href: (e == null ? void 0 : e(a)) ?? "#", children: t.backStore })] }), Wt = ({ placeholderImage: e, itemsEligibleForReturn: t, slots: a, loading: n, taxConfig: o, translations: i, selectedProductList: l, handleSelectedProductList: d, showConfigurableOptions: g, handleSetQuantity: u, handleChangeStep: m }) => h("ul", { className: "order-return-order-product-list", children: [t == null ? void 0 : t.map((p, c) => {
  const { quantityReturnRequested: s, quantityShipped: f, eligibleForReturn: v } = p, _ = l.some((w) => (w == null ? void 0 : w.productSku) === p.productSku && p.eligibleForReturn), b = f === s && v || !v, y = f - s === 0 ? s : f - s;
  return h("li", { className: E(["order-return-order-product-list__item", ["order-return-order-product-list__item--blur", b]]), children: [r(Be, { "data-testid": `key_${c}`, name: `key_${c}`, checked: _, disabled: b, onChange: () => {
    d({ ...p, currentReturnOrderQuantity: 1 });
  } }), r(ur, { slots: a, placeholderImage: e, loading: n, product: { ...p, totalQuantity: y || 1 }, itemType: "", taxConfig: o, translations: i, showConfigurableOptions: g, disabledIncrementer: !_, onQuantity: y > 1 ? (w) => {
    u(w, p.productSku);
  } : void 0 }), r(q, { "data-testid": "returnOrderItem", name: "ReturnOrderItem", slot: a == null ? void 0 : a.ReturnOrderItem })] }, p.id);
}), r("li", { className: "order-return-order-product-list__item", children: r(Q, { type: "button", onClick: () => m("attributes"), disabled: !l.length, children: i.nextStep }) })] }), zt = ({ placeholderImage: e, slots: t, formsRef: a, selectedProductList: n, loading: o, fieldsConfig: i, translations: l, handleChangeStep: d, onSubmit: g }) => {
  const { formData: u, errors: m, formRef: p, handleChange: c, handleBlur: s, handleSubmit: f } = nr({ fieldsConfig: Jr(i, n == null ? void 0 : n.length), onSubmit: g });
  return h("form", { className: "order-return-reason-form", ref: p, onSubmit: f, name: "returnReasonForm", children: [n.map((v, _) => {
    var b, y, w, T;
    const N = v == null ? void 0 : v.giftCard, P = v == null ? void 0 : v.product, k = Xr(i, _), L = `${v == null ? void 0 : v.id}_${_}`, S = (v == null ? void 0 : v.currentReturnOrderQuantity) ?? 1, I = { ...v != null && v.currentReturnOrderQuantity ? { [l.configurationsListQuantity]: S } : {}, ...v.configurableOptions || {}, ...v.bundleOptions || {}, ...N != null && N.senderName ? { [l.sender]: N == null ? void 0 : N.senderName } : {}, ...N != null && N.senderEmail ? { [l.sender]: N == null ? void 0 : N.senderEmail } : {}, ...N != null && N.recipientName ? { [l.recipient]: N == null ? void 0 : N.recipientName } : {}, ...N != null && N.recipientEmail ? { [l.recipient]: N == null ? void 0 : N.recipientEmail } : {}, ...N != null && N.message ? { [l.message]: N == null ? void 0 : N.message } : {}, ...v != null && v.downloadableLinks ? { [`${(b = v == null ? void 0 : v.downloadableLinks) == null ? void 0 : b.count} ${l.downloadableCount}`]: (y = v == null ? void 0 : v.downloadableLinks) == null ? void 0 : y.result } : {} }, x = (w = v == null ? void 0 : v.product) == null ? void 0 : w.name, W = { title: x, src: ((T = P == null ? void 0 : P.thumbnail) == null ? void 0 : T.url) ?? e, alt: x, width: 90, height: 120, loading: "lazy" };
    return h(Ye, { children: [r(Qe, { loading: o, title: r("div", { "data-testid": "product-name", children: x }), sku: r("div", { children: P == null ? void 0 : P.sku }), image: r(q, { name: "ReturnReasonFormImage", slot: t == null ? void 0 : t.ReturnReasonFormImage, context: { data: v, defaultImageProps: W }, children: r(he, { ...W }) }), configurations: I }), r("form", { name: L, ref: a == null ? void 0 : a.current[_], "data-quantity": S, children: r(ar, { className: "className", loading: o, fields: k, onChange: c, onBlur: s, errors: m, values: u }) })] }, v.id);
  }), r(q, { "data-testid": "returnFormActions", name: "ReturnFormActions", slot: t == null ? void 0 : t.ReturnFormActions, context: { handleChangeStep: d }, children: h("div", { className: "order-return-reason-form__actions", children: [r(Q, { variant: "secondary", type: "button", onClick: () => {
    d("products");
  }, children: l.backStep }), r(Q, { children: l.submit })] }) })] });
}, We = { size: "32", stroke: "2" }, mr = ({ placeholderImage: e, minifiedViewKey: t, withReturnNumber: a = !1, withOrderNumber: n = !1, slots: o, pageInfo: i, withReturnsListButton: l = !0, isMobile: d = !1, returnsInMinifiedView: g = 1, translations: u = {}, orderReturns: m = [], minifiedView: p = !1, withHeader: c = !0, withThumbnails: s = !0, selectedPage: f = 1, handleSetSelectPage: v, routeReturnDetails: _, routeOrderDetails: b, routeTracking: y, routeReturnsList: w, routeProductDetails: T, loading: N }) => {
  const P = p ? g : m.length, k = T != null && T() ? "a" : "span", L = re(() => m.slice(0, P).map((x, W) => {
    var U, j;
    const X = ((x == null ? void 0 : x.items) ?? []).reduce((A, Y) => (Y.requestQuantity ?? 0) + A, 0);
    return r(z, { variant: "secondary", className: "order-returns-list-content__cards-list", children: h("div", { className: "order-returns-list-content__cards-grid", children: [h("div", { className: "order-returns-list-content__descriptions", children: [r("p", { className: "order-returns-list-content__return-status", children: Se(x.returnStatus) ? r(F, { id: `Order.Returns.${t}.returnsList.returnStatus.${Se(x.returnStatus)}` }) : r("span", { children: Te(x.returnStatus) }) }), a ? h("p", { children: [u.returnNumber, " ", r("a", { href: (_ == null ? void 0 : _({ returnNumber: x.returnNumber, orderNumber: x.orderNumber, token: x.token })) ?? "#", rel: "noreferrer", children: x.returnNumber })] }) : null, n ? h("p", { children: [u.orderNumber, " ", r("a", { href: (b == null ? void 0 : b({ orderNumber: x.orderNumber, token: x.token })) ?? "#", rel: "noreferrer", children: x.orderNumber })] }) : null, (U = x == null ? void 0 : x.tracking) == null ? void 0 : U.map((A, Y) => {
      var oe, le;
      const te = { title: "", number: (A == null ? void 0 : A.trackingNumber) ?? "", carrier: ((oe = A == null ? void 0 : A.carrier) == null ? void 0 : oe.label) ?? "" }, de = y == null ? void 0 : y(te), se = `${te.number}_${Y}`;
      return h("p", { children: [`${u.carrier} `, `${(le = te.carrier) == null ? void 0 : le.toLocaleUpperCase()} | `, de ? r("a", { href: de, target: "_blank", rel: "noreferrer", "data-testid": `${se}_link`, children: A.trackingNumber }) : r("span", { "data-testid": `${se}_span`, children: A.trackingNumber })] }, se);
    }), o != null && o.ReturnItemsDetails ? r(q, { "data-testid": "returnItemsDetails", name: "ReturnItemsDetails", slot: o == null ? void 0 : o.ReturnItemsDetails, context: { items: x.items } }) : null, !(o != null && o.ReturnItemsDetails) && x.items.length ? h("p", { children: [X, " ", r(F, { id: `Order.Returns.${t}.returnsList.itemText`, plural: X, fields: { count: X } })] }) : null] }), s ? r(we, { maxColumns: d ? 3 : 9, emptyGridContent: r(D, {}), className: E(["order-returns-list-content__images", ["order-returns-list-content__images-3", d]]), children: (j = x == null ? void 0 : x.items) == null ? void 0 : j.map((A, Y) => {
      var oe, le;
      const te = `key_${Y}_${A.uid}`, de = ((oe = A == null ? void 0 : A.product) == null ? void 0 : oe.name) ?? "", se = ((le = A == null ? void 0 : A.thumbnail) == null ? void 0 : le.url) ?? e ?? "", Ce = { title: de, src: se, alt: de, width: 85, height: 114, loading: "eager" };
      return r(k, { "data-testid": te, href: (T == null ? void 0 : T(A)) ?? "#", children: r(q, { slotTag: "span", contentTag: "span", name: "ReturnListImage", slot: o == null ? void 0 : o.ReturnListImage, context: { data: A, defaultImageProps: Ce }, children: r(he, { ...Ce }) }) }, te);
    }) }) : null, o != null && o.DetailsActionParams ? r(q, { className: "order-returns-list-content__actions", "data-testid": "detailsActionParams", name: "DetailsActionParams", slot: o == null ? void 0 : o.DetailsActionParams, context: { returnOrderItem: x } }) : r("a", { href: (_ == null ? void 0 : _({ returnNumber: x.returnNumber, token: x.token, orderNumber: x.orderNumber })) ?? "#", className: "order-returns-list-content__actions", children: r(J, { source: Ve, ...We }) })] }) }, W);
  }), [m, P, t, a, u, n, o, s, d, e, k, y, T, _, b]), S = re(() => h(D, { children: [c ? r(B, { title: u.minifiedViewTitle, divider: !1, className: "order-returns__header--minified", level: 2 }) : null, N ? r(ae, { withCard: !1 }) : h(D, { children: [L, r($e, { minifiedView: p, typeList: "orders", isEmpty: !m.length, message: u.emptyOrdersListMessage }), l ? r("a", { className: "order-returns-list-content__actions", href: (w == null ? void 0 : w()) ?? "#", children: r(z, { variant: "secondary", className: "order-returns-list-content__card", children: h("div", { className: "order-returns-list-content__card-wrapper", children: [r("p", { children: u.viewAllOrdersButton }), r(J, { source: Ve, ...We })] }) }) }) : null] })] }), [w, l, c, u, L, p, m.length, N]), I = re(() => h(D, { children: [c ? r(B, { title: u.minifiedViewTitle, divider: !0, className: "order-returns__header--full-size", level: 1 }) : null, N ? r(ae, { withCard: !1 }) : h(D, { children: [r($e, { minifiedView: p, typeList: "orders", isEmpty: !m.length, message: u.emptyOrdersListMessage }), L, (i == null ? void 0 : i.totalPages) > 1 ? r(_r, { totalPages: i == null ? void 0 : i.totalPages, currentPage: f, onChange: v }) : null] })] }), [L, p, m, u, i == null ? void 0 : i.totalPages, f, v, N, c]);
  return r("div", { className: "order-returns-list-content", children: p ? S : I });
}, Ee = (e, t) => {
  try {
    return new URL(t ?? window.location.href).searchParams.get(e) ?? "";
  } catch {
    return "";
  }
}, qt = ({ onSuccess: e, onError: t, handleSetInLineAlert: a, orderData: n }) => {
  const [o, i] = O(!1), [l, d] = O({ id: "", email: "", ...n }), [g, u] = O("products"), [m, p] = O(!0), [c, s] = O([]), [f, v] = O([]), [_, b] = O([]), y = Ue([]);
  y.current.length !== c.length && (y.current = c.map((k, L) => y.current[L] || xr())), M(() => {
    const k = G.on("order/data", (L) => {
      var S;
      d(L);
      const I = rt(L);
      b(I), i(((S = Ee("orderRef")) == null ? void 0 : S.length) > 20), p(!1);
    }, { eager: !0 });
    return () => {
      k == null || k.off();
    };
  }, []), M(() => {
    Lr("RMA_ITEM").then((k) => {
      k != null && k.length && (v(k), p(!1));
    });
  }, []);
  const w = Z((k) => {
    s((L) => L.findIndex((S) => (S == null ? void 0 : S.productSku) === (k == null ? void 0 : k.productSku)) > -1 ? L.filter((S) => (S == null ? void 0 : S.productSku) !== (k == null ? void 0 : k.productSku)) : [...L, k]);
  }, []), T = Z((k) => {
    u(k), a(), k === "products" && s([]);
  }, [a]), N = Z((k, L) => {
    const S = c.map((I) => I.productSku === L ? { ...I, currentReturnOrderQuantity: k } : I);
    s(S);
  }, [c]), P = Z(async (k, L) => {
    if (!L) return;
    p(!0);
    const S = { orderUid: l.id, contactEmail: l.email }, I = et(y);
    o ? Sr({ token: Ee("orderRef"), contactEmail: S.contactEmail, items: I, commentText: "." }).then((x) => {
      e == null || e(x), T("success"), a();
    }).catch((x) => {
      t == null || t(x.message), a({ type: "error", heading: x.message });
    }) : Tr({ ...S, items: I }).then((x) => {
      e == null || e(x), T("success"), a();
    }).catch((x) => {
      t == null || t(x.message), a({ type: "error", heading: x.message });
    }), p(!1);
  }, [T, t, e, a, l, o]);
  return { order: l, steps: g, loading: m, formsRef: y, attributesList: f, selectedProductList: c, itemsEligibleForReturn: _, handleSelectedProductList: w, handleSetQuantity: N, handleChangeStep: T, onSubmit: P };
}, Ft = ["firstname", "lastname", "city", "company", "country_code", "region", "region_code", "region_id", "telephone", "id", "vat_id", "postcode", "street", "street_2", "default_shipping", "default_billing"], Gt = ({ orderData: e }) => {
  const [t, a] = O(!0), [n, o] = O(e), [i, l] = O([]);
  M(() => {
    const u = G.on("order/data", (m) => {
      o(m);
    }, { eager: !0 });
    return () => {
      u == null || u.off();
    };
  }, []), M(() => {
    Er("shortRequest").then((u) => {
      if (u) {
        const m = u.map(({ name: p, orderNumber: c, label: s }) => ({ name: kr(p), orderNumber: c, label: Ft.includes(p) ? null : s }));
        l(m);
      }
    }).finally(() => {
      a(!1);
    });
  }, []);
  const d = Z((u) => !i.length || !n || !n[u] ? [] : or(n[u], i), [i, n]), g = re(() => ({ billingAddress: d("billingAddress"), shippingAddress: d("shippingAddress") }), [d]);
  return { order: n, normalizeAddress: g, loading: t };
}, Ut = ({ orderData: e, invoiceRef: t }) => {
  const [a, n] = O(e ?? null), [o, i] = O(void 0), [l, d] = O(!0), [g, u] = O(null);
  return M(() => {
    const m = G.on("order/data", (p) => {
      n(p);
    }, { eager: !0 });
    return () => {
      m == null || m.off();
    };
  }, []), M(() => {
    const m = a == null ? void 0 : a.number;
    if (!m) return;
    let p = !0;
    return d(!0), i(void 0), u(null), Xe(m).then((c) => {
      if (!p) return;
      const s = (c == null ? void 0 : c.invoices) ?? [];
      i(s.find((f) => f.number === t || f.id === t));
    }).catch((c) => {
      p && (i(void 0), u(c instanceof Error ? c : new Error(String(c))));
    }).finally(() => {
      p && d(!1);
    }), () => {
      p = !1;
    };
  }, [a == null ? void 0 : a.number, t]), { order: a, invoice: o, loading: l, notFound: !l && !g && !o, error: g };
}, ce = (e) => {
  let t = !1, a = !1;
  switch (e) {
    case 1:
      a = !0;
      break;
    case 2:
      t = !0;
      break;
    case 3:
      t = !0, a = !0;
      break;
    default:
      t = !1, a = !1;
  }
  return { taxIncluded: t, taxExcluded: a };
}, jt = ({ orderData: e, config: t }) => {
  const [a, n] = O(!0), [o, i] = O(e), [l, d] = O(null);
  return M(() => {
    if (t) {
      const { shoppingOrderDisplayPrice: g, shoppingOrdersDisplayShipping: u, shoppingOrdersDisplaySubtotal: m, ...p } = t;
      d((c) => ({ ...c, ...p, shoppingOrderDisplayPrice: ce(g), shoppingOrdersDisplayShipping: ce(u), shoppingOrdersDisplaySubtotal: ce(m), salesPrintedCard: ce(t.salesPrintedCard), salesGiftWrapping: ce(t.salesGiftWrapping) })), n(!1);
    }
  }, [t]), M(() => {
    const g = G.on("order/data", (u) => {
      i(u);
    }, { eager: !0 });
    return () => {
      g == null || g.off();
    };
  }, []), { loading: a, storeConfig: l, order: o };
}, Bt = ({ orderData: e, handleEmailAvailability: t, handleSignUpClick: a }) => {
  const [n, o] = O(e), [i, l] = O(), [d, g] = O(t ? void 0 : !0), u = n == null ? void 0 : n.email, m = a && n !== void 0 && i === !1 && d === !0 ? () => {
    const p = n.shippingAddress, c = n.billingAddress, s = [{ code: "email", defaultValue: n.email }, { code: "firstname", defaultValue: (c == null ? void 0 : c.firstName) ?? "" }, { code: "lastname", defaultValue: (c == null ? void 0 : c.lastName) ?? "" }];
    let f = [];
    if (p) {
      const v = { ...ke(p), default_shipping: !0 };
      f = [{ ...ke(c), default_billing: !0 }, v];
    } else f = [{ ...ke(c), default_billing: !0, default_shipping: !0 }];
    a({ inputsDefaultValueSet: s, addressesData: f });
  } : void 0;
  return M(() => {
    const p = G.on("authenticated", (c) => {
      l(c);
    }, { eager: !0 });
    return () => {
      p == null || p.off();
    };
  }, []), M(() => {
    const p = G.on("order/data", (c) => {
      o(c);
    }, { eager: !0 });
    return () => {
      p == null || p.off();
    };
  }, []), M(() => {
    t && i !== void 0 && (i || !u || t(u).then((p) => g(p)).catch(() => g(!0)));
  }, [i, t, u]), { order: n, onSignUpClickHandler: m };
}, Qt = ({ orderData: e }) => {
  const [t, a] = O(e ?? null), [n, o] = O((e == null ? void 0 : e.comments) ?? []);
  return M(() => {
    const i = G.on("order/data", (l) => {
      a(l), o((l == null ? void 0 : l.comments) ?? []);
    }, { eager: !0 });
    return () => {
      i == null || i.off();
    };
  }, []), { comments: n, order: t };
}, Yt = ({ orderData: e }) => {
  const [t, a] = O(e ?? null), [n, o] = O([]), [i, l] = O(!0), [d, g] = O(null);
  return M(() => {
    const u = G.on("order/data", (m) => {
      a(m);
    }, { eager: !0 });
    return () => {
      u == null || u.off();
    };
  }, []), M(() => {
    const u = t == null ? void 0 : t.number;
    if (!u) return;
    let m = !0;
    return l(!0), g(null), o([]), Xe(u).then((p) => {
      m && o((p == null ? void 0 : p.invoices) ?? []);
    }).catch((p) => {
      m && (o([]), g(p instanceof Error ? p : new Error(String(p))));
    }).finally(() => {
      m && l(!1);
    }), () => {
      m = !1;
    };
  }, [t == null ? void 0 : t.number]), { invoices: n, loading: i, order: t, error: d };
}, Xt = ({ orderData: e }) => {
  const [t, a] = O(!0), [n, o] = O(e);
  return M(() => {
    const i = G.on("order/data", (l) => {
      o(l), a(!1);
    }, { eager: !0 });
    return () => {
      i == null || i.off();
    };
  }, []), { loading: t, order: n };
}, Jt = ({ onError: e, isAuth: t, renderSignIn: a, routeCustomerOrder: n, routeGuestOrder: o }) => {
  const [i, l] = O({ text: "", type: "success" }), [d, g] = O(!1), u = H({ invalidSearch: "Order.Errors.invalidSearch", email: "Order.OrderSearchForm.email", lastname: "Order.OrderSearchForm.lastname", number: "Order.OrderSearchForm.orderNumber" }), m = Z(async (c) => {
    const s = Ee("orderRef"), f = s && s.length > 20;
    if (!c && !s || !(c != null && c.number) && !(c != null && c.token) && !s) return null;
    if (t) {
      const v = await Ae();
      (v == null ? void 0 : v.email) === c.email ? ne(n, { orderRef: c == null ? void 0 : c.number }) : f || ne(o, { orderRef: c.token });
    } else f || ne(o, { orderRef: (c == null ? void 0 : c.token) ?? "" });
  }, [t, n, o]);
  M(() => {
    const c = G.on("order/data", (s) => {
      m(s);
    }, { eager: !0 });
    return () => {
      c == null || c.off();
    };
  }, [m]), M(() => {
    const c = Ee("orderRef"), s = c && c.length > 20 ? c : null;
    c && (s ? ne(o, { orderRef: c }) : t ? ne(n, { orderRef: c }) : a == null || a({ render: !0, formValues: { number: c } }));
  }, [t, n, o, a]);
  const p = re(() => [{ entityType: "CUSTOMER_ADDRESS", is_unique: !1, label: u.email, options: [], defaultValue: "", fieldType: pe.TEXT, className: "", required: !0, orderNumber: 1, name: "email", id: "email", code: "email", isUnique: !1 }, { entityType: "CUSTOMER_ADDRESS", is_unique: !1, label: u.lastname, options: [], defaultValue: "", fieldType: pe.TEXT, className: "", required: !0, orderNumber: 2, name: "lastname", id: "lastname", code: "lastname", isUnique: !1 }, { entityType: "CUSTOMER_ADDRESS", is_unique: !1, label: u.number, options: [], defaultValue: "", fieldType: pe.TEXT, className: "", required: !0, orderNumber: 3, name: "number", id: "number", code: "number", isUnique: !1 }], [u]);
  return { onSubmit: Z(async (c, s) => {
    if (!s) return null;
    g(!0);
    const f = er(c.target);
    await Ir(f).then((v) => {
      v || l({ text: u.invalidSearch, type: "warning" }), G.emit("order/data", v);
    }).catch(async (v) => {
      var _;
      let b = !0;
      e == null || e({ error: v.message });
      const y = t ? await Ae() : { email: "" };
      if ((y == null ? void 0 : y.email) === (f == null ? void 0 : f.email)) {
        ne(n, { orderRef: f.number });
        return;
      }
      b = a == null ? void 0 : a({ render: y === null || ((_ = v == null ? void 0 : v.message) == null ? void 0 : _.includes("Please login to view the order.")), formValues: f }), b && l({ text: v.message, type: "warning" });
    }).finally(() => {
      g(!1);
    });
  }, [t, e, a, n, u.invalidSearch]), inLineAlert: i, loading: d, normalizeFieldsConfig: p };
}, Kt = ({ orderData: e }) => {
  const [t, a] = O(e), [n, o] = O(e == null ? void 0 : e.status);
  return M(() => {
    const i = G.on("order/data", (l) => {
      a(l), o(l.status);
    }, { eager: !0 });
    return () => {
      i == null || i.off();
    };
  }, []), { orderStatus: n, order: t };
}, ze = { totalPages: 1, currentPage: 1, pageSize: 1 }, en = ({ returnPageSize: e }) => {
  const [t, a] = O(!0), [n, o] = O([]), [i, l] = O(ze), [d, g] = O(1);
  M(() => {
    Mr(e, d).then((m) => {
      o((m == null ? void 0 : m.ordersReturn) ?? []), l((m == null ? void 0 : m.pageInfo) ?? ze);
    }).finally(() => {
      a(!1);
    });
  }, [e, d]), M(() => {
    ((window == null ? void 0 : window.scrollY) ?? 0) > 0 && (window == null || window.scrollTo({ top: 100, behavior: "smooth" }));
  }, [d]);
  const u = Z((m) => {
    g(m);
  }, []);
  return { pageInfo: i, selectedPage: d, loading: t, orderReturns: n, handleSetSelectPage: u };
}, rn = ({ orderData: e }) => {
  const [t, a] = O(!0), [n, o] = O(e), [i, l] = O(!1);
  return M(() => {
    const d = G.on("order/data", (g) => {
      o(g), l(g == null ? void 0 : g.isVirtual), a(!1);
    }, { eager: !0 });
    return e != null && e.id && a(!1), () => {
      d == null || d.off();
    };
  }, [e]), { loading: t, order: n, isVirtualProduct: i };
}, qe = (e) => {
  const t = new URL(window.location.href);
  e.forEach((a) => {
    t.searchParams.has(a) && t.searchParams.delete(a);
  }), window.history.replaceState({}, document.title, t.toString());
}, tn = ({ enableOrderCancellation: e }) => {
  const t = H({ cancelOrderHeading: "Order.OrderStatusContent.actions.cancel", confirmGuestReturnHeading: "Order.OrderStatusContent.actions.confirmGuestReturn", orderCancelled: "Order.OrderStatusContent.orderCanceled.message", guestRequestReturnMessage: "Order.OrderStatusContent.actions.confirmGuestReturnMessage" }), [a, n] = O(!1), [o, i] = O(!1), [l, d] = O({ heading: "", text: "", status: void 0 }), g = Z(() => {
    n(!0), qe(["order_id", "confirmation_key", "action"]);
  }, []), u = Z((m, p, c) => {
    d({ heading: m, text: p, status: c }), qe(["action"]);
  }, []);
  return M(() => {
    const m = new URLSearchParams(window.location.search), p = m.get("order_id") ?? "", c = m.get("confirmation_key") ?? "", s = m.get("action") ?? "";
    o || !p || !c || !s || (e && s === "cancel" && (i(!0), Dr(p, c).then(() => {
      d({ heading: t.cancelOrderHeading, text: t.orderCancelled, status: "success" });
    }).catch((f) => {
      d({ heading: t.cancelOrderHeading, text: f.message, status: "warning" });
    })), s === "return" && (i(!0), Rr(p, c).then(() => {
      d({ heading: t.confirmGuestReturnHeading, text: t.guestRequestReturnMessage, status: "success" });
    }).catch((f) => {
      d({ heading: t.confirmGuestReturnHeading, text: f.message, status: "warning" });
    })));
  }, [e, t, u, o]), { orderActionStatus: l, isDismissed: a, onDismiss: g };
}, nn = { success: Vr, warning: jr, error: Je }, an = () => {
  const [e, t] = O({ type: "success", heading: "" }), a = Z((n) => {
    if (!(n != null && n.type)) {
      t({ type: "success", heading: "" });
      return;
    }
    const o = r(J, { source: nn[n.type] });
    t({ ...n, icon: o });
  }, []);
  return { inLineAlertProps: e, handleSetInLineAlert: a };
}, Me = () => {
  const [e, t] = O(window.innerWidth < 768), a = Z(pr(() => {
    t(window.innerWidth < 768);
  }, 1e3), []);
  return M(() => (window.addEventListener("resize", a), () => {
    window.removeEventListener("resize", a);
  }), [a]), e;
}, on = ({ placeholderImage: e, slots: t, collapseThreshold: a, translations: n, returnData: o, routeTracking: i, routeProductDetails: l }) => {
  var d;
  const g = Me(), u = l ? "a" : "span";
  return h(z, { variant: "secondary", className: E(["order-shipping-status-card", "order-shipping-status-card--return-order"]), children: [r(B, { title: n.returnOrderCardTitle, level: 2 }), h("div", { children: [(d = o == null ? void 0 : o.tracking) == null ? void 0 : d.map((m, p) => {
    var c, s;
    const f = { title: "", number: (m == null ? void 0 : m.trackingNumber) ?? "", carrier: ((c = m == null ? void 0 : m.carrier) == null ? void 0 : c.label) ?? "" }, v = i == null ? void 0 : i(f), _ = v ? () => {
      window.open(v, "_blank", "noreferrer");
    } : null;
    return h("div", { className: "order-shipping-status-card__header", children: [h("div", { children: [`${n.carrier} `, `${(s = f.carrier) == null ? void 0 : s.toLocaleUpperCase()} | `, f.number] }), _ ? r(Q, { onClick: _, children: n.trackButton }) : null] }, `${f.number}_${p}`);
  }), t != null && t.ReturnItemsDetails ? r(q, { "data-testid": "returnItemsDetails", name: "ReturnItemsDetails", slot: t == null ? void 0 : t.ReturnItemsDetails, context: { items: o.items } }) : null, r(Ne, { actionIconPosition: "right", "data-testid": "dropinAccordion", children: r(Le, { defaultOpen: a >= o.items.length, title: r(F, { id: "Order.ShippingStatusCard.itemText", plural: o.items.reduce((m, p) => m + p.requestQuantity, 0), fields: { count: o.items.reduce((m, p) => m + p.requestQuantity, 0) } }), children: r(we, { maxColumns: g ? 3 : 9, emptyGridContent: r(D, {}), className: E(["order-shipping-status-card__images", ["order-shipping-status-card__images-3", g]]), children: o.items.map((m, p) => {
    var c, s, f;
    const v = { title: ((c = m.thumbnail) == null ? void 0 : c.label) ?? "", src: ((s = m.thumbnail) == null ? void 0 : s.url) ?? e, alt: ((f = m.thumbnail) == null ? void 0 : f.label) ?? "", width: 85, height: 114, loading: "lazy" };
    return r(u, { href: (l == null ? void 0 : l(m)) ?? "#", "data-testid": `${p}${m.uid}`, children: r(q, { slotTag: "span", contentTag: "span", name: "ShippingStatusCardImage", slot: t == null ? void 0 : t.ShippingStatusReturnCardImage, context: { data: m, defaultImageProps: v }, children: r(he, { ...v }) }) }, `${p}${m.uid}`);
  }) }) }) })] })] });
}, ln = ({ placeholderImage: e, translations: t, slots: a, orderData: n, collapseThreshold: o = 10, routeProductDetails: i, routeTracking: l }) => {
  var d, g, u, m, p;
  const c = !!(n != null && n.returnNumber), s = n == null ? void 0 : n.returnNumber, f = i ? "a" : "span", v = (d = n == null ? void 0 : n.status) == null ? void 0 : d.toLocaleLowerCase(), _ = (g = n == null ? void 0 : n.items) == null ? void 0 : g.filter((y) => (y == null ? void 0 : y.quantityShipped) === 0 || (y == null ? void 0 : y.quantityShipped) < (y == null ? void 0 : y.quantityOrdered)), b = (u = n == null ? void 0 : n.items) == null ? void 0 : u.reduce((y, w) => {
    const T = w.quantityOrdered - w.quantityShipped;
    return y + (T > 0 ? T : 0);
  }, 0);
  if (c && n != null && n.returns.length) {
    const y = n.returns.find((w) => w.returnNumber === s);
    return !y || y.tracking.length === 0 ? null : r(on, { placeholderImage: e, slots: a, collapseThreshold: o, translations: t, returnData: y, routeTracking: l, routeProductDetails: i });
  }
  return !n || v != null && v.includes(Ke.CANCELED) ? null : (m = n == null ? void 0 : n.shipments) != null && m.length ? h(D, { children: [(p = n == null ? void 0 : n.shipments) == null ? void 0 : p.map(({ tracking: y, items: w, id: T, number: N }, P) => {
    const k = w ?? [], L = k.reduce((S, I) => S + ((I == null ? void 0 : I.quantityShipped) ?? I.orderItem.quantityShipped ?? 0), 0);
    return h(z, { variant: "secondary", className: "order-shipping-status-card", children: [r(B, { title: t.shippingCardTitle, level: 2 }), N ? r("div", { className: "order-shipping-status-card__header", "data-testid": "shipmentNumber", children: r("div", { className: "order-shipping-status-card__header--content", children: h("p", { children: [t.shipmentNumber, " ", N] }) }) }) : null, y == null ? void 0 : y.map((S) => {
      var I;
      const x = l == null ? void 0 : l(S), W = x ? () => {
        window.open(x, "_blank", "noreferrer");
      } : null;
      return h("div", { className: "order-shipping-status-card__header", role: "status", children: [h("div", { className: "order-shipping-status-card__header--content", children: [h("p", { children: [t.carrier, " ", (I = S == null ? void 0 : S.carrier) == null ? void 0 : I.toLocaleUpperCase(), " | ", S == null ? void 0 : S.number] }), r("p", { children: S == null ? void 0 : S.title })] }), a != null && a.DeliveryTrackActions ? r(q, { "data-testid": "deliverySlotActions", name: "DeliveryTrackActions", slot: a == null ? void 0 : a.DeliveryTrackActions, context: { trackInformation: S } }) : W ? r(Q, { onClick: W, children: t.trackButton }) : null] }, S.number);
    }), r(Ne, { actionIconPosition: "right", "data-testid": "dropinAccordion", children: r(Le, { "data-position": P + 1, defaultOpen: o >= (k == null ? void 0 : k.length), title: r(F, { id: "Order.ShippingStatusCard.notYetShippedImagesTitle", plural: L, fields: { count: L } }), children: r(we, { maxColumns: 6, emptyGridContent: r(D, {}), className: "order-shipping-status-card__images", children: k == null ? void 0 : k.map((S) => {
      var I, x, W, U, j, X;
      const A = ((W = (x = (I = S == null ? void 0 : S.orderItem) == null ? void 0 : I.product) == null ? void 0 : x.thumbnail) == null ? void 0 : W.label) ?? "", Y = { title: A, src: ((X = (j = (U = S == null ? void 0 : S.orderItem) == null ? void 0 : U.product) == null ? void 0 : j.thumbnail) == null ? void 0 : X.url) ?? e, alt: A, width: 85, height: 114, loading: "eager" };
      return r(f, { href: (i == null ? void 0 : i(S)) ?? "#", children: r(q, { slotTag: "span", contentTag: "span", name: "ShippingStatusCardImage", slot: a == null ? void 0 : a.ShippingStatusCardImage, context: { data: S, defaultImageProps: Y }, children: r(he, { ...Y }) }) }, S.id);
    }) }) }) }), a != null && a.DeliveryTimeLine ? r(q, { "data-testid": "deliverySlotTimeLine", name: "DeliveryTimeLine", slot: a == null ? void 0 : a.DeliveryTimeLine, context: {} }) : null] }, T);
  }), _ != null && _.length ? h(z, { variant: "secondary", className: "order-shipping-status-card", "data-testid": "dropinAccordionNotYetShipped2", children: [r(B, { title: t.notYetShippedTitle, level: 2 }), r(Ne, { actionIconPosition: "right", children: r(Le, { defaultOpen: o >= (_ == null ? void 0 : _.length), title: r(F, { id: "Order.ShippingStatusCard.notYetShippedImagesTitle", plural: b, fields: { count: b } }), children: r(we, { maxColumns: 6, emptyGridContent: r(D, {}), className: "order-shipping-status-card__images", children: _ == null ? void 0 : _.map((y) => {
    var w, T, N;
    const P = { title: ((w = y.thumbnail) == null ? void 0 : w.label) ?? "", src: ((T = y.thumbnail) == null ? void 0 : T.url) ?? "", alt: ((N = y.thumbnail) == null ? void 0 : N.label) ?? "", width: 85, height: 114, loading: "lazy" };
    return r(f, { href: (i == null ? void 0 : i(y)) ?? "#", children: r(q, { slotTag: "span", contentTag: "span", name: "NotYetShippedProductImage", slot: a == null ? void 0 : a.NotYetShippedProductImage, context: { data: y, defaultImageProps: P }, children: r(he, { ...P }) }) }, y.id);
  }) }) }) })] }) : null] }) : h(z, { variant: "secondary", className: "order-shipping-status-card", children: [r(B, { title: t.shippingInfoTitle, level: 2 }), r("div", { className: "order-shipping-status-card__header", children: h("div", { className: "order-shipping-status-card__header--content", children: [n != null && n.carrier ? r("p", { children: n == null ? void 0 : n.carrier }) : null, t.noInfoTitle ? r("p", { children: t.noInfoTitle }) : null] }) })] });
}, dn = ["br", "b", "i"];
function sn(e) {
  return gr(e, { ALLOWED_TAGS: dn, ALLOWED_ATTR: [] });
}
const cn = ({ className: e, comments: t = [], ...a }) => {
  const n = H({ emptyState: "Order.OrderComments.emptyState", title: "Order.OrderComments.title" }), o = !t || t.length === 0 ? r("ul", { className: E(["order-order-comments", "order-order-comments--empty"]), "data-testid": "order-comments-list", children: r("li", { className: "order-order-comments__empty-state", "data-testid": "order-comments-empty-state", children: n.emptyState }) }) : r("ul", { className: "order-order-comments", "data-testid": "order-comments-list", children: t.map((i, l) => h("li", { className: "order-order-comments__item", "data-testid": `order-comment-${l}`, children: [r("div", { className: "order-order-comments__header", children: r("time", { className: "order-order-comments__date", dateTime: i.timestamp, "data-testid": `order-comment-date-${l}`, children: ge(i.timestamp, "en-US", tr) }) }), r("p", { className: "order-order-comments__text", "data-testid": `order-comment-text-${l}`, dangerouslySetInnerHTML: { __html: sn(i.message) } })] }, l)) });
  return h(z, { ...a, variant: "secondary", className: E(["order-order-comments-card", e]), "data-testid": "order-comments-card", children: [r(B, { title: n.title, level: 2 }), r("div", { className: "order-order-comments-card__container", children: o })] });
};
/*! Copyright 2026 Adobe
All Rights Reserved. */
const un = ({ className: e, orderData: t, slots: a, onSuccess: n, onError: o, routeReturnSuccess: i, showConfigurableOptions: l }) => {
  const d = H({ headerText: "Order.CreateReturn.headerText", successTitle: "Order.CreateReturn.success.title", successMessage: "Order.CreateReturn.success.message", sender: "Order.CreateReturn.giftCard.sender", recipient: "Order.CreateReturn.giftCard.recipient", message: "Order.CreateReturn.giftCard.message", outOfStock: "Order.CreateReturn.stockStatus.outOfStock", nextStep: "Order.CreateReturn.buttons.nextStep", backStep: "Order.CreateReturn.buttons.backStep", submit: "Order.CreateReturn.buttons.submit", backStore: "Order.CreateReturn.buttons.backStore", downloadableCount: "Order.CreateReturn.downloadableCount", returnedItems: "Order.CreateReturn.returnedItems", configurationsListQuantity: "Order.CreateReturn.configurationsList.quantity" }), { inLineAlertProps: g, handleSetInLineAlert: u } = an(), m = ie(), { order: p, itemsEligibleForReturn: c, formsRef: s, attributesList: f, steps: v, loading: _, selectedProductList: b, handleSelectedProductList: y, handleSetQuantity: w, handleChangeStep: T, onSubmit: N } = qt({ orderData: t, onSuccess: n, onError: o, handleSetInLineAlert: u });
  if (_) return r("div", { children: r(dr, {}) });
  if (!_ && !f.length) return r("div", {});
  const P = (m == null ? void 0 : m.baseMediaUrl) ?? "", k = { products: r(Wt, { itemsEligibleForReturn: c, placeholderImage: P, taxConfig: ce((m == null ? void 0 : m.shoppingOrderDisplayPrice) ?? 0), slots: a, translations: d, loading: _, selectedProductList: b, handleSelectedProductList: y, showConfigurableOptions: l, handleSetQuantity: w, handleChangeStep: T }), attributes: r(zt, { placeholderImage: P, slots: a, formsRef: s, loading: _, fieldsConfig: f, selectedProductList: b, handleChangeStep: T, translations: d, onSubmit: N }), success: r(Zt, { translations: d, routeReturnSuccess: i, orderData: p }), error: null };
  return h("div", { className: E(["order-create-return", e]), children: [r(B, { title: d.headerText, level: 1 }), g.heading ? r(ue, { className: "order-create-return_notification", variant: "secondary", "data-testid": "orderCreateReturnNotification", ...g }) : null, k[v]] });
};
un.displayName = "CreateReturn";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const mn = ({ paymentIconsMap: e, orderData: t, title: a, className: n, slots: o }) => {
  const i = H({ emailTitle: "Order.CustomerDetails.email.title", shippingAddressTitle: "Order.CustomerDetails.shippingAddress.title", shippingMethodsTitle: "Order.CustomerDetails.shippingMethods.title", billingAddressTitle: "Order.CustomerDetails.billingAddress.title", paymentMethodsTitle: "Order.CustomerDetails.paymentMethods.title", returnInformationTitle: "Order.CustomerDetails.returnInformation.title", headerText: "Order.CustomerDetails.headerText", freeShipping: "Order.CustomerDetails.freeShipping", createdReturnAt: "Order.CustomerDetails.orderReturnLabels.createdReturnAt", orderNumberLabel: "Order.CustomerDetails.orderReturnLabels.orderNumberLabel", returnStatusLabel: "Order.CustomerDetails.orderReturnLabels.returnStatusLabel" }), { order: l, normalizeAddress: d, loading: g } = Gt({ orderData: t });
  return r("div", { className: E(["order-customer-details", n]), children: r(lt, { slots: o, loading: g, order: l, title: a, paymentIconsMap: e, normalizeAddress: d, translations: i }) });
};
mn.displayName = "CustomerDetails";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const pn = ({ withHeader: e, orderData: t, children: a, className: n, ...o }) => {
  const i = ie(), { loading: l, storeConfig: d, order: g } = jt({ orderData: t, config: i }), u = H({ subtotal: "Order.OrderCostSummary.subtotal.title", shipping: "Order.OrderCostSummary.shipping.title", freeShipping: "Order.OrderCostSummary.shipping.freeShipping", tax: "Order.OrderCostSummary.tax.title", incl: "Order.OrderCostSummary.tax.incl", excl: "Order.OrderCostSummary.tax.excl", discount: "Order.OrderCostSummary.discount.title", discountSubtitle: "Order.OrderCostSummary.discount.subtitle", total: "Order.OrderCostSummary.total.title", totalFree: "Order.OrderCostSummary.totalFree", accordionTitle: "Order.OrderCostSummary.tax.accordionTitle", accordionTotalTax: "Order.OrderCostSummary.tax.accordionTotalTax", totalExcludingTaxes: "Order.OrderCostSummary.tax.totalExcludingTaxes", headerText: "Order.OrderCostSummary.headerText", printedCardTitle: "Order.OrderCostSummary.giftOptionsTax.printedCard.title", printedCardTitleInclTax: "Order.OrderCostSummary.giftOptionsTax.printedCard.inclTax", printedCardTitleExclTax: "Order.OrderCostSummary.giftOptionsTax.printedCard.exclTax", itemGiftWrappingTitle: "Order.OrderCostSummary.giftOptionsTax.itemGiftWrapping.title", itemGiftWrappingInclTax: "Order.OrderCostSummary.giftOptionsTax.itemGiftWrapping.inclTax", itemGiftWrappingExclTax: "Order.OrderCostSummary.giftOptionsTax.itemGiftWrapping.exclTax", orderGiftWrappingTitle: "Order.OrderCostSummary.giftOptionsTax.orderGiftWrapping.title", orderGiftWrappingInclTax: "Order.OrderCostSummary.giftOptionsTax.orderGiftWrapping.inclTax", orderGiftWrappingExclTax: "Order.OrderCostSummary.giftOptionsTax.orderGiftWrapping.exclTax" });
  return r("div", { ...o, className: E(["order-cost-summary", n]), children: r(Et, { order: g, withHeader: e, loading: l, storeConfig: d, translations: u }) });
};
pn.displayName = "OrderCostSummary";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const gn = function() {
  const e = typeof document < "u" && document.createElement("link").relList;
  return e && e.supports && e.supports("modulepreload") ? "modulepreload" : "preload";
}(), hn = function(e) {
  return "/" + e;
}, Fe = {}, vn = function(e, t, a) {
  let n = Promise.resolve();
  if (t && t.length > 0) {
    document.getElementsByTagName("link");
    const i = document.querySelector("meta[property=csp-nonce]"), l = (i == null ? void 0 : i.nonce) || (i == null ? void 0 : i.getAttribute("nonce"));
    n = Promise.allSettled(t.map((d) => {
      if (d = hn(d), d in Fe) return;
      Fe[d] = !0;
      const g = d.endsWith(".css"), u = g ? '[rel="stylesheet"]' : "";
      if (document.querySelector(`link[href="${d}"]${u}`)) return;
      const m = document.createElement("link");
      if (m.rel = g ? "stylesheet" : gn, g || (m.as = "script"), m.crossOrigin = "", m.href = d, l && m.setAttribute("nonce", l), document.head.appendChild(m), g) return new Promise((p, c) => {
        m.addEventListener("load", p), m.addEventListener("error", () => c(new Error(`Unable to preload CSS for ${d}`)));
      });
    }));
  }
  function o(i) {
    const l = new Event("vite:preloadError", { cancelable: !0 });
    if (l.payload = i, window.dispatchEvent(l), !l.defaultPrevented) throw i;
  }
  return n.then((i) => {
    for (const l of i || []) l.status === "rejected" && o(l.reason);
    return e().catch(o);
  });
}, fn = ({ orderData: e, invoiceRef: t, className: a, routeInvoicesList: n, onDownloadPdf: o, getInvoicePdfBranding: i, ...l }) => {
  const { order: d, invoice: g, loading: u, notFound: m, error: p } = Ut({ orderData: e, invoiceRef: t }), c = H({ notFoundHeading: "Order.InvoiceDetails.notFound.heading", notFoundDescription: "Order.InvoiceDetails.notFound.description", loadErrorHeading: "Order.InvoiceDetails.loadError.heading", loadErrorDescription: "Order.InvoiceDetails.loadError.description" }), s = H({ invoiceNumber: "Order.InvoiceDetails.pdf.invoiceNumber", status: "Order.InvoiceDetails.pdf.status", orderNumber: "Order.InvoiceDetails.pdf.orderNumber", orderDate: "Order.InvoiceDetails.pdf.orderDate", soldTo: "Order.InvoiceDetails.pdf.soldTo", shipTo: "Order.InvoiceDetails.pdf.shipTo", telephone: "Order.InvoiceDetails.pdf.telephone", paymentMethod: "Order.InvoiceDetails.pdf.paymentMethod", shippingMethod: "Order.InvoiceDetails.pdf.shippingMethod", totalShippingCharges: "Order.InvoiceDetails.pdf.totalShippingCharges", products: "Order.InvoiceDetails.pdf.products", sku: "Order.InvoiceDetails.pdf.sku", price: "Order.InvoiceDetails.pdf.price", quantity: "Order.InvoiceDetails.pdf.quantity", tax: "Order.InvoiceDetails.pdf.tax", subtotal: "Order.InvoiceDetails.pdf.subtotal", totalsSubtotal: "Order.InvoiceDetails.pdf.totalsSubtotal", totalsTax: "Order.InvoiceDetails.pdf.totalsTax", discounts: "Order.InvoiceDetails.pdf.discounts", shipping: "Order.InvoiceDetails.pdf.shipping", grandTotal: "Order.InvoiceDetails.pdf.grandTotal" }), f = E(["order-invoice-details-container", a]);
  return u || !d ? r("div", { className: f, children: r(ae, { withCard: !1 }) }) : m ? r("div", { className: f, children: r(ue, { heading: c.notFoundHeading ?? "", description: c.notFoundDescription ?? "" }) }) : p ? r("div", { className: f, children: r(ue, { heading: c.loadErrorHeading ?? "Unable to load invoice", description: c.loadErrorDescription ?? "Please try again later." }) }) : r("div", { ...l, className: f, children: r(ft, { order: d, invoice: g, routeInvoicesList: n, onDownloadPdf: o ?? (async () => {
    if (!d || !g) return;
    const { downloadInvoicePdf: _ } = await vn(async () => {
      const { downloadInvoicePdf: y } = await import("./chunks/generateInvoicePdf.js").then((w) => w.g);
      return { downloadInvoicePdf: y };
    }, []), b = await (i == null ? void 0 : i());
    _({ order: d, invoice: g, branding: b, labels: s });
  }) }) });
};
fn.displayName = "InvoiceDetails";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const _n = (e) => {
  var t;
  const { order: a, onSignUpClickHandler: n } = Bt(e);
  return r("div", { children: a ? r(kt, { customerName: (t = a.billingAddress) == null ? void 0 : t.firstName, onSignUpClick: n, orderNumber: a.number }) : r(Ct, {}) });
};
_n.displayName = "OrderHeader";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const yn = ({ slots: e, className: t, orderData: a, withHeader: n, showConfigurableOptions: o, routeProductDetails: i }) => {
  const l = ie(), { loading: d, order: g } = Xt({ orderData: a });
  return r("div", { className: E(["order-order-product-list", t]), children: r(Mt, { slots: e, loading: d, placeholderImage: (l == null ? void 0 : l.baseMediaUrl) ?? "", taxConfig: ce((l == null ? void 0 : l.shoppingOrderDisplayPrice) ?? 0), order: g, withHeader: n, showConfigurableOptions: o, routeProductDetails: i }) });
};
yn.displayName = "OrderProductList";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const bn = ({ orderData: e }) => {
  const [t, a] = O(e), [n, o] = O([]);
  return M(() => {
    const i = G.on("order/data", (l) => {
      a(l), o(l == null ? void 0 : l.returns);
    }, { eager: !0 });
    return () => {
      i == null || i.off();
    };
  }, []), { order: t, orderReturns: n };
}, Cn = ({ slots: e, className: t, orderData: a, withHeader: n, withThumbnails: o, routeReturnDetails: i, routeProductDetails: l, routeTracking: d }) => {
  const g = ie(), { orderReturns: u } = bn({ orderData: a }), m = Me(), p = "fullSizeView", c = (g == null ? void 0 : g.baseMediaUrl) ?? "", s = H({ minifiedViewTitle: `Order.Returns.${p}.returnsList.minifiedViewTitle`, ariaLabelLink: `Order.Returns.${p}.returnsList.ariaLabelLink`, emptyOrdersListMessage: `Order.Returns.${p}.returnsList.emptyOrdersListMessage`, orderNumber: `Order.Returns.${p}.returnsList.orderNumber`, returnNumber: `Order.Returns.${p}.returnsList.returnNumber`, carrier: `Order.Returns.${p}.returnsList.carrier` });
  return r("div", { className: E(["order-order-returns", t]), children: u.length ? r(mr, { placeholderImage: c, pageInfo: { pageSize: 1, totalPages: 1, currentPage: 1 }, minifiedViewKey: p, slots: e, isMobile: m, withOrderNumber: !1, withReturnNumber: !0, orderReturns: u, translations: s, withHeader: n, withThumbnails: o, minifiedView: !1, routeReturnDetails: i, routeProductDetails: l, routeTracking: d, loading: !1 }) : null });
};
Cn.displayName = "OrderReturns";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const xn = ({ className: e, isAuth: t, renderSignIn: a, routeCustomerOrder: n, routeGuestOrder: o, onError: i }) => {
  const { onSubmit: l, loading: d, inLineAlert: g, normalizeFieldsConfig: u } = Jt({ onError: i, isAuth: t, renderSignIn: a, routeCustomerOrder: n, routeGuestOrder: o });
  return r("div", { className: E(["order-order-search", e]), children: r(Vt, { onSubmit: l, loading: d, inLineAlert: g, fieldsConfig: u }) });
};
xn.displayName = "OrderSearch";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const On = ({ slots: e, orderData: t, className: a, statusTitle: n, status: o, routeCreateReturn: i, onError: l, routeOnSuccess: d }) => {
  const { orderStatus: g, order: u } = Kt({ orderData: t }), m = ie(), { orderActionStatus: p, isDismissed: c, onDismiss: s } = tn({ enableOrderCancellation: m == null ? void 0 : m.orderCancellationEnabled });
  return h("div", { className: E(["order-order-status", a]), children: [!c && (p == null ? void 0 : p.status) !== void 0 ? r(ue, { style: { marginBottom: "1rem" }, heading: p.heading, onDismiss: s, description: p.text, type: p.status }) : null, u ? r($t, { title: n, status: o || g, slots: e, orderData: u, routeCreateReturn: i, onError: l, routeOnSuccess: d }) : r(ae, { withCard: !1 })] });
};
On.displayName = "OrderStatus";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const wn = ({ slots: e, withReturnsListButton: t, className: a, minifiedView: n, withHeader: o, withThumbnails: i, returnPageSize: l, returnsInMinifiedView: d, routeReturnDetails: g, routeOrderDetails: u, routeTracking: m, routeReturnsList: p, routeProductDetails: c }) => {
  const s = ie(), { pageInfo: f, selectedPage: v, handleSetSelectPage: _, loading: b, orderReturns: y } = en({ returnPageSize: l }), w = Me(), T = n ? "minifiedView" : "fullSizeView", N = H({ viewAllOrdersButton: `Order.Returns.${T}.returnsList.viewAllOrdersButton`, ariaLabelLink: `Order.Returns.${T}.returnsList.ariaLabelLink`, emptyOrdersListMessage: `Order.Returns.${T}.returnsList.emptyOrdersListMessage`, minifiedViewTitle: `Order.Returns.${T}.returnsList.minifiedViewTitle`, orderNumber: `Order.Returns.${T}.returnsList.orderNumber`, returnNumber: `Order.Returns.${T}.returnsList.returnNumber`, carrier: `Order.Returns.${T}.returnsList.carrier` });
  return r("div", { className: E(["order-returns-list", a]), children: r(mr, { placeholderImage: (s == null ? void 0 : s.baseMediaUrl) ?? "", minifiedViewKey: T, withOrderNumber: !0, withReturnNumber: !0, slots: e, selectedPage: v, handleSetSelectPage: _, pageInfo: f, withReturnsListButton: t, isMobile: w, orderReturns: y, translations: N, withHeader: o, returnsInMinifiedView: d, withThumbnails: i, minifiedView: n, routeReturnDetails: g, routeOrderDetails: u, routeTracking: m, routeReturnsList: p, routeProductDetails: c, loading: b }) });
};
wn.displayName = "ReturnsList";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const Nn = ({ slots: e, className: t, collapseThreshold: a, orderData: n, routeOrderDetails: o, routeTracking: i, routeProductDetails: l }) => {
  const { loading: d, order: g, isVirtualProduct: u } = rn({ orderData: n }), m = ie(), p = H({ carrier: "Order.ShippingStatusCard.carrier", prepositionOf: "Order.ShippingStatusCard.prepositionOf", returnOrderCardTitle: "Order.ShippingStatusCard.returnOrderCardTitle", shippingCardTitle: "Order.ShippingStatusCard.shippingCardTitle", shippingInfoTitle: "Order.ShippingStatusCard.shippingInfoTitle", notYetShippedTitle: "Order.ShippingStatusCard.notYetShippedTitle", noInfoTitle: "Order.ShippingStatusCard.noInfoTitle", returnNumber: "Order.ShippingStatusCard.returnNumber", shipmentNumber: "Order.ShippingStatusCard.shipmentNumber", orderNumber: "Order.ShippingStatusCard.orderNumber", trackButton: "Order.ShippingStatusCard.trackButton" });
  if (!d && u) return null;
  const c = (m == null ? void 0 : m.baseMediaUrl) ?? "";
  return r("div", { className: E(["order-shipping-status", t]), children: !d && g ? r(ln, { placeholderImage: c, translations: p, routeOrderDetails: o, routeTracking: i, slots: e, orderData: g, collapseThreshold: a, routeProductDetails: l }) : r(ae, { withCard: !1 }) });
};
Nn.displayName = "ShippingStatus";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const Ln = ({ orderData: e, className: t, ...a }) => {
  const { comments: n, order: o } = Qt({ orderData: e });
  return o ? r("div", { ...a, className: E(["order-order-comments-container", t]), children: r(cn, { comments: n }) }) : r("div", { className: E(["order-order-comments-container", t]), children: r(ae, { withCard: !1 }) });
};
Ln.displayName = "OrderComments";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const Sn = ({ orderData: e, className: t, routeInvoiceDetails: a, ...n }) => {
  const { invoices: o, loading: i, order: l, error: d } = Yt({ orderData: e }), g = E(["order-order-invoices-container", t]);
  return l ? r("div", { ...n, className: g, children: r(Dt, { invoices: o, loading: i, error: d, orderNumber: l.number, routeInvoiceDetails: a }) }) : r("div", { className: g, children: r(ae, { withCard: !1 }) });
};
Sn.displayName = "OrderInvoices";
/*! Copyright 2026 Adobe
All Rights Reserved. */
(function(e, t) {
  try {
    if (typeof document < "u") {
      const a = t.styleId;
      if (document.querySelector(`style[data-dropin="${a}"]`)) return;
      const n = document.createElement("style");
      for (const i in t.attributes) n.setAttribute(i, t.attributes[i]);
      n.setAttribute("data-dropin", a), n.appendChild(document.createTextNode(e));
      const o = document.querySelector('style[data-dropin="sdk"]');
      if (o) o.after(n);
      else {
        const i = document.querySelector('link[rel="stylesheet"], style');
        i ? i.before(n) : document.head.append(n);
      }
    }
  } catch (a) {
    console.error("dropin-styles (injectCodeFunction)", a);
  }
})('.order-customer-details-content .dropin-card__content{gap:0}.order-customer-details-content__container{display:block;flex-direction:column}.order-customer-details-content__container-shipping_address,.order-customer-details-content__container-billing_address{margin:var(--spacing-medium) 0}@media (min-width: 768px){.order-customer-details-content__container{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:auto auto auto;grid-auto-flow:row}.order-customer-details-content__container-email{grid-area:1 / 1 / 2 / 2}.order-customer-details-content__container--no-margin p{margin-bottom:0}.order-customer-details-content__container-shipping_address{grid-area:2 / 1 / 3 / 2;margin:var(--spacing-medium) 0}.order-customer-details-content__container-billing_address,.order-customer-details-content__container-return-information{grid-area:2 / 2 / 3 / 3;margin:var(--spacing-medium) 0}.order-customer-details-content__container-billing_address--fullwidth{grid-area:2 / 1 / 3 / 3}.order-customer-details-content__container-shipping_methods{grid-area:3 / 1 / 4 / 2}.order-customer-details-content__container-payment_methods{grid-area:3 / 2 / 4 / 3}.order-customer-details-content__container-payment_methods--fullwidth{grid-area:3 / 1 / 4 / 3}}.order-customer-details-content__container-title{font:var(--type-body-1-strong-font);letter-spacing:var(--type-body-1-strong-letter-spacing);margin:0 0 var(--spacing-xsmall) 0}.order-customer-details-content__container p{color:var(--color-neutral-800);font:var(--type-body-2-default-font);letter-spacing:var(--type-body-2-default-letter-spacing);margin-top:0}.order-customer-details-content__container-payment_methods p{display:grid;gap:0;grid-template-columns:auto 1fr}.order-customer-details-content__container-payment_methods p.order-customer-details-content__container-payment_methods--icon{gap:0 var(--spacing-xsmall)}.order-customer-details-content__container-description p{margin:0 var(--spacing-xsmall) 0 0;line-height:var(--spacing-big);padding:0}.order-customer-details-content__container-description p:nth-child(1),.order-customer-details-content__container-description p:nth-child(3),.order-customer-details-content__container-description p:nth-child(4),.order-customer-details-content__container-description p:nth-child(6){float:left}.order-customer-details-content__container-return-information .order-customer-details-content__container-description p{float:none;display:block}.order-empty-list{margin-bottom:var(--spacing-small)}.order-empty-list.order-empty-list--minified,.order-empty-list .dropin-card{border:none}.order-empty-list .dropin-card__content{gap:0;padding:var(--spacing-xxbig)}.order-empty-list.order-empty-list--minified .dropin-card__content{flex-direction:row;align-items:center;padding:var(--spacing-big) var(--spacing-small)}.order-empty-list .dropin-card__content svg{width:64px;height:64px;margin-bottom:var(--spacing-medium)}.order-empty-list.order-empty-list--minified .dropin-card__content svg{margin:0 var(--spacing-small) 0 0;width:32px;height:32px}.order-empty-list .dropin-card__content svg path{fill:var(--color-neutral-800)}.order-empty-list.order-empty-list--minified .dropin-card__content svg path{fill:var(--color-neutral-500)}.order-empty-list--empty-box .dropin-card__content svg path{fill:var(--color-neutral-500)}.order-empty-list .dropin-card__content p{font:var(--type-headline-1-font);letter-spacing:var(--type-headline-1-letter-spacing);color:var(--color-neutral-800)}.order-empty-list.order-empty-list--minified .dropin-card__content p{font:var(--type-body-1-strong-font);color:var(--color-neutral-800)}.invoice-details-content{display:flex;flex-direction:column;gap:var(--spacing-medium)}.invoice-details-content__back-link{color:var(--color-neutral-700);font:var(--type-body-2-default-font);text-decoration:none}.invoice-details-content__back-link:hover{text-decoration:underline}.invoice-details-content__title-row{display:flex;align-items:center;justify-content:space-between;gap:var(--spacing-medium)}.invoice-details-content__title{display:flex;align-items:center;gap:var(--spacing-small)}.invoice-details-content__title-icon{display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:var(--shape-border-radius-small);border:1px solid var(--color-neutral-300);color:var(--color-neutral-700)}.invoice-details-content__invoice-number{font:var(--type-heading-4-font);margin:0}.invoice-details-content__meta-card .dropin-card__content{gap:0}.invoice-details-content__meta-row{display:flex;align-items:center;justify-content:space-between;gap:var(--spacing-medium);padding:var(--spacing-small) 0;border-bottom:1px solid var(--color-neutral-300)}.invoice-details-content__meta-row:last-child{border-bottom:none}.invoice-details-content__meta-label{color:var(--color-neutral-600);font:var(--type-details-overline-font);letter-spacing:var(--type-details-overline-letter-spacing);text-transform:uppercase}.invoice-details-content__meta-value{color:var(--color-neutral-900);font:var(--type-body-2-emphasized-font)}.invoice-details-content__status{display:inline-block;font:var(--type-details-caption-1-font);border-radius:var(--shape-border-radius-small);padding:var(--spacing-xxsmall) var(--spacing-small);white-space:nowrap}.invoice-details-content__status--positive{background-color:var(--color-positive-200);color:var(--color-positive-800)}.invoice-details-content__status--informational{background-color:var(--color-informational-200);color:var(--color-informational-800)}.invoice-details-content__status--warning{background-color:var(--color-warning-200);color:var(--color-warning-800)}.invoice-details-content__status--alert{background-color:var(--color-alert-200);color:var(--color-alert-800)}.invoice-details-content__status--neutral{background-color:var(--color-neutral-200);color:var(--color-neutral-800)}.invoice-details-content__addresses{display:flex;flex-wrap:wrap;gap:var(--spacing-medium)}.invoice-details-content__address{flex:1 1 240px}.invoice-details-content__address-title{color:var(--color-neutral-600);font:var(--type-details-overline-font);letter-spacing:var(--type-details-overline-letter-spacing);text-transform:uppercase;margin:0 0 var(--spacing-small) 0}.invoice-details-content__address-lines{font-style:normal;color:var(--color-neutral-800)}.invoice-details-content__items-card .dropin-card__content{gap:var(--spacing-small)}.invoice-details-content__items-table{width:100%;border-collapse:collapse}.invoice-details-content__items-table th{text-align:left;color:var(--color-neutral-600);font:var(--type-body-2-default-font);padding:var(--spacing-xxsmall) var(--spacing-small);border-bottom:1px solid var(--color-neutral-300)}.invoice-details-content__items-table th:nth-child(2),.invoice-details-content__items-table td:nth-child(2){text-align:left}.invoice-details-content__items-table th:nth-child(n+3),.invoice-details-content__items-table td:nth-child(n+3){text-align:right}.invoice-details-content__items-table td{padding:var(--spacing-small);border-bottom:1px solid var(--color-neutral-300);vertical-align:top}.invoice-details-content__item-name{color:var(--color-neutral-900);font:var(--type-body-2-emphasized-font)}.invoice-details-content__item-sku{color:var(--color-neutral-600);font:var(--type-details-caption-1-font)}.invoice-details-content__totals{display:flex;flex-direction:column;gap:var(--spacing-xxsmall);max-width:320px;margin-left:auto;padding-top:var(--spacing-small)}.invoice-details-content__totals-row{display:flex;align-items:baseline;justify-content:space-between;gap:var(--spacing-small)}.order-order-actions__wrapper{display:flex;justify-content:space-between;gap:0 var(--spacing-small);margin-bottom:var(--spacing-small);margin-top:var(--spacing-medium)}.order-order-actions__wrapper button{width:100%;font:var(--type-body-1-strong-font);letter-spacing:var(--type-body-1-default-letter-spacing);cursor:pointer}.order-order-actions__wrapper--empty{display:none}.order-order-cancel-reasons-form__text{text-align:left;color:var(--color-neutral-800);font:var(--type-details-caption-1-font);letter-spacing:var(--type-details-caption-1-letter-spacing);padding-bottom:var(--spacing-xsmall)}.order-order-cancel-reasons-form__button-container{display:grid;margin-top:var(--spacing-xbig);justify-content:end}.order-order-cancel__modal{margin:auto}.order-order-cancel__modal .dropin-modal__header{display:grid;grid-template-columns:1fr auto}.order-order-cancel__title{color:var(--color-neutral-900);font:var(--type-headline-2-strong-font);letter-spacing:var(--type-headline-2-strong-letter-spacing)}.order-order-cancel__text{color:var(--color-neutral-800);font:var(--type-details-caption-1-font);letter-spacing:var(--type-details-caption-1-letter-spacing);padding-bottom:var(--spacing-xsmall)}.order-order-cancel__modal .dropin-modal__header-close-button{align-self:center}.order-order-cancel__button-container{display:grid;margin-top:var(--spacing-xbig);justify-content:end}@media only screen and (min-width: 768px){.dropin-modal__body--medium.order-order-cancel__modal>.dropin-modal__header-title{margin:0 var(--spacing-xxbig) var(--spacing-medium)}}.order-order-loaders--card-loader{margin-bottom:var(--spacing-small)}.order-cost-summary-content .dropin-card__content{gap:0}.order-cost-summary-content__description{margin-bottom:var(--spacing-xsmall)}.order-cost-summary-content__description .order-cost-summary-content__description--header,.order-cost-summary-content__description .order-cost-summary-content__description--subheader{display:flex;justify-content:space-between;align-items:center}.order-cost-summary-content__description .order-cost-summary-content__description--header span{color:var(--color-neutral-800);font:var(--type-body-1-default-font);letter-spacing:var(--type-body-1-default-letter-spacing)}.order-cost-summary-content__description--subheader{margin-top:var(--spacing-xxsmall)}.order-cost-summary-content__description--subheader span{font:var(--type-details-caption-2-font);letter-spacing:var(--type-details-caption-2-letter-spacing);color:var(--color-brand-700)}.order-cost-summary-content__description--subtotal .order-cost-summary-content__description--subheader,.order-cost-summary-content__description--shipping .order-cost-summary-content__description--subheader,.order-cost-summary-content__description--printed-card .order-cost-summary-content__description--subheader,.order-cost-summary-content__description--gift-wrapping .order-cost-summary-content__description--subheader{display:flex;justify-content:flex-start;align-items:center;gap:0 var(--spacing-xxsmall)}.order-cost-summary-content__description--subtotal .order-cost-summary-content__description--subheader .dropin-price,.order-cost-summary-content__description--shipping .order-cost-summary-content__description--subheader .dropin-price,.order-cost-summary-content__description--printed-card .order-cost-summary-content__description--subheader .dropin-price,.order-cost-summary-content__description--gift-wrapping .order-cost-summary-content__description--subheader .dropin-price{font:var(--type-details-overline-font);font-weight:700}.order-cost-summary-content__description--discount .order-cost-summary-content__description--header span:last-child{color:var(--color-alert-800)}.order-cost-summary-content__description--discount .order-cost-summary-content__description--subheader span:first-child{display:flex;justify-content:flex-start;align-items:flex-end;gap:0 var(--spacing-xsmall)}.order-cost-summary-content__description--discount .order-cost-summary-content__description--subheader span:first-child span{font:var(--type-details-caption-1-font);letter-spacing:var(--type-details-caption-1-letter-spacing);color:var(--color-neutral-700)}.order-cost-summary-content__description--discount .order-cost-summary-content__description--subheader .dropin-price{font:var(--type-details-caption-1-font);letter-spacing:var(--type-details-caption-1-letter-spacing);color:var(--color-alert-800)}.order-cost-summary-content__description--total{margin-top:var(--spacing-medium)}.order-cost-summary-content__description--total .order-cost-summary-content__description--header span{font:var(--type-body-1-emphasized-font);letter-spacing:var(--type-body-1-emphasized-letter-spacing)}.order-cost-summary-content__accordion .dropin-accordion-section .dropin-accordion-section__content-container{gap:var(--spacing-small);margin:var(--spacing-small) 0}.order-cost-summary-content__accordion-row{display:flex;justify-content:space-between;align-items:center}.order-cost-summary-content__accordion-row p{font:var(--type-body-2-default-font);letter-spacing:var(--type-body-2-default-letter-spacing)}.order-cost-summary-content__accordion-row p:first-child{color:var(--color-neutral-700)}.order-cost-summary-content__accordion .order-cost-summary-content__accordion-row.order-cost-summary-content__accordion-total p:first-child{font:var(--type-body-1-default-font);letter-spacing:var(--type-body-1-default-letter-spacing)}.order-cost-summary-content__description--discount .order-cost-summary-content__description--subheader svg{color:var(--color-neutral-800)}.order-cost-summary-content__description--total-free{text-transform:uppercase;font:var(--type-body-1-emphasized-font);letter-spacing:var(--type-body-1-emphasized-letter-spacing)}.order-header{text-align:center;padding:var(--spacing-xxbig)}.order-header__icon{margin-bottom:var(--spacing-small)}.order-header__title{color:var(--color-neutral-800);font:var(--type-headline-1-font);letter-spacing:var(--type-headline-1-letter-spacing);justify-content:center;margin:0}.order-header__title:first-letter{text-transform:uppercase}.order-header__order{color:var(--color-neutral-700);font:var(--type-details-overline-font);letter-spacing:var(--type-details-overline-letter-spacing);margin:var(--spacing-xxsmall) 0 0 0}.order-header .success-icon{color:var(--color-positive-500)}.order-header-create-account{display:grid;gap:var(--spacing-small);margin-top:var(--spacing-large)}.order-header-create-account__message{font:var(--type-body-2-default-font);letter-spacing:var(--type-body-2-default-letter-spacing);margin:0}.order-header-create-account__button{display:flex;margin:0 auto;text-align:center}.order-order-invoices-card .dropin-card__content{gap:0}.order-order-invoices-card__container{display:block}.order-order-invoices{list-style:none;padding:0;margin:0}.order-order-invoices__empty-state,.order-order-invoices__number,.order-order-invoices__items-count{color:var(--color-neutral-800)}.order-order-invoices__empty-state{font:var(--type-body-2-default-font);letter-spacing:var(--type-body-2-default-letter-spacing);padding:var(--spacing-small) 0;margin:0;list-style:none}.order-order-invoices__item{padding:var(--spacing-small) 0;border-bottom:1px solid var(--color-neutral-300)}.order-order-invoices__item:last-child{border-bottom:none}.order-order-invoices__header{display:flex;align-items:baseline;justify-content:space-between;gap:var(--spacing-xxsmall)}.order-order-invoices__number{font:var(--type-body-2-emphasized-font);letter-spacing:var(--type-body-2-emphasized-letter-spacing)}.order-order-invoices__items-count{font:var(--type-body-1-default-font);letter-spacing:var(--type-body-1-default-letter-spacing);margin:var(--spacing-xxsmall) 0 0 0}@media only screen and (min-width: 768px){.order-order-invoices__item{padding:var(--spacing-medium) 0}}.order-order-product-list-content__items{display:grid;gap:var(--spacing-medium);list-style:none;margin:0 0 var(--spacing-medium) 0;padding:0}.order-order-product-list-content .dropin-card__content{gap:0}.order-order-product-list-content__items .dropin-card__content{gap:var(--spacing-xsmall)}.order-order-product-list-content .dropin-cart-item__alert{margin-top:var(--spacing-xsmall)}.order-order-product-list-content .cart-summary-item__title--strikethrough{text-decoration:line-through;color:var(--color-neutral-500);font:var(--type-body-1-default-font);letter-spacing:var(--type-body-1-default-letter-spacing)}.order-order-product-list-content .cart-summary-item__discount-labels{display:flex;flex-wrap:wrap;gap:var(--spacing-xxsmall);margin-top:var(--spacing-xxsmall)}.order-order-product-list-content .cart-summary-item__discount-label{font:var(--type-details-overline-font);letter-spacing:var(--type-details-overline-letter-spacing);color:var(--color-positive-500, var(--color-brand-700))}@media only screen and (min-width: 320px) and (max-width: 768px){.order-confirmation-cart-summary-item{margin-bottom:var(--spacing-medium)}}.order-order-search-form{gap:var(--spacing-small);border-color:transparent}.order-order-search-form .dropin-card__content{padding:var(--spacing-big) var(--spacing-xxbig) var(--spacing-xxbig) var(--spacing-xxbig)}.order-order-search-form p{color:var(--color-neutral-700);font:var(--type-body-2-default-font);letter-spacing:var(--type-body-2-default-letter-spacing);margin:0}.order-order-search-form__title{color:var(--color-neutral-800);font:var(--type-headline-2-strong-font);letter-spacing:var(--type-headline-2-strong-letter-spacing);margin:0}.order-order-search-form__wrapper{display:grid;grid-template-columns:1fr;grid-template-rows:auto;grid-template-areas:"email" "lastname" "number" "button";gap:var(--spacing-medium)}.order-order-search-form__wrapper__item--email{grid-area:email}.order-order-search-form__wrapper__item--lastname{grid-area:lastname}.order-order-search-form__wrapper__item--number{grid-area:number}.order-order-search-form__button-container{display:flex;justify-content:flex-end;grid-area:button}.order-order-search-form form button{align-self:flex-end;justify-self:flex-end;margin-top:var(--spacing-small)}@media (min-width: 768px){.order-order-search-form__wrapper{grid-template-columns:1fr 1fr;grid-template-rows:auto auto auto;grid-template-areas:"email lastname" "number number" "button button"}}.order-order-status-content .dropin-card__content{gap:0}.order-order-status-content__wrapper .order-order-status-content__wrapper-description p{padding:0;margin:0;box-sizing:border-box;font:var(--type-body-1-default-font);letter-spacing:var(--type-body-1-default-letter-spacing)}.order-order-status-content__wrapper-description{margin-bottom:var(--spacing-medium)}.order-order-status-content__wrapper-description--actions-slot{margin-bottom:0}.order-order-status-content__wrapper .order-order-status-content__wrapper-description .order-order-status-content__admin-assisted{margin-bottom:var(--spacing-small);font-weight:600}.order-return-order-message p{margin:0;padding:0}.order-return-order-message a{max-width:162px;padding:var(--spacing-xsmall)}.order-return-order-message .order-return-order-message__title{font:var(--type-headline-1-font);letter-spacing:var(--type-headline-1-letter-spacing);color:var(--color-neutral-800);margin-bottom:var(--spacing-small)}.order-return-order-message .order-return-order-message__subtitle{font:var(--type-body-2-default-font);letter-spacing:var(--type-body-2-default-letter-spacing);margin-bottom:var(--spacing-xlarge)}.order-create-return .order-create-return_notification{margin-bottom:var(--spacing-medium)}.order-return-order-product-list{list-style:none;margin:0;padding:0}.order-return-order-product-list .order-return-order-product-list__item{display:grid;grid-template-columns:auto 1fr;align-items:start;margin-bottom:var(--spacing-medium);position:relative}.order-return-order-product-list__item--blur:before{content:"";position:absolute;width:100%;height:100%;background-color:var(--color-opacity-24);z-index:1}.order-return-order-product-list>.order-return-order-product-list__item:last-child{display:flex;justify-content:flex-end}.order-return-order-product-list>.order-return-order-product-list__item .dropin-cart-item__alert{margin-top:var(--spacing-xsmall)}.order-return-order-product-list>.order-return-order-product-list__item .cart-summary-item__title--strikethrough{text-decoration:line-through;color:var(--color-neutral-500);font:var(--type-body-1-default-font);letter-spacing:var(--type-body-1-default-letter-spacing)}.order-create-return .dropin-cart-item__footer .dropin-incrementer.dropin-incrementer--medium{max-width:160px}.order-return-order-product-list .dropin-incrementer__button-container{margin:0}@media only screen and (min-width: 320px) and (max-width: 768px){.order-return-order-product-list>.order-return-order-product-list__item{margin-bottom:var(--spacing-medium)}}.order-return-reason-form .dropin-cart-item,.order-return-reason-form form .dropin-field{margin-bottom:var(--spacing-medium)}.order-return-reason-form .order-return-reason-form__actions{display:flex;gap:0 var(--spacing-medium);justify-content:flex-end;margin-bottom:0}.order-returns-list-content .order-returns__header--minified{margin-bottom:var(--spacing-small)}.order-returns-list-content .order-returns__header--full-size{margin-bottom:0}.order-returns-list-content__cards-list{margin-bottom:var(--spacing-small)}.order-returns-list-content__cards-list .dropin-card__content{gap:0}.order-returns-list-content__cards-grid{display:grid;grid-template-columns:1fr 1fr auto;gap:0px 0px;grid-template-areas:"descriptions descriptions actions" "images images actions"}.order-returns-list-content__descriptions{grid-area:descriptions}.order-returns-list-content__descriptions p{margin:0 0 var(--spacing-small) 0;padding:0;box-sizing:border-box;font:var(--type-body-1-default-font);letter-spacing:var(--type-body-1-default-letter-spacing);color:var(--color-neutral-800)}.order-returns-list-content__descriptions p a{display:inline-block;font:var(--type-button-2-font);letter-spacing:var(--type-button-2-letter-spacing);color:var(--color-brand-800)}.order-returns-list-content__descriptions p a:hover{color:var(--color-brand-800)}.order-returns-list-content__descriptions .order-returns-list-content__return-status{font:var(--type-button-2-font);font-weight:500;color:var(--color-neutral-800)}.order-returns-list-content .order-returns-list-content__actions{margin:0;padding:0;border:none;background-color:transparent;cursor:pointer;text-decoration:none}.order-returns-list-content a.order-returns-list-content__actions{display:inline-block;width:100%}.order-returns-list-content .order-returns-list-content__actions:hover{text-decoration:none;color:var(--color-brand-500)}.order-returns-list-content__card .dropin-card__content{padding:var(--spacing-small) var(--spacing-medium)}.order-returns-list-content__card .order-returns-list-content__card-wrapper{display:flex;justify-content:space-between;align-items:center;color:var(--color-neutral-800);height:calc(88px - var(--spacing-small) * 2)}.order-returns-list-content__card-wrapper>p{font:var(--type-button-2-font);letter-spacing:var(--type-button-2-letter-spacing)}.order-returns-list-content__card-wrapper svg{color:var(--color-neutral-800)}.order-returns-list-content__images{margin-top:var(--spacing-small);grid-area:images}.order-returns-list-content__actions{grid-area:actions;align-self:center}.order-returns-list-content .order-returns-list-content__images,.order-returns-list-content .dropin-content-grid{overflow:auto}.order-returns-list-content hr.dropin-divider.dropin-divider--secondary:last-child{display:none}.order-returns-list-content .dropin-accordion-section__content-container{margin-bottom:var(--spacing-small)}.order-returns-list-content .order-returns-list-content__images .dropin-content-grid__content{grid-template-columns:repeat(6,max-content)!important}.order-returns-list-content .order-returns-list-content__images-3 .dropin-content-grid__content{grid-template-columns:repeat(3,max-content)!important}.order-returns-list-content .order-returns-list-content__images img{object-fit:contain;width:85px;height:114px}.order-shipping-status-card+.order-shipping-status-card{margin-top:var(--spacing-medium)}.order-shipping-status-card .dropin-card__content{gap:0}.order-shipping-status-card .dropin-content-grid{overflow:auto}.order-shipping-status-card hr.dropin-divider.dropin-divider--secondary:last-child{display:none}.order-shipping-status-card>.dropin-card__content>.dropin-header-container+.dropin-accordion>hr.dropin-divider:first-child{display:none}.order-shipping-status-card .dropin-accordion-section__content-container{margin-bottom:var(--spacing-small)}.order-shipping-status-card--count-steper{font:var(--type-headline-2-strong-font);letter-spacing:var(--type-headline-2-strong-letter-spacing)}.order-shipping-status-card__header{display:grid;grid-template-columns:1fr auto;justify-items:self-start;align-items:center;padding:var(--spacing-xsmall) 0}.order-shipping-status-card__header button{max-height:40px}.order-shipping-status-card__header--content{display:grid;gap:var(--spacing-xsmall)}.order-shipping-status-card__header--content p,.order-shipping-status-card--return-order p{margin:0;padding:0;box-sizing:border-box;font:var(--type-body-1-default-font);letter-spacing:var(--type-body-1-default-letter-spacing)}.order-shipping-status-card--return-order p a{display:inline-block;font:var(--type-button-2-font);letter-spacing:var(--type-button-2-letter-spacing);color:var(--color-brand-800)}.order-shipping-status-card--return-order p a:hover{text-decoration:none;color:var(--color-brand-800)}.order-shipping-status-card .order-shipping-status-card__images .dropin-content-grid__content{grid-template-columns:repeat(6,max-content)!important;align-items:start}.order-shipping-status-card.order-shipping-status-card--return-order .dropin-content-grid.order-shipping-status-card__images{overflow:auto!important}.order-shipping-status-card .order-shipping-status-card__images img{display:block;object-fit:contain;width:85px;height:114px}.order-order-comments-card .dropin-card__content{gap:0}.order-order-comments-card__container{display:block}.order-order-comments{list-style:none;padding:0;margin:0}.order-order-comments__empty-state{color:var(--color-neutral-800);font:var(--type-body-2-default-font);letter-spacing:var(--type-body-2-default-letter-spacing);padding:var(--spacing-small) 0;margin:0;list-style:none}.order-order-comments__item{padding:var(--spacing-small) 0;border-bottom:1px solid var(--color-neutral-300)}.order-order-comments__item:last-child{border-bottom:none}.order-order-comments__header{display:flex;align-items:baseline;margin-bottom:var(--spacing-xxsmall);gap:var(--spacing-xxsmall)}.order-order-comments__date{font:var(--type-body-2-emphasized-font);letter-spacing:var(--type-body-2-emphasized-letter-spacing);color:var(--color-neutral-800);white-space:nowrap}@media only screen and (max-width: 480px){.order-order-comments__date{white-space:normal;word-break:keep-all}}.order-order-comments__text{font:var(--type-body-1-default-font);letter-spacing:var(--type-body-1-default-letter-spacing);color:var(--color-neutral-800);margin:0;word-wrap:break-word}@media only screen and (min-width: 768px){.order-order-comments__item{padding:var(--spacing-medium) 0}}', { styleId: "order" });
export {
  un as CreateReturn,
  mn as CustomerDetails,
  fn as InvoiceDetails,
  lr as OrderCancelForm,
  Ln as OrderComments,
  pn as OrderCostSummary,
  _n as OrderHeader,
  Sn as OrderInvoices,
  yn as OrderProductList,
  Cn as OrderReturns,
  xn as OrderSearch,
  On as OrderStatus,
  wn as ReturnsList,
  Nn as ShippingStatus
};
//# sourceMappingURL=containers.js.map
