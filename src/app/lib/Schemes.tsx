import { z } from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

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

export const PostSchema = z.object({
  name: z.string().min(3),
  telephone: z.string().min(8),
  problem: z.string().min(20),
});
