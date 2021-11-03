import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './user.entity'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/createUser.dto'
import { CreateUserResponseType } from './types/createUserResponse.type'

const getUserExistResponse = (property: string) =>
  `Пользователь с таким ${property} уже существует`

const ExceptionResponses = {
  emailExist: getUserExistResponse('email'),
  usernameExist: getUserExistResponse('именем'),
}

const throwUnprocessableEntityException = (response: string) => {
  throw new HttpException(response, HttpStatus.UNPROCESSABLE_ENTITY)
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async createUser(
    createUserDto: CreateUserDto,
  ): Promise<CreateUserResponseType> {
    await this.throwExceptionIfUserExists(createUserDto)

    const newUser = new UserEntity()
    Object.assign(newUser, createUserDto)
    const createdUser = await this.userRepository.save(newUser)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...createdUserWithoutPassword } = createdUser
    return createdUserWithoutPassword
  }

  public async findOne(username: string): Promise<UserEntity> {
    return this.userRepository.findOne(
      { username },
      { select: ['id', 'username', 'email', 'password'] },
    )
  }

  private async throwExceptionIfUserExists(createUserDto: CreateUserDto) {
    const { email, username } = createUserDto

    const userByEmail = await this.userRepository.findOne({ email })

    if (userByEmail) {
      throwUnprocessableEntityException(ExceptionResponses.emailExist)
    }

    const userByUsername = await this.userRepository.findOne({ username })

    if (userByUsername) {
      throwUnprocessableEntityException(ExceptionResponses.usernameExist)
    }
  }
}
