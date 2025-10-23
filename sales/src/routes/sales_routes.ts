import Router from "express";
import AuthenticationController from "../controller/authentication_controller";


const salesRouter = Router();

const authenticationController = new AuthenticationController();

salesRouter.post(
    '/login',
    authenticationController.login
);

export default salesRouter;
