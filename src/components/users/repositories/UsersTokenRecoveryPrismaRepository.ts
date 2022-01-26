import { prisma } from "../../../shared/infra/database"
import { TypeUserTokenRecovery, UsersTokenRecovery } from "../types/repositories/TokenRecovery"
import { ContractUsersTokenRecoveryRepository } from "../types/repositories/UsersTokenRepository"

export class UsersTokenRecoveryRepository implements ContractUsersTokenRecoveryRepository {
    public async createTokenRecovery({ token, expiresIn, userId }: TypeUserTokenRecovery): Promise<UsersTokenRecovery> {
        const newUserToken = await prisma.usersTokenRecovery.create({
            data: {
                token,
                expiresIn,
                userId
            }
        })

        return newUserToken
    }

    public async findByToken(token: string ): Promise<UsersTokenRecovery> {
        const tokenFound = await prisma.usersTokenRecovery.findFirst({
            where: {
                token
            }
        })

        return tokenFound
    }
    
}