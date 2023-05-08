import {Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {Quan} from "./quan";
import {House} from "./house";

@Entity()
export class City{
    @PrimaryColumn()
    id:number;
    @Column()
    name:string;
    @Column()
    type:string;
    @Column()
    slug:string;
    @OneToMany(()=>Quan,(quan)=>quan.city)
    quan:Quan[];
    @OneToMany(()=>House,(house)=>house.city)
    house:House[]
}