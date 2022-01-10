export class Client {
    id?: string
    userId: string
    email: string
    name: string
    phone: string
    createdAt: Date
    updatedAt: Date

    constructor () {
        if (!this.createdAt || !this.updatedAt) {
            this.createdAt = new Date()
            this.updatedAt = new Date()
        }
    }
}