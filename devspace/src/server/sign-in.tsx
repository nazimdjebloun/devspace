"use server"
import { z } from "zod";
import { toast } from "sonner"; 
import { signInSchema } from "@/utils/zod/zodSchemas";
import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";

export async function signInAction(prevState: any, formData: FormData) {
        const data = {
          email: formData.get("email"),
          password: formData.get("password"),
        };
    
  try {
    const parsedData = signInSchema.parse(data);

        try {
          const response = await auth.api.signInEmail({
            body: {
              email: parsedData.email,
              password: parsedData.password,
            },
            // headers: headers(), 
          });
          console.log(response);
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
      return { success: false, errors: error.flatten().fieldErrors };
    }
    return {
      success: false,
      formError: { form: ["An unexpected error occurred"] },
    };
  }
};
