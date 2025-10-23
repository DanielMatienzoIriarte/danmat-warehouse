import { Request } from "express";
import { IUser } from "../interfaces/interfaces";

export interface AuthorizationRequest extends Request {
    user: IUser
};
