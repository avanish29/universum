export interface TokenModel {
  [key: string]: any;
  token: string | null | undefined;
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  avatar: string | null | undefined;
}

export interface AuthReferrer {
  url?: string | null | undefined;
}
