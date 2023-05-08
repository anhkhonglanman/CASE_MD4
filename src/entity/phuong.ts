import {Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {City} from "./city";
import {Quan} from "./quan";
import {House} from "./house";

@Entity()
export class Phuong{
    @PrimaryColumn()
    id:number;
    @Column()
    name:string;
    @Column()
    type:string;
    @ManyToOne(()=>Quan,(quan)=>quan.phuong)
    quan: Quan;
    @OneToMany(()=>House,(house)=>house.phuong)
    house:House[]

}