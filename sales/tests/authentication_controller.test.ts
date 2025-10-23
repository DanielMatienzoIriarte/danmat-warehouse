import { Request, Response } from 'express';
import AuthenticationController from '../src/controller/authentication_controller';
import { IUser } from "../src/interfaces/interfaces";
import UserService from '../src/service/user_service';
import AuthenticationService from '../src/service/authentication_service';


describe('authentication controller', () => {
    let authenticationController: AuthenticationController;
    let userServiceMocked: jest.Mocked<UserService>;
    let authServiceMocked: jest.Mocked<AuthenticationService>;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockedUser: IUser;

    beforeEach(() => {
        jest.clearAllMocks();

        mockedUser = {
            id: '',
            email: 'test@test.aaa',
            password: 'Password123@'
        };
        mockRequest = {
            body: {
                email: 'test@test.aaa',
                password: 'Password123@'
            },
        } as Request;
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        } as unknown as Response;

        userServiceMocked = jest.mocked(
            new UserService()
        );
        userServiceMocked = {
            getUser: jest.fn(),
        } as unknown as jest.Mocked<UserService>;

        authServiceMocked = jest.mocked(
            new AuthenticationService()
        );
        authServiceMocked = {
            createCookie: jest.fn().mockResolvedValue(undefined),
        } as unknown as jest.Mocked<AuthenticationService>;

        authenticationController = new AuthenticationController(userServiceMocked);
    });

    describe('login', () => {
        it('should return a response with a 401 status when user is not existent', async() => {
            userServiceMocked.getUser.mockResolvedValue(null);

            const result = await authenticationController.login(mockRequest as Request, mockResponse as Response);

            expect(result.json).toHaveBeenCalledWith({ status: 401, message: 'Incorrect Credentials' });
        });

        it('should return a response with status code 403 when cookie is not created correctly', async() => {
            userServiceMocked.getUser.mockResolvedValue(mockedUser);

            const cookieError = { status: 403, message: 'response.cookie is not a function' };
            const result = await authenticationController.login(mockRequest as Request, mockResponse as Response);
            
            expect(userServiceMocked.getUser).toHaveBeenCalledWith(mockedUser.email, mockedUser.password);
            expect(result.json).toHaveBeenCalledWith(cookieError);
        });

        it('should return a response with a status code 200 when credentials are valid', async() => {
            userServiceMocked.getUser.mockResolvedValue(mockedUser);
            authServiceMocked.createCookie.mockResolvedValue;

            mockResponse = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
                cookie: jest.fn(),
            } as unknown as Response;

            const loggedUser = { status: 200, message: 'User logged in successfully' };
            const result = await authenticationController.login(mockRequest as Request, mockResponse as Response);

            expect(result.json).toHaveBeenCalledWith(loggedUser);

        });
    });
});