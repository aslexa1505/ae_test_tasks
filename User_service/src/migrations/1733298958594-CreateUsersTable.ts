import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1733298958594 implements MigrationInterface {
  name = 'CreateUsersTable1733298958594';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "surname" character varying NOT NULL, "age" integer NOT NULL, "gender" character varying NOT NULL, "problems" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ecefd94c5cc80005be5a2b3359" ON "user" ("problems") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ecefd94c5cc80005be5a2b3359"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
