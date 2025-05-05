import { requestClient } from "@/lib/request/requestClient";
import { FileMetadata } from "@/features/fundraisers/types/File";

type FileMetadataDto = {
    fileName: string;
    description: string;
};

export class FilesService {
    public static async getFilesMetadata(id: number): Promise<FileMetadata[]> {
        const { data } = await requestClient.get<FileMetadataDto[]>(`/Fundraiser/${id}/UploadedFiles`);
        return data.map(FilesService.mapDtoToMetadata);
    }

    public static async downloadFile(filename: string): Promise<void> {
        const response = await requestClient.get(`/Fundraiser/DownloadFile/${filename}`, {
            responseType: "blob",
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;

        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
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
        await requestClient.post(`/Fundraiser/${fundraiserId}/UploadFile?description=${description}`, formData);
    }

    public static async removeFile(filename: string): Promise<void> {
        await requestClient.delete(`/Fundraiser/DeleteFile/${filename}`);
    }

    private static mapDtoToMetadata(dto: FileMetadataDto): FileMetadata {
        return {
            filename: dto.fileName,
            description: dto.description,
        };
    }
}
