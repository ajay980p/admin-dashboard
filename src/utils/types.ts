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


export interface PriceConfiguration {
    priceType: string;
    availableOptions: string[];
    _id: string;
}

export interface Attribute {
    name: string;
    widgetType: string;
    defaultValue: string;
    availableOptions: string[];
    _id: string;
}

export interface Category {
    _id: string;
    name: string;
    priceConfiguration: {
        Size: PriceConfiguration;
        Crust: PriceConfiguration;
    };
    attributes: Attribute[];
}