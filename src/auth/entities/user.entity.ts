import { Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("users")
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    username: string;

    email: string;
    
    password: string;

    isActive: boolean;

    roles: string[];
}
