import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put,
} from '@nestjs/common';
import { CanchasService } from './canchas.service';
import { CreateCanchaDto } from './dto/create-cancha.dto';
import { UpdateCanchaDto } from './dto/update-cancha.dto';

@Controller('canchas')
export class CanchasController {
  constructor(private readonly canchasService: CanchasService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateCanchaDto) {
    return this.canchasService.create(dto);
  }

  @Get()
  findAll() {
    return this.canchasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.canchasService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCanchaDto) {
    return this.canchasService.update(id, dto);
  }

  @Patch(':id')
  partialUpdate(@Param('id') id: string, @Body() dto: UpdateCanchaDto) {
    return this.canchasService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.canchasService.remove(id);
  }
}