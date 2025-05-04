import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1746338391729 implements MigrationInterface {
    name = 'InitialMigration1746338391729'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_socialprovider_enum" AS ENUM('google', 'facebook', 'twitter')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying, "username" character varying, "password" character varying, "isAnonymous" boolean NOT NULL DEFAULT false, "isPremium" boolean NOT NULL DEFAULT false, "socialProvider" "public"."users_socialprovider_enum", "avatarUrl" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_socialprovider_enum"`);
    }

}
