import express from "express";

const router = express.Router();

// Create a new user
router.post("/users", (_req, res) => {
  res.status(200).json({ hi: "hello world from api!" });
});

// View user
router.get("/users/:userid", (_req, res) => {
  res.status(200).json({ hi: "hello world from api!" });
});

// Edit user
router.put("/users/:userid", (_req, res) => {
  res.status(200).json({ hi: "hello world from api!" });
});

// Delete user
router.delete("/users/:userid", (_req, res) => {
  res.status(200).json({ hi: "hello world from api!" });
});

export default router;
