import express from "express";
import helloWorldRoutes from "./hello-world/routes";
import userRoutes from "./users/routes";

const router = express.Router();
router.use(helloWorldRoutes);
router.use(userRoutes);

export default router;
