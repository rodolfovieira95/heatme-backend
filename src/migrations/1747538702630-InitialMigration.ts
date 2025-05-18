import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1747538702630 implements MigrationInterface {
    name = 'InitialMigration1747538702630'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_profiles" DROP CONSTRAINT "FK_6ca9503d77ae39b4b5a6cc3ba88"`);
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP CONSTRAINT "FK_9ee145fd616227448de53646872"`);
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP CONSTRAINT "FK_fbfdf0b8ee76855843441cc7551"`);
        await queryRunner.query(`ALTER TABLE "user_profiles" DROP CONSTRAINT "REL_6ca9503d77ae39b4b5a6cc3ba8"`);
        await queryRunner.query(`ALTER TABLE "user_profiles" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatarUrl"`);
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP COLUMN "timestamp"`);
        await queryRunner.query(`ALTER TABLE "user_profiles" ADD "avatarUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "user_profiles" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "user_profiles" ADD CONSTRAINT "UQ_8481388d6325e752cd4d7e26c6d" UNIQUE ("userId")`);
        await queryRunner.query(`CREATE TYPE "public"."chat_messages_type_enum" AS ENUM('text', 'image', 'file', 'temporary')`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD "type" "public"."chat_messages_type_enum" NOT NULL DEFAULT 'text'`);
        await queryRunner.query(`CREATE TYPE "public"."chat_messages_status_enum" AS ENUM('sent', 'delivered', 'read')`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD "status" "public"."chat_messages_status_enum" NOT NULL DEFAULT 'sent'`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD "fileUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD "fileName" character varying`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD "fileSize" integer`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD "fileType" character varying`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD "expiresAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD "content" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_profiles" ADD CONSTRAINT "FK_8481388d6325e752cd4d7e26c6d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD CONSTRAINT "FK_9ee145fd616227448de53646872" FOREIGN KEY ("fromUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD CONSTRAINT "FK_fbfdf0b8ee76855843441cc7551" FOREIGN KEY ("toUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP CONSTRAINT "FK_fbfdf0b8ee76855843441cc7551"`);
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP CONSTRAINT "FK_9ee145fd616227448de53646872"`);
        await queryRunner.query(`ALTER TABLE "user_profiles" DROP CONSTRAINT "FK_8481388d6325e752cd4d7e26c6d"`);
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD "content" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP COLUMN "expiresAt"`);
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP COLUMN "fileType"`);
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP COLUMN "fileSize"`);
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP COLUMN "fileName"`);
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP COLUMN "fileUrl"`);
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."chat_messages_status_enum"`);
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."chat_messages_type_enum"`);
        await queryRunner.query(`ALTER TABLE "user_profiles" DROP CONSTRAINT "UQ_8481388d6325e752cd4d7e26c6d"`);
        await queryRunner.query(`ALTER TABLE "user_profiles" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "user_profiles" DROP COLUMN "avatarUrl"`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD "timestamp" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "avatarUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "user_profiles" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "user_profiles" ADD CONSTRAINT "REL_6ca9503d77ae39b4b5a6cc3ba8" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD CONSTRAINT "FK_fbfdf0b8ee76855843441cc7551" FOREIGN KEY ("toUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD CONSTRAINT "FK_9ee145fd616227448de53646872" FOREIGN KEY ("fromUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_profiles" ADD CONSTRAINT "FK_6ca9503d77ae39b4b5a6cc3ba88" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
