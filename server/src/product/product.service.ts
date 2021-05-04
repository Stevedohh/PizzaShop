import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import arrayContaining = jasmine.arrayContaining;

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async getById(id) {
    return await this.productRepository.findOne(id);
  }

  async getAll() {
    return await this.productRepository.find();
  }

  async getAllCategories() {
    const categories = await this.productRepository.find({
      select: ['category'],
    });
    const arrayOfCategories = categories.map(({ category }) => category);

    return [...new Set(arrayOfCategories)];
  }

  async getByCategory(category) {
    return await this.productRepository.find({ category });
  }

  async create(productDto: CreateProductDto) {
    return this.productRepository.save(
      this.productRepository.create({
        ...productDto,
      }),
    );
  }

  async update(id, productDto: CreateProductDto) {
    return this.productRepository.update({ id }, { ...productDto });
  }

  async delete(id) {
    return await this.productRepository.delete({ id });
  }
}
