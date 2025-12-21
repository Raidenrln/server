export interface User {
  uuid: any;
  name: string;
}
export interface UserCache {
  [key: string]: User;
}