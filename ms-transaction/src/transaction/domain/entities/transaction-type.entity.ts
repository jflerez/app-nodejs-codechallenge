import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TransactionEntity } from './transaction.entity';

@Entity('transaction_type')
export class TransactionTypeEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({
    unique: true,
  })
  code: number;

  @Column('varchar', {
    length: 255,
    nullable: true,
    unique: true,
  })
  description: string;

  @OneToMany(
    () => TransactionEntity,
    (transaction) => transaction.tranferTypeId,
  )
  transactions: TransactionEntity[];
}
