
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