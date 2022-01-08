export interface Cryptography {
    hash (plaintext: string): Promise<string>
    compare (plaintext: string, provided: string): Promise<boolean>
}