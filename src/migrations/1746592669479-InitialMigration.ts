import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1746592669479 implements MigrationInterface {
    name = 'InitialMigration1746592669479'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "chat_messages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), "fromUserId" uuid, "toUserId" uuid, CONSTRAINT "PK_40c55ee0e571e268b0d3cd37d10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD CONSTRAINT "FK_9ee145fd616227448de53646872" FOREIGN KEY ("fromUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD CONSTRAINT "FK_fbfdf0b8ee76855843441cc7551" FOREIGN KEY ("toUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP CONSTRAINT "FK_fbfdf0b8ee76855843441cc7551"`);
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP CONSTRAINT "FK_9ee145fd616227448de53646872"`);
        await queryRunner.query(`DROP TABLE "chat_messages"`);
    }

}
