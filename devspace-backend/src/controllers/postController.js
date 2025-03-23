import postService from "../services/postService.js";

export const createPost = async (req, res, next) => {
  try {
    // Validate request body
    const { title, content, summary, userId } = req.body;
console.log(req.body);
    // const title = "My Hardcoded Post";
    // const content = "This is a hardcoded content.";
    // const summary = "blog";
    // const userId = "LZdqbyXIg0dnHF8muS7IbhfycUM7aBGs"; // Your test user ID

    if (!title || !content || !summary) {
      return res.status(400).json({
        message: "Missing required fields: title, content, summary",
      });
    }

    // Get user ID from auth middleware
    // const userId = req.user.id;

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
