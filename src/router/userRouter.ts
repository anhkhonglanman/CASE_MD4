import {Router} from 'express'
import userController from "../controller/userController";
import {auth} from "../middleware/auth";
const userRouter = Router()
userRouter.post('/signup', userController.signup);
userRouter.post('/login', userController.login);
userRouter.get('/:id',auth , userController.showUser);
userRouter.put('/:id', userController.editUser);
export default userRouter