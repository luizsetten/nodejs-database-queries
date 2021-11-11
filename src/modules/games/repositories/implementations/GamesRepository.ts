import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository
      .createQueryBuilder(`games`)
      .where(`games.title LIKE :title`, { title: `%${param}%` })
      .getMany();
    // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    const [{ count }] = await this.repository.query(`SELECT COUNT(*) from games`);

    return [{ count }]; // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const game = await this.repository
      .createQueryBuilder(`games`)
      .leftJoinAndSelect("games.users", "users")
      .where(`games.id = :id`, { id })
      .getOne();


    console.log(game)
    if (game) {
      return game.users
    }

    return [];
    // Complete usando query builder
  }
}
