import express from "express";
import helloWorldRoutes from "./hello-world/routes";

const router = express.Router();
router.use(helloWorldRoutes);

export default router;
