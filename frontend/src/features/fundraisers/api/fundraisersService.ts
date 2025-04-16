import { requestClient } from "@/lib/request/requestClient";
import { Fundraiser } from "@/features/fundraisers/types/Fundraiser";

type FundraiserDto = {
    id: number;
    name: string;
    description: string;
    amountPerPerson: number;
    startDate: string;
    endDate: string;
    classId: number;
};

type CreateFundraiserRequest = {
    name: string;
};

export class FundraisersService {
    public static async create(body: CreateFundraiserRequest): Promise<Fundraiser> {
        const { data } = await requestClient.post<FundraiserDto>("/Fundraisers", body);
        return FundraisersService.mapDtoToFundraiser(data);
    }

    public static async close(id: number): Promise<void> {
        await requestClient.delete(`/Fundraisers/${id}`);
    }

    private static mapDtoToFundraiser(dto: FundraiserDto): Fundraiser {
        return {
            name: dto.name,
            id: dto.id,
            amountPerPerson: dto.amountPerPerson,
            classId: dto.classId,
            endDate: new Date(dto.endDate),
            startDate: new Date(dto.startDate),
            description: dto.description,
        };
    }
}
