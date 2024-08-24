import express from "express";
import { NewUser } from "../../data/data";
import { addUser } from '../../lib/users/user-functions';

const router = express.Router();

// Create a new user
router.post("/users", (req, res) => {
  const payload: Omit<NewUser, 'newUserId'> = req.body;
  addUser(payload);
  res.status(200).json({ hi: "hello world from api!" });
});

// Complete user
router.post("/users/:userid", (req, res) => {
  res.status(200).json({ hi: "hello world from api!" });
});

// View user
router.get("/users/:userid", (req, res) => {
  res.status(200).json({ hi: "hello world from api!" });
});

// Edit user
router.put("/users/:userid", (req, res) => {
  res.status(200).json({ hi: "hello world from api!" });
});

// Delete user
router.delete("/users/:userid", (req, res) => {
  res.status(200).json({ hi: "hello world from api!" });
});

export default router;
