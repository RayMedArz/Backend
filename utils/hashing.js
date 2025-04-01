import crypto from "crypto";

/**
 * Encrypts a password with a salt.
 * @param {string} password - The plain text password.
 * @returns {object} - An object containing the salt and the hashed password.
 */
export const encryptPassword = (password) => {
  const salt = crypto.randomBytes(16).toString("hex"); // Generate a random salt
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha256") // Hash the password with the salt
    .toString("hex");
  return { salt, hash };
};

/**
 * Verifies if a password matches the hashed password.
 * @param {string} password - The plain text password.
 * @param {string} salt - The salt used during hashing.
 * @param {string} hash - The hashed password to compare against.
 * @returns {boolean} - True if the password matches, false otherwise.
 */
export const verifyPassword = (password, salt, hash) => {
  const hashToVerify = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha256")
    .toString("hex");
  return hash === hashToVerify;
};
