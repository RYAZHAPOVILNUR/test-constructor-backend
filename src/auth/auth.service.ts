import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import { UserEntity } from '../user/user.entity'
import { compare } from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username)
    const isPasswordCorrect = await compare(password, user.password)

    if (user && isPasswordCorrect) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user
      return result
    }
    return null
  }

  public async login({ id, username }: UserEntity) {
    const payload = { id, username, sub: id }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
