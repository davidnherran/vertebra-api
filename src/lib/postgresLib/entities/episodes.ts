import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity({ name: 'episodes' })
export class Episodes extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false, default: '' })
  name!: string;

  @Column({ nullable: false, default: '' })
  air_date!: string;

  @Column({ nullable: false, default: '' })
  episode!: string;

  @Column({ type: 'simple-array', nullable: false, default: [''] })
  characters!: string[];

  @Column({ nullable: false, default: '' })
  url!: string;

  @Column({ nullable: false, default: '' })
  created!: string;

  findAll(limit: Array<number>) {
    return Episodes.createQueryBuilder('episodes')
      .offset(limit[0])
      .take(limit[1])
      .getMany();
  }

  findById(id: number) {
    return Episodes.createQueryBuilder('episodes')
      .where('episodes.id = :id', { id })
      .getOne();
  }

  update(id: number, data: object) {
    return Episodes.createQueryBuilder('episodes')
      .update()
      .set(data)
      .where('episodes.id = :id', { id })
      .execute();
  }

  delete(id: number) {
    return Episodes.createQueryBuilder('episodes')
      .delete()
      .where('episodes.id = :id', { id })
      .execute();
  }

}
