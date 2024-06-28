export class UserModel {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    canCreateUsers: boolean;
    canReadUsers: boolean;
    canUpdateUsers: boolean;
    canDeleteUsers: boolean;

    canSearchVacuum:boolean;
    canStartVacuum:boolean;
    canStopVacuum:boolean;
    canDischargeVacuum:boolean;
    canAddVacuum:boolean;
    canRemoveVacuum:boolean;

  
    constructor(data: any) {
      this.id = data.id;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.email = data.email;
      this.password = data.password;
      this.canCreateUsers = data.canCreateUsers;
      this.canReadUsers = data.canReadUsers;
      this.canUpdateUsers = data.canUpdateUsers;
      this.canDeleteUsers = data.canDeleteUsers;
      this.canSearchVacuum = data.canSearchVacuum;
      this.canStartVacuum = data.canStartVacuum;
      this.canStopVacuum = data.canStopVacuum;
      this.canDischargeVacuum = data.canDischargeVacuum;
      this.canAddVacuum = data.canAddVacuum;
      this.canRemoveVacuum = data.canRemoveVacuum;
    }
  }