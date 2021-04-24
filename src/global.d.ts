declare global {

  interface VerificationChallenge {
    creationTime: number,
    name: string,
    email: string,
  }

  interface User {
    userId: number,
    creationTime: number,
    name: string,
    email: string,
  }

  interface PasswordReset {
    creationTime: number;
  }

  type PasswordKind  = "CHANGE" | "RESET" | "CANCEL";

  interface Password {
    passwordId: number,
    creationTime: number,
    creator: User,
    user: User,
    kind: "CANCEL" | "CHANGE",
    passwordReset: null,
  } | {
    passwordId: number,
    creationTime: number,
    creator: User,
    user: User,
    kind: "RESET",
    passwordReset: PasswordReset,
  }

  type ApiKeyKind = "VALID" | "CANCEL";

  interface ApiKey {
    apiKeyId: number,
    creationTime: number,
    creator: User,
    duration: number, // only valid if ApiKeyKind isn't CANCEL
    key: string, // only valid if ApiKeyKind isn't CANCEL
    apiKeyKind: ApiKeyKind,
  }

  interface AuthenticatedComponentProps {
    apiKey: ApiKey
    setApiKey: (data: ApiKey | null) => void
  }
}
export { }
