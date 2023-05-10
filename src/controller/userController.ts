import {Request, Response} from "express";
import userService from "../service/userService";

class UserController{

    signup = async (req: Request, res: Response) => {
        try {
            let check = await userService.checkUsersignup(req.body)
            if (!check) {
                let newUser = await userService.createUser(req.body);
                res.status(201).json(newUser);
            } else {
                res.status(201).json('tai khoan da ton tai');
            }
        }catch (e){
            console.log("error in signup:",e )
            res.status(400).json({
                message: 'error in signup',
                success: false
            })
        }

    }
    showUser = async (req: Request, res: Response) => {
        try {
            let userId = req.params.id;
            let user = await userService.findUserById(userId)
            res.status(201).json(user);
            return user
        }catch (e){
            console.log("error in showUser")
            res.status(500).json({
                message: 'error in showUser',
                success: false
            })
        }
    }

    editUser = async (req: Request, res: Response) => {
        try {
            let user = req.body;
            let id = req.params.id
            let newUser = await userService.updateUser(id, user);
            res.status(201).json(newUser);
        }catch (e){
            console.log("error in editUser")
            res.status(500).json({
                message: 'error in editUser',
                success: false
            })
        }
    }


    login = async (req: Request, res: Response) => {
        try {
            let userData = req.body;
            let user = await userService.checkUser(userData);
            res.status(200).json(user);
        }catch (e){
            console.log("error in login")
            res.status(400).json({
                message: 'error in login',
                success: false
            })
        }


    }

}
export default new UserController();