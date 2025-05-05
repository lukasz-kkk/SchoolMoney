import { useMutation } from "@tanstack/react-query";
import { QueryKey, useInvalidateQuery } from "@/lib/apiClient";
import { FilesService } from "@/features/fundraisers/api/filesService.ts";

export const useDeleteFile = () => {
    const { invalidate } = useInvalidateQuery();

    return useMutation({
        mutationFn: FilesService.removeFile,
        onSuccess: () => {
            void invalidate(QueryKey.Files);
        },
    });
};
