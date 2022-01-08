import bcryptjs from 'bcryptjs'
import { Cryptography } from '../../../components/users/types/hasher/Cryptography'

export class BcryptAdapter implements Cryptography {
    constructor (private readonly salt: number) {}

    hash (plaintext: string): Promise<string> {
        return bcryptjs.hash(plaintext, this.salt)
    }
    compare (plaintext: string, provided: string): Promise<boolean> {
        return bcryptjs.compare(plaintext, provided)
    }
    
}