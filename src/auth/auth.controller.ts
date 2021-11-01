import { Controller, Post, Request, UseGuards } from '@nestjs/common'
import { LocalAuthGuard } from './local-auth.guard'
import { ExpressRequest } from '../types/expressRequest.interface'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: ExpressRequest) {
    return this.authService.login(req.user)
  }
}
