/**
 * Returns a promise that will be resolved in some milliseconds
 * use await sleep(some milliseconds)
 * @param ms milliseconds to sleep for
 * @return a promise that will resolve in ms milliseconds
 */
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function staticUrl() {
  return window.location.protocol + "//" + window.location.host;
}

export function apiUrl() {
  return staticUrl() + '/api';
}

function getFormData(data: object) {
  const formData = new FormData();
  Object.keys(data).forEach(key => formData.append(key, (data as any)[key]));
  return formData;
}

// This function is guaranteed to only return ApiErrorCode | object
async function fetchApi(url: string, data: FormData) {
  // Catch all errors and always return a response
  const resp = await (async () => {
    try {
      return await fetch(`${apiUrl()}/${url}`, {
        method: 'POST',
        body: data
      });
    } catch (e) {
      return new Response('"NETWORK"', { status: 400 })
    }
  })();

  try {
    let objResp = await resp.json();
    return objResp;
  } catch (e) {
    return "UNKNOWN";
  }
}

export const ApiErrorCodes = [
  "OK",
  "NOT_FOUND",
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
  "USER_KIND_INVALID",

  "VERIFICATION_CHALLENGE_NONEXISTENT",
  "VERIFICATION_CHALLENGE_TIMED_OUT",

  "PASSWORD_RESET_NONEXISTENT",
  "PASSWORD_EXISTENT",
  "PASSWORD_RESET_TIMED_OUT",

  "EMAIL_RATELIMIT",
  "EMAIL_BLACKLISTED",

  "UNKNOWN",
  "NETWORK"
] as const;

// Creates a union type
export type ApiErrorCode = typeof ApiErrorCodes[number];

export type NewValidApiKeyProps = {
  userEmail: string,
  userPassword: string,
  duration: number,
}

export async function newValidApiKey(props: NewValidApiKeyProps): Promise<ApiKey | ApiErrorCode> {
  return await fetchApi("apiKey/newValid/", getFormData(props));
}

export type NewCancelApiKeyProps = {
  apiKeyToCancel: string,
  apiKey: string,
}

export async function newApiKeyCancel(props: NewCancelApiKeyProps): Promise<ApiKey | ApiErrorCode> {
  return await fetchApi("apiKey/newCancel/", getFormData(props));
}

export type NewVerificationChallengeProps = {
  userName: string,
  userEmail: string,
  userPassword: string,
};

export async function newVerificationChallenge(props: NewVerificationChallengeProps): Promise<VerificationChallenge | ApiErrorCode> {
  return await fetchApi("verificationChallenge/new/", getFormData(props));
}

export type NewUserProps = {
  verificationChallengeKey: string,
};

export async function newUser(props: NewUserProps): Promise<User | ApiErrorCode> {
  return await fetchApi("user/new/", getFormData(props));
}

export type NewPasswordResetProps = {
  userEmail: string,
};

export async function newPasswordReset(props: NewPasswordResetProps): Promise<PasswordReset | ApiErrorCode> {
  return await fetchApi("passwordReset/new/", getFormData(props));
}

export type NewChangePasswordProps = {
  userId: number,
  oldPassword: string,
  newPassword: string,
  apiKey: string
}

export async function newChangePassword(props: NewChangePasswordProps): Promise<Password | ApiErrorCode> {
  return await fetchApi("password/newChange/", getFormData(props));
}

export type NewCancelPasswordProps = {
  userId: number,
  apiKey: string
}

export async function newCancelPassword(props: NewCancelPasswordProps): Promise<Password | ApiErrorCode> {
  return await fetchApi("password/newCancel/", getFormData(props));
}


export type NewResetPasswordProps = {
  passwordResetKey: string,
  newPassword: string
}

export async function newResetPassword(props: NewResetPasswordProps): Promise<Password | ApiErrorCode> {
  return await fetchApi("password/newReset/", getFormData(props));
}

export type NewCourseProps = {
  schoolId: number,
  name: string,
  description: string,
  apiKey: string
}

export type ViewUserProps = {
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


export async function viewUser(props: ViewUserProps): Promise<User[] | ApiErrorCode> {
  return await fetchApi("user/", getFormData(props));
}

export type ViewPasswordProps = {
  passwordId?: number, //
  creationTime?: number, //
  minCreationTime?: number, //
  maxCreationTime?: number, //
  creatorUserId?: number, //
  userId?: number, //
  passwordKind?: PasswordKind, //
  onlyRecent?: boolean,
  offset?: number,
  count?: number,
  apiKey: string,
}

export async function viewPassword(props: ViewPasswordProps): Promise<Password[] | ApiErrorCode> {
  return await fetchApi("password/", getFormData(props));
}


export type ViewApiKeyProps = {
  apiKeyId?: number, //
  creatorUserId?: number, //
  creationTime?: number, //
  minCreationTime?: number, //
  maxCreationTime?: number, //
  duration?: number, //
  minDuration?: number, //
  maxDuration?: number, //
  apiKeyKind?: ApiKeyKind, //
  onlyRecent?: boolean, //
  offset?: number,
  count?: number,
  apiKey: string,
}

export async function viewApiKey(props: ViewApiKeyProps): Promise<ApiKey[] | ApiErrorCode> {
  return await fetchApi("apiKey/", getFormData(props));
}

export function isApiErrorCode(maybeApiErrorCode: any): maybeApiErrorCode is ApiErrorCode {
  return typeof maybeApiErrorCode === 'string' && ApiErrorCodes.includes(maybeApiErrorCode as any);
}
