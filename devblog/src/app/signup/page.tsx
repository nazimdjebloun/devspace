
"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, X } from "lucide-react";
import { useActionState,useState,useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";

import { signUpAction } from "@/server/sign-up";


import { ThemeSwicth } from "@/components/theme/theme-switch";


// import { authClient } from "@/lib/auth-client";
// type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUp() {
// const { data: session } = authClient.useSession();
  const [state, formAction, Isloading] = useActionState(signUpAction, null);

useEffect(() => {
  if (state?.success === true) {
    toast("Signup successful!");
  }
}, [state?.success]);

  return (
    <div className="w-[100%] flex justify-center items-center h-dvh">
      <div className="absolute top-0 w-full flex  items-center justify-center  p-5 gap-10">
        <div className="text-xl font-bold ">
          <a href="/">Home</a>
        </div>
        <div className="">
          <ThemeSwicth />
        </div>
      </div>
      {/* <Card>
        <h1>session</h1>
        <CardContent>
          {session ? (
            <div>
              Logged in {session.user.name} and {session.user.email}
            </div>
          ) : (
            <div>not Logged in</div>
          )}
        </CardContent>
      </Card> */}

      <Card className="w-[300px] md:w-[400px]">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Sign Up</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Enter your information to create an account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form action={formAction}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Full name</Label>
                <Input
                  defaultValue={(state?.prevData?.fullName as string) ?? ""}
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="john doe"
                />
                {state?.errors?.fullName && (
                  <p className="text-sm text-red-500">
                    {state.errors.fullName[0]}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  defaultValue={(state?.prevData?.email as string) ?? ""}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                />
                {state?.errors?.email && (
                  <p className="text-sm text-red-500">
                    {state.errors.email[0]}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  defaultValue={(state?.prevData?.phone as string) ?? ""}
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="0x-xx-xx-xx-xx"
                />
                {state?.errors?.phone && (
                  <p className="text-sm text-red-500">
                    {state.errors.phone[0]}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Password"
                />
                {state?.errors?.password && (
                  <p className="text-sm text-red-500">
                    {state.errors.password[0]}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Confirm Password</Label>
                <Input
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Type your chosen Password"
                />
                {state?.errors?.passwordConfirmation && (
                  <p className="text-sm text-red-500">
                    {state.errors.passwordConfirmation[0]}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={Isloading}>
                {Isloading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  "Create an account"
                )}
              </Button>
            </div>
            {state?.authError?.form && (
              <p className="text-md text-red-500 text-center py-2">
                {state.authError.form}
              </p>
            )}
            {state?.formError?.form && (
              <p className="text-md text-red-500 text-center py-2">
                {state.formError.form}
              </p>
            )}
            {/* {state?.success === true  && toast("Signup successful!") } */}
          </form>
          <div className="flex justify-start gap-1 items-baseline py-5">
            <p className="text-xs md:text-sm">Already have an account ?</p>
            <Link href="login">
              <span className="ml-auto inline-block text-sm underline">
                Sign In
              </span>
            </Link>
          </div>
        </CardContent>

        <CardFooter>
          <div className="flex justify-center w-full border-t py-4">
            <p className="text-center text-xl text-neutral-500">Dev Blogs</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
