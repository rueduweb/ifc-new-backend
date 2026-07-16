import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from './../database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PlayersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createPlayerDto: Prisma.PlayerCreateInput) {
    return await this.databaseService.player.create({
      data: createPlayerDto,
    });
  }

  async findAll() {
    return await this.databaseService.player.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const player = await this.databaseService.player.findUnique({ where: { id } });
    if (!player) {
      throw new NotFoundException('Player not found.');
    }
    return player;
  }

  async update(id: number, updatePlayerDto: Prisma.PlayerUpdateInput) {
    const player = await this.databaseService.player.findUnique({ where: { id } });
    if (!player) {
      throw new NotFoundException('Player not found.');
    }
    return this.databaseService.player.update({
      where: {
        id,
      },
      data: updatePlayerDto,
    });
  }

  async remove(id: number) {
    const player = await this.databaseService.player.findUnique({
      where: { id },
    });
    if (!player) {
      throw new NotFoundException('Player not found.');
    }
    return await this.databaseService.player.delete({
      where: { id },
    });
  }
}
