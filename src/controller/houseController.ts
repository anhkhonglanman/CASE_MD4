import {Request, Response} from "express";
import houseService from "../service/houseService";
import imageService from "../service/imageService";
import ImageService from "../service/imageService";
import AddressService from "../service/addressService";


class HouseController {
    showAllHouse = async (req: Request, res: Response) => {
        try {
            let house = await houseService.findAllHouse()
            res.status(201).json({
                data : house,
                success : true
            });
        } catch (e) {
            console.log("error in show all houses:" , e)
            res.status(500).json({
                message : "get houses failed",
                success : false
            })
        }
    }
    searchHouse = async (req: Request, res: Response) => {
        console.log(req.query)
        if (!req.query.priceLow) {
            req.query.priceLow = "0";
        }
        if (!req.query.priceHigh) {
            req.query.priceHigh = "1000000"
        }
        if (!req.query.areaLow) {
            req.query.areaLow = "0"
        }
        if (!req.query.areaHigh) {
            req.query.areaHigh = "1000"
        }
        if (!req.query.sort) {
            req.query.sort = "0"
        }
        // if (req.query.sort !== "1" || req.query.sort !== "2" || req.query.sort !== "3" || req.query.sort !== "4") {
        //     req.query.sort = "0"
        // }
        console.log("query after set default:", req.query)
        try {
            let house = await houseService.findHouse(req.query)
            res.status(201).json({
                data : house,
                success: true
            });
        } catch (e) {
            res.status(500).json({
                message : "get house failed",
                success : false
            })
        }

    }
    createHouse = async (req: Request, res: Response) => {
        let id = req['decode']['id'];
        let data = req.body;
        console.log("req.body:", req.body)
        let imageData = JSON.parse(data.image);
        console.log("image Data:", typeof imageData, imageData)
        console.log(data.phuong);
        let phuongDetail = await AddressService.getPhuongDetail(data.phuong)
        console.log("--phuongDetail:", phuongDetail)
        data.quan = phuongDetail.quan.id;
        console.log(data.quan)
        data.city = phuongDetail.quan.city.id;
        console.log(data.city)
        console.log("data to create house:", data)
        try {
            let house = await houseService.addHouse(data, id);
            let idHouse = house.id
            await ImageService.addImage(idHouse, imageData)
            res.status(200).json({
                    success: true,
                    data: house.id
                }
            )
        } catch (e) {
            res.status(500).json({
                message : "create house failed",
                success : false
            })
        }

    }
    editHouseById = async (req: Request, res: Response) => {
        let idHouse = req.params.id
        let data = req.body;
        let imageData = JSON.parse(data.image);
        let phuongDetail = await AddressService.getPhuongDetail(data.phuong)
        console.log("--phuongDetail:", phuongDetail)
        data.quan = phuongDetail.quan.id;
        data.city = phuongDetail.quan.city.id;

        try {
            await imageService.upDateImage(imageData, idHouse)
            await houseService.updateHouse(idHouse, data);
            res.status(200).json({
                message: "ok",
                success: true
            })
        } catch (e) {
            res.status(500).json({
                message : "house not found to edit",
                success : false
            })
        }


    }
    showHouseById = async (req: Request, res: Response) => {
        let id = parseInt(req.params.id)
        try {
            let house = await houseService.findHouseById(id);
            res.status(200).json({
                    success: true,
                    data: house
                }
            )
        } catch (e) {
            res.status(500).json({
                message : "house not found",
                success : false
            })
        }

    }
    delete = async (req: Request, res: Response) => {
        let id = parseInt(req.params.id)
        try {
            await houseService.delete(id);
            res.status(200).json({
                success: true
            })
        } catch (e) {
            res.status(500).json({
                message : "house not found or not found id",
                success : false
            })
        }
    }


}

export default new HouseController();