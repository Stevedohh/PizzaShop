import { Body, Controller, Post, Headers } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  create(
    @Body() orderDto: CreateOrderDto,
    @Headers('authorization') authorization,
  ) {
    return this.orderService.create(orderDto, authorization);
  }
}
