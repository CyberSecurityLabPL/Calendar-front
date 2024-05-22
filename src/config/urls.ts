export const URLS = {
  LOGIN: () => '/auth/signin',
  REFRESH: () => '/auth/refresh',

  GET_COMPANIES: () => '/company/all',

  GET_USERS: () => '/users',
  CREATE_USER: () => '/users',
  EDIT_USER: (id: string) => `/users/${id}`,
  DELETE_USER: (id: string) => `/users/${id}`,
  ME: () => '/users/me'

};
