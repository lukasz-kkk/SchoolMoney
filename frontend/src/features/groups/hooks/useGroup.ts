import { useGroups } from "@/features/groups/hooks/useGroups";

export const useGroup = (id: number) => {
    const { data } = useGroups();

    return { data: data?.find((fundraiser) => fundraiser.id === id) };
};
