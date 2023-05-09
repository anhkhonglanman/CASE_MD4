import {AppDataSource} from "../data-source";
import {Contract} from "../entity/contract";

class ContractService {
    private contractRepository;

    constructor() {
        this.contractRepository = AppDataSource.getRepository(Contract);
    }

    getContractByUserID = async (id) => {

        let contract = await this.contractRepository.find({
            relations: {
                house: true
            },
            where: {
                house: id
            }
        })
        return contract
    }


    getContractByID = async (id) => {

        let contract = await  AppDataSource.createQueryBuilder()
            .select("contract")
            .from(Contract, "contract")
            .where({id : id})
            .getOne()
        return contract
    }
    showAll = async () => {
        let contract = await this.contractRepository.find();
        return contract
    }
    updateContractByClient = async (id, data) => {
        let contract = await this.contractRepository
            .createQueryBuilder()
            .update()
            .set({
                startMonth: data.startMonth,
                endMonth: data.endMonth,
            })
            .where("id = :id", {id: id})
            .execute();

        return contract;
    }
    addContractByClient = async (id, data, cost, userId, price) => {
        await this.contractRepository
            .createQueryBuilder()
            .insert()
            .into(Contract)
            .values({
                    price: price,
                    startMonth: data.startMonth,
                    endMonth: data.endMonth,
                    cost: cost,
                    house: id,
                    user: userId
                }
            )
            .execute()
    }
}

export default new ContractService();