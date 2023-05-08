import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";

import {Contract} from "./contract";

@Entity()
export class ContractStatus {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name:string;
    @ManyToOne(()=> Contract,(contract)=>contract.contractStatus)
    contract:Contract
}