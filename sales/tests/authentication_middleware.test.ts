import { Response, NextFunction, response } from 'express';
import * as JSONWebToken from 'jsonwebtoken';
import { AuthorizationRequest } from '../src/requests/authorization_request';
import GeneralError from '../src/helpers/general_error';
import authorization from '../src/middleware/authorization';
import { IUser } from '../src/interfaces/interfaces';
import { StatusCodes } from 'http-status-codes';

describe('authentication middleware', () => {
    let mockRequest: Partial<AuthorizationRequest>;
    let mockResponse: Partial<Response>;
    let mockNext: NextFunction;
    let mockedUser: IUser;
    let unauthorizedError: GeneralError;
    const mockFunction = jest.spyOn(JSONWebToken, 'verify').mockReturnValue();

    const jwt = '7bdb5b776f6fd2a887e9fd1bb9670aa3';

    beforeEach(() => {
        jest.clearAllMocks();

        mockedUser = {
            id: '',
            email: 'test@test.aaa',
            password: 'Password123@'
        };

        unauthorizedError = new GeneralError(StatusCodes.UNAUTHORIZED, "Unouthorizaed Access");

        mockRequest = { };
        mockResponse = {
          status: jest.fn().mockReturnThis(), // Allow chaining .status().send()
          send: jest.fn(),
        };
        mockNext = jest.fn();
    });

    describe('authorization', () => {
        it('should return NextFunction with an error when authorization is missing', () => {
            mockRequest.headers = {};

            authorization(mockRequest as AuthorizationRequest, mockResponse as Response, mockNext as NextFunction);

            expect(mockNext).toHaveBeenCalledWith(unauthorizedError);
        });

        it('should add a user object the Request when a valid token is generated', () => {
            mockRequest.headers = { authorization: jwt };

            authorization(mockRequest as AuthorizationRequest, mockResponse as Response, mockNext as NextFunction);

            expect(mockNext).toHaveBeenCalledTimes(1);
            expect(mockNext).not.toHaveBeenCalledWith(unauthorizedError);
        });
    });
});
