import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  name: string;

  @Column()
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the user',
  })
  email: string;

  @Column()
  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  password: string;
}
