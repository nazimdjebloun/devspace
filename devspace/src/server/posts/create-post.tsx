
"use server"
import { z } from "zod";

import React from 'react'
import axiosInstance from "@/utils/axiosInstance";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { createPostSchema } from "@/utils/zod/postSchemas";
import { APIError } from "better-auth/api";
import { redirect } from "next/navigation";

export async function createPost(prevState: any, formData: any) {
   let user;
      const session = await auth.api.getSession({
        headers: await headers(),
      });
  if (!session || !session.user) {

    return { success: false, message: "You need to be loged in to post",redirect: "/login"};
      
  } else {
    user = session?.user.id;
    // console.log(user)
  }

  const data = {
      title: formData.get("title"),
      content: formData.get("content"),
      summary: formData.get("summary"),
      userId: user,
    };


  try {
    const parsedData = createPostSchema.parse(data);
    // console.log(data);
    // console.log(parsedData);

    try {
      const response = await axiosInstance.post("/api/createpost", data);
      console.log(response);
      return {
        success: true,
        message: "post created successfully",
        redirect: "/",
      };
    } catch (error) {
      if (error instanceof APIError) {
        return {
          success: false,
          message: "better-auth erreur",
          authError: { form: error.message },
        };
      }
    }
  } catch (error) {
        if (error instanceof z.ZodError) {
          return {
          success: false,
            message: "zod erreur",
            errors: error.flatten().fieldErrors
          };
        }
    return {
      success: false,
      message: "An unexpected error occurred",
      formError: { form: [error] },
    };

  }
}
