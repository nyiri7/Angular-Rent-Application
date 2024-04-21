import { Entity, PrimaryGeneratedColumn, Column, Binary, ManyToOne } from "typeorm"
import { Vehicle } from "./Vehicle";

@Entity()
export class History {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(()=>Vehicle,vehicle =>vehicle.history, {onDelete:'CASCADE'})
    vehicle: Vehicle;

    @Column({type:'date'})
    historydate: string

    @Column()
    price:number

    @Column()
    historyType: string

    @Column()
    Desc: string




}
