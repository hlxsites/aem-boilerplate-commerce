/*! Copyright 2025 Adobe
All Rights Reserved. */
import{verifyReCaptcha as a}from"@dropins/tools/recaptcha.js";import"@dropins/tools/event-bus.js";import"@dropins/tools/fetch-graphql.js";import{a as e}from"./network-error.js";const c=async()=>{const t=await a();t&&e("X-ReCaptcha",t)};export{c as s};
