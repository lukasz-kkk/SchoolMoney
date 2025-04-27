import { requestClient } from "@/lib/request/requestClient";
import { Group } from "@/features/groups/types/Group";

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
        const { data } = await requestClient.get<GroupDto[]>("/Group");
        return data.map(GroupsService.mapDtoToGroup);
    }

    public static async getOwn(): Promise<Group[]> {
        const { data } = await requestClient.get<GroupDto[]>("/Group/ByLoggedUser");
        return data.map(GroupsService.mapDtoToGroup);
    }

    public static async getJoinCode(groupId: number): Promise<string> {
        const { data } = await requestClient.get<JoinCodeDto>(`/Group/${groupId}/JoinCode`);
        return data.joinCode;
    }

    public static async refreshJoinCode(groupId: number): Promise<void> {
        await requestClient.post<JoinCodeDto>(`/Group/${groupId}/RefreshJoinCode`);
    }

    public static async create(body: CreateGroupRequest): Promise<Group> {
        const { data } = await requestClient.post<GroupDto>("/Group", body);
        return GroupsService.mapDtoToGroup(data);
    }

    public static async rename(body: RenameGroupRequest): Promise<void> {
        await requestClient.put(`/Group/${body.groupId}/Name`, body);
    }

    public static async addChildToGroup(body: AddChildToGroupRequest): Promise<void> {
        await requestClient.post("/JoinByCode", body);
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
