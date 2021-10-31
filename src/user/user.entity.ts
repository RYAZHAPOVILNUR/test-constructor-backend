import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @Column()
  name: string

  @Column({ select: false })
  password: string

  // @BeforeInsert()
  // async hashPassword() {
  //   this.password = await hash(this.password, 10);
  // }
}
