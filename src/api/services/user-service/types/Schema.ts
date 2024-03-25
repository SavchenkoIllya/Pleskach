import { z } from "zod";
import { phoneRegex } from "../../utils/utils";

export const UserSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  email: z.coerce.string().email().min(5),
  phone: z
    .string()
    .regex(phoneRegex, "Invalid number")
    .min(10, "Too short")
    .max(14, "Too long"),
  telgram_link: z.string().optional(),
  whatsapp_link: z.string().optional(),
});