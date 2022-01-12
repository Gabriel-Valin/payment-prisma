import { Client } from "../entities/Client";
import { ContractClientsRepository } from "../types/repositories/ClientsRepository";
import { TypeClient } from "../types/requests/TypeClient";
import { TypeUpdateClient } from "../types/requests/TypeUpdateClient";

export class ClientsRepository implements ContractClientsRepository {
    private clients: Client[] = []

    public async findClientsByUserId (userId: string): Promise<Client[]> {
        const client = this.clients.filter(client => client.userId === userId)
        return client
    }

    public async updateClient ({ clientId, name, email, phone }: TypeUpdateClient): Promise<Client> {
        let clientToUpdate = this.clients.findIndex(user => user.id === clientId)
        const client = { name, email, phone }
        this.clients[clientToUpdate] = client
        this.clients[clientToUpdate].id = 'uuid'
        return client
    }

    public async deleteClient(clientId: string): Promise<boolean> {
        const client = this.clients.filter(user => user.id !== clientId)
        return !!client
    }

    public async findClientById (clientId: string): Promise<Client> {
        const client = this.clients.find(user => user.id === clientId)
        return client
    }

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