import {AppDataSource} from "../data-source";
import {Image} from "../entity/image";
class ImageService{
    private imageRepository;
    constructor() {
        this.imageRepository = AppDataSource.getRepository(Image)
    }

    addImage = async (id, data) => {
        console.log(data)
        await data.forEach(item=>{
           this.imageRepository.save({house : id ,imageURL:`${item}`})
        })
    }
    upDateImage = async (data,id) => {
       await this.deleteImage(id);
       await this.addImage(id,data)
    }

    deleteImage = async (idHouse) => {
        await this.imageRepository
            .createQueryBuilder('users')
            .delete()
            .from(Image)
            .where({ house: idHouse })
            .execute()
    }

}
export default new ImageService()