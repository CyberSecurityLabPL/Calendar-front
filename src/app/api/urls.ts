const DEV_API_URL = "http://localhost:8080/api"
const PROD_API_URL = "http://192.168.96.21:8000/"

export const API_URL = () =>
    process.env.NODE_ENV === "development" ? DEV_API_URL : PROD_API_URL

export const API_URLS = {
    LOGIN: `${API_URL()}/auth/signin`,
    REFRESH: `${API_URL()}/auth/refresh`,

    GET_ALL_COMPANIES: `${API_URL()}/company/all`,

    GET_ALL_USER_TASKS: `${API_URL()}/hours/getAllHoursForUser`,
    ADD_USER_TASK: `${API_URL()}/hours/add`,
    EDIT_USER_TASK: `${API_URL()}/hours/`,
    DELETE_USER_TASK: `${API_URL()}/hours/`,
    GET_MONTHLY_TASKS: `${API_URL()}/users/monthlyTasks/`,
    GET_TOTAL_HOURS: `${API_URL()}/hours/withTotalHours`,

    GET_HOURS_STATUS: `${API_URL()}/workHoursStatus/getStatus/`,
    UPDATE_HOURS_STATUS: `${API_URL()}/workHoursStatus/statusUpdate/`,

    GET_SUBORDINATES: `${API_URL()}/subordinates`,

    ACTIVATE_ACCOUNT: `${API_URL()}/auth/activate`,
    RESEND_LINK: `${API_URL()}/auth/resendActivationEmail`,

    ADD_USER: `${API_URL()}/auth/addUser`,
    EDIT_USER: `${API_URL()}/users/update`,
    DELETE_USER: `${API_URL()}/users/`,
    GET_USER_INFO: `${API_URL()}/users`,

    GET_MY_INFO: `${API_URL()}/me`,

    PRINT_HOURS_TO_PDF: `${API_URL()}/pdfhours/`,
    PRINT_TASKS_TO_PDF: `${API_URL()}/pdftasks/`,
}
