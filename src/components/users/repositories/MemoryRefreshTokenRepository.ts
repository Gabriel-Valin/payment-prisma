import { RefreshToken } from "../entities/RefreshToken"
import { ContractRefreshTokenRepository } from "../types/repositories/RefreshTokenRepository"

export class RefreshTokenRepository implements ContractRefreshTokenRepository {
    private refreshTokens: RefreshToken[] = []
    
    public async createRefreshToken(userId: string): Promise<RefreshToken> {
        const refreshToken = new RefreshToken()
        const refreshTokenUser = Object.assign(refreshToken, { id: 'uuid', userId, expiresIn: 15*60*60 })
        this.refreshTokens.push(refreshTokenUser)
        return refreshTokenUser
    }

    public async findRefreshTokenByUserId(userId: string): Promise<Boolean> {
        const refreshTokenFound = this.refreshTokens.some(refreshToken => refreshToken.userId === userId)
        return refreshTokenFound
    }
}