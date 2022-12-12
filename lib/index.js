var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchApi, apiUrl } from '@innexgo/frontend-common';
export const AuthErrorCodes = [
    "NO_CAPABILITY",
    "API_KEY_UNAUTHORIZED",
    "NO_PERMISSION",
    "PASSWORD_INCORRECT",
    "PASSWORD_INSECURE",
    "PASSWORD_CANNOT_CREATE_FOR_OTHERS",
    "USER_NONEXISTENT",
    "USER_DATA_NONEXISTENT",
    "API_KEY_NONEXISTENT",
    "USER_USERNAME_INVALID",
    "USER_USERNAME_TAKEN",
    "USER_REALNAME_INVALID",
    "USER_DATEOFBIRTH_INVALID",
    "NEGATIVE_DURATION",
    "CANNOT_ALTER_PAST",
    "VERIFICATION_CHALLENGE_NONEXISTENT",
    "VERIFICATION_CHALLENGE_TIMED_OUT",
    "VERIFICATION_CHALLENGE_USED",
    "VERIFICATION_CHALLENGE_WRONG_KIND",
    "PASSWORD_EXISTENT",
    "PASSWORD_NONEXISTENT",
    "EMAIL_EXISTENT",
    "EMAIL_NONEXISTENT",
    "PASSWORD_RESET_NONEXISTENT",
    "PASSWORD_RESET_TIMED_OUT",
    "EMAIL_BOUNCED",
    "EMAIL_COOLDOWN",
    "DECODE_ERROR",
    "INTERNAL_SERVER_ERROR",
    "METHOD_NOT_ALLOWED",
    "BAD_REQUEST",
    "NOT_FOUND",
    "UNKNOWN",
    "NETWORK",
];
function fetchApiOrNetworkError(url, props) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [code, resp] = yield fetchApi(url, props);
            if (code >= 200 && code < 300) {
                return { Ok: resp };
            }
            else {
                return { Err: resp };
            }
        }
        catch (_) {
            return { Err: "NETWORK" };
        }
    });
}
const undefToStr = (s) => s === undefined ? apiUrl() : s;
export function apiKeyNewWithEmail(props, server) {
    return fetchApiOrNetworkError(undefToStr(server) + "auth/api_key/new_with_email", props);
}
export function apiKeyNewWithUsername(props, server) {
    return fetchApiOrNetworkError(undefToStr(server) + "auth/api_key/new_with_username", props);
}
export function apiKeyNewCancel(props, server) {
    return fetchApiOrNetworkError(undefToStr(server) + "auth/api_key/new_cancel", props);
}
export function verificationChallengeNew(props, server) {
    return fetchApiOrNetworkError(undefToStr(server) + "auth/verification_challenge/new", props);
}
export function emailNew(props, server) {
    return fetchApiOrNetworkError(undefToStr(server) + "auth/email/new", props);
}
export function userNew(props, server) {
    return fetchApiOrNetworkError(undefToStr(server) + "auth/user/new", props);
}
export function userDataNew(props, server) {
    return fetchApiOrNetworkError(undefToStr(server) + "auth/user_data/new", props);
}
export function passwordResetNew(props, server) {
    return fetchApiOrNetworkError(undefToStr(server) + "auth/password_reset/new", props);
}
export function passwordNewChange(props, server) {
    return fetchApiOrNetworkError(undefToStr(server) + "auth/password/new_change", props);
}
export function passwordNewReset(props, server) {
    return fetchApiOrNetworkError(undefToStr(server) + "auth/password/new_reset", props);
}
export function userView(props, server) {
    return fetchApiOrNetworkError(undefToStr(server) + "auth/user/view", props);
}
export function userDataView(props, server) {
    return fetchApiOrNetworkError(undefToStr(server) + "auth/user_data/view", props);
}
export function emailView(props, server) {
    return fetchApiOrNetworkError(undefToStr(server) + "auth/email/view", props);
}
export function passwordView(props, server) {
    return fetchApiOrNetworkError(undefToStr(server) + "auth/password/view", props);
}
export function apiKeyView(props, server) {
    return fetchApiOrNetworkError(undefToStr(server) + "auth/api_key/view", props);
}
