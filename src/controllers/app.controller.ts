import { Controller, Get, Post, Delete, Param, Body, UseInterceptors, UseGuards } from '@nestjs/common';
import { User } from '../entities/User-entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AppService } from 'src/services/app.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { HashTransform } from 'src/utils/hash';
import { AuthGuard } from 'src/modules/auth/auth.guard';

@ApiTags('users')
@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({ status: 200, description: 'List of users', type: [User] })
  findAll(): Promise<User[]> {
    return this.appService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Retrieve a user by ID' })
  @ApiResponse({ status: 200, description: 'The user', type: User })
  findOne(@Param('id') id: string): Promise<User> {
    console.log("Log")
    return this.appService.findOne(id);
  }

  @Post()
  // @UseGuards(AuthGuard)
  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'The created user', type: User })
  create(
    @Body() { password, ...user }: User,
    @Body('password', HashTransform) hashedPassword: string
  ): Promise<Omit<User, 'password'>> {
    return this.appService.create({ ...user, password: hashedPassword });
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({ status: 204, description: 'User deleted' })
  remove(@Param('id') id: string): Promise<void> {
    return this.appService.remove(id);
  }
}
