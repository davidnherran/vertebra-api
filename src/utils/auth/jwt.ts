import jwt from 'jsonwebtoken';
import { envConfig } from '../../config';

export default class JWT {
  private secretKey: string;
  private expiresIn: string;
  constructor() {
    this.secretKey = envConfig.jwtSecretKey!;
    this.expiresIn = '6h';
  }

  generateJWT({ user }: PropsJWT) {
    return jwt.sign({ user }, this.secretKey, {
      expiresIn: this.expiresIn,
    });
  }

  validateToken(token: string) {
    if (!token) return { user: false };
    const payload = jwt.verify(
      token.split(' ')[1],
      envConfig.jwtSecretKey!
    ) as { user: UserDB };
    return { user: payload.user };
  }
}
