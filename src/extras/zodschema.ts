import { z } from "zod";

export const authSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

export type AuthType = z.infer<typeof authSchema>;
export { authSchema as signupschema };

