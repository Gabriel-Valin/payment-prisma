import { Response, Request } from "express";
import { container } from "tsyringe";
import { CreateClientUseCase } from "./CreateClientUseCase";

export class CreateClientController {
    public async execute (request: Request, response: Response): Promise<Response> {
        const { email, userId, name, phone } = request.body
        console.log(request.body)
        const useCaseContainer = container.resolve(CreateClientUseCase)
        const useCasePerformance = await useCaseContainer.perform({ userId, email, name, phone })
        return response.status(201).json(useCasePerformance)
    } 
}