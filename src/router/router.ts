import {Router} from "express";
import userRouter from "./userRouter";
import houseRouter from "./houseRouter";
import addressController from "../controller/addressController";
import contractController from "../controller/contractController";
import contractRouter from "./contractRouter";

const router = Router();
router.use('/users', userRouter);
router.use('/houses',houseRouter);
router.get('/city', addressController.getCity);
router.use('/contracts',contractRouter)

export default  router;