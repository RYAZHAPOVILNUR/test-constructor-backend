import { Injectable } from '@nestjs/common'

@Injectable()
export class UserService {
  public createUser(): string {
    return 'user created'
  }
}
