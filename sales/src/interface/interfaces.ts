export interface TokenPayload {
    id: string;
};

export interface IUser {
    id: string;
    email: string;
    password: string;
    is_active: boolean;
    updated_ad: string;
};
