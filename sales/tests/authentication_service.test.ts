import { Request, Response } from 'express';
import { IUser } from '../src/interfaces/interfaces';
import AuthenticationService from '../src/service/authentication_service';
import IAuthenticationService from '../src/interfaces/authorization_interface';
import JWTService from '../src/service/jwt_service';
import IJWTService from '../src/interfaces/jwt_service_interface';

jest.mock('../src/service/jwt_service', () => ({
    JWTService: jest.fn().mockImplementation(() => ({
        createToken: jest.fn(),
    })),
}));

describe('authentication Service', () => {
    let jwtServiceMock: any;
    let authService:IAuthenticationService;
    let requestMock: Partial<Request>;
    let responseMock: Partial<Response>;
    let cookieSpy: jest.Mock;

    const jwt = '7bdb5b776f6fd2a887e9fd1bb9670aa3';

    let mockedUser: IUser = {
        id: '123',
        email: 'test@test.aaa',
        password: 'Password123@'
    };

    cookieSpy = jest.fn();
    requestMock = {};
    responseMock = {
        render: jest.fn(),
        cookie: cookieSpy,
    };

    beforeEach(() => {
        jest.clearAllMocks();

        jwtServiceMock = new JWTService();
        authService = new AuthenticationService(jwtServiceMock);
    });

    describe('CreateCookie', () => {
        it ('Should create a Cookie and add it to the response', async() => {
            jwtServiceMock.createToken.mockResolvedValue(jwt);
            authService.createCookie(mockedUser, responseMock as Response);

            expect(cookieSpy).toHaveBeenCalledWith('jwt');
        });
    });
});
