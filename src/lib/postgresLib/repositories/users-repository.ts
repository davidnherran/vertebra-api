import { EntityRepository, Repository } from 'typeorm';
import { Users } from '../entities/users';

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {
  findByUsername(username: string) {
    return this.createQueryBuilder('users')
      .where('users.username = :username', {
        username,
      })
      .getOne();
  }

  findById(id: number) {
    return this.createQueryBuilder('users')
      .where('users.id = :id', { id })
      .getOne();
  }

  updateUsername(id: number, username: string) {
    return this.createQueryBuilder('users')
      .update()
      .set({ username })
      .where('users.id = :id', { id })
      .execute();
  }

  updatePassword(id: number, password: string) {
    return this.createQueryBuilder('users')
      .update()
      .set({ password })
      .where('users.id = :id', { id })
      .execute();
  }
}
