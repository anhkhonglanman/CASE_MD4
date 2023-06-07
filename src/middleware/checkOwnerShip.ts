import houseService from "../service/houseService";
import {House} from "../entity/house";
export const checkOwnerShip = async (req, res, next, ) => {
    let idHouse = req.params.id;
    let idOwner = req['decode'].id;
    let house:House = await houseService.findHouseById(parseInt(idHouse));
    console.log("house found in check owner ship:", house)
    if (house.user.id == idOwner) {
        return next()
    } else {
        res.status(401).json({
            message: "khong co quyen+++++",
            success: false
        })

    }
}