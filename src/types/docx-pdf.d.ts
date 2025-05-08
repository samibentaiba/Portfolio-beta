declare module 'docx-pdf' {
  type DocxConverterCallback = (err: Error | null, result: string) => void;

  const docxConverter: (
    inputPath: string,
    outputPath: string,
    callback: DocxConverterCallback
  ) => void;

  export default docxConverter;
}
