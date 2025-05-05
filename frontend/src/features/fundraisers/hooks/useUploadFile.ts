import { useMutation } from "@tanstack/react-query";
import { QueryKey, useInvalidateQuery } from "@/lib/apiClient";
import { FilesService } from "@/features/fundraisers/api/filesService.ts";

export const useUploadFile = () => {
    const { invalidate } = useInvalidateQuery();

    return useMutation({
        mutationFn: FilesService.uploadFile,
        onSuccess: () => {
            void invalidate(QueryKey.Files);
        },
    });
};
