import postService from "../services/postService.js";

export const createPost = async (req, res, next) => {
  try {
    // Validate request body
    const { title, content, summary, userId } = req.body;
    // console.log(req.body);

    if (!title || !content || !summary || !userId) {
      return res.status(400).json({
        message: "Missing required fields: title, content, summary",
      });
    }

    // Prepare data for service
    const postData = {
      title,
      content,
      summary,
      userId,
    };

    // Call service layer
    const newPost = await postService.createPost(postData);

    // Return success response
    return res.status(201).json({
      message: "Post created successfully",
      data: newPost,
    });
  } catch (error) {
    // Pass to error handling middleware
    console.log(error);
    next(error);
  }
};

export const getPost = async (req, res, next) => {
  try {
    const Posts = await postService.getPosts();
    return res.status(200).json({
      message: "Posts retrieved successfully",
      posts: Posts,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};