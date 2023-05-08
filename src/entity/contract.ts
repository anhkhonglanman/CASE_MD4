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
    cost:number;
    @ManyToOne(()=> House, (house)=> house.contract)
    house : House;
    @ManyToOne(()=> User, (user)=> user.contract)
    user : User;
    @OneToMany(()=> ContractStatus, (contractStatus)=> contractStatus.contract)
    contractStatus:ContractStatus[];
}