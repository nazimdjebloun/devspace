import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react
import type { auth } from "./auth";
import { inferAdditionalFields } from "better-auth/client/plugins";
export const authClient = createAuthClient({
  baseURL: "http://localhost:3000", // the base url of your auth server
  plugins: [inferAdditionalFields<typeof auth>()],
});
