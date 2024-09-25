/* eslint-disable import/no-unresolved */
import { getCookie } from './configs.js';

export default () => !!getCookie('auth_dropin_user_token') ?? false;
