import { connectDB } from "../lib/ConnectDB";
import PostSchema from "../model/PostSchema";
export default async function getRecentPost(req, res) {
  await connectDB();

  try {
    const posts = await PostSchema.find();

    return res.status(200).json({
      success: true,
      message: "Recent posts fetched successfully",
      data: posts.slice(0,10),
      currPageCount: posts.slice(0,10)?.length,
      totalCount: posts?.length
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch recent posts",
      error: error.message,
    });
  }
}
