import { container } from "tsyringe"
import { RefreshTokenUseCase } from "./RefreshTokenUseCase"
import { Response, Request } from "express";

export class RefreshTokenController {
    public async execute (request: Request, response: Response): Promise<Response> {
        const { userId } = request.body
        const useCaseContainer = container.resolve(RefreshTokenUseCase)
        const useCasePerformance = await useCaseContainer.perform(userId)
        return response.status(201).json(useCasePerformance)
    } 
}