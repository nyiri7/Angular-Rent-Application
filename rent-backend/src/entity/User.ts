import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    userId: string;

    @Column()
    phone: string;

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;

}
