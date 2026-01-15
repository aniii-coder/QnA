import getRecentPost from "../../controllers/Posts";
import { connectDB } from "../../lib/ConnectDB";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      if (req?.query?.type === "recent") {
        return getRecentPost(req, res);
      }
  }
}
