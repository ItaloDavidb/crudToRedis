import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express'
import { UserPayload } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService
  ) { }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = this.extractToken(req);
    if (!token) {
      throw new UnauthorizedException('Invalid Token')
    }
    try {
      const payload: UserPayload = await this.jwtService.verifyAsync(token)
      req.user = payload
    } catch (error) {
      throw new UnauthorizedException(error)
    }
    return true;
  }
  private extractToken(req: Request): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
