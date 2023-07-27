export interface AdminLoginResponseFromBackEnd{
  status : boolean;
  isSecure : boolean;
  result : string;
  role : string;
  adminUsername : string;
  adminRefreshedToken : string;
}