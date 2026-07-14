import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ArticlesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createArticleDto: Prisma.ArticleCreateInput) {
    return await this.databaseService.article.create({
      data: createArticleDto,
    });
  }

  async findAll() {
    return await this.databaseService.article.findMany();
  }

  async findOne(id: number) {
    return await this.databaseService.article.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateArticleDto: Prisma.ArticleUpdateInput) {
    return await this.databaseService.article.update({
      where: {
        id,
      },
      data: updateArticleDto,
    });
  }

  async remove(id: number) {
    return await this.databaseService.article.delete({
      where: {
        id,
      },
    });
  }
}
