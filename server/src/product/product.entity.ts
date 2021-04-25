import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderProductEntity } from '../order/orderProduct.entity';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  rating: number;

  @Column()
  category: string;

  @Column()
  type: string;

  @Column()
  size: number;

  @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.product, {
    cascade: true,
  })
  orderProduct: OrderProductEntity[];
}
