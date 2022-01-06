import { User } from "../../entities/User";
import { TypeUser } from "../requests/CreateUser";

export interface ContractUsersRepository {
    createUser (data: TypeUser): Promise<User>
    findUserByEmail(email: string): Promise<Boolean>
}