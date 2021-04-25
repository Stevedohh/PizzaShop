import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from '../order/order.entity';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column({ default: 'USER' })
  role: string;

  @OneToMany(() => OrderEntity, (order) => order.user, { cascade: true })
  order: OrderEntity[];
}
