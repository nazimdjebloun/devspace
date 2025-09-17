"use client";
import axiosInstance from "@/utils/axiosInstance";
// import User from "@/types/index"
// import post from "@/types/index";
// Define the types for our blog post data
export interface Post {
  id: string;
  title: string;
  summary: string;
  content: string;
  CreatedAt: string;
  UpdatedAt: string;
  user: {
    name: string;
    email: string;
    image?: string;
    bio?: string;
    website?: string;
  };
}



// Server action to fetch blog posts from the database
export async function getPosts(): Promise<Post[]> {
  try {
    const response = await axiosInstance.get("/api/getposts");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return [];
  }
}

