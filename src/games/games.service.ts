// src/games/games.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './entities/game.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createGameDto: CreateGameDto, userId: number): Promise<Game> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const newGame = this.gameRepository.create({
      ...createGameDto,
      createdBy: user,
    });
    return await this.gameRepository.save(newGame);
  }

  async findAll(): Promise<Game[]> {
    return await this.gameRepository.find({ relations: ['createdBy'] });
  }

  async findOne(id: number): Promise<Game> {
    const game = await this.gameRepository.findOne({
      where: { id },
      relations: ['createdBy'],
    });
    if (!game) throw new NotFoundException(`Game with id ${id} not found`);
    return game;
  }

  async update(id: number, updateGameDto: UpdateGameDto): Promise<Game> {
    const game = await this.findOne(id);
    Object.assign(game, updateGameDto);
    return await this.gameRepository.save(game);
  }

  async remove(id: number): Promise<{ id: number }> {
    const result = await this.gameRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`Game with id ${id} not found`);
    }
    return { id };
  }
}