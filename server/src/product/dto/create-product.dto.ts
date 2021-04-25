import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  readonly imageUrl: string;

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly price: number;

  @IsNotEmpty()
  readonly rating: number;

  @IsNotEmpty()
  readonly category: string;

  @IsNotEmpty()
  readonly type: string;

  @IsNotEmpty()
  readonly size: number;
}
