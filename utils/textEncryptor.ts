import Jasypt from "jasypt";
import crypto from "node:crypto";

const ALGORITHM = "aes-128-cbc";
const DIGEST = "sha1";
const ENCODING = "base64";
const ITERATIONS = 65536;
const IV = Buffer.of(4, 22, 36, 36, 49, 53, 77, 94, 4, 22, 36, 36, 49, 53, 77, 94);
const KEY_LENGTH = 16;
const SALT = "39a7340a4ae4714170b53442a8b489f2";

/**
 * Provides compatibility with TextEncryptor and TextEncryptor2 classes from Stay Java source code.
 */
export class TextEncryptor {
  private readonly key: Buffer;
  private readonly jasypt: any;

  constructor(password: string) {
    this.key = crypto.pbkdf2Sync(Buffer.from(password), Buffer.from(SALT), ITERATIONS, KEY_LENGTH, DIGEST);

    this.jasypt = new Jasypt();
    this.jasypt.setPassword(password);
  }

  encrypt(plainText: string): string {
    const cipher = crypto.createCipheriv(ALGORITHM, this.key, IV);
    const encrypted = Buffer.concat([cipher.update(plainText), cipher.final()]);
    return encrypted.toString(ENCODING);
  }

  decrypt(encryptedText: string, encoding: BufferEncoding = "utf-8"): string {
    const encrypted = Buffer.from(encryptedText, ENCODING);
    const decipher = crypto.createDecipheriv(ALGORITHM, this.key, IV);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString(encoding);
  }

  decryptWithLegacyFallback(encryptedText: string): string {
    try {
      return this.decrypt(encryptedText);
    } catch (error: any) {
      return this.legacyDecrypt(encryptedText);
    }
  }

  legacyEncrypt(plainText: string): string {
    return this.jasypt.encrypt(plainText);
  }

  legacyDecrypt(encryptedText: string): string {
    return this.jasypt.decrypt(encryptedText);
  }
}
