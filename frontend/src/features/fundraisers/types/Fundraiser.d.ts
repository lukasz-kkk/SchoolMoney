export type Fundraiser = {
    id: number;
    name: string;
    description: string;
    amountPerPerson: number;
    startDate: Date;
    endDate: Date;
    groupId: number;
    ownerId: number;
};
