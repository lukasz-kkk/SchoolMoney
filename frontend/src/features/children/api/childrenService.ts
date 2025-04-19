import { requestClient } from "@/lib/request/requestClient";
import { BaseChild } from "@/features/children/types/Child";

type CreateChildRequestBody = {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
};

type UpdateChildRequestBody = {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
};

type ChildDto = {
    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    createdAt: string;
    parentId: number;
    groupId: number;
    isAccepted: boolean;
};

type AcceptChildRequest = {
    childId: number;
    accept: boolean;
};

export class ChildrenService {
    public static async createOne(body: CreateChildRequestBody): Promise<void> {
        await requestClient.post("/Child", body);
    }

    public static async updateOne(body: UpdateChildRequestBody, id: number): Promise<void> {
        await requestClient.put(`/Child/${id}/`, body);
    }

    public static async accept(body: AcceptChildRequest): Promise<void> {
        await requestClient.put(`/Child/${body.childId}/IsAccepted?is_accepted=${body.accept}`);
    }

    public static async removeOne(id: number): Promise<void> {
        await requestClient.delete(`/Child/${id}/`);
    }

    public static async getOwn(): Promise<BaseChild[]> {
        const { data } = await requestClient.get<ChildDto[]>("/Child/ByLoggedUser");
        return data.map(ChildrenService.mapDtoToChild);
    }

    public static async getByGroup(id: number): Promise<BaseChild[]> {
        const { data } = await requestClient.get<ChildDto[]>(`/Child/ByGroup/${id}`);
        return data.map(ChildrenService.mapDtoToChild);
    }

    public static async getByParent(id: number): Promise<BaseChild[]> {
        const { data } = await requestClient.get<ChildDto[]>(`/Child/ByParent/${id}`);
        return data.map(ChildrenService.mapDtoToChild);
    }

    private static mapDtoToChild(dto: ChildDto): BaseChild {
        return {
            id: dto.id,
            firstName: dto.firstName,
            lastName: dto.lastName,
            dateOfBirth: new Date(dto.dateOfBirth),
            createdAt: new Date(dto.createdAt),
            parentId: dto.parentId,
            groupId: dto.groupId,
            isAccepted: dto.isAccepted,
        };
    }
}
