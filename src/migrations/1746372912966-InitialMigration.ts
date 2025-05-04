import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1746372912966 implements MigrationInterface {
    name = 'InitialMigration1746372912966'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."users_socialprovider_enum" RENAME TO "users_socialprovider_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."users_socialprovider_enum" AS ENUM('google', 'facebook', 'twitter', 'none')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "socialProvider" TYPE "public"."users_socialprovider_enum" USING "socialProvider"::"text"::"public"."users_socialprovider_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_socialprovider_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_socialprovider_enum_old" AS ENUM('google', 'facebook', 'twitter')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "socialProvider" TYPE "public"."users_socialprovider_enum_old" USING "socialProvider"::"text"::"public"."users_socialprovider_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."users_socialprovider_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."users_socialprovider_enum_old" RENAME TO "users_socialprovider_enum"`);
    }

}
