export type Credentials = {
    email: string
    password: string
}

export type UserData = {
    firstName: string
    lastName: string
    email: string
    password: string,
    role: string
    tenantId: number
}


export type TenantData = {
    name: string
    mailId: string
    address: string
}

export interface updateUserDataInterface {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    tenantId: number;
}