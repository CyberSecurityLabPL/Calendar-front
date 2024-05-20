import { CompanyDto } from "./Company";

export enum Role {
 ADMIN = "ROLE_ADMIN",
  USER = "ROLE_USER",
  MENAGER = "ROLE_MENAGER"
}
export enum Contract {
  ZLECENIE = "UMOWA_ZLECENIE",
   PRACA = "UMOWA_O_PRACE",
   }
export enum CompanyId {
    CSL = "bce3d086-6433-4142-b39c-34b1eb14902f"
     }

export interface User {
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
export interface UserRequest extends Omit<User, 'companyDto'|'id'> {
  companyId: string;
}
