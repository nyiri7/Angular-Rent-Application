import { Entity, PrimaryGeneratedColumn, Column, Binary, OneToOne, JoinColumn, ManyToMany, ManyToOne } from "typeorm"
import { Vehicle } from "./Vehicle"
import { Customer } from "./Customer";

@Entity()
export class Rent {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=>Customer,customer => customer.rents,{onDelete:'CASCADE'})
    customer: Customer;

    @OneToOne(()=>Vehicle,vehicle =>vehicle.rent, {onDelete:'CASCADE'})
    @JoinColumn()
    vehicle: Vehicle;

    @Column()
    rentStart: Date;


}
