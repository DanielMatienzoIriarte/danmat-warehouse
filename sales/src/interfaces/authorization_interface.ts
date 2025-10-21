import { Response } from "express";
import { IUser } from "./interfaces";

interface IAuthorizationService {
    /**
     * Creates a cookie carrying a JWT and adds it to the response.
     * @param user IUser
     * @param response Response
     */
    createCookie(user: IUser, response: Response): void;
}

export default IAuthorizationService;
