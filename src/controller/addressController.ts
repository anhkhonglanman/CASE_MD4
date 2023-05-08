import {Request, Response} from "express";
import userService from "../service/userService";
import addressService from "../service/addressService";

class AddressController {

    getCity = async (req: Request, res: Response) => {
        let city = await addressService.getCity();
        res.status(201).json(city);
    }
    getQuan = async (req: Request, res: Response) => {
        let city = await addressService.getQuan();
        res.status(201).json(city);
    }
    getPhuong = async (req: Request, res: Response) => {
        let city = await addressService.getPhuong();
        res.status(201).json(city);
    }


}

export default new AddressController();