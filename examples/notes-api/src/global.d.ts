import { User } from "@prisma/client";

declare global {
  interface DecodedJWT {
    uuid: User["uuid"];
    username: User["username"];
    iat: number;
  }
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET?: string;
      PORT_EXPRESS?: string;
    }
  }
  namespace Express {
    export interface Request {
      // Add req.user which will be exposed by protectMiddleware
      user?: DecodedJWT;
    }
  }
}
