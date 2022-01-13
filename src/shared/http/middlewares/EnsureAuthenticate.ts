import { NextFunction, Request, Response } from "express";
import { BaseError } from "../../BaseError";
import { JwtAdapter } from "../../infra/cryptography/Jwt";

interface IPayload {
  sub: string;
}

const jwtAdapter = new JwtAdapter(process.env.JWT_SECRET)

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new BaseError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: userId } = jwtAdapter.decrypt(token) as unknown as IPayload;
    
    request.user = {
      userId,
    };

    next();
  } catch {
    throw new BaseError("Invalid token!", 401);
  }
}