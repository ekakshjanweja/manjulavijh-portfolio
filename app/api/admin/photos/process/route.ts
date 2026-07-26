import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");
  const rotation = formData.get("rotation");
  const cropData = formData.get("cropData");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    
    const sharp = (await import("sharp")).default;
    let processor = sharp(uint8Array);

    if (rotation) {
      const degrees = parseInt(rotation as string, 10);
      processor = processor.rotate(degrees, { background: { r: 255, g: 255, b: 255, alpha: 1 } });
    }

    if (cropData) {
      const crop = JSON.parse(cropData as string);
      processor = processor.extract({
        left: Math.round(crop.x),
        top: Math.round(crop.y),
        width: Math.round(crop.width),
        height: Math.round(crop.height),
      });
    }

    const outputBuffer = await processor
      .jpeg({ quality: 92 })
      .toBuffer();

    const responseData = new Uint8Array(outputBuffer);
    return new NextResponse(responseData, {
      headers: {
        "Content-Type": "image/jpeg",
      },
    });
  } catch (error) {
    console.error("Image processing error:", error);
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }
}