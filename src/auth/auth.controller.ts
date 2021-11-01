import { Controller, Post, Request, UseGuards } from '@nestjs/common'
import { LocalAuthGuard } from './local-auth.guard'
import { ExpressRequest } from '../types/expressRequest.interface'

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: ExpressRequest) {
    return req.user
  }
}
