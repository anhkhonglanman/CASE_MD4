import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";

import {Contract} from "./contract";

@Entity()
export class ContractStatus {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name:string;
    @OneToMany(()=> Contract,(contract)=>contract.status)
    contract:Contract[]
}