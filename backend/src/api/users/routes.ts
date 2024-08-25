import express from "express";
import { NewUser, User, LoginDetails, Token } from "../../data/data";
import {
  addUser,
  completeUser,
  viewOtherUser,
  viewCurUser,
  loginUser,
  editUser,
} from "../../lib/users/user-functions";

const router = express.Router();

// Create a new user
router.post("/users", (req, res) => {
  const payload: Omit<NewUser, "newUserId"> = req.body;
  const user: NewUser | string = addUser(payload);
  if (typeof user == "string") {
    res.status(400).json({ error: user });
  } else {
    res.status(200).json({ user: user });
  }
});

// Login user
router.post("/users/login", (req, res) => {
  const payload: LoginDetails = req.body;
  const token: string = loginUser(payload);
  if (token.includes("Error")) {
    res.status(400).json({ error: token });
  } else {
    res.status(200).json({ token: token });
  }
});

// Complete user
router.post("/users/:token", (req, res) => {
  const token: string | undefined = req.headers.authorization;
  if (typeof token == undefined) {
    res.status(400).json({ error: "Not logged in!" });
  } else {
    const payload: User = req.body;
    const user: User | string = completeUser(payload, token as string);
    if (typeof user == "string") {
      res.status(400).json({ error: user });
    } else {
      res.status(200).json({ user: user });
    }
  }
});

// View user - current user
router.get("/users/me", (req, res) => {
  const payload: string | undefined = req.headers.authorization;
  console.log(payload);
  if (typeof payload == undefined) {
    res.status(400).json({ error: "Error: Not logged in!" });
  }
  const user: User | string = viewCurUser(payload as string);
  if (typeof user == "string") {
    res.status(400).json({ error: user });
  } else {
    res.status(200).json({ user: user });
  }
});

// View user - another user
router.get("/users/:userid", (req, res) => {
  const payload: string = req.params.userid;
  const user: User | string = viewOtherUser(payload);
  if (typeof user == "string") {
    res.status(400).json({ error: user });
  } else {
    res.status(200).json({ user: user });
  }
});

// Edit user
router.put("/users/edit/:token", (req, res) => {
  const token: string | undefined = req.headers.authorization;
  if (typeof token == undefined) {
    res.status(400).json({ error: "Not logged in!" });
  } else {
    const payload: User = req.body;
    const user: User | string = editUser(payload, token as string);
    if (typeof user == "string") {
      res.status(400).json({ error: user });
    } else {
      res.status(200).json({ user: user });
    }
  }
});

// Delete user
router.delete("/users/:userid", (req, res) => {
  res.status(200).json({ hi: "hello world from api!" });
});

export default router;
