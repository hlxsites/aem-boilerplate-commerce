/*! Copyright 2025 Adobe
All Rights Reserved. */
import{verifyReCaptcha as a}from"@dropins/tools/recaptcha.js";import"@dropins/tools/event-bus.js";import{s as e}from"./network-error.js";const p=async()=>{const t=await a();t&&e("X-ReCaptcha",t)};export{p as s};
//# sourceMappingURL=setReCaptchaToken.js.map
