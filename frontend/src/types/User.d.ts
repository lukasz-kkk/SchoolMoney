export type UserRole = "Admin" | "User";

export type User = {
    id: number;
    firstName: string;
    lastName: string;
    login: string;
    dateOfBirth: string;
    role: UserRole;
    isActive: boolean;
};
