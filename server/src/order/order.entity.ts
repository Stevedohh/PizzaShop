import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersEntity } from '../users/users.entity';
import { OrderProductEntity } from './orderProduct.entity';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  totalPrice: number;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column()
  isComplete: boolean;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @ManyToOne(() => UsersEntity, (user) => user.order)
  user: UsersEntity;

  @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.order, {
    cascade: true,
  })
  orderProduct: OrderProductEntity[];
}
