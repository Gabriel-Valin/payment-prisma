import { Router } from "express"
import { clientsRouter } from "./clients.routes";
import { usersRouter } from "./user.routes";

export const router = Router();
router.use("/users", usersRouter);
router.use('/clients', clientsRouter)