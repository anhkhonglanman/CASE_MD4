import {Request, Response} from "express";
import userService from "../service/userService";
import addressService from "../service/addressService";

class AddressController {

    getCity = async (req: Request, res: Response) => {
        try {
            let city = await addressService.getCity();
            res.status(201).json({
                success: true,
                data: city});
        }catch (e){
            console.log("error in getCity")
            res.status(500).json({
                message: 'error in getCity',
                success: false
            })
        }
    }
    getQuan = async (req: Request, res: Response) => {
       try {
           let id = req.query.city
           console.log(req.query, id)
           let quan = await addressService.getQuan(id);
           res.status(201).json({
               success: true,
               data: quan});
       }catch (e){
           console.log("error in getQuan")
           res.status(500).json({
               message: 'error in getQuan',
               success: false
           })
       }
    }
    getPhuong = async (req: Request, res: Response) => {
        try {
            let id = req.query.quan
            console.log(req.query, id)
            let phuong = await addressService.getPhuong(id);
            res.status(201).json({
                success: true,
                data: phuong});
        }catch (e){
            console.log("error in getPhuong")
            res.status(500).json({
                message: 'error in getPhuong',
                success: false
            })
        }
    }


}

export default new AddressController();