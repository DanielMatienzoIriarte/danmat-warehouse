import { IUser } from "./interfaces";

interface IJWTService {
/**
    * Creates a token for an specific user.
    * @param user IUser
    * @param response Response
    * @returns string
    */
    createToken(user: IUser): string;
}

export default IJWTService;
