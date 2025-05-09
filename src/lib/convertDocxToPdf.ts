import fs from 'fs';
import libre from 'libreoffice-convert';
import { promisify } from 'util';

const convertAsync = promisify<Buffer, string, undefined, Buffer>(libre.convert);

export async function convertDocxToPdf(inputPath: string): Promise<Buffer> {
  const docxBuf = fs.readFileSync(inputPath);
  const pdfBuf = await convertAsync(docxBuf, '.pdf', undefined);
  return pdfBuf;
}
