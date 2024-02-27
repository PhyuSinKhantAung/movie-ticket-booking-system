import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { NotAuthenticatedException } from "src/utils/http-exceptions.util";

export interface TokenPayload {
  id: string;
  email: string;
  // TODO should have enum types
  type: string;
}

export default class AuthController {
  async generateToken(
    payload: TokenPayload,
    secret: string,
    expiresIn: string,
  ) {
    return new Promise((resolve: (value: string) => void, reject) => {
      jwt.sign(payload, secret, { expiresIn }, (error, token) => {
        if (error) reject(error);
        resolve(token!);
      });
    });
  }

  async verifyToken({ token, secret }: { token: string; secret: string }) {
    try {
      return jwt.verify(token, secret) as TokenPayload;
    } catch (error) {
      throw new NotAuthenticatedException("Invalid token");
    }
  }

  async verifyPassword(rawPassword: string, hashedPassword: string) {
    const valid = await compare(rawPassword, hashedPassword);
    if (!valid) throw new NotAuthenticatedException("Invalid password");
  }

  async generateAccessTokenWithRefreshToken(refreshToken: string) {
    const decoded: TokenPayload = await this.verifyToken({
      token: refreshToken,
      secret: process.env.REFRESH_TOKEN_SECRET
        ? String(process.env.REFRESH_TOKEN_SECRET)
        : "",
    });

    const accessToken = this.generateToken(
      decoded,
      process.env.ACCESS_TOKEN_SECRET
        ? String(process.env.ACCESS_TOKEN_SECRET)
        : "",
      "1h",
    );
    return accessToken;
  }
}
