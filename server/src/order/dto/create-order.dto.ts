import { IsNotEmpty } from 'class-validator';
import { CreateOrderProductDto } from './create-order-product.dto';

export class CreateOrderDto {
  @IsNotEmpty()
  readonly address: string;

  @IsNotEmpty()
  readonly phone: string;

  @IsNotEmpty()
  readonly email: string;

  readonly userId: number;

  @IsNotEmpty()
  readonly orderProduct: CreateOrderProductDto[];
}
