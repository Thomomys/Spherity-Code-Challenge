import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, pbkdf2Sync } from 'crypto';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class EncryptionService {
  private readonly algorithm = process.env.ENCRYPT_ALGORITHM;
  private readonly key: Buffer; // Fixed-length key for encryption and decryption

  constructor() {
    // Generate a fixed key for encryption and decryption
    this.key = this.generateKey();
  }

  private generateKey(): Buffer {
    return pbkdf2Sync(
      process.env.ENCRYPT_PASSWORD,
      process.env.ENCRYPT_SALT,
      parseInt(process.env.ENCRYPT_ITERATIONS, 10),
      parseInt(process.env.ENCRYPT_KEYLEN, 10),
      process.env.ENCRYPT_DIGEST,
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
