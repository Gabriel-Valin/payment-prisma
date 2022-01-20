import { BaseError } from "../../../../shared/BaseError"
import { JwtAdapter } from "../../../../shared/infra/cryptography/Jwt"
import { RefreshTokenRepository } from "../../repositories/MemoryRefreshTokenRepository"
import { ContractRefreshTokenRepository } from "../../types/repositories/RefreshTokenRepository"
import { RefreshTokenUseCase } from "./RefreshTokenUseCase"

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