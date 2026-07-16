import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PartnersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createPartnerDto: Prisma.PartnerCreateInput) {
    console.log('Partner Prisma Input : ', createPartnerDto);
    return await this.databaseService.partner.create({
      data: createPartnerDto,
    });
  }

  async findAll() {
    return await this.databaseService.partner.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const partner = await this.databaseService.partner.findUnique({ where: { id } });
    if (!partner) {
      throw new NotFoundException('Partner not found.');
    }
    return partner;
  }

  async update(id: number, updatePartnerDto: Prisma.PartnerUpdateInput) {
    console.log('Partner Prisma Input : ', updatePartnerDto);
    const partner = await this.databaseService.partner.findUnique({ where: { id } });
    if (!partner) {
      throw new NotFoundException('Partner not found.');
    }
    return this.databaseService.partner.update({
      where: {
        id,
      },
      data: updatePartnerDto,
    });
  }

  async remove(id: number) {
    const partner = await this.databaseService.partner.findUnique({
      where: { id },
    });
    if (!partner) {
      throw new NotFoundException('Partner not found.');
    }
    return await this.databaseService.partner.delete({
      where: { id },
    });
  }
}
