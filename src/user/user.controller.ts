import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { UserEntity } from './user.entity'
import { CreateUserDto } from './dto/createUser.dto'
import { ExpressRequest } from '../types/expressRequest.interface'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { CreateUserResponseType } from './types/createUserResponse.type'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  public getCurrentUser(@Request() req: ExpressRequest): UserEntity {
    return req.user
  }

  @Post('register')
  public async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResponseType> {
    return await this.userService.createUser(createUserDto)
  }
}
