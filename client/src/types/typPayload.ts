export interface AuthPayload {
    name: string;
    password: string;
  }
  
  export interface RecoveryPayload {
    name: string;
    recovery: string;
    newPassword: string;
  }