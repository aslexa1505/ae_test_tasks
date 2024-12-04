import { Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('reset-problems')
  async resetProblems() {
    const count = await this.usersService.resetProblemsFlag();
    return { updated: true, previousTrueCount: count };
  }
}
