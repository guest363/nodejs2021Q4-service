import crypto from 'crypto';

/**
 * It verifies that the password is correct.
 * @param {string} password - The password to be hashed.
 * @param {string} hash - The hash that you want to verify.
 * @returns A promise.
 */
export async function verify(password: string, hash: string) {
  return new Promise((resolve, reject) => {
    const [salt, key] = hash.split(':');
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(key == derivedKey.toString('hex'));
    });
  });
}
