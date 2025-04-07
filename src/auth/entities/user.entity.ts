import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("users")
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column('text')
    username: string;
    @Column('text', { unique: true })
    email: string;
    @Column('text', { select: false })
    password: string;
    @Column('bool', { default: true })
    isActive: boolean;
    @Column('text', { array: true, default: ['user'] })
    roles: string[];
}
