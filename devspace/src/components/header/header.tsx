"use client";
import React from "react";
import { ThemeSwicth } from "../theme/theme-switch";
import UserMenu from "../UserMenu";
import Link  from "next/link";
import { Session } from "@/lib/auth";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";

// export default function Header({ session }: { session: Session | null }) {
export default function Header() {
  const { data: session, isPending, error, refetch } = authClient.useSession();

  return (
    <div className="fixed  w-full border-b-1 backdrop-blur-xl flex flex-row  justify-between p-3 ">
      <div className="">
        <Link href="/">
          <h1 className="">Dev Space</h1>
        </Link>
      </div>

      <div className="flex flex-row items-center gap-5 ">
        <div className="flex-shrink-0">
          <ThemeSwicth />
        </div>

        {/* <div className="w-[100px]">
          {session ? (
            <UserMenu session={session} />
          ) : (
            <Link href="/login">
              <Button>Log In</Button>
            </Link>
          )}
        </div> */}
      </div>
    </div>
  );
}
