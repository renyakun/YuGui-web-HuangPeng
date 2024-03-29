// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str) {
  //return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];//打开登录页
  const authorityString =
    typeof str === 'undefined' ? localStorage.getItem('YuGui-authority') : str;
  //authorityString could be admin, "admin", ["admin"];  
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  return authority || ['admin'];
  //return authority
}
//typeof authority === 'string' ? [authority] : authority
export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return localStorage.setItem('YuGui-authority', JSON.stringify(proAuthority));
}
