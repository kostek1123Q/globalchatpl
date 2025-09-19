import { Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();
const __dirname = path.resolve();
const postsFile = path.join(__dirname, "backend/data/posts.json");

// GET all posts
router.get("/", (req, res) => {
  const data = fs.readFileSync(postsFile);
  const posts = JSON.parse(data);
  res.json(posts);
});

// POST new post
router.post("/", (req, res) => {
  const { nick, text } = req.body;
  if (!nick || !text) return res.status(400).json({ error: "Nick i tekst wymagane" });

  const data = fs.readFileSync(postsFile);
  const posts = JSON.parse(data);

  const newPost = {
    id: posts.length + 1,
    nick,
    text,
    date: new Date().toISOString()
  };

  posts.push(newPost);
  fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2));

  res.json(newPost);
});

export default router;
