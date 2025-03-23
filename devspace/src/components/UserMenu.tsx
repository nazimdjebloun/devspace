import React from 'react'
import Link from "next/link";
import { LogOut, Settings, User, Loader2, CircleUserRound } from "lucide-react";
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
import { authClient } from "@/lib/auth-client"; 
import signOut from "@/components/sign-out";
;

export default function UserMenu() {
  const { data: session, isPending, error, refetch } = authClient.useSession();

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
  return (
    <>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <CircleUserRound />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="px-2 m-2 ">
          {session ? (
            <div>
              <DropdownMenuLabel className="text-center">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  {session.user?.name || "User"}
                </DropdownMenuItem>
                <DropdownMenuItem>{session.user?.email || ""}</DropdownMenuItem>
              </DropdownMenuGroup>
              {/* <div>
                <p>{session.user?.name || "User"}</p>
                <p>{session.user?.email || ""}</p>
              </div> */}
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="hover:underline">
                  Account details
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:underline">
                  Account settings
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:underline">
                  My wishlist
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:underline">
                  All purchases
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="text-red-700 hover:underline"
                  onClick={signOut}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </div>
          ) : (
            <div>
              <DropdownMenuLabel className="text-center">
                Guest mode
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="hover:underline">
                <Link href="/login">Login In</Link>
              </DropdownMenuLabel>
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
