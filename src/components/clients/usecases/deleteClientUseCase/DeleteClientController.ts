import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteClientUseCase } from "./DeleteClientUseCase";

export class DeleteClientController {
    public async execute (request: Request, response: Response) {
        const { clientId } = request.params
        const useCaseContainer = container.resolve(DeleteClientUseCase)
        const useCasePerformance = useCaseContainer.perform(clientId)
        response.status(201).json(useCasePerformance)
    }
}