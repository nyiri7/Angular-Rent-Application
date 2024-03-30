import { Entity, PrimaryGeneratedColumn, Column, Binary } from "typeorm"

@Entity()
export class History {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    customerID: number

    @Column()
    vehicleID: number

    @Column()
    vehicleType: string

    @Column()
    historydate: Date

    @Column()
    employeeID: number

    @Column()
    crash: boolean

    @Column()
    price:number




}
