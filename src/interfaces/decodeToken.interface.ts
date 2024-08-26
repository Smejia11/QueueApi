export interface DecodedToken {
  user: User;
  iat: number;
  exp: number;
}

export interface User {
  _id: string;
  email: string;
  permissions: Permissions;
  userCode: string;
  insuredCode: string;
  phone: string;
  profileType: string;
  branchs: string[];
  passwordExpiration: Date;
}

export interface Permissions {
  Backoffice: { [key: string]: Permission[] };
  Agent: { [key: string]: Permission[] };
}

export enum Permission {
  Approve = 'approve',
  Create = 'create',
  Delete = 'delete',
  Execute = 'execute',
  Read = 'read',
  Reject = 'reject',
  Update = 'update',
}
