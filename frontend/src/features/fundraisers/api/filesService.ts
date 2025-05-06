import { requestClient } from "@/lib/request/requestClient";
import { FileMetadata } from "@/features/fundraisers/types/File";
import { downloadFileFromBytes } from "@/utils/fileUtils.ts";

type FileMetadataDto = {
    fileName: string;
    description: string;
};

export class FilesService {
    public static async getFilesMetadata(id: number): Promise<FileMetadata[]> {
        const { data } = await requestClient.get<FileMetadataDto[]>(`/fundraiser/${id}/uploadedFiles`);
        return data.map(FilesService.mapDtoToMetadata);
    }

    public static async downloadFile(filename: string): Promise<void> {
        const response = await requestClient.get(`/fundraiser/downloadFile/${filename}`, {
            responseType: "blob",
        });

        downloadFileFromBytes(filename, response.data);
    }

    public static async uploadFile({
        description,
        bytes,
        filename,
        fundraiserId,
    }: {
        description: string;
        filename: string;
        bytes: Uint8Array<ArrayBufferLike> | ArrayBufferLike;
        fundraiserId: number;
    }): Promise<void> {
        const formData = new FormData();
        const file = new Blob([bytes]);
        formData.append("file", file, filename);
        await requestClient.post(`/fundraiser/${fundraiserId}/uploadFile?description=${description}`, formData);
    }

    public static async removeFile(filename: string): Promise<void> {
        await requestClient.delete(`/fundraiser/deleteFile/${filename}`);
    }

    private static mapDtoToMetadata(dto: FileMetadataDto): FileMetadata {
        return {
            filename: dto.fileName,
            description: dto.description,
        };
    }
}
