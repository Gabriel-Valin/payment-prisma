import { TokenizationAdapter } from "../../../components/users/types/hasher/Jwt"
import jwt from 'jsonwebtoken'

export class JwtAdapter implements TokenizationAdapter {
    constructor (private readonly secret: string) {}

    decrypt (ciphertext: string): string {
        return jwt.verify(ciphertext, this.secret) as any
    }

    encrypt (plaintext: string): string {
        return jwt.sign({}, this.secret, {
            subject: plaintext,
            expiresIn: '1d'
        })
    }
}