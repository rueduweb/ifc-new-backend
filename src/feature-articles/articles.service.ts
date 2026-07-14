import { Injectable } from '@nestjs/common';
import { Article } from './entities/article.entity';
import { DatabaseService } from 'src/database/database.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    return await this.databaseService.article.create({
      data: createArticleDto,
    });
  }

  async findAll(): Promise<Article[]> {
    return await this.databaseService.article.findMany();
  }

  async findOne(id: number): Promise<Article | null> {
    return await this.databaseService.article.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    return await this.databaseService.article.update({
      where: {
        id,
      },
      data: updateArticleDto,
    });
  }

  async remove(id: number): Promise<Article> {
    return await this.databaseService.article.delete({
      where: {
        id,
      },
    });
  }
}
