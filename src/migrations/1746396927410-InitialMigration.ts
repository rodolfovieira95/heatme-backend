import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1746396927410 implements MigrationInterface {
    name = 'InitialMigration1746396927410'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."friendships_status_enum" AS ENUM('pending', 'accepted', 'rejected', 'blocked')`);
        await queryRunner.query(`CREATE TABLE "friendships" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."friendships_status_enum" NOT NULL DEFAULT 'pending', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "requesterId" uuid, "receiverId" uuid, CONSTRAINT "UQ_1c2f43ed0fcae354c318fd2ba72" UNIQUE ("requesterId", "receiverId"), CONSTRAINT "PK_08af97d0be72942681757f07bc8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "friendships" ADD CONSTRAINT "FK_4f47ed519abe1ced044af260420" FOREIGN KEY ("requesterId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friendships" ADD CONSTRAINT "FK_76977c4ed1415e3b1cdf7848a8c" FOREIGN KEY ("receiverId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "friendships" DROP CONSTRAINT "FK_76977c4ed1415e3b1cdf7848a8c"`);
        await queryRunner.query(`ALTER TABLE "friendships" DROP CONSTRAINT "FK_4f47ed519abe1ced044af260420"`);
        await queryRunner.query(`DROP TABLE "friendships"`);
        await queryRunner.query(`DROP TYPE "public"."friendships_status_enum"`);
    }

}
