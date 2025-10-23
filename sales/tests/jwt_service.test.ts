import { IUser } from "../src/interfaces/interfaces";
import JWTService from "../src/service/jwt_service";
import IJWTService from "../src/interfaces/jwt_service_interface";

describe('JWT Service', () => {
    let jWTService:IJWTService;
    let mockedUser: IUser;

    beforeEach(() => {
        jest.clearAllMocks();

        jWTService = new JWTService();
        mockedUser = {
            id: '',
            email: 'test@test.aaa',
            password: 'Password123@'
        };
    });

    describe('createToken', () => {
        it('a valid token should have 36 chars', async() => {
            const jwtToken = jWTService.createToken(mockedUser);

            expect(jwtToken.length == 36);
        });
    });
});
