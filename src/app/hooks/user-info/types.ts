export interface MyInfo {
    id: number,
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
    id: number,
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