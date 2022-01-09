import { User } from "../../entities/User";

export type UserAuthenticated = {
    user: User
    token: string
}