import { getCookie } from '@dropins/tools/lib.js';

export function checkIsAuthenticated() {
    return !!getCookie('auth_dropin_user_token') ?? false;
}