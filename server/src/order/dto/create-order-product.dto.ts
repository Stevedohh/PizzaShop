import { IsNotEmpty } from 'class-validator';

export class CreateOrderProductDto {
  @IsNotEmpty()
  readonly quantity: number;

  @IsNotEmpty()
  readonly productId: number;
}
