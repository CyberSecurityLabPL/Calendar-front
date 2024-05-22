import { CompanyDto } from './Company';

export enum Role {
  ADMIN = 'ROLE_ADMIN',
  USER = 'ROLE_USER',
  MANAGER = 'ROLE_MANAGER'
}
export enum Contract {
  ZLECENIE = 'UMOWA_ZLECENIE',
  PRACA = 'UMOWA_O_PRACE'
}

export interface UserRole {
  id: string;
  firstName: string;
  lastName: string;
  workYears: number;
  email: string;
  contract: Contract;
  position: string;
  companyDto: CompanyDto;
  workStart: Date;
  role: Role;
}
export interface UserRequest extends Omit<UserRole, 'companyDto' | 'id'> {
  id?: string;
  companyId: string;
}
interface UserFieldNames {
  [key: string]: string;
}

const userFieldNames: UserFieldNames = {
  id: 'ID',
  firstName: 'Imię',
  lastName: 'Nazwisko',
  workYears: 'Lata pracy',
  email: 'Email',
  contract: 'Umowa',
  position: 'Stanowisko',
  companyDto: 'Firma',
  workStart: 'Data rozpoczęcia',
  role: 'Rola'
};

export default userFieldNames;
