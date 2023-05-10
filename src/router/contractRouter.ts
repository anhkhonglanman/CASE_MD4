import {Router} from "express";
import contractController from "../controller/contractController";
import {auth} from "../middleware/auth";
import {checkRoleClient} from "../middleware/checkRoleClient";
import {checkContractClien} from "../middleware/checkContractClien";



const contractRouter = Router();

contractRouter.get('', contractController.getAll)
contractRouter.get('/:id', auth, contractController.getContractById)
contractRouter.put('/:id', auth, checkRoleClient, contractController.editContractByClient)
contractRouter.post('/', auth, checkRoleClient, contractController.createContractByClient)
contractRouter.delete('/:id', auth, checkRoleClient, checkContractClien, contractController.cancelContract)
export default  contractRouter