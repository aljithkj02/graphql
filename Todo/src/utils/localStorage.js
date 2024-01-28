
export const isTokenExist = () => !!localStorage.getItem('token');

export const clearToken = () => localStorage.removeItem('token');

export const storeToken = (token) => localStorage.setItem('token',  token);