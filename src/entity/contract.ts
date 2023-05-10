import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";

import {House} from "./house";
import {User} from "./user";
import {ContractStatus} from "./contractStatus";

@Entity()
export class Contract{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    price:number;
    @Column()
    startMonth:Date;
    @Column()
    endMonth:Date;
    @Column()
    duration: number;
    @Column()
    cost:number;
    @ManyToOne(()=> House, (house)=> house.contract)
    house : House;
    @ManyToOne(()=> User, (user)=> user.contract)
    user : User;
    @ManyToOne(()=> ContractStatus, (contractStatus)=> contractStatus.contract)
    status: number
}