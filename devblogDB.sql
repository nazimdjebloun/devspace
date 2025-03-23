create table "user" (
"id" text not null primary key,
"name" text not null,
 "email" text not null unique, 
 "emailVerified" boolean not null,
 "phone" text not null,
 "bio" text,
 "website" text,
 "location" text,
"image" text, "createdAt" timestamp not null,
"updatedAt" timestamp not null
);


create table "session" (
"id" text not null primary key, "expiresAt" timestamp not null, 
"token" text not null unique, "createdAt" timestamp not null, 
"updatedAt" timestamp not null, "ipAddress" text, "userAgent" text, 
 "userId" text not null references "user" ("id"));
 



create table "account" (
"id" text not null primary key, 
"accountId" text not null, 
"providerId" text not null, 
"userId" text not null references "user" ("id"), 
"accessToken" text, 
"refreshToken" text, 
"idToken" text, 
"accessTokenExpiresAt" timestamp,
"refreshTokenExpiresAt" timestamp,
"scope" text, 
"password" text,
"createdAt" timestamp not null, 
"updatedAt" timestamp not null);

create table "verification" (
"id" text not null primary key, 
"identifier" text not null, 
"value" text not null,
"expiresAt" timestamp not null, 
"createdAt" timestamp, 
"updatedAt" timestamp
 );


CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


 -- custom tables



CREATE TABLE "post" (
    "id" UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    "title" text NOT NULL,
    "content" text NOT NULL,
    "summary" text,
    "userId" text NOT NULL REFERENCES "user" ("id"),
    "createdAt" timestamp NOT NULL DEFAULT current_timestamp,
    "updatedAt" timestamp NOT NULL DEFAULT current_timestamp
);


CREATE TABLE "comment" (
    "id" UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    "content" text NOT NULL,
    "postId" UUID NOT NULL REFERENCES "post" ("id") ON DELETE CASCADE,
    "userId" text NOT NULL REFERENCES "user" ("id"),
    "createdAt" timestamp NOT NULL DEFAULT current_timestamp,
    "updatedAt" timestamp NOT NULL DEFAULT current_timestamp
);
CREATE INDEX "idx_comment_post_id" ON "comment"("postId");
CREATE INDEX "idx_comment_user_id" ON "comment"("userId");
CREATE INDEX "idx_post_like_post_id" ON "post_like"("postId");
CREATE INDEX "idx_post_like_user_id" ON "post_like"("userId");
CREATE INDEX "idx_post_user_id" ON "post"("userId");
CREATE INDEX "idx_repost_post_id" ON "repost"("originalPostId");
CREATE INDEX "idx_repost_user_id" ON "repost"("userId");
CREATE INDEX "idx_follower_follower_id" ON "follower"("followerId");
CREATE INDEX "idx_follower_following_id" ON "follower"("followingId");

CREATE TABLE "post_like" (
    "id" UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    "postId" UUID NOT NULL REFERENCES "post" ("id") ON DELETE CASCADE,
    "userId" text NOT NULL REFERENCES "user" ("id"),
    "createdAt" timestamp NOT NULL DEFAULT current_timestamp,
    UNIQUE("postId", "userId")
);



CREATE TABLE "repost" (
    "id" UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    "originalPostId" UUID NOT NULL REFERENCES "post" ("id") ON DELETE CASCADE,
    "userId" text NOT NULL REFERENCES "user" ("id"),
    "createdAt" timestamp NOT NULL DEFAULT current_timestamp,
    UNIQUE("originalPostId", "userId")
);




CREATE TABLE "follower" (
    "followerId" text NOT NULL REFERENCES "user" ("id"),
    "followingId" text NOT NULL REFERENCES "user" ("id"),
    "createdAt" timestamp NOT NULL DEFAULT current_timestamp,
    PRIMARY KEY ("followerId", "followingId"),
    CHECK ("followerId" != "followingId")
);



CREATE OR REPLACE FUNCTION update_updatedAt_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = current_timestamp;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;







CREATE TRIGGER user_profile_trigger
AFTER INSERT ON "user"
FOR EACH ROW
EXECUTE FUNCTION create_profile_on_user_insert();

-- Post Table
CREATE TRIGGER trigger_update_post_updatedAt
BEFORE UPDATE ON "post"
FOR EACH ROW
EXECUTE FUNCTION update_updatedAt_column();

-- Comment Table
CREATE TRIGGER trigger_update_comment_updatedAt
BEFORE UPDATE ON "comment"
FOR EACH ROW
EXECUTE FUNCTION update_updatedAt_column();

-- Post Like Table
CREATE TRIGGER trigger_update_post_like_updatedAt
BEFORE UPDATE ON "post_like"
FOR EACH ROW
EXECUTE FUNCTION update_updatedAt_column();

-- Repost Table
CREATE TRIGGER trigger_update_repost_updatedAt
BEFORE UPDATE ON "repost"
FOR EACH ROW
EXECUTE FUNCTION update_updatedAt_column();

-- Account Table
CREATE TRIGGER trigger_update_account_updatedAt
BEFORE UPDATE ON "account"
FOR EACH ROW
EXECUTE FUNCTION update_updatedAt_column();

-- Session Table
CREATE TRIGGER trigger_update_session_updatedAt
BEFORE UPDATE ON "session"
FOR EACH ROW
EXECUTE FUNCTION update_updatedAt_column();

-- Verification Table
CREATE TRIGGER trigger_update_verification_updatedAt
BEFORE UPDATE ON "verification"
FOR EACH ROW
EXECUTE FUNCTION update_updatedAt_column();


