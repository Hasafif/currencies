export interface formData {
  username: string;
  password: string;
  type: string;
  email?: string;
  passwordC?:string;
  store_name?: string;
  state?: string;
  city?: string;
  address?: string;
  phone?: string
}
export interface loginformData {
  username: string;
  password: string;
}
export type MsgType = 'success' | 'error' | 'info';
export interface MsgProps {
  message: string;
  type?: MsgType;
  duration?: number;
  onClose: () => void;
}

export interface verifyResponse {
  verified:boolean,
  error:string,
  tokenExpired?:boolean
}
export interface commonResponse {
  success:boolean,
  message:string
}