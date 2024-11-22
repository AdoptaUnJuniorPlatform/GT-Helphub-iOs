import * as Crypto from "expo-crypto";

export const generateRandomCode = async () => {
  const randomBytes = await Crypto.getRandomBytesAsync(4); // Generate 4 random bytes
  const randomNumber =
    (new Uint32Array(randomBytes.buffer)[0] % 900000) + 100000;
  return randomNumber.toString();
};
