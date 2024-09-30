import { Request, Response } from "express";

export const home = (req: Request, res: Response): void => {
  const time = new Date();
  res.status(200).send(`<b>${time.toLocaleTimeString()}</b>`);
};
