import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1746394704496 implements MigrationInterface {
    name = 'InitialMigration1746394704496'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_profiles_bodyhair_enum" AS ENUM('hairy', 'trimmed', 'smooth', 'waxed', 'shaved', 'partially hairy')`);
        await queryRunner.query(`CREATE TYPE "public"."user_profiles_skincolor_enum" AS ENUM('type_1', 'type_2', 'type_3', 'type_4', 'type_5', 'type_6', 'mixed', 'other')`);
        await queryRunner.query(`CREATE TYPE "public"."user_profiles_haircolor_enum" AS ENUM('blonde', 'brunette', 'light brown', 'dark brown', 'black', 'red', 'auburn', 'gray', 'white', 'bald', 'dyed', 'other')`);
        await queryRunner.query(`CREATE TYPE "public"."user_profiles_eyecolor_enum" AS ENUM('honey', 'light brown', 'dark brown', 'light blue', 'dark blue', 'light green', 'dark green', 'black', 'gray', 'hazel', 'amber', 'heterochromia', 'other')`);
        await queryRunner.query(`CREATE TYPE "public"."user_profiles_preferredposition_enum" AS ENUM('top', 'bottom', 'versatile', 'versatile + top', 'versatile + bottom', 'no penetration')`);
        await queryRunner.query(`CREATE TYPE "public"."user_profiles_tribe_enum" AS ENUM('twink', 'bear', 'chubby', 'cahser', 'daddy', 'jock', 'drag', 'otter', 'geek', 'leather', 'cub', 'chub', 'twunk', 'wolf', 'butch', 'femme', 'androgynous', 'trans', 'queer', 'non binary', 'genderfluid', 'other')`);
        await queryRunner.query(`CREATE TYPE "public"."user_profiles_relationshipstatus_enum" AS ENUM('single', 'married', 'open_relationship', 'widowed', 'divorced', 'separated', 'complicated', 'polyamorous')`);
        await queryRunner.query(`CREATE TABLE "user_profiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "displayName" character varying, "gender" character varying, "country" character varying, "city" character varying, "bio" text, "tags" text array NOT NULL DEFAULT '{}', "age" integer, "height" integer, "weight" integer, "bodyHair" "public"."user_profiles_bodyhair_enum", "skinColor" "public"."user_profiles_skincolor_enum", "hairColor" "public"."user_profiles_haircolor_enum", "eyeColor" "public"."user_profiles_eyecolor_enum", "preferredPosition" "public"."user_profiles_preferredposition_enum", "tribe" "public"."user_profiles_tribe_enum" array, "relationshipStatus" "public"."user_profiles_relationshipstatus_enum", "user_id" uuid, CONSTRAINT "REL_6ca9503d77ae39b4b5a6cc3ba8" UNIQUE ("user_id"), CONSTRAINT "PK_1ec6662219f4605723f1e41b6cb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_profiles" ADD CONSTRAINT "FK_6ca9503d77ae39b4b5a6cc3ba88" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_profiles" DROP CONSTRAINT "FK_6ca9503d77ae39b4b5a6cc3ba88"`);
        await queryRunner.query(`DROP TABLE "user_profiles"`);
        await queryRunner.query(`DROP TYPE "public"."user_profiles_relationshipstatus_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_profiles_tribe_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_profiles_preferredposition_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_profiles_eyecolor_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_profiles_haircolor_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_profiles_skincolor_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_profiles_bodyhair_enum"`);
    }

}
