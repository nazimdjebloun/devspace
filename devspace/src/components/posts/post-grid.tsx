
"use client"
import React, { useActionState, useState, useEffect } from "react";
// import { getPosts } from "@/server/posts/getPostes";
import PostCard from "@/components/posts/post-card";
import { Card,CardContent,CardHeader } from '../ui/card';
import axiosInstance from "@/utils/axiosInstance";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Loader2 } from "lucide-react";

export interface Post {
  id: string;
  title: string;
  summary: string;
  content: string;
  CreatedAt: string;
  UpdatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
    bio?: string;
    website?: string;
  };
}

  const fetchPosts = async () => {
    try {
      const response = await axiosInstance.get("/api/getposts");
      console.log(response.data)
      return response.data.posts || []; // Return the task data
    } catch (error) {
      console.error("Failed to fetch blog posts:", error);
    }
  };
export default  function PostGrid() {


    const queryClient = useQueryClient();
    const {
      data: posts,
      isLoading,
      isError,
      error,
      refetch,
    } = useQuery({
      queryKey: ["posts"],
      queryFn: fetchPosts,
      refetchOnWindowFocus: true,
    });
  
  

if (isLoading) {
  return (
    <div className="flex justify-center content-center p-5">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground " />
    </div>
  );
  }
  if (isError)
    return (
      <Card className="w-full min-h-[400px]">
        <div className="flex justify-center items-center py-4 text-lg">
          Error: {error.message}
        </div>
      </Card>
    );
  
  return (
    <div className="flex flex-col gap-5 w-full ">
      {posts && posts.length > 0 ? (
        posts.map((post: Post) => (
          <PostCard
            key={post.id}
            title={post.title}
            summary={post.summary}
            content={post.content}
            user={post.user}
            date={new Date(post.CreatedAt)}
          />
          
        ))
      ) : (
        <p className="text-center text-2xl text-muted-foreground">No Posts</p>
      )}
    </div>
  );
}






  // const [posts, setPosts] = useState<Post[]>([]);
  // // const [error, setError] = useState();
// const [loading, setLoading] = useState(true);
  

// useEffect(() => {
//   const fetchPosts = async () => {
//     try {
//       setLoading(true);
//       const response = await axiosInstance.get("/api/getposts");
//       return response.data; // Return the task data
//     } catch (error) {
//       console.error("Failed to fetch blog posts:", error);
//       // setError(error);
//     }
//   };

//   fetchPosts();
// }, []);