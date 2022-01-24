import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity({ name: 'users' })
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  password?: string;

  @Column({ name: 'displayname' })
  displayName!: string;

  findByUsername(username: string) {
    return Users.createQueryBuilder('users')
      .where('users.username = :username', {
        username,
      })
      .getOne();
  }

  findById(id: number) {
    return Users.createQueryBuilder('users')
      .where('users.id = :id', { id })
      .getOne();
  }

  updateUsername(id: number, username: string) {
    return Users.createQueryBuilder('users')
      .update()
      .set({ username })
      .where('users.id = :id', { id })
      .execute();
  }

  updatePassword(id: number, password: string) {
    return Users.createQueryBuilder('users')
      .update()
      .set({ password })
      .where('users.id = :id', { id })
      .execute();
  }
}
