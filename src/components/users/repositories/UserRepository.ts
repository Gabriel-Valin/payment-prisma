import { User } from "../entities/User"
import { ContractUsersRepository } from "../types/repositories/UsersRepository"
import { TypeUser } from "../types/requests/CreateUser"

export class UsersRepository implements ContractUsersRepository {
    private users: User[] = []

    public createUser({ email, password, name }: TypeUser): User {
        const user = new User()
        const dataUser = Object.assign(user, { id: 'uuid', email, password, name })
        this.users.push(dataUser)
        return dataUser
    }
}