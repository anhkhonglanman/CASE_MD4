import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Role} from "./role";
import {Contract} from "./contract";
import {House} from "./house";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id  : number;
    @Column({type: "varchar", length: 255})
    name: string;
    @Column()
    phoneNumber : number;
    @Column({type: "varchar", length: 255})
    address: string;
    @Column({type: "varchar", length: 255})
    username: string;
    @Column({type: "varchar", length: 255})
    password: string;
    @ManyToOne(()=> Role, (role)=> role.users)
    role : number;
    @OneToMany(()=>Contract,(contract)=>contract.user)
    contract:Contract[];
    @OneToMany(()=>User,(user)=>user.house)
    house:House[]
}
