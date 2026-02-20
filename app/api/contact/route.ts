import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendContactEmails } from "@/lib/email";

const contactSchema = z.object({
  firstName: z.string().trim().min(2).max(50),
  lastName: z.string().trim().min(2).max(50),
  email: z.string().trim().email(),
  message: z.string().trim().min(2).max(500),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form submission.", issues: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { firstName, lastName, email, message } = parsed.data;

    const saved = await prisma.contactMessage.create({
      data: {
        firstName,
        lastName,
        email,
        message,
      },
    });

    await sendContactEmails({ firstName, lastName, email, message });

    return NextResponse.json({ success: true, id: saved.id }, { status: 201 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 },
    );
  }
}
