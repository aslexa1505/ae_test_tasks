import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../users/user.entity';

export class SeedUsers1733297531467 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const users = [];
    for (let i = 0; i < 1000000; i++) {
      const user = {
        name: `Name${i}`,
        surname: `Surname${i}`,
        age: Math.floor(Math.random() * 100),
        gender: Math.random() > 0.5 ? 'Male' : 'Female',
        problems: Math.random() > 0.5,
      };
      users.push(user);

      if (users.length === 1000) {
        await queryRunner.manager
          .createQueryBuilder()
          .insert()
          .into(User)
          .values(users)
          .execute();
        users.length = 0;
      }
    }

    if (users.length) {
      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(users)
        .execute();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "user"`);
  }
}
