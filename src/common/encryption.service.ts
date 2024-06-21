import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, pbkdf2Sync } from 'crypto';

@Injectable()
export class EncryptionService {
  private readonly algorithm = 'aes-256-cbc';
  private readonly keyLength: number = 32;
  private readonly salt: string = 'mysaltvalue'; // Salt used for key derivation
  private readonly key: Buffer; // Fixed-length key for encryption and decryption

  constructor() {
    // Generate a fixed key for encryption and decryption
    this.key = this.generateKey();
  }

  private generateKey(): Buffer {
    return pbkdf2Sync(
      'mysecretkeymysecretkeymysecretkey',
      this.salt,
      100000,
      this.keyLength,
      'sha512',
    );
  }

  encrypt(plaintext: string): string {
    const cipher = createCipheriv(
      this.algorithm,
      this.key,
      Buffer.alloc(16, 0),
    );
    const encryptedBuffer = cipher.update(plaintext, 'utf8', 'base64');
    const ciphertext = encryptedBuffer + cipher.final('base64');
    return ciphertext;
  }

  decrypt(ciphertext: string): string {
    const decipher = createDecipheriv(
      this.algorithm,
      this.key,
      Buffer.alloc(16, 0),
    );
    const decryptedBuffer = decipher.update(ciphertext, 'base64', 'utf8');
    const decryptedText = decryptedBuffer + decipher.final('utf8');
    return decryptedText;
  }
}
