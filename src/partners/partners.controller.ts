import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { PartnersService } from './partners.service';
import { Prisma } from '@prisma/client';

@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createPartnerDto: Prisma.PartnerCreateInput) {
    return this.partnersService.create(createPartnerDto);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.partnersService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.partnersService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(200)
  update(
    @Param('id') id: string,
    @Body() updatePartnerDto: Prisma.PartnerUpdateInput,
  ) {
    return this.partnersService.update(+id, updatePartnerDto);
  }

  @Delete(':id')
  @HttpCode(200)
  remove(@Param('id') id: string) {
    return this.partnersService.remove(+id);
  }
}
