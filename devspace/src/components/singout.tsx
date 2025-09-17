import React from 'react'
import { toast } from "sonner";
import singOut from "@/server/sing-out";
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';
import { useSession } from "@/lib/auth-client"; 

export default function Singout() {
  const { data: session, isPending, error, refetch } = useSession();
  
      const handleSignOut = async () => {
        const response = await singOut();
        if (response?.success) {
          toast.success("sign out  successfully");
          refetch();
        } else {
          console.error(response?.message || "Sign out failed");
          toast.error("Sign out failed");
        }
      };
  return (
    <Button
      variant="ghost"
      onClick={handleSignOut}
      className="w-full border-none text-center text-red-600 hover:text-red-600"
    >
      <LogOut />
      Sign out
    </Button>
  );
}
