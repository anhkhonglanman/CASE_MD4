import {Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {City} from "./city";
import {Phuong} from "./phuong";
import {House} from "./house";

@Entity()
export class Quan{
    @PrimaryColumn()
    id:number;
    @Column()
    name:string;
    @Column()
    type:string;

    @ManyToOne(()=>City,(city)=>city.quan)
    city: City;
    @OneToMany(()=>Phuong,(phuong)=>phuong.quan)
    phuong:Phuong[];
    @OneToMany(()=>House,(house)=>house.quan)
    house:House[]

}