import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Image} from "./image";
import {Contract} from "./contract";
import {User} from "./user";
import {Phuong} from "./phuong";
import {HouseStatus} from "./housestatus";
import {Quan} from "./quan";
import {City} from "./city";

@Entity()
export class House {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    price: number;

    @Column()
    area: number;
    @Column({type: "varchar", length: 300})
    description: string;
    @OneToMany(() => Image, (image) => image.house)
    image: Image[];
    @OneToMany(() => Contract, (contract) => contract.house)
    contract: Contract[];
    @ManyToOne(() => User, (user) => user.house)
    user: User;

    @ManyToOne(() => Phuong, (phuong) => phuong.house)
    phuong: Phuong;
    @ManyToOne(() => HouseStatus, (houseStatus) => houseStatus.house)
    houseStatus: HouseStatus;
    @ManyToOne(() => Quan, (quan) => quan.house)
    quan: Quan;
    @ManyToOne(() => City, (city) => city.house)
    city: City;
    @Column({
        default: 0
    })
    isRemoved: boolean;
}