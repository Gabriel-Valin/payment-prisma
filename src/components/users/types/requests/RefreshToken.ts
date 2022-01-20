import { User } from "../../entities/User";

export type TypeRefreshToken = {
    refreshToken: {
        id: string
        userId: Pick<User, 'id'>
        expiresIn: number
    }
    token: string
}