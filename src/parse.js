import fs from 'fs';
import path from 'path';

export default function parse(filePath) {
    const ext = path.extname(filePath).slice(1);
    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        if (ext === 'json') {
            return JSON.parse(fileContent);
        } else {
            throw new Error(`Неподдерживаемый формат файла: ${ext}`);
        }
    } catch (error) {
       throw new Error(`Ошибка обработки файла ${filePath}: ${error.message}`);
    }
}