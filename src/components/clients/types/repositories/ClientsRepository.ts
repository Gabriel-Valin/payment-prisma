import { Client } from "../../entities/Client";
import { TypeClient } from "../requests/TypeClient";
import { TypeUpdateClient } from "../requests/TypeUpdateClient";

export interface ContractClientsRepository {
    findClientsByUserId (userId: string): Promise<Client[]>
    findClientByEmail (email: string): Promise<Client>
    getClientExists (email: string): Promise<boolean>
    createNewClient (data: TypeClient): Promise<Client>
    findClientById (clientId: string): Promise<Client>
    deleteClient (clientId: string): Promise<boolean>
    updateClient ({ clientId, name, email, phone }: TypeUpdateClient): Promise<Client>
}