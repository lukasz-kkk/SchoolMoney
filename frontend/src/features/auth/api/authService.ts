import { User, UserRole } from "@/types/User";
import { requestClient } from "@/lib/request/requestClient";

type UserDTO = {
    id: number;
    firstName: string;
    lastName: string;
    login: string;
    role: UserRole;
    dateOfBirth: string;
    isActive: boolean;
};

type SignInRequestBody = {
    login: string;
    password: string;
};

type SignUpRequestBody = {
    login: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
};

export class AuthService {
    public static async signIn(body: SignInRequestBody): Promise<User> {
        const { data } = await requestClient.post<UserDTO>("/authentication/login", body);
        return AuthService.mapDtoToUser(data);
    }

    public static async signUp(body: SignUpRequestBody): Promise<User> {
        const { data } = await requestClient.post<UserDTO>("/authentication/register", body);
        return AuthService.mapDtoToUser(data);
    }

    public static async logOut(): Promise<void> {
        await requestClient.post("/authentication/logout");
    }

    public static async getMyself(): Promise<User> {
        const { data } = await requestClient.get<UserDTO>("/user/loggedin");
        return AuthService.mapDtoToUser(data);
    }

    private static mapDtoToUser({ firstName, lastName, role, login, id, isActive, dateOfBirth }: UserDTO): User {
        return {
            id,
            login,
            role,
            firstName,
            lastName,
            dateOfBirth,
            isActive,
        };
    }
}
