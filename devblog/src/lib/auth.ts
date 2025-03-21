import { betterAuth } from "better-auth";
import { Pool } from "pg";

const connection = new Pool({ connectionString: process.env.DATABASE_URL })
console.log(process.env.DATABASE_URL);
export const auth = betterAuth({
  database: connection,
  emailAndPassword: {
    enabled: true,
  },
});

// john.doe@gmail.com