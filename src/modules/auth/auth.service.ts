import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AppService } from 'src/services/app.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private appService: AppService,
    private jwtService: JwtService
  ) { }
  async login(email: string, password: string) {
    const user = await this.appService.findByEmail(email)
    const authUser = await bcrypt.compare(
      password,
      user.password
    )
    if (!authUser) {
      throw new UnauthorizedException("Email or Password not correct")
    }
    const payload = {
      sub: user.id,
      username: user.name
    }
    return {
      acess_token: await this.jwtService.signAsync(payload),
      
    }
  }
}
