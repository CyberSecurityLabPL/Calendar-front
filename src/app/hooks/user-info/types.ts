export interface MyInfo {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    role: UserRole,
    companyDto: {
        name: string,
        address: string,
        telNumber: number,
        nip: number,
        bankName: string,
        bankAccount: string
    }
}

export interface UserInfo {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    contract: string,
    position: string,
    workStart: string,
    role: UserRole,
    companyDto: {
        name: string,
        address: string,
        telNumber: number,
        nip: number,
        bankName: string,
        bankAccount: string
    }
}

export type UserRole = "ROLE_ADMIN" | "ROLE_USER" | "ROLE_MANAGER";