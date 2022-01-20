import { User } from "./User"

export class RefreshToken {
    id: string
    userId: Pick<User, 'id'>
    expiresIn: number
}