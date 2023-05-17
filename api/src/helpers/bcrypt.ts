import bcrypt from "bcrypt";

export const encrypt = async (textPlain: string): Promise<string> => {
  return await bcrypt.hash(textPlain, 10);
};

export const compare = async (passwordPlain: string, hashPassword: string): Promise<boolean> => {
  return await bcrypt.compare(passwordPlain, hashPassword);
};
