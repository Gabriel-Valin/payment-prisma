import { Request, Response, Router } from "express";
import { makeCreateUserController } from "../../components/users/usecases/createUserUseCase";

export const usersRouter = Router()
usersRouter.post('/', (request: Request, response: Response) => {
    return makeCreateUserController().execute(request, response)
})