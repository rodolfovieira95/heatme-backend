import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_SECRET } from 'src/constants/envs';
import { Request } from 'express';

interface JwtPayload {
  sub: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const cookieExtractor = (req: Request): string | null => {
      const token = (req?.cookies as Record<string, string>)?.['rd-acc-tkn'];
      return typeof token === 'string' ? token : null;
    };
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        cookieExtractor,
      ]),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET || 'heatmeup-secret',
    });
  }

  validate(payload: JwtPayload) {
    return { userId: payload.sub, role: payload.role };
  }
}
