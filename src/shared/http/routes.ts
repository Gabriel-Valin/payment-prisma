import { Request, Response, Router } from "express";
import { factoryCreateUser } from "../../components/users/createUserUseCase";

const useRouter = Router()
useRouter.post('/', (request: Request, response: Response) => {
    return factoryCreateUser
})
