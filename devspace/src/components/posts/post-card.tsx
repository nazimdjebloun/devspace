// import React from 'react'
// import { Card, CardDescription, CardTitle,CardContent,CardFooter,CardHeader } from "./ui/card";

// export default function posts() {
//   return (
//     <div>
//           <Card>
              
            
//       </Card>
//     </div>
//   );
// }


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { MessageCircle, Heart } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";

interface PostCardProps {
  title: string;
  summary: string;
  content: string;
  user: {
    name: string;
    email: string;
    image?: string;
  };
  date: Date;
}

export default function PostCard({
  title ,
  summary ,
  content ,
  user,
  date,
}: PostCardProps) {
  return (
    // <div className="border-b-1  p-5">
    <div className="">
      <Card className="overflow-hidden p-2 w-[100%] max-h-[500px]">
        <CardHeader className="border-b-2 py-2">
          <div className="flex items-center gap-4 ">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
            <div className="ml-auto text-xs text-muted-foreground">
              {formatDate(date)}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pointer-events-none overflow-hidden">
          <h1 className="text-2xl font-bold p-y2 ">{title}</h1>
          <h3 className="text-xl text-muted-foreground font-bold py-4">
            {summary}
          </h3>
          <div className="">
            <p className="text-base line-clamp-3 ">{content}</p>
          </div>
        </CardContent>

        <CardFooter className="border-t-2 pt-4">
          <div className="flex justify-between items-center w-full text-xs">
            <div className="flex items-center gap-2">
              <span>5 min read</span>
              <span>•</span>
              <span>Technology</span>
            </div>{" "}
            <div className="flex items-center gap-6">
              <div className="flex gap-2  items-center">
                <Heart />
                <span className="">24</span>
              </div>

              <div className="flex gap-2 items-center">
                <MessageCircle />
                <span className="">85</span>
              </div>
            </div>
            <div>
              <Button variant="ghost" className="underline">
                View more{" "}
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
      <Separator className="mt-5 h-0.5 bg-accent w-full" />
    </div>
  );
}

