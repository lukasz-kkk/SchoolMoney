import { requestClient } from "@/lib/request/requestClient";
import { Group } from "@/features/groups/types/Group";
import { downloadFileFromBytes } from "@/utils/fileUtils.ts";

type GroupDto = {
    id: number;
    name: string;
    treasurerId: number;
    treasurerLastName: string;
    treasurerFirstName: string;
    createdAt: Date;
};

type JoinCodeDto = {
    joinCode: string;
};

type CreateGroupRequest = {
    name: string;
};

type RenameGroupRequest = {
    groupId: number;
    newName: string;
};

type AddChildToGroupRequest = {
    childId: number;
    joinCode: string;
};

export class GroupsService {
    public static async getAll(): Promise<Group[]> {
        const { data } = await requestClient.get<GroupDto[]>("/group");
        return data.map(GroupsService.mapDtoToGroup);
    }

    public static async getOwn(): Promise<Group[]> {
        const { data } = await requestClient.get<GroupDto[]>("/group/byLoggedUser");
        return data.map(GroupsService.mapDtoToGroup);
    }

    public static async getJoinCode(groupId: number): Promise<string> {
        const { data } = await requestClient.get<JoinCodeDto>(`/group/${groupId}/joinCode`);
        return data.joinCode;
    }

    public static async refreshJoinCode(groupId: number): Promise<void> {
        await requestClient.post<JoinCodeDto>(`/group/${groupId}/refreshJoinCode`);
    }

    public static async create(body: CreateGroupRequest): Promise<Group> {
        const { data } = await requestClient.post<GroupDto>("/group", body);
        return GroupsService.mapDtoToGroup(data);
    }

    public static async rename(body: RenameGroupRequest): Promise<void> {
        await requestClient.put(`/group/${body.groupId}/name`, body);
    }

    public static async addChildToGroup(body: AddChildToGroupRequest): Promise<void> {
        await requestClient.post("/joinByCode", body);
    }

    public static async downloadReport(id: number): Promise<void> {
        const { data } = await requestClient.get(`/group/${id}/raport`);
        downloadFileFromBytes(`Raport z klasy #${id}, ${new Date().toISOString()}.csv`, data);
    }

    private static mapDtoToGroup(dto: GroupDto): Group {
        return {
            name: dto.name,
            id: dto.id,
            createdAt: new Date(dto.createdAt),
            treasurer: {
                id: dto.treasurerId,
                firstName: dto.treasurerFirstName,
                lastName: dto.treasurerLastName,
            },
        };
    }
}
