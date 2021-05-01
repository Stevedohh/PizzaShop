import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './order.entity';
import { OrderProductEntity } from './orderProduct.entity';
import { ProductService } from '../product/product.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    private productService: ProductService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async create(orderDto: CreateOrderDto, authorization) {
    const token = authorization.split(' ')[1];

    const order = new OrderEntity();
    order.address = orderDto.address;
    order.email = orderDto.email;
    order.phone = orderDto.phone;
    order.orderProduct = [];
    order.totalPrice = 0;

    if (token) {
      order.user = await this.usersService.getById(
        this.jwtService.decode(token)['id'],
      );
    }

    for (const orderProduct of orderDto.orderProduct) {
      const orderProductEntity = new OrderProductEntity();
      orderProductEntity.quantity = orderProduct.quantity;
      orderProductEntity.product = await this.productService.getById(
        orderProduct.productId,
      );
      order.totalPrice +=
        orderProductEntity.product.price * orderProductEntity.quantity;
      order.orderProduct.push(orderProductEntity);
    }

    return this.orderRepository.save(this.orderRepository.create(order));
  }

  async getAll() {
    return await this.orderRepository.find({
      relations: ['orderProduct', 'user', 'orderProduct.product'],
    });
  }

  async getByUser(authorization) {
    const token = authorization.split(' ')[1];

    return await this.orderRepository.find({
      relations: ['orderProduct', 'user', 'orderProduct.product'],
      where: {
        user: {
          id: this.jwtService.decode(token)['id'],
        },
      },
    });
  }
}
