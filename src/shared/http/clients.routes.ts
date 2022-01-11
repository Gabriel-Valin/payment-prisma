import { Router } from "express";
import { CreateClientController } from "../../components/clients/usecases/createClientUseCase/CreateClientController";
import { DeleteClientController } from "../../components/clients/usecases/deleteClientUseCase/DeleteClientController";
import { UpdateClientController } from "../../components/clients/usecases/updateClientUseCase/UpdateClientController";

const createClientController = new CreateClientController()
const updateClientController = new UpdateClientController()
const deleteClientController = new DeleteClientController()

export const clientsRouter = Router()
clientsRouter.post('/', createClientController.execute)
clientsRouter.delete('/:clientId', deleteClientController.execute)
clientsRouter.patch('/:clientId', updateClientController.execute)