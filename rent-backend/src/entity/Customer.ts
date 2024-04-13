import { Entity, PrimaryGeneratedColumn, Column, Binary } from "typeorm"

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

    //@Column()
    //profilepicture: Binary



}
