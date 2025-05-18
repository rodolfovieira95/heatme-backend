import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1747546481329 implements MigrationInterface {
    name = 'InitialMigration1747546481329'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."user_profiles_tribe_enum" RENAME TO "user_profiles_tribe_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."user_profiles_tribe_enum" AS ENUM('twink', 'bear', 'chubby', 'chaser', 'daddy', 'jock', 'drag', 'otter', 'geek', 'leather', 'cub', 'chub', 'twunk', 'wolf', 'butch', 'femme', 'androgynous', 'trans', 'queer', 'non binary', 'genderfluid', 'other')`);
        await queryRunner.query(`ALTER TABLE "user_profiles" ALTER COLUMN "tribe" TYPE "public"."user_profiles_tribe_enum"[] USING "tribe"::"text"::"public"."user_profiles_tribe_enum"[]`);
        await queryRunner.query(`DROP TYPE "public"."user_profiles_tribe_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_profiles_tribe_enum_old" AS ENUM('twink', 'bear', 'chubby', 'cahser', 'daddy', 'jock', 'drag', 'otter', 'geek', 'leather', 'cub', 'chub', 'twunk', 'wolf', 'butch', 'femme', 'androgynous', 'trans', 'queer', 'non binary', 'genderfluid', 'other')`);
        await queryRunner.query(`ALTER TABLE "user_profiles" ALTER COLUMN "tribe" TYPE "public"."user_profiles_tribe_enum_old"[] USING "tribe"::"text"::"public"."user_profiles_tribe_enum_old"[]`);
        await queryRunner.query(`DROP TYPE "public"."user_profiles_tribe_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."user_profiles_tribe_enum_old" RENAME TO "user_profiles_tribe_enum"`);
    }

}
