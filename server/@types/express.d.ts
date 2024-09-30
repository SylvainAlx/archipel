import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      decoded?: { id: string; role?: string };
      userId?: string;
    }
  }
}
