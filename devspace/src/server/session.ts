"use server"
import { authClient } from "@/lib/auth-client";


export default async function getSesstion() {

  const { data: session, isPending, error, refetch } =  authClient.useSession();


}