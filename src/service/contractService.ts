import {AppDataSource} from "../data-source";
import {Contract} from "../entity/contract";

class ContractService {
    private contractRepository;

    constructor() {
        this.contractRepository = AppDataSource.getRepository(Contract);
    }

    getContractByHouseID = async (id) => {

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
        let contract = await AppDataSource.createQueryBuilder()
            .select("contract")
            .addSelect("user.id")
            .addSelect('contract.id')
            .from(Contract, "contract")
            .innerJoin("contract.user", "user")
            .innerJoinAndSelect("contract.status", "Status")
            .where({id: id})
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
                    user: userId,
                    status: 3
                }
            )
            .execute()
    }

    cancelContractByUser = async (id) => {
        let contract = await this.contractRepository
            .createQueryBuilder()
            .update()
            .set({
                status: 4
            })
            .where("id = :id", {id: id})
            .execute();


        return contract;
    }
}

export default new ContractService();