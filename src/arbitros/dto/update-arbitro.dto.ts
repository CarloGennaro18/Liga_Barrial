import { PartialType } from '@nestjs/mapped-types';
import { CreateArbitroDto } from './create-arbitro.dto';

export class UpdateArbitroDto extends PartialType(CreateArbitroDto) {}