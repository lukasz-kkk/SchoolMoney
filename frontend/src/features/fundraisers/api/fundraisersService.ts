import { requestClient } from "@/lib/request/requestClient";
import { Fundraiser } from "@/features/fundraisers/types/Fundraiser";
import { FinancialAccountNumber } from "@/features/finances/types/Finances";
import dayjs from "dayjs";

type FundraiserDto = {
    id: number;
    name: string;
    description: string;
    amountPerPerson: number;
    startDate: string;
    endDate: string;
    groupId: number;
    ownerId: number;
    financialAccountId: number;
    accountNumber: FinancialAccountNumber;
    accountBalance: number;
    isBlocked: boolean;
};

type CreateFundraiserRequest = {
    name: string;
    description: string;
    amountPerPerson: number;
    startDate: string;
    endDate: string;
    groupId: number;
};

type UpdateFundraiserRequest = {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
};

export class FundraisersService {
    public static async getAll(): Promise<Fundraiser[]> {
        const { data } = await requestClient.get<FundraiserDto[]>("/Fundraiser");
        return data.map(FundraisersService.mapDtoToFundraiser);
    }

    public static async getByGroup(groupId: number): Promise<Fundraiser[]> {
        const { data } = await requestClient.get<FundraiserDto[]>(`/Fundraiser/group/${groupId}`);
        return data.map(FundraisersService.mapDtoToFundraiser);
    }

    public static async create(body: CreateFundraiserRequest): Promise<Fundraiser> {
        const { data } = await requestClient.post<FundraiserDto>("/Fundraiser", body);
        return FundraisersService.mapDtoToFundraiser(data);
    }

    public static async update(dto: UpdateFundraiserRequest & { id: number }): Promise<Fundraiser> {
        const { data } = await requestClient.put<FundraiserDto>(`/Fundraiser/${dto.id}`, dto);
        return FundraisersService.mapDtoToFundraiser(data);
    }

    public static async close(id: number): Promise<void> {
        await requestClient.delete(`/Fundraiser?id=${id}`);
    }

    public static async suspend(id: number): Promise<void> {
        await requestClient.put(`/Fundraiser/${id}/block`);
    }

    public static async unlock(id: number): Promise<void> {
        await requestClient.put(`/Fundraiser/${id}/unlock`);
    }

    public static async excludeParticipant(dto: { fundraiserId: number; childId: number }): Promise<void> {
        await requestClient.put(`/Fundraiser/${dto.fundraiserId}/exclude`, dto);
    }

    private static mapDtoToFundraiser(dto: FundraiserDto): Fundraiser {
        return {
            name: dto.name,
            id: dto.id,
            amountPerPerson: dto.amountPerPerson,
            groupId: dto.groupId,
            ownerId: dto.ownerId,
            endDate: new Date(dto.endDate),
            startDate: new Date(dto.startDate),
            description: dto.description,
            isBlocked: dto.isBlocked,
            hasStarted: dayjs().isAfter(dto.startDate),
            hasFinished: dayjs().isAfter(dto.endDate),
            account: {
                accountNumber: dto.accountNumber,
                balance: dto.accountBalance,
            },
        };
    }
}
