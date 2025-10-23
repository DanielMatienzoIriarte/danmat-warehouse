import { IUser } from "../interfaces/interfaces";
import IUserRepository from "../interfaces/user_repository_interface";
import UserRepository from "../database/repositories/user_repository";
import IUserService from "../interfaces/user_service_interface";

class UserService implements IUserService{
    userRepository: IUserRepository
    
    /**
     * 
     * @param userRepository IUserRepository
     */
    constructor(userRepository?: IUserRepository) {
        this.userRepository = userRepository || new UserRepository();
    }

    /**
     * @inheritdoc
     */
    getUser = async (email: string, password: string): Promise<IUser | null> => {
        return await this.userRepository.findOne(email, password);
    }
};

export default UserService;
