import { TypeUserTokenRecovery, UsersTokenRecovery } from "../types/repositories/TokenRecovery"
import { ContractUsersTokenRecoveryRepository } from "../types/repositories/UsersTokenRepository"

export class UsersTokenRecoveryRepository implements ContractUsersTokenRecoveryRepository {
    private usersToken: UsersTokenRecovery[] = []
    public async createTokenRecovery({ token, expiresIn, userId }: TypeUserTokenRecovery): Promise<UsersTokenRecovery> {
        const userToken = new UsersTokenRecovery()
        const createUserToken = Object.assign(userToken, { id: 'uuid', token, expiresIn, userId })
        this.usersToken.push(createUserToken)
        return createUserToken
    }

    public async findByToken(token: string ): Promise<UsersTokenRecovery> {
        const tokenFound = this.usersToken.find(userToken => userToken.token === token)
        return tokenFound
    }
    
}