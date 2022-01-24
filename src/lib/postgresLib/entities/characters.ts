import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity({ name: 'characters' })
export class Characters extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false, default: '' })
  name!: string;

  @Column({ nullable: false, default: '' })
  status!: string;

  @Column({ nullable: false, default: '' })
  species!: string;

  @Column({ nullable: false, default: '' })
  type!: string;

  @Column({ nullable: false, default: '' })
  gender!: string;

  @Column({
    type: 'simple-json',
    nullable: false,
    default: { name: '', url: '' },
  })
  origin!: {
    name: string;
    url: string;
  };

  @Column({
    type: 'simple-json',
    nullable: false,
    default: { name: '', url: '' },
  })
  location!: {
    name: string;
    url: string;
  };

  @Column({ nullable: false, default: '' })
  image!: string;

  @Column({ type: 'simple-array', nullable: false, default: [''] })
  episode!: string[];

  @Column({ nullable: false, default: '' })
  url!: string;

  @Column({ nullable: false, default: '' })
  created!: string;

  findAll(limit: Array<number>) {
    return Characters.createQueryBuilder('characters')
      .offset(limit[0])
      .take(limit[1])
      .getMany();
  }

  findById(id: number) {
    return Characters.createQueryBuilder('characters')
      .where('characters.id = :id', { id })
      .getOne();
  }

  update(id: number, data: object) {
    return Characters.createQueryBuilder('characters')
      .update()
      .set({ ...data })
      .where('characters.id = :id', { id })
      .execute();
  }

  delete(id: number) {
    return Characters.createQueryBuilder('characters')
      .delete()
      .where('characters.id = :id', { id })
      .execute();
  }

  async create(data: CharactersCreate) {
    const created = await Characters.createQueryBuilder('characters')
      .insert()
      .into(Characters)
      .values({
        ...data,
      })
      .execute();
    return created.raw[0];
  }
}
