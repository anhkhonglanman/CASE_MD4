import contractService from "../service/contractService";

export const checkContractClien = async (req, res, next,) => {
    let idContract = req.params.id
    let idUser = req['decode'].id;
    let contract = await contractService.getContractByID(parseInt(idContract));
    if (contract.user.id == idUser) {
        return next()
    } else {
        res.status(401).json({
            message: "ban khong co quyen ben checkContract",
            success: false
        })

    }
}