
export interface LoginUser{
    _id: string;
    userId?: string;
    firstName?: string;
    lastName?: string;
    email ?: string;
    phone ?: string;
    type ?: string;
    image?:string;
}

export default interface LoginResponse{
    user: LoginUser;
    token: string;
    message ?: string;
    status ?: string;
}

