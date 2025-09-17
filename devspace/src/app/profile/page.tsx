"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Globe, Mail, MapPin, Settings, Calendar, User } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { authClient } from "@/lib/auth-client";

export default function UserProfile() {
  const { data: session, isPending, error, refetch } = authClient.useSession();

    
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
    <div className="w-full flex flex-col items-center justify-center gap-5 pt-10">
      {/* <Card className="w-[50%] h-[250px]">

      </Card> */}
      <Card className="w-[40%] h-[250px]">
        <CardContent className="p-6">
          {isPending ? (
            <div className="flex flex-col md:flex-row gap-6">
              <Skeleton className="h-24 w-24 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-64" />
                <Skeleton className="h-20 w-full" />
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            </div>
          ) : (
            session && (
              <div className="flex flex-col md:flex-row gap-10">
                <Avatar className="h-30 w-30 border-2">
                  <AvatarImage
                    src={
                      session.user.image ||
                      "/placeholder.svg?height=96&width=96"
                    }
                    alt={`${session.user.name}'s Avatar`}
                  />
                  <AvatarFallback>
                    <User className="h-24 w-24 " />
                    {/* {userInitials} */}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold">
                        {session.user.name}
                      </h2>
                      <div className="flex items-center text-muted-foreground">
                        {/* <Mail className="h-4 w-4 mr-1" /> */}
                        <span>{session.user.email}</span>
                      </div>
                    </div>
                    {/* <Button variant="ghost" size="icon">
                      <Settings className="h-5 w-5" />
                    </Button> */}
                  </div>

                  <p className="text-muted-foreground">
                    {session.user.bio || "No bio"}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    {session.user.website && (
                      <div className="flex items-center text-muted-foreground">
                        <Globe className="h-4 w-4 mr-1" />
                        <a
                          href={session.user.website}
                          className="hover:underline"
                        >
                          {session.user.website.replace(
                            /^https?:\/\/(www\.)?/,
                            ""
                          )}
                        </a>
                      </div>
                    )}

                    {session.user.location && (
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{session.user.location}</span>
                      </div>
                    )}

                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Joined {session.user.createdAt.toISOString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </CardContent>
      </Card>
      <Tabs defaultValue="posts" className="w-[40%] ">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="likes">Likes</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
          <TabsTrigger value="reposts">Reposts</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <Card>
            <CardHeader>
              <CardTitle>posts</CardTitle>
              <CardDescription>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Delectus od io dolore odit ullam nemo, itaque impedit nulla ex
                repellat ex pedita, inventore voluptatum tenetur possimus
                blanditiis, quae beatae ne cessitatibus placeat? Molestiae?
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
        <TabsContent value="likes">
          <Card>
            <CardHeader>
              <CardTitle>likes</CardTitle>
              <CardDescription>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Delectus od io dolore odit ullam nemo, itaque impedit nulla ex
                repellat ex pedita, inventore voluptatum tenetur possimus
                blanditiis, quae beatae ne cessitatibus placeat? Molestiae?
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
        <TabsContent value="comments">
          <Card>
            <CardHeader>
              <CardTitle>comments</CardTitle>
              <CardDescription>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Delectus od io dolore odit ullam nemo, itaque impedit nulla ex
                repellat ex pedita, inventore voluptatum tenetur possimus
                blanditiis, quae beatae ne cessitatibus placeat? Molestiae?
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
        <TabsContent value="reposts">
          <Card>
            <CardHeader>
              <CardTitle>reposts</CardTitle>
              <CardDescription>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Delectus od io dolore odit ullam nemo, itaque impedit nulla ex
                repellat ex pedita, inventore voluptatum tenetur possimus
                blanditiis, quae beatae ne cessitatibus placeat? Molestiae?
              </CardDescription>
            </CardHeader>
            <CardFooter></CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
