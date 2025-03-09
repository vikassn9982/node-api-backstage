import { Connection, Request } from 'tedious';
import { Document } from '../models/documentModel';

export class SqlService {
    private connection: Connection;

    constructor() {
        this.connection = new Connection({
            server: process.env.SQL_SERVER!,
            authentication: {
                type: 'default',
                options: {
                    userName: process.env.SQL_USER!,
                    password: process.env.SQL_PASSWORD!,
                },
            },
            options: {
                database: process.env.SQL_DATABASE!,
                encrypt: true,
            },
        });
    }

    public async createDocumentMetadata(document: Document): Promise<void> {
        // Implementation for saving document metadata to SQL Server
    }

    // public async getDocumentMetadata(documentId: string): Promise<DocumentModel | null> {
    //     // Implementation for retrieving document metadata from SQL Server
    // }

    public async updateDocumentMetadata(documentId: string, updates: Partial<Document>): Promise<void> {
        // Implementation for updating document metadata in SQL Server
    }
}