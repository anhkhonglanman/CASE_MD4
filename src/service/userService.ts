import {AppDataSource} from "../data-source";
import {User} from "../entity/user";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import {SECRET} from "../middleware/auth";

class UserService {
    private userRepository;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User)
    }


    createUser = async (user) => {
        let password = await bcrypt.hash(user.password, 10)
        let newUser = new User();
        newUser.name = user.name;
        newUser.phoneNumber = user.phoneNumber;
        newUser.address = user.address;
        newUser.username = user.username;
        newUser.password = password;
        newUser.role = parseInt(user.role)
        await this.userRepository.save(newUser);
        return newUser
    }
    checkUser = async (user) => {
        let userFind = await this.userRepository.query(`select *
                                                        from user
                                                        where username = "${user.username}"`)
        let usserFinds = userFind[0]
        if (usserFinds) {
            let pass = await bcrypt.compare(user.password, usserFinds.password);
            if (pass) {
                let payload ;
                if (usserFinds.role === 1) {
                    payload = {
                        id: usserFinds.id,
                        username: user.username,
                        role: 1
                    }
                } else {
                    payload = {
                        id: usserFinds.id,
                        username: user.username,
                        role: 2
                    }
                }
                return jwt.sign(payload, SECRET, {
                    expiresIn: 36000 * 10 * 100
                })
            } else {
                return 'khong dung pass';
            }

        } else {
            return 'khong dung tai khoan hoac mat khau'
        }
    }

    findUserById = async (userId) => {
        let userFind = await this.userRepository.findOneBy({
            id: userId
        })
        return userFind;
    }
    updateUser = async (id, user) => {
        await this.userRepository.update({id: id}, user);
    }
    checkUsersignup = async (user) => {
        let userFind = await this.userRepository.findOne({
            where: {
                username: user.username,
                // password: user.password
            }
        });
        return userFind;
    }
}
export default new UserService();