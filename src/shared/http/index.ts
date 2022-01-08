import { Router } from "express"
import { usersRouter } from "./user.routes";

export const router = Router();
router.use("/users", usersRouter);