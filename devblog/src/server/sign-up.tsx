"use server";
import { z } from "zod";
import { signUpSchema } from "@/utils/zod/zodSchemas";
import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";

export async function signUpAction(prevState: any, formData: FormData) {
  const data = {
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
    passwordConfirmation: formData.get("passwordConfirmation"),
    // image: formData.get("image"),
  };
  try {
    const parsedData = signUpSchema.parse(data);

    try {
      const response = await auth.api.signUpEmail({
        body: {
          email: parsedData.email,
          password: parsedData.password,
          name: parsedData.fullName,
        },
      });
console.log(response)
      return {
        success: true,
        message: "Signup successful!",
      };
    } catch (error) {
      if (error instanceof APIError) {


        return { authError: { form: error.message } };
      }
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const invalidFields = Object.keys(error.flatten().fieldErrors);
      const filteredPrevData = Object.fromEntries(
        Object.entries(data).filter(([key]) => !invalidFields.includes(key))
      );
      return {
        prevData: filteredPrevData, // Keeps valid inputs, resets invalid ones
        success: false,
        errors: error.flatten().fieldErrors,
      };
    }
    return {
      success: false,
      formError: { form: ["An unexpected error occurred"] },
    };
  }
}
