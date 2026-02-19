"use server";

import z from "zod";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/ui/email-template";
import { AdminEmailTemplate } from "@/components/ui/admin-email-template";
import { formSchema } from "./schema";

const resend = new Resend(process.env.RESEND_API_KEY);

export const send = async (emailFormData: z.infer<typeof formSchema>) => {
  try {
    const { firstName, lastName, email, message } = emailFormData;

    await resend.emails.send({
      from: `Website Contact <${process.env.RESEND_FROM_EMAIL}>`,
      to: ["manjulavijhphotography@gmail.com"], 
      subject: "New Contact Form Message",
      react: AdminEmailTemplate({
        firstName,
        lastName,
        email,
        message,
      }),
    });

    await resend.emails.send({
      from: `Manjula Vijh Photography <${process.env.RESEND_FROM_EMAIL}>`,
      to: [email],
      subject: "Thank you for contacting us",
      react: EmailTemplate({ firstName }),
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    throw new Error("Email failed to send");
  }
};
