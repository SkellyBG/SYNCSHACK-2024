import express from "express";
import helloWorldRoutes from "./hello-world/routes";
import userRoutes from "./users/routes";
import courseRoutes from "./courses/routes";
import groupRoutes from "./groups/routes";
import requestRoutes from "./requests/routes";

const router = express.Router();
router.use(helloWorldRoutes);
router.use(userRoutes);
router.use(courseRoutes);
router.use(groupRoutes);
router.use(requestRoutes)

export default router;
