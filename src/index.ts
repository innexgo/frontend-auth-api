import { Result, fetchApi } from '@innexgo/frontend-common';
export interface VerificationChallenge {
  creationTime: number,
  to_parent: boolean,
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
  name: string
}

export interface Email {
  emailId: number,
  creationTime: number,
  creatorUserId: number,
  verificationChallenge: VerificationChallenge
}

export interface ParentPermission {
  parentPermissionId: number,
  creationTime: number,
  userId: number,
  // if this is absent, then it means that the user said they were over 13
  verificationChallenge?: VerificationChallenge
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

export type ApiKeyKind = "VALID" | "CANCEL";

export interface ApiKey {
  apiKeyId: number,
  creationTime: number,
  creatorUserId: number,
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
  "NO_PERMISSION",
  "PASSWORD_INCORRECT",
  "PASSWORD_INSECURE",
  "PASSWORD_CANNOT_CREATE_FOR_OTHERS",
  "USER_NONEXISTENT",
  "USER_DATA_NONEXISTENT",
  "API_KEY_NONEXISTENT",
  "USER_EXISTENT",
  "USER_NAME_EMPTY",
  "USER_EMAIL_EMPTY",
  "USER_EMAIL_INVALIDATED",
  "NEGATIVE_DURATION",
  "CANNOT_ALTER_PAST",
  "VERIFICATION_CHALLENGE_NONEXISTENT",
  "VERIFICATION_CHALLENGE_TIMED_OUT",
  "VERIFICATION_CHALLENGE_USED",
  "VERIFICATION_CHALLENGE_WRONG_KIND",
  "PARENT_PERMISSION_NONEXISTENT",
  "PARENT_PERMISSION_EXISTENT",
  "PASSWORD_EXISTENT",
  "PASSWORD_NONEXISTENT",
  "EMAIL_EXISTENT",
  "EMAIL_NONEXISTENT",
  "PASSWORD_RESET_NONEXISTENT",
  "PASSWORD_RESET_TIMED_OUT",
  "EMAIL_BOUNCED",
  "EMAIL_UNKNOWN",
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
    return await fetchApi(url, props);
  } catch (_) {
    return { Err: "NETWORK" };
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
  email: string,
  toParent: boolean,
  apiKey: string,
};

export function verificationChallengeNew(props: VerificationChallengeNewProps): Promise<Result<VerificationChallenge, AuthErrorCode>> {
  return fetchApiOrNetworkError("auth/verification_challenge/new/", props);
}

export type EmailNewProps = {
  verificationChallengeKey: string,
};

export function emailNew(props: EmailNewProps): Promise<Result<Email, AuthErrorCode>> {
  return fetchApiOrNetworkError("auth/email/new/", props);
}


export type ParentPermissionNewProps = {
  verificationChallengeKey: string,
};

export function parentPermissionNew(props: ParentPermissionNewProps): Promise<Result<ParentPermission, AuthErrorCode>> {
  return fetchApiOrNetworkError("auth/parent_permission/new/", props);
}

export type UserNewProps = {
  userName: string,
  userEmail: string,
  userPassword: string,
  parentEmail?: string,
};

export function userNew(props: UserNewProps): Promise<Result<UserData, AuthErrorCode>> {
  return fetchApiOrNetworkError("auth/user/new/", props);
}

export type UserDataNewProps = {
  userName: string,
  apiKey: string
};

export function userDataNew(props: UserDataNewProps): Promise<Result<UserData, AuthErrorCode>> {
  return fetchApiOrNetworkError("auth/user_data/new/", props);
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

export type PasswordNewResetProps = {
  passwordResetKey: string,
  newPassword: string
}

export function passwordNewReset(props: PasswordNewResetProps): Promise<Result<Password, AuthErrorCode>> {
  return fetchApiOrNetworkError("auth/password/new_reset/", props);
}

export type UserViewProps = {
  userId?: number[],
  minCreationTime?: number,
  maxCreationTime?: number,
  apiKey: string,
}


export function userView(props: UserViewProps): Promise<Result<User[], AuthErrorCode>> {
  return fetchApiOrNetworkError("auth/user/view", props);
}

export type UserDataViewProps = {
  userDataId?: number[],
  minCreationTime?: number,
  maxCreationTime?: number,
  creatorUserId?: number[],
  name?: string[],
  onlyRecent: boolean,
  apiKey: string,
}


export function userDataView(props: UserDataViewProps): Promise<Result<UserData[], AuthErrorCode>> {
  return fetchApiOrNetworkError("auth/user_data/view", props);
}

export type VerificationChallengeViewProps = {
  minCreationTime?: number,
  maxCreationTime?: number,
  creatorUserId?: number[],
  to_parent?: boolean,
  email?: string[],
  apiKey: string,
}


export function verificationChallengeView(props: VerificationChallengeViewProps): Promise<Result<VerificationChallenge[], AuthErrorCode>> {
  return fetchApiOrNetworkError("auth/verification_challenge/view", props);
}

export type EmailViewProps = {
  emailId?: number[],
  minCreationTime?: number,
  maxCreationTime?: number,
  creatorUserId?: number[],
  email?: string[],
  onlyRecent: boolean,
  apiKey: string,
}

export function emailView(props: EmailViewProps): Promise<Result<Email[], AuthErrorCode>> {
  return fetchApiOrNetworkError("auth/email/view", props);
}

export type ParentPermissionViewProps = {
  parentPermissionId?: number[],
  minCreationTime?: number,
  maxCreationTime?: number,
  userId?: number[],
  fromChallenge?: boolean,
  onlyRecent: boolean,
  parentEmail?: string[],
  apiKey: string,
}

export function parentPermissionView(props: ParentPermissionViewProps): Promise<Result<ParentPermission[], AuthErrorCode>> {
  return fetchApiOrNetworkError("auth/parent_permission/view", props);
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

export function passwordView(props: PasswordViewProps): Promise<Result<Password[], AuthErrorCode>> {
  return fetchApiOrNetworkError("auth/password/view", props);
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
  apiKeyKind?: ApiKeyKind,
  onlyRecent: boolean,
  apiKey: string,
}

export function apiKeyView(props: ApiKeyViewProps): Promise<Result<ApiKey[], AuthErrorCode>> {
  return fetchApiOrNetworkError("auth/api_key/view", props);
}
