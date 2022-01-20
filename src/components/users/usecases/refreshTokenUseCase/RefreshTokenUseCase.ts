import { BaseError } from "../../../../shared/BaseError"
import { TokenizationAdapter } from "../../types/hasher/Jwt"
import { ContractRefreshTokenRepository } from "../../types/repositories/RefreshTokenRepository"
import { TypeRefreshToken } from "../../types/requests/RefreshToken"

export class RefreshTokenUseCase {
    constructor (
        private readonly jwtAdapter: TokenizationAdapter,
        private readonly refreshTokenRepository: ContractRefreshTokenRepository
    ) {}
    public async perform (userId: string): Promise<TypeRefreshToken>{
        const refreshTokenFound = await this.refreshTokenRepository.findRefreshTokenByUserId(userId)

        if (!refreshTokenFound) {
            throw new BaseError('Invalid refresh token', 401)   
        }

        const refreshToken = await this.refreshTokenRepository.createRefreshToken(userId)
        const token = this.jwtAdapter.encrypt(userId)

        return { token, refreshToken } 
    
    }
}