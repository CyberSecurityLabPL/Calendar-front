export const URLS = {
  LOGIN: () => '/auth/signin',
  REFRESH: () => '/auth/refresh',

  GET_COMPANIES: () => '/company/all',

  GET_USERS: () => '/users',
  CREATE_USER: () => '/users',
  EDIT_USER: (id: string) => `/users/${id}`,
  DELETE_USER: (id: string) => `/users/${id}`,
  ME: () => '/users/me',

  GET_HOURS: () => '/hours/getAllHoursForUser',
  GET_MONTHLY_HOURS: (date: string) => `/users/monthlyTasks/${date}`,
  ADD_HOURS: () => '/hours/add',
  EDIT_HOURS: (id: string) => `/hours/${id}`,
  DELETE_HOURS: (id: string) => `/hours/${id}`,
  GET_MONTHLY_HOURS_PDF: (month: string) => `/pdfhours/${month}`
};
