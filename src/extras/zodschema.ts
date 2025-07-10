
import {z} from 'zod';


export const signupschema = z.object({
    username : z.string().min(1,"UserName is Required").max(15,"maximum Limit Exceeded"),
    password: z.string().min(8, "Password must be at least 8 characters").max(20, "Password must be at most 20 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      "Password must have at least one uppercase, one lowercase, one number, and one special character"
    ),
});
