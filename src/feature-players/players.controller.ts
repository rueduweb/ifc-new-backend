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
import { PlayersService } from './players.service';
import { Prisma } from '@prisma/client';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createPlayerDto: Prisma.PlayerCreateInput) {
    return this.playersService.create(createPlayerDto);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.playersService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.playersService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(200)
  update(
    @Param('id') id: string,
    @Body() updatePlayerDto: Prisma.PlayerUpdateInput,
  ) {
    return this.playersService.update(+id, updatePlayerDto);
  }

  @Delete(':id')
  @HttpCode(200)
  remove(@Param('id') id: string) {
    return this.playersService.remove(+id);
  }
}
