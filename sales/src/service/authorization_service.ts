import { Request, Response } from "express";
import { IUser } from "../interfaces/interfaces";
import IJWTService from "../interfaces/jwt_service_interface";
import JWTService from "../service/jwt_service";
import IAuthorizationService from '../interfaces/authorization_interface';

const COOKIE_EXPIRATION_DAYS = 3;
const expirationDate = new Date(
    Date.now() + COOKIE_EXPIRATION_DAYS * 24 * 60 * 60 * 1000
);
const cookieOptions = {
    expires: expirationDate,
    secure: false,
    httpOnly: true,
};

class AuthorizationService implements IAuthorizationService{
    private jwtService: IJWTService;

    constructor() {
        this.jwtService = new JWTService();
    };
    /**
     * @inheritdoc
     */
    public createCookie(user: IUser, response: Response) {
        const token = this.jwtService.createToken(user);

        response.cookie('jwt', token, cookieOptions);
    }
}

export default AuthorizationService;
