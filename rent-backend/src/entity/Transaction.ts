import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Category } from "./Category";


@Entity()
export class Transaction {
    
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    transactionDate: string;

    @ManyToOne(type => User, user => user.outgoingTransactions, { eager: true })
    source: User;

    @ManyToOne(type => User, user => user.incomingTransactions, { eager: true })
    destination: User;

    @Column()
    amount: number;

    @ManyToMany(type => Category, { eager: true })
    @JoinTable()
    categories: Category[];
}