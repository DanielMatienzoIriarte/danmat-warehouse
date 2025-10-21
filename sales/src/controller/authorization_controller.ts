import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../database/entities/user";
import GeneralError from "../helpers/general_error";
import { IUser } from "../interfaces/interfaces";
import UserRepository from "../database/repositories/user_repository";
import IUserRepository from "../interfaces/user_repository_interface";
import AuthorizationService from '../service/authorization_service';
import IAuthorizationService from "../interfaces/authorization_interface";

class AuthorizationController {
    private userRepository: IUserRepository;
    private authService: IAuthorizationService

    constructor() {
        this.userRepository = new UserRepository();
        this.authService = new AuthorizationService
    };
    
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

            this.authService.createCookie(user, response);

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
