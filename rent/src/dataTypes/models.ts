
export interface IVehicle{
    id: number

    brand: string

    model: string

    boughtfor: number

    actualprice: number

    boughtAt: Date

    plateNumber: string

    km: number

    seats: number

    kmprice: number

    vehicleIdentificationNumber: string

    type: string

    status: string
}

export interface ICustomer{
    id: number
    firstName: string
    lastName: string
    age: number
    birthday : Date
    birthAdress: string
    nationality: string
    mothersName: string
    email: string
    idCardNumber: string
}

export interface IRent{
    id: number;
    customer: ICustomer;
    vehicle: IVehicle;
    rentStart: Date;
}

export interface IHistory{
    id: number;
    vehicle: IVehicle;
    historydate: Date;
    price:number;
    historyType: string;
    Desc: string;
}