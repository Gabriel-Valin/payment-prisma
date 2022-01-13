import { Router } from "express";
import { CreateClientController } from "../../components/clients/usecases/createClientUseCase/CreateClientController";
import { DeleteClientController } from "../../components/clients/usecases/deleteClientUseCase/DeleteClientController";
import { ListAllClientsController } from "../../components/clients/usecases/listAllClientsUseCase/ListAllClientsController";
import { ListIndividualClientController } from "../../components/clients/usecases/listIndividualClientUseCase/ListIndividualClientController";
import { UpdateClientController } from "../../components/clients/usecases/updateClientUseCase/UpdateClientController";
import { ensureAuthenticated } from "./middlewares/EnsureAuthenticate";

const createClientController = new CreateClientController()
const updateClientController = new UpdateClientController()
const deleteClientController = new DeleteClientController()
const listIndividualClientController = new ListIndividualClientController()
const listAllClientsController = new ListAllClientsController()

export const clientsRouter = Router()
clientsRouter.post('/', ensureAuthenticated, createClientController.execute)
clientsRouter.delete('/:clientId', deleteClientController.execute)
clientsRouter.patch('/:clientId', updateClientController.execute)
clientsRouter.get('/:clientId', listIndividualClientController.execute)
clientsRouter.get('/:userId/todos', listAllClientsController.execute)