import express from "express";
import { NewUser, User } from "../../data/data";
import { addUser, completeUser, viewOtherUser, viewCurUser } from '../../lib/users/user-functions';

const router = express.Router();

// Create a new user
router.post("/users", (req, res) => {
  const payload: Omit<NewUser, 'newUserId'> = req.body;
  const user: NewUser | string = addUser(payload);
  if (typeof (user) == 'string') {
    res.status(400).json({ error: user });
  } else {
    res.status(200).json({ user: user });
  }
});

// Complete user
router.post("/users/:userid", (req, res) => {
  const payload: User = req.body;
  const user: User = completeUser(payload);
  res.status(200).json({ user: user });
});

// View user - another user
router.get("/users/:userid", (req, res) => {
  const payload: string = req.params.userid;
  const user: User | string = viewOtherUser(payload);
  if (typeof (user) == 'string') {
    res.status(400).json({ error: user });
  } else {
    res.status(200).json({ user: user });
  }
});

// View user - current user
router.get("/users/:token", (req, res) => {
  const payload: string = req.params.token;
  const user: User | string = viewCurUser(payload);
  if (typeof (user) == 'string') {
    res.status(400).json({ error: user });
  } else {
    res.status(200).json({ user: user });
  }
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
