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
    getQuan = async () => {
        return await this.quanRepository.find()
    }
    getPhuong = async () => {
        return await this.phuongRepository.find()
    }

}
export default new AddressService();