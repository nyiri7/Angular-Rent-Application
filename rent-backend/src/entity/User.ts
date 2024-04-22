import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Transaction } from "./Transaction";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    userId: string;

    @Column()
    address: string;

    @Column()
    phone: string;

    @Column()
    idCard: string;

    @OneToMany(type => Transaction, transaction => transaction.source)
    outgoingTransactions: Transaction[];

    @OneToMany(type => Transaction, transaction => transaction.destination)
    incomingTransactions: Transaction[];

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;

}
