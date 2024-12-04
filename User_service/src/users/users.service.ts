import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async resetProblemsFlag(): Promise<number> {
    return await this.userRepository.manager.transaction(async (manager) => {
      const count = await manager.count(User, { where: { problems: true } });

      await manager
        .createQueryBuilder()
        .update(User)
        .set({ problems: false })
        .execute();

      return count;
    });
  }
}
