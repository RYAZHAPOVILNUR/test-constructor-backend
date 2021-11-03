import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { TypeOrmCoreModule } from '@nestjs/typeorm/dist/typeorm-core.module'
import { AuthModule } from './auth/auth.module'
import ormconfig from './ormconfig'

@Module({
  imports: [UserModule, TypeOrmCoreModule.forRoot(ormconfig), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
