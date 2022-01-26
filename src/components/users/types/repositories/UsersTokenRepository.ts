export interface ContractUsersTokenRecoveryRepository {
    createTokenRecovery ({ token, expirenIn, userId }: TypeUserTokenRecovery): Promise<UsersTokenRecovery>
    findByToken (token: string): Promise<UsersTokenRecovery>
}