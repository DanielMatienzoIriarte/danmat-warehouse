import { Repository } from "typeorm";
import User from "../entities/user";
import dataSource from "../../config/data-source";
import IUserRepository from "../../interface/user_repository_interface";

class UserRepository implements IUserRepository {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = dataSource.getRepository(User);
    }

    /**
     * @inheritdoc
     */
    public async findOne(email: string, password: string): Promise<User | null> {
        const user = await this.userRepository.findOne({
            where: {
                email: email,
                password: password
            },
            select: ['id', 'email', 'password', 'updated_at', 'created_at']
        })
        
        return user;
    }

}

export default UserRepository;
