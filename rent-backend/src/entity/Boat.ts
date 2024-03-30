import { Entity, PrimaryGeneratedColumn, Column, Binary } from "typeorm"

@Entity()
export class Boat {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    brand: string

    @Column()
    model: string

    @Column()
    boughtfor: number

    @Column()
    actualprice: number

    @Column()
    boughtAt: Date

    @Column()
    plateNumber: string

    @Column()
    km: number

    @Column()
    seats: number

    @Column()
    kmprice: number

    @Column()
    picture: Binary

    @Column()
    vehicleIdentificationNumber: number



}
