import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

@Injectable()
export class EncryptionService {
  private readonly algorithm = 'aes-256-cbc';
  private readonly keyLength: number = 32; // 256-bit key for AES-256

  encrypt(plaintext: string): Buffer {
    const key = this.generateKey();
    const cipher = this.getCipher(key);
    const ciphertext = Buffer.concat([
      cipher.update(Buffer.from(plaintext, 'utf8')),
      cipher.final(),
    ]);
    return ciphertext;
  }

  decrypt(ciphertext: Buffer): string {
    const key = this.generateKey();
    const decipher = this.getDecipher(key);
    const decryptedText = Buffer.concat([
      decipher.update(ciphertext),
      decipher.final(),
    ]).toString('utf8');
    return decryptedText;
  }

  private generateKey(): Buffer {
    return randomBytes(this.keyLength);
  }

  private getCipher(key: Buffer): any {
    return createCipheriv(this.algorithm, key, Buffer.alloc(16, 0));
  }

  private getDecipher(key: Buffer): any {
    return createDecipheriv(this.algorithm, key, Buffer.alloc(16, 0));
  }
}
