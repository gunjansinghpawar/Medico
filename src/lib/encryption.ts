import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = process.env.NEXT_ENCRYPTION_KEY || 'default-key-change-in-production';

export const encryptMessage = (message: string): string => {
  try {
    const encrypted = CryptoJS.AES.encrypt(message, ENCRYPTION_KEY).toString();
    return encrypted;
  } catch (error) {
    console.error('Encryption error:', error);
    return message; // Fallback to unencrypted if encryption fails
  }
};

export const decryptMessage = (encryptedMessage: string): string => {
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedMessage, ENCRYPTION_KEY);
    const originalMessage = decrypted.toString(CryptoJS.enc.Utf8);
    return originalMessage || encryptedMessage; // Fallback if decryption fails
  } catch (error) {
    console.error('Decryption error:', error);
    return encryptedMessage; // Return as-is if decryption fails
  }
};

export const hashPassword = async (password: string): Promise<string> => {
  const bcrypt = await import('bcryptjs');
  return bcrypt.hash(password, 12);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  const bcrypt = await import('bcryptjs');
  return bcrypt.compare(password, hash);
};