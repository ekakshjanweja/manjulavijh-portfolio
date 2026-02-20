import { Resend } from "resend";
import { EmailTemplate } from "@/components/ui/email-template";
import { AdminEmailTemplate } from "@/components/ui/admin-email-template";

type ContactEmailInput = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

const getRequiredEnv = (key: string) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export const sendContactEmails = async (emailFormData: ContactEmailInput) => {
  try {
    const { firstName, lastName, email, message } = emailFormData;
    const fromEmail = getRequiredEnv("RESEND_FROM_EMAIL");
    const adminEmail = getRequiredEnv("ADMIN_EMAIL");

    await resend.emails.send({
      from: `Website Contact <${fromEmail}>`,
      to: [adminEmail],
      subject: "New Contact Form Submission",
      react: AdminEmailTemplate({
        firstName,
        lastName,
        email,
        message,
      }),
    });

    await resend.emails.send({
      from: `Manjula Vijh Photography <${fromEmail}>`,
      to: [email],
      subject: "Thank you for getting in touch",
      react: EmailTemplate({ firstName }),
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    throw new Error("Email failed to send");
  }
};
