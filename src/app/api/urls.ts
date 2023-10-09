const DEV_API_URL = ""
const PROD_API_URL = "🤠"

export const API_URL = () =>
    process.env.NODE_ENV === "development" ? DEV_API_URL : PROD_API_URL

export const API_URLS = {
    LOGIN: `${API_URL()}auth/signin`,
    REFRESH: `${API_URL()}auth/refresh`,

    GET_ALL_USER_TASKS: `${API_URL()}api/hours/getAllHoursForUser`,
    ADD_USER_TASK: `${API_URL()}api/hours/add`,
    EDIT_USER_TASK: `${API_URL()}api/hours/`,
    DELETE_USER_TASK: `${API_URL()}api/hours/`,
    GET_MONTHLY_TASKS: `${API_URL()}api/users/monthlyTasks/`,
    GET_TOTAL_HOURS: `${API_URL()}api/hours/withTotalHours`,

    GET_HOURS_STATUS: `${API_URL()}api/workHoursStatus/getStatus/`,
    UPDATE_HOURS_STATUS: `${API_URL()}api/workHoursStatus/statusUpdate/`,

    GET_SUBORDINATES: `${API_URL()}api/subordinates`,

    ACTIVATE_ACCOUNT: `${API_URL()}auth/activate`,
    RESEND_LINK: `${API_URL()}auth/resendActivationEmail`,

    ADD_USER: `${API_URL()}auth/addUser`,
    EDIT_USER: `${API_URL()}api/users/update`,
    DELETE_USER: `${API_URL()}api/users/`,
    GET_USER_INFO: `${API_URL()}api/users`,

    GET_MY_INFO: `${API_URL()}api/me`,

    PRINT_HOURS_TO_PDF: `${API_URL()}api/pdfhours/`,
    PRINT_TASKS_TO_PDF: `${API_URL()}api/pdftasks/`,
}