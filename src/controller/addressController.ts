import {Request, Response} from "express";
import userService from "../service/userService";
import addressService from "../service/addressService";

class AddressController {

    getCity = async (req: Request, res: Response) => {
        let city = await addressService.getCity();
        res.status(201).json(city);
    }
    getQuan = async (req: Request, res: Response) => {
        let id = req.query.city
        console.log(req.query, id)
        let city = await addressService.getQuan(id);
        res.status(201).json(city);
    }
    getPhuong = async (req: Request, res: Response) => {
        let id = req.query.quan
        console.log(req.query, id)
        let quan = await addressService.getPhuong(id);
        res.status(201).json(quan);
    }


}

export default new AddressController();