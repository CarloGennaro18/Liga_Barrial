import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CampeonatosService } from './campeonatos.service';
import { CreateCampeonatoDto } from './dto/create-campeonato.dto';
import { UpdateCampeonatoDto } from './dto/update-campeonato.dto';

@Controller('campeonatos')
export class CampeonatosController {
  constructor(private readonly campeonatosService: CampeonatosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) // 201
  create(@Body() dto: CreateCampeonatoDto) {
    return this.campeonatosService.create(dto);
  }

  @Get()
  findAll() {
    return this.campeonatosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.campeonatosService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCampeonatoDto) {
    return this.campeonatosService.update(id, dto);
  }

  @Patch(':id')
  partialUpdate(@Param('id') id: string, @Body() dto: UpdateCampeonatoDto) {
    return this.campeonatosService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // 204
  remove(@Param('id') id: string) {
    this.campeonatosService.remove(id);
  }
}