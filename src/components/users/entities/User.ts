export class User {
    id?: string
    email: string
    password: string
    name: string
    createdAt: Date
    updatedAt: Date

    constructor () {
        if (!this.createdAt || !this.updatedAt) {
            this.createdAt = new Date()
            this.updatedAt = new Date()
        }
    }
}