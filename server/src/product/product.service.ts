import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import {log} from "util";

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
    return await this.productRepository.find({ select: ['category'] });
  }

  async getByCategory(category) {
    // if (!category) {
    //   return this.getAll();
    // }
    return await this.productRepository.find({ category });
  }

  async create(productDto: CreateProductDto) {
    return this.productRepository.save(
      this.productRepository.create({
        ...productDto,
      }),
    );
  }

  async update(id, product) {
    return this.productRepository.update({ id }, { ...product });
  }

  async delete(id) {
    return await this.productRepository.delete({ id });
  }
}
