"use client";
import { Button } from "@/components/ui/button";
import { Suspense, useEffect } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
// import {getSessionUser} from "@/server/session";
import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import UserMenu from "@/components/UserMenu";
import singOut from "@/server/sing-out"

// import { useSessionContext } from "@/contexts/SessionContext";


export default function Home() {
  const { data: session, isPending, error, refetch } = authClient.useSession();

  
  
  const handleSignOut = async () => {

      const response = await singOut();
    if (response?.success) {
            toast("sign out  successfully");
         refetch(); 
      } else {
        console.error(response?.message || "Sign out failed");
      }
    };

  
  return (
    <div className="flex gap-5 flex-col justify-center content-center font-[family-name:var(--font-geist-sans)]">
      <Link href="/createpost">
        <Button>Create post</Button>
      </Link>
      <Link href="/login">
        <Button>login</Button>
      </Link>
      {/*   <Session />
       <UserMenu /> */}
      <Button onClick={handleSignOut}>Sign Out</Button>
      <Card>
        <CardHeader>
          <CardTitle>Session Information</CardTitle>

          <CardDescription>
            <div>
              <div>
                <h1>Session Information</h1>

                <div>
                  {isPending
                    ? "Loading session..."
                    : session
                    ? "You are currently logged in"
                    : "You are not logged in"}
                </div>
              </div>
              <div>
                {isPending ? (
                  <div className="flex justify-center py-4">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : error ? (
                  <div className="p-4 bg-destructive/10 text-destructive rounded-md">
                    Error: {error.message}
                  </div>
                ) : session ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      {session.user.image ? (
                        <img
                          src={session.user.image}
                          alt="Profile"
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                          <span className="text-lg font-medium">
                            {session.user.name?.charAt(0) ||
                              session.user.email?.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{session.user.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {session.user.email}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-md bg-muted p-4">
                      <p className="text-sm font-medium mb-2">
                        Session Details:
                      </p>
                      <pre className="text-xs overflow-auto max-h-40">
                        {JSON.stringify(session, null, 2)}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <div className="py-8 text-center text-muted-foreground">
                    <p>Sign in to view your session information</p>
                  </div>
                )}
              </div>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
}
