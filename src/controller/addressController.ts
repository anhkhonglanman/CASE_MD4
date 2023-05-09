import {Request, Response} from "express";
import userService from "../service/userService";
import addressService from "../service/addressService";

class AddressController {

    getCity = async (req: Request, res: Response) => {
        let city = await addressService.getCity();
        res.status(201).json({
            success: true,
            data: city});
    }
    getQuan = async (req: Request, res: Response) => {
        let id = req.query.city
        console.log(req.query, id)
        let quan = await addressService.getQuan(id);
        res.status(201).json({
            success: true,
            data: quan});
    }
    getPhuong = async (req: Request, res: Response) => {
        let id = req.query.quan
        console.log(req.query, id)
        let phuong = await addressService.getPhuong(id);
        res.status(201).json({
            success: true,
            data: phuong});
    }


}

export default new AddressController();