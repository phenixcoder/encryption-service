import * as crypto from "crypto";

/**
 * The encryption algorithm (cipher) type to be used.
 * @type {String}
 * @const
 * @private
 */
const CIPHER_ALGORITHM = "aes-256-ctr";

export class AES256 {
  key: Buffer;
  iv: Buffer;

  constructor(KEY: string, IV: string) {
    (this.key = Buffer.from(KEY, "utf8")), KEY;
    this.iv = Buffer.from(IV, "utf8");
  }

  encrypt(input: string): string {
    var cipher = crypto.createCipheriv("aes-256-cbc", this.key, this.iv);

    let encrypted = cipher.update(input, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted.toUpperCase();
  }
  decrypt(encrypted_input: string): string {
    var decipher = crypto.createDecipheriv("aes-256-cbc", this.key, this.iv);

    let decrypted = decipher.update(encrypted_input, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  }

  static checksum(input: string): string {
    return crypto
      .createHash("sha256")
      .update(input)
      .digest("hex")
      .toUpperCase();
  }
}
