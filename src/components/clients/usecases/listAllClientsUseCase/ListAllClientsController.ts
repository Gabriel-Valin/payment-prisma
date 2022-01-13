import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAllClientsUseCase } from "./listAllClientsUseCase";

export class ListAllClientsController {
    public async execute (request: Request, response: Response): Promise<Response> {
        const { userId } = request.params
        const useCaseContainer = container.resolve(ListAllClientsUseCase)
        const useCasePerformance = await useCaseContainer.perform(userId)
        return response.status(201).json({ users: useCasePerformance })
    }
}