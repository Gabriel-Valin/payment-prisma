import { Response, Request } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
    constructor (private readonly createUserUseCase: CreateUserUseCase) {}
    public async execute (request: Request, response: Response): Promise<Response> {
        const { email, password, name } = request.body
        const result = await this.createUserUseCase.perform({ email, name, password })
        return response.status(201).json(result)
    } 
}