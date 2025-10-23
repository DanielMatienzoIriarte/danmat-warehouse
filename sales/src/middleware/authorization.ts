import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import GeneralError from "../helpers/general_error";
import config from "../config/config";
import { TokenPayload } from "../interfaces/interfaces";
import { AuthorizationRequest } from "../requests/authorization_request";

const jwtSecret = config.SECRET_KEY as Secret;

const authorization = (request: AuthorizationRequest, response: Response, next: NextFunction) => {
    //
    const authorization = request.headers.authorization;
    if (!authorization) {
        return next(new GeneralError(StatusCodes.UNAUTHORIZED, "Unouthorizaed Access"));
    }

    const [, token] = authorization.split('');

    try {
        const decodedToken = jwt.verify(token, jwtSecret) as TokenPayload;
        //console.log('28', decodedToken);
        request.user = {
            id: decodedToken.id,
            email: '',
            password: '',
            is_active: true
        };

        return next();
    } catch (error:any) {
        return next(new GeneralError(StatusCodes.UNAUTHORIZED, "Unouthorizaed Access"));
    }
};

export default authorization;
