import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostRefactoring1643986171662 implements MigrationInterface {
  name = 'PostRefactoring1643986171662';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(300) NOT NULL, "login" character varying(300) NOT NULL, "password" character varying(300) NOT NULL, CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "task_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(300) NOT NULL, "description" character varying(600) NOT NULL, "order" integer NOT NULL, "userId" uuid, "boardId" uuid, "columnId" uuid, CONSTRAINT "PK_0385ca690d1697cdf7ff1ed3c2f" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "columns_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(300) NOT NULL, "order" integer NOT NULL, "boardId" uuid, CONSTRAINT "PK_e0ff6b81c8e01ec249b231b4aba" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "board_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(300) NOT NULL, CONSTRAINT "PK_9a1a7d507e2e23cc5af2a3e5d7a" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "task_entity" ADD CONSTRAINT "FK_2621bebd84d2624da37a34797fc" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "task_entity" ADD CONSTRAINT "FK_ab0e8bfc5d1eec5eab1f616d4e0" FOREIGN KEY ("boardId") REFERENCES "board_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "task_entity" ADD CONSTRAINT "FK_3e374a9be88948b63c7a14accd0" FOREIGN KEY ("columnId") REFERENCES "columns_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "columns_entity" ADD CONSTRAINT "FK_4c27c472538ff9299d4c221902f" FOREIGN KEY ("boardId") REFERENCES "board_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );

    await queryRunner.query(
      `INSERT INTO "user_entity" VALUES ('admin', 'admin', ''e6e8747b61fadb4452d64abcdccbfb68:c4d94a80c046ad73ce66abfc651444ffe36d2505a585a2e03f71ae80d0c5cb1024d8fb3f1d29be4ee4d84c9ce725db94e66ab6bdbead4bb40c54fec5d5d3ab40')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "columns_entity" DROP CONSTRAINT "FK_4c27c472538ff9299d4c221902f"`
    );
    await queryRunner.query(
      `ALTER TABLE "task_entity" DROP CONSTRAINT "FK_3e374a9be88948b63c7a14accd0"`
    );
    await queryRunner.query(
      `ALTER TABLE "task_entity" DROP CONSTRAINT "FK_ab0e8bfc5d1eec5eab1f616d4e0"`
    );
    await queryRunner.query(
      `ALTER TABLE "task_entity" DROP CONSTRAINT "FK_2621bebd84d2624da37a34797fc"`
    );
    await queryRunner.query(`DROP TABLE "board_entity"`);
    await queryRunner.query(`DROP TABLE "columns_entity"`);
    await queryRunner.query(`DROP TABLE "task_entity"`);
    await queryRunner.query(`DROP TABLE "user_entity"`);
  }
}
