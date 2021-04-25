import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { Role } from '../auth/role.decorator';
import { Roles } from '../auth/role.types';
import { RoleGuard } from '../auth/role.guard';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  getAll() {
    return this.productService.getAll();
  }

  @Get('categories')
  getAllCategories() {
    return this.productService.getAllCategories();
  }

  @Post('categories')
  getByCategory(@Body() body) {
    return this.productService.getByCategory(body.category);
  }

  @Get(':id')
  getById(@Param('id') id): Promise<ProductEntity> {
    return this.productService.getById(id);
  }

  @Role(Roles.ADMIN)
  @UseGuards(RoleGuard)
  @Post()
  create(@Body() productDto: CreateProductDto) {
    return this.productService.create(productDto);
  }

  @Role(Roles.ADMIN)
  @UseGuards(RoleGuard)
  @Put(':id')
  update(@Param('id') id, @Body() productDto: CreateProductDto) {
    return this.productService.update(id, productDto);
  }

  @Role(Roles.ADMIN)
  @UseGuards(RoleGuard)
  @Delete(':id')
  delete(@Param('id') id) {
    return this.productService.delete(id);
  }
}
