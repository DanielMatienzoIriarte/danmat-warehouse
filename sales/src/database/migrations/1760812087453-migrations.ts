import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1760812087453 implements MigrationInterface {
    name = 'Migrations1760812087453'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_auth_token" ("user_id" uuid NOT NULL, "jwt_token" character varying NOT NULL, CONSTRAINT "PK_e4dbc40e1c38f1497e0de9d1670" PRIMARY KEY ("user_id")); COMMENT ON COLUMN "user_auth_token"."user_id" IS 'ID of the associated user.'; COMMENT ON COLUMN "user_auth_token"."jwt_token" IS 'User token'`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(128) NOT NULL, "password" character varying(64) NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")); COMMENT ON COLUMN "user"."email" IS 'Email address of the user.'; COMMENT ON COLUMN "user"."password" IS 'Password of the user.'; COMMENT ON COLUMN "user"."is_active" IS 'Flag indicating if the state of the user is active.'; COMMENT ON COLUMN "user"."updated_on" IS 'Date of the update of the user.'`);
        await queryRunner.query(`ALTER TABLE "user_auth_token" ADD CONSTRAINT "FK_e4dbc40e1c38f1497e0de9d1670" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_auth_token" DROP CONSTRAINT "FK_e4dbc40e1c38f1497e0de9d1670"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "user_auth_token"`);
    }

}
