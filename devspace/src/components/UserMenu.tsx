import React from 'react'
import Link from "next/link";
import {
  LogOut,
  Settings,
  User,
  Loader2,
  CircleUserRound,
  Menu,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useSession } from "@/lib/auth-client"; 
import singOut from "@/server/sing-out";
import { toast } from "sonner";
import { Session } from "@/lib/auth";
import Singout from './singout';

export default function UserMenu() {

const { data: session, isPending, error, refetch } = useSession();
  
  // const handleSignOut = async () => {
  //   const response = await singOut();
  //   if (response?.success) {
  //     toast.success("sign out  successfully");
  //   } else {
  //     console.error(response?.message || "Sign out failed");
  //     toast.error("Sign out failed");
  //   }
  // };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            {/* <CircleUserRound /> */}
            <Menu/>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="px-2 m-2 ">
          {session && (
            <div>
              <DropdownMenuLabel className="text-center">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="px-3 ">
                  <Link href="/profile">My profile</Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="px-3">
                  Account settings
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {/* <Button
                  variant="ghost"
                  onClick={handleSignOut}
                  className="w-full border-none text-center text-red-600 hover:text-red-600"
                >
                  <LogOut />
                  Sign out
                </Button> */}
                <Singout/>
              </DropdownMenuGroup>
            </div>
          )
          //   : (
          //   <div>
          //     <DropdownMenuLabel className="text-center">
          //       Guest mode
          //     </DropdownMenuLabel>
          //     <DropdownMenuSeparator />
          //     <DropdownMenuLabel className="hover:underline">
          //       <Link href="/login">Login In</Link>
          //     </DropdownMenuLabel>
          //   </div>
          // )
          }
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}






  //   if (!session) {
  //       return (

  //         <Link href="/login">
  //           <Button>Sign in</Button>
  //         </Link>

  //     );

  //   }
  //     if (isPending) {
  //       return (
  //         <Loader2/>
  //       );
  //     }