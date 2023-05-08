import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {House} from "./house";

@Entity()
export class HouseStatus {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name:string;
    @OneToMany(()=> House,(house)=>house.houseStatus)
    house:House[]
}