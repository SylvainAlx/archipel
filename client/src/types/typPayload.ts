/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AuthPayload {
  name: string;
  password: string;
}

export interface RecoveryPayload {
  name: string;
  recovery: string;
  password?: string;
  newPassword?: string;
}

export interface ComPayload {
  originId: string;
  originName: string;
  title?: string;
  comType: number;
  message?: string;
}

export interface PlacePayload {
  nationId: string;
  buildDate: Date;
  name: string;
  description: string;
  image: string;
}

export interface ParamPayload {
  name: string;
  props: Array<{label: string; value: string | number}>;
}
