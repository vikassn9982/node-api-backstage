import { Request, Response } from 'express';
import { AzureBlobService } from '../services/azureBlobService';
import { SqlService } from '../services/sqlService';
import { Document } from '../models/documentModel';

export class DocumentController {
    private azureBlobService: AzureBlobService;
    private sqlService: SqlService;

    constructor() {
        this.azureBlobService = new AzureBlobService();
        this.sqlService = new SqlService();
    }

    public async uploadDocument(req: Request, res: Response): Promise<void> {
        try {
            const file = req.file; // Assuming file is uploaded using multer
            const metadata: Document = req.body;

            // Upload file to Azure Blob Storage
            const blobUrl = await this.azureBlobService.uploadBlob(file, metadata.container);

            // Save metadata to SQL Server
            await this.sqlService.createDocumentMetadata({ ...metadata, blobUrl });

            res.status(201).json({ message: 'Document uploaded successfully', blobUrl });
        } catch (error) {
            res.status(500).json({ message: 'Error uploading document', error });
        }
    }

    public async getDocument(req: Request, res: Response): Promise<void> {
        try {
            const documentId = req.params.id;
            const documentMetadata = await this.sqlService.getDocumentMetadata(documentId);

            if (!documentMetadata) {
                res.status(404).json({ message: 'Document not found' });
                return;
            }

            res.status(200).json(documentMetadata);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving document', error });
        }
    }

    public async deleteDocument(req: Request, res: Response): Promise<void> {
        try {
            const documentId = req.params.id;
            const documentMetadata = await this.sqlService.getDocumentMetadata(documentId);

            if (!documentMetadata) {
                res.status(404).json({ message: 'Document not found' });
                return;
            }

            // Delete file from Azure Blob Storage
            await this.azureBlobService.deleteBlob(documentMetadata.blobUrl);

            // Delete metadata from SQL Server
            await this.sqlService.updateDocumentMetadata(documentId, { deleted: true });

            res.status(200).json({ message: 'Document deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting document', error });
        }
    }
}