import User from "../database/entities/user";

interface IUserRepository {
    /**
     * Fetches a single User entity based on provided options.
     * @param email string
     * @param password string
     * 
     * @returns Promise<User | null>
     */
    findOne(email: string, password: string): Promise<User | null>;
}

export default IUserRepository;
