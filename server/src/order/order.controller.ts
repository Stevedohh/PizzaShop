import {
  Body,
  Controller,
  Post,
  Headers,
  Get,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Role } from '../auth/role.decorator';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.types';

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

  @Role(Roles.ADMIN)
  @UseGuards(RoleGuard)
  @Get()
  getAll() {
    return this.orderService.getAll();
  }

  @Role(Roles.USER)
  @UseGuards(RoleGuard)
  @Get('user')
  getByUser(@Headers('authorization') authorization) {
    return this.orderService.getByUser(authorization);
  }
}
