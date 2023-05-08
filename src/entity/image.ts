import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {House} from "./house";

@Entity()
export class Image{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    imageURL: string;
    @ManyToOne(()=> House, (house)=> house.image)
    house: House;
}
