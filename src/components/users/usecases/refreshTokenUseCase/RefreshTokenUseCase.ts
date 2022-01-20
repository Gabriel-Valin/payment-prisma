import { inject, injectable } from "tsyringe"
import { BaseError } from "../../../../shared/BaseError"
import { TokenizationAdapter } from "../../types/hasher/Jwt"
import { ContractRefreshTokenRepository } from "../../types/repositories/RefreshTokenRepository"
import { TypeRefreshToken } from "../../types/requests/RefreshToken"

@injectable()
export class RefreshTokenUseCase {
    constructor (
        @inject('TokenJwtAdapter')
        private readonly jwtAdapter: TokenizationAdapter,
        @inject('RefreshTokenRepository')
        private readonly refreshTokenRepository: ContractRefreshTokenRepository
    ) {}
    public async perform (userId: string): Promise<TypeRefreshToken>{
        const refreshTokenFound = await this.refreshTokenRepository.findRefreshTokenByUserId(userId)

        if (!refreshTokenFound) {
            throw new BaseError('Invalid refresh token', 403)
        }
        
        await this.refreshTokenRepository.deleteRefreshTokenFromUser(userId)
        const refreshToken = await this.refreshTokenRepository.createRefreshToken(userId)
        const token = this.jwtAdapter.encrypt(userId)

        return { token, refreshToken } 
    
    }
}