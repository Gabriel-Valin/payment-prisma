import { BaseError } from "../../../../shared/BaseError"
import { JwtAdapter } from "../../../../shared/infra/cryptography/Jwt"
import { User } from "../../entities/User"
import { TokenizationAdapter } from "../../types/hasher/Jwt"
import { UserAuthenticated } from "../../types/requests/UserAuthenticate"

interface ContractRefreshTokenRepository {
    createRefreshToken (userId: string): Promise<RefreshToken>
    findRefreshTokenByUserId (userId: string): Promise<Boolean>
}

export class RefreshToken {
    id: string
    userId: Pick<User, 'id'>
    expiresIn: number
}

export type TypeRefreshToken = {
    refreshToken: {
        userId: Pick<User, 'id'>
        expiresIn: number
    }
    token: string
}

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

class RefreshTokenUseCase {
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

let jwtAdapter: JwtAdapter
let refreshTokenRepository: ContractRefreshTokenRepository
let sut: RefreshTokenUseCase


describe('Refresh Token Use Case', () => {
    beforeEach(() => {
        jwtAdapter = new JwtAdapter(process.env.JWT_SECRET)
        refreshTokenRepository = new RefreshTokenRepository()
        sut = new RefreshTokenUseCase(jwtAdapter, refreshTokenRepository)
    })

    it('should be able create a refresh token for user', async () => {
        await refreshTokenRepository.createRefreshToken('any_id')
        const result = await sut.perform('any_id')
        expect(result.refreshToken).toHaveProperty('userId')
        expect(result.refreshToken.userId).toEqual('any_id')
    })

    it('should be able return new token to user', async () => {
        await refreshTokenRepository.createRefreshToken('any_id')
        const result = await sut.perform('any_id')
        expect(result).toHaveProperty('token')
        expect(typeof result.token).toBe('string')
    })

    it('should not be able create refresh token with invalid userId', async () => {
        await expect(sut.perform('any_id')).rejects.toBeInstanceOf(BaseError) 
    })
})