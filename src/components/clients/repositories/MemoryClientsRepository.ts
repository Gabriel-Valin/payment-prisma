import { Client } from "../entities/Client";
import { ContractClientsRepository } from "../types/repositories/ClientsRepository";
import { TypeClient } from "../types/requests/TypeClient";

export class ClientsRepository implements ContractClientsRepository {
    private clients: Client[] = []
    public async findClientByEmail (email: string): Promise<Client> {
        const client = this.clients.find(user => user.email === email)
        return client
    }
    public async getClientExists (email: string): Promise<boolean> {
        const client = this.clients.find(user => user.email === email)
        return !!client
    }
    public async createNewClient ({ userId, name, email, phone }: TypeClient): Promise<Client> {
        const client = new Client()
        const dataClient = Object.assign(client, { id: '30981dhahdsah91823', userId, name, email, phone })
        this.clients.push(dataClient)
        return dataClient
    }
    
}