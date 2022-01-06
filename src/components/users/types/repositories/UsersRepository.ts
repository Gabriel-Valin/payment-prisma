import { User } from "../../entities/User";
import { TypeUser } from "../requests/CreateUser";

export interface ContractUsersRepository {
    createUser (data: TypeUser): User
}