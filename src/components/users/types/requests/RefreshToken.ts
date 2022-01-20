import { User } from "../../entities/User";

export type TypeRefreshToken = {
    refreshToken: {
        userId: Pick<User, 'id'>
        expiresIn: number
    }
    token: string
}