import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import GeneralError from "../helpers/general_error";
import UserService from "../service/user_service";
import IUserService from "../interfaces/user_service_interface";
import AuthenticationService from '../service/authentication_service';
import IAuthorizationService from "../interfaces/authorization_interface";

class AuthenticationController {
    private userService: IUserService;
    private authService: IAuthorizationService

    constructor(userService?: IUserService, authService?: IAuthorizationService) {
        this.userService = userService || new UserService();
        this.authService = authService || new AuthenticationService();
    };
    
    /**
     * 
     * @param request Request
     * @param response Response
     * @returns Promise<Response<any, Record<string, any>>>
     */
    public login = async(request: Request, response: Response): Promise<Response<any, Record<string, any>>> => {
        try {
            const { email, password } = request.body;
            const user = await this.userService.getUser(email, password);

            if (!user) {
                return response.json({
                    status: StatusCodes.UNAUTHORIZED,
                    message: 'Incorrect Credentials',
                });
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

export default AuthenticationController;
