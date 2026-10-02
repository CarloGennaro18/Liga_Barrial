import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put,
} from '@nestjs/common';
import { ArbitrosService } from './arbitros.service';
import { CreateArbitroDto } from './dto/create-arbitro.dto';
import { UpdateArbitroDto } from './dto/update-arbitro.dto';

@Controller('arbitros')
export class ArbitrosController {
  constructor(private readonly arbitrosService: ArbitrosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateArbitroDto) {
    return this.arbitrosService.create(dto);
  }

  @Get()
  findAll() {
    return this.arbitrosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.arbitrosService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateArbitroDto) {
    return this.arbitrosService.update(id, dto);
  }

  @Patch(':id')
  partialUpdate(@Param('id') id: string, @Body() dto: UpdateArbitroDto) {
    return this.arbitrosService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.arbitrosService.remove(id);
  }
}