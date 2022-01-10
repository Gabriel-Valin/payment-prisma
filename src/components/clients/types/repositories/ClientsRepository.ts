import { Client } from "../../entities/Client";
import { TypeClient } from "../requests/TypeClient";

export interface ContractClientsRepository {
    findClientByEmail (email: string): Promise<Client>
    getClientExists (email: string): Promise<boolean>
    createNewClient (data: TypeClient): Promise<Client>
}