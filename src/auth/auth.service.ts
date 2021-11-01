import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username)
    if (user && user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user
      return result
    }
    return null
  }
}
