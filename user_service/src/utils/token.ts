import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();


const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT_SECRET is not defined");
}


export const signAccessToken =  (payload: any) => {
  return jwt.sign(payload, secret, { expiresIn: "1h" });
};

export const signRefreshToken =  (payload: any) => {
  return jwt.sign(payload, secret, { expiresIn: "7d" });
};
    

export const verifyToken = (token: string) => {
  return jwt.verify(token, secret);
};


export const decodeToken = (token: string) => {
  return jwt.decode(token);
};

