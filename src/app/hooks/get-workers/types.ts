export interface GetSubordinatesProps {
        id: string,
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
        }
}