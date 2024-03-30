import { Entity, PrimaryGeneratedColumn, Column, Binary } from "typeorm"

@Entity()
export class Rent {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    customerID: number

    @Column()
    vehicleID: number

    @Column()
    vehicleType: string

    @Column()
    rentStart: Date

    @Column()
    rentEnd: Date

    @Column()
    employeeID: number




}
