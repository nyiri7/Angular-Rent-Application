import { Entity, PrimaryGeneratedColumn, Column, Binary, OneToOne, OneToMany } from "typeorm"
import { Rent } from "./Rent"
import { History } from "./History"

@Entity()
export class Vehicle {

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

    @Column({type:'date'})
    boughtAt: string

    @Column()
    plateNumber: string

    @Column()
    km: number

    @Column()
    seats: number

    @Column()
    kmprice: number

    @Column()
    vehicleIdentificationNumber: string

    @Column()
    type: string

    @Column()
    status: string

    @OneToOne(()=>Rent,rent =>rent.vehicle)
    rent: Rent;


    @OneToMany(()=>Rent,rent=>rent.vehicle)
    history: History[];

}
