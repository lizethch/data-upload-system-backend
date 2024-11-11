import csv from 'csv-parser';
import fs from 'fs';
import { validateCSV } from '../utils/csvValidator';
import { ICSVRow } from '../interfaces/csvRowInterface';
import { uploadData } from '../data/uploadData';
import { IUser } from '../interfaces/userInterface';

interface ProcessResults {
    success: IUser[];
    errors: {
        row: number;
        details: { database: string } | Record<string, string>
    }[];
}

export class UploadService {
    async processCSVFile(filePath: string): Promise<ProcessResults> {
        const results: ProcessResults = {
            success: [],
            errors: []
        };

        let rowNumber = 0;

        try {
            await this.processFileStream(filePath, results, rowNumber);
            await this.deleteFile(filePath);
            return results;
        } catch (error) {
            await this.deleteFile(filePath);
            throw error;
        }
    }

    private async processFileStream(
        filePath: string,
        results: ProcessResults,
        rowNumber: number
    ): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', async (row: ICSVRow) => {
                    rowNumber++;
                    await this.processRow(row, rowNumber, results);
                })
                .on('end', () => resolve())
                .on('error', reject);
        });
    }

    private async processRow(
        row: ICSVRow,
        rowNumber: number,
        results: ProcessResults
    ): Promise<void> {
        const validation = validateCSV(row);

        if (validation.isValid) {
            try {
                const result = await uploadData.createUser(row);
                results.success.push(result);
            } catch (error) {
                results.errors.push({
                    row: rowNumber,
                    details: { database: 'Error al insertar en la base de datos' }
                });
            }
        } else {
            results.errors.push({
                row: rowNumber,
                details: validation.errors
            });
        }
    }

    private async deleteFile(filePath: string): Promise<void> {
        try {
            await fs.promises.unlink(filePath);
        } catch (error) {
            console.error('Error al eliminar archivo temporal:', error);
        }
    }
}

export const uploadService = new UploadService();