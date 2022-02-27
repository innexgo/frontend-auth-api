import { Result } from '@innexgo/frontend-common';
export interface VerificationChallenge {
    creationTime: number;
    toParent: boolean;
    email: string;
}
export interface User {
    userId: number;
    creationTime: number;
}
export interface UserData {
    userDataId: number;
    creationTime: number;
    creatorUserId: number;
    realname: string;
    username: string;
    dateofbirth: number;
}
export interface Email {
    emailId: number;
    creationTime: number;
    verificationChallenge: VerificationChallenge;
}
export interface PasswordReset {
    creationTime: number;
}
export declare type Password = {
    passwordId: number;
    creationTime: number;
    creatorUserId: number;
    passwordReset?: PasswordReset;
};
export declare type ApiKeyKind = "VALID" | "NO_EMAIL" | "NO_PARENT" | "CANCEL";
export interface ApiKey {
    apiKeyId: number;
    creationTime: number;
    creatorUserId: number;
    duration: number;
    key: string;
    apiKeyKind: ApiKeyKind;
}
export declare const AuthErrorCodes: readonly ["NO_CAPABILITY", "API_KEY_UNAUTHORIZED", "NO_PERMISSION", "PASSWORD_INCORRECT", "PASSWORD_INSECURE", "PASSWORD_CANNOT_CREATE_FOR_OTHERS", "USER_NONEXISTENT", "USER_DATA_NONEXISTENT", "API_KEY_NONEXISTENT", "USER_USERNAME_INVALID", "USER_USERNAME_TAKEN", "USER_REALNAME_INVALID", "USER_DATEOFBIRTH_INVALID", "NEGATIVE_DURATION", "CANNOT_ALTER_PAST", "VERIFICATION_CHALLENGE_NONEXISTENT", "VERIFICATION_CHALLENGE_TIMED_OUT", "VERIFICATION_CHALLENGE_USED", "VERIFICATION_CHALLENGE_WRONG_KIND", "PASSWORD_EXISTENT", "PASSWORD_NONEXISTENT", "EMAIL_EXISTENT", "EMAIL_NONEXISTENT", "PASSWORD_RESET_NONEXISTENT", "PASSWORD_RESET_TIMED_OUT", "EMAIL_BOUNCED", "EMAIL_COOLDOWN", "DECODE_ERROR", "INTERNAL_SERVER_ERROR", "METHOD_NOT_ALLOWED", "BAD_REQUEST", "NOT_FOUND", "UNKNOWN", "NETWORK"];
export declare type AuthErrorCode = typeof AuthErrorCodes[number];
export declare type ApiKeyNewWithEmailProps = {
    email: string;
    password: string;
    duration: number;
};
export declare function apiKeyNewWithEmail(props: ApiKeyNewWithEmailProps, server?: string): Promise<Result<ApiKey, AuthErrorCode>>;
export declare type ApiKeyNewWithUsernameProps = {
    username: string;
    password: string;
    duration: number;
};
export declare function apiKeyNewWithUsername(props: ApiKeyNewWithUsernameProps, server?: string): Promise<Result<ApiKey, AuthErrorCode>>;
export declare type ApiKeyNewCancelProps = {
    apiKeyToCancel: string;
    apiKey: string;
};
export declare function apiKeyNewCancel(props: ApiKeyNewCancelProps, server?: string): Promise<Result<ApiKey, AuthErrorCode>>;
export declare type VerificationChallengeNewProps = {
    email: string;
    toParent: boolean;
    apiKey: string;
};
export declare function verificationChallengeNew(props: VerificationChallengeNewProps, server?: string): Promise<Result<VerificationChallenge, AuthErrorCode>>;
export declare type EmailNewProps = {
    verificationChallengeKey: string;
    toParent: boolean;
};
export declare function emailNew(props: EmailNewProps, server?: string): Promise<Result<Email, AuthErrorCode>>;
export declare type UserNewProps = {
    username: string;
    realname: string;
    password: string;
    dateofbirth: number;
    apiKeyDuration: number;
};
export declare function userNew(props: UserNewProps, server?: string): Promise<Result<ApiKey, AuthErrorCode>>;
export declare type UserDataNewProps = {
    username: string;
    realname: string;
    dateofbirth: number;
    apiKey: string;
};
export declare function userDataNew(props: UserDataNewProps, server?: string): Promise<Result<UserData, AuthErrorCode>>;
export declare type PasswordResetNewProps = {
    userEmail: string;
};
export declare function passwordResetNew(props: PasswordResetNewProps, server?: string): Promise<Result<PasswordReset, AuthErrorCode>>;
export declare type PasswordNewChangeProps = {
    oldPassword: string;
    newPassword: string;
    apiKey: string;
};
export declare function passwordNewChange(props: PasswordNewChangeProps, server?: string): Promise<Result<Password, AuthErrorCode>>;
export declare type PasswordNewResetProps = {
    passwordResetKey: string;
    newPassword: string;
};
export declare function passwordNewReset(props: PasswordNewResetProps, server?: string): Promise<Result<Password, AuthErrorCode>>;
export declare type UserViewProps = {
    userId?: number[];
    minCreationTime?: number;
    maxCreationTime?: number;
    apiKey: string;
};
export declare function userView(props: UserViewProps, server?: string): Promise<Result<User[], AuthErrorCode>>;
export declare type UserDataViewProps = {
    userDataId?: number[];
    minCreationTime?: number;
    maxCreationTime?: number;
    creatorUserId?: number[];
    minDateofbirth?: number;
    maxDateofbirth?: number;
    username?: string[];
    realname?: string[];
    onlyRecent: boolean;
    apiKey: string;
};
export declare function userDataView(props: UserDataViewProps, server?: string): Promise<Result<UserData[], AuthErrorCode>>;
export declare type EmailViewProps = {
    emailId?: number[];
    minCreationTime?: number;
    maxCreationTime?: number;
    toParent: boolean;
    onlyRecent: boolean;
    creatorUserId?: number[];
    email?: string[];
    apiKey: string;
};
export declare function emailView(props: EmailViewProps, server?: string): Promise<Result<Email[], AuthErrorCode>>;
export declare type PasswordViewProps = {
    passwordId?: number[];
    minCreationTime?: number;
    maxCreationTime?: number;
    creatorUserId?: number[];
    fromReset?: boolean;
    onlyRecent: boolean;
    apiKey: string;
};
export declare function passwordView(props: PasswordViewProps, server?: string): Promise<Result<Password[], AuthErrorCode>>;
export declare type ApiKeyViewProps = {
    apiKeyId?: number[];
    creationTime?: number;
    minCreationTime?: number;
    maxCreationTime?: number;
    creatorUserId?: number[];
    duration?: number;
    minDuration?: number;
    maxDuration?: number;
    apiKeyKind?: ApiKeyKind[];
    onlyRecent: boolean;
    apiKey: string;
};
export declare function apiKeyView(props: ApiKeyViewProps, server?: string): Promise<Result<ApiKey[], AuthErrorCode>>;
