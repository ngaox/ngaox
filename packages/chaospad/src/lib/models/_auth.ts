export interface UserResponse {
  id: number;
  username: string;
  email: string;
  fullname: string;
  roles: string[];
}
export interface loginCredentials {
  username: string;
  password: string;
}
