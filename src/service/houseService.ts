import {AppDataSource} from "../data-source";
import {House} from "../entity/house";
class HouseService {
    private houseRepository;
    constructor() {
        this.houseRepository = AppDataSource.getRepository(House);
    }
    findAllHouse = async () => {

        let houses = await this.houseRepository.find({
            relations: {
                phuong: true,
                quan: true,
                city: true,
                image: true,
                user: true
            },
            select: {
                user: {
                    name: true,
                    phoneNumber: true
                }
            }
        })
        return houses
    }
    findHouseById = async (id) => {
        return  await AppDataSource.createQueryBuilder()
            .select("house")
            .addSelect("user.name")
            .addSelect("user.phoneNumber")
            .from(House, "house")
            .leftJoinAndSelect("house.image", "image")
            .innerJoin("house.user", "user")
            .where("house.id = :id", {id: id})
            .getOne()
    }
    findHouse = async (query) => {
        // let column = (query.sort)? "house.price" : "house.area";
        let column;
        let asc;


        if (query.sort == "1") {
            column = "house.price"
            asc = "ASC"
        } else if (query.sort == "2") {
            column = "house.price"
            asc = "DESC"
        } else if (query.sort == "3") {
            column = "house.area"
            asc = "ASC"
        } else if (query.sort == "4") {
            column = "house.area"
            asc = "DESC"
        } else {
            column = ""
            asc = ""
        }


        if (query.phuongId) {
            console.log("tim kiem theo phuong")
            return await this.houseRepository.createQueryBuilder("house")
                .where("house.price >= :priceLow", {priceLow: query.priceLow})
                .orWhere('house.price <= :priceHigh', {priceHigh: query.priceHigh})
                .andWhere(`house.phuongId = :phuongId`, {phuongId: query.phuongId})
                .orderBy(column, asc)
                .getMany()
        } else if (query.quanId) {
            console.log("tim kiem theo quan")
            return await this.houseRepository.createQueryBuilder("house")
                .where("house.price >= :priceLow", {priceLow: query.priceLow})
                // .orWhere('house.price <= :priceHigh', {priceHigh: query.priceHigh})
                .andWhere(`house.quanId = :quanId`, {quanId: query.quanId})
                .orderBy(column, asc)
                .getMany()
        } else if (query.cityId) {
            console.log("tim kiem theo city")
            return await this.houseRepository.createQueryBuilder("house")
                .where("house.price >= :priceLow", {priceLow: query.priceLow})
                // .orWhere('house.price <= :priceHigh', {priceHigh: query.priceHigh})
                .andWhere(`house.cityId = :cityId`, {cityId: query.cityId})
                .orderBy(column, asc)
                .getMany()
        } else {
            return await this.houseRepository.createQueryBuilder("house")
                .where("house.price >= :priceLow", {priceLow: query.priceLow})
                .orWhere('house.price <= :priceHigh', {priceHigh: query.priceHigh})
                .orderBy(column, asc)
                .getMany()
        }

        // const qb = this.houseRepository.createQueryBuilder('house')
        //     .where('house.price >= :priceLow', {priceLow: query.priceLow})
        //     .orWhere('house.price <= :priceHigh', {priceHigh: query.priceHigh})
        //     // .orWhere('house.area BETWEEN :min AND :max', {min : 50, max : 1000})
        //     .orWhere('house.area >= :areaLow', {areaLow: query.areaHigh})
        //     .orWhere('house.area <= :areaHigh', {areaHigh: query.areaLow})
        // if (query.phuongId) {
        //     console.log(;
        // } else if (query.quanId) {
        //     console.log("tim kiem theo quan")
        //     // qb.andWhere(`house.quanId = :quanId`, {quanId: query.quanId});
        //     return await qb.andWhere(`house.quanI"tim kiem theo phuong")
        //     qb.andWhere(`house.phuongId = :phuongId`, {phuongId: query.phuongId});
        //     // return await qb.andWhere(`house.phuongId = :phuongId`, {phuongId: query.phuongId}).getMany();
        //     await qb.getMany()d = :quanId`, {quanId: query.quanId}).getMany();
        //     // return await qb.getMany();
        // } else if (query.cityId) {
        //     console.log("tim kiem theo city")
        //     // qb.andWhere(`house.cityId = :cityId`, {cityId: query.cityId});
        //     return qb.andWhere(`house.cityId = :cityId`, {cityId: query.cityId}).getMany();
        //     // await qb.getMany();
        // }
        // return await qb.getMany();

        // return await this.houseRepository.createQueryBuilder("house")
        //     .where("house.price >= :priceLow", {priceLow: query.priceLow})
        //     .andWhere(`house.phuongId ${(query.phuongId) ? "=" : ">"} :phuongId`,
        //         {phuongId: (query.phuongId) ? query.phuongId : 0})
        //
        //     .getMany()

    }

    addHouse = async (house, id) => {
        let newHouse = new House();
        newHouse.price = house.price;
        newHouse.area = house.area;
        newHouse.brief = house.brief;
        newHouse.description = house.description;
        newHouse.user = id;
        newHouse.phuong = house.phuong
        newHouse.quan = house.quan;
        newHouse.city = house.city;
        await this.houseRepository.save(newHouse);
        return newHouse
    }
    updateHouse = async (id, house) => {
        await this.houseRepository
            .createQueryBuilder()
            .update({
                price: house.price,
                area: house.area,
                description: house.description,
                phuong: house.phuong,
                quan: house.quanId,
                city: house.cityId,
            }).where({id:id})
            .execute();
    }
    delete = async (id) => {
        if (id) {
            await this.houseRepository.delete({id: id})
        } else {
            return 'khong ton tai'
        }
    }
}

export default new HouseService()
