import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('login')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @ApiOperation({ summary: 'Auth route' })
  @ApiResponse({ status: 200, description: 'Login Ok', type: AuthDto })
  login(@Body() { email, password }: AuthDto) {
    return this.authService.login(email, password);
  }
}
