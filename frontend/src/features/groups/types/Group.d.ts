export type Group = {
    name: string;
    id: number;
    treasurer: {
        id: number;
        firstName: string;
        lastName: string;
    };
    createdAt: Date;
};
