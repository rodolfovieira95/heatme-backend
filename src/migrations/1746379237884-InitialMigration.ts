import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1746379237884 implements MigrationInterface {
    name = 'InitialMigration1746379237884'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "age" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "height" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "weight" integer`);
        await queryRunner.query(`CREATE TYPE "public"."users_bodyhair_enum" AS ENUM('hairy', 'trimmed', 'smooth', 'waxed', 'shaved', 'partially hairy')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "bodyHair" "public"."users_bodyhair_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."users_skincolor_enum" AS ENUM('type_1', 'type_2', 'type_3', 'type_4', 'type_5', 'type_6', 'mixed', 'other')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "skinColor" "public"."users_skincolor_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."users_haircolor_enum" AS ENUM('blonde', 'brunette', 'light brown', 'dark brown', 'black', 'red', 'auburn', 'gray', 'white', 'bald', 'dyed', 'other')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "hairColor" "public"."users_haircolor_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."users_eyecolor_enum" AS ENUM('honey', 'light brown', 'dark brown', 'light blue', 'dark blue', 'light green', 'dark green', 'black', 'gray', 'hazel', 'amber', 'heterochromia', 'other')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "eyeColor" "public"."users_eyecolor_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."users_preferredposition_enum" AS ENUM('top', 'bottom', 'versatile', 'versatile + top', 'versatile + bottom', 'no penetration')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "preferredPosition" "public"."users_preferredposition_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."users_tribe_enum" AS ENUM('twink', 'bear', 'chubby', 'cahser', 'daddy', 'jock', 'drag', 'otter', 'geek', 'leather', 'cub', 'chub', 'twunk', 'wolf', 'butch', 'femme', 'androgynous', 'trans', 'queer', 'non binary', 'genderfluid', 'other')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "tribe" "public"."users_tribe_enum" array`);
        await queryRunner.query(`CREATE TYPE "public"."users_relationshipstatus_enum" AS ENUM('single', 'married', 'open_relationship', 'widowed', 'divorced', 'separated', 'complicated', 'polyamorous')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "relationshipStatus" "public"."users_relationshipstatus_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "relationshipStatus"`);
        await queryRunner.query(`DROP TYPE "public"."users_relationshipstatus_enum"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "tribe"`);
        await queryRunner.query(`DROP TYPE "public"."users_tribe_enum"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "preferredPosition"`);
        await queryRunner.query(`DROP TYPE "public"."users_preferredposition_enum"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "eyeColor"`);
        await queryRunner.query(`DROP TYPE "public"."users_eyecolor_enum"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "hairColor"`);
        await queryRunner.query(`DROP TYPE "public"."users_haircolor_enum"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "skinColor"`);
        await queryRunner.query(`DROP TYPE "public"."users_skincolor_enum"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "bodyHair"`);
        await queryRunner.query(`DROP TYPE "public"."users_bodyhair_enum"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "height"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "age"`);
    }

}
