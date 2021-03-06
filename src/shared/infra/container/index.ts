import { container } from "tsyringe";
import { ClientsPrismaRepository } from "../../../components/clients/repositories/ClientsPrismaRepository";
import { ContractClientsRepository } from "../../../components/clients/types/repositories/ClientsRepository";
import { UsersTokenRecoveryRepository } from "../../../components/users/repositories/MemoryUsersTokenRecoveryRepository";
import { RefreshTokenPrismaRepository } from "../../../components/users/repositories/RefreshTokenPrismaRepository";
import { PrismaRepository } from "../../../components/users/repositories/UserPrismaRepository";
import { Cryptography } from "../../../components/users/types/hasher/Cryptography";
import { TokenizationAdapter } from "../../../components/users/types/hasher/Jwt";
import { ContractRefreshTokenRepository } from "../../../components/users/types/repositories/RefreshTokenRepository";
import { ContractUsersRepository } from "../../../components/users/types/repositories/UsersRepository";
import { ContractUsersTokenRecoveryRepository } from "../../../components/users/types/repositories/UsersTokenRepository";
import { BcryptAdapter } from "../cryptography/Bcrypt";
import { JwtAdapter } from "../cryptography/Jwt";

container.register<ContractUsersRepository>('PrismaClient', { useValue: new PrismaRepository() })
container.register<ContractClientsRepository>('ClientsPrismaClient', { useValue: new ClientsPrismaRepository() })
container.register<ContractRefreshTokenRepository>('RefreshTokenRepository', RefreshTokenPrismaRepository)
container.register<ContractUsersTokenRecoveryRepository>('UsersTokenRecoveryPrisma', UsersTokenRecoveryRepository)
container.register<Cryptography>('BcryptAdapter', { useValue: new BcryptAdapter(8) } )
container.register<TokenizationAdapter>('TokenJwtAdapter', { useValue: new JwtAdapter(process.env.JWT_SECRET) })