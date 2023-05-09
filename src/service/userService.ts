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
                                                        where username = "${user.username}"`);
        let usserFinds = userFind[0]
        console.log(usserFinds)
        if (usserFinds) {
            let pass = await bcrypt.compare(user.password, usserFinds.password);
            if (pass) {
                let payload = {
                    id: usserFinds.id,
                    username: user.username,
                    role: usserFinds.roleId
                }
                console.log(payload)
                return jwt.sign(payload, SECRET, {
                    expiresIn: 36000 * 10 * 100
                })
            }

        } else {
            return 'khong dung pass';
        }
    }

    findUserById = async (userId) => {
        let userFind = await this.userRepository.findOneBy({
            id: userId
        })
        return userFind;
    }
    updateUser = async (id, user) => {
        user.password = await bcrypt.hash(user.password, 10)
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