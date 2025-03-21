import { authClient } from "@/lib/auth-client"; //import the auth client
import {toast} from "sonner"
    
export default async function signOut(){
    await authClient.signOut({
  fetchOptions: {
    onSuccess: () => {
    toast("Signed out from account")
    },
  },
});   
}
 