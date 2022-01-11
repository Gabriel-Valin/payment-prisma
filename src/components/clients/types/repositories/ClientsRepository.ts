import { Client } from "../../entities/Client";
import { TypeClient } from "../requests/TypeClient";

export interface ContractClientsRepository {
    findClientByEmail (email: string): Promise<Client>
    getClientExists (email: string): Promise<boolean>
    createNewClient (data: TypeClient): Promise<Client>
    findClientById (clientId: string): Promise<Client>
    deleteClient (clientId: string): Promise<boolean>
    updateClient ({ clientId, client }): Promise<Client>
}