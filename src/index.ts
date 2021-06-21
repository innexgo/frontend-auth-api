import { Result, fetchApi } from '@innexgo/frontend-common';
export interface VerificationChallenge {
  creationTime: number,
  name: string,
  email: string,
}

export interface User {
  userId: number,
  creationTime: number,
  name: string,
  email: string,
}

export interface PasswordReset {
  creationTime: number;
}

export type PasswordKind = "CHANGE" | "RESET" | "CANCEL";

export type Password = {
  passwordId: number,
  creationTime: number,
  creator: User,
  user: User,
  kind: PasswordKind,
}

export type ApiKeyKind = "VALID" | "CANCEL";

export interface ApiKey {
  apiKeyId: number,
  creationTime: number,
  creator: User,
  duration: number, // only valid if ApiKeyKind isn't CANCEL
  key: string, // only valid if ApiKeyKind isn't CANCEL
  apiKeyKind: ApiKeyKind,
}

export interface AuthenticatedComponentProps {
  apiKey: ApiKey
  setApiKey: (data: ApiKey | null) => void
}

export const AuthErrorCodes = [
  "NO_CAPABILITY",
  "API_KEY_UNAUTHORIZED",
  "PASSWORD_INCORRECT",
  "PASSWORD_INSECURE",
  "PASSWORD_CANNOT_CREATE_FOR_OTHERS",
  "USER_NONEXISTENT",
  "API_KEY_NONEXISTENT",
  "USER_EXISTENT",
  "USER_NAME_EMPTY",
  "USER_EMAIL_EMPTY",
  "USER_EMAIL_INVALIDATED",
  "NEGATIVE_DURATION",
  "CANNOT_ALTER_PAST",
  "VERIFICATION_CHALLENGE_NONEXISTENT",
  "VERIFICATION_CHALLENGE_TIMED_OUT",
  "PASSWORD_RESET_NONEXISTENT",
  "PASSWORD_EXISTENT",
  "PASSWORD_NONEXISTENT",
  "PASSWORD_RESET_TIMED_OUT",
  "EMAIL_BOUNCED",
  "EMAIL_UNKNOWN",
  "NETWORK_ERROR",
  "DECODE_ERROR",
  "INTERNAL_SERVER_ERROR",
  "METHOD_NOT_ALLOWED",
  "BAD_REQUEST",
  "NOT_FOUND",
  "UNKNOWN",
] as const;

// Creates a union type
export type AuthErrorCode = typeof AuthErrorCodes[number];

async function fetchApiOrNetworkError<T>(url: string, props: object): Promise<Result<T, AuthErrorCode>> {
  try {
    return await fetchApi(url, props);
  } catch (_) {
    return { Err: "NETWORK_ERROR" };
  }
}

export type ValidApiKeyNewProps = {
  userEmail: string,
  userPassword: string,
  duration: number,
}

export function apiKeyNewValid(props: ValidApiKeyNewProps): Promise<Result<ApiKey, AuthErrorCode>> {
  return fetchApiOrNetworkError("auth/api_key/new_valid/", props);
}

export type ApiKeyNewCancelProps = {
  apiKeyToCancel: string,
  apiKey: string,
}

export function apiKeyNewCancel(props: ApiKeyNewCancelProps): Promise<Result<ApiKey, AuthErrorCode>> {
  return fetchApi("auth/api_key/new_cancel/", props);
}

export type VerificationChallengeNewProps = {
  userName: string,
  userEmail: string,
  userPassword: string,
};

export function verificationChallengeNew(props: VerificationChallengeNewProps): Promise<Result<VerificationChallenge, AuthErrorCode>> {
  return fetchApiOrNetworkError("auth/verification_challenge/new/", props);
}

export type UserNewProps = {
  verificationChallengeKey: string,
};

export function userNew(props: UserNewProps): Promise<Result<User, AuthErrorCode>> {
  return fetchApiOrNetworkError("auth/user/new/", props);
}

export type PasswordResetNewProps = {
  userEmail: string,
};

export function passwordResetNew(props: PasswordResetNewProps): Promise<Result<PasswordReset, AuthErrorCode>> {
  return fetchApiOrNetworkError("auth/password_reset/new/", props);
}

export type PasswordNewChangeProps = {
  oldPassword: string,
  newPassword: string,
  apiKey: string
}

export function passwordNewChange(props: PasswordNewChangeProps): Promise<Result<Password, AuthErrorCode>> {
  return fetchApiOrNetworkError("auth/password/new_change/", props);
}

export type PasswordNewCancelProps = {
  apiKey: string
}

export function passwordNewCancel(props: PasswordNewCancelProps): Promise<Result<Password, AuthErrorCode>> {
  return fetchApiOrNetworkError("auth/password/new_cancel/", props);
}


export type PasswordNewResetProps = {
  passwordResetKey: string,
  newPassword: string
}

export function passwordNewReset(props: PasswordNewResetProps): Promise<Result<Password, AuthErrorCode>> {
  return fetchApiOrNetworkError("auth/password/new_reset/", props);
}

export type UserViewProps = {
  userId?: number, //
  creationTime?: number, //
  minCreationTime?: number, //
  maxCreationTime?: number, //
  userName?: string, //
  partialUserName?: string, //
  userEmail?: string, //
  offset?: number,
  count?: number,
  apiKey: string,
}


export function userView(props: UserViewProps): Promise<Result<User[], AuthErrorCode>> {
  return fetchApiOrNetworkError("auth/user/view", props);
}

export type PasswordViewProps = {
  passwordId?: number, //
  creationTime?: number, //
  minCreationTime?: number, //
  maxCreationTime?: number, //
  creatorUserId?: number, //
  userId?: number, //
  passwordKind?: PasswordKind, //
  onlyRecent: boolean,
  offset?: number,
  count?: number,
  apiKey: string,
}

export function passwordView(props: PasswordViewProps): Promise<Result<Password[], AuthErrorCode>> {
  return fetchApiOrNetworkError("auth/password/view", props);
}


export type ApiKeyViewProps = {
  apiKeyId?: number, //
  creatorUserId?: number, //
  creationTime?: number, //
  minCreationTime?: number, //
  maxCreationTime?: number, //
  duration?: number, //
  minDuration?: number, //
  maxDuration?: number, //
  apiKeyKind?: ApiKeyKind, //
  onlyRecent: boolean, //
  offset?: number,
  count?: number,
  apiKey: string,
}

export function apiKeyView(props: ApiKeyViewProps): Promise<Result<ApiKey[], AuthErrorCode>> {
  return fetchApiOrNetworkError("auth/api_key/view", props);
}

export function isAuthErrorCode(maybeAuthErrorCode: any): maybeAuthErrorCode is AuthErrorCode {
  return typeof maybeAuthErrorCode === 'string' && AuthErrorCodes.includes(maybeAuthErrorCode as any);
}

export const isPasswordValid = (pass: string) => pass.length >= 8 && /\d/.test(pass);
