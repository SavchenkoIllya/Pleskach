import { z } from "zod";
import { phoneRegex } from "../../utils/utils";
import { errorMessages } from "@/app/locales/ru-RU/ru";

export const PostSchema = z.object({
  name: z.string().min(3, { message: errorMessages.postSchema.name.minLength }),
  telephone: z
    .string()
    .min(8, { message: errorMessages.postSchema.telephone.minLength })
    .regex(phoneRegex, { message: errorMessages.postSchema.telephone.regex }),
  problem: z
    .string()
    .min(20, { message: errorMessages.postSchema.problem.minLength }),
});

export type PostForm = z.infer<typeof PostSchema>;
