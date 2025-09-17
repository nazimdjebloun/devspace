import { User } from "./../types/index";
import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { nextCookies } from "better-auth/next-js";
import { headers } from "next/headers";

const connection = new Pool({ connectionString: process.env.DATABASE_URL });
console.log(process.env.DATABASE_URL);
export const auth = betterAuth({
  database: connection,
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      phone: {
        type: "string",
        required: false,
      },
      bio: {
        type: "string",
        required: false,
      },
      website: {
        type: "string",
        required: false,
      },
      location: {
        type: "string",
        required: false,
      },
    },
  },
  advanced: {
    useSecureCookies: true,
  },
  session: {
    cookieCache: {
      enabled: true,
    },
  },
  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;

export async function getServerSession() {
  try {
    return await auth.api.getSession({
      headers: await headers(),
    });
  } catch (error) {
    console.error("Session error:", error);
    return error;
  }
}

//  john.doe@gmail.com
// john doe
// johndoe123
