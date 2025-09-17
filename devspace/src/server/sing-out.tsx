
"use server";
import React from 'react'
import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";

export default async function singOut() {

try {
  const response = await auth.api.signOut({
    headers: await headers(),
  });
      return {
        success: true,
        message: "Sign out successful!",
      };
} catch (error) {
  if (error instanceof APIError) {
    console.log(error.message, error.status);
  }
}
}

 
