import {Request, Response} from "express";
import houseService from "../service/houseService";
import imageService from "../service/imageService";
import ImageService from "../service/imageService";


class HouseController {
    showAllHouse = async (req: Request, res: Response) => {
        let house = await houseService.findAllHouse()
        res.status(201).json(house);
    }
    searchHouse = async (req: Request, res: Response) => {
        console.log(req.query)
        if (!req.query.priceLow) {
            req.query.priceLow = "0";
        }
        if (!req.query.priceHigh) {
            req.query.priceLow = "1000000"
        }
        if (!req.query.areaLow) {
            req.query.areaLow = "50"
        }
        if (!req.query.areaHigh) {
            req.query.areaHigh = "1000"
        }
        if (!req.query.cityId) {
            // req.query.quanId = "0"
            // req.query.phuongId = "0"
            req.query.cityId = "0"
        }
        let house = await houseService.findHouse(req.query)
        console.log(house)
        res.status(201).json(house);
        // res.status(201).json("ok");
    }


    createHouse = async (req: Request, res: Response) => {
        let id = req['decode']['id'];
        let data = req.body;
        let imageData = data.image;
        let house = await houseService.addHouse(data, id);
        let idHouse = house.id
        await ImageService.addImage(idHouse, imageData)
        res.status(200).json({
                success: true,
                data: house.id
            }
        )
    }
    editHouseById = async (req: Request, res: Response) => {
        let idHouse = req.params.id
        let data = req.body;
        let imageData = data.image;
        await imageService.upDateImage(imageData, idHouse)
        await houseService.updateHouse(idHouse, data);
        res.status(200).json("ok")

    }
    showHouseById = async (req: Request, res: Response) => {
        let id = req.params.id
        let house = await houseService.findHouseById(id);
        res.status(200).json({
                success: true,
                data: house
            }
        )
    }
    delete = async (req: Request, res: Response) => {
        let id = parseInt(req.params.id)
        let house = await houseService.delete(id);
        res.status(200).json(house)
    }


}

export default new HouseController();