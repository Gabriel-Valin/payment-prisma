import { Request, Response, Router } from "express";
import { makeAuthenticateUserController } from "../../components/users/usecases/authenticateUserUseCase";
import { makeCreateUserController } from "../../components/users/usecases/createUserUseCase";

export const usersRouter = Router()
usersRouter.post('/', (request: Request, response: Response) => {
    return makeCreateUserController().execute(request, response)
})

usersRouter.post('/auth', (request: Request, response: Response) => {
    return makeAuthenticateUserController().execute(request, response)
})
