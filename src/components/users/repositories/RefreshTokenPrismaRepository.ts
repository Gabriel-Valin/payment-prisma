import { prisma } from "../../../shared/infra/database";
import { RefreshToken } from "../entities/RefreshToken";
import { ContractRefreshTokenRepository } from "../types/repositories/RefreshTokenRepository";

export class RefreshTokenPrismaRepository implements ContractRefreshTokenRepository {
    public async deleteRefreshTokenFromUser (userId: string): Promise<Boolean> {
        const refreshTokenToDelete = await prisma.refreshToken.delete({
            where: {
                userId
            }
        })

        if (!!refreshTokenToDelete) return true
    }
    public async createRefreshToken(userId: string): Promise<RefreshToken> {
        const refreshToken = await prisma.refreshToken.create({
            data: {
                userId,
                expiresIn: 15*60*60
            }
        })

        return refreshToken as RefreshToken
    }
    public async findRefreshTokenByUserId(userId: string): Promise<Boolean> {
        const refreshTokenFound = await prisma.refreshToken.findFirst({
            where: {
                userId
            }
        })

        return !!refreshTokenFound
    }
    
}