import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity({ name: 'locations' })
export class Locations extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false, default: '' })
  name!: string;

  @Column({ nullable: false, default: '' })
  type!: string;

  @Column({ nullable: false, default: '' })
  dimension!: string;

  @Column({ type: 'simple-array', nullable: false, default: [''] })
  residents!: string[];

  @Column({ nullable: false, default: '' })
  url!: string;

  @Column({ nullable: false, default: '' })
  created!: string;

  findAll(limit: Array<number>) {
    return Locations.createQueryBuilder('locations')
      .offset(limit[0])
      .take(limit[1])
      .getMany();
  }

  findById(id: number) {
    return Locations.createQueryBuilder('locations')
      .where('locations.id = :id', { id })
      .getOne();
  }

  async update(id: number, data: object) {
    const updated = await Locations.createQueryBuilder('locations')
      .update()
      .set({ ...data })
      .where('locations.id = :id', { id })
      .execute();
    return updated.affected
  }

  delete(id: number) {
    return Locations.createQueryBuilder('locations')
      .delete()
      .where('locations.id = :id', { id })
      .execute();
  }

  async create(data: LocationsCreate) {
    const created = await Locations.createQueryBuilder('locations')
      .insert()
      .into(Locations)
      .values({ ...data })
      .execute();
    return created.raw[0];
  }
}
