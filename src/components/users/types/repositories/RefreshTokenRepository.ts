import { RefreshToken } from "../../entities/RefreshToken";

export interface ContractRefreshTokenRepository {
    createRefreshToken (userId: string): Promise<RefreshToken>
    findRefreshTokenByUserId (userId: string): Promise<Boolean>
}