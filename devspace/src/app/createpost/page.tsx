"use client"; // Required for App Router in Next.js 13+
import react from "react";
import { useState, useActionState,useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardDescription,
  CardTitle,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";

import { Loader2 } from "lucide-react";
import { createPost } from "@/server/posts/create-post";
import { toast } from "sonner";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation"; // Use "next/router" if using Pages Router
export default function CreatePost() {

const [state, formAction, isPending] = useActionState(createPost, null);
  const router = useRouter(); // Use router for navigation
useEffect(() => {
  if (state) {
    if (state.success === true) {
      toast(state.message as string);
    } else if (state.message) {
      toast.error(state.message as string);
      // console.error("Form submission error:", state.message);
    }
      if (state?.redirect) {
            router.push(state.redirect);
          }
  }
}, [state]);

  return (
    <div className="w-full  flex justify-center ">
      <h2 className="text-xl font-bold mb-4"></h2>
      <Card className="flex w-[50%] ">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Create a Post</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Enter the information to create post
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Post title</Label>
                <Input type="text" name="title" placeholder="Title" />
                {state?.errors?.title && (
                  <p className="text-sm text-red-500">
                    {state.errors.title[0]}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="summary">Post summary</Label>
                <Textarea
                  name="summary"
                  placeholder="type your post summary"
                  rows={3}
                />
                {state?.errors?.summary && (
                  <p className="text-sm text-red-500">
                    {state.errors.summary[0]}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Post content</Label>
                <Textarea
                  name="content"
                  placeholder="type your post content"
                  rows={8}
                />
                {state?.errors?.content && (
                  <p className="text-sm text-red-500">
                    {state.errors.content[0]}
                  </p>
                )}
              </div>
              {state?.authError?.form && (
                <p className="text-md text-red-500 text-center py-2">
                  {state.authError.form}
                </p>
              )}
              {/* {state?.formError?.form && (
                <p className="text-md text-red-500 text-center py-2">
                  {state.formError.form }
                </p>
              )}  */}
              <div className="text-center">
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="animate-spin mr-2" /> Creating Post...
                    </>
                  ) : (
                    "Create Post"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
