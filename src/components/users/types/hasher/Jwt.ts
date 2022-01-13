export interface TokenizationAdapter {
    encrypt (plaintext: string): string
    decrypt (ciphertext: string): string
}
