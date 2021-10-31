import { Body, Controller, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { UserEntity } from './user.entity'
import { CreateUserDto } from './dto/createUser.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  public async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserEntity> {
    return await this.userService.createUser(createUserDto)
  }
}
