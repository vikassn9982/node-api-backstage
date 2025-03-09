import { BlobServiceClient } from '@azure/storage-blob';

export class AzureBlobService {
    private blobServiceClient: BlobServiceClient;

    constructor() {
        this.blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING!);
    }

    public async uploadBlob(file: Express.Multer.File, containerName: string): Promise<string> {
        const containerClient = this.blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(file.originalname);
        await blockBlobClient.uploadData(file.buffer);
        return blockBlobClient.url;
    }

    public async deleteBlob(blobUrl: string): Promise<void> {
        const blobClient = this.blobServiceClient.getBlobClient(blobUrl);
        await blobClient.delete();
    }
}