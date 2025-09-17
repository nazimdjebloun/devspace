import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react
import type { auth } from "./auth";
import { inferAdditionalFields } from "better-auth/client/plugins";
export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL, 
  plugins: [inferAdditionalFields<typeof auth>()],
});
 export const { signIn, signUp, useSession } = createAuthClient();