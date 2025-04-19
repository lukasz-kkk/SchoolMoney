import { useMutation } from "@tanstack/react-query";
import { ChildrenService } from "@/features/children/api/childrenService";
import { QueryKey, useInvalidateQuery } from "@/lib/apiClient";

type SaveChildOptions = {
    id?: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
};

const saveChild = async (child: SaveChildOptions): Promise<void> => {
    if (child.id) {
        return ChildrenService.updateOne(child, child.id);
    } else {
        return ChildrenService.createOne(child);
    }
};

export const useSaveChild = () => {
    const { invalidate } = useInvalidateQuery();

    return useMutation({
        mutationFn: saveChild,
        onSuccess: () => {
            void invalidate(QueryKey.Children);
        },
    });
};
