import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListIndividualClientUseCase } from "./ListIndividualClientUseCase";

export class ListIndividualClientController {
    public async execute (request: Request, response: Response): Promise<Response> {
        const { clientId } = request.params
        const useCaseContainer = container.resolve(ListIndividualClientUseCase)
        const useCasePerformance = await useCaseContainer.perform(clientId)
        return response.status(200).json({ user: useCasePerformance })
    }
}