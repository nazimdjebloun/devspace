
import { z } from "zod";

export const signUpSchema = z
  .object({
    fullName: z.string().min(1, "Your full name is required"),
    email: z.string().email("Invalid email address"),
    // phone: z
    //   .string()
    //   .min(10, "Phone number is not valide")
    //   .max(10, "Phone number is not valide"),
    phone: z
      .string()
      .regex(/^\d+$/, "Phone number must contain only digits")
      .length(10, "Phone number must be exactly 10 digits")
      .refine(
        (val) =>
          val.startsWith("05") || val.startsWith("06") || val.startsWith("07"),
        { message: "Phone number must start with 05, 06, or 07" }
      )
      .optional(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[0-9]/, "Password must contain at least one number"),
    passwordConfirmation: z.string(),
    image: z.any().optional(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required to login"),
});

  