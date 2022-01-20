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

    it('should be able delete older refresh token when new will requested', async () => {
        await refreshTokenRepository.createRefreshToken('any_id')
        await sut.perform('any_id')
        await refreshTokenRepository.createRefreshToken('any_id')
        const result = await sut.perform('any_id')
        expect(result).toHaveProperty('token')
        expect(result).toHaveProperty('refreshToken')
        expect(result.refreshToken.userId).toBe('any_id')
    })

    it('should no be able create a new refreshToken with incorrect values', async () => {
        await refreshTokenRepository.createRefreshToken('id_valid')
        await expect(sut.perform('invalid_id')).rejects.toBeInstanceOf(BaseError)
    })
})