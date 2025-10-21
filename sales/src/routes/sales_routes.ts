import Router from "express";
import AuthorizationController from "../controller/authorization_controller";

const salesRouter = Router();
const authorizationController = new AuthorizationController();

salesRouter.post(
    '/login',
    authorizationController.login
);

export default salesRouter;
