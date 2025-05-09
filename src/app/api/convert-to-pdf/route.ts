import { NextRequest, NextResponse } from "next/server";
import { promisify } from "util";
import libre from "libreoffice-convert";

const convertAsync = promisify<Buffer, string, undefined, Buffer>(libre.convert);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const docxBuffer = Buffer.from(arrayBuffer);

    const pdfBuffer = await convertAsync(docxBuffer, ".pdf", undefined);

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=resume.pdf",
      },
    });
  } catch (err: unknown) {
    console.error("PDF conversion error:", err);
    const message = err instanceof Error ? err.message : "Conversion failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
