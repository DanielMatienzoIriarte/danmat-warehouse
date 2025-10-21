import { IUser } from "../interfaces/interfaces";
import config from "../config/config";
import jwt, { Secret } from "jsonwebtoken";

const jwtSecret = config.SECRET_KEY as Secret;

class JWTService {
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
