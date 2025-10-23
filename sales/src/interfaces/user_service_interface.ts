import { IUser } from "./interfaces";

interface IUserService {
    /**
     * 
     * @param email 
     * @param password 
     * @returns IUser|null
     */
    getUser(email: string, password: string): Promise<IUser | null>;
}

export default IUserService;
