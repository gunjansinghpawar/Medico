import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'default-key-change-in-production';

if (ENCRYPTION_KEY === 'default-key-change-in-production') {
  console.warn(
    '⚠️ Warning: Using default ENCRYPTION_KEY in production is insecure. Please set NEXT_PUBLIC_ENCRYPTION_KEY environment variable.'
  );
}

/**
 * Encrypts a plain text message using AES encryption.
 * @param message - The plaintext message to encrypt
 * @returns Encrypted string (base64)
 */
export const encryptMessage = (message: string): string => {
  try {
    const ciphertext = CryptoJS.AES.encrypt(message, ENCRYPTION_KEY).toString();
    return ciphertext;
  } catch (error) {
    console.error('Encryption error:', error);
    // Fallback—return original plaintext but be aware this is not secure
    return message;
  }
};

/**
 * Decrypts an AES encrypted string back to plaintext.
 * @param encryptedMessage - The encrypted message string (base64)
 * @returns Decrypted plaintext or original string if decryption fails
 */
export const decryptMessage = (encryptedMessage: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, ENCRYPTION_KEY);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);

    if (!originalText) {
      console.warn('Decryption returned empty string, returning original message.');
      return encryptedMessage;
    }

    return originalText;
  } catch (error) {
    console.error('Decryption error:', error);
    // Return original encrypted string if decryption fails
    return encryptedMessage;
  }
};

/**
 * Hashes a plaintext password securely using bcrypt.
 * @param password - Plaintext password to hash
 * @returns Hashed password string
 */
export const hashPassword = async (password: string): Promise<string> => {
  const bcrypt = await import('bcryptjs');
  try {
    const saltRounds = 12;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    console.error('Password hashing error:', error);
    throw error;
  }
};

/**
 * Compares a plaintext password against a bcrypt hash.
 * @param password - Plaintext password to verify
 * @param hash - Stored bcrypt hashed password
 * @returns True if password matches hash, false otherwise
 */
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  const bcrypt = await import('bcryptjs');
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    console.error('Password comparison error:', error);
    return false;
  }
};
