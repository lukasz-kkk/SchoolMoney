import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/lib/apiClient";
import { FilesService } from "@/features/fundraisers/api/filesService.ts";

export const useFundraiserFiles = (fundraiserId?: number) => {
    return useQuery({
        queryFn: () => FilesService.getFilesMetadata(fundraiserId ?? 0),
        queryKey: [QueryKey.Files, { fundraiserId }],
        enabled: !!fundraiserId,
    });
};
