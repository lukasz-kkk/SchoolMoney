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

type CreateGroupRequest = {
    name: string;
};

type RenameGroupRequest = {
    groupId: number;
    newName: string;
};

export class GroupsService {
    public static async getOwn(): Promise<Group[]> {
        const { data } = await requestClient.get<GroupDto[]>("/Group/ByLoggedUser");
        return data.map(GroupsService.mapDtoToGroup);
    }

    public static async create(body: CreateGroupRequest): Promise<Group> {
        const { data } = await requestClient.post<GroupDto>("/Group", body);
        return GroupsService.mapDtoToGroup(data);
    }

    public static async rename(body: RenameGroupRequest): Promise<void> {
        await requestClient.put(`/Group/${body.groupId}/Name`, body);
    }

    private static mapDtoToGroup(dto: GroupDto): Group {
        return {
            name: dto.name,
            id: dto.id,
            createdAt: new Date(dto.createdAt),
            treasurer: {
                id: dto.id,
                firstName: dto.treasurerFirstName,
                lastName: dto.treasurerLastName,
            },
        };
    }
}
