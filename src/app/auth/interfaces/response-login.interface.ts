export interface ResponseLogin {
  id: string;
  userName: string;
  email: string;
  roles: string[];
  isVerified: boolean;
  jwToken: string;
}
