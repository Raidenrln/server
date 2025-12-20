export interface User {
  name: string;
}
export interface UserCache {
  [key: string]: User;
}