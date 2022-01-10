import { Router } from "express";
import { CreateClientController } from "../../components/clients/createClientUseCase/CreateClientController";

const createClientController = new CreateClientController()

export const clientsRouter = Router()
clientsRouter.post('/', createClientController.execute)