export const AdminInformation = (): any => {
  // @ts-ignore
return JSON.parse(localStorage.getItem("adminLoginResponse"));
}