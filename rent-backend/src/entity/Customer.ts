import { Entity, PrimaryGeneratedColumn, Column, Binary, OneToMany } from "typeorm"
import { Rent } from "./Rent"

@Entity()
export class Customer {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @Column()
    birthday : Date

    @Column()
    birthAdress: string

    @Column()
    nationality: string

    @Column()
    mothersName: string

    @Column()
    email: string

    @Column()
    idCardNumber: string


    @OneToMany(()=>Rent,rent=>rent.customer)
    rents: Rent[];
    //@Column()
    //profilepicture: Binary



}
