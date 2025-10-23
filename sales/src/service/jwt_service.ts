import { IUser } from "../interfaces/interfaces";
import config from "../config/config";
import jwt, { Secret } from "jsonwebtoken";
import IJWTService from "../interfaces/jwt_service_interface";

const jwtSecret = config.SECRET_KEY as Secret;

class JWTService implements IJWTService {
    
    /**
    * @inheritdoc
    */
    public createToken(user: IUser): string {
        const { id } = user;
        const token = jwt.sign(
            { id },
            jwtSecret,
            {expiresIn: '1d'},
        );

        return token;
    }
};

export default JWTService;
