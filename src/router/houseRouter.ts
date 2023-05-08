import {Router} from 'express'
import {auth} from "../middleware/auth";
import {checkRoleLandlord} from "../middleware/checkRoleLandlord";
import {checkOwnerShip} from "../middleware/checkOwnerShip";
import houseController from "../controller/houseController";

const houseRouter = Router()
houseRouter.get('/', houseController.showAllHouse);
houseRouter.get('/search', houseController.searchHouse);
houseRouter.get('/:id',houseController.showHouseById);

// auth, checkRoleLandlord, checkOwnerShip,
houseRouter.post('/', auth, checkRoleLandlord, houseController.createHouse);
houseRouter.put('/:id', auth, checkRoleLandlord, checkOwnerShip,houseController.editHouseById);
houseRouter.delete('/:id', auth, checkRoleLandlord, checkOwnerShip, houseController.delete);

export default houseRouter