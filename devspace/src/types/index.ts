// Database schema types that match your PostgreSQL tables

// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  phone: string;
  bio: string | null;
  website: string | null;
  location: string | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  expiresAt: Date;
  token: string;
  createdAt: Date;
  updatedAt: Date;
  ipAddress: string | null;
  userAgent: string | null;
  userId: string; // Foreign key to User
}

export interface Account {
  id: string;
  accountId: string;
  providerId: string;
  userId: string; // Foreign key to User
  accessToken: string | null;
  refreshToken: string | null;
  idToken: string | null;
  accessTokenExpiresAt: Date | null;
  refreshTokenExpiresAt: Date | null;
  scope: string | null;
  password: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Verification {
  id: string;
  identifier: string;
  value: string;
  expiresAt: Date;
  createdAt: Date | null;
  updatedAt: Date | null;
}

// Blog related types
export interface Post {
  id: string; // UUID
  title: string;
  content: string;
  summary: string | null;
  userId: string; // Foreign key to User
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string; // UUID
  content: string;
  postId: string; // UUID, Foreign key to Post
  userId: string; // Foreign key to User
  createdAt: Date;
  updatedAt: Date;
}

export interface PostLike {
  id: string; // UUID
  postId: string; // UUID, Foreign key to Post
  userId: string; // Foreign key to User
  createdAt: Date;
}

export interface Repost {
  id: string; // UUID
  originalPostId: string; // UUID, Foreign key to Post
  userId: string; // Foreign key to User
  createdAt: Date;
}

export interface Follower {
  followerId: string; // Foreign key to User
  followingId: string; // Foreign key to User
  createdAt: Date;
}
