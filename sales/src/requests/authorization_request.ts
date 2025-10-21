import { Request } from "express";
import { IUser } from "../interface/interfaces";

export interface AuthorizationRequest extends Request {
    user: IUser
};
