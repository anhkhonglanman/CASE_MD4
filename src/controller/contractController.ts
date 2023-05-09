import {Request, Response} from "express";
import contractService from "../service/contractService";
import houseService from "../service/houseService";


class ContractController {
    getContractByHouseId = async (req: Request, res: Response) => {
        let id = req['decode'].id
        let contract = await contractService.getContractByHouseID(id);
        res.status(201).json(contract);
    }
    getContractById = async (req: Request, res: Response) => {
        let id = req.params.id
        console.log(id)
        let contract = await contractService.getContractByID(id);
        res.status(201).json(contract);
    }
    editContractByClient = async (req: Request, res: Response) => {
        let idContract = req.params.id;
        let contract = await contractService.updateContractByClient(parseInt(idContract), req.body)
        res.status(201).json(contract);
    }
    getAll = async (req: Request, res: Response) => {
        let contract = await contractService.showAll();
        res.status(201).json(contract);
    }
    createContractByClient = async (req: Request, res: Response) => {
        let userId = req['decode'].id
        let houseId = req.body.houseId;
        let house = await houseService.findHouseById(houseId);
        console.log(house)
        let price: number = house.price;
        console.log(price)
        let startMonth = req.body.startMonth
        let endMonth = req.body.endMonth
        let month: number = this.tinhSoThang(startMonth, endMonth);
        let cost = month * price
        await contractService.addContractByClient(houseId, req.body, cost, parseInt(userId), price)
        res.status(201).json("them hop dong  thanh cong");
    }
    tinhSoThang = (thangBatDau, thangKetThuc) => {
        let thang1 = new Date(thangBatDau);
        let thang2 = new Date(thangKetThuc);
        let soThang = (thang2.getFullYear() - thang1.getFullYear()) * 12;
        soThang -= thang1.getMonth();
        soThang += thang2.getMonth();
        return soThang <= 0 ? 0 : soThang;
    }

    cancelContract = async (req: Request, res: Response) => {
        let id = req.params.id;
        let contract = await contractService.getContractByID(id);
        let startmonth = contract.startMonth.getMonth() + 1;
        let year = contract.startMonth.getFullYear();
        let date = new Date()
        let mm = date.getMonth() + 1;
        let yearNow = date.getFullYear();
        if (year === yearNow) {
            if (startmonth < mm) {
                await contractService.cancelContractByUser(id);
                res.status(201).json(" huy hop dong  thanh cong");
            } else {
                res.status(201).json(" huy hop dong khong thanh cong");
            }
        } else {
            res.status(201).json(" huy hop dong  thanh cong");
        }

    }
}

export default new ContractController();