export interface AuthPayload {
    name: string;
    password: string;
  }
  
  export interface RecoveryPayload {
    name: string;
    recovery: string;
    newPassword: string;
  }

  export interface ComPayload {
    originId: string;
    originName : string;
    title?: string;
    comType: number;
    message?: string;
  }