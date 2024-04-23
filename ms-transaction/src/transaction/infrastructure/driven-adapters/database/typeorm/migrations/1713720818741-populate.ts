import { MigrationInterface, QueryRunner } from 'typeorm';

export class Populate1713720818741 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO transaction_type (code, description) VALUES (1, 'Tarjeta de Crédito')`,
    );
    await queryRunner.query(
      `INSERT INTO transaction_type (code, description) VALUES (2, 'Tarjeta de Débito')`,
    );

    await queryRunner.query(
      `INSERT INTO transaction_type (code, description) VALUES (3, 'Transferencia Bancaria')`,
    );

    await queryRunner.query(
      `INSERT INTO transaction_type (code, description) VALUES (4, 'Billetera Electrónica')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
