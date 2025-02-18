import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AppModule } from 'src/app.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    forwardRef(() => AppModule),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: "32h"
      }
    }
    )
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
