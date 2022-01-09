import { User } from "../entities/User"
import { ContractUsersRepository } from "../types/repositories/UsersRepository"
import { TypeUser } from "../types/requests/CreateUser"

export class UsersRepository implements ContractUsersRepository {
    private users: User[] = []

    public async createUser({ email, password, name }: TypeUser): Promise<User> {
        const user = new User()
        const dataUser = Object.assign(user, { id: 'uuid', email, password, name })
        this.users.push(dataUser)
        return dataUser
    }

    public async findUserByEmail(email : string): Promise<Boolean> {
        const user = this.users.find(user => user.email === email)
        return !!user
    }

    public async getUserInfoByEmail(email: string): Promise<User> {
        const user = this.users.find(user => user.email === email)
        return user
    }
}