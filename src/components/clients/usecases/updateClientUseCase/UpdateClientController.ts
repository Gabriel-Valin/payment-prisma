import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateClientUseCase } from "./UpdateClientUseCase";

export class UpdateClientController {
    public async execute (request: Request, response: Response): Promise<Response> {
        const { clientId } = request.params
        const { name, email, phone } = request.body
        const useCaseContainer = container.resolve(UpdateClientUseCase)
        const useCasePerfomance = await useCaseContainer.perform({ clientId, name, email, phone })
        return response.status(201).json(useCasePerfomance)
    }
}