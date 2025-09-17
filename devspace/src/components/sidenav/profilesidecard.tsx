import React, { useMemo } from "react";
import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {authClient} from "@/lib/auth-client"
import { MessageCircle, Heart, User, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import Link from "next/link"
import { useSession } from "@/lib/auth-client";

export default function ProfileSideCard() {
      const { data: session, isPending, error, refetch } = useSession();
  
        const userInitials = useMemo(() => {
        if (!session?.user?.name) return "?"
        return session.user.name
          .split(" ")
          .map((name) => name[0])
          .join("")
          .toUpperCase()
          .substring(0, 2)
        }, [session?.user?.name])
  
  
  return (
    <div>
      <Card className="w-[300px] h-[250px]">
        {isPending ? (
          <div className="flex justify-center content-center p-5">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground " />
          </div>
        ) : session ? (
          <>
            <CardHeader className="flex flex-row items-center gap-4 ">
              <Avatar className="border-1 h-16 w-16 rounded-full ">
                {session.user.image && (
                  <AvatarImage
                    src={session.user.image}
                    alt={`${session.user.name}'s Avatar`}
                  />
                )}
                <AvatarFallback className="h-16 w-16">
                  <div className="h-full w-full flex justify-center content-center p-2">
                    <User className="w-full h-full" />
                  </div>
                </AvatarFallback>
              </Avatar>

              <div>
                <div className="flex flex-col gap-2">
                  <CardTitle>{session.user.name}</CardTitle>
                  <CardTitle className=" text-sm text-muted-foreground">
                    {session.user.email}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{session.user.email}</span>
              </div> */}
              <div className=" space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Posts</span>
                  <span className="font-medium">24</span>
                </div>
                <Separator className="h-0.5 bg-accent w-full" />
                <div className="flex justify-between text-sm">
                  <span>Folowers</span>
                  <span className="font-medium">128</span>
                </div>

              </div>
            </CardContent>
          </>
        ) : (
          <div className="">
            <h1 className="text-center pb-2">Guest mode</h1>
            <Separator className="h-0.5 bg-accent w-full" />

            <div className="p-3 flex flex-col   gap-4">
              {/* Create Account Section */}
              <div className="flex flex-col gap-2 items-center  w-full">
                <span>Create an account</span>
                <Link href="/signup">
                  <Button variant="outline" className="underline">
                    Sign up
                  </Button>
                </Link>
              </div>

              {/* Already have an account Section */}
              <div className="flex flex-col items-center gap-2 w-full">
                <span>Already have an account Log in</span>
                <Link href="/login">
                  <Button variant="outline" className="underline">
                    Log in
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          // <div className="p-2">
          //   <h1 className="text-center">Guest mode </h1>
          //   <Separator className="h-0.5 bg-accent w-full" />
          //     <div className="p-3  flex  flex-col">

          //     <div className="flex flex-col">
          //         <div >Create an account </div>
          //         <div>
          //       <Link href="/signup" >
          //         <Button variant="outline" className="underline">
          //           Login
          //         </Button>
          //             </Link>
          //           </div>
          //     </div>

          //     <div className="flex flex-col justify-center content-center w-full ">
          //       <span>already have one log in</span>
          //       <Link href="/login">
          //         <Button variant="outline" className="underline">
          //           Sing in
          //         </Button>
          //       </Link>
          //         </div>

          //       </div>

          // </div>
        )}
      </Card>
    </div>
  );
}
