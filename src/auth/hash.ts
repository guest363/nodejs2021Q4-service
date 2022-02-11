import crypto from 'crypto';

/**
 * Generate a salt and hash the password using the salt
 * @param password - The password to be hashed.
 * @returns The salt and the derived key.
 */
export async function hash(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // generate random 16 bytes long salt
    const salt = crypto.randomBytes(16).toString('hex');

    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(`${salt}:${derivedKey.toString('hex')}`);
    });
  });
}
