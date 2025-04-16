import { requestClient } from "@/lib/request/requestClient";
import { User, UserRole } from "@/types/User";

type UserDTO = {
    id: number;
    firstName: string;
    lastName: string;
    login: string;
    role: UserRole;
    dateOfBirth: string;
    isActive: boolean;
};

export type ChangePasswordRequestBody = {
    oldPassword: string;
    newPassword: string;
};

export class UsersService {
    public static async getAll(): Promise<User[]> {
        const { data } = await requestClient.get<UserDTO[]>("/User");
        return data.map(UsersService.mapDtoToUser);
    }

    public static async disableOne(userId: number): Promise<void> {
        await UsersService.changeIsActive(userId, false);
    }

    public static async enableOne(userId: number): Promise<void> {
        await UsersService.changeIsActive(userId, true);
    }

    private static changeIsActive(userId: number, isActive: boolean): Promise<void> {
        return requestClient.put(`/User/${userId}/IsActive?value=${isActive}`);
    }

    public static async changePassword(body: ChangePasswordRequestBody, userId: number): Promise<void> {
        await requestClient.put(`/User/${userId}/Password`, body);
    }

    private static mapDtoToUser({ firstName, lastName, dateOfBirth, role, login, id, isActive }: UserDTO): User {
        return { lastName, dateOfBirth: new Date(dateOfBirth), firstName, role, login, id, isActive };
    }
}
