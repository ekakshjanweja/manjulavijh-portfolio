import z from "zod";

export const formSchema = z.object({
  firstName: z.string().trim().min(2).max(50),
  lastName: z.string().trim().min(2).max(50),
  email: z.string().trim().email(),
  message: z.string().trim().min(2).max(500),
});
