import pool from "../config/db.js";

const postService = {
  async createPost({ title, content, summary, userId }) {
    const client = await pool.connect();
    try {
      const query = `
        INSERT INTO post (title, content, summary, "userId")
        VALUES ($1, $2, $3, $4)
        RETURNING id, title, content, summary, "userId"
      `;
      const values = [title, content, summary, userId];

      const { rows } = await client.query(query, values);
      console.log("Post created:", rows[0]); // Log the inserted post
      return rows[0];
    } catch (error) {
      console.error("Error creating post:", error.message);
      throw new Error("Failed to create post. Please try again.");
    } finally {
      client.release();
    }
  },
};

export default postService;

// import pool from "../config/db.js";

// const postService = {
//   /**
//    * Create a new post
//    * @param {Object} postData - Post data
//    * @param {string} postData.title - Post title
//    * @param {string} postData.content - Post content
//    * @param {string} postData.summary - Post type ('blog' or 'article')
//    * @param {string} postData.userId - Author ID
//    * @returns {Promise<Object>} Created post
//    */
//   async createPost(postData) {
//     const { title, content, summary, userId } = postData;

//     const client = await pool.connect();

//     try {
//       await client.query("BEGIN");

//       // Insert the post
//       const postQuery = `
//         INSERT INTO post (
//           title,
//           content,
//           summary,
//           userId
//         )
//         VALUES ($1, $2, $3, $4)
//         RETURNING id,title, content, summary, userId
//       `;

//       const postValues = [title, content, summary, userId];
//       const postResult = await client.query(postQuery, postValues);
//       const post = postResult.rows[0];

//       await client.query("COMMIT");
//       return post;
//     } catch (error) {
//       await client.query("ROLLBACK");
//       // Throw a more descriptive error

//       console.error("Error creating post:", error.message);
//       throw new Error("Failed to create post. Please try again.");
//     } finally {
//       client.release();
//     }
//   },
// };

// export default postService;

// If you need to handle tags or other related data:
// if (postData.tags && postData.tags.length > 0) {
//   for (const tagId of postData.tags) {
//     await client.query(
//       'INSERT INTO post_tags (post_id, tag_id) VALUES ($1, $2)',
//       [post.id, tagId]
//     );
//   }
// }
