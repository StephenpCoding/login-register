import "dotenv/config";
const defaultDBPath = "http://localhost:6000";

export const usersDBPath = (process.env.DB_PATH || defaultDBPath) + "/users";
export const bcryptDBPath = (process.env.DB_PATH || defaultDBPath) + "/bcrypt";




