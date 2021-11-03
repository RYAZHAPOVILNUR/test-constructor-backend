import { UserType } from './user.type'

export type CreateUserResponseType = Omit<UserType, 'password'>
