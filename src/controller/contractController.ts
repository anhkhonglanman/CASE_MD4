import {Request, Response} from "express";
import contractService from "../service/contractService";
import houseService from "../service/houseService";


class ContractController {
    getContractByHouseId = async (req: Request, res: Response) => {
        try {
            let id = req.query.id
            let contract = await contractService.getContractByHouseID(id);
            console.log(contract)
            res.status(201).json({
                data : contract,
                success : true
            });
        } catch (error) {
            console.log("error in get contract:", error)
            res.status(400).json({
                message: 'can not fond contract by houseId',
                success: false,
            })
        }
    }


    getContractByUesrId = async (req: Request, res: Response) => {
        try {
            let user = req['decode']
            if (user.role === 2) {
                let idOwner = req['decode'].id
                let contract = await contractService.getContractByOwnerId(idOwner);
                console.log("day la id owenr")
                res.status(201).json({
                    data : contract,
                    success : true
                });
            } else {
                let idUser = req['decode'].id
                let contract = await contractService.getContractByUesrId(idUser);
                console.log("day la id user")
                res.status(201).json({
                    data : contract,
                    success : true
                });
            }

        } catch (error) {
            console.log("error in get contract:", error)
            res.status(400).json({
                message: 'can not fond contract by houseId',
                success: false,
            })
        }
    }
    getContractById = async (req: Request, res: Response) => {
        try {
            let id = req.params.id
            console.log(id)
            let contract = await contractService.getContractByID(id);
            res.status(201).json({
                data : contract,
                success : true
            });
        } catch (error) {
            console.log("error in get contract:", error)
            res.status(400).json({
                message: 'can not fond contract by id',
                success: false,
            })
        }
    }
    editContractByClient = async (req: Request, res: Response) => {
        try {
            let idContract = req.params.id;
            let contract = await contractService.updateContractByClient(parseInt(idContract), req.body)
            res.status(201).json({
                data : contract,
                success : true
            });
        } catch (error) {
            console.log("error in get contract:", error)
            res.status(400).json({
                message: 'can not fond contract by id',
                success: false
            })
        }
    }
    getAll = async (req: Request, res: Response) => {
        try {
            let contract = await contractService.showAll();
            res.status(201).json({
                data : contract,
                success : true
            });
        } catch (error) {
            console.log("error in get contract:", error)
            res.status(400).json({
                message: 'can not fond  all contract ',
                success: false
            })
        }
    }
    createContractByClient = async (req: Request, res: Response) => {
        try {
            let userId = req['decode'].id
            let house = await houseService.findHouseById(req.body.houseId);
            console.log(house)
            let price: number = house.price;
            console.log(price)
            let startMonth = req.body.startMonth
            let endMonth = req.body.endMonth
            let month: number = this.tinhSoThang(startMonth, endMonth);
            req.body.duration = month;
            let cost = month * price
            req.body.cost = cost;
            req.body.price = price;
            await contractService.addContractByClient(req.body, parseInt(userId))
            res.status(201).json({
                data : "them hop dong thanh cong",
                success : true
            });
        } catch (error) {
            console.log("error in get contract:", error)
            res.status(400).json({
                message: 'can not create Contract By Client',
                success: false
            })
        }
    }
    tinhSoThang = (thangBatDau, thangKetThuc) => {
        try {
            let thang1 = new Date(thangBatDau);
            let thang2 = new Date(thangKetThuc);
            let soThang = (thang2.getFullYear() - thang1.getFullYear()) * 12;
            soThang -= thang1.getMonth();
            soThang += thang2.getMonth();
            soThang++;
            return soThang <= 0 ? 0 : soThang;
        } catch (error) {
            console.log("error in get contract:", error)
            return 0;
        }
    }

    cancelContract = async (req: Request, res: Response) => {
        try {
            let id = req.params.id;
            let contract = await contractService.getContractByID(id);
            let startmonth = contract.startMonth.getMonth() + 1;
            let year = contract.startMonth.getFullYear();
            let date = new Date()
            let currentMonth = date.getMonth() + 1;
            let currentYear = date.getFullYear();
            console.log("start:", startmonth, year)
            console.log("now:", currentMonth, currentYear)
            console.log(startmonth < currentMonth, typeof startmonth, typeof currentMonth)
            if (year === currentYear) {
                if (currentMonth < startmonth) {
                    await contractService.cancelContractByUser(id);
                    res.status(201).json(" huy hop dong thanh cong");
                } else {
                    res.status(201).json({
                        message: "huy hop dong khong thanh cong month > now",
                        success: false
                    });
                }
            } else if (currentYear < year) {
                await contractService.cancelContractByUser(id);
                res.status(201).json(" huy hop dong thanh cong");
            } else {
                res.status(201).json(" huy hop dong khong thanh cong year > now");
            }
        } catch (error) {
            console.log("error in get contract:", error)
            res.status(400).json({
                message: 'can not create cancel Contract By Client',
                success: false
            })
        }
    }


}

export default new ContractController();