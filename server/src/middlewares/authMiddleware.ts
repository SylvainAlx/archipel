import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface JwtPayload {
  id: string;
  name: string;
  role?: string;
}

export const verifyJwt = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ error: "No token provided" });
      return; // Retourner ici pour éviter l'exécution du code suivant
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({ error: "Bad token" });
      return; // Retourner ici pour éviter l'exécution du code suivant
    }

    const secret = process.env.JWT_SECRET as string;

    const decoded = jwt.verify(token, secret) as JwtPayload;

    // Vérifiez si le décodage a réussi
    if (decoded && typeof decoded.id === "string") {
      req.decoded = decoded; // Vous devrez peut-être étendre l'interface Request
      req.userId = decoded.id;
      next();
    } else {
      res.status(400).json({ error: "JWT not decoded" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ error: "No token provided" });
      return; // Retourner ici pour éviter l'exécution du code suivant
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({ error: "Bad token" });
      return; // Retourner ici pour éviter l'exécution du code suivant
    }

    const secret = process.env.JWT_SECRET as string;

    const decoded = jwt.verify(token, secret) as JwtPayload;

    // Vérifiez si le décodage a réussi et si l'utilisateur est un admin
    if (decoded && decoded.role === "admin") {
      next();
    } else {
      res.status(403).json({ error: "Not admin" });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
