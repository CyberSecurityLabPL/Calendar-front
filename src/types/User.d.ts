export interface User {
  id: string;
  firstName: string;
  lastName: string;
  workYears: number;
  email: string;
  contract: string;
  position: string;
  role: string;
  workStart: Date;
  companyDto: CompanyDto;
}
