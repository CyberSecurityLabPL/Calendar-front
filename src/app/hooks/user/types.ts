export interface AddUserRequest {
    firstName: string,
    lastName: string,
    email: string,
    companyId: number,
    role: string,
    contract: string,
    workStart: string,
    position: string,
}

export interface EditUserRequest {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    contract: string,
    position: string,
    workStart: string,
    role: string,
    companyDto: {
        name: string,
        address: string,
        telNumber: number,
        nip: number,
        bankName: string,
        bankAccount: string
    },
    password: string,
    companyId: number
}