import {AppDataSource} from "../data-source";
import {City} from "../entity/city";
import {Phuong} from "../entity/phuong";
import {Quan} from "../entity/quan";

class AddressService {
    private cityRepository;
    private quanRepository;
    private phuongRepository;

    constructor() {
        this.cityRepository = AppDataSource.getRepository(City)
        this.quanRepository = AppDataSource.getRepository(Quan)
        this.phuongRepository = AppDataSource.getRepository(Phuong)
    }


    getCity = async () => {
        return await this.cityRepository.find()
    }
    getQuan = async (id) => {
        return await AppDataSource.createQueryBuilder()
            .select("quan")
            .from(Quan, "quan")
            .where("quan.cityId = :id", {id: id})
            .getMany()
    }
    getPhuong = async (id) => {
        return await AppDataSource.createQueryBuilder()
            .select("phuong")
            .from(Phuong, "phuong")
            .where("phuong.quanId = :id", {id: id})
            .getMany()
    }
    getPhuongDetail = async (id) => {
        return await AppDataSource.createQueryBuilder()
            .select("phuong")
            .from(Phuong, "phuong")
            .where("phuong.id = :id", {id: id})
            .innerJoinAndSelect("phuong.quan", "quan")
            .innerJoinAndSelect("quan.city", "city")
            .getOne()
    }
}
export default new AddressService();