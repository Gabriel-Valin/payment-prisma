export interface TokenizationAdapter {
    encrypt (plaintext: string): string
    decrypt (ciphertext: string): Promise<string> 
}
