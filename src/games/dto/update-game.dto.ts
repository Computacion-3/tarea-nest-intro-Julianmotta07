import { PartialType } from '@nestjs/mapped-types';
import { CreateGameDto } from './create-game.dto';

/**
 * DTO para la actualización de juegos.
 */
export class UpdateGameDto extends PartialType(CreateGameDto) {}