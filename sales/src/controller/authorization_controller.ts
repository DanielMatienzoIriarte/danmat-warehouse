import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../database/entities/user";
import GeneralError from "../helpers/general_error";
import { IUser } from "../interface/interfaces";
import UserRepository from "../database/repositories/user_repository";
import IJWTService from "../interface/jwt_service_interface";
import JWTService from "../service/jwt_service";
import IUserRepository from "../interface/user_repository_interface";

const COOKIE_EXPIRATION_DAYS = 3;
const expirationDate = new Date(
    Date.now() + COOKIE_EXPIRATION_DAYS * 24 * 60 * 60 * 1000
);
const cookieOptions = {
    expires: expirationDate,
    secure: false,
    httpOnly: true,
};

class AuthorizationController {
    private userRepository: IUserRepository;
    private jwtService: IJWTService;

    constructor() {
        this.userRepository = new UserRepository();
        this.jwtService = new JWTService();
    };

    /**
     * Creates a cookie carrying a JWT and adds it to the response.
     * @param user IUser
     * @param response Response
     */
    private createCookie(user: IUser, response: Response) {
        const token = this.jwtService.createToken(user);

        response.cookie('jwt', token, cookieOptions);
    }
    
    /**
     * 
     * @param request Request
     * @param response Response
     * @returns Promise<Response<any, Record<string, any>>>
     */
    public login = async(request: Request, response: Response): Promise<Response<any, Record<string, any>>> => {
            console.log(request);
        try {
            const { email, password } = request.body;
            const user = await this.userRepository.findOne(email, password);

            if (!request.body) {
                return response.json({
                    status: StatusCodes.BAD_REQUEST,
                    message: 'Bad Request',
                })
            }

            if (!user) {
                throw new GeneralError(
                    StatusCodes.UNAUTHORIZED,
                    'Incorrect Credentials'
                );
            }

            this.createCookie(user, response);

            return response.json({
                status: StatusCodes.OK,
                message: 'User logged in successfully',
            });
        } catch (error: any) {
            return response.json({
                status: StatusCodes.FORBIDDEN,
                message: error.message,
            });
        }
    }
}

export default AuthorizationController;
