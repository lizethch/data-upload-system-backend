import { z } from "zod";
import { ICSVRow } from '../interfaces/csvRowInterface';

interface ValidationResult {
    isValid: boolean;
    errors: Record<string, string>;
}

const csvSchema = z.object({
    name: z.string()
        .min(1, "El campo 'name' no puede estar vacío.")
        .trim(),
    email: z.string()
        .email("El formato del campo 'email' es inválido."),
    age: z.string()
        .optional()
        .refine((val) => {
            if (val === undefined) return true;
            const age = parseInt(val);
            return !isNaN(age) && age > 0;
        }, "El campo 'age' debe ser un número positivo.")
});

export const validateCSV = (row: ICSVRow): ValidationResult => {
    const result = csvSchema.safeParse(row);

    if (result.success) {
        return {
            isValid: true,
            errors: {}
        };
    }

    const errors: Record<string, string> = {};
    result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
            errors[issue.path[0].toString()] = issue.message;
        }
    });

    return {
        isValid: false,
        errors
    };
};
