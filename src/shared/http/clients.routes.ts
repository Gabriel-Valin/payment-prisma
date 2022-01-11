import { Router } from "express";
import { CreateClientController } from "../../components/clients/usecases/createClientUseCase/CreateClientController";

const createClientController = new CreateClientController()

export const clientsRouter = Router()
clientsRouter.post('/', createClientController.execute)