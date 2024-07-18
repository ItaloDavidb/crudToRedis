import { Controller, Get, Post, Delete, Param, Body, UseInterceptors } from '@nestjs/common';
import { User } from '../entities/User-entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from 'src/services/app.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { HashTransform } from 'src/utils/hash';

@ApiTags('users')
@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({ status: 200, description: 'List of users', type: [User] })
  findAll(): Promise<User[]> {
    return this.appService.findAll();
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Retrieve a user by ID' })
  @ApiResponse({ status: 200, description: 'The user', type: User })
  findOne(@Param('id') id: string): Promise<User> {
    console.log("Log")
    return this.appService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'The created user', type: User })
  create(
    @Body() { password, ...user }: User,
    @Body('password', HashTransform) hashedPassword: string
  ): Promise<Omit<User, 'password'>> {
    return this.appService.create({ ...user, password: hashedPassword });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({ status: 204, description: 'User deleted' })
  remove(@Param('id') id: number): Promise<void> {
    return this.appService.remove(id);
  }
}
