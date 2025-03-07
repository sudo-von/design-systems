import { Request, Response, NextFunction } from "express";
import { bucket } from "./algorithm";

export const rateLimitMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { ip } = req;
  console.log(`[middleware][INFO] Request received from ${ip} at ${new Date().toISOString()}. Tokens available: ${bucket.tokens}`);

  if (bucket.tokens <= 0) {
    console.log(`[middleware][WARNING] Rate limit exceeded for ${ip}. Responding with 429.`);
    res.status(429).json({ message: 'Too many requests, please try again later.' });
    return;
  }

  bucket.tokens--;
  console.log(`[middleware][INFO] Token consumed for ${ip}. Tokens remaining: ${bucket.tokens}`);
  next();
};