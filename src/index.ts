import { Result, fetchApi, staticUrl } from '@innexgo/frontend-common';

export interface Info {
  service: String,
  versionMajor: number,
  versionMinor: number,
  versionRev: number,
  appPubApiHref: string,
  appAuthenticatorHref: string,
  permittedOrigins: string[],
}

export interface VerificationChallenge {
  creationTime: number,
  toParent: boolean,
  email: string,
}

export interface User {
  userId: number,
  creationTime: number,
}

export interface UserData {
  userDataId: number,
  creationTime: number,
  creatorUserId: number,
  realname: string,
  username: string,
  dateofbirth: number,
}

export interface Email {
  emailId: number,
  creationTime: number,
  verificationChallenge: VerificationChallenge
}

export interface PasswordReset {
  creationTime: number;
}

export type Password = {
  passwordId: number,
  creationTime: number,
  creatorUserId: number,
  passwordReset?: PasswordReset
}

export type ApiKeyKind = "VALID" | "NO_EMAIL" | "NO_PARENT" | "CANCEL";

export interface ApiKey {
  apiKeyId: number,
  creationTime: number,
  creatorUserId: number,
  duration: number, // only valid if ApiKeyKind isn't CANCEL
  key: string, // only valid if ApiKeyKind isn't CANCEL
  apiKeyKind: ApiKeyKind,
}

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
] as const;

// Creates a union type
export type AuthErrorCode = typeof AuthErrorCodes[number];

async function fetchApiOrNetworkError<T>(url: string, props: object): Promise<Result<T, AuthErrorCode>> {
  try {
    const [code, resp] = await fetchApi(url, props);
    if (code >= 200 && code < 300) {
      return { Ok: resp }
    } else {
      return { Err: resp }
    }
  } catch (_) {
    return { Err: "NETWORK" };
  }
}

const undefToAuthApi = (s: string | undefined) =>
  s === undefined ? `${staticUrl()}/public/` : s

export function info(server?: string): Promise<Result<Info, AuthErrorCode>> {
  return fetchApiOrNetworkError(undefToAuthApi(server) + "info", {});
}


export type ApiKeyNewWithEmailProps = {
  email: string,
  password: string,
  duration: number,
}

export function apiKeyNewWithEmail(props: ApiKeyNewWithEmailProps, server?: string): Promise<Result<ApiKey, AuthErrorCode>> {
  return fetchApiOrNetworkError(undefToAuthApi(server) + "api_key/new_with_email", props);
}

export type ApiKeyNewWithUsernameProps = {
  username: string,
  password: string,
  duration: number,
}

export function apiKeyNewWithUsername(props: ApiKeyNewWithUsernameProps, server?: string): Promise<Result<ApiKey, AuthErrorCode>> {
  return fetchApiOrNetworkError(undefToAuthApi(server) + "api_key/new_with_username", props);
}

export type ApiKeyNewCancelProps = {
  apiKeyToCancel: string,
  apiKey: string,
}

export function apiKeyNewCancel(props: ApiKeyNewCancelProps, server?: string): Promise<Result<ApiKey, AuthErrorCode>> {
  return fetchApiOrNetworkError(undefToAuthApi(server) + "api_key/new_cancel", props);
}

export type VerificationChallengeNewProps = {
  email: string,
  toParent: boolean,
  apiKey: string,
};

export function verificationChallengeNew(props: VerificationChallengeNewProps, server?: string): Promise<Result<VerificationChallenge, AuthErrorCode>> {
  return fetchApiOrNetworkError(undefToAuthApi(server) + "verification_challenge/new", props);
}

export type EmailNewProps = {
  verificationChallengeKey: string,
  toParent: boolean,
};

export function emailNew(props: EmailNewProps, server?: string): Promise<Result<Email, AuthErrorCode>> {
  return fetchApiOrNetworkError(undefToAuthApi(server) + "email/new", props);
}

export type UserNewProps = {
  username: string,
  realname: string,
  password: string,
  dateofbirth: number,
  apiKeyDuration: number,
};

export function userNew(props: UserNewProps, server?: string): Promise<Result<ApiKey, AuthErrorCode>> {
  return fetchApiOrNetworkError(undefToAuthApi(server) + "user/new", props);
}

export type UserDataNewProps = {
  username: string,
  realname: string,
  dateofbirth: number,
  apiKey: string
};

export function userDataNew(props: UserDataNewProps, server?: string): Promise<Result<UserData, AuthErrorCode>> {
  return fetchApiOrNetworkError(undefToAuthApi(server) + "user_data/new", props);
}

export type PasswordResetNewProps = {
  email: string,
};

export function passwordResetNew(props: PasswordResetNewProps, server?: string): Promise<Result<PasswordReset, AuthErrorCode>> {
  return fetchApiOrNetworkError(undefToAuthApi(server) + "password_reset/new", props);
}

export type PasswordNewChangeProps = {
  oldPassword: string,
  newPassword: string,
  apiKey: string
}

export function passwordNewChange(props: PasswordNewChangeProps, server?: string): Promise<Result<Password, AuthErrorCode>> {
  return fetchApiOrNetworkError(undefToAuthApi(server) + "password/new_change", props);
}

export type PasswordNewResetProps = {
  passwordResetKey: string,
  newPassword: string
}

export function passwordNewReset(props: PasswordNewResetProps, server?: string): Promise<Result<Password, AuthErrorCode>> {
  return fetchApiOrNetworkError(undefToAuthApi(server) + "password/new_reset", props);
}

export type UserViewProps = {
  userId?: number[],
  minCreationTime?: number,
  maxCreationTime?: number,
  apiKey: string,
}


export function userView(props: UserViewProps, server?: string): Promise<Result<User[], AuthErrorCode>> {
  return fetchApiOrNetworkError(undefToAuthApi(server) + "user/view", props);
}

export type UserDataViewProps = {
  userDataId?: number[],
  minCreationTime?: number,
  maxCreationTime?: number,
  creatorUserId?: number[],
  minDateofbirth?: number,
  maxDateofbirth?: number,
  username?: string[],
  realname?: string[],
  onlyRecent: boolean,
  apiKey: string,
}


export function userDataView(props: UserDataViewProps, server?: string): Promise<Result<UserData[], AuthErrorCode>> {
  return fetchApiOrNetworkError(undefToAuthApi(server) + "user_data/view", props);
}

export type EmailViewProps = {
  emailId?: number[],
  minCreationTime?: number,
  maxCreationTime?: number,
  toParent: boolean,
  onlyRecent: boolean,
  creatorUserId?: number[],
  email?: string[],
  apiKey: string,
}

export function emailView(props: EmailViewProps, server?: string): Promise<Result<Email[], AuthErrorCode>> {
  return fetchApiOrNetworkError(undefToAuthApi(server) + "email/view", props);
}

export type PasswordViewProps = {
  passwordId?: number[],
  minCreationTime?: number,
  maxCreationTime?: number,
  creatorUserId?: number[],
  fromReset?: boolean,
  onlyRecent: boolean,
  apiKey: string,
}

export function passwordView(props: PasswordViewProps, server?: string): Promise<Result<Password[], AuthErrorCode>> {
  return fetchApiOrNetworkError(undefToAuthApi(server) + "password/view", props);
}

export type ApiKeyViewProps = {
  apiKeyId?: number[],
  creationTime?: number,
  minCreationTime?: number,
  maxCreationTime?: number,
  creatorUserId?: number[],
  duration?: number,
  minDuration?: number,
  maxDuration?: number,
  apiKeyKind?: ApiKeyKind[],
  onlyRecent: boolean,
  apiKey: string,
}

export function apiKeyView(props: ApiKeyViewProps, server?: string): Promise<Result<ApiKey[], AuthErrorCode>> {
  return fetchApiOrNetworkError(undefToAuthApi(server) + "api_key/view", props);
}
