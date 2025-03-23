import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { nextCookies } from "better-auth/next-js";

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

type Session = typeof auth.$Infer.Session;



//  john.doe@gmail.com
// john doe
// johndoe123